import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      firstName: any;
      lastName: any;
      exp: any;
    } & DefaultSession["user"];
    refreshToken: string;
    accessToken: string;
  }
  interface User {
    firstName: string;
    lastName: string;
    refreshToken: string;
    accessToken: string;
    accessTokenExpires: number;
    exp: any;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    refreshToken: string;
    accessToken: string;
    accessTokenExpires: number;
  }
  interface User {
    exp: any;
  }
}
