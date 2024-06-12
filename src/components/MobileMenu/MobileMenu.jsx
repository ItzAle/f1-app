import React from "react";
import { FiHome } from "react-icons/fi";
import { FaFlagCheckered } from "react-icons/fa";
import { GiF1Car } from "react-icons/gi";
import "./../../assets/global.css";
import { Link } from "react-router-dom";
import "./MobileMenu.css";

function MobileMenu() {
  return (
    <div className="mobileMenu">
      <div className="buttons">
        <Link className="home" to={"/"}>
          <FiHome />
        </Link>
        <Link className="race" to={"/"}>
          <FaFlagCheckered />
        </Link>
        <Link className="car" to={"/"}>
          <GiF1Car />
        </Link>
      </div>
    </div>
  );
}

export default MobileMenu;
