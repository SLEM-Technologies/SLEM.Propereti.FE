import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../Styles/sidemenu.module.css";
import {
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
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: Dashboard, label: "Dashboard", type: "image", path: "/dashboard" },
    { icon: Porps, label: "Browse Properties", type: "image", path: "/browse-properties" },
    { icon: Briefcase, label: "My Portfolio", type: "icon", path: "/portfolio" },
    { icon: Wallet, label: "My Wallet", type: "icon", path: "/wallet" },
    { icon: Rss, label: "Newsfeed", type: "icon", path: "/newsfeed" },
    { icon: Bell, label: "Notifications", badge: "5", type: "icon", path: "/notifications" },
    { icon: HelpCircle, label: "Support", type: "icon", path: "/support" },
    { icon: Settings, label: "Settings", type: "icon", path: "/settings" },
  ];

  const helpIndex = menuItems.length; // index for Help & Support
  const [activeIndex, setActiveIndex] = useState(null);

  // Set active menu based on current URL
  useEffect(() => {
    const foundIndex = menuItems.findIndex((item) => item.path === location.pathname);
    if (foundIndex !== -1) {
      setActiveIndex(foundIndex);
    } else if (location.pathname === "/help-support") {
      setActiveIndex(helpIndex);
    }
  }, [location.pathname]);

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
                onClick={() => navigate(item.path)}
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
                <div className={styles.sideBar}></div>
                {item.badge && <span className={styles.badge}>{item.badge}</span>}
              </div>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className={styles.bottomSection}>
          {/* Help & Support */}
          <div
            className={`${styles.menuItem} ${activeIndex === helpIndex ? styles.active : ""}`}
            onClick={() => navigate("/help-support")}
          >
            <HelpCircle
              className={`${styles.menuIcon} ${activeIndex === helpIndex ? styles.activeIcon : ""}`}
              size={20}
            />
            <span className={styles.menuLabel}>Help & Support</span>
            <div className={styles.sideBar}></div>
          </div>

          {/* Logout */}
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
