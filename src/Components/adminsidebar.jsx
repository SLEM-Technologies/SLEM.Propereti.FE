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
  Menu,
  X,
} from "lucide-react";

import Pfp from "../assets/icons/Profile Image.svg";

const AdSidemenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: "Admin Panel", type: "icon", path: "/admin-properties" },
    { icon: BarChart3, label: "Overview", type: "icon", path: "/overview" },
    { icon: Briefcase, label: "Properties", type: "icon", path: "/properties-rt" },
    { icon: Users, label: "Customers", type: "icon", path: "/properties-customer" },
    { icon: Bell, label: "Notifications", badge: "5", type: "icon", path: "/notifications" },
    { icon: Settings, label: "Settings", type: "icon", path: "/settings" },
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
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
      useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("access_token");
        if (storedUser) setUser(JSON.parse(storedUser));
        if (storedToken) setToken(storedToken);
      }, []);

  // === reusable sidebar content ===
  const renderMenu = () => (
    <>
      {/* User Profile */}
      <div className={styles.userProfile}>
        <div className={styles.avatar}>
          <img src={Pfp} alt="Admin Profile" />
        </div>
 <h3 className={styles.userName}>
          {user
            ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
            : "Admin User"}
        </h3>
        <p className={styles.userTitle}>
          {user?.email || (token ? "Admin" : "Not Logged In")}
        </p>
      </div>

      {/* Navigation */}
      <nav className={styles.navigation}>
        {menuItems.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <div
              key={index}
              className={`${styles.menuItem} ${isActive ? styles.active : ""}`}
              onClick={() => {
                navigate(item.path);
                setIsMobileOpen(false);
              }}
            >
              {item.type === "icon" ? (
                <item.icon
                  className={`${styles.menuIcon} ${isActive ? styles.activeIcon : ""}`}
                  size={20}
                />
              ) : (
                <img src={item.icon} className={styles.menuIcon} alt={item.label} />
              )}
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
          onClick={() => {
            navigate("/help-support");
            setIsMobileOpen(false);
          }}
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
    </>
  );

  return (
    <>
      {/* === Desktop Sidebar === */}
      <div className={`${styles.wrapper} ${styles.desktopOnly}`}>
        <div className={styles.sidemenu}>{renderMenu()}</div>
      </div>

      {/* === Mobile Menu Button === */}
      <button
        className={styles.mobileMenuButton}
        onClick={() => setIsMobileOpen(true)}
      >
        <Menu size={28} color="#fff" />
      </button>

      {/* === Mobile Overlay === */}
      <div
        className={`${styles.mobileOverlay} ${isMobileOpen ? styles.show : ""}`}
        onClick={() => setIsMobileOpen(false)}
      ></div>

      {/* === Mobile Sidebar === */}
      <div
        className={`${styles.mobileSidebar} ${
          isMobileOpen ? styles.slideIn : styles.slideOut
        }`}
      >
        <button
          className={styles.closeButton}
          onClick={() => setIsMobileOpen(false)}
        >
          <X size={24} color="#fff" />
        </button>
        <div className={styles.sidemenu}>{renderMenu()}</div>
      </div>
    </>
  );
};

export default AdSidemenu;
