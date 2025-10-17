import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
// no network in this step
import Swal from "sweetalert2";
import { ArrowLeft } from "lucide-react";
import http from "../../api/http";

import styles from "../../Styles/signup.module.css";
import Charticon from "../../assets/icons/Pie chart _Isometric 2.svg";
import { BASE_URL } from "../../Components/API/API.js";
import PropertySteps from "../../Components/PropertySteps.jsx";
import { FaUpload } from "react-icons/fa";

const Prop2 = () => {
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

  const handleCancel = () => {
    navigate("/dashboard");
  };

  const [base64Image, setBase64Image] = useState(null);

  const handleFileUpload = (file) => {
    if (file) {
      setUploadedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result.split(",")[1]); // strip the base64 header
      };
      reader.readAsDataURL(file);

      Swal.fire({
        icon: "success",
        title: "File Uploaded",
        text: `${file.name} uploaded successfully.`,
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const handleContinue = async () => {
    const step4Data =
      JSON.parse(localStorage.getItem("propertyFormData")) || [];

    if (!base64Image) {
      Swal.fire({
        title: "Image Required",
        text: "Please upload at least one image before continuing.",
        icon: "warning",
      });
      return;
    }

    Swal.fire({
      title: "Creating Property...",
      text: "Please wait while we save your property details.",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      for (const formData of step4Data) {
        const payload = {
          propertyName: formData.propertyName || null,
          propertyType: formData.propertyType || null,
          model: formData.model || null,
          price: formData.amount ? Number(formData.amount) : 0,
          paymentType: formData.paymentType || null,
          agencyFees: formData.feeType || null,
          country: formData.country || null,
          state: formData.state || null,
          city: formData.city || null,
          latitude: formData.latitude ? Number(formData.latitude) : 0,
          longitude: formData.longitude ? Number(formData.longitude) : 0,
          expiryDate: formData.expiryDate || null,
          // ❌ Remove hardcoded agentId - let backend get from token
          // agentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          base64Images: [base64Image],
        };

        console.log(
          "🔥 Submitting payload (no agentId - using auth token):",
          payload
        );
        const token = localStorage.getItem("access_token");

        const res = await http.post(
          "/api/v1/properties/create-property",
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Response:", res.data);

        if (!res.data?.status) {
          throw new Error(res.data?.message || "Failed to create property.");
        }
      }

      Swal.fire({
        title: "Success!",
        text: "Property created successfully.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      localStorage.removeItem("propertyFormData");
      navigate("/property3");
    } catch (err) {
      console.error("Error:", err.response?.data || err);
      Swal.fire(
        "Error",
        err?.response?.data?.message || "Something went wrong.",
        "error"
      );
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
        <PropertySteps currentStep={2} />
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
        <center>
          {" "}
          <div className={styles.buttonGroup1}>
            <button
              className={styles.dashboardBtn}
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </button>
            <button
              className={styles.btnproceed}
              onClick={handleContinue}
              type="button"
            >
              Continue
            </button>
          </div>
        </center>
      </div>
    </div>
  );
};

export default Prop2;
