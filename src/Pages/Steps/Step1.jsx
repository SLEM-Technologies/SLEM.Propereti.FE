import React, { useState, useRef } from "react";
import styles from "../../Styles/signup.module.css";
import Charticon from "../../assets/icons/Pie chart _Isometric 2.svg";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import SignupSteps from "../../Components/Stepcounter";
import { ArrowLeft } from "lucide-react";
import { BASE_URL } from "../../Components/API/API.js";
import axios from "axios";

const Step4 = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([
    { bankName: "", accountName: "", accountNumber: "", bvn: "" },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAccountChange = (index, field, value) => {
    const updated = [...accounts];
    updated[index][field] = value;
    setAccounts(updated);
  };

  const addAccount = () => {
    setAccounts([
      ...accounts,
      { bankName: "", accountName: "", accountNumber: "", bvn: "" },
    ]);
  };

  const handleContinue = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Unauthorized",
        text: "Please login again to continue.",
      });
      navigate("/login");
      return;
    }

    // Validation
    for (let i = 0; i < accounts.length; i++) {
      const { bankName, accountName, accountNumber, bvn } = accounts[i];
      if (!bankName || !accountName || !accountNumber || !bvn) {
        Swal.fire({
          icon: "warning",
          title: "Missing Fields",
          text: `Please complete all fields for Account ${i + 1}`,
        });
        return;
      }
    }

    setIsLoading(true);

    try {
      for (const account of accounts) {
        await axios.post(
          `${BASE_URL}/api/v1/users/add-user-bank-details`,
          account,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Bank details submitted successfully!",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/signup/step-5");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text:
          err?.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/home");
  };

  return (
    <div className={styles.container}>
      {/* Left Side */}
      <div className={styles.leftSide}>
        <div className={styles.welcomeContent}>
          <div className={styles.illustration}>
            <div className={styles.chartContainer}>
              <div className={styles.pieChart}>
                <img className={styles.reed} src={Charticon} alt="" />
              </div>
            </div>
          </div>

          <h1 className={styles.welcomeTitle}>Welcome</h1>
          <p className={styles.welcomeText}>
            Login to get started
            <br />
            If not yet registered click on sign up
            <br />
            to get started
          </p>

          <div className={styles.dots}>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className={styles.rightSide}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <ArrowLeft size={20} /> Back
        </button>

        <SignupSteps currentStep={4} />

        <div className={styles.form}>
          <div className={styles.container4}>
            <h2 className={styles.title4}>Fill in Bank Details</h2>
            <p className={styles.description4}>
              Bank Details are required for you to withdraw your funds when
              needed. BVN is also required to verify your bank details as well
              as for compliance purposes.
            </p>

            {accounts.map((item, index) => (
              <div key={index} className={styles.nameRow1}>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    placeholder="Bank Name"
                    className={styles.input}
                    value={item.bankName}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^[a-zA-Z\s]*$/.test(value)) {
                        handleAccountChange(index, "bankName", value);
                      }
                    }}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    placeholder="Account Name"
                    className={styles.input}
                    value={item.accountName}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^[a-zA-Z\s]*$/.test(value)) {
                        handleAccountChange(index, "accountName", value);
                      }
                    }}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    placeholder="Account Number"
                    className={styles.input}
                    value={item.accountNumber}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        handleAccountChange(index, "accountNumber", value);
                      }
                    }}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    placeholder="Enter BVN"
                    className={styles.input}
                    value={item.bvn}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        handleAccountChange(index, "bvn", value);
                      }
                    }}
                  />
                </div>
              </div>
            ))}

            <p className={styles.addMore} onClick={addAccount}>
              ＋ Add more account
            </p>

            <div className={styles.buttonGroup}>
              <button className={styles.dashboardBtn} onClick={handleCancel}>
                Cancel
              </button>
              <button className={styles.btnproceed} onClick={handleContinue}>
                {isLoading ? (
                  <div className={styles.spinner}></div>
                ) : (
                  "Continue"
                )}
              </button>
            </div>

            <p className={styles.skipText}>
              Click Cancel to skip onboarding process and continue to dashboard
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4;
