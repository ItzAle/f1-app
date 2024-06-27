import "./App.css";
import "./assets/global.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
// fonts
import "./assets/fonts/Formula1-Bold.otf";
import "./assets/fonts/Formula1-Regular.otf";
import "./assets/fonts/Formula1-Wide.otf";
import DriverStandings from "./pages/DriverStandings/DriverStandings";
import ConstructorStandings from "./pages/ConstructorStandings/ConstructorStandings";
import RaceResults from "./pages/RaceResults/RaceResults";
import Schedule from "./pages/Schedule/Schedule";
import DriverProfile from "./components/DriverProfile/DriverProfile";
import ConstructorsProfile from "./components/ConstructorsProfile/ConstructorsProfile";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import RedirectToLandingPage from "./components/RedirectToLandingPage/RedirectToLandingPage";
import { useEffect, useState } from "react";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const theme = isDarkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [isDarkMode]);

  return (
    <div className={`App ${isDarkMode ? "dark-mode" : ""}`}>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/driverstandings" element={<DriverStandings />} />
        <Route
          path="/constructorstandings"
          element={<ConstructorStandings />}
        />
        <Route path="/raceresults" element={<RaceResults />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="*" element={<RedirectToLandingPage />} />
        <Route path="/driver/:id" element={<DriverProfile />} />
        <Route path="/constructor/:id" element={<ConstructorsProfile />} />
      </Routes>
    </div>
  );
}

export default App;
