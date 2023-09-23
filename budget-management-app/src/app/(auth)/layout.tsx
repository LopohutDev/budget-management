import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Budget Manager - Auth",
  description: "Welcome to Budget Manager App",
};
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex-1 h-screen overflow-y-scroll">{children}</div>;
}
