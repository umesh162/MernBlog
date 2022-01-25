import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

require("./sideBar.css");
const SideBar = () => {
  const ImageLink = "http://localhost:8000/images/";
  const [category, setCategory] = useState([]);
  const getData = async () => {
    const res = await axios.get("/categories");
    setCategory(res.data);
  };

  useState(() => {
    getData();
  }, []);
  return (
    <div className="sideBar">
      <div className="sideBarItem">
        <span className="sideBarTitle">About This Blog</span>
        <Link to="/">
          <img
            className="sideBarImage"
            src={ImageLink + "/sidebarImage.jpg"}
            alt=""
          />
        </Link>
        <p>
          This blog is an easy and free to share your thinking on any topic,
          connect with an audience, express yourself with a range of publishing
          tools, and even earn money for your work.
        </p>
      </div>
      <div className="sideBarItem">
        <span className="sideBarTitle">Categories</span>
        <ul className="sideBarList">
          {category.map((cate, key) => (
            <Link to={`/?category=${cate.name}`} className="link" key={key}>
              <li className="sideBarListItem">{cate.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sideBarItem">
        <span className="sideBarTitle">Follow Us</span>
        <div className="sideBarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
};

export default SideBar;