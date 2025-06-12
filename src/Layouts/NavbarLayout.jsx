import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

const NavbarLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default NavbarLayout;
