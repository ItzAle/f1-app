import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "./../../assets/images/f1logo.png";
import { Switch, styled } from "@mui/material";

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
    document.body.setAttribute("data-theme", isDarkMode ? "dark" : "light");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      if (!localStorage.getItem("theme")) {
        setIsDarkMode(e.matches);
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const ThemeSwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      transition: "transform 0.3s ease-in-out",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(22px)",
        "& .MuiSwitch-thumb:before": {
          content: '"🌙"',
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: "#fff",
      width: 32,
      height: 32,
      transition: "transform 0.3s ease-in-out",
      "&:before": {
        content: '"☀️"',
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "18px",
        transition: "content 0.3s ease-in-out",
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      borderRadius: 20 / 2,
    },
  }));

  const handleClick = () => {
    setIsOpen(false);
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
