import React, { useState } from "react";
import styles from "../Styles/sidemenu.module.css";
import {
  Search,
  Briefcase,
  Wallet,
  Rss,
  Bell,
  HelpCircle,
  Settings,
  LogOut,
} from "lucide-react";

import Pfp from "../assets/icons/Profile Image.svg";
import Dashboard from "../assets/icons/Dashboard.svg";
import Porps from "../assets/icons/Props.svg";

const Sidemenu = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const menuItems = [
    { icon: Dashboard, label: "Dashboard", type: "image" },
    { icon: Porps, label: "Browse Properties", type: "image" },
    { icon: Briefcase, label: "My Portfolio", type: "icon" },
    { icon: Wallet, label: "My Wallet", type: "icon" },
    { icon: Rss, label: "Newsfeed", type: "icon" },
    { icon: Bell, label: "Notifications", badge: "5", type: "icon" },
    { icon: HelpCircle, label: "Support", type: "icon" },
    { icon: Settings, label: "Settings", type: "icon" },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.sidemenu}>
        {/* User Profile */}
        <div className={styles.userProfile}>
          <div className={styles.avatar}>
            <img src={Pfp} alt="Indica Watson" />
          </div>
          <h3 className={styles.userName}>Indica Watson</h3>
          <p className={styles.userTitle}>Real Estate Advisor</p>
        </div>

        {/* Navigation */}
        <nav className={styles.navigation}>
          {menuItems.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={index}
                className={`${styles.menuItem} ${isActive ? styles.active : ""}`}
                onClick={() => setActiveIndex(index)}
              >
                {item.type === "image" ? (
                  <img src={item.icon} className={styles.menuIcon} alt={item.label} />
                ) : (
                  <item.icon
                    className={`${styles.menuIcon} ${isActive ? styles.activeIcon : ""}`}
                    size={20}
                  />
                )}
                <span className={styles.menuLabel}>{item.label}</span>
                              <div className={styles.sideBar}></div> {/* for the left bar */}

                {item.badge && <span className={styles.badge}>{item.badge}</span>}
              </div>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className={styles.bottomSection}>
          <div className={styles.menuItem}>
            <HelpCircle className={styles.menuIcon} size={20} />
            <span className={styles.menuLabel}>Help & Support</span>
          </div>
          <div className={styles.logoutItem}>
            <LogOut className={styles.menuIcon} size={20} />
            <span className={styles.menuLabel}>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidemenu;
