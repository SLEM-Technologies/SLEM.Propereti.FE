import React, { useState } from "react";
import Horheader from "../Components/Horheader";
import styles from "../Styles/Home.module.css";
import heroImg from "../assets/images/homepage-hero-img.png";
import houseImg from "../assets/images/homepage-house-01png.png";
import icon1 from "../assets/icons/property-icon.svg";
import icon2 from "../assets/icons/installmental-pay-icon.svg";
import icon3 from "../assets/icons/commission-icon.svg";
import icon4 from "../assets/icons/resale-icon.svg";

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
      <section className={styles.benefitsSection}>
        <div className={styles.leftCard}>
          <h2>The new way to find your new home</h2>
          <p>
            Find your dream place to live in with more than 10k+ properties
            listed.
          </p>
          <button>Browse Properties</button>
          <img
            src={houseImg}
            alt="House illustration"
            className={styles.houseImg}
          />
        </div>

        <div className={styles.rightFeatures}>
          <div className={styles.featureBox}>
            <img src={icon1} alt="Insurance" />
            <div>
              <h3>Property Insurance</h3>
              <p>
                We offer our customer property protection of liability coverage
                and insurance for their better life.
              </p>
            </div>
          </div>

          <div className={styles.featureBox}>
            <img src={icon2} alt="Resale" />
            <div>
              <h3>Resale Assistance</h3>
              <p>
                Not sure what you should be charging for your property? No need
                to worry, let us do the numbers for you.
              </p>
            </div>
          </div>

          <div className={styles.featureBox}>
            <img src={icon3} alt="Commission" />
            <div>
              <h3>Lowest Commission</h3>
              <p>
                You no longer have to negotiate commissions and haggle with
                other agents; it only costs 2%!
              </p>
            </div>
          </div>

          <div className={styles.featureBox}>
            <img src={icon4} alt="Installment" />
            <div>
              <h3>Installment Payment</h3>
              <p>
                Get a virtual tour, and schedule visits before you rent or buy
                any properties. You get overall control.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
