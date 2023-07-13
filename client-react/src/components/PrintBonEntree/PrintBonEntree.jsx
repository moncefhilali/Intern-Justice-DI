import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import axios from "axios";

const PrintBonEntree = (props) => {
  const [dataBE, setDataBE] = useState([]);
  const [dataBLF, setDataBLF] = useState([]);
  const [dataProduitList, setdataProduitList] = useState([]);

  useEffect(() => {
    setDataBE(props.dataBE);
    getByIdBLF();
    getByIdProduitsBE();
  }, []);

  const getByIdBLF = async () => {
    axios
      .get(
        `https://localhost:7165/api/BonLivraisonFournisseur/${props.dataBE.idBonLivraison}`
      )
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getByIdProduitsBE = async () => {
    axios
      .get(`https://localhost:7165/api/Produit/BE/${props.dataBE.id}`)
      .then((result) => {
        setdataProduitList(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="div-print">
      <h4>Bon d'Entrée</h4>
      <table className="table-print-BE">
        <tr>
          <td>Numéro de Dépense</td>
          <td>:</td>
          <td>{dataBE.nDepense}</td>
        </tr>
        <tr>
          <td>Type de Bon</td>
          <td>:</td>
          <td>{dataBE.typeBonEntree}</td>
        </tr>
        <tr>
          <td>Numéro de {dataBE.typeBonEntree}</td>
          <td>:</td>
          <td>
            {dataBE.idMarchePublic === null
              ? dataBE.idBonComande
              : dataBE.idMarchePublic}
          </td>
        </tr>
      </table>
      <br />
      <h5>Bon de livraison :</h5>
      <table className="table-print-BLF">
        <tr>
          <td>Numéro de bon de livrison</td>
          <td>:</td>
          <td>{dataBE.idBonLivraison}</td>
        </tr>
        <tr>
          <td>Date de bon de livraison</td>
          <td>:</td>
          <td>{dataBLF.dateBonLivraison}</td>
        </tr>
        <tr>
          <td>Fourniseur</td>
          <td>:</td>
          <td>{dataBLF.fournisseur}</td>
        </tr>
      </table>
      <br />
      <h5>Produits Reçus :</h5>
      <table className="table-print-PL">
        <thead>
          <tr>
            <th>N°</th>
            <th>Désignation</th>
            <th>Quantité reçus</th>
            <th>Observation</th>
          </tr>
        </thead>
        <tbody>
          {dataProduitList.map((opts, i) => (
            <tr>
              <td id="th-Center">{i + 1}</td>
              <td>{opts.designation}</td>
              <td id="th-Center">{opts.qte}</td>
              <td>{opts.observation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default PrintBonEntree;
