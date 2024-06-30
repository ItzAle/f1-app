import React from "react";
import ExternalLink from "../ExternalLink/ExternalLink";
import "../../assets/global.css";
import "./Footer.css";
import ErgastApi from "../ErgestApi/ErgestApi";

function Footer() {
  return (
    <>
      <footer>
        <div className="footer">
          <ExternalLink />
          <ErgastApi />
        </div>
      </footer>
    </>
  );
}

export default Footer;
