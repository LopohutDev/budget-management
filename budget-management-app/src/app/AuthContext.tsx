"use client";

import { SessionProvider } from "next-auth/react";

export interface AuthContextProps {
  children: React.ReactNode;
}

const AuthContext = ({ children }: AuthContextProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthContext;
