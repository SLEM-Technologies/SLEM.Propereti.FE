import React, { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard.jsx";
import "../Styles/PropertyListings.module.css";
import { PropertiesAPI } from "./API/API.js";

// Import images
import img1 from "../assets/images/house-card1.jpg";
import img2 from "../assets/images/house-card2.jpg";
import img3 from "../assets/images/house-card3.png";
import img4 from "../assets/images/house-card4.png";
import img5 from "../assets/images/house-card5.png";
import img6 from "../assets/images/house-card6.png";
import Key from "../assets/icons/key-icon.svg";
import HomeIcon from "../assets/icons/home-icon.svg";
import SearchIcon from "../assets/icons/search-icon.svg";
import Bed from "../assets/icons/bed.svg"
import Bath from "../assets/icons/bath.svg"
import Square from "../assets/icons/square-meters.svg"

const fallbackProperties = [
  {
    id: 1,
    title: "Palm Harbor",
    price: "$2,095",
    location: "2699 Green Valley, Highland Lake, FL",
    beds: 3,
    baths: 2,
    size: "5×7 m²",
    image: img1,
    popular: true,
  },
  {
    id: 2,
    title: "Beverly Springfield",
    price: "$2,700",
    location: "2821 Lake Sevilla, Palm Harbor, TX",
    beds: 4,
    baths: 2,
    size: "6×7 m²",
    image: img2,
    popular: true,
  },
  {
    id: 3,
    title: "Faulkner Ave",
    price: "$4,550",
    location: "909 Woodland St, Michigan, IN",
    beds: 4,
    baths: 3,
    size: "8×10 m²",
    image: img3,
    popular: true,
  },
  {
    id: 4,
    title: "St. Crystal",
    price: "$2,400",
    location: "210 US Highway, Highland Lake, FL",
    beds: 4,
    baths: 2,
    size: "6×8 m²",
    image: img4,
    popular: false,
  },
  {
    id: 5,
    title: "Cove Red",
    price: "$1,500",
    location: "243 Curlew Road, Palm Harbor, TX",
    beds: 2,
    baths: 1,
    size: "5×7 m²",
    image: img5,
    popular: false,
  },
  {
    id: 6,
    title: "Tarpon Bay",
    price: "$1,600",
    location: "103 Lake Shores, Michigan, IN",
    beds: 3,
    baths: 1,
    size: "5×7 m²",
    image: img6,
    popular: false,
  },
];

const PropertyListings = () => {
  const [activeTab, setActiveTab] = useState("Buy");
  const [searchTerm, setSearchTerm] = useState("");
  const [properties, setProperties] = useState(fallbackProperties);
  const [isLoading, setIsLoading] = useState(true);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await PropertiesAPI.list();
        const apiData = res?.data || res;
        const mapped = Array.isArray(apiData)
          ? apiData.map((p, idx) => ({
              id: p.id || p._id || idx,
              title: p.title || p.name || p.propertyType || 'Property',
              price: p.price ? `${p.price}` : p.amount ? `${p.amount}` : '$—',
              location: p.location || p.city || p.address || '—',
              beds: p.beds || p.bedrooms || 0,
              baths: p.baths || p.bathrooms || 0,
              size: p.size || p.area || '—',
              image: p.imageUrl || p.image || fallbackProperties[idx % fallbackProperties.length].image,
              popular: Boolean(p.popular),
            }))
          : fallbackProperties;
        if (isMounted) setProperties(mapped);
      } catch {
        if (isMounted) setProperties(fallbackProperties);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProperties = properties.filter(
    (property) =>
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="propertyListings">
      <style jsx>{`
        .propertyListings {
          padding: 80px 20px;
          background-color: #f8fafc;
          min-height: 100vh;
          font-family: "Inter", "Poppins", -apple-system, BlinkMacSystemFont,
            "Segoe UI", sans-serif;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Header Section */
        .header {
          text-align: center;
          margin-bottom: 50px;
        }

        .title {
          font-size: 40px;
          font-weight: 700;
          color: #3a4999;
          margin-bottom: 12px;
          line-height: 1.2;
          font-family: Plus Jakarta Sans;
        }

        .subtitle {
          font-size: 16px;
          color: #3a4999;
          margin: 0;
          font-weight: 400;
        }

        /* Controls Section */
        .controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
          gap: 20px;
        }

        .tabs {
          display: flex;
          background-color: #f1f5f9;
          border-radius: 12px;
          padding: 11px;
          gap: 4px;
        }

        .tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          border: none;
          background: transparent;
          border-radius: 8px;
          font-size: 18px;
          font-weight: 500;
          color:#7065F0;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          font-family:Plus Jakarta Sans;
        }

        .tab:hover {
          background-color: #e2e8f0;
          color: #475569;
        }

        .tab.active {
          background-color: #FFFFFF;
          color: #7065F0;
          box-shadow: 0 2px 8px rgba(112, 101, 240, 0.3);
        }

        .tabIcon {
          font-size: 1rem;
        }

        /* Search Container */
        .searchContainer {
          position: relative;
          min-width: 280px;
        }

        .searchInput {
          width: 100%;
          padding: 14px 20px 14px 50px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 0.95rem;
          background-color: white;
          transition: all 0.2s ease;
          outline: none;
          max-width: 206px;
          background: #E0DEF7;
        }

        .searchInput:focus {
          border-color: #7065f0;
          box-shadow: 0 0 0 3px rgba(112, 101, 240, 0.1);
        }

        .searchInput::placeholder {
          color: #94a3b8;
                    font-family:Plus Jakarta Sans;

        }

        .searchIcon {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          font-size: 1.1rem;
        }

        /* Property Grid */
        .propertyGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
          margin-bottom: 60px;
        }

        /* Browse More Section */
        .browseMore {
          text-align: center;
        }

        .browseButton {
          background-color: #3A4999;
          color: white;
          border: none;
          padding: 16px 40px;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(112, 101, 240, 0.3);
        }

        .browseButton:hover {
          background-color: #5b52d9;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(112, 101, 240, 0.4);
        }

        .browseButton:active {
          transform: translateY(0);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .propertyListings {
            padding: 40px 16px;
          }

          .title {
            font-size: 2rem;
          }

          .subtitle {
            font-size: 1rem;
          }

          .controls {
            flex-direction: column;
            align-items: stretch;
            gap: 20px;
          }

          .tabs {
            justify-content: center;
          }

          .tab {
            flex: 1;
            justify-content: center;
            padding: 12px 16px;
            font-size: 0.9rem;
          }

          .searchContainer {
            min-width: auto;
          }

          .propertyGrid {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
          }
        }

        @media (max-width: 480px) {
          .title {
            font-size: 1.75rem;
          }

          .tab {
            padding: 10px 12px;
            font-size: 0.85rem;
          }

          .searchInput {
            padding: 12px 16px 12px 44px;
            font-size: 0.9rem;
          }

          .searchIcon {
            left: 16px;
            font-size: 1rem;
          }

          .propertyGrid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      <div className="container">
        {/* Header Section */}
        <div className="header">
          <h2 className="title">Based on your location</h2>
          <p className="subtitle">
            Some of our picked properties near you location.
          </p>
        </div>

        {/* Controls Section */}
        <div className="controls">
          <div className="tabs">
            {["Buy", "Sell", "Resell"].map((tab) => (
              <button
                key={tab}
                className={`tab ${activeTab === tab ? "active" : ""}`}
                onClick={() => handleTabClick(tab)}
              >
                <span className="tabIcon">
                  <span className="tabIcon">
                    {tab === "Buy" && <img src={Key} alt="Key" />}
                    {tab === "Sell" && <img src={HomeIcon} alt="Home" />}
                    {tab === "Resell" && <img src={HomeIcon} alt="Home" />}
                  </span>
                </span>
                {tab}
              </button>
            ))}
          </div>

          <div className="searchContainer">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="searchInput"
            />
            <span className="searchIcon"><img src={SearchIcon} alt="Search" /></span>
          </div>
        </div>

        {/* Property Grid */}
        <div className="propertyGrid">
          {isLoading ? (
            <div>Loading properties...</div>
          ) : filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))
          ) : (
            <div>No properties found.</div>
          )}
        </div>

        {/* Browse More Button */}
        <div className="browseMore">
          <button className="browseButton">Browse more properties</button>
        </div>
      </div>
    </section>
  );
};

export default PropertyListings;
