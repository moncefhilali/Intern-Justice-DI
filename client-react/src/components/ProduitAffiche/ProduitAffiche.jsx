import React, { useEffect } from "react";
import "./ProduitAffiche.css";

const ProduitAffiche = () => {
  useEffect(() => {}, []);

  return (
    <div>
      <div className="header">
        <h1>LES PRODUITS</h1>
      </div>
      <div className="table-selector">
        <input type="radio" name="selector" id="radio-EnStock" defaultChecked />
        <label htmlFor="radio-EnStock">En Stock ()</label>
        <input type="radio" name="selector" id="radio-Epuise" />
        <label htmlFor="radio-Epuise">Épuisé ()</label>
        <input type="radio" name="selector" id="radio-EnRupture" />
        <label htmlFor="radio-EnRupture">En Rupture ()</label>
        <label id="label-line"></label>
      </div>
    </div>
  );
};

export default ProduitAffiche;
