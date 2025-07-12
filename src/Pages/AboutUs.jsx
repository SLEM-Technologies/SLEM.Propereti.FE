import React from "react";
import Horheader from "../Components/Horheader";
import ForFooter from "../Components/ForFooter.jsx";
import LocationSrch from "../Components/LocationBase.jsx";
import styles from "../Styles/About.module.css";
import TreeFig from "../assets/images/Frame 1000003143.png";
import FmColl from "../assets/images/fm-colleagues.png";
import Proping from "../Components/PropertyListing.jsx"

const AboutUs = () => {
  return (
    <div className={styles.aboutBody}>
      {" "}
      <Horheader />
      <main className={styles.main1}>
        <section className={styles.section1}>
          <div className={styles.sidetxt}>
            <h3>
              Our purpose is to turn anyone and everyone into a property owner
            </h3>
            <p>
              Lorem ipsum dolor sit amet consectetur. Commodo mauris erat ipsum
              habitasse. Consectetur fringilla sed elementum at ac pharetra est
              pellentesque. Lectus neque id quis viverra interdum. Pretium eu
              fames mauris id at platea. Suspendisse amet sed arcu diam arcu
              diam vitae faucibus. Odio donec scelerisque fusce lorem pulvinar
              amet. Ac massa vehicula venenatis eget eget pretium quis. Lectus
              morbi nunc tellus volutpat purus et. Ut sed id risus a sed enim.
            </p>
          </div>
          <div className={styles.imgcont}>
            <img src={TreeFig} alt="FigureTree" />
          </div>
        </section>
      </main>
      <div className={styles.main2}>
        <section className={styles.section2}>
          <div className={styles.collimg}>
            <img src={FmColl} alt="Colleagues" />
          </div>
          <div className={styles.sidepg}>
            <div className={styles.card_a}>
              <h3>Company History</h3>
              <p>
                Founded in 2010, [Company Name] has been a trusted name in the
                real estate industry, helping thousands of clients buy, sell,
                and rent properties across Nigeria. Founded in 2010, [Company
                Name] has been a trusted name in the real estate industry,
                helping thousands of clients buy, sell, and rent properties
                across Nigeria."
              </p>
            </div>
            <div className={styles.card_a}>
              <h3>Mission</h3>
              <p>
                Our mission is to make property ownership accessible and
                affordable for everyone through innovative solutions like
                installment payment plans and resale options.
              </p>
            </div>
            <div className={styles.card_a}>
              <h3>Vision</h3>
              <p>
                To be the leading real estate platform in Africa, transforming
                the way people buy, sell, and rent properties.
              </p>
            </div>
          </div>
        </section>
      </div>
        <section className={styles.section3}>
          <Proping />
        </section>
            <footer>
              <ForFooter />
            </footer>
    </div>
  );
};

export default AboutUs;
