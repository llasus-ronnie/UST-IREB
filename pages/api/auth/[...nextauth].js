import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "../../../utils/database";
import User from "../../../models/users/user";
import ExternalInvestigator from "../../../models/externalInvestigatorModel"; // Import ExternalInvestigator model
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({ email: credentials.email });
        const externalInvestigator = await ExternalInvestigator.findOne({
          email: credentials.email,
        });

        console.log("User:", user);
        console.log("External Investigator:", externalInvestigator);

        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          console.log("User authenticated successfully");
          return user;
        } else if (
          externalInvestigator &&
          credentials.password === externalInvestigator.accessToken
        ) {
          console.log("Access token matches for External Investigator");

          // Create a new user if not found in User table but found in ExternalInvestigator table
          if (!user) {
            try {
              const newUser = await User.create({
                email: externalInvestigator.email,
                name: externalInvestigator.name, // Assuming name should be copied from ExternalInvestigator
                role: "ExternalInvestigator", // Default role for external investigators
              });
              console.log("New user created:", newUser);
              return newUser;
            } catch (error) {
              console.log("Error creating new user:", error);
              return null;
            }
          } else {
            return user;
          }
        } else {
          console.log("Authorization failed");
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        await connectDB();
        const userFromDB = await User.findOne({ email: user.email });
        token.role = userFromDB ? userFromDB.role : null;
      }

      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
    async signIn({ user, profile, account }) {
      try {
        if (account.provider === "google") {
          console.log("Profile Info:", profile);

          if (!profile.email.endsWith("@ust.edu.ph")) {
            console.log("Unauthorized domain:", profile.email);
            return false;
          }

          await connectDB();
          const userExist = await User.findOne({ email: profile.email });

          if (!userExist) {
            await User.create({
              email: profile.email,
              name: profile.name,
              image: profile.picture,
              role: "PrincipalInvestigator",
            });
          }
        } else if (account.provider === "credentials") {
          console.log("User Info:", user);
        }

        return true;
      } catch (error) {
        console.log("Sign-In Error:", error);
        return false;
      }
    },
  },
  // secret: process.env.NEXTAUTH_SECRET,
});

export default handler;
