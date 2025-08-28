import React, { useState, useRef } from "react";
import styles from "../../Styles/signup.module.css";
import Charticon from "../../assets/icons/Pie chart _Isometric 2.svg";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import SignupSteps from "../../Components/Stepcounter";
import { ArrowLeft } from "lucide-react";
import { FaCamera } from "react-icons/fa";
import { BASE_URL } from "../../Components/API/API.js";
import apiClient from "../../lib/apiClient";

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
    if (file) {
      const updated = [...accounts];
      updated[index].file = file;
      setAccounts(updated);

      Swal.fire({
        icon: "success",
        title: "File Uploaded",
        text: `${file.name} uploaded successfully.`,
        timer: 1500,
        showConfirmButton: false,
      });
    }
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

    for (let i = 0; i < accounts.length; i++) {
      const { address, state, city, postalCode, proofType, file } = accounts[i];
      if (!address || !state || !city || !postalCode || !proofType || !file) {
        Swal.fire({
          icon: "warning",
          title: "Missing Fields",
          text: `Please complete all fields for Entry ${i + 1}`,
        });
        return;
      }
    }

    Swal.fire({
      title: "Uploading...",
      text: "Please wait while we upload your proof of address.",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      for (const entry of accounts) {
        const base64File = await toBase64(entry.file);

        const payload = {
          address: entry.address,
          state: entry.state,
          city: entry.city,
          postalCode: entry.postalCode,
          documentType: entry.proofType,
          addressDocument: base64File, // base64-encoded file string
        };

        console.log("Submitting JSON Payload:", payload);

        await apiClient.post(`/api/v1/address/add-address`, payload);
      }

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Proof of address uploaded successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/dashboard");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text:
          err?.response?.data?.message ||
          "Something went wrong while uploading proof of address.",
      });
      console.error("Upload error:", err?.response || err);
    }
  };

  // 👇 Helper to convert file to base64
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result;
      const base64 = result.split(",")[1]; // remove "data:image/png;base64,"
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });



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
                    accept=".jpg,.jpeg,.png,.pdf"
                    style={{ display: "none" }}
                    onChange={(e) =>
                      handleFileUpload(index, e.target.files[0] || null)
                    }
                  />
                  {item.file && (
                    <p className={styles.uploadedFile}>
                      Uploaded: <strong>{item.file.name}</strong>
                    </p>
                  )}
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

export default Step6;
