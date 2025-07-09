import React, { useState } from "react";
import Horheader from "../Components/Horheader";
import styles from "../Styles/Home.module.css";
import heroImg from "../assets/images/homepage-hero-img.png"; // Make sure this path is correct

const Home = () => {
  const [activeTab, setActiveTab] = useState("lease");

  return (
    <div>
      <Horheader />
      <div className={styles.overlayyer}>
        <h1 className={styles.title}>
          Buy, rent, or sell <br /> your property easily
        </h1>
        <p className={styles.subtitle}>
          A great platform to buy, sell, or even resell your properties <br />
          without any commissions.
        </p>
      </div>
      <div
        className={styles.hero}
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className={styles.overlay}>
          <div className={styles.span}>
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
              <button className={styles.button}>Browse Properties</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
