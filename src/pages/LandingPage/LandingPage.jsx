import React, { useEffect, useState } from "react";
import Cards from "../../components/Cards/Cards";
import "../../assets/global.css";
import Loader from "../../components/Loader/Loader";
import NavBar from "../../components/NavBar/NavBar";

function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);

  function LoadingFalse() {
    setIsLoading(false);
  }

  useEffect(() => {
    setIsLoading(false);
  });

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Cards />
        </div>
      )}
    </div>
  );
}

export default LandingPage;
