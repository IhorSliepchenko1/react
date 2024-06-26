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
          <Link to="/">All Posts</Link>
        </li>
        <li className="li">
          <Link to="/user-posts">Your Posts</Link>
        </li>
        <li className="li">
          <Link to="/test">Test</Link>
        </li>
      </ul>

      <MyButton text={`Logout`} onClick={logout} />
    </nav>
  );
};

export default NavBar;
