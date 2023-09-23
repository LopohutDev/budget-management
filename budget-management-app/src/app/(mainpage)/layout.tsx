import type { Metadata } from "next";
import Header from "../components/mainpage/Header";

export const metadata: Metadata = {
  title: "Budget Manager - Home",
  description: "Welcome to Budget Manager App",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 h-screen overflow-y-scroll relative  bg-gray-50">
      <Header />
      {children}
    </div>
  );
}
