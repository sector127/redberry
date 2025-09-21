import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(
            "https://api.redseam.redberryinternship.ge/api/login",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          if (!res.ok) {
            throw new Error("Invalid credentials");
          }

          const user = await res.json();
          if (user) {
            return {
              id: user.user.id || user.user.email,
              email: user.user.email,
              image: user.user.image || null,
              token: user.token,
            };
          }
          return null;
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.image = user.image;
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.image = token.image;
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/login",
  },
  events: {
    async signOut({ session, token }) {
      console.log("User signed out");
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };