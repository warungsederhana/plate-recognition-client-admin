import NavigationBar from "@/components/NavigationBar";
import React from "react";

const Layout = (children: React.ReactNode) => {
  return (
    <>
      <NavigationBar />
      <div>{children}</div>
    </>
  );
};

export default Layout;
