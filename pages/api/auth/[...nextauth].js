import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "../../../utils/database";
import User from "../../../models/users/user";
import ExternalInvestigator from "../../../models/externalInvestigatorModel";
import ExternalReviewer from "../../../models/externalReviewerModel";
import REC from "../../../models/recModel";
import RECMembers from "../../../models/recmembersModel";
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
          if (externalInvestigator.isArchived) {
            console.log(
              "Attempt to login with archived account:",
              externalInvestigator.email
            );
            return null;
          }

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
          if (externalReviewer.isArchived) {
            console.log(
              "Attempt to login with archived account:",
              externalReviewer.email
            );
            return null;
          }

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
        token.role = user.role || (await getRoleFromDB(user.email));
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
        if (!userExist) {
          const recExist = await REC.findOne({ email: profile.email });
          let role = "PrincipalInvestigator";
          if (recExist) {
            role = "REC";
          } else {
            const recMember = await RECMembers.findOne({
              email: profile.email,
            });
            if (recMember) {
              if (recMember.isArchived) {
                console.log(
                  "Attempt to login with archived REC member account:",
                  recMember.email
                );
                return false;
              }

              if (recMember.recRole === "Primary Reviewer") {
                role = "PrimaryReviewer";
              } else {
                role = "REC";
              }
            }
          }

          await User.create({
            email: profile.email,
            name: profile.name,
            image: profile.picture,
            role: role,
          });
        } else {
          if (userExist.role !== "IREB") {
            const recExist = await REC.findOne({ email: profile.email });
            if (recExist) {
              userExist.role = "REC";
            } else {
              const recMember = await RECMembers.findOne({
                email: profile.email,
              });
              if (recMember) {
                if (recMember.recRole === "Primary Reviewer") {
                  userExist.role = "PrimaryReviewer";
                } else {
                  userExist.role = "REC";
                }
              } else {
                userExist.role = "PrincipalInvestigator";
              }
            }
            await userExist.save();
          }
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
