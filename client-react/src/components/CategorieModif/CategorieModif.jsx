import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CategorieModif = () => {
  const [dataCategories, setDataCategories] = useState([]);

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

  // const ButtonModifier = () => {

  //   axios.put(`https://localhost:7165/api/Categorie?_id=${}&_Nom=${}`).then(()=> {
  //     toast('✔️La catégorie a bien été modifiée!')
  //   }).catch((error)=> {
  //     toast("❌La catégorie n'a pas été modifiée!")
  //     console.log(error);
  //   })
  // }

  return (
    <div>
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
                  <button id="btn-download" className="button-ajouter">
                    Modifier
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CategorieModif;
