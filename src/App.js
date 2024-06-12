import "./App.css";
import "./assets/global.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={LandingPage} />
      </Routes>
    </div>
  );
}

export default App;
