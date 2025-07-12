// PropertyListings.jsx
import React, { useState } from 'react';
import styles from '../Styles/PropertyListings.module.css';
import { FaSearch, FaHeart, FaBed, FaBath } from 'react-icons/fa';

import img1 from '../assets/images/house-card1.jpg';
import img2 from '../assets/images/house-card2.jpg';
import img3 from '../assets/images/house-card3.png';
import img4 from '../assets/images/house-card4.png';
import img5 from '../assets/images/house-card5.png';
import img6 from '../assets/images/house-card6.png';

const properties = [
  {
    id: 1,
    title: 'Palm Harbor',
    price: '$2,095',
    location: '2699 Green Valley, Highland Lake, FL',
    beds: 3,
    baths: 2,
    size: '5×7 m²',
    image: img1,
    popular: true,
  },
  {
    id: 2,
    title: 'Beverly Springfield',
    price: '$2,700',
    location: '2821 Lake Sevilla, Palm Harbor, TX',
    beds: 4,
    baths: 2,
    size: '6.7×5 m²',
    image: img2,
    popular: true,
  },
  {
    id: 3,
    title: 'Faulkner Ave',
    price: '$4,550',
    location: '909 Woodland St, Michigan, IN',
    beds: 4,
    baths: 3,
    size: '8×10 m²',
    image: img3,
    popular: true,
  },
  {
    id: 4,
    title: 'St. Crystal',
    price: '$2,400',
    location: '210 US Highway, Highland Lake, FL',
    beds: 4,
    baths: 2,
    size: '6×8 m²',
    image: img4,
    popular: false,
  },
  {
    id: 5,
    title: 'Cove Red',
    price: '$1,500',
    location: '243 Curlew Road, Palm Harbor, TX',
    beds: 2,
    baths: 1,
    size: '5×7.5 m²',
    image: img5,
    popular: false,
  },
  {
    id: 6,
    title: 'Tarpon Bay',
    price: '$1,600',
    location: '103 Lake Shores, Michigan, IN',
    beds: 3,
    baths: 1,
    size: '5×7 m²',
    image: img6,
    popular: false,
  },
];

const PropertyListings = () => {
  const [activeTab, setActiveTab] = useState('Buy');
  const [search, setSearch] = useState('');

  const filteredProperties = properties.filter(
    (p) => p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2>Based on your location</h2>
        <p>Some of our picked properties near you location.</p>
        <div className={styles.controls}>
          <div className={styles.tabs}>
            {['Buy', 'Sell', 'Resell'].map((tab) => (
              <button
                key={tab}
                className={activeTab === tab ? styles.activeTab : ''}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className={styles.searchBox}>
            <FaSearch />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        {filteredProperties.map((p) => (
          <div key={p.id} className={styles.card}>
            <img src={p.image} alt={p.title} />
            <div className={styles.info}>
              {p.popular && <span className={styles.badge}>POPULAR</span>}
              <h3>{p.price} <span>/month</span></h3>
              <h4>{p.title}</h4>
              <p>{p.location}</p>
              <div className={styles.features}>
                <span><FaBed /> {p.beds} Beds</span>
                <span><FaBath /> {p.baths} Bathrooms</span>
                <span>{p.size}</span>
              </div>
            </div>
            <FaHeart className={styles.heartIcon} />
          </div>
        ))}
      </div>

      <div className={styles.btnContainer}>
        <button className={styles.moreBtn}>Browse more properties</button>
      </div>
    </section>
  );
};

export default PropertyListings;
