import React, { useEffect, useState } from "react";
import "./ProduitModif.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProduitModif = () => {
  const [dataProduits, setDataProduits] = useState([]);
  const [visiblePopup, setvisiblePopup] = useState(false);
  const [dN, setdN] = useState();
  const [dataCategorie, setDataCategorie] = useState([]);
  const [dataSCategorie, setDataSCategorie] = useState([]);

  useEffect(() => {
    getProduits();
    getDataCategorie();
  }, []);

  const getProduits = () => {
    axios
      .get("https://localhost:7165/api/Produit/all")
      .then((result) => {
        setDataProduits(result.data);
      })
      .catch((error) => {
        toast("Error Produits");
        console.log(error);
      });
  };

  const HidePopUp = () => {
    setvisiblePopup(false);
  };

  const ShowPopUp = (n) => {
    setdN(n);
    setvisiblePopup(true);
  };

  const getDataCategorie = () => {
    axios
      .get("https://localhost:7165/api/Categorie")
      .then((result) => {
        setDataCategorie(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDataSCategorie = (idCategorieMere) => {
    axios
      .get(`https://localhost:7165/api/Categorie/${idCategorieMere}`)
      .then((result) => {
        setDataSCategorie(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const OnChangeCategorie = () => {
    var idCategorieMere =
      dataCategorie[document.getElementById("selectCategorie").value].id;
    getDataSCategorie(idCategorieMere);
  };

  return (
    <div className="ProduitModif">
      <div className="header">
        <h1>LES PRODUITS</h1>
      </div>
      <div className="container">
        <table className="tab_le">
          <thead>
            <tr className="tittre">
              <th colSpan="7">Nombre de resultats : {dataProduits.length}</th>
            </tr>
            <tr className="sousTitre">
              <th id="th-Center">#</th>
              <th id="th-Center">Catégorie</th>
              <th id="th-Center">Sous Catégorie</th>
              <th id="th-Center">Désignation</th>
              <th id="th-Center">Marque</th>
              <th id="th-Center">Quantité</th>
              <th id="th-Center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataProduits.map((opts, i) => (
              <tr className="tr-ListProduit">
                <td id="th-Center">{i + 1}</td>
                <td id="th-Center">{opts.categorie2Nom}</td>
                <td id="th-Center">{opts.categorie1Nom}</td>
                <td id="th-Center">{opts.designation}</td>
                <td id="th-Center">{opts.marque}</td>
                <td id="th-Center">{opts.qte}</td>
                <td>
                  <button
                    id="btn-blue"
                    className="button-ajouter"
                    onClick={() => ShowPopUp(i)}
                  >
                    Modifier
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {visiblePopup && (
        <div className="div-popup-back">
          <div className="div-popup">
            <h3>Modification</h3>
            <br />
            <h4>Voulez-vous vraiment modifier ce produit ?</h4>
            <table id="popup-table">
              <thead>
                <th id="th-Center">#</th>
                <th id="th-Center">Catégorie</th>
                <th id="th-Center">Sous Catégorie</th>
                <th id="th-Center">Désignation</th>
                <th id="th-Center">Marque</th>
                <th id="th-Center">Quantité</th>
              </thead>
              <tbody>
                <tr>
                  <td id="th-Center">{dN + 1}</td>
                  <td id="th-Center">{dataProduits[dN].categorie2Nom}</td>
                  <td id="th-Center">{dataProduits[dN].categorie1Nom}</td>
                  <td id="th-Center">{dataProduits[dN].designation}</td>
                  <td id="th-Center">{dataProduits[dN].marque}</td>
                  <td id="th-Center">{dataProduits[dN].qte}</td>
                </tr>
              </tbody>
            </table>
            <br />
            <table id="popup-table">
              <tr>
                <td colSpan="6">
                  <h4>Saisissez les nouvelles informations :</h4>
                </td>
              </tr>
              <tr>
                <th id="th-Center">#</th>
                <th id="th-Center">Catégorie</th>
                <th id="th-Center" colSpan="2">
                  Sous Catégorie
                </th>
              </tr>
              <tbody>
                <tr>
                  <td id="th-Center" rowSpan="3">
                    {dN + 1}
                  </td>
                  <td id="th-Center" className="td-width">
                    <select id="selectCategorie" onChange={OnChangeCategorie}>
                      <option value="0" hidden>
                        {dataProduits[dN].categorie2Nom}
                      </option>
                      {dataCategorie.map((opts, i) => (
                        <option value={i}>{opts.nom}</option>
                      ))}
                    </select>
                  </td>
                  <td id="th-Center" colSpan="2">
                    <select id="selectSCategorie">
                      <option value="0" hidden>
                        {dataProduits[dN].categorie1Nom}
                      </option>
                      {dataSCategorie.map((opts, i) => (
                        <option value={i}>{opts.nom}</option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <th id="th-Center">Désignation</th>
                  <th id="th-Center">Marque</th>
                  <th id="th-Center">Quantité</th>
                </tr>
                <tr>
                  <td id="th-Center">
                    <input type="text" value={dataProduits[dN].designation} />
                  </td>
                  <td id="th-Center">
                    <input type="text" value={dataProduits[dN].marque} />
                  </td>
                  <td id="th-Center">
                    <input type="text" value={dataProduits[dN].qte} />
                  </td>
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
                  <button id="popup-done">Modifier</button>
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

export default ProduitModif;
