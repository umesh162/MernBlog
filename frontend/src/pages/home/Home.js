import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../Components/header/Header";
import React from "react";
import SideBar from "../../Components/sideBar/sideBar";
import Posts from "../../Components/posts/posts";
import { useLocation } from "react-router-dom";

require("./Home.css");

const Home = () => {
  const [data, setData] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts" + search);
      setData(res.data);
    };
    getPost();
  }, [search]);
  return (
    <>
      <Header />
      <div className="home">
        <Posts data={data} />
        <SideBar />
      </div>
    </>
  );
};

export default Home;