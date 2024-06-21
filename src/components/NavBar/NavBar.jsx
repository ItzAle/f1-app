import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "./../../assets/images/f1logo.png";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <nav className="navbar_desk">
        <Link to={"/"}>
          <img className="logo" src={logo} alt={logo}></img>
        </Link>
        <div className="buttons">
          <Link to={"/driverstandings"}>
            <h1 className="DriverStandings">Driver Standnings</h1>
          </Link>
          <Link to={"/constructorstandings"}>
            <h1 className="ConstructorStandings">Constructor Standings</h1>
          </Link>
        </div>
      </nav>
      <div className={`nav_items ${isOpen && "open"}`}>
        <Link to={"/"}>
          <h1>Home</h1>
        </Link>
        <Link to={"/driverstandings"}>
          <h1>Driver Standings</h1>
        </Link>
        <Link to={"/constructorstandings"}>
          <h1>Constructor Standings</h1>
        </Link>
      </div>
      <div
        className={`nav_toggle ${isOpen && "open"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}

export default NavBar;
