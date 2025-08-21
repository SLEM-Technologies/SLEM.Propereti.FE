import React from "react";
import { useNavigate } from "react-router-dom";
import { User, Building2, MoreHorizontal } from "lucide-react";
import Swal from "sweetalert2";
import styles from "../Styles/registerOptions.module.css";

const RegisterOptions = () => {
  const navigate = useNavigate();

  const options = [
    {
      title: "Register as User",
      desc: "Create an individual account for personal use.",
      icon: <User size={40} />,
      action: () => navigate("/signup"),
    },
    {
      title: "Register as Company",
      desc: "Create a company profile along with an admin user.",
      icon: <Building2 size={40} />,
      action: () => navigate("/company-signup"),
    },
    {
      title: "Other",
      desc: "Another type of account (TBD).",
      icon: <MoreHorizontal size={40} />,
      action: () =>
        Swal.fire({
          title: "Coming Soon 🚀",
          text: "This feature will be available in a future update.",
          icon: "info",
          confirmButtonText: "Okay",
          background: "#2d2e36",
          color: "#fff",
          confirmButtonColor: "#60a5fa",
        }),
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Choose Registration Type</h1>
      <div className={styles.boxContainer}>
        {options.map((opt, i) => (
          <div key={i} className={styles.box} onClick={opt.action}>
            <div className={styles.icon}>{opt.icon}</div>
            <h2>{opt.title}</h2>
            <p>{opt.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegisterOptions;
