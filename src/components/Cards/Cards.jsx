import React from "react";
import DS from "../../assets/images/test/DS.png";
import CS from "../../assets/images/test/CS.png";
import Results from "../../assets/images/test/Results.png";
import RS from "../../assets/images/test/RS.png";
import Schedule from "../../assets/images/test/Schedule.png";
import Archive from "../../assets/images/test/Archive.png";
import { Link } from "react-router-dom";
import "../../assets/global.css";
import "./Cards.css";

function Cards() {
  return (
    <div className="parent">
      <Link to={"/driverstandings"}>
        <img src={DS} alt="" />
      </Link>
      <Link to={"/constructorstandings"}>
        <img src={CS} alt="" />
      </Link>
      <Link to={"/raceresults"}>
        <img src={RS} alt="" />
      </Link>
      <Link to={"/schedule"}>
        <img src={Schedule} alt="" />
      </Link>
      <Link to={"/driversnteams"}>
        <img src={Results} alt="" />
      </Link>
      <Link to={"/archive"}>
        <img src={Archive} alt="" />
      </Link>
    </div>
  );
}

export default Cards;
