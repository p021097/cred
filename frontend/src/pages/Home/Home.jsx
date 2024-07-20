import React, { useContext } from "react";
import "./Home.css";
import Add from "../Add/Add";
import List from "../List/List";
import { Route, Routes } from "react-router-dom";
import { StoreContext } from "../../context/StoreContex";


const Home = () => {

  return (
    <div className="home">
      <Routes>
        <Route path="/add" element={<Add/>}/>
        <Route path="/list" element={<List/>}/>
      </Routes>
    </div>
  );
};

export default Home;
