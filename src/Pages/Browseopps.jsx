import React from "react";
import Sidemenu from "../Components/Sidebar.jsx";
import Header from "../Components/Header.jsx";
import styles from "../Styles/dashboard.module.css";

import Real from "./real-estate-components/Realestateapp.jsx";

const Browseopps = () => {
  return (
    <div className={styles.dashboardContainer}>
      <Sidemenu />
      <Header />
      <div className={styles.dashboard}>
        <Real />{" "}
      </div>
    </div>
  );
};

export default Browseopps;
