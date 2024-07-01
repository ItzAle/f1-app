import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "./../../assets/images/f1logo.png";
import ThemeSwitch from "../other/ThemeSwitch";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const savedTheme = localStorage.getItem("theme");
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const initialTheme = savedTheme
    ? savedTheme
    : prefersDarkMode
    ? "dark"
    : "light";
  const [isDarkMode, setIsDarkMode] = useState(initialTheme === "dark");

  useEffect(() => {
    const themeToApply = isDarkMode ? "dark" : "light";
    document.body.setAttribute("data-theme", themeToApply);
    localStorage.setItem("theme", themeToApply);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const handleClick = () => {
    setIsOpen(false);
    document.body.classList.remove("no-scroll");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  };

  return (
    <div>
      <nav className="navbar_desk">
        <Link to={"/"}>
          <img className="logo" src={logo} alt={logo}></img>
        </Link>
        <div className="buttons">
          <Link to={"/driverstandings"}>
            <h1 className="DriverStandings">Driver Standings</h1>
          </Link>
          <Link to={"/constructorstandings"}>
            <h1 className="ConstructorStandings">Constructor Standings</h1>
          </Link>
          <Link to={"/qualifying"}>
            <h1 className="ConstructorStandings">Qualifying</h1>
          </Link>
          <Link to={"/race"}>
            <h1 className="ConstructorStandings">Races</h1>
          </Link>
          <ThemeSwitch onChange={toggleTheme} checked={isDarkMode} />
        </div>
      </nav>
      <div className={`nav_items ${isOpen && "open"}`}>
        <ThemeSwitch
          className="switchMobile"
          onChange={toggleTheme}
          checked={isDarkMode}
          onClick={handleClick}
        />
        <Link to={"/"} onClick={handleClick}>
          <h1 className="home_mobile">Home</h1>
        </Link>
        <Link to={"/driverstandings"} onClick={handleClick}>
          <h1 className="ds_mobile">Driver Standings</h1>
        </Link>
        <Link to={"/constructorstandings"} onClick={handleClick}>
          <h1 className="cs_mobile">Constructor Standings</h1>
        </Link>
        <Link to={"/qualifying"} onClick={handleClick}>
          <h1 className="cs_mobile">Qualifyings</h1>
        </Link>
        <Link to={"/race"} onClick={handleClick}>
          <h1 className="cs_mobile">Race Results</h1>
        </Link>
      </div>
      <div className="mobileDiv">
        <div className={`nav_toggle ${isOpen && "open"}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="logo-container">
          <Link to={"/"}>
            <img
              className={`logo_toggle ${isOpen && "open"}`}
              src={logo}
              alt={logo}
            ></img>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
