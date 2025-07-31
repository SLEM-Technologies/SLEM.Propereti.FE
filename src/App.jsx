import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/AboutUs";
import Properties from "./Pages/Properties";
import Installmental from "./Pages/Installmental";
import Resell from "./Pages/Resell";
import Contact from "./Pages/Contact";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Step1 from "./Pages/Steps/Step1";
import Step2 from "./Pages/Steps/Step2";
import Step3 from "./Pages/Steps/Step3";
const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/installmental" element={<Installmental />} />
        <Route path="/resell" element={<Resell />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/signup/step-4" element={<Step1 />} />
        <Route path="/signup/step-5" element={<Step2 />} />
        <Route path="/signup/step-6" element={<Step3 />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
