import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {

    const navigate = useNavigate();

    function deconnexion() {
        navigate("/");
    }


  return (
    <nav className="navbar">
      <div className="brand">
        <div className="brand-logo">PB</div>
        <span>Prêt Bancaire</span>
      </div>

      <ul>
        <li><Link to="/ajout">Ajout</Link></li>
        <li><Link to="/liste">Liste</Link></li>
        <li><Link to="/bilan">Bilan</Link></li>
      </ul>

      <button className="logout" onClick={deconnexion}>
        Déconnexion
      </button>
    </nav>
  );
}

export default Navbar;