import React from "react";
import MobileMenu from "../../components/MobileMenu/MobileMenu";
import NavBar from "../../components/NavBar/NavBar";
import Cards from "../../components/Cards/Cards";
import "../../assets/global.css";

function LandingPage() {
  return (
    <div>
      <NavBar />
      <Cards />
      <MobileMenu />
    </div>
  );
}

export default LandingPage;
