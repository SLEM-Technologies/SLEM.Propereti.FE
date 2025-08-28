import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import apiClient from "../../../lib/apiClient";
import Swal from "sweetalert2";
import { ArrowLeft } from "lucide-react";

import styles from "../../../Styles/signup.module.css";

import PropertySteps from "../../../Components/PropertySteps";

const Step4 = () => {
  const navigate = useNavigate();
  const [propertyForms, setPropertyForms] = useState([
    {
      propertyType: "",
      amount: "",
      paymentType: "",
      feeType: "",
      country: "",
      state: "",
      city: "",
    },
  ]);

  const handleChange = (index, field, value) => {
    const updatedForms = [...propertyForms];
    updatedForms[index][field] = value;
    setPropertyForms(updatedForms);
  };

  const addPropertyForm = () => {
    setPropertyForms([
      ...propertyForms,
      {
        propertyType: "",
        amount: "",
        paymentType: "",
        feeType: "",
        country: "",
        state: "",
        city: "",
      },
    ]);
  };

  const handleContinue = () => {
    console.log(propertyForms);
    navigate("/property2b");
  };

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
        <PropertySteps currentStep={1} />
        <p className={styles.formSubtitle}>
          Tell us about the property you want to submit
        </p>

        <form action="" className={styles.form}>
          <div className={styles.container_props}>
            {propertyForms.map((formData, index) => (
              <div key={index} className={styles.formInstance}>
                <div className={styles.inputGroup}>
                  <select
                    className={styles.input}
                    value={formData.propertyType}
                    onChange={(e) => handleChange(index, "propertyType", e.target.value)}
                  >
                    <option value="">Select the type of property</option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="land">Land</option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <input
                    type="number"
                    placeholder="Enter the amount"
                    className={styles.input}
                    value={formData.amount}
                    onChange={(e) => handleChange(index, "amount", e.target.value)}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    placeholder="Enter the payment type"
                    className={styles.input}
                    value={formData.paymentType}
                    onChange={(e) => handleChange(index, "paymentType", e.target.value)}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <select
                    className={styles.input}
                    value={formData.feeType}
                    onChange={(e) => handleChange(index, "feeType", e.target.value)}
                  >
                    <option value="">Agency and Legal fees</option>
                    <option value="5%">5%</option>
                    <option value="10%">10%</option>
                    <option value="none">None</option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <select
                    className={styles.input}
                    value={formData.country}
                    onChange={(e) => handleChange(index, "country", e.target.value)}
                  >
                    <option value="">Select Country</option>
                    <option value="nigeria">Nigeria</option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <select
                    className={styles.input}
                    value={formData.state}
                    onChange={(e) => handleChange(index, "state", e.target.value)}
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
                    onChange={(e) => handleChange(index, "city", e.target.value)}
                  >
                    <option value="">Select City</option>
                    <option value="ikeja">Ikeja</option>
                    <option value="lekki">Lekki</option>
                    <option value="garki">Garki</option>
                  </select>
                </div>
              </div>
            ))}

            <p className={styles.addMore} onClick={addPropertyForm}>
              ＋ Add more property
            </p>

            <div className={styles.buttonGroup}>
              <button className={styles.dashboardBtn} onClick={handleCancel}>
                Cancel
              </button>
              <Link to="/property2b">
                <button className={styles.btnproceed} onClick={handleContinue}>
                  Continue
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step4;
