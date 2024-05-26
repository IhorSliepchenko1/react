import { Link } from "react-router-dom";
import "./NavBar.scss";
import MyButton from "../UI/button/MyButton";

const NavBar = () => {
  const logout = () => {
    localStorage.removeItem(`userStatus`);
    location.reload();
  };

  return (
    <nav className="nav">
      <ul className="ul">
        <li className="li">
          <a href="#pagination">Navigate page</a>
        </li>
        <li className="li">
          <Link to="/">Search post</Link>
        </li>
      </ul>

      <MyButton text={`Logout`} onClick={logout} />
    </nav>
  );
};

export default NavBar;
