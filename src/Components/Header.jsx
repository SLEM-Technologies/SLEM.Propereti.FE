import React, { useState, useEffect } from "react";
import styles from "../Styles/header.module.css";
import { Search, Bell, ChevronDown, Users } from "lucide-react";

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Optional: derive initials (e.g., OD for Ola Defi)
  const getInitials = () => {
    if (!user) return "U";
    const first = user.firstName?.[0] || "";
    const last = user.lastName?.[0] || "";
    return (first + last).toUpperCase() || "U";
  };

  return (
    <div className={styles.header_main}>
      <header className={styles.header}>
        {/* === Search Section === */}
        <div className={styles.searchSection}>
          <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} size={20} />
            <input
              type="text"
              placeholder="Search..."
              className={styles.searchInput}
            />
          </div>
        </div>

        {/* === Right Section === */}
        <div className={styles.rightSection}>
          {/* Notification Bell */}
          <div className={styles.notificationContainer}>
            <Bell className={styles.notificationIcon} size={20} />
            <span className={styles.notificationBadge}></span>
          </div>

          {/* User Dropdown */}
          <div className={styles.userDropdown}>
            {/* You can replace this Users icon with initials if you want */}
            <div className={styles.userIconWrapper}>
              <Users className={styles.userIcon} size={20} />
              {/* OR show initials:
              <div className={styles.initialsCircle}>{getInitials()}</div> */}
            </div>

            <span className={styles.userName}>
              {user
                ? `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
                  user.email
                : "Guest User"}
            </span>
            <ChevronDown className={styles.dropdownIcon} size={16} />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
