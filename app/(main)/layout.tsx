import Sidebar from "../../components/Sidebar";
import NavigationBar from "../../components/NavigationBar";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <NavigationBar />
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
