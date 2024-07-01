import "./App.css";
import "./assets/global.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import "./assets/fonts/Formula1-Bold.otf";
import "./assets/fonts/Formula1-Regular.otf";
import "./assets/fonts/Formula1-Wide.otf";
import DriverStandings from "./pages/DriverStandings/DriverStandings";
import ConstructorStandings from "./pages/ConstructorStandings/ConstructorStandings";
import Schedule from "./pages/Schedule/Schedule";
import DriverProfile from "./components/DriverProfile/DriverProfile";
import ConstructorsProfile from "./components/ConstructorsProfile/ConstructorsProfile";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import RedirectToLandingPage from "./components/RedirectToLandingPage/RedirectToLandingPage";
import RacesPage from "./components/RacesPage/RacesPage";
import RaceResultsPage from "./components/RaceResultsPage/RaceResultsPage";
import SprintResultsPage from "./components/SprintResultsPage/SprintResultPage";
import QualifyingResultsPage from "./components/QualifyingResults/QualifyingResults";
import QualifyingPage from "./components/QualifyingPage/QualifyingPage";
function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/driverstandings" element={<DriverStandings />} />
        <Route
          path="/constructorstandings"
          element={<ConstructorStandings />}
        />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="*" element={<RedirectToLandingPage />} />
        <Route path="/driver/:id" element={<DriverProfile />} />
        <Route path="/constructor/:id" element={<ConstructorsProfile />} />
        <Route path="/race" element={<RacesPage />} />
        <Route path="/race/:race" element={<RaceResultsPage />} />
        <Route path="/sprint/:round" element={<SprintResultsPage />} />
        <Route path="/qualifying/:round" element={<QualifyingResultsPage />} />
        <Route path="/qualifying/" element={<QualifyingPage />} />
      </Routes>
    </div>
  );
}

export default App;
