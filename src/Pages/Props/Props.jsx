import React, { useState } from "react";
import Adheader from "../../Components/adminheader.jsx";
import Adsidebar from "../../Components/adminsidebar.jsx";
import styles from "./Props.module.css";
import { Search, Filter, MoreVertical } from "lucide-react";

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
  const [showFilter, setShowFilter] = useState(false);

  const toggleFilter = () => setShowFilter((prev) => !prev);

  //   const toggleFilter = () => {
  //     setFilterOpen(!filterOpen);
  //   };
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

        <div className={styles.topBar1}>
          <h4>All</h4>
          <div className={styles.topBar}>
            {/* Search */}
            <div className={styles.searchWrapper}>
              <Search className={styles.searchIcon} size={16} />
              <input
                type="text"
                placeholder="Search"
                className={styles.searchInput}
              />
            </div>

            {/* Buttons */}
            <button className={styles.newCustomer}>New Customer</button>

            <div className={styles.filterWrapper}>
              <button className={styles.filterBtn} onClick={toggleFilter}>
                Filter
                <Filter size={16} className={styles.filterIcon} />
              </button>

              {showFilter && (
                <div className={styles.filterDropdown}>
                  <label>
                    <input type="checkbox" /> Nationality
                  </label>
                  <label>
                    <input type="checkbox" /> Relationship Manager
                  </label>
                  <label>
                    <input type="checkbox" /> Email Verified
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.container}>
          {/* Top Bar */}

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
              {[...Array(10)].map((_, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{i === 0 ? "AdaObi" : "Text"}</td>
                  <td>{i === 0 ? "Rendevous Group Of Company" : "Text"}</td>
                  <td>{i === 0 ? "Afolayan Rendevous" : "Text"}</td>
                  <td>{i === 0 ? "Afolayan Rendevous" : "Text"}</td>
                  <td>{i === 0 ? "654324567" : "Text"}</td>
                  <td className={styles.actions}>
                    <a href="#">View</a>
                    <MoreVertical size={16} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className={styles.pagination}>
            <span>Showing rows 1 to 2 of 2</span>
            <div className={styles.pageNav}>
              <button>&lt; Previous</button>
              <span>1</span>
              <button>Next &gt;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdBrowseprop;
