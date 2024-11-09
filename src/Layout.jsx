import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function Layout() {
  return (
    <>
      
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
