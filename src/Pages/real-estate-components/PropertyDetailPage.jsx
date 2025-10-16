import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./PropertyDetailPage.module.css";
import {
  FaMapMarkerAlt,
  FaHome,
  FaUtensils,
  FaHotel,
  FaRoad,
  FaBus,
} from "react-icons/fa";
import Image12 from "../../assets/icons/Image13.svg";
import Image123 from "../../assets/icons/Image3.svg";
import Pfp from "../../assets/icons/Profile Image.svg";

const PropertyDetailPage = () => {
  const amenities = [
    { label: "Size", value: "2200", icon: <FaHome /> },
    { label: "Type", value: "Home", icon: <FaHome /> },
    { label: "Size", value: "2200", icon: <FaHome /> },
    { label: "Payment Type", value: "Installment Payment", icon: <FaHome /> },
  ];

  const nearby = [
    { label: "Restaurant", value: "2200", icon: <FaUtensils /> },
    { label: "Hotels", value: "2200", icon: <FaHotel /> },
    { label: "Major Roads", value: "Nearby", icon: <FaRoad /> },
    { label: "Transit", value: "Installment Payment", icon: <FaBus /> },
  ];
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const navigate = useNavigate();

  const handleBuyClick = () => {
    navigate("/browse-properties/one-time");
  };

  return (
    <div className={styles.container}>
      {/* Left Section */}
      <div className={styles.left}>
        {/* Image Gallery */}
        <div className={styles.imageGallery}>
          <div className={styles.mainImage}>
            <img src={Image12} alt="land" />
            <button className={styles.viewBtn}>View 3D tour</button>
          </div>
          <div className={styles.sideImages}>
            <img src={Image123} alt="land" />
            <img src={Image123} alt="land" />
          </div>
        </div>

        {/* Property Info */}
        <div className={styles.propertyInfo}>
          <h2>Investment Land</h2>
          <h3>₦20,000,000,000</h3>
          <p>
            <FaMapMarkerAlt /> Doane Street, Fremont CA 94538
          </p>
        </div>

        {/* Overview & Amenities */}
        <div className={styles.details}>
          <div className={styles.section}>
            <h4>Overview</h4>
            <div className={styles.infoGrid}>
              {amenities.map((item, index) => (
                <div key={index} className={styles.infoCard}>
                  <span className={styles.icon}>{item.icon}</span>
                  <div>
                    <p className={styles.label}>{item.label}</p>
                    <p className={styles.value}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h4>Nearby Amenities</h4>
            <div className={styles.infoGrid}>
              {nearby.map((item, index) => (
                <div key={index} className={styles.infoCard}>
                  <span className={styles.icon}>{item.icon}</span>
                  <div>
                    <p className={styles.label}>{item.label}</p>
                    <p className={styles.value}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Price History */}
        <deal>
          {" "}
          <div className={styles.section}>
            <h4>Price History Chart</h4>
            <div className={styles.priceCard}>
              <p>$32,000</p>
              <span className={styles.gain}>+ $350 (+317%)</span>
              <div className={styles.chart}></div>
            </div>
          </div>
          {/* Available Documents */}
          <div className={styles.section}>
            <h4>Available Documents</h4>
            <div className={styles.docs}>
              <div className={styles.docCard}>📂 Subscription Agreement</div>
              <div className={styles.docCard}>📂 Tenancy Agreement</div>
            </div>
          </div>
        </deal>
      </div>

      {/* Right Section */}
      <div className={styles.right}>
        <div className={styles.agentCard}>
          <img
            src={Pfp}
            alt={user?.firstName || "Agent"}
            className={styles.agentImg}
          />

          {/* ✅ Agent Name */}
          <h3>
            {user
              ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
              : "Guest User"}
          </h3>

          {/* ✅ Role or Default */}
          <p>{user?.role || "Real Estate Agent"}</p>

          {/* ✅ Address or Fallback */}
          <p>
            <FaMapMarkerAlt /> {user?.address || "Doane Street, Fremont CA"}
          </p>

          {/* ✅ Duration or Placeholder */}
          <p>{user?.joinedDate ? "Joined recently" : "2 months on here"}</p>

          {/* ✅ Rating placeholder */}
          <p>⭐⭐⭐⭐⭐ (16 Properties)</p>

          {/* ✅ Buttons */}
          <div className={styles.buttons}>
            <button className={styles.msgBtn}>Message</button>
            <button className={styles.callBtn}>Call</button>
            <button className={styles.msgBtn} onClick={handleBuyClick}>
              Buy
            </button>
          </div>
        </div>

        <div className={styles.mapCard}>
          <iframe
            title="map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-0.12%2C51.50%2C-0.10%2C51.52&layer=mapnik"
            className={styles.map}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
