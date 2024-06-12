import React from "react";
import logo from "./../../assets/images/f1logo.png";
import "./Navbar.css";
function NavBar() {
  return (
    <div>
      <img className="logo" src={logo} alt="f1logo" />
    </div>
  );
}

export default NavBar;
