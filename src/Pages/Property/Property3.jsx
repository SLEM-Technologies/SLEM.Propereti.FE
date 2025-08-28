import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
// import apiClient from "../../lib/apiClient";
import Swal from "sweetalert2";
import { ArrowLeft } from "lucide-react";

import styles from "../../Styles/signup.module.css";
import Charticon from "../../assets/icons/Pie chart _Isometric 2.svg";
import { BASE_URL } from "../../Components/API/API.js";
import PropertySteps from "../../Components/PropertySteps";
import { FaUpload } from "react-icons/fa";

const Step4 = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef();

  const [formData, setFormData] = useState({
    propertyType: "",
    amount: "",
    paymentType: "",
    feeType: "",
    country: "",
    state: "",
    city: "",
  });

  const [uploadedFile, setUploadedFile] = useState(null);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleContinue = () => {
    console.log(formData);
    navigate("/property2");
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  const handleFileUpload = (file) => {
    if (file) {
      setUploadedFile(file);

      Swal.fire({
        icon: "success",
        title: "File Uploaded",
        text: `${file.name} uploaded successfully.`,
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className={styles.container}>
      {/* Left Side */}
      <div className={styles.leftSide}>
        <div className={styles.welcomeContent}>
          <div className={styles.illustration}>
            <div className={styles.chartContainer}>
              <div className={styles.pieChart}>
                <img className={styles.reed} src={Charticon} alt="Chart Icon" />
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

        <h2 className={styles.formTitle}>Property Details</h2>
        <PropertySteps currentStep={3} />
        <p className={styles.formSubtitle_X}>
          Upload an offer letter from your agent/landlord if you have a property
          you want to rent and you can click on{" "}
          <a href="#">view sample offer</a> letter to see sample OR upload your
          tenancy agreement if you want to renew the rent of your current
          accommodation{" "}
        </p>

        <div
className={`${styles.container6} ${styles.extraClass6}`}
          onClick={() => fileInputRef.current?.click()}
        >
          <FaUpload className={styles.icon} />
          <p className={styles.text}>Upload your offer letter file. (pdf)</p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            style={{ display: "none" }}
            onChange={(e) => handleFileUpload(e.target.files[0] || null)}
          />
          {uploadedFile && (
            <p className={styles.uploadedFile}>
              Uploaded: <strong>{uploadedFile.name}</strong>
            </p>
          )}
        </div>
        <center>     <div className={styles.buttonGroup1}>
                        <button
                          className={styles.dashboardBtn}
                          onClick={() => navigate("/dashboard")}
                        >
                          Dashboard
                        </button>
                        <button
                          className={styles.btnproceed}
                          onClick={() => navigate("/cont")}
                        >
                          Continue
                        </button>
                      </div></center>
         
      </div>
    </div>
  );
};

export default Step4;
