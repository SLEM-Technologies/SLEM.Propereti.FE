import React, { useState, useRef } from "react";
import styles from "../../Styles/signup.module.css";
import Charticon from "../../assets/icons/Pie chart _Isometric 2.svg";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import SignupSteps from "../../Components/Stepcounter";
import { ArrowLeft } from "lucide-react";
import { FaCamera } from "react-icons/fa";

const Step6 = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef();
  const [accounts, setAccounts] = useState([
    {
      address: "",
      state: "",
      city: "",
      postalCode: "",
      proofType: "",
      file: null,
    },
  ]);

  const handleAccountChange = (index, field, value) => {
    const updated = [...accounts];
    updated[index][field] = value;
    setAccounts(updated);
  };

  const handleFileUpload = (index, file) => {
    const updated = [...accounts];
    updated[index].file = file;
    setAccounts(updated);
  };

  const handleContinue = () => {
    Swal.fire({
      title: "Success!",
      text: "Your information has been submitted successfully.",
      icon: "success",
    });
    navigate("/dashboard");
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

        <SignupSteps currentStep={6} />

        <div className={styles.form}>
          <div className={styles.container4}>
            <h2 className={styles.title4}>Upload Proof of Address Document</h2>
            <p className={styles.description4}>
              This will also help us identify that it is you running this
              account
            </p>

            {accounts.map((item, index) => (
              <div key={index} className={styles.nameRow1}>
                <div className={styles.inputGroup1}>
                  <input
                    type="text"
                    placeholder="Residential Address"
                    className={styles.input}
                    value={item.address}
                    onChange={(e) =>
                      handleAccountChange(index, "address", e.target.value)
                    }
                  />
                </div>
                <div className={styles.inputGroup1}>
                  <input
                    type="text"
                    placeholder="State"
                    className={styles.input}
                    value={item.state}
                    onChange={(e) =>
                      handleAccountChange(index, "state", e.target.value)
                    }
                  />
                </div>
                <div className={styles.inputGroup1}>
                  <input
                    type="text"
                    placeholder="City"
                    className={styles.input}
                    value={item.city}
                    onChange={(e) =>
                      handleAccountChange(index, "city", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Postal Code"
                    className={styles.input}
                    value={item.postalCode}
                    onChange={(e) =>
                      handleAccountChange(index, "postalCode", e.target.value)
                    }
                  />
                </div>
                <label className={styles.label}>
                  Select Proof of Address Document type
                </label>
                <div className={styles.inputGroup}>
                  <select
                    className={styles.input}
                    value={item.proofType}
                    onChange={(e) =>
                      handleAccountChange(index, "proofType", e.target.value)
                    }
                  >
                    <option value="">Select Document</option>
                    <option value="bank">Bank Statement</option>
                    <option value="card">Utility Bill</option>
                  </select>
                </div>
                <div
                  className={styles.container6}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <p className={styles.text}>Proof of Address Document</p>
                  <FaCamera className={styles.icon} />
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) =>
                      handleFileUpload(index, e.target.files[0] || null)
                    }
                  />
                </div>
              </div>
            ))}

            <div className={styles.buttonGroup}>
              <button className={styles.dashboardBtn} onClick={handleCancel}>
                Cancel
              </button>
              <button
                className={styles.btnproceed}
                onClick={handleContinue}
              >
                Proceed
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

export default Step6;
