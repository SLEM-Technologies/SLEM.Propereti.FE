import React, { useState, useEffect } from "react";
import PaymentOptions from "./PaymentOptions";
import styles from "./PaymentPlan.module.css";
import Sidemenu from "../../Components/Sidebar";
import Header from "../../Components/Header";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Bank from "../../assets/icons/Banktf.svg";
import Debit from "../../assets/icons/dbcd_card.svg";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const OneTimePayment = () => {
  const navigate = useNavigate();

  // Timer states
  const [timer, setTimer] = useState(300); // 5 minutes (in seconds)
  const [accountNumber, setAccountNumber] = useState("1234567890");
  const [intervalId, setIntervalId] = useState(null);

  // Start countdown once user clicks Bank Transfer
  const startCountdown = () => {
    if (intervalId) clearInterval(intervalId);

    const id = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          // Timer finished -> generate new account number
          const newAcc = Math.floor(1000000000 + Math.random() * 9000000000);
          setAccountNumber(newAcc.toString());
          return 300; // reset timer to 5 minutes again
        }
        return prev - 1;
      });
    }, 1000);

    setIntervalId(id);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleBankTransfer = () => {
    startCountdown();

    const interval = setInterval(() => {
      Swal.update({
        html: `
          <p><strong>Bank:</strong> Zenith Bank</p>
          <p><strong>Account Name:</strong> SLEM Properties Ltd</p>
          <p><strong>Account Number:</strong> ${accountNumber}</p>
          <p style="margin-top:10px;">⏳ New account refreshes in <strong>${formatTime(
            timer
          )}</strong></p>
        `,
      });
    }, 1000);

    Swal.fire({
      title: "Bank Transfer Details",
      html: `
        <p><strong>Bank:</strong> Zenith Bank</p>
        <p><strong>Account Name:</strong> SLEM Properties Ltd</p>
        <p><strong>Account Number:</strong> ${accountNumber}</p>
        <p style="margin-top:10px;">⏳ New account refreshes in <strong>${formatTime(
          timer
        )}</strong></p>
      `,
      confirmButtonText: "Done",
      didClose: () => {
        clearInterval(interval);
        clearInterval(intervalId);
      },
    });
  };

  const handleCardPayment = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Enter Card Details",
      html: `
        <input id="cardNumber" type="text" maxlength="16" placeholder="Card Number (16 digits)" class="swal2-input" />
        <input id="expiryDate" type="text" maxlength="5" placeholder="MM/YY" class="swal2-input" />
        <input id="cvv" type="password" maxlength="3" placeholder="CVV" class="swal2-input" />
      `,
      focusConfirm: false,
      confirmButtonText: "Pay Now",
      preConfirm: () => {
        const card = document.getElementById("cardNumber").value.trim();
        const expiry = document.getElementById("expiryDate").value.trim();
        const cvv = document.getElementById("cvv").value.trim();

        if (!/^\d{16}$/.test(card)) {
          Swal.showValidationMessage("Card number must be 16 digits");
          return false;
        }
        if (!/^\d{2}\/\d{2}$/.test(expiry)) {
          Swal.showValidationMessage("Enter valid expiry date (MM/YY)");
          return false;
        }
        if (!/^\d{3}$/.test(cvv)) {
          Swal.showValidationMessage("CVV must be 3 digits");
          return false;
        }
        return { card, expiry, cvv };
      },
    });

    if (formValues) {
      Swal.fire({
        title: "Processing Payment...",
        text: "Please wait a moment",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      setTimeout(() => {
        Swal.close();
        Swal.fire({
          title: "Payment Successful 🎉",
          text: "Your payment was processed successfully!",
          icon: "success",
        });
      }, 2000);
    }
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

          <div className={styles.paymentMethods}>
            <p className={styles.sectionTitle}>
              Select your preferred payment method
            </p>
            <div className={styles.methodGrid}>
              <div className={styles.methodCard} onClick={handleBankTransfer}>
                <bank>
                  <img src={Bank} alt="" /> Bank Transfer
                </bank>
                <ChevronRight size={24} />
              </div>

              <div className={styles.methodCard} onClick={handleCardPayment}>
                <bank>
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
