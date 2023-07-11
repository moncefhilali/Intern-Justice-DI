import React, { useEffect, useState } from "react";
import "./BonSortieAffiche.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PiArrowBendDownRightDuotone } from "react-icons/pi";

const BonSortieAffiche = () => {
  const [dataBonsSortie, setDataBonsSortie] = useState([]);

  useEffect(() => {
    getBonsSortie();
  }, []);

  const getBonsSortie = () => {
    axios
      .get("https://localhost:7165/api/BonSortie")
      .then((result) => {
        setDataBonsSortie(result.data);
      })
      .catch((error) => {
        toast("Error Bons Sortie");
        console.log(error);
      });
  };

  return (
    <div className="BonSortieAffiche">
      <div class="header">
        <h1>LES BONS DE SORTIE</h1>
      </div>
      <div className="container">
        <table className="tab_le">
          <thead>
            <tr className="tittre">
              <th id="blank-th"></th>
              <th colSpan="7">Nombre de resultats : 9999999</th>
            </tr>
            <tr className="sousTitre">
              <th id="blank-th"></th>
              <th id="th-Center">#</th>
              <th id="th-Center">Date de création</th>
              <th id="th-Center">Date de sortie</th>
              <th id="th-Center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="tr-ListProduit">
              <td id="th-Center">
                <PiArrowBendDownRightDuotone />
              </td>
              <td id="th-Center">1</td>
              <td id="th-Center">1</td>
              <td id="th-Center">1</td>
              <td id="th-Center">1</td>
            </tr>
            <tr className="sousTitre">
              <th id="blank-th"></th>
              <th id="th-Center">Nom</th>
              <th id="th-Center">Prénom</th>
              <th id="th-Center">CIN</th>
              <th id="th-Center">Entité</th>
              <th id="th-Center">Date de demande</th>
              <th id="th-Center">Statut</th>
              <th id="th-Center">Actions</th>
            </tr>
            <tr className="tr-ListProduit">
              <td id="blank-th"></td>
              <td id="th-Center">1</td>
              <td id="th-Center">1</td>
              <td id="th-Center">1</td>
              <td id="th-Center">1</td>
              <td id="th-Center">1</td>
              <td id="th-Center">1</td>
              <td id="th-Center">1</td>
            </tr>
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BonSortieAffiche;
