import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProduitModif = () => {
  const [dataProduits, setDataProduits] = useState([]);

  useEffect(() => {
    getProduits();
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

  return (
    <div>
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
                  <button id="btn-blue" className="button-ajouter">
                    Modifier
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProduitModif;
