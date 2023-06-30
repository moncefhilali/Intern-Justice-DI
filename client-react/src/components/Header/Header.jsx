import React, { useEffect, useState } from "react";
import "./Header.css";
import { useAuthUser } from "react-auth-kit";
import axios from "axios";

const Header = () => {
  const auth = useAuthUser();
  const [RoleLibelle, setRoleLibelle] = useState("");

  useEffect(() => {
    getRole();
  }, []);

  const getRole = () => {
    var idRole = auth().idRole;
    axios
      .get(`https://localhost:7165/api/Role/${idRole}`)
      .then((result) => {
        setRoleLibelle(result.data.libelle);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="Header">
      <h5>+ {RoleLibelle.toUpperCase()} +</h5>
      <h1>Gestion du Patrimoine</h1>
      <h5>
        + {auth().prenom.charAt(0).toUpperCase()}
        {auth().prenom.slice(1).toLowerCase()} {auth().nom.toUpperCase()} +
      </h5>
    </div>
  );
};

export default Header;
