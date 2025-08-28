import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Home = lazy(() => import("./Pages/Home"));
const About = lazy(() => import("./Pages/AboutUs"));
const Properties = lazy(() => import("./Pages/Properties"));
const Installmental = lazy(() => import("./Pages/Installmental"));
const Resell = lazy(() => import("./Pages/Resell"));
const Contact = lazy(() => import("./Pages/Contact"));
const SignUp = lazy(() => import("./Pages/SignUp"));
const Login = lazy(() => import("./Pages/Login"));
const Step1 = lazy(() => import("./Pages/Steps/Step1"));
const Step2 = lazy(() => import("./Pages/Steps/Step2"));
const Step3 = lazy(() => import("./Pages/Steps/Step3"));
const Property = lazy(() => import("./Pages/Property/Property"));
const Property2 = lazy(() => import("./Pages/Property/Property2"));
const Property3 = lazy(() => import("./Pages/Property/Property3"));
const Fin = lazy(() => import("./Pages/Property/Rounup"));
const Dashboard = lazy(() => import("./Pages/Dashboard"));
const HelpSupport = lazy(() => import("./Pages/HelpSupport"));
const Browseopps = lazy(() => import("./Pages/Browseopps"));
const CompanySignUp = lazy(() => import("./Pages/Companyreg"));
const RegisterOptions = lazy(() => import("./Pages/RegisterOptions"));
const Onetime = lazy(() => import("./Pages/HelpSupport/OneTimePayment"));
const Installmentalpay = lazy(() => import("./Pages/HelpSupport/InstallmentalPayment"));
const Adminbp = lazy(() => import("./Pages/Admin/AdBrowseprop"));
const Prop = lazy(() => import("./Pages/Props/Props"));
const App = () => {
  return (
    <div className="app">
      <Suspense fallback={<div className="route-fallback">Loading...</div>}>
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
          <Route path="/admin-properties" element={<Adminbp />} />
          <Route path="/properties-admin" element={<Prop />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
