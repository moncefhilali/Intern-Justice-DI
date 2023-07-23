import React, { useEffect, useState } from "react";
import "./CategorieModif.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CategorieModif = () => {
  const [dataCategories, setDataCategories] = useState([]);
  const [visiblePopup, setvisiblePopup] = useState(false);
  const [dN, setdN] = useState();

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    axios
      .get("https://localhost:7165/api/Categorie/all")
      .then((result) => {
        setDataCategories(result.data);
      })
      .catch((error) => {
        toast("Error Categories");
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

  const ButtonModifier = () => {
    var nC = document.getElementById("nomCategorie");
    if (nC.value === "") {
      nC.style.borderWidth = "3px";
      nC.style.borderColor = "red";
      toast("❌ Veuillez entrer le nom de catégorie svp!");
    } else {
      axios
        .put(
          `https://localhost:7165/api/Categorie?_id=${dataCategories[dN].id}&_Nom=${nC.value}`
        )
        .then(() => {
          toast("✔️La catégorie a bien été modifiée!");
          getCategories();
          HidePopUp();
        })
        .catch((error) => {
          toast("❌La catégorie n'a pas été modifiée!");
          console.log(error);
        });
    }
  };

  return (
    <div className="CategorieModif">
      <div class="header">
        <h1>LES CATÉGORIES</h1>
      </div>
      <div className="container">
        <table className="tab_le">
          <thead>
            <tr className="tittre">
              <th colSpan="4">Nombre de resultats : {dataCategories.length}</th>
            </tr>
            <tr className="sousTitre">
              <th id="th-Center">#</th>
              <th id="th-Center">Catégorie</th>
              <th id="th-Center">Catégorie Parent</th>
              <th id="th-Center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataCategories.map((opts, i) => (
              <tr className="tr-ListProduit">
                <td id="th-Center">{i + 1}</td>
                <td>{opts.categorie1Nom}</td>
                <td>{opts.categorie2Nom}</td>
                <td id="th-Center">
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
            <h4>Voulez-vous vraiment modifier cette catégorie ?</h4>
            <table id="popup-table">
              <thead>
                <th id="th-Center">#</th>
                <th id="th-Center">Catégorie</th>
                <th id="th-Center">Catégorie Parent</th>
              </thead>
              <tbody>
                <tr>
                  <td id="th-Center">{dN + 1}</td>
                  <td>{dataCategories[dN].categorie1Nom}</td>
                  <td>{dataCategories[dN].categorie2Nom}</td>
                </tr>
              </tbody>
            </table>
            <br />
            <table id="popup-table">
              <tr>
                <td>
                  <h4>Saisissez le nouveau nom :</h4>
                </td>
                <td id="th-Center">
                  <input type="text" id="nomCategorie" />
                </td>
              </tr>
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
                  <button id="popup-done" onClick={ButtonModifier}>
                    Modifier
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

export default CategorieModif;
