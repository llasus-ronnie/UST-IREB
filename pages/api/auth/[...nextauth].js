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

        // Validate regular user
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          console.log("User authenticated successfully");
          return user;
        }

        // Validate external investigator
        if (externalInvestigator) {
          // Check if the provided password matches the hashed password
          const isPasswordValid = bcrypt.compareSync(
            credentials.password,
            externalInvestigator.password
          );
          if (isPasswordValid) {
            console.log("Password matches for External Investigator");

            // Create a new user if not found in User table
            if (!user) {
              try {
                const newUser = await User.create({
                  email: externalInvestigator.email,
                  name: externalInvestigator.name,
                  role: "ExternalInvestigator",
                });
                console.log("New user created:", newUser);
                return newUser;
              } catch (error) {
                console.error("Error creating new user:", error);
                throw new Error("Error creating user");
              }
            } else {
              return user;
            }
          } else {
            console.error("Invalid password for External Investigator");
            throw new Error("Invalid email or password");
          }
        }

        console.error("Authorization failed");
        throw new Error("Invalid email or password");
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
});

export async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export async function verifyPassword(password, hashedPassword) {
  const isValid = await bcrypt.compare(password, hashedPassword);
  return isValid;
}

export default handler;
