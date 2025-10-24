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
  UserCog,
} from "lucide-react";

import Swal from "sweetalert2";
import { ThemedSwal } from "../utils/ThemedSwal";
import http from "../api/http";
import { BASE_URL } from "../Components/API/API";
import Pfp from "../assets/icons/Profile Image.svg";

const AdSidemenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const menuItems = [
    { icon: LayoutDashboard, label: "Admin Panel", path: "/admin-properties" },
    { icon: BarChart3, label: "Overview", path: "/overview" },
    { icon: Briefcase, label: "Manage Properties", path: "/properties-rt" },
    {
      icon: Users,
      label: "Customers",
      path: "/properties-customer", // 👥 list of customers
    },
    {
      icon: UserCog,
      label: "Customer Management",
      path: "/dashboard", // ⚙️ customer page / admin management
    },
    { icon: Bell, label: "Notifications", badge: "5", path: "/notifications" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const helpIndex = menuItems.length;
  const [activeIndex, setActiveIndex] = useState(null);

  // ✅ Decode JWT function
  const decodeToken = (token) => {
    try {
      const payloadBase64 = token.split(".")[1];
      const decoded = JSON.parse(atob(payloadBase64));
      return decoded;
    } catch (err) {
      console.error("Invalid token format:", err);
      return null;
    }
  };

  // ✅ Load user & token on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    if (storedToken) {
      setToken(storedToken);
      const decodedUser = decodeToken(storedToken);

      if (decodedUser) {
        const userData = {
          username: decodedUser.unique_name || "Admin User",
          email: decodedUser.email || "admin@domain.com",
          role: decodedUser.Role || "CompanyAdministrator",
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      }
    } else {
      // fallback
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Track active route
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

  // ✅ Handle Logout
  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refresh_token");

    ThemedSwal({
      title: "Are you sure?",
      text: "You’ll be logged out of the admin panel.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log out",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          if (refreshToken) {
            await http.post(`${BASE_URL}/api/v1/auth/logout`, { refreshToken });
          }

          // Clear stored data
          localStorage.removeItem("user");
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          setUser(null);
          setToken(null);

          ThemedSwal({
            icon: "success",
            title: "Logged Out",
            text: "Admin has been successfully logged out.",
            timer: 1500,
            showConfirmButton: false,
          });

          navigate("/login");
        } catch (error) {
          console.error("Logout error:", error);
          ThemedSwal({
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

  // === Reusable Sidebar Content ===
  const renderMenu = () => (
    <>
      {/* === User Profile === */}
      <div className={styles.userProfile}>
        <div className={styles.avatar}>
          <img src={Pfp} alt="Admin Profile" />
        </div>
        <h3 className={styles.userName}>
          {user ? user.username : "Admin User"}
        </h3>
        <p className={styles.userTitle}>
          {user?.email || "No email available"}
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
              <item.icon
                className={`${styles.menuIcon} ${
                  isActive ? styles.activeIcon : ""
                }`}
                size={20}
              />
              <span className={styles.menuLabel}>{item.label}</span>
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

export default AdSidemenu;
