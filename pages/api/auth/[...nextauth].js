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

        const externalInvestigator = await ExternalInvestigator.findOne({
          email: credentials.email,
        });

        if (externalInvestigator) {
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            externalInvestigator.password
          );

          if (isPasswordValid) {
            console.log(
              "External investigator validated:",
              externalInvestigator
            );
            return {
              email: externalInvestigator.email,
              name: externalInvestigator.name,
              role: "ExternalInvestigator",
            };
          }
        }

        const externalReviewer = await ExternalReviewer.findOne({
          email: credentials.email,
        });

        if (externalReviewer) {
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            externalReviewer.password
          );

          if (isPasswordValid) {
            console.log("External reviewer validated:", externalReviewer);
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
        token.role = user.role || (await getRoleFromDB(user.email)); // Retrieve role if not set
      }
      return token;
    },
    async session({ session, token }) {
      if (token.role) {
        session.user.role = token.role;
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

        // Check if user is in the REC table
        const recResponse = await axios.get(`/api/REC?email=${profile.email}`);
        const recData = recResponse.data.data;

        if (recData.length > 0) {
          const userRec = recData.find((rec) => rec.email === profile.email);
          if (userRec) {
            // Set role to "REC"
            user.role = "REC";
          }
        }

        // Check if user is in the recMembers table
        const recMemberResponse = await axios.get(
          `/api/RECMembers?email=${profile.email}`
        );
        const recMemberData = recMemberResponse.data.data;

        // If the user is a Primary Reviewer, assign "PrimaryReviewer" role
        if (recMemberData.length > 0) {
          const userRecMember = recMemberData.find(
            (recMember) =>
              recMember.email === profile.email &&
              recMember.recRole === "Primary Reviewer"
          );
          if (userRecMember) {
            user.role = "PrimaryReviewer"; // Assign role as "PrimaryReviewer"
          }
        }

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
