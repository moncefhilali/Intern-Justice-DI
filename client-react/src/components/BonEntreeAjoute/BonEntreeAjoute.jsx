import PrintBonEntree from "../PrintBonEntree/PrintBonEntree";
import "./BonEntreeAjoute.css";
import { FaSync } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import axios from "axios";
import { useAuthUser } from "react-auth-kit";
import { useReactToPrint } from "react-to-print";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsDownload } from "react-icons/bs";

const BonEntreeAjoute = () => {
  const [visibleMP, setvisibleMP] = useState(false);
  const [visibleBC, setvisibleBC] = useState(false);
  const [dataBLF, setDataBLF] = useState([]);
  const [dataMagasin, setDataMagasin] = useState([]);
  const [dataCategorie, setDataCategorie] = useState([]);
  const [dataSCategorie, setDataSCategorie] = useState([]);
  const [dataProduit, setDataProduit] = useState([]);
  const [dataProduitList, setDataProduitList] = useState([]);
  const [dataBE, setDataBE] = useState({
    id: 0,
    idDocument: null,
    idMarchePublic: null,
    idBonComande: null,
    idBonLivraison: null,
    nDepense: null,
    dateBonEntree: null,
    typeBonEntree: null,
    Statut: "En attente de validation",
  });
  const [visiblePrint, setvisiblePrint] = useState(false);
  const [visiblePopup, setvisiblePopup] = useState(false);
  const [File, setFile] = useState();
  const componentRef = useRef();
  const auth = useAuthUser();

  useEffect(() => {
    getDataMagasin();
    getDataCategorie();
  }, []);

  const ClearFields = () => {
    document.getElementById("depense").value = "";
    if (visibleBC) {
      document.getElementById("nBC").value = "";
    } else {
      document.getElementById("nMP").value = "";
    }
    document.getElementById("idBLF").value = "";
    document.getElementById("dateBLF").value = "";
    document.getElementById("Fournisseur").value = "";
    var pll = [];
    setDataProduitList(pll);
    setDataBE({
      id: 0,
      idDocument: null,
      idMarchePublic: null,
      idBonComande: null,
      idBonLivraison: null,
      nDepense: null,
      dateBonEntree: null,
      typeBonEntree: null,
      Statut: "En attente de validation",
    });
    setFile(null);
  };

  const ShowPopUp = () => {
    setvisiblePopup(true);
    setvisiblePrint(true);
  };

  const HidePopUp = () => {
    setvisiblePopup(false);
    setvisiblePrint(false);
  };

  function HCfile(event) {
    setFile(event.target.files[0]);
  }

  function HCnDepense(event) {
    setDataBE((dataBE) =>
      Object.assign({}, dataBE, { nDepense: event.target.value })
    );
  }

  const onClickNBC = async () => {
    let nBC = await document.getElementById("nBC").value;
    axios
      .get(`https://localhost:7165/api/BonComande/${nBC}`)
      .then((result) => {
        toast("✔️ Bon de commande est trouvé");
        setDataBE((dataBE) => Object.assign({}, dataBE, { idBonComande: nBC }));
        document.getElementById("nBC").style.borderWidth = "2px";
        document.getElementById("nBC").style.borderColor = "green";
      })
      .catch((error) => {
        toast("❌ Bon de commande introuvable!");
        document.getElementById("nBC").style.borderWidth = "2px";
        document.getElementById("nBC").style.borderColor = "red";
        console.log(error);
      });
  };

  const onClickNMP = async () => {
    let nMP = await document.getElementById("nMP").value;
    axios
      .get(`https://localhost:7165/api/MarchePublic/${nMP}`)
      .then((result) => {
        toast("✔️ Marché public est trouvé");
        setDataBE((dataBE) =>
          Object.assign({}, dataBE, { idMarchePublic: nMP })
        );
        document.getElementById("nMP").style.borderWidth = "2px";
        document.getElementById("nMP").style.borderColor = "green";
      })
      .catch((error) => {
        toast("❌ Marché public introuvable!");
        document.getElementById("nMP").style.borderWidth = "2px";
        document.getElementById("nMP").style.borderColor = "red";
        console.log(error);
      });
  };

  const onClickNBLF = async () => {
    let nBLF = await document.getElementById("idBLF").value;
    axios
      .get(`https://localhost:7165/api/BonLivraisonFournisseur/${nBLF}`)
      .then((result) => {
        var _dateBonLivraison = format(
          new Date(result.data.dateBonLivraison),
          "dd-MM-yyyy"
        );
        var _fournisseur = result.data.fournisseur;
        setDataBLF((dataBLF) =>
          Object.assign({}, dataBLF, {
            dateBonLivraison: _dateBonLivraison,
            fournisseur: _fournisseur,
          })
        );
        setDataBE((dataBE) =>
          Object.assign({}, dataBE, { idBonLivraison: nBLF })
        );
        document.getElementById("dateBLF").value = _dateBonLivraison;
        document.getElementById("Fournisseur").value = _fournisseur;
        toast("✔️ Bon de livrison est trouvé");
        document.getElementById("idBLF").style.borderWidth = "2px";
        document.getElementById("idBLF").style.borderColor = "green";
      })
      .catch((error) => {
        toast("❌ Bon de livrison introuvable!");
        console.log(error);
        document.getElementById("idBLF").style.borderWidth = "2px";
        document.getElementById("idBLF").style.borderColor = "red";
        setDataBE((dataBE) =>
          Object.assign({}, dataBE, { idBonLivraison: null })
        );
        document.getElementById("dateBLF").value = "";
        document.getElementById("Fournisseur").value = "";
      });
  };

  const MPradioOnClick = () => {
    setvisibleMP(true);
    setvisibleBC(false);
    setDataBE((dataBE) =>
      Object.assign({}, dataBE, {
        idBonComande: null,
        typeBonEntree: "Marché Public",
      })
    );
  };

  const BCradioOnClick = () => {
    setvisibleBC(true);
    setvisibleMP(false);
    setDataBE((dataBE) =>
      Object.assign({}, dataBE, {
        idMarchePublic: null,
        typeBonEntree: "Bon de Commande",
      })
    );
  };

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
        getDataProduit(result.data[0].id);
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

  const getDataMagasin = () => {
    axios
      .get("https://localhost:7165/api/Magasin")
      .then((result) => {
        setDataMagasin(result.data);
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
      Magasin: dataMagasin[document.getElementById("selectMagasin").value].nom,
      Observation: document.getElementById("textObservation").value,
      idProduit: dataProduit[document.getElementById("selectProduit").value].id,
      idMagasin: dataMagasin[document.getElementById("selectMagasin").value].id,
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
    var BE = dataBE;
    BE.id = 0;
    if (
      BE.nDepense === null ||
      BE.idBonLivraison === null ||
      dataProduitList.length === 0 ||
      BE.nDepense === ""
    ) {
      toast("❌Tous les champs sont obligatoires!");
    } else {
      if (BE.idBonComande === null && BE.idMarchePublic === null) {
        toast("❌Tous les champs sont obligatoires!");
      } else {
        const current = new Date();
        var Cdate = `${current.getFullYear()}-${
          current.getMonth() + 1
        }-${current.getDate()}`;
        Cdate = format(new Date(Cdate), "yyyy-MM-dd");
        BE.dateBonEntree = Cdate;
        BE.Statut = "En attente de validation";
        setDataBE((dataBE) =>
          Object.assign({}, dataBE, { Statut: "En attente de validation" })
        );
        setDataBE((dataBE) =>
          Object.assign({}, dataBE, { dateBonEntree: Cdate })
        );
        axios
          .post("https://localhost:7165/api/BonEntree", BE)
          .then((result) => {
            BE.id = result.data;
            setDataBE((dataBE) =>
              Object.assign({}, dataBE, { id: result.data })
            );
            toast("✔️ Bon d'entree a été bien inséré !");
            console.log(BE);
            dataProduitList.forEach((opts, i) => {
              axios
                .post("https://localhost:7165/api/Produit_BonEntree", {
                  idBonEntree: BE.id,
                  idProduit: opts.idProduit,
                  idMagasin: opts.idMagasin,
                  Qte: opts.Qte,
                  Observation: opts.Observation,
                })
                .catch((error) => {
                  toast(error);
                });
            });
            ShowPopUp();
          })
          .catch((error) => {
            toast(error);
          });
      }
    }
  };

  const ButtonEnregisterDocument = async () => {
    var ckF = document.getElementById("popup-file");
    if (ckF.files[0] === undefined) {
      toast("❌ Veuillez choisir le fichier");
    } else {
      var FileExtension = File.name.split(".").pop();
      var newFileName = `${dataBE.dateBonEntree.slice(0, 10)}_BE_${
        dataBE.id
      }_BL_${dataBE.idBonLivraison}.${FileExtension}`;
      var formData = new FormData();
      formData.append("file", ckF.files[0], newFileName);
      await axios
        .post("https://localhost:7165/api/Document/file/upload", formData)
        .then(() => {
          toast("🔄 Le fichier a été chargé!");
          axios
            .post("https://localhost:7165/api/Document", {
              idCreePar: auth().id,
              idModifierPar: null,
              Chemin: File.name,
              dateCreation: dataBE.dateBonEntree,
              dateModification: null,
            })
            .then((result) => {
              var newBE = dataBE;
              newBE.idDocument = result.data;
              newBE.statut = "Validé";
              axios
                .put("https://localhost:7165/api/BonEntree", newBE)
                .then(() => {
                  toast("✔️ Document a été bien inséré !");
                  console.log(newBE);
                  HidePopUp();
                  ClearFields();
                })
                .catch((error) => {
                  toast("❌ Document pas inserer!");
                  console.log(error);
                });
            })
            .catch((error) => {
              toast("❌ Document pas inserer!");
              console.log(error);
            });
        });
    }
  };

  const ButtonAnnulerDocument = () => {
    HidePopUp();
    ClearFields();
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="BonEntreeDiv">
      <div class="header">
        <h1>INSERTION D'UN BON D'ENTREE</h1>
      </div>
      <br />
      <div className="container">
        <table className="table" border="2">
          <thead>
            <tr className="tittre">
              <th colSpan="2" className="Bon">
                <h5> Bon d'entrée </h5>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <label htmlFor="depense">Numéro de Dépense :</label>
              </td>
              <td>
                <input
                  className="actualiser"
                  type="text"
                  id="depense"
                  onChange={HCnDepense}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="typeBE">Type de Bon :</label>
              </td>
              <td>
                <input
                  name="typeBE"
                  id="BC"
                  type="radio"
                  onClick={BCradioOnClick}
                />
                <label>Bon de commande</label>
                <input
                  name="typeBE"
                  id="MP"
                  type="radio"
                  onClick={MPradioOnClick}
                />
                <label>Marché public</label>
              </td>
            </tr>
            {visibleMP && (
              <tr>
                <td>
                  <label htmlFor="marche">Numéro de Marché :</label>
                </td>
                <td>
                  <input type="number" id="nMP" min="1" />{" "}
                  <FaSync className="refresh-icon" onClick={onClickNMP} />
                </td>
              </tr>
            )}
            {visibleBC && (
              <tr>
                <td>
                  <label htmlFor="bon commande">Numéro de Bon Commande :</label>
                </td>
                <td>
                  <input type="number" id="nBC" min="1" />{" "}
                  <FaSync className="refresh-icon" onClick={onClickNBC} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="container">
        <table className="table">
          <thead>
            <tr className="tittre">
              <th colSpan="2" className="Bon">
                <h5> Bon de livraison </h5>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <label htmlFor="Numéro de bon de livrison">
                  Numéro de bon de livrison :
                </label>
              </td>
              <td>
                <input type="number" id="idBLF" min={1} />{" "}
                <FaSync className="refresh-icon" onClick={onClickNBLF} />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="livraison">Date de bon de livraison :</label>
              </td>
              <td>
                <input type="text" id="dateBLF" disabled />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="Fournisseur">Fourniseur :</label>
              </td>
              <td>
                <input type="text" id="Fournisseur" disabled />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="container">
        <table className="tab_le">
          <thead>
            <tr className="tittre">
              <th colSpan="19" className="Bon">
                <h5>Produits Reçus</h5>
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
                Quantité reçus
              </th>
              <th colSpan="3" id="th-Center">
                Magasin
              </th>
              <th colSpan="3" id="th-Center">
                Observation
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
                  <label htmlFor="">{opts.Magasin}</label>
                </td>
                <td colSpan="3">
                  <label htmlFor="">{opts.Observation}</label>
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
                <select id="selectMagasin">
                  <option hidden>Sélectionnez..</option>
                  {dataMagasin.map((opts, i) => (
                    <option value={i}>{opts.nom}</option>
                  ))}
                </select>
              </td>
              <td colSpan="3" id="tdObs">
                <textarea
                  name="Observation"
                  id="textObservation"
                  cols="25"
                  rows="2"
                ></textarea>
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
      {visiblePrint && (
        <div ref={componentRef}>
          <PrintBonEntree dataBE={dataBE} />
        </div>
      )}
      {visiblePopup && (
        <div className="div-popup-back">
          <div className="div-popup">
            <h3>Validation</h3>
            <br />
            <h4>Insertion de Bon d'Entree</h4>
            <table id="popup-table">
              <tr>
                <td>
                  <h4>➀</h4>
                </td>
                <td>
                  <button id="popup-print" onClick={handlePrint}>
                    <BsDownload />
                    Telecharger le bon d'entree
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <h4>➁</h4>
                </td>
                <td>
                  <input id="popup-file" type="file" onChange={HCfile} />
                </td>
              </tr>
            </table>
            <br />
            <table id="popup-table">
              <tr>
                <td>
                  <button id="popup-cancel" onClick={ButtonAnnulerDocument}>
                    Annuler
                  </button>
                </td>
                <td>
                  <button id="popup-done" onClick={ButtonEnregisterDocument}>
                    Valider
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

export default BonEntreeAjoute;
