import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import axios from "axios";

const PrintBonSortie = (props) => {
  const [dataBS, setDataBS] = useState([]);
  const [dataDemande, setDataDemande] = useState([]);
  const [dataProduitList, setdataProduitList] = useState([]);

  useEffect(() => {
    setDataBS(props.dataBS);
    getByIdDemande();
    getByIdProduitsBS();
  }, []);

  const getByIdDemande = async () => {
    axios
      .get(`https://localhost:7165/api/Demande/info/${props.dataBS.idDemande}`)
      .then((result) => {
        setDataDemande(result.data);
        var _dateDemande = format(
          new Date(result.data.dateDemande),
          "dd-MM-yyyy"
        );

        var _dateCreation = format(
          new Date(props.dataBS.dateCreation),
          "dd-MM-yyyy"
        );

        var _dateSortie = format(
          new Date(props.dataBS.dateSortie),
          "dd-MM-yyyy"
        );

        setDataBS((dataBS) =>
          Object.assign({}, dataBS, {
            dateCreation: _dateCreation,
            dateSortie: _dateSortie,
          })
        );

        setDataDemande((dataDemande) =>
          Object.assign({}, dataDemande, {
            dateDemande: _dateDemande,
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getByIdProduitsBS = async () => {
    axios
      .get(
        `https://localhost:7165/api/Demande_Produit/Produits/${props.dataBS.idDemande}`
      )
      .then((result) => {
        setdataProduitList(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="div-print">
      <h4>Bon de Sortie</h4>
      <table className="table-print-BE">
        <tr>
          <td>ID</td>
          <td>:</td>
          <td>{dataBS.id}</td>
        </tr>
        <tr>
          <td>Date de création</td>
          <td>:</td>
          <td>{dataBS.dateCreation}</td>
        </tr>
        <tr>
          <td>Date de sortie</td>
          <td>:</td>
          <td>{dataBS.dateSortie}</td>
        </tr>
      </table>
      <br />
      <h5>Demande :</h5>
      <table className="table-print-BLF">
        <tr>
          <td>ID</td>
          <td>:</td>
          <td>{dataDemande.id}</td>
        </tr>
        <tr>
          <td>Demandeur</td>
          <td>:</td>
          <td>{dataDemande.nom + " " + dataDemande.prenom}</td>
        </tr>
        <tr>
          <td>CIN</td>
          <td>:</td>
          <td>{dataDemande.cin}</td>
        </tr>
        <tr>
          <td>Entité</td>
          <td>:</td>
          <td>{dataDemande.entite}</td>
        </tr>
        <tr>
          <td>Date de demande</td>
          <td>:</td>
          <td>{dataDemande.dateDemande}</td>
        </tr>
      </table>
      <br />
      <h5>Les Articles :</h5>
      <table className="table-print-PL">
        <thead>
          <tr>
            <th>N°</th>
            <th>Désignation</th>
            <th>Quantité Demandée</th>
            <th>Quantité Accordée</th>
          </tr>
        </thead>
        <tbody>
          {dataProduitList.map((opts, i) => (
            <tr>
              <td id="th-Center">{i + 1}</td>
              <td>{opts.designation}</td>
              <td id="th-Center">{opts.qteDemandee}</td>
              <td id="th-Center">{opts.qteAccordee}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default PrintBonSortie;
