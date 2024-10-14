import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "../../../utils/database";
import User from "../../../models/users/user";
import roles from "../../../src/app/api/roles/roles"; // Import predefined roles

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add user role to the token right after sign-in
      if (user) {
        await connectDB();
        const userFromDB = await User.findOne({ email: user.email });
        token.role = userFromDB ? userFromDB.role : null;
      }
      return token;
    },
    async session({ session, token }) {
      // Add role to session
      session.user.role = token.role;
      return session;
    },
    async signIn({ profile }) {
      try {
        console.log("Profile Info:", profile); // Log profile details

        if (!profile.email.endsWith("@ust.edu.ph")) {
          console.log("Unauthorized domain:", profile.email); // Log unauthorized domain
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
        console.log("Sign-In Error:", error); // Log any errors
        return false;
      }
    },
  },
});

export default handler;
