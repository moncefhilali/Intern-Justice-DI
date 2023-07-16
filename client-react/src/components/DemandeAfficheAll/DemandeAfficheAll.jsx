import React, { useEffect, useState } from "react";
import "./DemandeAfficheAll.css";
import { format } from "date-fns";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthUser } from "react-auth-kit";
import { FaGears } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { FaTruck } from "react-icons/fa6";

const DemandeAfficheAll = () => {
  const auth = useAuthUser();
  const [dataDemande, setDataDemande] = useState([]);
  const [dataDemandeProduits, setDataDemandeProduits] = useState([]);
  const [visiblePopupShow, setvisiblePopupShow] = useState(false);
  const [visiblePopupValider, setvisiblePopupValider] = useState(false);
  const [visiblePopupLivrer, setvisiblePopupLivrer] = useState(false);
  const [dN, setdN] = useState();

  useEffect(() => {
    getDemandes();
  }, []);

  const getDemandes = () => {
    axios
      .get("https://localhost:7165/api/Demande/info")
      .then((result) => {
        setDataDemande(result.data);
      })
      .catch((error) => {
        toast("Error Demandes");
        console.log(error);
      });
  };

  const ShowPopUp = (n) => {
    setdN(n);
    setvisiblePopupShow(true);
    axios
      .get(
        `https://localhost:7165/api/Demande_Produit/Produits/${dataDemande[n].id}`
      )
      .then((result) => {
        setDataDemandeProduits(result.data);
      })
      .catch((error) => {
        console.log(error);
        toast("Error Produits Demande");
      });
  };

  const ShowPopUpValider = (n) => {
    setdN(n);
    setvisiblePopupValider(true);
    axios
      .get(
        `https://localhost:7165/api/Demande_Produit/Produits/${dataDemande[n].id}`
      )
      .then((result) => {
        setDataDemandeProduits(result.data);
      })
      .catch((error) => {
        console.log(error);
        toast("Error Produits Demande");
      });
  };

  const ShowPopUpLivrer = (n) => {
    setdN(n);
    setvisiblePopupLivrer(true);
    axios
      .get(
        `https://localhost:7165/api/Demande_Produit/Produits/${dataDemande[n].id}`
      )
      .then((result) => {
        setDataDemandeProduits(result.data);
      })
      .catch((error) => {
        console.log(error);
        toast("Error Produits Demande");
      });
  };

  const HidePopUp = () => {
    setvisiblePopupShow(false);
    setvisiblePopupValider(false);
    setvisiblePopupLivrer(false);
  };

  const ButtonAnnuler = () => {
    HidePopUp();
  };

  const ButtonValider = () => {
    var checkValues = true;
    for (let i = 0; i < dataDemandeProduits.length; i++) {
      if (document.getElementById(`qteAcc${i}`).value === "") {
        checkValues = false;
      }
    }
    if (checkValues) {
      var dP = [...dataDemandeProduits];
      dataDemandeProduits.forEach((opts, i) => {
        var qa = document.getElementById(`qteAcc${i}`).value;
        dP[i].qteAccordee = parseInt(qa);
        axios
          .put("https://localhost:7165/api/Demande_Produit", dP[i])
          .catch((error) => {
            console.log(error);
            toast("❌La demande n'a pas été validée!");
          });
      });
      setDataDemandeProduits(dP);
      var d = dataDemande[dN];
      d.statut = "Validé";
      axios
        .put(`https://localhost:7165/api/Demande?UpdatedBy=${auth().id}`, d)
        .then(() => {
          var ds = [...dataDemande];
          ds[dN] = d;
          setDataDemande(ds);
          toast("✔️ La demande a bien été validée!");
        })
        .catch((error) => {
          console.log(error);
          toast("❌La demande n'a pas été validée!");
        });
      HidePopUp();
    } else {
      toast("❌ Veuillez entrer toutes les quantités accordées!");
    }
  };

  const ButtonLivrer = () => {
    var dS = document.getElementById("dateSortie").value;
    if (dS === "") {
      document.getElementById("dateSortie").style.borderWidth = "3px";
      document.getElementById("dateSortie").style.borderColor = "red";
      toast("❌ Veuillez entrer la date de sortie svp!");
    } else {
      // current date
      const current = new Date();
      var Cdate = `${current.getFullYear()}-${
        current.getMonth() + 1
      }-${current.getDate()}`;
      Cdate = format(new Date(Cdate), "yyyy-MM-dd");
      // posted object
      var bS = {
        idDocument: null,
        idDemande: dataDemande[dN].id,
        idCreePar: auth().id,
        dateSortie: dS,
        dateCreation: Cdate,
      };
      axios
        .post("https://localhost:7165/api/BonSortie", bS)
        .then(() => {
          toast("✔️ La demande a été livrée !");
          var d = dataDemande[dN];
          d.statut = "Livré";
          axios
            .put(`https://localhost:7165/api/Demande?UpdatedBy=${auth().id}`, d)
            .then(() => {
              var ds = [...dataDemande];
              ds[dN] = d;
              setDataDemande(ds);
              HidePopUp();
            });
        })
        .catch((error) => {
          console.log(error);
          toast("❌La demande n'a pas été livrée!");
        });
    }
  };

  return (
    <div className="DemandeAfficheAll">
      <div className="header">
        <h1>LES DEMANDES DE SORTIE</h1>
      </div>
      <div className="container">
        <table className="tab_le">
          <thead>
            <tr className="tittre">
              <th colSpan="8">Nombre de resultats : {dataDemande.length}</th>
            </tr>
            <tr className="sousTitre">
              <th id="th-Center">#</th>
              <th id="th-Center">Nom</th>
              <th id="th-Center">Prénom</th>
              <th id="th-Center">CIN</th>
              <th id="th-Center">Entité</th>
              <th id="th-Center">Date de demande</th>
              <th id="th-Center">Statut</th>
              <th id="th-Center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataDemande.map((opts, i) => (
              <tr className="tr-ListProduit">
                <td id="th-Center">{i + 1}</td>
                <td id="th-Center">{opts.nom}</td>
                <td id="th-Center">{opts.prenom}</td>
                <td id="th-Center">{opts.cin}</td>
                <td id="th-Center">{opts.entite}</td>
                <td id="th-Center">
                  {format(new Date(opts.dateDemande), "dd/MM/yyyy")}
                </td>
                <td id="th-Center">{opts.statut}</td>
                <td id="th-Center">
                  <div className="div-btn-telecharger">
                    <button
                      id="btn-download"
                      className="button-icons"
                      onClick={() => ShowPopUp(i)}
                    >
                      <IoSearch />
                    </button>
                    {opts.statut !== "En attente de validation"
                      ? false
                      : true && (
                          <button
                            id="btn-valider"
                            className="button-icons"
                            onClick={() => ShowPopUpValider(i)}
                          >
                            <FaGears />
                          </button>
                        )}
                    {opts.statut !== "Validé"
                      ? false
                      : true && (
                          <button
                            id="btn-livrer"
                            className="button-icons"
                            onClick={() => ShowPopUpLivrer(i)}
                          >
                            <FaTruck />
                          </button>
                        )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {visiblePopupShow && (
        <div className="div-popup-back">
          <div className="div-popup">
            <h3>Details</h3>
            <br />
            <h4>Les Articles de La Demande</h4>
            <table id="popup-table">
              <thead>
                <th id="th-Center">#</th>
                <th id="th-Center">Produit</th>
                <th id="th-Center">Quantité Demandée</th>
                {dataDemande[dN].statut === "En attente de validation"
                  ? false
                  : true && <th>Quantité Accordée</th>}
              </thead>
              <tbody>
                {dataDemandeProduits.map((opts, i) => (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{opts.designation}</td>
                    <td>{opts.qteDemandee}</td>
                    {dataDemande[dN].statut === "En attente de validation"
                      ? false
                      : true && <td>{opts.qteAccordee}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
            <br />
            <table id="popup-table">
              <tr>
                <td>
                  <button id="popup-cancel" onClick={ButtonAnnuler}>
                    Fermer
                  </button>
                </td>
              </tr>
            </table>
          </div>
        </div>
      )}
      {visiblePopupValider && (
        <div className="div-popup-back">
          <div className="div-popup">
            <h3>Validation</h3>
            <br />
            <h4>Veuillez entrer la quantité accordée des articles</h4>
            <table id="popup-table">
              <thead>
                <th id="th-Center">#</th>
                <th id="th-Center">Produit</th>
                <th id="th-Center">Quantité Demandée</th>
                <th>Quantité Accordée</th>
              </thead>
              <tbody>
                {dataDemandeProduits.map((opts, i) => (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{opts.designation}</td>
                    <td>{opts.qteDemandee}</td>
                    <td>
                      <input type="number" id={`qteAcc${i}`} min="0" required />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <br />
            <table id="popup-table">
              <tr>
                <td>
                  <button id="popup-cancel" onClick={ButtonAnnuler}>
                    Annuler
                  </button>
                </td>
                <td>
                  <button id="popup-done" onClick={ButtonValider}>
                    Valider
                  </button>
                </td>
              </tr>
            </table>
          </div>
        </div>
      )}
      {visiblePopupLivrer && (
        <div className="div-popup-back">
          <div className="div-popup">
            <h3>Livraison</h3>
            <br />
            <h4>Les Articles de La Demande</h4>
            <table id="popup-table">
              <thead>
                <th id="th-Center">#</th>
                <th id="th-Center">Produit</th>
                <th id="th-Center">Quantité Demandée</th>
                {dataDemande[dN].statut === "En attente de validation"
                  ? false
                  : true && <th>Quantité Accordée</th>}
              </thead>
              <tbody>
                {dataDemandeProduits.map((opts, i) => (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{opts.designation}</td>
                    <td>{opts.qteDemandee}</td>
                    {dataDemande[dN].statut === "En attente de validation"
                      ? false
                      : true && <td>{opts.qteAccordee}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
            <br />
            <table id="popup-table">
              <tr>
                <td>
                  <h4>Veuillez choisir la date de sortie :</h4>
                </td>
                <td>
                  <input type="date" id="dateSortie" />
                </td>
              </tr>
            </table>
            <br />
            <table id="popup-table">
              <tr>
                <td>
                  <button id="popup-cancel" onClick={ButtonAnnuler}>
                    Annuler
                  </button>
                </td>
                <td>
                  <button id="popup-done" onClick={ButtonLivrer}>
                    Livrer
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

export default DemandeAfficheAll;
