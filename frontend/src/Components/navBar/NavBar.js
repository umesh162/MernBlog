import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../../context/Context";
import "./NavBar.css";

const NavBar = () => {
  const { user, dispatch } = useContext(Context);
  const location = useLocation();
  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };
  const ImageLink = "http://localhost:8000/images/";
  return (
    <div className="top">
      <div className="topLeft"></div>
      <div className="topCenter">
        <ul className="List">
          <Link className="link" to="/">
            {location.pathname !== "/" && <li className="listItem">HOME</li>}
          </Link>
          <Link className="link" to="/write">
            {user && <li className="listItem">WRITE</li>}
          </Link>
          <Link className="link" to=''>
            {user && (
              <li className="listItem" onClick={handleLogout}>
                LOGOUT
              </li>
            )}
          </Link>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link className="link" to="/settings">
            <img
              className="profileImage"
              src={
                user.profilePic
                  ? ImageLink + user.profilePic + ".jpg"
                  : ImageLink + "default.png"
              }
              alt="profilePic"
            />
          </Link>
        ) : (
          <ul className="List">
            <Link className="link" to="/login">
              <li className="listItem">LOGIN</li>
            </Link>
            <Link className="link" to="/signup">
              <li className="listItem">REGISTER</li>
            </Link>
          </ul>
        )}
        <i className="searchIcon fas fa-search"></i>
      </div>
    </div>
  );
};

export default NavBar;