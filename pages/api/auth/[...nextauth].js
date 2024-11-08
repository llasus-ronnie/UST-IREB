import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "../../../utils/database";
import User from "../../../models/users/user";
import ExternalInvestigator from "../../../models/externalInvestigatorModel";
import ExternalReviewer from "../../../models/externalReviewerModel";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  debug: true,
  session: { strategy: "jwt" },
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

        // Check if the user is an external investigator
        const externalInvestigator = await ExternalInvestigator.findOne({
          email: credentials.email,
        });
        if (externalInvestigator) {
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            externalInvestigator.password
          );
          if (isPasswordValid) {
            await addUserToUserTableIfNotExist(
              externalInvestigator.email,
              externalInvestigator.name,
              "ExternalInvestigator" // Passing role explicitly
            );
            return {
              email: externalInvestigator.email,
              name: externalInvestigator.name,
              role: "ExternalInvestigator",
            };
          }
        }

        // Check if the user is an external reviewer
        const externalReviewer = await ExternalReviewer.findOne({
          email: credentials.email,
        });
        if (externalReviewer) {
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            externalReviewer.password
          );
          if (isPasswordValid) {
            await addUserToUserTableIfNotExist(
              externalReviewer.email,
              externalReviewer.name,
              "ExternalReviewer" // Passing role explicitly
            );
            return {
              email: externalReviewer.email,
              name: externalReviewer.name,
              role: "ExternalReviewer",
            };
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
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
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

// Helper function to add user to User table if not existing
async function addUserToUserTableIfNotExist(email, name, role) {
  await connectDB();
  const userExist = await User.findOne({ email });
  if (!userExist) {
    console.log(`Creating new user with role: ${role}`); // Log role
    await User.create({ email, name, role });
  } else {
    console.log(`User already exists: ${email} with role ${userExist.role}`);
  }
}

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
