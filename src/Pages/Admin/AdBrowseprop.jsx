import React from "react";
import Adheader from "../../Components/adminheader.jsx";
import Adsidebar from "../../Components/adminsidebar.jsx";
import styles from "./Adminbrowseprops.module.css";
import Totalprops from "../../assets/icons/totalprops.svg";
import Totalagents from "../../assets/icons/total agents.svg";
import Totalsales from "../../assets/icons/totalsales.svg";
import Totalprops2 from "../../assets/icons/totalps.svg";
import ChartComp from "../../Components/Charts.jsx";
import { ChevronDown } from "lucide-react";
import sort from "../../assets/icons/Sort Ascending.svg";

const AdBrowseprop = () => {
  const users = [
    {
      name: "Aurora Oladipupo",
      role: "Agents",
      status: "Pending",
      date: "2023-06-24 07:02:48",
    },
    {
      name: "Aurora Oladipupo",
      role: "Operations",
      status: "Active",
      date: "2023-06-24 07:02:48",
    },
    {
      name: "Aurora Oladipupo",
      role: "Operations",
      status: "Active",
      date: "2023-06-24 07:02:48",
    },
    {
      name: "Aurora Oladipupo",
      role: "Operations",
      status: "Active",
      date: "2023-06-24 07:02:48",
    },
    {
      name: "Aurora Oladipupo",
      role: "Operations",
      status: "Inactive",
      date: "2023-06-24 07:02:48",
    },
  ];

  return (
    <div className={styles.dashboardContainer}>
      <Adsidebar />
      <Adheader />
      <div className={styles.dashboard}>
        <h3 className={styles.overview}>Overview</h3>

        {/* CARDS SECTION */}
        <div className={styles.cardsContainer}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span>Total Properties</span>
              <img
                className={styles.imgtin}
                src={Totalprops}
                alt="total properties"
              />
            </div>
            <p className={styles.bigNumber}>40,689</p>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span>Total Agents</span>
              <img
                className={styles.imgtin}
                src={Totalagents}
                alt="total agents"
              />
            </div>
            <p className={styles.bigNumber}>10,293</p>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span>Total Sales</span>
              <img
                className={styles.imgtin}
                src={Totalsales}
                alt="total sales"
              />
            </div>
            <p className={styles.bigNumber}>$89,000</p>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span>Total Properties</span>
              <img
                className={styles.imgtin}
                src={Totalprops2}
                alt="total props 2"
              />
            </div>
            <p className={styles.bigNumber}>2,040</p>
          </div>
        </div>
        <ChartComp />

        <h2 className={styles.newacc}>New Accounts</h2>
        <div className={styles.tableContainer}>
          <table className={styles.userTable}>
            <thead>
              <tr>
                <th className={styles.headerCell}>FULL NAME</th>
                <th className={styles.headerCell}>
                  ROLE{" "}
                  <span className={styles.sortIcon}>
                    <img src={sort} alt="" />
                  </span>
                </th>
                <th className={styles.headerCell}>STATUS</th>
                <th className={styles.headerCell}>DATE JOINED</th>
                <th className={styles.headerCell}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className={styles.tableRow}>
                  <td className={styles.tableCell}>{user.name}</td>
                  <td className={styles.tableCell}>{user.role}</td>
                  <td className={styles.tableCell}>
                    <span
                      className={`${styles.statusBadge} ${
                        user.status === "Pending"
                          ? styles.pending
                          : user.status === "Active"
                          ? styles.active
                          : styles.inactive
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className={styles.tableCell}>{user.date}</td>
                  <td className={styles.tableCell}>
                    <span className={styles.dropdownIcon}>
                      {" "}
                      <ChevronDown className={styles.dropdownIcon1} size={16} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdBrowseprop;
