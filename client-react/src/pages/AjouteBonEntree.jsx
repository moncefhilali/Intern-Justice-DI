import "../App.css";
import Navbar from "../components/Navbar/Navbar";
import BonEntreeAjoute from "../components/BonEntreeAjoute/BonEntreeAjoute.jsx";
import Header from "../components/Header/Header";
import { useIsAuthenticated } from "react-auth-kit";

function AjouteBonEntree() {
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated()) {
    return (
      <div>
        <Header />
        <Navbar />
        <BonEntreeAjoute />
      </div>
    );
  } else {
    // Redirect to Login
    window.location.href = "/Authentification";
  }
}

export default AjouteBonEntree;
