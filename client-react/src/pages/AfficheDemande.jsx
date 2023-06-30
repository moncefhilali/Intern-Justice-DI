import React from "react";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import DemandeAfficheAll from "../components/DemandeAfficheAll/DemandeAfficheAll";
import { useIsAuthenticated } from "react-auth-kit";

const AfficheDemande = () => {
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated()) {
    return (
      <div>
        <Header />
        <Navbar />
        <DemandeAfficheAll />
      </div>
    );
  } else {
    // Redirect to Login
    window.location.href = "/Authentification";
  }
};

export default AfficheDemande;
