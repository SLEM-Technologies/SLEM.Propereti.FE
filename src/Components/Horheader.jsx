import React, { useState } from "react";
import styles from "../Styles/Horheader.module.css";
import Estatery from "../assets/icons/logo.svg";

const Horheader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo Section */}
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <img src={Estatery} alt="" />
          </div>
          <span className={styles.logoText}>Estatery</span>
        </div>

        {/* Navigation Menu */}
        <nav className={styles.nav}>
          <div
            className={styles.navItem}
            onClick={toggleDropdown}
            style={{ position: "relative", cursor: "pointer" }}
          >
            <span className={styles.navLink}>Property</span>
            <svg
              className={styles.dropdownIcon}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="#3A4999"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {isOpen && (
              <div
                className={styles.dropdownMenu}
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  borderRadius: "4px",
                  marginTop: "8px",
                  minWidth: "150px",
                  zIndex: 10,
                }}
              >
                <a href="/property1" className={styles.dropdownItem}>
                  Property 1
                </a>
                <a href="/property2" className={styles.dropdownItem}>
                  Property 2
                </a>
                <a href="/property3" className={styles.dropdownItem}>
                  Property 3
                </a>
              </div>
            )}
          </div>
          <a href="#" className={styles.navLink}>
            About Us
          </a>
          <a href="#" className={styles.navLink}>
            Contact Us
          </a>
        </nav>

        {/* Contact Button */}
        <button className={styles.contactButton}>Contact Us</button>
      </div>
    </header>
  );
};

export default Horheader;
