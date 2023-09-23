import { UserInfo } from "@/types/user.types";
import jwtDecode from "jwt-decode";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const refreshAccessToken = async (refreshToken: string) => {
  const res = await fetch(`${process.env.API_BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  const user = await res.json();
  const decoded: UserInfo = jwtDecode(user.accessToken);
  return {
    firstName: decoded.firstName,
    lastName: decoded.lastName,
    accessToken: user.accessToken,
    accessTokenExpires: user.exp * 1000,
    refreshToken: user.refreshToken,
  };
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const { email, password, isRefresh, refresh } = credentials as {
            email?: string;
            password?: string;
            refresh?: string;
            isRefresh?: boolean;
          };
          if (isRefresh && refresh) {
            return await refreshAccessToken(refresh);
          }
          {
            const res = await fetch(`${process.env.API_BASE_URL}/auth/signin`, {
              method: "POST",
              credentials: "include",
              cache: "no-cache",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email,
                password,
              }),
            });

            const user = await res.json();

            if (res.ok && user) {
              const decoded: UserInfo = jwtDecode(user.accessToken);

              return {
                ...decoded,
                accessToken: user.accessToken,
                refreshToken: user.refreshToken,
              } as any;
            } else {
              return null;
            }
          }
        } catch (err) {
          console.log("ERROR", err);
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token, user }) {
      if (token) {
        session.user = {
          firstName: token.firstName,
          lastName: token.lastName,
          name: token.name,
          exp: token.exp,
        };
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.name = user.name;
        token.accessToken = user.accessToken;
        token.accessTokenExpires = user.exp * 1000;
        token.refreshToken = user.refreshToken;
        return token;
      }
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }
      const refreshTokenDecode: UserInfo = jwtDecode(token.refreshToken) || {};
      if (Date.now() > refreshTokenDecode.exp * 1000) {
        throw new Error("Refresh token expired");
      }
      return await refreshAccessToken(token.refreshToken);
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
