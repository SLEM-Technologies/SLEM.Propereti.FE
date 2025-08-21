import React, { useState } from "react";
import styles from "./GridViewPage.module.css";
import search from "../../assets/icons/sarch.svg";
import land from "../../assets/icons/land_icon.svg";
import location from "../../assets/icons/basil_location-solid.svg";
import pricerange from "../../assets/icons/price_range.svg";
import bed from "../../assets/icons/beddings.svg";
import share from "../../assets/icons/share.svg";
import Locationplus from "../../assets/icons/location_on.svg";
import Image12 from "../../assets/icons/Image13.svg";
import Image123 from "../../assets/icons/Image3.svg";

const GridViewPage = ({ isMapView, onViewToggle, onPropertySelect }) => {
  const [activeTab, setActiveTab] = useState("Recommended");

  const properties = [
    {
      id: 1,
      title: "Investment Land",
      location: "Terry Lane, Golden CO 80403",
      size: "1507 square meters",
      price: "N20,500,000",
      image:
Image12,    },
    {
      id: 2,
      title: "Investment Land",
      location: "Terry Lane, Golden CO 80403",
      size: "1507 square meters",
      price: "N20,500,000",
      image:
Image12,    },
    {
      id: 3,
      title: "Investment Land",
      location: "Terry Lane, Golden CO 80403",
      size: "1507 square meters",
      price: "N20,500,000",
      image:
Image12,    },
    {
      id: 4,
      title: "Investment Land",
      location: "Terry Lane, Golden CO 80403",
      size: "1507 square meters",
      price: "N20,500,000",
      image:
Image123,    },
    {
      id: 5,
      title: "Investment Land",
      location: "Terry Lane, Golden CO 80403",
      size: "1507 square meters",
      price: "N20,500,000",
      image:
Image123,    },
  ];

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.navItems}>
            <button className={`${styles.navItem} ${styles.active}`}>
              Buy
            </button>
            <button className={styles.navItem}>Rent</button>
            <button className={styles.navItem}>Resell</button>
            <button className={styles.navItem}>Compare</button>
          </div>

          <div className={styles.mapToggle}>
            <span className={styles.mapToggleLabel}>Map View</span>
            <div
              className={`${styles.toggle} ${
                isMapView ? styles.toggleActive : ""
              }`}
              onClick={onViewToggle}
            >
              <div className={styles.toggleSlider}></div>
            </div>
          </div>
        </nav>
      </header>

      {/* Search Bar */}
      <div className={styles.searchBar}>
        <div className={styles.searchContainer}>
          <div className={styles.searchIcon}>
            <img className={styles.imgsarch} src={search} alt="" />
          </div>

          <div className={styles.filterWrapper}>
            <img src={land} alt="land" className={styles.filterIcon} />
            <select className={styles.filterSelect}>
              <option>Land</option>
            </select>
          </div>

          <div className={styles.filterWrapper}>
            <img src={location} alt="location" className={styles.filterIcon} />
            <select className={styles.filterSelect}>
              <option>Location</option>
            </select>
          </div>

          <div className={styles.filterWrapper}>
            <img src={pricerange} alt="price" className={styles.filterIcon} />
            <select className={styles.filterSelect}>
              <option>Price Range</option>
            </select>
          </div>

          <button className={styles.searchButton}>Search</button>
        </div>
      </div>

      {/* Grid View Content */}
      <div className={styles.gridView}>
        {/* Top Row Properties */}
        <div className={styles.topRow}>
          {properties.slice(0, 3).map((property) => (
            <div
              key={property.id}
              className={styles.propertyCard}
              onClick={() => onPropertySelect(property)}
            >
              <div className={styles.imageContainer}>
                <img
                  src={property.image}
                  alt={property.title}
                  className={styles.propertyImage}
                />
              </div>
              <div className={styles.propertyInfo}>
                <div className={styles.grouph}>
                  {" "}
                  <h3 className={styles.propertyTitle}>{property.title}</h3>
                  <button
                    className={styles.viewDetailsBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      onPropertySelect(property);
                    }}
                  >
                    View Details
                  </button>
                </div>
                <div className={styles.propertyDetails}>
                  <div className={styles.locationInfo}>
                    <span className={styles.icon}>
                      {" "}
                      <img src={location} alt="location" />
                    </span>
                    <span className={styles.location}>{property.location}</span>
                  </div>
                  <div className={styles.sizeInfo}>
                    <span className={styles.icon}>
                      {" "}
                      <img src={bed} alt="" />
                    </span>
                    <span className={styles.size}>{property.size}</span>
                  </div>
                </div>
                <div className={styles.priceContainer1}>
                  <span className={styles.price}>{property.price}</span>
                  <button className={styles.shareBtn}>
                    {" "}
                    <img src={share} alt="share" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className={styles.filterTabs}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${
                activeTab === "Recommended" ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab("Recommended")}
            >
              Recommended
            </button>
            <button
              className={`${styles.tab} ${
                activeTab === "Popular" ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab("Popular")}
            >
              Popular
            </button>
            <button
              className={`${styles.tab} ${
                activeTab === "Nearest" ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab("Nearest")}
            >
              Nearest
            </button>
          </div>
          <div className={styles.sortContainer}>
            <select className={styles.sortSelect}>
              <option>Recent</option>
            </select>
          </div>
        </div>

        {/* Bottom Row Properties */}
        <div className={styles.bottomRow}>
          {properties.slice(3, 5).map((property) => (
            <div
              key={property.id}
              className={styles.propertyCardHorizontal}
              onClick={() => onPropertySelect(property)}
            >
              <div className={styles.imageContainer}>
                <img
                  src={property.image}
                  alt={property.title}
                  className={styles.propertyImage}
                />
              </div>
              <div className={styles.propertyInfo}>
                <dan>
                  {"    "}
                  <h3 className={styles.propertyTitle}>{property.title}</h3>
                  <button
                    className={styles.viewDetailsBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      onPropertySelect(property);
                    }}
                  >
                    View Details
                  </button>
                </dan>
                <div className={styles.propertyDetails}>
                  <div className={styles.locationInfo}>
                    <span className={styles.icon}>
                      <img src={location} alt="location" />
                    </span>
                    <span className={styles.location}>{property.location}</span>
                  </div>
                  <div className={styles.sizeInfo}>
                    <span className={styles.icon}>
                      <img src={bed} alt="" />
                    </span>
                    <span className={styles.size}>{property.size}</span>
                  </div>
                </div>
                <div className={styles.priceContainer}>
                  <span className={styles.price}>{property.price}</span>
                  <button className={styles.shareBtn}>
                    <img src={share} alt="share" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GridViewPage;
