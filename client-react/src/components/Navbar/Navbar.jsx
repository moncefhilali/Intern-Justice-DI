import React from "react";
import "./navbar.css";
import { FaUser, FaBell } from "react-icons/fa";
import { NavDropdown } from "react-bootstrap";
import { useSignOut } from "react-auth-kit";

const Navbar = () => {
  const signOut = useSignOut();

  const ButtonSignOut = () => {
    signOut();
    window.location.href = "/Authentification";
  };

  return (
    <div className="nav__bar">
      <div className="navbar">
        <div className="navbar-left">
          <a href="/">ACCUEIL</a>
          <NavDropdown className="dropdown" title="GESTION DU STOCK">
            {/* Nested dropdown */}
            <NavDropdown title="GESTION D'ENTRÉE">
              <NavDropdown.Item href="/Bonentree/Ajoute">
                AJOUTER UN BON D'ENTRÉE
              </NavDropdown.Item>
              <NavDropdown.Item href="/BonEntree/Affichage">
                TOUS LES BON D'ENTRÉE
              </NavDropdown.Item>
            </NavDropdown>
            {/* End of nested dropdown */}

            {/* Nested dropdown */}
            <NavDropdown title="SORTIE STOCK">
              <NavDropdown.Item href="/Demande/Ajoute">
                AJOUTER UNE DEMANDE DE SORTIE
              </NavDropdown.Item>
              <NavDropdown.Item href="/Demande/MesDemandes">
                MES DEMANDES DE SORTIE
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/Demande/Affichage">
                TOUS LES DEMANDES DE SORTIE
              </NavDropdown.Item>
              <NavDropdown.Item href="/Bonsortie/Affichage">
                TOUS LES BONS DE SORTIE
              </NavDropdown.Item>
            </NavDropdown>
            {/* End of nested dropdown */}

            {/* Nested dropdown */}
            <NavDropdown title="PARAMÉTRAGE">
              <NavDropdown.Item href="/Categorie/Modification">
                CATÉGORIES
              </NavDropdown.Item>
              <NavDropdown.Item href="#">Nested action 2</NavDropdown.Item>
              <NavDropdown.Item href="#">Nested action 3</NavDropdown.Item>
            </NavDropdown>
            {/* End of nested dropdown */}

            <NavDropdown.Divider />
            <NavDropdown.Item href="/Produit/Affichage">
              LES PRODUITS
            </NavDropdown.Item>
            <NavDropdown.Item href="/Utilisateurs">
              LES UTILISATEURS
            </NavDropdown.Item>
          </NavDropdown>
        </div>
        <div className="navbar-right">
          <FaBell className="icon" />

          <FaUser className="icon" />
          <label onClick={ButtonSignOut}>Se déconnecter</label>
        </div>
      </div>

      <style>
        {`
          .dropdown-menu {
            background-color:   #185d99;
            border: none;
            padding: 10px
          }
          .dropdown-item {
            font-weight: bold;
          }
          .dropdown-item:hover {
            background-color:   #185d99;
          }
          .dropdown-divider {
            border-top: 1px solid #ccc;
          }
        `}
      </style>
    </div>
  );
};
export default Navbar;
