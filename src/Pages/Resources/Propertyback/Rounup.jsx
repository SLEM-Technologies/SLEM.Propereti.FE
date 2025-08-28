import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { ArrowLeft } from "lucide-react";

import styles from "../../Styles/signup.module.css";
import Charticon from "../../assets/icons/Pie chart _Isometric 2.svg";
import { BASE_URL } from "../../Components/API/API.js";
import PropertySteps from "../../Components/PropertySteps";
import { FaUpload } from "react-icons/fa";
import Undraw from "../../assets/images/undraw_happy_news_re_tsbd 2.png";

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
        <div className={styles.form}>
          <div className={styles.container3}>
            <img
              src={Undraw}
              alt="Verified illustration"
              className={styles.imag4}
            />
            <h1 className={styles.title3}>Property Updated Succesfully</h1>
            <p className={styles.message3}>
              You may now proceed to your rental request page to schedule an
              inspection
            </p>
            <div className={styles.buttonGroup}>
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
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Step4;
