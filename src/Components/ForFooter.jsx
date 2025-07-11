import React from "react";
import styles from "../Styles/Footer.module.css";
import Logo from "../assets/icons/logo.svg";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerBrand}>
          <img src={Logo} alt="Estatery" />
          <h2>Estatery</h2>
        </div>

        <div className={styles.footerLinks}>
          <div className={styles.linkGroup}>
            <h4>SELL A HOME</h4>
            <ul>
              <li>Request an offer</li>
              <li>Pricing</li>
              <li>Reviews</li>
              <li>Stories</li>
            </ul>
          </div>

          <div className={styles.linkGroup}>
            <h4>BUY, RENT AND SELL</h4>
            <ul>
              <li>Buy and sell properties</li>
              <li>Rent home</li>
              <li>Builder trade-up</li>
            </ul>
          </div>

          <div className={styles.linkGroup}>
            <h4>ABOUT</h4>
            <ul>
              <li>Company</li>
              <li>How it works</li>
              <li>Contact</li>
              <li>Investors</li>
            </ul>
          </div>

          <div className={styles.linkGroup}>
            <h4>BUY A HOME</h4>
            <ul>
              <li>Buy</li>
              <li>Finance</li>
            </ul>
          </div>

          <div className={styles.linkGroup}>
            <h4>TERMS & PRIVACY</h4>
            <ul>
              <li>Trust & Safety</li>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          <div className={styles.linkGroup}>
            <h4>RESOURCES</h4>
            <ul>
              <li>Blog</li>
              <li>Guides</li>
              <li>FAQ</li>
              <li>Help Center</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>©2021 Estatery. All rights reserved</p>
        <div className={styles.socials}>
          <FaFacebookF />
          <FaInstagram />
          <FaTwitter />
          <FaLinkedinIn />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
