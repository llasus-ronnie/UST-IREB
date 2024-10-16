import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "../../../utils/database";
import User from "../../../models/users/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
    callbackUrl: {
      name: `__Secure-next-auth.callback-url`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        await connectDB();
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

        return true;
      } catch (error) {
        console.log("Sign-In Error:", error);
        return false;
      }
    },
  },
});

export default handler;
