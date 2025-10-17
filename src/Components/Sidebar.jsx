import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../Styles/sidemenu.module.css";
import Swal from "sweetalert2";
import http from "../api/http"; // same http instance used in login
import { BASE_URL } from "../Components/API/API";

import {
  Briefcase,
  Wallet,
  Rss,
  Bell,
  HelpCircle,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import Pfp from "../assets/icons/Profile Image.svg";
import Dashboard from "../assets/icons/Dashboard.svg";
import Porps from "../assets/icons/Props.svg";

const Sidemenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // ✅ Fetch user + token from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("access_token");
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedToken) setToken(storedToken);
  }, []);

  const menuItems = [
    { icon: Dashboard, label: "Dashboard", type: "image", path: "/dashboard" },
    {
      icon: Porps,
      label: "Browse Properties",
      type: "image",
      path: "/browse-properties",
    },
    {
      icon: Briefcase,
      label: "My Portfolio",
      type: "icon",
      path: "/portfolio",
    },
    { icon: Wallet, label: "My Wallet", type: "icon", path: "/wallet" },
    { icon: Rss, label: "Newsfeed", type: "icon", path: "/newsfeed" },
    {
      icon: Bell,
      label: "Notifications",
      badge: "5",
      type: "icon",
      path: "/notifications",
    },
    { icon: HelpCircle, label: "Support", type: "icon", path: "/support" },
    { icon: Settings, label: "Settings", type: "icon", path: "/settings" },
  ];

  const helpIndex = menuItems.length;
  const [activeIndex, setActiveIndex] = useState(null);

  // ✅ Set active menu
  useEffect(() => {
    const foundIndex = menuItems.findIndex(
      (item) => item.path === location.pathname
    );
    if (foundIndex !== -1) {
      setActiveIndex(foundIndex);
    } else if (location.pathname === "/help-support") {
      setActiveIndex(helpIndex);
    }
  }, [location.pathname]);

  // ✅ Handle logout
  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refresh_token");

    Swal.fire({
      title: "Are you sure?",
      text: "You’ll be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Call logout endpoint if refresh token exists
          if (refreshToken) {
            await http.post(`${BASE_URL}/api/v1/auth/logout`, {
              refreshToken,
            });
          }

          // Clear user data
          localStorage.removeItem("user");
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          setUser(null);
          setToken(null);

          Swal.fire({
            icon: "success",
            title: "Logged Out",
            text: "You’ve been successfully logged out.",
            timer: 1500,
            showConfirmButton: false,
          });

          navigate("/login");
        } catch (error) {
          console.error("Logout error:", error);
          Swal.fire({
            icon: "error",
            title: "Logout Failed",
            text:
              error?.response?.data?.message ||
              "Something went wrong while logging out.",
          });
        }
      }
    });
  };

  // ✅ Reusable sidebar content
  const renderMenu = () => (
    <>
      {/* === User Profile === */}
      <div className={styles.userProfile}>
        <div className={styles.avatar}>
          <img src={Pfp} alt={user?.firstName || "User"} />
        </div>
        <h3 className={styles.userName}>
          {user
            ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
            : "Guest User"}
        </h3>
        <p className={styles.userTitle}>
          {user?.email || (token ? "Member" : "Not Logged In")}
        </p>
      </div>

      {/* === Navigation === */}
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
              {item.type === "image" ? (
                <img
                  src={item.icon}
                  className={styles.menuIcon}
                  alt={item.label}
                />
              ) : (
                <item.icon
                  className={`${styles.menuIcon} ${
                    isActive ? styles.activeIcon : ""
                  }`}
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

      {/* === Bottom Section === */}
      <div className={styles.bottomSection}>
        {/* Help & Support */}
        <div
          className={`${styles.menuItem} ${
            activeIndex === helpIndex ? styles.active : ""
          }`}
          onClick={() => {
            navigate("/help-support");
            setIsMobileOpen(false);
          }}
        >
          <HelpCircle
            className={`${styles.menuIcon} ${
              activeIndex === helpIndex ? styles.activeIcon : ""
            }`}
            size={20}
          />
          <span className={styles.menuLabel}>Help & Support</span>
          <div className={styles.sideBar}></div>
        </div>

        {/* Logout */}
        <div className={styles.logoutItem} onClick={handleLogout}>
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

export default Sidemenu;
