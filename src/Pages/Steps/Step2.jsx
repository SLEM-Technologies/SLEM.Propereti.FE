import React, { useState } from "react";
import styles from "../../Styles/signup.module.css";
import Charticon from "../../assets/icons/Pie chart _Isometric 2.svg";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import SignupSteps from "../../Components/Stepcounter";
import { ArrowLeft } from "lucide-react";
import { FaCamera } from "react-icons/fa";
import { BASE_URL } from "../../Components/API/API.js";
import axios from "axios";

const Step5 = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([
    {
      documentType: "",
      idNumber: "",
      expiryDate: "",
    },
  ]);

  const handleAccountChange = (index, field, value) => {
    const updated = [...accounts];
    updated[index][field] = value;
    setAccounts(updated);
  };

  const addAccount = () => {
    setAccounts([
      ...accounts,
      { documentType: "", idNumber: "", expiryDate: "" },
    ]);
  };

  const [isLoading, setIsLoading] = useState(false);

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

    // Validate all fields
    for (let i = 0; i < accounts.length; i++) {
      const { documentType, idNumber, expiryDate } = accounts[i];
      if (!documentType || !idNumber || !expiryDate) {
        Swal.fire({
          icon: "warning",
          title: "Missing Fields",
          text: `Please complete all fields for Document ${i + 1}`,
        });
        return;
      }
    }

    setIsLoading(true);

    try {
      for (const doc of accounts) {
        await axios.post(
          `${BASE_URL}/api/v1/documents/add-document`,
          {
            documentType: doc.documentType,
            documentId: doc.idNumber,
            expiryDate: doc.expiryDate,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      Swal.fire({
        icon: "success",
        title: "Uploaded!",
        text: "Documents uploaded successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/signup/step-6");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text:
          err?.response?.data?.message ||
          "Something went wrong while uploading documents.",
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

        <SignupSteps currentStep={5} />

        <div className={styles.form}>
          <div className={styles.container4}>
            <h2 className={styles.title4}>Upload Identity Document </h2>
            <p className={styles.description4}>
              You can upload any Identity document from the options below,
              However some require front and back upload. This will help us
              identify that this is you!
            </p>

            {accounts.map((item, index) => (
              <div key={index} className={styles.nameRow1}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>
                    Select Identification Document type
                  </label>
                  <select
                    className={styles.input}
                    value={item.documentType}
                    onChange={(e) =>
                      handleAccountChange(index, "documentType", e.target.value)
                    }
                  >
                    <option value="">Select Document</option>
                    <option value="passport">International Passport</option>
                    <option value="idcard">ID Card</option>
                    <option value="drivers">Driver's Licence</option>
                    <option value="national">National Card</option>
                  </select>
                </div>

                <div className={styles.inputGroup1}>
                  <input
                    type="text"
                    placeholder="ID number"
                    className={styles.input}
                    value={item.idNumber}
                    onChange={(e) =>
                      handleAccountChange(index, "idNumber", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Expiry Date"
                    className={styles.input}
                    value={item.expiryDate}
                    onChange={(e) =>
                      handleAccountChange(index, "expiryDate", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}

            <div className={styles.buttonGroup}>
              <button className={styles.dashboardBtn} onClick={handleCancel}>
                Cancel
              </button>
              <button className={styles.btnproceed} onClick={handleContinue}>
                {isLoading ? <div className={styles.spinner}></div> : "Proceed"}
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

export default Step5;
