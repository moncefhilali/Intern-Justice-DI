import React from "react";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import DemandeAjoute from "../components/DemandeAjoute/DemandeAjoute";
import { useIsAuthenticated } from "react-auth-kit";

const AjouteDemande = () => {
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated()) {
    return (
      <div>
        <Header />
        <Navbar />
        <DemandeAjoute />
      </div>
    );
  } else {
    // Redirect to Login
    window.location.href = "/Authentification";
  }
};
export default AjouteDemande;
