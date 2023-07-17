import React from "react";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import NewsFeed from "../components/NewsFeed/NewsFeed";
import { useIsAuthenticated } from "react-auth-kit";

const Accueil = () => {
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated()) {
    return (
      <div>
        <Header />
        <Navbar />
        <NewsFeed />
      </div>
    );
  } else {
    // Redirect to Login
    window.location.href = "/Authentification";
  }
};

export default Accueil;
