// app/auth/signin/layout.tsx
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Página de Cadastro - Balanced Life",
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      {children}
    </>
  );
};

export default Layout;
