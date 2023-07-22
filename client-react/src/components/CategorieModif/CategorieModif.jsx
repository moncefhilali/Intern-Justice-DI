import React from "react";

const CategorieModif = () => {
  return (
    <div>
      <div class="header">
        <h1>LES CATÉGORIES</h1>
      </div>
      <div className="container">
        <table className="tab_le">
          <thead>
            <tr className="tittre">
              <th colSpan="4">Nombre de resultats : 9999</th>
            </tr>
            <tr className="sousTitre">
              <th id="th-Center">#</th>
              <th id="th-Center">Catégorie</th>
              <th id="th-Center">Catégorie Parent</th>
              <th id="th-Center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="tr-ListProduit">
              <td id="th-Center">1</td>
              <td>1</td>
              <td>1</td>
              <td id="th-Center">Modifier</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategorieModif;
