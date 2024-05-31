import { Link } from "react-router-dom";
import "./NavBar.scss";
import MyButton from "../UI/button/LoginButton/MyButton";

const NavBar = () => {
  const logout = () => {
    localStorage.removeItem(`userStatus`);
    location.reload();
  };

  return (
    <nav className="nav">
      <ul className="ul">
        <li className="li">
          <Link to="/">Posts</Link>
        </li>
        <li className="li">
          <Link to="/user">Progress</Link>
        </li>
      </ul>

      <MyButton text={`Logout`} onClick={logout} />
    </nav>
  );
};

export default NavBar;
