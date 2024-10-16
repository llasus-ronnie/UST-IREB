import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "../../../utils/database"; // Make sure this path is correct
import User from "../../../models/users/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          redirect_uri:
            "https://main.d1nlj7e8h90os8.amplifyapp.com/api/auth/callback/google",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        await connectDB(); // Ensure this is called only once
        const userFromDB = await User.findOne({ email: user.email });
        token.role = userFromDB ? userFromDB.role : null;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
    async signIn({ profile }) {
      try {
        console.log("Profile Info:", profile);
        await connectDB(); // Ensure this is called only once

        if (!profile.email.endsWith("@ust.edu.ph")) {
          console.log("Unauthorized domain:", profile.email);
          return false;
        }

        const userExist = await User.findOne({ email: profile.email });

        if (!userExist) {
          await User.create({
            email: profile.email,
            name: profile.name,
            image: profile.picture,
            role: "PrincipalInvestigator",
          });
        }

        return true;
      } catch (error) {
        console.log("Sign-In Error:", error);
        return false;
      }
    },
  },
});

export default handler;
