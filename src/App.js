import "./App.css";
import "./assets/global.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
// fonts
import "./assets/fonts/Formula1-Bold.otf";
import "./assets/fonts/Formula1-Regular.otf";
import "./assets/fonts/Formula1-Wide.otf";
import DriverStandings from "./pages/DriverStandings/DriverStandings";
import NavBar from "./components/NavBar/NavBar";
import MobileMenu from "./components/MobileMenu/MobileMenu";
import ConstructorStandings from "./pages/ConstructorStandings/ConstructorStandings";
import RaceResults from "./pages/RaceResults/RaceResults";
import Schedule from "./pages/Schedule/Schedule";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/driverstandings" element={<DriverStandings />} />
        <Route
          path="/constructorstandings"
          element={<ConstructorStandings />}
        />
        <Route path="/raceresults" element={<RaceResults />} />
        <Route path="/schedule" element={<Schedule />} />
      </Routes>
      <MobileMenu />
    </div>
  );
}

export default App;
