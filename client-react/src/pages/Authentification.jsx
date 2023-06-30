import React from "react";
import SignUp from "../components/SignUp/SignUp";
import SignIn from "../components/SignIn/SignIn";

function Authentification() {
  return (
    <div>
      <div className="Header">
        <h1>Gestion du Patrimoine</h1>
      </div>
      <SignIn />
      <SignUp />
    </div>
  );
}

export default Authentification;
