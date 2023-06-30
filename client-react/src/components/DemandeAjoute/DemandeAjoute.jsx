import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";
import { useAuthUser } from "react-auth-kit";

const DemandeAjoute = () => {
  const [dataProduitList, setDataProduitList] = useState([]);
  const [dataCategorie, setDataCategorie] = useState([]);
  const [dataSCategorie, setDataSCategorie] = useState([]);
  const [dataProduit, setDataProduit] = useState([]);
  const auth = useAuthUser();

  useEffect(() => {
    getDataCategorie();
  }, []);

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

  const getDataProduit = (idSousCategorie) => {
    axios
      .get(`https://localhost:7165/api/Produit/${idSousCategorie}`)
      .then((result) => {
        setDataProduit(result.data);
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

  const OnChangeSCategorie = () => {
    var idSousCategorie =
      dataSCategorie[document.getElementById("selectSCategorie").value].id;
    getDataProduit(idSousCategorie);
  };

  const ButtonAjouter = () => {
    const ListValues = {
      Categorie:
        dataCategorie[document.getElementById("selectCategorie").value].nom,
      SCategorie:
        dataSCategorie[document.getElementById("selectSCategorie").value].nom,
      Produit:
        dataProduit[document.getElementById("selectProduit").value].designation,
      Qte: document.getElementById("inputQte").value,
      idProduit: dataProduit[document.getElementById("selectProduit").value].id,
    };
    const PL = [...dataProduitList, ListValues];
    setDataProduitList(PL);
  };

  const ButtonSupprimer = (i) => {
    const PL = [...dataProduitList];
    PL.splice(i, 1);
    setDataProduitList(PL);
  };

  const ButtonEnregister = () => {
    if (dataProduitList.length === 0) {
      toast("❌ Il faut ajouter au moins un produit!");
    } else {
      const current = new Date();
      var Cdate = `${current.getFullYear()}-${
        current.getMonth() + 1
      }-${current.getDate()}`;
      Cdate = format(new Date(Cdate), "yyyy-MM-dd");
      axios
        .post("https://localhost:7165/api/Demande", {
          demandeur: auth().id,
          dateDemande: Cdate,
          statut: "En attente de validation",
        })
        .then((result) => {
          toast("✔️ Demande a été bien inséré !");
          var idDemandeInseree = result.data;
          dataProduitList.forEach((opts, i) => {
            axios
              .post("https://localhost:7165/api/Demande_Produit", {
                idDemande: idDemandeInseree,
                idProduit: opts.idProduit,
                qteDemandee: opts.Qte,
                qteAccordee: null,
              })
              .catch((error) => {
                toast(error);
              });
          });
          var pll = [];
          setDataProduitList(pll);
        })
        .catch((error) => {
          toast("❌ Demande pas inserer!");
          console.log(error);
        });
    }
  };

  return (
    <div className="DemandeAjoute">
      <div className="header">
        <h1>INSERTION D'UN DEMANDE</h1>
      </div>
      <div className="container">
        <table className="tab_le">
          <thead>
            <tr className="tittre">
              <th colSpan="19" className="Bon">
                <h5>Produits</h5>
              </th>
            </tr>
            <tr className="sousTitre">
              <th colSpan="3" id="th-Center">
                Catégorie
              </th>
              <th colSpan="3" id="th-Center">
                Sous Catégorie
              </th>
              <th colSpan="3" id="th-Center">
                Désignation
              </th>
              <th colSpan="3" id="th-Center">
                Quantité Demandée
              </th>
              <th colSpan="3" id="th-Center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {/* tr - List des Produits */}
            {dataProduitList.map((opts, i) => (
              <tr className="tr-ListProduit" id={"i" + (i % 2)}>
                <td colSpan="3">
                  <label htmlFor="">{opts.Categorie}</label>
                </td>
                <td colSpan="3">
                  <label htmlFor="">{opts.SCategorie}</label>
                </td>
                <td colSpan="3">
                  <label htmlFor="">{opts.Produit}</label>
                </td>
                <td colSpan="3" id="th-Center">
                  <label htmlFor="">{opts.Qte}</label>
                </td>
                <td colSpan="3">
                  <button
                    id="btnSup"
                    className="button-ajouter"
                    onClick={() => ButtonSupprimer(i)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
            {/* tr - List des Produits */}
            <tr>
              <td colSpan="3">
                <select id="selectCategorie" onChange={OnChangeCategorie}>
                  <option value="" hidden>
                    Sélectionnez...
                  </option>
                  {dataCategorie.map((opts, i) => (
                    <option value={i}>{opts.nom}</option>
                  ))}
                </select>
              </td>
              <td colSpan="3">
                <select id="selectSCategorie" onChange={OnChangeSCategorie}>
                  <option value="" hidden>
                    Sélectionnez...
                  </option>
                  {dataSCategorie.map((opts, i) => (
                    <option value={i}>{opts.nom}</option>
                  ))}
                </select>
              </td>
              <td colSpan="3">
                <select id="selectProduit">
                  <option value="" hidden>
                    Sélectionnez...
                  </option>
                  {dataProduit.map((opts, i) => (
                    <option value={i}>{opts.designation}</option>
                  ))}
                </select>
              </td>
              <td colSpan="3" id="tdQte">
                <input type="number" id="inputQte" min={1} />
              </td>
              <td colSpan="3">
                <button
                  id="btnAjt"
                  className="button-ajouter"
                  onClick={ButtonAjouter}
                >
                  Ajouter
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="enregistrer">
          <button className="enregistrer-button" onClick={ButtonEnregister}>
            Enregistrer
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export default DemandeAjoute;
