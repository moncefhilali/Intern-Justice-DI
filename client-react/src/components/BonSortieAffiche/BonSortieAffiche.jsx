import React, { useEffect, useState } from "react";
import "./BonSortieAffiche.css";
import axios from "axios";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PiArrowBendDownRightDuotone } from "react-icons/pi";
import { IoSearch } from "react-icons/io5";
import { HiDocumentArrowUp } from "react-icons/hi2";
import { BsDownload } from "react-icons/bs";

const BonSortieAffiche = () => {
  const [dataBonsSortie, setDataBonsSortie] = useState([]);
  const [dataDemande, setDataDemande] = useState([]);
  const [dataDemandeProduits, setDataDemandeProduits] = useState([]);
  const [visibleDemande, setvisibleDemande] = useState(false);
  const [visiblePopupShow, setvisiblePopupShow] = useState(false);
  const [visiblePopupPrint, setvisiblePopupPrint] = useState(false);
  const [visiblePrint, setvisiblePrint] = useState(false);
  const [dataDateDemande, setDataDateDemande] = useState("2000-02-02");
  const [dN, setdN] = useState();
  var days = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];

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

  const getByIdDemande = (n) => {
    if (visibleDemande === true) {
      setvisibleDemande(false);
    } else {
      var nD = dataBonsSortie[n].idDemande;
      axios
        .get(`https://localhost:7165/api/Demande/info/${nD}`)
        .then((result) => {
          setDataDemande(result.data);
          setDataDateDemande(result.data.dateDemande);
        })
        .catch((error) => {
          toast("Error Demande");
          console.log(error);
        });
      setvisibleDemande(true);
    }
  };

  const ShowPopUp = () => {
    setvisiblePopupShow(true);
    axios
      .get(
        `https://localhost:7165/api/Demande_Produit/Produits/${dataDemande.id}`
      )
      .then((result) => {
        setDataDemandeProduits(result.data);
      })
      .catch((error) => {
        console.log(error);
        toast("Error Produits Demande");
      });
  };

  const ButtonAnnuler = () => {
    setvisiblePopupShow(false);
  };

  const ShowPopUpPrint = (n) => {
    setdN(n);
    setvisiblePopupPrint(true);
    setvisiblePrint(true);
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
              <th colSpan="7">Nombre de resultats : {dataBonsSortie.length}</th>
            </tr>
            <tr className="sousTitre">
              <th id="blank-th"></th>
              <th id="th-Center">#</th>
              <th id="th-Center" colSpan="2">
                Date de création
              </th>
              <th id="th-Center" colSpan="2">
                Date de sortie
              </th>
              <th id="th-Center" colSpan="2">
                Actions
              </th>
            </tr>
          </thead>
          {dataBonsSortie.map((opts, i) => (
            <tbody>
              <tr className="tr-ListProduit">
                <td id="th-Center">
                  <button
                    className="button-icons"
                    id="btn-telecharger"
                    onClick={() => getByIdDemande(i)}
                  >
                    <PiArrowBendDownRightDuotone />
                  </button>
                </td>
                <td id="th-Center">{i + 1}</td>
                <td id="th-Center" colSpan="2">
                  {days[new Date(opts.dateCreation).getDay()] +
                    " " +
                    format(new Date(opts.dateCreation), "d", {
                      locale: fr,
                    }) +
                    " " +
                    format(new Date(opts.dateCreation), "MMMM", {
                      locale: fr,
                    })
                      .charAt(0)
                      .toUpperCase() +
                    format(new Date(opts.dateCreation), "MMMM", {
                      locale: fr,
                    }).slice(1) +
                    " " +
                    format(new Date(opts.dateCreation), "Y", {
                      locale: fr,
                    })}
                </td>
                <td id="th-Center" colSpan="2">
                  {days[new Date(opts.dateSortie).getDay()] +
                    " " +
                    format(new Date(opts.dateSortie), "d", {
                      locale: fr,
                    }) +
                    " " +
                    format(new Date(opts.dateSortie), "MMMM", {
                      locale: fr,
                    })
                      .charAt(0)
                      .toUpperCase() +
                    format(new Date(opts.dateSortie), "MMMM", {
                      locale: fr,
                    }).slice(1) +
                    " " +
                    format(new Date(opts.dateSortie), "Y", {
                      locale: fr,
                    })}
                </td>
                <td id="th-Center" colSpan="2">
                  <div className="div-btn-telecharger">
                    {opts.idDocument === "null"
                      ? false
                      : true && (
                          <button
                            id="btn-telecharger"
                            className="button-icons"
                            onClick={() => ShowPopUpPrint(i)}
                          >
                            <HiDocumentArrowUp />
                          </button>
                        )}
                  </div>
                </td>
              </tr>
              {visibleDemande && (
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
              )}
              {visibleDemande && (
                <tr className="tr-ListProduit">
                  <td id="blank-th"></td>
                  <td id="th-Center">{dataDemande.nom}</td>
                  <td id="th-Center">{dataDemande.prenom}</td>
                  <td id="th-Center">{dataDemande.cin}</td>
                  <td id="th-Center">{dataDemande.entite}</td>
                  <td id="th-Center">
                    {format(new Date(dataDateDemande), "dd/MM/yyyy")}
                  </td>
                  <td id="th-Center">{dataDemande.statut}</td>
                  <td id="th-Center">
                    <button
                      id="btn-telecharger"
                      className="button-icons"
                      onClick={ShowPopUp}
                    >
                      <IoSearch />
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          ))}
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
                {dataDemande.statut === "En attente de validation"
                  ? false
                  : true && <th>Quantité Accordée</th>}
              </thead>
              <tbody>
                {dataDemandeProduits.map((opts, i) => (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{opts.designation}</td>
                    <td>{opts.qteDemandee}</td>
                    {dataDemande.statut === "En attente de validation"
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
      <ToastContainer />
    </div>
  );
};

export default BonSortieAffiche;
