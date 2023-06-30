import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import "./SignIn.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSignIn } from "react-auth-kit";

const SignIn = () => {
  const [visibleSeConnecter, setvisibleSeConnecter] = useState(false);

  const signIn = useSignIn();

  const ButtonSeConnecter = () => {
    setvisibleSeConnecter(true);
  };

  const ButtonInscription = () => {
    setvisibleSeConnecter(false);
  };

  const ButtonConnexion = (e) => {
    e.preventDefault();
    var Uemail = document.getElementById("Uemail").value;
    var Upass = document.getElementById("Upass").value;
    axios
      .get(
        `https://localhost:7165/api/Utilisateur/SignIn?email=${Uemail}&pass=${Upass}`
      )
      .then((result) => {
        if (result.data.statut === "Validé") {
          signIn({
            token: result.data.pass,
            expiresIn: 3600,
            tokenType: "Bearer",
            authState: result.data,
          });
          window.location.href = "/";
        } else {
          toast("🔄 Votre compte en attente de validation!");
        }
      })
      .catch((error) => {
        toast("❌ Email ou mot de passe incorrect!");
        console.log(error);
      });
  };

  return (
    <div className="SignIn">
      <div className="Auth-Navbar">
        <div className="navbar-right" onClick={ButtonSeConnecter}>
          <FaUser className="icon" />
          <label>Se connecter</label>
        </div>
      </div>
      <div className="header">
        <h1>AUTHENTIFICATION</h1>
      </div>
      {visibleSeConnecter && (
        <div className="div-popup-back">
          <div className="div-popup-SignIn">
            <div className="div-subpopup-SignIn">
              <label>CONNEXION</label>
            </div>
            <form className="form-SignUp" onSubmit={ButtonConnexion}>
              <legend id="legend-SignIn">Se connecter</legend>
              <table>
                <tr>
                  <td id="tr-SignIn">
                    <input
                      type="email"
                      placeholder="Adress email"
                      id="Uemail"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td id="tr-SignIn">
                    <input
                      type="password"
                      placeholder="Mot de pass"
                      id="Upass"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="submit" value="Connexion" id="btn-SignUp" />
                  </td>
                </tr>
              </table>
              <div className="form-btn-Inscription">
                <label>Pas encore de compte?</label>
                <label id="btn-Insription" onClick={ButtonInscription}>
                  Inscription
                </label>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default SignIn;
