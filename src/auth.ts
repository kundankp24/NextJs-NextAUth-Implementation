import NextAuth, { CredentialsSignin } from "next-auth"
import GoogleProvider from 'next-auth/providers/google';
import CredentialProvider from 'next-auth/providers/credentials'
import { User } from "./models/userModel";
import { compare } from "bcryptjs";
import { connectToDatabase } from "./lib/utils";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials)=> {
        const email= credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password) {
          throw new Error('Please provide both email and password');
        }

        // Connect to the database
        await connectToDatabase();

        // Find user in the database
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
          throw new Error('Invalid Email or Password');
        }

        // Check if the password matches
        const isMatch = await compare(password, user.password);

        if (!isMatch) {
          throw new Error('Invalid Email or Password');
        }

        // Return user object without the password
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      }
    })
  ],
  pages:{
    signIn:'/login'
  }
})