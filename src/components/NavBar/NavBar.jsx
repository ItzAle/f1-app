import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "./../../assets/images/f1logo.png";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isOpen]);
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
          <h1 className="home_mobile">Home</h1>
        </Link>
        <Link to={"/driverstandings"}>
          <h1 className="ds_mobile">Driver Standings</h1>
        </Link>
        <Link to={"/constructorstandings"}>
          <h1 className="cs_mobile">Constructor Standings</h1>
        </Link>
      </div>
      <div className="mobileDiv">
        <div
          className={`nav_toggle ${isOpen && "open"}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <Link to={"/"}>
          <img className="logomobile" src={logo} alt={logo}></img>
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
