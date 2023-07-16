import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { format } from "date-fns";
import axios from "axios";
import { useAuthUser } from "react-auth-kit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./BonEntreeAffiche.css";
import PrintBonEntree from "../PrintBonEntree/PrintBonEntree";
import { HiDocumentArrowUp } from "react-icons/hi2";
import { HiDocumentArrowDown } from "react-icons/hi2";
import { BsDownload } from "react-icons/bs";

const BonEntreeAffiche = () => {
  const [dataBEs, setDataBEs] = useState([]);
  const [dN, setdN] = useState();
  const [visiblePrint, setvisiblePrint] = useState(false);
  const [visiblePopup, setvisiblePopup] = useState(false);
  const [File, setFile] = useState();
  const componentRef = useRef();
  const auth = useAuthUser();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    getDataBonEntrees();
  }, []);

  const getDataBonEntrees = () => {
    axios
      .get("https://localhost:7165/api/BonEntree")
      .then((result) => {
        setDataBEs(result.data);
      })
      .catch((error) => {
        console.log(error);
        toast("Error Bons d'Entree");
      });
  };

  const ShowPopUp = (n) => {
    setdN(n);
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

  const ButtonAnnulerDocument = () => {
    HidePopUp();
  };

  const ButtonEnregisterDocument = async () => {
    var ckF = document.getElementById("popup-file");
    if (ckF.files[0] === undefined) {
      toast("❌ Veuillez choisir le fichier");
    } else {
      var FileExtension = File.name.split(".").pop();
      var newFileName = `${dataBEs[dN].dateBonEntree.slice(0, 10)}_BE_${
        dataBEs[dN].id
      }_BL_${dataBEs[dN].idBonLivraison}.${FileExtension}`;
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
              Chemin: newFileName,
              dateCreation: dataBEs[dN].dateBonEntree,
              dateModification: null,
            })
            .then((result) => {
              var newBE = dataBEs[dN];
              newBE.idDocument = result.data;
              newBE.statut = "Validé";
              axios
                .put("https://localhost:7165/api/BonEntree", newBE)
                .then(() => {
                  toast("✔️ Document a été bien inséré !");
                  var updatedBEs = [...dataBEs];
                  updatedBEs[dN] = newBE;
                  setDataBEs(updatedBEs);
                  HidePopUp();
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
        })
        .catch((error) => {
          toast("❌ Erreur lors du chargement du fichier !");
          console.log(error);
        });
    }
  };

  const ButtonDownload = (i) => {
    var idD = dataBEs[i].idDocument;
    axios
      .get(`https://localhost:7165/api/Document/${idD}`)
      .then((result) => {
        var filename = result.data.chemin;
        // create link element
        const link = document.createElement("a");
        link.href = `https://localhost:7165/api/Document/file/download/${filename}`;
        link.download = filename;
        // dispatch a click event on the link element
        document.body.appendChild(link);
        link.click();
        // clean up the link element
        document.body.removeChild(link);
      })
      .catch((error) => {
        toast("Error Document");
        console.log(error);
      });
  };

  return (
    <div className="BonEntree-Affiche">
      <div className="header">
        <h1>LES BONS D'ENTREE</h1>
      </div>
      <div className="container">
        <table className="tab_le">
          <thead>
            <tr className="tittre">
              <th colSpan="5">Nombre de resultats : {dataBEs.length}</th>
            </tr>
            <tr className="sousTitre">
              <th id="th-Center">N° de dépense</th>
              <th id="th-Center">N° de bon de livraison</th>
              <th id="th-Center">Date de bon d'entrée</th>
              <th id="th-Center">Statut</th>
              <th id="th-Center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataBEs.map((opts, i) => (
              <tr className="tr-ListProduit" id={"i" + (i % 2)}>
                <td id="th-Center">{opts.nDepense}</td>
                <td id="th-Center">{opts.idBonLivraison}</td>
                <td id="th-Center">
                  {format(new Date(opts.dateBonEntree), "dd/MM/yyyy")}
                </td>
                <td id="th-Center">{opts.statut}</td>
                <td>
                  <div className="div-btn-telecharger">
                    {opts.statut === "Validé"
                      ? true && (
                          <button
                            id="btn-download"
                            className="button-icons"
                            onClick={() => ButtonDownload(i)}
                          >
                            <HiDocumentArrowDown />
                          </button>
                        )
                      : true && (
                          <button
                            id="btn-upload"
                            className="button-icons"
                            onClick={() => ShowPopUp(i)}
                          >
                            <HiDocumentArrowUp />
                          </button>
                        )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {visiblePrint && (
        <div ref={componentRef}>
          <PrintBonEntree dataBE={dataBEs[dN]} />
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

export default BonEntreeAffiche;
