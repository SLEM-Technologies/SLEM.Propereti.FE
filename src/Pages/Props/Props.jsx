import React, { useState } from "react";
import Adheader from "../../Components/adminheader.jsx";
import Adsidebar from "../../Components/adminsidebar.jsx";
import styles from "./Props.module.css";

const AdBrowseprop = () => {
  const [activeTab, setActiveTab] = useState("companies");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Example data
  const customers = [
    {
      id: 1,
      manager: "AdaObi",
      name: "Rendevous Group Of Company",
      nationality: "Afolayan Rendevous",
      email: "Afolayan Rendevous",
      phone: "654324567",
    },
    ...Array.from({ length: 9 }, (_, i) => ({
      id: i + 2,
      manager: "Text",
      name: "Text",
      nationality: "Text",
      email: "Text",
      phone: "Text",
    })),
  ];
  const pageSize = 10;
  const totalPages = Math.ceil(customers.length / pageSize);
  const paginated = customers.slice((page - 1) * pageSize, page * pageSize);
  const [filterOpen, setFilterOpen] = useState(false);

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };
  return (
    <div className={styles.dashboardContainer}>
      <Adsidebar />
      <Adheader />
      <div className={styles.dashboard}>
        <h3 className={styles.overview}>Overview</h3>
        <div className={styles.tabContainer}>
          <div
            className={`${styles.tab} ${
              activeTab === "companies" ? styles.activeTab : ""
            }`}
            onClick={() => handleTabClick("companies")}
          >
            Companies
          </div>
          <div
            className={`${styles.tab} ${
              activeTab === "individuals" ? styles.activeTab : ""
            }`}
            onClick={() => handleTabClick("individuals")}
          >
            Individuals
          </div>
          <div
            className={styles.underline}
            style={{
              left: activeTab === "companies" ? "0" : "50%",
              transform:
                activeTab === "companies"
                  ? "translateX(0)"
                  : "translateX(-50%)",
            }}
          />
        </div>

         <div className={styles.container}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Search"
            className={styles.searchInput}
          />
        </div>
        <button className={styles.newCustomer}>New Customer</button>
        <div className={styles.filterWrapper}>
          <button onClick={toggleFilter} className={styles.filterButton}>
            Filter ▾
          </button>
          {filterOpen && (
            <div className={styles.filterDropdown}>
              <label>
                <input type="checkbox" /> By Name
              </label>
              <label>
                <input type="checkbox" /> By Nationality
              </label>
              <label>
                <input type="checkbox" /> By Relationship Manager
              </label>
              <label>
                <input type="checkbox" /> By Email
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>No.</th>
            <th>Relationship Manager</th>
            <th>Full Name</th>
            <th>Nationality</th>
            <th>Email</th>
            <th>Phone No.</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {[...Array(9)].map((_, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>Text</td>
              <td>Text</td>
              <td>Text</td>
              <td>Text</td>
              <td>Text</td>
              <td className={styles.view}>View</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className={styles.pagination}>
        <span>Showing rows 1 to 2 of 2</span>
        <div>
          <button className={styles.pageBtn}>‹ Previous</button>
          <button className={styles.pageBtnActive}>1</button>
          <button className={styles.pageBtn}>Next ›</button>
        </div>
      </div>
    </div>
      </div>
    </div>
  );
};

export default AdBrowseprop;
