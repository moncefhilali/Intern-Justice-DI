import React from "react";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import CategorieModif from "../components/CategorieModif/CategorieModif";
import { useIsAuthenticated } from "react-auth-kit";

const ModifCategorie = () => {
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated()) {
    return (
      <div>
        <Header />
        <Navbar />
        <CategorieModif />
      </div>
    );
  } else {
    // Redirect to Login
    window.location.href = "/Authentification";
  }
};

export default ModifCategorie;
