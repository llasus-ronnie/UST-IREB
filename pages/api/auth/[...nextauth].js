import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "../../../utils/database";
import User from "../../../models/users/user";
import ExternalInvestigator from "../../../models/externalInvestigatorModel";
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

        // Validate regular user
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          console.log("User validated:", user);
          return {
            email: user.email,
            name: user.name,
            role: user.role,
            password: user.password, // Include password in user object
          };
        }

        // Validate external investigator
        if (externalInvestigator) {
          const isPasswordValid = bcrypt.compareSync(
            credentials.password,
            externalInvestigator.password
          );

          if (isPasswordValid) {
            console.log(
              "External investigator validated:",
              externalInvestigator
            );
            if (!user) {
              const newUser = await User.create({
                email: externalInvestigator.email,
                name: externalInvestigator.name,
                role: "ExternalInvestigator",
              });
              return {
                email: newUser.email,
                name: newUser.name,
                role: newUser.role,
                password: newUser.password, // Include password in user object
              };
            } else {
              return {
                email: user.email,
                name: user.name,
                role: user.role,
                password: user.password, // Include password in user object
              };
            }
          }
        }

        throw new Error("Invalid email or password");
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role || (await getRoleFromDB(user.email));
        token.password = user.password; // Add password to token
        console.log("JWT token set:", token);
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      if (token.password) {
        session.user.password = token.password; // Add password to session
      }
      return session;
    },
    async signIn({ user, profile, account }) {
      if (account.provider === "google") {
        if (!profile.email.endsWith("@ust.edu.ph")) {
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
      }
      return true;
    },
  },
});

async function getRoleFromDB(email) {
  await connectDB();
  const user = await User.findOne({ email });
  return user ? user.role : null;
}

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
