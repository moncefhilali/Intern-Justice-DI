import React from "react";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import BonSortieAffiche from "../components/BonSortieAffiche/BonSortieAffiche";
import { useIsAuthenticated } from "react-auth-kit";

const AfficheBonSortie = () => {
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated()) {
    return (
      <div>
        <Header />
        <Navbar />
        <BonSortieAffiche />
      </div>
    );
  } else {
    // Redirect to Login
    window.location.href = "/Authentification";
  }
};

export default AfficheBonSortie;
