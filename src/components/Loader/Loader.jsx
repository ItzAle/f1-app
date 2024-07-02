import React from "react";
import { Vortex } from "react-loader-spinner";
import "./Loader.css";

function Loader() {
  return (
    <div className="Loader">
      <Vortex
        visible={true}
        height="100"
        width="100"
        ariaLabel="vortex-loading"
        wrapperStyle={{}}
        wrapperClass="vortex-wrapper"
        colors={["#ffff", "#c42021", "#dd2c2c", "#e56161", "#005ba9", "#fd48c7"]}
      />
    </div>
  );
}

export default Loader;
