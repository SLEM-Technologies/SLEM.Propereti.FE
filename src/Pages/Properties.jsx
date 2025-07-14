import React from "react";
import Horheader from "../Components/Horheader";
import styles from "../Styles/Properties.module.css";
import icon1 from "../assets/icons/property-icon.svg";
import icon2 from "../assets/icons/installmental-pay-icon.svg";
import icon3 from "../assets/icons/commission-icon.svg";
import ForFooter from "../Components/ForFooter.jsx";
import Proping from "../Components/PropertyListing.jsx";

const Properties = () => {
  return (
    <div className={styles.Properties}>
      <Horheader />

      {/* Hero Section */}
      <section className={styles.hero_tin}>
        <div className={styles.hero_text}>
          <h3>Do you want to outrightly buy your own property?</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur. Commodo mauris erat ipsum
            habitasse. Consectetur fringilla sed elementum at ac pharetra est
            pellentesque.
          </p>
        </div>
      </section>

      {/* Info Section */}
      <section className={styles.choice}>
        <div className={styles.re_text}>
          <h3>The best help you can get in your resale </h3>
          <p>
            Founded in 2010, [Company Name] has been a trusted name in the real
            estate industry, helping thousands of clients buy, sell, and rent
            properties across Nigeria. Founded in 2010,
          </p>
        </div>

        {/* Features Section */}
        <section className={styles.featuresSection}>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.iconWrapper}>
                <img src={icon1} alt="Payment proof icon" />
              </div>
              <h3 className={styles.title_2}>All Proofs of Payment</h3>
              <p className={styles.description_2}>
                Get a virtual tour, and schedule visits before you rent or buy
                any property. You get overall control.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.iconWrapper}>
                <img src={icon3} alt="Commission icon" />
              </div>
              <h3 className={styles.title_2}>Lowest Commission</h3>
              <p className={styles.description_2}>
                No more haggling with agents. Our commission is fixed at just
                2%!
              </p>
            </div>

            <div className={`${styles.featureCard} ${styles.resale}`}>
              <div className={styles.iconWrapper}>
                <img src={icon2} alt="Installmental pay icon" />
              </div>
              <h3 className={styles.title_2}>Resale Assistance</h3>
              <p className={styles.description_2}>
                Unsure about the right price? We'll handle the market value
                estimates for you.
              </p>
              <button className={styles.cta}>Get Started</button>
            </div>
          </div>
        </section>
      </section>
      <section className={styles.section3}>
        <Proping />
      </section>
      <footer>
        <ForFooter />
      </footer>
    </div>
  );
};

export default Properties;
