import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

function RedirectToLandingPage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    toast.error("URL no válida. Redirigiendo a la página principal.");
    navigate("/", { replace: true });
  }, [navigate, location]);

  return null;
}

export default RedirectToLandingPage;
