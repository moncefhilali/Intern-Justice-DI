import React, { useEffect, useState } from "react";
import "./ProduitAffiche.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProduitAffiche = () => {
  const [dataStock, setDataStock] = useState([]);
  const [dataRupture, setDataRupture] = useState([]);
  const [dataEpuise, setDataEpuise] = useState([]);
  const [dataSelectedProduits, setDataSelectedProduits] = useState([]);

  useEffect(() => {
    getProduitsStock();
    getProduitsRupture();
    getProduitsEpuise();
  }, []);

  const getProduitsStock = () => {
    axios
      .get("https://localhost:7165/api/Produit/stock")
      .then((result) => {
        setDataStock(result.data);
        setDataSelectedProduits(result.data);
      })
      .catch((error) => {
        toast("Error Produits En Stock");
        console.log(error);
      });
  };

  const getProduitsRupture = () => {
    axios
      .get("https://localhost:7165/api/Produit/rupture")
      .then((result) => {
        setDataRupture(result.data);
      })
      .catch((error) => {
        toast("Error Produits En Rupture");
        console.log(error);
      });
  };

  const getProduitsEpuise = () => {
    axios
      .get("https://localhost:7165/api/Produit/epuise")
      .then((result) => {
        setDataEpuise(result.data);
      })
      .catch((error) => {
        toast("Error Produits Epuise");
        console.log(error);
      });
  };

  const OnCheckRadio = (event) => {
    if (event.target.value === "Stock") {
      setDataSelectedProduits(dataStock);
    }
    if (event.target.value === "Epuise") {
      setDataSelectedProduits(dataEpuise);
    }
    if (event.target.value === "Rupture") {
      setDataSelectedProduits(dataRupture);
    }
  };

  return (
    <div>
      <div className="header">
        <h1>LES PRODUITS</h1>
      </div>
      <div className="table-selector" onChange={OnCheckRadio}>
        <input
          type="radio"
          name="selector"
          value="Stock"
          id="radio-EnStock"
          defaultChecked
        />
        <label htmlFor="radio-EnStock">En Stock ({dataStock.length})</label>
        <input type="radio" name="selector" value="Epuise" id="radio-Epuise" />
        <label htmlFor="radio-Epuise">Épuisé ({dataEpuise.length})</label>
        <input
          type="radio"
          name="selector"
          value="Rupture"
          id="radio-EnRupture"
        />
        <label htmlFor="radio-EnRupture">
          En Rupture ({dataRupture.length})
        </label>
        <label id="label-line"></label>
      </div>
      <div className="container">
        <table className="tab_le">
          <thead>
            <tr className="sousTitre">
              <th id="th-Center">#</th>
              <th id="th-Center">Catégorie</th>
              <th id="th-Center">Sous Catégorie</th>
              <th id="th-Center">Désignation</th>
              <th id="th-Center">Marque</th>
              <th id="th-Center">Quantité</th>
            </tr>
          </thead>
          <tbody>
            {dataSelectedProduits.map((opts, i) => (
              <tr className="tr-ListProduit">
                <td id="th-Center">{i + 1}</td>
                <td id="th-Center">{opts.categorie2Nom}</td>
                <td id="th-Center">{opts.categorie1Nom}</td>
                <td id="th-Center">{opts.designation}</td>
                <td id="th-Center">{opts.marque}</td>
                <td id="th-Center">{opts.qte}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProduitAffiche;
