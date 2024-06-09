import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import FixedMenu from "./components/FixedMenu";
import Sidebar from "./components/Sidebar";
import Cars from "./pages/Cars";
import CreateCar from "./pages/CreateCar";
import EditCar from "./pages/EditCar";
import "./styles/style.css";

const App = () => (
  <div className="app-container d-flex">
    <FixedMenu />
    <div className="main-content flex-grow-1 d-flex flex-column">
      <Navbar />
      <div className="d-flex flex-grow-1">
        <Sidebar />
        <div className="content flex-grow-1" style={{ marginTop: "72px" }}>
          <Routes>
            <Route path="/" element={<Cars />} />
            <Route path="/create" element={<CreateCar />} />
            <Route path="/edit/:id" element={<EditCar />} />
          </Routes>
        </div>
      </div>
    </div>
  </div>
);

export default App;
