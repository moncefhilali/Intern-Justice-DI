import React from "react";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import ProduitAffiche from "../components/ProduitAffiche/ProduitAffiche";
import { useIsAuthenticated } from "react-auth-kit";

const AfficheProduit = () => {
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated()) {
    return (
      <div>
        <Header />
        <Navbar />
        <ProduitAffiche />
      </div>
    );
  } else {
    // Redirect to Login
    window.location.href = "/Authentification";
  }
};

export default AfficheProduit;
