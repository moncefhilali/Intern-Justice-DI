import React from "react";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import DemandeAfficheByID from "../components/DemandeAfficheByID/DemandeAfficheByID";
import { useIsAuthenticated } from "react-auth-kit";

const MesDemandes = () => {
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated()) {
    return (
      <div>
        <Header />
        <Navbar />
        <DemandeAfficheByID />
      </div>
    );
  } else {
    // Redirect to Login
    window.location.href = "/Authentification";
  }
};

export default MesDemandes;
