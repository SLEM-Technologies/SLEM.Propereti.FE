import React from "react";
import Adheader from "../../Components/adminheader.jsx";
import Adsidebar from "../../Components/adminsidebar.jsx";
import styles from "../Views/Overview.module.css";
import Properties from "./Propertyback/Propertyb.jsx";


const AddProps = () => {
  return (
    <div className={styles.dashboardContainer}>
      <Adsidebar />
      <Adheader />
      <div className={styles.dashboard}>
        <h3 className={styles.overview}>
          AddProps
        </h3>
          <Properties />
      </div>
    </div>
  );
};

export default AddProps;
