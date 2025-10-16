import React, { useState } from "react";
import PaymentOptions from "./PaymentOptions";
import styles from "./PaymentPlan.module.css";
import Sidemenu from "../../Components/Sidebar";
import Header from "../../Components/Header";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const InstallmentPayment = () => {
  const navigate = useNavigate();

  const [currency, setCurrency] = useState("NGN");
  const [amount, setAmount] = useState(30000);
  const [billingPeriod, setBillingPeriod] = useState("Monthly");
  const [gracePeriod, setGracePeriod] = useState("7 Days");

  const formatCurrency = (value) => {
    if (isNaN(value)) return "";
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Direct Debit Set Up 🎉",
      html: `
        <p><strong>Currency:</strong> ${currency}</p>
        <p><strong>Amount:</strong> ${formatCurrency(amount)}</p>
        <p><strong>Billing Period:</strong> ${billingPeriod}</p>
        <p><strong>Grace Period:</strong> ${gracePeriod}</p>
        <p>Your recurring payment has been successfully configured.</p>
      `,
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  return (
    <div className={styles.dashboardContainer}>
      <Sidemenu />
      <Header />
      <div className={styles.dashboard}>
        <div className={styles.container}>
          <h2 className={styles.title} onClick={() => navigate(-1)}>
            <ChevronLeft size={20} className={styles.icon} />
            Payment Plan
          </h2>

          <PaymentOptions />

          <form className={styles.form} onSubmit={handleSubmit}>
            {/* === Amount to Pay === */}
            <div className={styles.formGroup}>
              <label>Amount to Pay</label>
              <div className={styles.inputRow}>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option value="NGN">₦ (Naira)</option>
                  <option value="USD">$ (USD)</option>
                  <option value="EUR">€ (Euro)</option>
                </select>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
              </div>
              <small>
                💰 You’ll be charged: <strong>{formatCurrency(amount)}</strong>
              </small>
            </div>

            {/* === Billing Period === */}
            <div className={styles.formGroup}>
              <label>Billing Period</label>
              <select
                value={billingPeriod}
                onChange={(e) => setBillingPeriod(e.target.value)}
              >
                <option>Monthly</option>
                <option>Quarterly</option>
                <option>Yearly</option>
              </select>
            </div>

            {/* === Grace Period === */}
            <div className={styles.formGroup}>
              <label>Grace Period before inbetween payment</label>
              <input
                type="text"
                value={gracePeriod}
                onChange={(e) => setGracePeriod(e.target.value)}
              />
            </div>

            {/* === Button === */}
            <center>
              <button type="submit" className={styles.submitBtn}>
                Set Up Direct Debit
              </button>
            </center>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InstallmentPayment;
