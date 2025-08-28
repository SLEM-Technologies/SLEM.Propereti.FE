import React, { useState } from "react";
import Horheader from "../Components/Horheader";
import styles from "../Styles/Home.module.css";
import heroImg from "../assets/images/homepage-hero-img.png";
import houseImg from "../assets/images/homepage-house-01png.png";
import icon1 from "../assets/icons/property-icon.svg";
import icon2 from "../assets/icons/installmental-pay-icon.svg";
import icon3 from "../assets/icons/commission-icon.svg";
import icon4 from "../assets/icons/resale-icon.svg";
import Draggable from "react-draggable";
import mapImage from "../assets/images/map.png";
import LocationSearch from "../Components/LocationSearch.jsx";
// Removed unused icons for cleaner code
import Virt from "../assets/icons/virtual-home-icon.svg";
import Best from "../assets/icons/find-best-home-icon.svg";
import Copy from "../assets/images/IconCopy.png";
import ForFooter from "../Components/ForFooter.jsx";
import { Link } from "react-router-dom";

// import { classicNameResolver } from "typescript";

const Home = () => {
  const [activeTab, setActiveTab] = useState("lease");

  // Removed unused map constants

  return (
    <div className={styles.body}>
      <Horheader />
      <main className={styles.maincontent}>
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
              <Link to="/properties">
                {" "}
                <button className={styles.button}> Browse Properties </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <section className={styles.whole}>
        <section className={styles.benefitsSection}>
          <div className={styles.leftCard}>
            <h2>The new way to find your new home</h2>
            <p>
              Find your dream place to live in with more than 10k+ properties
              listed.
            </p>
            <Link to="/properties">
              <button>Browse Properties</button>
            </Link>
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
                  We offer our customer property protection of liability
                  coverage and insurance for their better life.
                </p>
              </div>
            </div>

            <div className={styles.featureBox}>
              <img src={icon2} alt="Resale" />
              <div>
                <h3>Resale Assistance</h3>
                <p>
                  Not sure what you should be charging for your property? No
                  need to worry, let us do the numbers for you.
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
      </section>
      <section className={styles.map}>
        <div className={styles.wrapper}>
          <Draggable>
            <img
              src={mapImage}
              alt="Map Background"
              className={styles.mapImage}
            />
          </Draggable>

          <div className={styles.overlayyed}>
            <LocationSearch />
          </div>
        </div>
      </section>
      <section>
        <div className={styles.tl_section}>
          <div className={styles.tl_topContent}>
            <div className={styles.tl_left}>
              <h2>We make it easy for tenants and landlords.</h2>
            </div>
            <div className={styles.tl_right}>
              <p>
                Whether it’s selling your current home, getting financing, or
                buying a new home, we make it easy and efficient. The best part?
                you’ll save a bunch of money and time with our services.
              </p>
            </div>
          </div>

          <div className={styles.tl_wrapper}>
            <div className={styles.tl_cards}>
              <div className={styles.tl_card}>
                <div className={styles.tl_img}>
                  <img src={Virt} alt="virtual " />
                </div>
                <div className={styles.tl_cont}>
                  {" "}
                  <h3>Virtual home tour</h3>
                  <p>
                    You can communicate directly with landlords and we provide
                    you with virtual tour before you buy or rent the property.
                  </p>
                </div>
              </div>

              <div className={styles.tl_card}>
                <div className={styles.tl_img}>
                  <img src={Best} alt="virtual " />
                </div>
                <div className={styles.tl_cont}>
                  {" "}
                  <h3>Find the best deal</h3>
                  <p>
                    Browse thousands of properties, save your favorites and set
                    up search alerts so you don’t miss the best home deal!
                  </p>
                </div>
              </div>

              <div className={`${styles.tl_card} ${styles.custom_card}`}>
                <div className={`${styles.tl_img} ${styles.custom_img}`}>
                  <img src={Copy} alt="virtual" />
                </div>
                <div className={`${styles.tl_cont} ${styles.custom_cont}`}>
                  <h3 className={`${styles.custom_title}`}>Get financing</h3>
                  <p className={`${styles.custom_text}`}>
                    Find financing options to help make your dream home a
                    reality and speed up the buying or renting process.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.tl_stats}>
            <div className={styles.tl_stat}>
              <h4>7.4%</h4>
              <p>Property Return Rate</p>
            </div>
            <div className={styles.tl_divider}></div>
            <div className={styles.tl_stat}>
              <h4>3,856</h4>
              <p>Property in Sell & Rent</p>
            </div>
            <div className={styles.tl_divider}></div>
            <div className={styles.tl_stat}>
              <h4>2,540</h4>
              <p>Daily Completed Transactions</p>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.cta_section}>
        <p className={styles.cta_note}>No Spam Promise</p>
        <h2 className={styles.cta_heading}>Are you a landowner?</h2>
        <p className={styles.cta_subtext}>
          Discover ways to increase your home's value and get listed. No Spam.
        </p>

        <form className={styles.cta_form}>
          <div className={styles.cta_input_container}>
            <input
              type="email"
              placeholder="Enter your email address"
              className={styles.cta_input}
            />
            <button type="submit" className={styles.cta_button}>
              Submit
            </button>
          </div>
        </form>

        <p className={styles.cta_footer}>
          Join <span className={styles.cta_highlight}>10,000+</span> other
          landlords in our estatery community.
        </p>
      </section>
      <footer>
        <ForFooter />
      </footer>
      </main>
    </div>
  );
};

export default Home;
