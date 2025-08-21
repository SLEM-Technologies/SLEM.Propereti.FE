import React from "react";
import PaymentOptions from "./PaymentOptions";
import styles from "./PaymentPlan.module.css";
import Sidemenu from "../../Components/Sidebar";
import Header from "../../Components/Header";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";


const InstallmentPayment = () => {

      const navigate = useNavigate();

  return (
    <div className={styles.dashboardContainer}>
      <Sidemenu />
      <Header />
      <div className={styles.dashboard}>
        {" "}
        <div className={styles.container}>
    <h2 className={styles.title} onClick={() => navigate(-1)}>
      <ChevronLeft size={20} className={styles.icon} />
      Payment Plan
    </h2>

          <PaymentOptions />

          <form className={styles.form}>
            <div className={styles.formGroup}>
              <label>Amount to Pay</label>
              <div className={styles.inputRow}>
                <select>
                  <option>USD</option>
                  <option>EUR</option>
                </select>
                <input type="number" defaultValue="30" />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Billing Period</label>
              <select>
                <option>Monthly</option>
                <option>Yearly</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Grace Period before inbetween payment</label>
              <input type="text" defaultValue="7 Days" />
            </div>
            <center>
              {" "}
              <button className={styles.submitBtn}>Set Up Direct Debit</button>
            </center>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InstallmentPayment;
