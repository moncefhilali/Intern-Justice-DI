import React from "react";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import ProduitModif from "../components/ProduitModif/ProduitModif";
import { useIsAuthenticated } from "react-auth-kit";

const ModifProduit = () => {
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated()) {
    return (
      <div>
        <Header />
        <Navbar />
        <ProduitModif />
      </div>
    );
  } else {
    // Redirect to Login
    window.location.href = "/Authentification";
  }
};

export default ModifProduit;
