import React from "react";
import Horheader from "../Components/Horheader";
import styles from "../Styles/Installmental.module.css";
import InstallmentIMg from "../assets/images/Buying_and_selling_real_estate-removebg-preview.png";
import InstallmentIMg2 from "../assets/images/installament-cover.png";
import installmentImg from "../assets/images/office-buildings.png";
import collaborationImg from "../assets/images/sofa.png";
import Proping from "../Components/PropertyListing.jsx";
import ForFooter from "../Components/ForFooter.jsx";

const Installmental = () => {
  const options = [
    {
      title: "Installmental Payment",
      desc: "Not sure what you should be charging for your property? No need to worry, let us do the numbers for you.",
      image: installmentImg,
    },
    {
      title: "Collaboration Payment",
      desc: "Not sure what you should be charging for your property? No need to worry, let us do the numbers for you.",
      image: collaborationImg,
    },
    {
      title: "Installmental Payment",
      desc: "Not sure what you should be charging for your property? No need to worry, let us do the numbers for you.",
      image: installmentImg,
    },
  ];
  return (
    <div className={styles.Installmental}>
      <Horheader />
      <section className={styles.section_one}>
        <div className={styles.hero_one}>
          <div className={styles.text_one}>
            <h3>Buy a home and pay at your convenience </h3>
            <p>
              Lorem ipsum dolor sit amet consectetur. Commodo mauris erat ipsum
              habitasse. Consectetur fringilla sed elementum at ac pharetra est
              pellentesque.{" "}
            </p>
            <button className={styles.btn_one}>Get Started</button>
          </div>
                  <div className={styles.imageContainer}>
                    <img className={styles.img_one} src={InstallmentIMg} alt="Img" />
                    <img className={styles.img_two} src={InstallmentIMg2} alt="Img" />
                  </div>
        </div>
      </section>
      <section className={styles.section_two_b}>
        <div className={styles.middle}>
          <h3>The best property ownership deal</h3>
          <p>
            Founded in 2010, [Company Name] has been a trusted name in the real
            estate industry, helping thousands of clients buy, sell, and rent
            properties across Nigeria. Founded in 2010,{" "}
          </p>
        </div>

        <div className={styles.wrapper}>
          {options.map((opt, index) => (
            <div className={styles.card} key={index}>
              <div className={styles.imageWrapper}>
                <img
                  src={opt.image}
                  alt={opt.title}
                  className={styles.cardImage}
                />
              </div>
              <div className={styles.cardContent}>
                <h3>{opt.title}</h3>
                <p>{opt.desc}</p>
                <button className={styles.button}>Get Started</button>
              </div>
            </div>
          ))}
        </div>
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

export default Installmental;
