import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./PaymentPlan.module.css";
import onetime from "../../assets/icons/one-time.svg";
import insta from "../../assets/icons/installmentall.svg";


const PaymentOptions = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={styles.options_nee}>
      <div className={styles.options}>
        <div
          className={`${styles.card} ${
            location.pathname === "/browse-properties/one-time"
              ? styles.active
              : ""
          }`}
          onClick={() => navigate("/browse-properties/one-time")}
        >
          <span className={styles.icon}>
            <img src={onetime} alt="" />
          </span>
          <h3 className={styles.morhead}> One-Time Payment</h3>
          <p className={styles.morhead_p}>
            Charge users a one-time payment fee to access the content
          </p>
        </div>

        <div
          className={`${styles.card} ${
            location.pathname === "/browse-properties/installment"
              ? styles.active
              : ""
          }`}
          onClick={() => navigate("/browse-properties/installment")}
        >
          <span className={styles.icon}>
            <img src={insta} alt="" />
          </span>
          <h3 className={styles.morhead}>Installmental Payment</h3>
          <p className={styles.morhead_p}>
            Charge users a recurring payment fee to access the content
          </p>
        </div>
      </div>
      <div className={styles.whiteDivider}></div>

    </div>
  );
};

export default PaymentOptions;
