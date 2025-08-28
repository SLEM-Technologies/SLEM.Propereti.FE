import React, { useState, useEffect } from "react";
import { MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./UserTable.module.css";

const UserTable = () => {
  // Dummy users (7 total)
  const users = [
    {
      id: 1,
      userId: "U001",
      name: "Daniel Temiloluwa",
      email: "temmy@example.com",
      phone: "+2349012345678",
      role: "Admin",
      avatar: "https://i.pravatar.cc/40?img=1",
    },
    {
      id: 2,
      userId: "U002",
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "+2348098765432",
      role: "Editor",
      avatar: "https://i.pravatar.cc/40?img=2",
    },
    {
      id: 3,
      userId: "U003",
      name: "John Smith",
      email: "john@example.com",
      phone: "+2348055555555",
      role: "Viewer",
      avatar: "https://i.pravatar.cc/40?img=3",
    },
    {
      id: 4,
      userId: "U004",
      name: "Mary Johnson",
      email: "mary@example.com",
      phone: "+2347033333333",
      role: "Moderator",
      avatar: "https://i.pravatar.cc/40?img=4",
    },
    {
      id: 5,
      userId: "U005",
      name: "Michael Brown",
      email: "mike@example.com",
      phone: "+2347011111111",
      role: "Editor",
      avatar: "https://i.pravatar.cc/40?img=5",
    },
    {
      id: 6,
      userId: "U006",
      name: "Sarah Lee",
      email: "sarah@example.com",
      phone: "+2347066666666",
      role: "Admin",
      avatar: "https://i.pravatar.cc/40?img=6",
    },
    {
      id: 7,
      userId: "U007",
      name: "David Wilson",
      email: "david@example.com",
      phone: "+2347077777777",
      role: "Viewer",
      avatar: "https://i.pravatar.cc/40?img=7",
    },
  ];

  const [selected, setSelected] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  // Reset page if data changes and currentPage is invalid
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
            <th className={styles.th} scope="col">
              <input
                type="checkbox"
                checked={isAllSelected}
                ref={(el) => el && (el.indeterminate = isIndeterminate)}
                onChange={handleSelectAll}
              />
            </th>
            <th className={styles.th} scope="col">User ID</th>
            <th className={styles.th} scope="col">Full Name</th>
            <th className={styles.th} scope="col">Email</th>
            <th className={styles.th} scope="col">Phone number</th>
            <th className={styles.th} scope="col">Role</th>
            <th className={styles.th} scope="col"></th>
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
              <td className={`${styles.td} ${styles.userCell}`}>
                <img
                  src={user.avatar}
                  alt={`${user.name} avatar`}
                  className={styles.avatar}
                />
                {user.name}
              </td>
              <td className={styles.td}>{user.email}</td>
              <td className={styles.td}>{user.phone}</td>
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

export default UserTable;
