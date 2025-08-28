import React, { useState, memo } from "react";
import "../Styles/PropertyCard.module.css";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Bed from "../assets/icons/bed.svg";
import Bath from "../assets/icons/bath.svg";
import Square from "../assets/icons/square-meters.svg";

const PropertyCard = ({ property }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlistClick = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="propertyCard">
      <style jsx>{`
        .propertyCard {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: pointer;
          border: 1px solid #f1f5f9;
        }

        .propertyCard:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        }

        /* Image Container */
        .imageContainer {
          position: relative;
          width: 100%;
          height: 240px;
          overflow: hidden;
        }

        .propertyImage {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .propertyCard:hover .propertyImage {
          transform: scale(1.05);
        }

        /* Popular Tag */
        .popularTag {
          position: absolute;
          top: 16px;
          left: 16px;
          background-color: #7065f0;
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 4px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 2px 8px rgba(112, 101, 240, 0.3);
        }

        .popularIcon {
          font-size: 0.8rem;
        }

        /* Wishlist Button */
        .wishlistButton {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(255, 255, 255, 0.9);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          backdrop-filter: blur(10px);
        }

        .wishlistButton:hover {
          background: white;
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .heartIcon {
          font-size: 1.2rem;
          transition: all 0.2s ease;
        }

        .heartIcon.filled {
          transform: scale(1.2);
        }

        /* Card Content */
        .cardContent {
          padding: 24px;
        }

        /* Price */
        .price {
          font-size: 24px;
          font-weight: 800;
          color: #3a4999;
          margin-bottom: 8px;
          display: flex;
          align-items: baseline;
          gap: 4px;
          font-family: Plus Jakarta Sans;
        }

        .period {
          font-size: 16px;
          font-weight: 400;
          color: #3a4999;
          font-family: Plus Jakarta Sans;
        }

        /* Property Title */
        .propertyTitle {
          font-size: 23px;
          font-weight: 700;
          color: #3a4999;
          margin: 0 0 8px 0;
          line-height: 1.3;
          font-family: Plus Jakarta Sans;
        }

        /* Address */
        .address {
          color: #64748b;
          font-size: 0.95rem;
          margin: 0 0 20px 0;
          line-height: 1.4;
        }

        /* Property Details */
        .propertyDetails {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 20px;
          border-top: 1px solid #f1f5f9;
        }

        .detail {
          display: flex;
          align-items: center;
          gap: 6px;
          flex: 1;
          justify-content: center;
        }

        .detailIcon {
          font-size: 1.1rem;
          opacity: 0.8;
        }

        .detailText {
          font-size: 0.85rem;
          color: #64748b;
          font-weight: 500;
          white-space: nowrap;
        }

        /* Dividers */
        .divider {
          width: 1px;
          height: 20px;
          background-color: #e2e8f0;
          margin: 0 8px;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .propertyCard {
            border-radius: 12px;
          }

          .imageContainer {
            height: 200px;
          }

          .cardContent {
            padding: 20px;
          }

          .price {
            font-size: 1.3rem;
          }

          .propertyTitle {
            font-size: 1.1rem;
          }

          .address {
            font-size: 0.9rem;
          }

          .popularTag {
            font-size: 0.7rem;
            padding: 5px 10px;
          }

          .wishlistButton {
            width: 36px;
            height: 36px;
          }

          .heartIcon {
            font-size: 1.1rem;
          }
        }

        @media (max-width: 480px) {
          .propertyDetails {
            flex-direction: column;
            gap: 12px;
            align-items: stretch;
          }

          .detail {
            justify-content: flex-start;
            padding: 8px 0;
          }

          .divider {
            display: none;
          }

          .detailText {
            font-size: 0.9rem;
          }
        }
      `}</style>
      {/* Image Container */}
      <div className="imageContainer">
        <img
          src={property.image}
          alt={property.title}
          className="propertyImage"
        />

        {/* Popular Tag */}
        {property.popular && (
          <div className="popularTag">
            <span className="popularIcon">⭐</span>
            POPULAR
          </div>
        )}

        {/* Wishlist Heart */}
        <button className="wishlistButton" onClick={handleWishlistClick}>
          <span className="heartIcon">
            {isWishlisted ? (
              <FaHeart style={{ color: "#3A4999" }} />
            ) : (
              <FaRegHeart style={{ color: "#ccc" }} />
            )}
          </span>
        </button>
      </div>

      {/* Card Content */}
      <div className="cardContent">
        {/* Price */}
        <div className="price">
          {property.price}
          <span className="period">/month</span>
        </div>

        {/* Title */}
        <h3 className="propertyTitle">{property.title}</h3>

        {/* Address */}
        <p className="address">{property.location}</p>

        {/* Property Details */}
        <div className="propertyDetails">
          <div className="detail">
            <img src={Bed} alt="bed" />{" "}
            <span className="detailText">{property.beds} </span>
          </div>

          <div className="divider"></div>

          <div className="detail">
            <img src={Bath} alt="Bath" />
            <span className="detailText">{property.baths} </span>
          </div>

          <div className="divider"></div>

          <div className="detail">
            <img src={Square} alt="Square" />{" "}
            <span className="detailText">{property.size}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PropertyCard);
