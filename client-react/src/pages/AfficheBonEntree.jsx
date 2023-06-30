import React from "react";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import BonEntreeAffiche from "../components/BonEntreeAffiche/BonEntreeAffiche";
import { useIsAuthenticated } from "react-auth-kit";

const AfficheBonEntree = () => {
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated()) {
    return (
      <div>
        <Header />
        <Navbar />
        <BonEntreeAffiche />
      </div>
    );
  } else {
    // Redirect to Login
    window.location.href = "/Authentification";
  }
};

export default AfficheBonEntree;
