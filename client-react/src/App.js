import "./App.css";
import Accueil from "./pages/Accueil";
import AfficheBonEntree from "./pages/AfficheBonEntree";
import AjouteDemande from "./pages/AjouteDemande";
import Authentification from "./pages/Authentification";
import AjouteBonEntree from "./pages/AjouteBonEntree";
import MesDemandes from "./pages/MesDemandes";
import AfficheDemande from "./pages/AfficheDemande";
import AfficheBonSortie from "./pages/AfficheBonSortie";
import ModifCategorie from "./pages/ModifCategorie";
import ModifProduit from "./pages/ModifProduit";
import AfficheProduit from "./pages/AfficheProduit";
import AfficheUtilisateur from "./pages/AfficheUtilisateur";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/Authentification" element={<Authentification />} />
          <Route path="/" element={<Accueil />} />
          <Route path="/Bonentree/Affichage" element={<AfficheBonEntree />} />
          <Route path="/Bonentree/Ajoute" element={<AjouteBonEntree />} />
          <Route path="/Demande/Ajoute" element={<AjouteDemande />} />
          <Route path="/Demande/MesDemandes" element={<MesDemandes />} />
          <Route path="/Demande/Affichage" element={<AfficheDemande />} />
          <Route path="/Bonsortie/Affichage" element={<AfficheBonSortie />} />
          <Route path="/Categorie/Modification" element={<ModifCategorie />} />
          <Route path="/Produit/Modification" element={<ModifProduit />} />
          <Route path="/Produit/Affichage" element={<AfficheProduit />} />
          <Route path="/Utilisateurs" element={<AfficheUtilisateur />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
