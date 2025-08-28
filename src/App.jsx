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
import Adminbp from "./Pages/Admin/AdBrowseprop"
import AdminRolesPermissions from "./Pages/Admin/AdminRolesPermissions.jsx";
import Prop from "./Pages/Props/Props"
import Overview from "./Pages/Views/Overview"
import Overview2 from "./Pages/Views/Overview2"
import Resources1 from "./Pages/Resources/AddProperties"
import Profile from "./Pages/Profile.jsx";
import PropertiesBrowse from "./Pages/PropertiesBrowse.jsx";
import PropertyDetail from "./Pages/PropertyDetail.jsx";
import PropertyCreate from "./Pages/PropertyCreate.jsx";
import PropertyLegalDocs from "./Pages/PropertyLegalDocs.jsx";
import AuthGuard from "./components/AuthGuard.tsx";
import AuthForgotPassword from "./Pages/AuthForgotPassword.jsx";
import AuthResetConfirm from "./Pages/AuthResetConfirm.jsx";
import AuthVerify from "./Pages/AuthVerify.jsx";
import WalletFund from "./Pages/WalletFund.jsx";
import CompaniesList from "./Pages/CompaniesList.jsx";
import WalletStatements from "./Pages/WalletStatements.jsx";
import UserSettings from "./Pages/UserSettings.jsx";
import TransactionsHistory from "./Pages/TransactionsHistory.jsx";
import TransactionDetail from "./Pages/TransactionDetail.jsx";
import TransferFunds from "./Pages/TransferFunds.jsx";
import NotificationsFeed from "./Pages/NotificationsFeed.jsx";
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
        <Route path="/admin/roles-permissions" element={<AuthGuard><AdminRolesPermissions /></AuthGuard>} />
        <Route path="/properties-customer" element={<Prop />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/overview/team" element={<Overview />} />
        <Route path="/overview/roles" element={<Overview2 />} />
        <Route path="/properties-rt" element={<Resources1 />} />

        {/* New typed API-powered routes */}
        <Route path="/profile" element={<AuthGuard><Profile /></AuthGuard>} />
        <Route path="/market/properties" element={<PropertiesBrowse />} />
        <Route path="/market/properties/:id" element={<PropertyDetail />} />
        <Route path="/properties/create" element={<AuthGuard><PropertyCreate /></AuthGuard>} />
        <Route path="/properties/:propertyId/legal-docs" element={<AuthGuard><PropertyLegalDocs /></AuthGuard>} />

        {/* New flows */}
        <Route path="/auth/forgot-password" element={<AuthForgotPassword />} />
        <Route path="/auth/reset-password" element={<AuthResetConfirm />} />
        <Route path="/auth/verify" element={<AuthVerify />} />
        <Route path="/wallet/fund" element={<AuthGuard><WalletFund /></AuthGuard>} />
        <Route path="/wallet/statements" element={<AuthGuard><WalletStatements /></AuthGuard>} />
        <Route path="/settings" element={<AuthGuard><UserSettings /></AuthGuard>} />
        <Route path="/companies" element={<CompaniesList />} />

        {/* Transactions */}
        <Route path="/transactions" element={<AuthGuard><TransactionsHistory /></AuthGuard>} />
        <Route path="/transactions/:reference" element={<AuthGuard><TransactionDetail /></AuthGuard>} />
        <Route path="/transactions/transfer" element={<AuthGuard><TransferFunds /></AuthGuard>} />

        {/* Notifications */}
        <Route path="/notifications" element={<AuthGuard><NotificationsFeed /></AuthGuard>} />

      </Routes>
    </div>
  );
};

export default App;
