import React, { useState, useRef } from "react";
import styles from "../Styles/signup.module.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Components/API/API.js";
import http from "../api/http";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import SignupSteps from "../Components/Stepcounter1.jsx";
import Charticon from "../assets/icons/Pie chart _Isometric 2.svg";
import "../Styles/swalStyles.css";
import { ThemedSwal } from "../utils/ThemedSwal.js";

const CompanySignUp = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // === COMPANY FORM DATA ===
  const [companyData, setCompanyData] = useState({
    name: "",
    description: "",
    address: "",
    location: "",
    contactEmail: "",
    contactPhoneNumber: "",
    contactWebsite: "",
  });

  // === ADMIN FORM DATA ===
  const [adminData, setAdminData] = useState({
    adminUserEmail: "",
    adminPassword: "",
    confirmPassword: "",
    adminUserPhoneNumber: "",
    adminUserUsername: "",
    adminUserFirstName: "",
    adminUserLastName: "",
    gender: "",
    nationality: "",
  });

  // === Handle Input Changes ===
  const handleCompanyChange = (e) => {
    setCompanyData({ ...companyData, [e.target.name]: e.target.value });
  };

  const handleAdminChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  // === STEP 1: NEXT BUTTON (no submit yet) ===
  const handleCompanyNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  // === STEP 2: Submit Both Company + Admin Data ===
  const handleFullSubmit = async (e) => {
    e.preventDefault();

    if (adminData.adminPassword !== adminData.confirmPassword) {
      ThemedSwal({
        icon: "error",
        title: "Password Mismatch",
        text: "Passwords do not match.",
      });
      return;
    }

    const payload = {
      ...companyData,
      adminUserPhoneNumber: adminData.adminUserPhoneNumber,
      adminUserUsername: adminData.adminUserUsername,
      adminUserFirstName: adminData.adminUserFirstName,
      adminUserLastName: adminData.adminUserLastName,
      adminUserEmail: adminData.adminUserEmail,
      adminPassword: adminData.adminPassword,
      gender: adminData.gender,
      nationality: adminData.nationality,
    };

    console.log("FINAL PAYLOAD SENT TO API:", payload);

    setIsLoading(true);
    ThemedSwal({
      title: "Registering Company & Admin...",
      text: "Please wait while we process your request.",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const res = await http.post(
        `${BASE_URL}/api/v1/companies/create-company`,
        payload
      );

      console.log("Company + Admin Created:", res.data);

      Swal.close();

      // ✅ Move to OTP verification screen instead of showing modal
      ThemedSwal({
        icon: "success",
        title: "Registration Successful!",
        text: `An OTP has been sent to ${adminData.adminUserEmail}.`,
        timer: 1800,
        showConfirmButton: false,
      });

      // Move to step 3 (OTP verification)
      setStep(3);
    } catch (err) {
      console.error("Creation error:", err.response?.data);

      Swal.close();
      ThemedSwal({
        icon: "error",
        title: "Registration Failed",
        text: err?.response?.data?.message || "Something went wrong.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const resendOTP = async () => {
    try {
      await http.post(`${BASE_URL}/api/v1/accounts/resend-email-otp`, {
        email: adminData.adminUserEmail,
      });
      ThemedSwal({
        icon: "success",
        title: "OTP Resent!",
        text: `A new code has been sent to ${adminData.adminUserEmail}`,
      });
    } catch (error) {
      ThemedSwal({
        icon: "error",
        title: "Failed",
        text: error?.response?.data?.message || "Could not resend OTP",
      });
    }
  };

  const verifyEmail = async () => {
    const code = otp.join("");
    if (code.length !== 6) {
      ThemedSwal({
        icon: "warning",
        title: "Incomplete OTP",
        text: "Please enter all 6 digits.",
      });
      return;
    }

    try {
      ThemedSwal({
        title: "Verifying...",
        text: "Please wait while we verify your OTP.",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      await http.post(`${BASE_URL}/api/v1/accounts/verify-email`, {
        email: adminData.adminUserEmail,
        otpCode: code,
      });

      Swal.close();
      ThemedSwal({
        icon: "success",
        title: "Email Verified 🎉",
        text: "Your email has been successfully verified.",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/login");
    } catch (error) {
      Swal.close();
      ThemedSwal({
        icon: "error",
        title: "Verification Failed",
        text: error?.response?.data?.message || "Invalid OTP",
      });
    }
  };

  return (
    <div className={styles.container}>
      {/* === LEFT SIDE === */}
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
            Register your company and admin to get started.
          </p>
        </div>
      </div>

      {/* === RIGHT SIDE === */}
      <div className={styles.rightSide}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <ArrowLeft size={20} /> Back
        </button>

        <div className={styles.progressBar}>
          <SignupSteps currentStep={step} />
        </div>

        {/* === STEP 1: COMPANY FORM === */}
        {step === 1 && (
          <form className={styles.form1} onSubmit={handleCompanyNext}>
            <h2 className={styles.formTitle}>Register Company</h2>

            <input
              type="text"
              name="name"
              placeholder="Company Name"
              value={companyData.name}
              onChange={handleCompanyChange}
              className={styles.input}
              required
            />
            <textarea
              name="description"
              placeholder="Company Description"
              value={companyData.description}
              onChange={handleCompanyChange}
              className={styles.input}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={companyData.address}
              onChange={handleCompanyChange}
              className={styles.input}
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={companyData.location}
              onChange={handleCompanyChange}
              className={styles.input}
              required
            />
            <input
              type="email"
              name="contactEmail"
              placeholder="Contact Email"
              value={companyData.contactEmail}
              onChange={handleCompanyChange}
              className={styles.input}
              required
            />
            <input
              type="text"
              name="contactPhoneNumber"
              placeholder="Contact Phone"
              value={companyData.contactPhoneNumber}
              onChange={handleCompanyChange}
              className={styles.input}
              required
            />
            <input
              type="text"
              name="contactWebsite"
              placeholder="Website"
              value={companyData.contactWebsite}
              onChange={handleCompanyChange}
              className={styles.input}
            />

            <button type="submit" className={styles.btnproceed}>
              Next: Admin Details
            </button>
          </form>
        )}

        {/* === STEP 2: ADMIN FORM === */}
        {step === 2 && (
          <form className={styles.form1} onSubmit={handleFullSubmit}>
            <h2 className={styles.formTitle}>Register Company Admin</h2>

            <input
              type="email"
              name="adminUserEmail"
              placeholder="Admin Email"
              value={adminData.adminUserEmail}
              onChange={handleAdminChange}
              className={styles.input}
              required
            />
            <input
              type="text"
              name="adminUserFirstName"
              placeholder="First Name"
              value={adminData.adminUserFirstName}
              onChange={handleAdminChange}
              className={styles.input}
              required
            />
            <input
              type="text"
              name="adminUserLastName"
              placeholder="Last Name"
              value={adminData.adminUserLastName}
              onChange={handleAdminChange}
              className={styles.input}
              required
            />
            <input
              type="text"
              name="adminUserPhoneNumber"
              placeholder="Phone Number"
              value={adminData.adminUserPhoneNumber}
              onChange={handleAdminChange}
              className={styles.input}
              required
            />
            <input
              type="text"
              name="adminUserUsername"
              placeholder="Username"
              value={adminData.adminUserUsername}
              onChange={handleAdminChange}
              className={styles.input}
              required
            />

            <select
              name="gender"
              value={adminData.gender}
              onChange={handleAdminChange}
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
              value={adminData.nationality}
              onChange={handleAdminChange}
              className={styles.input}
              required
            />

            {/* Password */}
            <div className={styles.inputGroup}>
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="adminPassword"
                  placeholder="Password"
                  value={adminData.adminPassword}
                  onChange={handleAdminChange}
                  className={styles.input}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.eyeButton}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.passwordWrapper}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={adminData.confirmPassword}
                  onChange={handleAdminChange}
                  className={styles.input}
                  required
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
        {step === 3 && (
          <div className={styles.form}>
            <div className={styles.container1}>
              <h2 className={styles.title1}>Verify Email Address</h2>
              <p className={styles.subtitle1}>
                A six-digit code has been sent to {adminData.adminUserEmail}
                <br />
                <span className={styles.note1}>
                  Kindly enter the code to continue.
                </span>
              </p>

              <div className={styles.inputWrapper1}>
                {Array(6)
                  .fill("")
                  .map((_, i) => (
                    <input
                      key={i}
                      maxLength="1"
                      className={styles.otpInput}
                      value={otp[i]}
                      onChange={(e) => handleChange(e, i)}
                      ref={(el) => (inputsRef.current[i] = el)}
                    />
                  ))}
              </div>

              <div className={styles.actions1}>
                <button className={styles.resend} onClick={resendOTP}>
                  Resend OTP
                </button>
              </div>

              <button className={styles.backButton} onClick={() => setStep(2)}>
                <ArrowLeft size={20} /> Back
              </button>
              <button className={styles.btnproceed} onClick={verifyEmail}>
                Verify
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanySignUp;
