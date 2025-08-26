import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../Styles/sidemenu.module.css";
import {
  LayoutDashboard,
  BarChart3,
  Briefcase,
  Users,
  Bell,
  HelpCircle,
  Settings,
  LogOut,
} from "lucide-react";

import Pfp from "../assets/icons/Profile Image.svg";

const Sidemenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: "Admin Panel", path: "/admin-properties" },
    { icon: BarChart3, label: "Overview", path: "/overview" },
    { icon: Briefcase, label: "Properties", path: "/properties-admin" },
    { icon: Users, label: "Customers", path: "/customers" },
    { icon: Bell, label: "Notifications", badge: "5", path: "/notifications" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const helpIndex = menuItems.length;
  const [activeIndex, setActiveIndex] = useState(null);

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
            <img src={Pfp} alt="Admin Profile" />
          </div>
          <h3 className={styles.userName}>Indica Watson</h3>
          <p className={styles.userTitle}>Admin</p>
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
                <item.icon
                  className={`${styles.menuIcon} ${isActive ? styles.activeIcon : ""}`}
                  size={20}
                />
                <span className={styles.menuLabel}>{item.label}</span>
                <div className={styles.sideBar}></div>
                {item.badge && <span className={styles.badge}>{item.badge}</span>}
              </div>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className={styles.bottomSection}>
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
