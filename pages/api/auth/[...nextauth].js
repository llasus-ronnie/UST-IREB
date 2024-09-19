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
  callbacks: {
    async session({ session }) {
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
