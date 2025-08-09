import React from "react";
import Sidemenu from "../Components/Sidebar.jsx";
import Header from "../Components/Header.jsx";
import styles from "../Styles/dashboard.module.css";
import { Wallet, TrendingUp, MoreHorizontal } from "lucide-react";
import Wally from "../assets/icons/wally.svg";
import Port from "../assets/icons/Port.svg";
import HelpSupport1 from "./HelpSupport/HelpSupport1.jsx";

const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <Sidemenu />
      <Header />
      <div className={styles.dashboard}>
        <HelpSupport1 />
      </div>
    </div>
  );
};

export default Dashboard;
