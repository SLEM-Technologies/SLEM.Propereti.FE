import React, { useState, useRef } from "react";
import styles from "../Styles/signup.module.css";
import Charticon from "../assets/icons/Pie chart _Isometric 2.svg";
import Swal from "sweetalert2";

import {
  ArrowLeft,
  Eye,
  EyeOff,
  ChevronDown,
  BarChart3,
  Building,
  Layers,
} from "lucide-react";

const SignUp = () => {
  const [step, setStep] = useState(1);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formData, setFormData] = useState({
    country: "Nigeria",
    firstName: "",
    surname: "",
    email: "",
    phoneCode: "+234",
    phoneNumber: "",
    gender: "",
    dob: "",
    address: "",
    referralCode: "",
    password: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setFormData({ ...formData, password });

    // Simple password strength calculation
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    setPasswordStrength(strength);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (value.length === 1 && index < 5) {
      inputsRef.current[index + 1]?.focus();
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
        <button className={styles.backButton}>
          <ArrowLeft size={20} />
          Back
        </button>
        <div className={styles.progressBar}>
          {[1, 2, 3, 4, 5].map((s, i) => (
            <React.Fragment key={i}>
              <div className={styles.step}>
                <div
                  className={`${styles.stepCircle} ${
                    step >= s ? styles.active : ""
                  }`}
                >
                  {s}
                </div>
                {s === 1 && <span>Account</span>}
              </div>
              {s < 5 && <div className={styles.stepLine}></div>}
            </React.Fragment>
          ))}
        </div>

        {step === 1 && (
          <div className={styles.formContainer}>
            <form
              className={styles.form}
              onSubmit={(e) => {
                e.preventDefault();

                const requiredFields = [
                  "firstName",
                  "surname",
                  "email",
                  "phoneNumber",
                  "gender",
                  "dob",
                  "address",
                  "password",
                  "confirmPassword",
                ];

                const emptyFields = requiredFields.filter(
                  (field) => !formData[field]
                );

                if (emptyFields.length > 0) {
                  Swal.fire({
                    title: "Incomplete Form",
                    text: "Please fill out all required fields before proceeding.",
                    icon: "warning",
                    confirmButtonText: "OK",
                  });
                  return;
                }

                if (formData.password !== formData.confirmPassword) {
                  Swal.fire({
                    title: "Password Mismatch",
                    text: "Passwords do not match.",
                    icon: "error",
                    confirmButtonText: "OK",
                  });
                  return;
                }

                // All good — show success and proceed
                Swal.fire({
                  title: "Success!",
                  text: "Form data saved. Moving to the next step.",
                  icon: "success",
                  timer: 1500,
                  showConfirmButton: false,
                }).then(() => {
                  setStep(2);
                });
              }}
            >
              <h2 className={styles.formTitle}>Register Individual Account</h2>
              <p className={styles.formSubtitle}>
                For the purpose of industry regulation, your details are
                required.
              </p>
              {/* Country Dropdown */}
              <div className={styles.inputGroup}>
                <div className={styles.selectWrapper}>
                  <span className={styles.flag}>🇳🇬</span>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className={styles.select}
                  >
                    <option value="Nigeria">Nigeria</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Kenya">Kenya</option>
                  </select>
                  <ChevronDown size={16} className={styles.selectIcon} />
                </div>
              </div>

              {/* Name Fields */}
              <div className={styles.nameRow}>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    className={styles.input}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleInputChange}
                    placeholder="Surname"
                    className={styles.input}
                  />
                </div>
              </div>

              {/* Email */}
              <div className={styles.inputGroup}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email address"
                  className={`${styles.input} ${styles.error}`}
                />
                <span className={styles.errorIcon}>!</span>
              </div>

              {/* Phone Number */}
              <div className={styles.phoneRow}>
                <div className={styles.phoneCode}>
                  <select
                    name="phoneCode"
                    value={formData.phoneCode}
                    onChange={handleInputChange}
                    className={styles.phoneSelect}
                  >
                    <option value="+234">+234</option>
                    <option value="+233">+233</option>
                    <option value="+254">+254</option>
                  </select>
                </div>
                <div className={styles.inputGroup}>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    className={styles.input}
                  />
                </div>
              </div>

              {/* Gender and DOB */}
              <div className={styles.nameRow}>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    placeholder="Gender"
                    className={styles.input}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    placeholder="Date of Birth"
                    className={styles.input}
                  />
                </div>
              </div>

              {/* Address */}
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Residential Address"
                  className={styles.input}
                />
              </div>

              {/* Referral Code */}
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  name="referralCode"
                  value={formData.referralCode}
                  onChange={handleInputChange}
                  placeholder="Referral code (if any)"
                  className={styles.input}
                />
              </div>

              {/* Password */}
              <div className={styles.inputGroup}>
                <div className={styles.passwordWrapper}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
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
                <p className={styles.passwordHint}>
                  *Password should contain at least one uppercase, lowercase,
                  digit, symbol and minimum of 8 characters*
                </p>
              </div>

              {/* Confirm Password */}
              <div className={styles.inputGroup}>
                <div className={styles.passwordWrapper}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
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

              {/* Terms and Conditions */}
              <div className={styles.terms}>
                <p>
                  By continuing, you are acknowledging that you have read,
                  understood and agreed to Omnny's{" "}
                  <a href="#" className={styles.link}>
                    Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" className={styles.link}>
                    Privacy Policy
                  </a>{" "}
                  as well as to{" "}
                  <a href="#" className={styles.link}>
                    Drivewealth's Disclosures
                  </a>
                  ,{" "}
                  <a href="#" className={styles.link}>
                    W8-ben acknowledgement
                  </a>{" "}
                  and{" "}
                  <a href="#" className={styles.link}>
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
              <button className={styles.btnproceed} type="submit">
                Proceed
              </button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className={styles.form}>
            <div className={styles.container1}>
              <h2 className={styles.title1}>Verify Phone Number</h2>
              <p className={styles.subtitle1}>
                A six-digit code has been sent to the inputted mobile number
                <br />
                <span className={styles.note1}>
                  Kindly enter code to continue.
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
                      onChange={(e) => handleChange(e, i)}
                      ref={(el) => (inputsRef.current[i] = el)}
                    />
                  ))}
              </div>

              <div className={styles.actions1}>
                <button className={styles.resend}>Resend OTP</button>
                <button className={styles.change}>Change Phone Number</button>
              </div>
            </div>

            {/* add step 2 inputs here or keep it simple for now */}
            <button className={styles.backButton} onClick={() => setStep(1)}>
              <ArrowLeft size={20} /> Back
            </button>
            <button className={styles.btnproceed} onClick={() => setStep(3)}>
              Proceed
            </button>
          </div>
        )}

        {step === 3 && (
          <div className={styles.form}>
            <h2 className={styles.formTitle}>Step 3: Confirmation</h2>
            <p className={styles.formSubtitle}>Final review and submit.</p>

            <button className={styles.backButton} onClick={() => setStep(2)}>
              <ArrowLeft size={20} /> Back
            </button>
            <button
              className={styles.btnproceed}
              onClick={() => alert("Submitted!")}
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
