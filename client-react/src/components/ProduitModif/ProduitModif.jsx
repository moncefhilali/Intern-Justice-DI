import React from "react";

const ProduitModif = () => {
  return (
    <div>
      <div className="header">
        <h1>LES PRODUITS</h1>
      </div>
      <div className="container">
        <table className="tab_le">
          <thead>
            <tr className="tittre">
              <th colSpan="7">Nombre de resultats : 9999</th>
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
            <tr className="tr-ListProduit">
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>Modifier</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProduitModif;