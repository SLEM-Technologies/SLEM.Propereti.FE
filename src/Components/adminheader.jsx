import React from 'react';
import styles from "../Styles/header.module.css";
import { Search, Bell, ChevronDown, Users } from 'lucide-react';

const Header = () => {
  return (
    <div className={styles.header_main}>
    <header className={styles.header1}>
      {/* Search Section */}
      <div className={styles.searchSection}>
        <div className={styles.searchContainer}>
          <Search className={styles.searchIcon} size={20} />
          <input 
            type="text" 
            placeholder="" 
            className={styles.searchInput1}
          />
        </div>
      </div>

      {/* Right Section */}
      <div className={styles.rightSection}>
        {/* Notification Bell */}
        <div className={styles.notificationContainer}>
          <Bell className={styles.notificationIcon1} size={20} />
          <span className={styles.notificationBadge}></span>
        </div>

        {/* User Dropdown */}
        <div className={styles.userDropdown}>
          <Users className={styles.userIcon1} size={20} />
          <span className={styles.userName}>John Doe</span>
          <ChevronDown className={styles.dropdownIcon1} size={16} />
        </div>
      </div>
    </header>
    </div>
  );
};

export default Header;

