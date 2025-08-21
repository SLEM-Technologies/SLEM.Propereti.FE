import React from "react";
import Sidemenu from "../Components/Sidebar.jsx";
import Header from "../Components/Header.jsx";
import styles from "../Styles/dashboard.module.css";

import Plans from "./HelpSupport/PaymentOptions.jsx";

const Browseopps = () => {
  return (
    <div className={styles.dashboardContainer}>
      <Sidemenu />
      <Header />
      <div className={styles.dashboard}>
        <Plans />{" "}
      </div>
    </div>
  );
};

export default Browseopps;
