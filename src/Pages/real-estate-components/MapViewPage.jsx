import React, { useState } from "react";
import styles from "./MapViewPage.module.css";
import search from "../../assets/icons/sarch.svg";
import land from "../../assets/icons/land_icon.svg";
import location from "../../assets/icons/basil_location-solid.svg";
import pricerange from "../../assets/icons/price_range.svg";
import bed from "../../assets/icons/beddings.svg";
import share from "../../assets/icons/share.svg";
import Image12 from "../../assets/icons/Image13.svg";

const MapViewPage = ({ isMapView, onViewToggle, onPropertySelect }) => {
  const [mapUrl, setMapUrl] = useState(
    "https://www.google.com/maps?q=Ikeja+Nigeria&output=embed"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      const query = searchQuery.replace(/\s+/g, "+");
      setMapUrl(`https://www.google.com/maps?q=${query}&output=embed`);
      setIsModalOpen(false); // close modal after search
    }
  };

  const properties = [
    {
      id: 1,
      title: "Investment Land",
      location: "Terry Lane, Golden CO 80403",
      size: "1507 square meters",
      image: Image12,
    },
    {
      id: 2,
      title: "Investment Land",
      location: "Terry Lane, Golden CO 80403",
      size: "1507 square meters",
      image: Image12,
    },
    {
      id: 3,
      title: "Investment Land",
      location: "Terry Lane, Golden CO 80403",
      size: "1507 square meters",
      image: Image12,
    },
  ];
  const [isLoading, setIsLoading] = useState(false);
  // state
  const [selectedLocation, setSelectedLocation] = useState("");

  // example locations
  const locations = [
    "Ikeja, Nigeria",
    "Lekki, Nigeria",
    "Abuja, Nigeria",
    "Golden CO 80403",
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
            <select
              className={styles.filterSelect}
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">Location</option>
              {locations.map((loc, i) => (
                <option key={i} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.filterWrapper}>
            <img src={pricerange} alt="price" className={styles.filterIcon} />
            <select className={styles.filterSelect}>
              <option>Price Range</option>
            </select>
          </div>

          {/* Open Modal on Search */}
          <button
            className={styles.searchButton}
            onClick={() => setIsModalOpen(true)}
          >
            Search
          </button>
        </div>
      </div>

      {/* Map and Property Cards */}
      <div className={styles.mapView}>
        <div className={styles.mapContainer}>
          <iframe
            title="location-map"
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        <div className={styles.propertyCards}>
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
                <div className={styles.priceContainer1}>
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

      {/* Modal for Search */}
      {isModalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => setIsModalOpen(false)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.closeBtn}
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>
            <h2>Search Location</h2>
            <form onSubmit={handleSearchSubmit} className={styles.modalForm}>
              <input
                type="text"
                value={searchQuery}
                placeholder="Enter a location..."
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.modalInput}
              />
              <button type="submit" className={styles.modalSearchBtn}>
                Search
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapViewPage;
