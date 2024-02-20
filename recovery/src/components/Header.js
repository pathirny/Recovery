import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import Logo from "../recoveryLogo.png";

export default function Header() {
  return (
    <div className="header">
      <a href="/">
      <FontAwesomeIcon icon={faHouse} size="2xl" style={{ color: "#ffff" }} />
      </a>
      <div>
        <img src={Logo} alt="Logo" className="logoImage"></img>
      </div>
      <div></div>
    </div>
  );
}
