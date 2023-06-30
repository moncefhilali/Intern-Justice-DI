import React, { useEffect, useState } from "react";
import "./SignUp.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [dataVilles, setDataVilles] = useState([]);
  const [dataRoles, setDataRoles] = useState([]);
  const [dataCreatedUtilisateur, setDataCreatedUtilisateur] = useState({});

  useEffect(() => {
    loadVilles();
    getRoles();
  }, []);

  const loadVilles = () => {
    var villes = [
      "Casablanca",
      "Salé",
      "Tanger",
      "Fès",
      "Marrakech",
      "Safi",
      "Meknès",
      "Oujda",
      "Rabat",
      "Témara",
      "Agadir",
      "Kénitra",
      "Tétouaz",
      "Laayoune",
      "Mohammédia",
      "El Jadida",
      "Khouribga",
      "Béni Mellal",
      "Khémisset",
      "Nador",
      "Taza",
      "Berkane",
    ];
    setDataVilles(villes);
  };

  const getRoles = () => {
    axios
      .get("https://localhost:7165/api/Role")
      .then((result) => {
        setDataRoles(result.data);
      })
      .catch((error) => {
        toast("❌ Erreur lors du chargement des rôles!");
        console.log(error);
      });
  };

  const ButtonInscrire = (e) => {
    e.preventDefault();
    var Uville = document.getElementById("Uville").value;
    var Urole = document.getElementById("Urole").value;
    if (Uville === "default") {
      toast("❌ Veuillez choisir la ville!");
    } else {
      if (Urole === "default") {
        toast("❌ Veuillez choisir le rôle!");
      } else {
        var dataUtilisateur = {
          id: 0,
          Nom: document.getElementById("Unom").value,
          Prenom: document.getElementById("Uprenom").value,
          CIN: document.getElementById("Ucin").value,
          Entite: document.getElementById("Uentite").value,
          Ville: dataVilles[document.getElementById("Uville").value],
          idRole: dataRoles[document.getElementById("Urole").value].id,
          Email: document.getElementById("Uemail").value,
          Pass: document.getElementById("Umdp").value,
          Statut: "En attente de validation",
        };
        axios
          .get(
            `https://localhost:7165/api/Utilisateur/CIN/${dataUtilisateur.CIN}`
          )
          .then((result) => {
            if (result.data[0] === undefined) {
              axios
                .get(
                  `https://localhost:7165/api/Utilisateur/Email/${dataUtilisateur.Email}`
                )
                .then((result) => {
                  if (result.data[0] === undefined) {
                    axios
                      .post(
                        "https://localhost:7165/api/Utilisateur",
                        dataUtilisateur
                      )
                      .then((result) => {
                        dataUtilisateur.id = result.data;
                        setDataCreatedUtilisateur(dataUtilisateur);
                        toast(
                          "✔️ L'Utilisateur a été créé, en attente de validation par le responsable !"
                        );
                      })
                      .catch((error) => {
                        toast("❌ Erreur lors de la création de l'utilisateur");
                        console.log(error);
                      });
                  } else {
                    toast("❌ Email est déjà utilisé!");
                  }
                });
            } else {
              toast("❌ CIN est déjà utilisé!");
            }
          });
      }
    }
  };

  return (
    <div className="SignUp">
      <div className="div-SignUp">
        <form className="form-SignUp" onSubmit={ButtonInscrire}>
          <legend>Inscrivez-vous</legend>
          <table>
            <tr>
              <td>
                <input type="text" id="Unom" placeholder="Nom" required />
              </td>
              <td>
                <input type="text" id="Uprenom" placeholder="Prénom" required />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <input type="text" id="Uentite" placeholder="Entité" required />
              </td>
            </tr>
            <tr>
              <td>
                <input type="text" id="Ucin" placeholder="CIN" required />
              </td>
              <td>
                <select id="Uville">
                  <option value="default" hidden>
                    -- Ville
                  </option>
                  {dataVilles.map((opts, i) => (
                    <option value={i}>{opts}</option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <select id="Urole">
                  <option value="default" hidden>
                    -- Rôle
                  </option>
                  {dataRoles.map((opts, i) =>
                    opts.libelle !== "Admin"
                      ? true && <option value={i}>{opts.libelle}</option>
                      : false && <option value={i}>{opts.libelle}</option>
                  )}
                </select>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <input type="email" id="Uemail" placeholder="Email" required />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <input
                  type="password"
                  id="Umdp"
                  placeholder="Mot de passe"
                  required
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <input type="submit" value="S'inscrire" id="btn-SignUp" />
              </td>
            </tr>
          </table>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
