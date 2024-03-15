"use client";
import Sidebar from "../../components/Sidebar";
import NavigationBar from "../../components/NavigationBar";
import React, { ReactNode } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <NavigationBar />
        <main>
          <LocalizationProvider dateAdapter={AdapterDayjs}>{children}</LocalizationProvider>
        </main>
      </div>
    </>
  );
};

export default Layout;
