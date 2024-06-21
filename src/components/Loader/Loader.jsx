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
        colors={["red", "black", "red", "black", "red", "black"]}
      />
    </div>
  );
}

export default Loader;
