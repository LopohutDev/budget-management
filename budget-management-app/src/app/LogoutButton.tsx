"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { Button } from "@mui/material";

const LogoutButton = () => {
  const handleLogout = () => {
    signOut();
  };

  return (
    <Button
      className="bg-gray-100 text-black normal-case px-5 font-semibold"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
