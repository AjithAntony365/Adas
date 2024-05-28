import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        // console.log('credentials', credentials);
        try {
          const response = await axios.post(
            `${process.env.Backend_SERVER_URL}/user_login`,
            {
              email: credentials.email,
              password: credentials.password,
            }
          );
          // console.log('response', response.status);
          // Check if response is successful and contains user data
          if (response.status === 200 && response.data && response.data.user) {
            let user = response.data.user;
            // console.log('working');
            // Return the user data
            // return user;
            // return Promise.resolve(response.data.user);
            return {
              name: user.username,
              email: user.email,
              image: user.companyName,
            };
          } else {
            // Return null if authentication failed or user data is missing
            return Promise.resolve(null);
          }
        } catch (error) {
          // Return null if an error occurs during authentication
          return Promise.resolve(null);
        }
      },
    }),
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.email = user.email;
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.id = token.id;
      }
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
