import React, { useState } from "react";
import Adheader from "../../Components/adminheader.jsx";
import Adsidebar from "../../Components/adminsidebar.jsx";
import styles from "./Overview.module.css";
import { NavLink } from "react-router-dom";
import Card1 from "../../assets/icons/card1.svg";
import Card2 from "../../assets/icons/card2.svg";
import {
  Plus,
  Calendar,
  ChevronDown,
  ExternalLink,
  X,
  CheckCircle,
} from "lucide-react";
import Viewstable2 from "./ViewTable2.jsx";

// SlideOver component
const SlideOver = ({ open, onClose, children }) => {
  return (
    <div className={`${styles.overlay} ${open ? styles.show : ""}`}>
      <div className={styles.drawer}>
        <button onClick={onClose} className={styles.closeBtn}>
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  );
};

const Overview = () => {
  const [modal, setModal] = useState(null); // null | "add" | "edit" | "success"

  return (
    <div className={styles.dashboardContainer}>
      <Adsidebar />
      <Adheader />
      <div className={styles.dashboard}>
        <h3 className={styles.overview}>Overview</h3>

        {/* Cards */}
        <div className={styles.cardsContainer}>
          {/* Card 1 */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <img src={Card1} alt="members" className={styles.icon} />
              <span className={styles.title}>Total Members</span>
            </div>
            <div className={styles.cardBody}>
              <h2 className={styles.number}>10,000</h2>
              <button className={styles.btn} onClick={() => setModal("add")}>
                <span className={styles.plusCircle}>
                  <Plus size={14} />
                </span>
                New Role
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <img src={Card2} alt="roles" className={styles.icon} />
              <span className={styles.title}>Roles</span>
            </div>
            <div className={styles.cardBody}>
              <h2 className={styles.number}>20</h2>
              <button className={styles.btn} onClick={() => setModal("edit")}>
                <span className={styles.plusCircle}>
                  <Plus size={14} />
                </span>
                Edit Role
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <nav className={styles.tabsWrapper}>
          <div className={styles.tabsLeft}>
            <NavLink
              to="/overview/team"
              className={({ isActive }) =>
                `${styles.tabsLink} ${isActive ? styles.tabsLinkActive : ""}`
              }
            >
              Team Members
            </NavLink>

            <NavLink
              to="/overview/roles"
              className={({ isActive }) =>
                `${styles.tabsLink} ${isActive ? styles.tabsLinkActive : ""}`
              }
            >
              Roles
            </NavLink>
          </div>

          <div className={styles.tabsRight}>
            <button className={styles.tabsGhostBtn}>
              <Calendar size={16} className={styles.tabsIcon} />
              <span>Selected dates</span>
            </button>

            <button className={styles.tabsGhostBtn}>
              <span>Status</span>
              <ChevronDown size={16} className={styles.tabsIcon} />
            </button>

            <button className={styles.tabsPrimaryBtn}>
              <ExternalLink size={16} className={styles.tabsIcon} />
              <span>Export</span>
            </button>
          </div>
        </nav>

        <Viewstable2 />
      </div>

      {/* Slide-in Modals */}

      {/* Create Role */}
      <SlideOver open={modal === "add"} onClose={() => setModal(null)}>
        <h3>Create Role</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setModal("success");
          }}
          className={styles.form}
        >
          <label>Role Name</label>
          <input type="text" required placeholder="Enter role name" />

          <label>Choose Features</label>
          <div className={styles.checkboxGroup}>
            <label>
              <input type="checkbox" /> Projects
            </label>
            <label>
              <input type="checkbox" /> Reports
            </label>
            <label>
              <input type="checkbox" /> People
            </label>
            <label>
              <input type="checkbox" /> Transactions
            </label>
          </div>

          <label>Access Type</label>
          <select required>
            <option value="">Select Access</option>
            <option>Everyone</option>
            <option>Only Me</option>
            <option>Custom</option>
          </select>

          <button type="submit" className={styles.primaryBtn}>
            Add Role
          </button>
        </form>
      </SlideOver>

      {/* Edit Role */}
      <SlideOver open={modal === "edit"} onClose={() => setModal(null)}>
        <h3>Edit Role</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setModal("success");
          }}
          className={styles.form}
        >
          <label>Role Name</label>
          <input type="text" defaultValue="Super Admin" />

          <label>Choose Features</label>
          <div className={styles.checkboxGroup}>
            <label>
              <input type="checkbox" defaultChecked /> Projects
            </label>
            <label>
              <input type="checkbox" /> Reports
            </label>
            <label>
              <input type="checkbox" defaultChecked /> People
            </label>
            <label>
              <input type="checkbox" /> Transactions
            </label>
          </div>

          <label>Access Type</label>
          <select defaultValue="Everyone">
            <option>Everyone</option>
            <option>Only Me</option>
            <option>Custom</option>
          </select>

          <button type="submit" className={styles.primaryBtn}>
            Save Changes
          </button>
        </form>
      </SlideOver>

      {/* Success Card */}
      <SlideOver open={modal === "success"} onClose={() => setModal(null)}>
        <div className={styles.successCard}>
          <CheckCircle size={48} color="green" />
          <h3>Role Created</h3>
          <p>Lorem ipsum dolor sit amet consectetur.</p>
          <button className={styles.primaryBtn} onClick={() => setModal(null)}>
            Continue
          </button>
        </div>
      </SlideOver>
    </div>
  );
};

export default Overview;
