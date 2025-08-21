import React from "react";
import styles from "./MapViewPage.module.css";
import search from "../../assets/icons/sarch.svg";
import land from "../../assets/icons/land_icon.svg";
import location from "../../assets/icons/basil_location-solid.svg";
import pricerange from "../../assets/icons/price_range.svg";
import bed from "../../assets/icons/beddings.svg";
import share from "../../assets/icons/share.svg";
import Locationplus from "../../assets/icons/location_on.svg";

const MapViewPage = ({ isMapView, onViewToggle, onPropertySelect }) => {
  const properties = [
    {
      id: 1,
      title: "Investment Land",
      location: "Terry Lane, Golden CO 80403",
      size: "1507 square meters",
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      title: "Investment Land",
      location: "Terry Lane, Golden CO 80403",
      size: "1507 square meters",
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      title: "Investment Land",
      location: "Terry Lane, Golden CO 80403",
      size: "1507 square meters",
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop",
    },
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

      {/* Map and Property Cards */}
      <div className={styles.mapView}>
        <div className={styles.mapContainer}>
          <iframe
            title="location-map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63327.59289387504!2d3.3203505!3d6.6058741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b93eebca95fdb%3A0x8de08f77a6219d8e!2sIkeja%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1691509390892!5m2!1sen!2sng"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
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
      </div>
    </div>
  );
};

export default MapViewPage;
