import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import apiClient from "../../../lib/apiClient";
import Swal from "sweetalert2";
import { ArrowLeft } from "lucide-react";

import styles from "../../../Styles/signup.module.css";

import PropertySteps from "../../../Components/PropertySteps";

const Step4 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    propertyType: "",
    amount: "",
    paymentType: "",
    feeType: "",
    country: "",
    state: "",
    city: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  //   const handleContinue = () => {
  //     console.log(formData);
  //     navigate("/property2");
  //   };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <div className={styles.container}>
      {/* Left Side */}


      {/* Right Side */}
      <div className={styles.rightSide}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <ArrowLeft size={20} /> Back
        </button>

        <h2 className={styles.formTitle}>Property Details</h2>
        <PropertySteps currentStep={2} />
        <p className={styles.formSubtitle}>
          Tell us about the property you want to submit
        </p>

        <form action="" className={styles.form}>
          {" "}
          <div className={styles.container_props}>
            <div className={styles.inputGroup}>
              <select
                className={styles.input}
                value={formData.propertyType}
                onChange={(e) => handleChange("propertyType", e.target.value)}
              >
                <option value="">Enter Agent name</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="land">Land</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <input
                type="number"
                placeholder="Enter Phone number"
                className={styles.input}
                value={formData.amount}
                onChange={(e) => handleChange("amount", e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="Enter email address"
                className={styles.input}
                value={formData.paymentType}
                onChange={(e) => handleChange("paymentType", e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <select
                className={styles.input}
                value={formData.feeType}
                onChange={(e) => handleChange("feeType", e.target.value)}
              >
                <option value="">Expiry date-Rent and payment</option>
                <option value="5%">5%</option>
                <option value="10%">10%</option>
                <option value="none">None</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="Enter Bank"
                className={styles.input}
                value={formData.paymentType}
                onChange={(e) => handleChange("paymentType", e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="Enter the full address of the property"
                className={styles.input}
                value={formData.paymentType}
                onChange={(e) => handleChange("paymentType", e.target.value)}
              />
            </div>

            {/* <div className={styles.inputGroup}>
              <select
                className={styles.input}
                value={formData.state}
                onChange={(e) => handleChange("state", e.target.value)}
              >
                <option value="">Select State</option>
                <option value="lagos">Lagos</option>
                <option value="abuja">Abuja</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <select
                className={styles.input}
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
              >
                <option value="">Select City</option>
                <option value="ikeja">Ikeja</option>
                <option value="lekki">Lekki</option>
                <option value="garki">Garki</option>
              </select>
            </div> */}

            <p className={styles.addMore}>Save</p>

            <div className={styles.buttonGroup}>
              <button className={styles.dashboardBtn} onClick={handleCancel}>
                Cancel
              </button>
              <Link to="/property3b">
                {" "}
                <button className={styles.btnproceed}>Continue</button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step4;
