import React, { useState, useEffect } from "react";
import styles from "../Styles/header.module.css";
import { Search, Bell, ChevronDown, Users } from "lucide-react";

const AdminHeader = () => {
  const [user, setUser] = useState(null);

  // ✅ Load admin user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Get initials if you want to use a circle instead of icon
  const getInitials = () => {
    if (!user) return "A";
    const first = user.firstName?.[0] || "";
    const last = user.lastName?.[0] || "";
    return (first + last).toUpperCase() || "A";
  };

  return (
    <div className={styles.header_main}>
      <header className={styles.header1}>
        {/* === Search Section === */}
        <div className={styles.searchSection}>
          <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} size={20} />
            <input
              type="text"
              placeholder="Search..."
              className={styles.searchInput1}
            />
          </div>
        </div>

        {/* === Right Section === */}
        <div className={styles.rightSection}>
          {/* Notification Bell */}
          <div className={styles.notificationContainer}>
            <Bell className={styles.notificationIcon1} size={20} />
            <span className={styles.notificationBadge}></span>
          </div>

          {/* === Admin Dropdown === */}
          <div className={styles.userDropdown}>
            {/* Option 1: Use icon */}
            <div className={styles.userIconWrapper}>
              <Users className={styles.userIcon1} size={20} />
            </div>

            {/* Option 2: Or show initials */}
            {/* 
            <div className={styles.initialsCircle}>{getInitials()}</div>
            */}

            <span className={styles.userName}>
              {user
                ? `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
                  user.email ||
                  "Admin User"
                : "Admin User"}
            </span>
            <ChevronDown className={styles.dropdownIcon1} size={16} />
          </div>
        </div>
      </header>
    </div>
  );
};

export default AdminHeader;
