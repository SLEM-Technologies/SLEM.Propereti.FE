import React, { useState, useEffect } from "react";
import styles from "../Styles/signup.module.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Components/API/API.js";
import http from "../api/http";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import SignupSteps from "../Components/Stepcounter.jsx";
import Charticon from "../assets/icons/Pie chart _Isometric 2.svg";

const CompanySignUp = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Company form data
  // Company form data
  const [companyData, setCompanyData] = useState({
    name: "",
    description: "",
    address: "",
    location: "",
    contactEmail: "",
    contactPhoneNumber: "",
    contactWebsite: "",
    adminUserPhoneNumber: "",
    adminUserUsername: "",
    adminUserFirstName: "",
    adminUserLastName: "",
    adminUserEmail: "",
    adminPassword: "",
    gender: "",
    nationality: "",
  });

  // Admin form data
  const [adminData, setAdminData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    username: "",
    firstName: "",
    lastName: "",
    dob: "",
    address: "",
    nationality: "",
    gender: "",
    refCode: "",
  });

  // handle input changes
  const handleCompanyChange = (e) => {
    setCompanyData({ ...companyData, [e.target.name]: e.target.value });
  };

  const handleAdminChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  // password strength
  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setAdminData({ ...adminData, password });

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    setPasswordStrength(strength);
  };
  const handleCompanySubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    Swal.fire({
      title: "Creating Company...",
      text: "Please wait while we process your request",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    let autoUsername = companyData.adminUserUsername;
    if (!autoUsername && companyData.contactEmail) {
      autoUsername = companyData.contactEmail.split("@")[0];
    }

    const payload = {
      ...companyData,
      adminUserUsername: autoUsername,
      gender: companyData.gender.trim(),
      nationality: companyData.nationality.trim(),
      contactWebsite: companyData.contactWebsite.trim(),
    };
    console.log("FINAL PAYLOAD TO API:", payload);

    http
      .post(`/api/v1/companies/create-company`, payload)
      .then(() => {
        setStep(2);
        Swal.fire({
          title: "Company Created!",
          text: "Proceed to complete your admin details.",
          icon: "success",
        });
      })

      .catch((err) => {
        // 🪵 Log server error in console for debugging
        console.log("SERVER ERROR:", err.response?.data);
        localStorage.getItem("access_token");

        // ❌ Show error alert to the user
        Swal.fire({
          title: "Failed",
          text:
            err?.response?.data?.message ||
            "Something went wrong on the server.",
          icon: "error",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // submit admin
  const handleAdminSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (adminData.password !== adminData.confirmPassword) {
      Swal.fire({
        title: "Password Mismatch",
        text: "Passwords do not match.",
        icon: "error",
      });
      setIsLoading(false);
      return;
    }

    http
      .post(`/api/v1/companies/create-company-admin`, {
        ...adminData,
      })
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Company admin account created successfully.",
          icon: "success",
        });
        navigate("/login");
      })
      .catch((err) => {
        Swal.fire({
          title: "Failed",
          text: err?.response?.data?.message || "Something went wrong.",
          icon: "error",
        });
      })
      .finally(() => setIsLoading(false));
  };
  useEffect(() => {
    if (step === 2) {
      setAdminData((prev) => ({
        ...prev,
        email: companyData.adminUserEmail,
        username: companyData.adminUserUsername,
        phoneNumber: companyData.adminUserPhoneNumber,
        firstName: companyData.adminUserFirstName,
        lastName: companyData.adminUserLastName,
        gender: companyData.gender,
        nationality: companyData.nationality,
      }));
    }
  }, [step]);

  return (
    <div className={styles.container}>
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

      <div className={styles.rightSide}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <ArrowLeft size={20} /> Back
        </button>

        <div className={styles.progressBar}>
          <SignupSteps currentStep={step} />
        </div>

        {/* Step 1: Company Form */}
        {step === 1 && (
          <form className={styles.form1} onSubmit={handleCompanySubmit}>
            <h2 className={styles.formTitle}>Register Company</h2>
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="name"
                placeholder="Company Name"
                value={companyData.name}
                onChange={handleCompanyChange}
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <textarea
                name="description"
                placeholder="Company Description"
                value={companyData.description}
                onChange={handleCompanyChange}
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <input
                type="text"
                name="address"
                placeholder="Company Address"
                value={companyData.address}
                onChange={handleCompanyChange}
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={companyData.location}
                onChange={handleCompanyChange}
                className={styles.input}
              />
            </div>
            {/* Admin Email */}
            <div className={styles.inputGroup}>
              <input
                type="email"
                name="adminUserEmail"
                placeholder="Admin Email"
                value={companyData.adminUserEmail}
                onChange={handleCompanyChange}
                className={styles.input}
                required
              />
            </div>
            <input
              type="text"
              name="adminUserFirstName"
              placeholder="Admin First Name"
              value={companyData.adminUserFirstName}
              onChange={handleCompanyChange}
              className={styles.input}
              required
            />

            <input
              type="text"
              name="adminUserLastName"
              placeholder="Admin Last Name"
              value={companyData.adminUserLastName}
              onChange={handleCompanyChange}
              className={styles.input}
              required
            />

            <input
              type="text"
              name="adminUserPhoneNumber"
              placeholder="Admin Phone Number"
              value={companyData.adminUserPhoneNumber}
              onChange={handleCompanyChange}
              className={styles.input}
              required
            />

            <select
              name="gender"
              value={companyData.gender}
              onChange={handleCompanyChange}
              className={styles.input}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <input
              type="text"
              name="nationality"
              placeholder="Nationality"
              value={companyData.nationality}
              onChange={handleCompanyChange}
              className={styles.input}
              required
            />

            {/* Admin Password */}
            <div className={styles.inputGroup}>
              <input
                type="password"
                name="adminPassword"
                placeholder="Admin Password"
                value={companyData.adminPassword}
                onChange={handleCompanyChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <input
                type="email"
                name="contactEmail"
                placeholder="Contact Email"
                value={companyData.contactEmail}
                onChange={handleCompanyChange}
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <input
                type="text"
                name="contactPhoneNumber"
                placeholder="Contact Phone"
                value={companyData.contactPhoneNumber}
                onChange={handleCompanyChange}
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <input
                type="text"
                name="contactWebsite"
                placeholder="Website"
                value={companyData.contactWebsite}
                onChange={handleCompanyChange}
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="adminUserUsername"
                placeholder="Admin Username (auto-filled from email)"
                value={companyData.adminUserUsername}
                onChange={handleCompanyChange}
                className={styles.input}
              />
            </div>

            <button type="submit" className={styles.btnproceed}>
              Next: Admin Details
            </button>
          </form>
        )}

        {/* Step 2: Admin Form */}
        {step === 2 && (
          <form className={styles.form1} onSubmit={handleAdminSubmit}>
            <h2 className={styles.formTitle}>Register Company Admin</h2>

            <div className={styles.inputGroup}>
              <input
                type="email"
                name="email"
                placeholder="Admin Email"
                value={adminData.email}
                onChange={handleAdminChange}
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={adminData.firstName}
                onChange={handleAdminChange}
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={adminData.lastName}
                onChange={handleAdminChange}
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={adminData.phoneNumber}
                onChange={handleAdminChange}
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={adminData.username}
                onChange={handleAdminChange}
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <input
                type="date"
                name="dob"
                value={adminData.dob}
                onChange={handleAdminChange}
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={adminData.address}
                onChange={handleAdminChange}
                className={styles.input}
              />
            </div>

            {/* Password */}
            <div className={styles.inputGroup}>
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={adminData.password}
                  onChange={handlePasswordChange}
                  placeholder="Password"
                  className={styles.input}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.eyeButton}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <div className={styles.passwordStrength}>
                <div
                  className={`${styles.strengthBar} ${
                    styles[`strength${passwordStrength}`]
                  }`}
                ></div>
              </div>
            </div>

            {/* Confirm Password */}
            <div className={styles.inputGroup}>
              <div className={styles.passwordWrapper}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={adminData.confirmPassword}
                  onChange={handleAdminChange}
                  placeholder="Confirm Password"
                  className={styles.input}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={styles.eyeButton}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className={styles.btnproceed}>
              Complete Registration
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CompanySignUp;
