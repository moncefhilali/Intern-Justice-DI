import UtilisateurAffiche from "../components/UtilisateurAffiche/UtilisateurAffiche";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import { useIsAuthenticated } from "react-auth-kit";

const AfficheUtilisateur = () => {
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated()) {
    return (
      <div>
        <Header />
        <Navbar />
        <UtilisateurAffiche />
      </div>
    );
  } else {
    // Redirect to Login
    window.location.href = "/Authentification";
  }
};

export default AfficheUtilisateur;
