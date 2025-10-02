import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import apiClient from "../../lib/apiClient";
import Swal from "sweetalert2";
import { ArrowLeft } from "lucide-react";
import http from "../../api/http";

import styles from "../../Styles/signup.module.css";
import Charticon from "../../assets/icons/Pie chart _Isometric 2.svg";
import { BASE_URL } from "../../Components/API/API.js";
import PropertySteps from "../../Components/PropertySteps";

const Step4 = () => {
  const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    http
      .get("/api/v1/countries/get-all-countries")
      .then((res) => {
        const countries = res?.data?.data || [];
        setCountryList(countries);
      })
      .catch((err) => {
        console.error("Error fetching countries:", err.response?.data || err);
      });
  }, []);
  const navigate = useNavigate();
  const [propertyForms, setPropertyForms] = useState([
    {
      propertyName: "",
      propertyType: "",
      model: "",
      amount: "",
      paymentType: "",
      feeType: "",
      country: "",
      state: "",
      city: "",
      latitude: "",
      longitude: "",
      expiryDate: "",
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

const handleContinue = (e) => {
  e.preventDefault();
  localStorage.setItem("propertyFormData", JSON.stringify(propertyForms));
  navigate("/property2");
};


  const handleCancel = () => {
    navigate("/dashboard");
  };
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]); // strip "data:..."
      reader.onerror = (error) => reject(error);
    });

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
                    onChange={(e) =>
                      handleChange(index, "propertyType", e.target.value)
                    }
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
                    onChange={(e) =>
                      handleChange(index, "amount", e.target.value)
                    }
                  />
                </div>

                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    placeholder="Enter the payment type"
                    className={styles.input}
                    value={formData.paymentType}
                    onChange={(e) =>
                      handleChange(index, "paymentType", e.target.value)
                    }
                  />
                </div>

                <div className={styles.inputGroup}>
                  <select
                    className={styles.input}
                    value={formData.feeType}
                    onChange={(e) =>
                      handleChange(index, "feeType", e.target.value)
                    }
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
                    onChange={(e) =>
                      handleChange(index, "country", e.target.value)
                    }
                  >
                    <option value="">
                      {countryList.length
                        ? "Select Country"
                        : "Loading countries..."}
                    </option>
                    {countryList.map((country) => (
                      <option key={country.id} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    placeholder="Property Name"
                    className={styles.input}
                    value={formData.propertyName}
                    onChange={(e) =>
                      handleChange(index, "propertyName", e.target.value)
                    }
                  />
                </div>

                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    placeholder="Model"
                    className={styles.input}
                    value={formData.model}
                    onChange={(e) =>
                      handleChange(index, "model", e.target.value)
                    }
                  />
                </div>

                <div className={styles.inputGroup}>
                  <input
                    type="number"
                    placeholder="Latitude"
                    className={styles.input}
                    value={formData.latitude}
                    onChange={(e) =>
                      handleChange(index, "latitude", e.target.value)
                    }
                  />
                </div>

                <div className={styles.inputGroup}>
                  <input
                    type="number"
                    placeholder="Longitude"
                    className={styles.input}
                    value={formData.longitude}
                    onChange={(e) =>
                      handleChange(index, "longitude", e.target.value)
                    }
                  />
                </div>

                <div className={styles.inputGroup}>
                  <input
                    type="date"
                    placeholder="Expiry Date"
                    className={styles.input}
                    value={formData.expiryDate}
                    onChange={(e) =>
                      handleChange(index, "expiryDate", e.target.value)
                    }
                  />
                </div>

                <div className={styles.inputGroup}>
                  <select
                    className={styles.input}
                    value={formData.state}
                    onChange={(e) =>
                      handleChange(index, "state", e.target.value)
                    }
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
                    onChange={(e) =>
                      handleChange(index, "city", e.target.value)
                    }
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
              <button
                className={styles.btnproceed}
                onClick={handleContinue}
                type="button"
              >
                Continue
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step4;
