import Sidebar from "../../components/Sidebar";
import NavigationBar from "../../components/NavigationBar";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="z-[1000]">
          <NavigationBar />
        </div>
        <div className="flex-grow">{children}</div>
      </div>
    </>
  );
};

export default Layout;
