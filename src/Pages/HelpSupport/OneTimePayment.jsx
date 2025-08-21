import React from "react";
import PaymentOptions from "./PaymentOptions";
import styles from "./PaymentPlan.module.css";
import Sidemenu from "../../Components/Sidebar";
import Header from "../../Components/Header";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import Bank from "../../assets/icons/Banktf.svg";
import Debit from "../../assets/icons/dbcd_card.svg";
import { useNavigate } from "react-router-dom";

const OneTimePayment = () => {
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

          <div className={styles.paymentMethods}>
            <p className={styles.sectionTitle}>
              Select your preferred payment method
            </p>
            <div className={styles.methodGrid}>
              <div className={styles.methodCard}>
                <bank>
                  {" "}
                  <img src={Bank} alt="" /> Bank Transfer
                </bank>
                <ChevronRight size={24} />
              </div>
              <div className={styles.methodCard}>
                <bank>
                  {" "}
                  <img src={Debit} alt="" /> Debit / Credit Card
                </bank>
                <ChevronRight size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneTimePayment;
