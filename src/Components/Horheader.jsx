import React, { useState, useEffect } from "react";
import styles from "../Styles/Horheader.module.css";
import Estatery from "../assets/icons/logo.svg";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Horheader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

useEffect(() => {
  let ticking = false;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (currentScrollY > lastScrollY && currentScrollY > 80) {
          // scrolling down
          setShowHeader(false);
        } else {
          // scrolling up
          setShowHeader(true);
        }

        setLastScrollY(currentScrollY);
        ticking = false;
      });

      ticking = true;
    }
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, [lastScrollY]);


  return (
    <header
      className={`${styles.header} ${!showHeader ? styles.hiddenHeader : ""}`}
    >
      <div className={styles.container}>
        {/* Logo */}
        <Link to="/">
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <img src={Estatery} alt="logo" />
            </div>
            <span className={styles.logoText}>Estatery</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav
          className={`${styles.nav} ${
            isMobileMenuOpen ? styles.showNav : ""
          }`}
        >
          <div
            className={styles.navItem}
            onClick={toggleDropdown}
            style={{ position: "relative" }}
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

            {isDropdownOpen && (
              <div className={styles.dropdownMenu}>
                <Link to="/properties">
                  <p className={styles.dropdownItem}>Buy</p>
                </Link>
                <Link to="/installmental">
                  <p className={styles.dropdownItem}>Installmental Payment</p>
                </Link>
                <Link to="/resell">
                  <p className={styles.dropdownItem}>Resell</p>
                </Link>
              </div>
            )}
          </div>

          <Link to="/about-us">
            <p className={styles.navLink}>About Us</p>
          </Link>

          <Link to="/contact">
            <p className={styles.navLink}>Contact Us</p>
          </Link>
        </nav>

        {/* Right Section */}
        <div className={styles.rightSection}>
          <Link to="/contact">
            <button className={styles.contactButton}>Contact Us</button>
          </Link>
          <Menu
            className={styles.hamburger}
            size={24}
            onClick={toggleMobileMenu}
          />
        </div>
      </div>
    </header>
  );
};

export default Horheader;
