import React, { useEffect, useState } from "react";
import Cards from "../../components/Cards/Cards";
import "../../assets/global.css";
import Loader from "../../components/Loader/Loader";

function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
    document.title = "Home";
  }, []);

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
