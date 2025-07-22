import React, { useState } from "react";
import styles from "../Styles/LocationSearch.module.css";
import { Link } from "react-router";

const LocationSearch = () => {
  const [activeTab, setActiveTab] = useState("lease");

  return (
    <div className={styles.container}>
      <div className={styles.overlay}>
        <div className={styles.topSection}>
          <div className={styles.tabs}>
            {["lease", "buy", "sell"].map((tab) => (
              <button
                key={tab}
                className={`${styles.tab} ${
                  activeTab === tab ? styles.activeTab : ""
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.searchBox}>
          <div className={styles.inputs}>
            <div className={styles.inputGroup}>
              <label>Location</label>
              <span className={styles.location}>Barcelona, Spain</span>
            </div>
            <div className={styles.inputGroup}>
              <label>When</label>
              <span className={styles.date}>Select Move-in Date 📅</span>
            </div>
            <Link to="/properties">
              <button className={styles.button}>Browse Properties</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSearch;
