import React, { useState, useEffect } from "react";
import { MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./UserTable.module.css";

const UserTable2 = () => {
  // Dummy users (7 total, no avatar this time)
  const users = [
    {
      id: 1,
      userId: "RL-123456789",
      name: "Admin",
      email: "07",
      role: "View & Edit",
    },
    {
      id: 2,
      userId: "RL-123456789",
      name: "Internal Agent",
      email: "10",
      role: "View & Edit ",
    },
    {
      id: 3,
      userId: "RL-123456789",
      name: "Super Admin",
      email: "11",
      role: "View & Edit ",
    },
    {
      id: 4,
      userId: "RL-123456789",
      name: "Super Admin",
      email: "09",
      role: "View & Edit ",
    },
    {
      id: 5,
      userId: "RL-123456789",
      name: "Super Admin",
      email: "11",
      role: "View & Edit ",
    },
    {
      id: 6,
      userId: "RL-123456789",
      name: "Super Admin",
      email: "10",
      role: "View & Edit",
    },
    {
      id: 7,
      userId: "RL-123456789",
      name: "Admin",
      email: "20",
      role: "View & Edit ",
    },
  ];

  const [selected, setSelected] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  // Reset page if data changes
  useEffect(() => {
    const maxPage = Math.ceil(users.length / usersPerPage) || 1;
    if (currentPage > maxPage) {
      setCurrentPage(1);
    }
  }, [users, currentPage]);

  // Pagination slice
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = users.slice(startIndex, startIndex + usersPerPage);

  // Select logic
  const isAllSelected =
    selected.length === paginatedUsers.length && paginatedUsers.length > 0;
  const isIndeterminate =
    selected.length > 0 && selected.length < paginatedUsers.length;

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelected(paginatedUsers.map((u) => u.id));
    } else {
      setSelected([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  return (
    <div className={styles.tableWrapper}>
      {/* Table */}
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <th className={styles.th}>
              <input
                type="checkbox"
                checked={isAllSelected}
                ref={(el) => el && (el.indeterminate = isIndeterminate)}
                onChange={handleSelectAll}
              />
            </th>
            <th className={styles.th}>Role ID</th>
            <th className={styles.th}>Title</th>
            <th className={styles.th}>Team Members</th>
            <th className={styles.th}>Access</th>
            <th className={styles.th}></th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user) => (
            <tr key={user.id} className={styles.row}>
              <td className={styles.td}>
                <input
                  type="checkbox"
                  checked={selected.includes(user.id)}
                  onChange={() => handleSelectOne(user.id)}
                />
              </td>
              <td className={styles.td}>{user.userId}</td>
              <td className={styles.td}>{user.name}</td>
              <td className={styles.td}>{user.email}</td>
              <td className={styles.td}>{user.role}</td>
              <td className={styles.td}>
                <button
                  className={styles.actionBtn}
                  aria-label={`More actions for ${user.name}`}
                >
                  <MoreVertical size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className={styles.pageBtn}
        >
          <ChevronLeft size={16} /> Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(users.length / usersPerPage) || 1}
        </span>
        <button
          disabled={currentPage === Math.ceil(users.length / usersPerPage)}
          onClick={() => setCurrentPage((p) => p + 1)}
          className={styles.pageBtn}
        >
          Next <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default UserTable2;
