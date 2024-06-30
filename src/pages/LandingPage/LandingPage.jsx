import React, { useEffect, useState } from "react";
import Cards from "../../components/Cards/Cards";
import "../../assets/global.css";
import Loader from "../../components/Loader/Loader";

function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Home";
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const favicon = document.getElementById("favicon");
    if (favicon) {
      favicon.href = favicon;
    } else {
      const link = document.createElement("link");
      link.id = "favicon";
      link.rel = "icon";
      link.href = favicon;
      document.head.appendChild(link);
    }
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
