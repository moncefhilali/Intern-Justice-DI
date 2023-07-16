import axios from "axios";
import React, { useEffect, useState } from "react";
import "./UtilisateurAffiche.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UtilisateurAffiche = () => {
  const [dataUsers, setDataUsers] = useState([]);
  const [dN, setdN] = useState();
  const [visiblePopup, setvisiblePopup] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const ShowPopUp = (n) => {
    setdN(n);
    setvisiblePopup(true);
  };

  const HidePopUp = () => {
    setvisiblePopup(false);
  };

  const getUsers = () => {
    axios
      .get("https://localhost:7165/api/Utilisateur/Info")
      .then((result) => {
        setDataUsers(result.data);
      })
      .catch((error) => {
        toast("❌ Erreur lors du chargement des utilisateurs");
        console.log(error);
      });
  };

  const ButtonVerifier = () => {
    axios
      .put(`https://localhost:7165/api/Utilisateur/Accept/${dataUsers[dN].id}`)
      .then(() => {
        toast("✔️ L'Utilisateur a été vérifié !");
        getUsers();
        HidePopUp();
      })
      .catch((error) => {
        toast("❌ L'utilisateur n'a pas été vérifié !");
        console.log(error);
      });
  };

  return (
    <div className="UtilisateurAffiche">
      <div className="header">
        <h1>LES UTILISATEURS</h1>
      </div>
      <div className="container">
        <table className="tab_le">
          <thead>
            <tr className="sousTitre">
              <th id="th-Center">#</th>
              <th id="th-Center">CIN</th>
              <th id="th-Center">Nom</th>
              <th id="th-Center">Prénom</th>
              <th id="th-Center">Ville</th>
              <th id="th-Center">Entité</th>
              <th id="th-Center">Role</th>
              <th id="th-Center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataUsers.map((opts, i) => (
              <tr className="tr-ListProduit">
                <td id="th-Center">{i + 1}</td>
                <td id="th-Center">{opts.cin}</td>
                <td id="th-Center">{opts.nom}</td>
                <td id="th-Center">{opts.prenom}</td>
                <td id="th-Center">{opts.ville}</td>
                <td id="th-Center">{opts.entite}</td>
                <td id="th-Center">{opts.libelle}</td>
                <td id="th-Center">
                  {opts.statut === "Validé" ? (
                    false
                  ) : (
                    <button
                      id="btn-download"
                      className="button-ajouter"
                      onClick={() => ShowPopUp(i)}
                    >
                      Vérifier
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {visiblePopup && (
        <div className="div-popup-back">
          <div className="div-popup">
            <h3>Confirmation</h3>
            <br />
            <h4>Voulez-vous vraiment vérifier cet utilisateur ?</h4>
            <table id="popup-table">
              <thead>
                <th id="th-Center">#</th>
                <th id="th-Center">CIN</th>
                <th id="th-Center">Nom</th>
                <th id="th-Center">Prénom</th>
                <th id="th-Center">Ville</th>
                <th id="th-Center">Entité</th>
                <th id="th-Center">Role</th>
              </thead>
              <tbody>
                <tr>
                  <td>{dN + 1}</td>
                  <td>{dataUsers[dN].cin}</td>
                  <td>{dataUsers[dN].nom}</td>
                  <td>{dataUsers[dN].prenom}</td>
                  <td>{dataUsers[dN].ville}</td>
                  <td>{dataUsers[dN].entite}</td>
                  <td>{dataUsers[dN].libelle}</td>
                </tr>
              </tbody>
            </table>
            <br />
            <table id="popup-table">
              <tr>
                <td>
                  <button id="popup-cancel" onClick={HidePopUp}>
                    Annuler
                  </button>
                </td>
                <td>
                  <button id="popup-done" onClick={ButtonVerifier}>
                    Vérifier
                  </button>
                </td>
              </tr>
            </table>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default UtilisateurAffiche;
