import { AppBar } from "./AppBar/AppBar";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <AppBar />
      <Outlet />
    </>
  );
};
