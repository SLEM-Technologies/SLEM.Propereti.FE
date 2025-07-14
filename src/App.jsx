import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/AboutUs";
import Properties from "./Pages/Properties";
import Installmental from "./Pages/Installmental";
import Resell from "./Pages/Resell"
import Contact from "./Pages/Contact"
const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/installmental" element={<Installmental />} />
        <Route path="/resell" element={<Resell />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
};

export default App;
