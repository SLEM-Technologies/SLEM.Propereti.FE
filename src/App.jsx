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
import Property from "./Pages/Property/Property";
import Property2 from "./Pages/Property/Property2";
import Property3 from "./Pages/Property/Property3";
import Fin from "./Pages/Property/Rounup";
import Dashboard from "./Pages/Dashboard";
import HelpSupport from "./Pages/HelpSupport";
import Browseopps from "./Pages/Browseopps";
import CompanySignUp from "./Pages/Companyreg";
import RegisterOptions from "./Pages/RegisterOptions";
import Onetime from "./Pages/HelpSupport//OneTimePayment"
import Installmentalpay from "./Pages/HelpSupport/InstallmentalPayment";

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
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup/step-4" element={<Step1 />} />
        <Route path="/signup/step-5" element={<Step2 />} />
        <Route path="/signup/step-6" element={<Step3 />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/property" element={<Property />} />
        <Route path="/property2" element={<Property2 />} />
        <Route path="/property3" element={<Property3 />} />
        <Route path="/cont" element={<Fin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/help-support" element={<HelpSupport />} />
        <Route path="/browse-properties" element={<Browseopps />} />
        <Route path="/company-signup" element={<CompanySignUp />} />
        <Route path="/" element={<RegisterOptions />} />
        <Route path="/browse-properties/one-time" element={<Onetime />} />
        <Route path="/browse-properties/installment" element={<Installmentalpay />} />

      </Routes>
    </div>
  );
};

export default App;
