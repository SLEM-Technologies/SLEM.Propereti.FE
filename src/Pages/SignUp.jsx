import React, { useState, useRef } from "react";
import styles from "../Styles/signup.module.css";
import Charticon from "../assets/icons/Pie chart _Isometric 2.svg";
import Swal from "sweetalert2";
import verifiedImg from "../assets/images/undraw_completed_ngx6 2.png";
import { Link, useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import { BASE_URL } from "../Components/API/API.js";
import axios from "axios";

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
  const navigate = useNavigate();

  const steps = [
    "Account",
    "Verification",
    "...",
    "Bank Details",
    "Upload ID",
    "Finish",
  ];
  const [step, setStep] = useState(1);
  const fileInputRef = useRef();

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
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return; // Only allow digits

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value.length === 1 && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };
  const verifyEmail = () => {
    const otpCode = otp.join("");
    if (otpCode.length < 6) {
      Swal.fire({
        title: "Invalid Code",
        text: "Please enter the complete 6-digit code.",
        icon: "warning",
      });
      return;
    }

    axios
      .post(`${BASE_URL}/api/v1/accounts/verify-email`, {
        email: formData.email,
        otpCode: otpCode,
      })
      .then(() => {
        Swal.fire({
          title: "Verified!",
          text: "Email verification successful.",
          icon: "success",
        });
        setStep(3);
      })
      .catch((err) => {
        Swal.fire({
          title: "Verification Failed",
          text: err?.response?.data?.message || "Invalid OTP.",
          icon: "error",
        });
      });
  };

  const [accounts, setAccounts] = useState([{ account: "", bvn: "" }]);

  const handleAccountChange = (index, field, value) => {
    const updated = [...accounts];
    updated[index][field] = value;
    setAccounts(updated);
  };

  const addAccount = () => {
    setAccounts([...accounts, { account: "", bvn: "" }]);
  };
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const resendOTP = () => {
    axios
      .post(`${BASE_URL}/api/v1/accounts/register-user`, {
        email: formData.email,
      })
      .then(() => {
        Swal.fire({
          title: "OTP Sent",
          text: "A new OTP has been sent to your email.",
          icon: "info",
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Failed",
          text: err?.response?.data?.message || "Could not resend OTP.",
          icon: "error",
        });
      });
  };
  const [isLoading, setIsLoading] = useState(false);
  const Spinner = () => (
    <div className={styles.spinnerWrapper}>
      <div className={styles.spinner}></div>
    </div>
  );

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
          <ArrowLeft size={20} />
          Back
        </button>

        <div className={styles.progressBar}>
          {steps.map((label, i) => (
            <React.Fragment key={i}>
              <div className={styles.step}>
                <div
                  className={`${styles.stepCircle} ${
                    step >= i + 1 ? styles.active : ""
                  }`}
                >
                  {i + 1}
                </div>
                <span>{label}</span>
              </div>
              {i < steps.length - 1 && <div className={styles.stepLine}></div>}
            </React.Fragment>
          ))}
        </div>

        {step === 1 && (
          <div className={styles.formContainer}>
            <form
              className={styles.form}
              onSubmit={(e) => {
                e.preventDefault();
                setIsLoading(true);

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
                  setIsLoading(false);
                  Swal.fire({
                    title: "Incomplete Form",
                    text: "Please fill out all required fields before proceeding.",
                    icon: "warning",
                  });
                  return;
                }

                if (formData.password !== formData.confirmPassword) {
                  setIsLoading(false);
                  Swal.fire({
                    title: "Password Mismatch",
                    text: "Passwords do not match.",
                    icon: "error",
                  });
                  return;
                }

                axios
                  .post(`${BASE_URL}/api/v1/accounts/register-user`, {
                    email: formData.email,
                    password: formData.password,
                    phoneNumber: formData.phoneNumber,
                    username: formData.email.split("@")[0],
                    firstName: formData.firstName,
                    lastName: formData.surname,
                    dob: formData.dob,
                    address: formData.address,
                    nationality: formData.country,
                    gender: formData.gender,
                    refCode: formData.referralCode || "",
                  })
                  .then(() => {
                    Swal.fire({
                      title: "Success!",
                      text: "Registration successful. Please verify your email.",
                      icon: "success",
                      timer: 1500,
                      showConfirmButton: false,
                    });
                    setStep(2);
                  })
                  .catch((err) => {
                    Swal.fire({
                      title: "Registration Failed",
                      text:
                        err?.response?.data?.message || "Something went wrong.",
                      icon: "error",
                    });
                  })
                  .finally(() => setIsLoading(false));
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
                {/* <span className={styles.errorIcon}>!</span> */}
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
              {isLoading && <Spinner />}

              <button className={styles.btnproceed} type="submit">
                Proceed
              </button>
              <p className={styles.ptag}>Already have an account ? <Link to="/login">Login</Link></p>
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
                <button className={styles.resend} onClick={resendOTP}>
                  Resend OTP
                </button>
                <button className={styles.change}>Change Phone Number</button>
              </div>
            </div>

            {/* add step 2 inputs here or keep it simple for now */}
            <button className={styles.backButton} onClick={() => setStep(1)}>
              <ArrowLeft size={20} /> Back
            </button>
            <button className={styles.btnproceed} onClick={verifyEmail}>
              Verify
            </button>
          </div>
        )}

        {step === 3 && (
          <div className={styles.form}>
            <div className={styles.container3}>
              <img
                src={verifiedImg}
                alt="Verified illustration"
                className={styles.imag3}
              />
              <h1 className={styles.title3}>Congratulation</h1>
              <p className={styles.message3}>
                Your Email and Phone number has been verified, you can proceed
                to the dashboard or click continue to complete your profile
              </p>
              <div className={styles.buttonGroup}>
                <button className={styles.dashboardBtn}>Dashboard</button>
                <button
                  className={styles.btnproceed}
                  onClick={() => setStep(step + 1)}
                >
                  Continue
                </button>
              </div>
            </div>
            <button className={styles.backButton} onClick={() => setStep(2)}>
              <ArrowLeft size={20} /> Back
            </button>
          </div>
        )}

        {step === 4 && (
          <div className={styles.form}>
            <div className={styles.container4}>
              <h2 className={styles.title4}>Fill in Bank Details</h2>
              <p className={styles.description4}>
                Bank Details is required for you to withdraw you funds when
                need. BVN is also required to verify your bank details as well
                as compliance purposes
              </p>

              {accounts.map((item, index) => (
                <div key={index} className={styles.nameRow1}>
                  <div className={styles.inputGroup}>
                    <select
                      className={styles.input}
                      value={item.account}
                      onChange={(e) =>
                        handleAccountChange(index, "account", e.target.value)
                      }
                    >
                      <option value="">Account</option>
                      <option value="gtb">GTBank</option>
                      <option value="zenith">Zenith Bank</option>
                      <option value="access">Access Bank</option>
                      {/* Add more as needed */}
                    </select>
                  </div>
                  <div className={styles.inputGroup}>
                    <input
                      type="text"
                      placeholder="Enter BVN"
                      className={styles.input}
                      value={item.bvn}
                      onChange={(e) =>
                        handleAccountChange(index, "bvn", e.target.value)
                      }
                    />
                  </div>
                </div>
              ))}

              <p className={styles.addMore} onClick={addAccount}>
                ＋ Add more account
              </p>

              <div className={styles.buttonGroup}>
                <button className={styles.dashboardBtn}>Cancel</button>
                <button
                  className={styles.btnproceed}
                  onClick={() => setStep(step + 1)}
                >
                  Continue
                </button>
              </div>

              <p className={styles.skipText}>
                Click Cancel to skip onboarding process and continue to
                dashboard
              </p>
            </div>
          </div>
        )}
        {step === 5 && (
          <div className={styles.form}>
            <div className={styles.container4}>
              <h2 className={styles.title4}>Upload Identity Document </h2>
              <p className={styles.description4}>
                You can upload any Identity document from the options below,
                However some require front and back upload. This will help us
                identify that this is you!
              </p>

              {accounts.map((item, index) => (
                <div key={index} className={styles.nameRow1}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>
                      Select Identification Document type
                    </label>
                    <select
                      className={styles.input}
                      value={item.account}
                      onChange={(e) =>
                        handleAccountChange(index, "account", e.target.value)
                      }
                    >
                      <option value="">International Passport</option>
                      <option value="gtb">ID Card</option>
                      <option value="zenith">Drivers Liscence </option>
                      <option value="access">National Card</option>
                      {/* Add more as needed */}
                    </select>
                  </div>
                  <div className={styles.inputGroup1}>
                    <input
                      type="text"
                      placeholder="ID number"
                      className={styles.input}
                      value={item.bvn}
                      onChange={(e) =>
                        handleAccountChange(index, "bvn", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      placeholder="Expiry Date"
                      className={styles.input}
                      value={item.bvn}
                      onChange={(e) =>
                        handleAccountChange(index, "bvn", e.target.value)
                      }
                    />
                  </div>
                </div>
              ))}

              <div className={styles.buttonGroup}>
                <button className={styles.dashboardBtn}>Cancel</button>
                <button
                  className={styles.btnproceed}
                  onClick={() => setStep(step + 1)}
                >
                  Proceed
                </button>
              </div>

              <p className={styles.skipText}>
                Click Cancel to skip onboarding process and continue to
                dashboard
              </p>
            </div>
          </div>
        )}
        {step === 6 && (
          <div className={styles.form}>
            <div className={styles.container4}>
              <h2 className={styles.title4}>
                Upload Proof of Address Document{" "}
              </h2>
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
                      value={item.bvn}
                      onChange={(e) =>
                        handleAccountChange(index, "bvn", e.target.value)
                      }
                    />
                  </div>
                  <div className={styles.inputGroup1}>
                    <input
                      type="text"
                      placeholder="State"
                      className={styles.input}
                      value={item.bvn}
                      onChange={(e) =>
                        handleAccountChange(index, "bvn", e.target.value)
                      }
                    />
                  </div>
                  <div className={styles.inputGroup1}>
                    <input
                      type="text"
                      placeholder="City"
                      className={styles.input}
                      value={item.bvn}
                      onChange={(e) =>
                        handleAccountChange(index, "bvn", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      placeholder=" Postal Code"
                      className={styles.input}
                      value={item.bvn}
                      onChange={(e) =>
                        handleAccountChange(index, "bvn", e.target.value)
                      }
                    />
                  </div>
                  <label className={styles.label}>
                    Select Proof of Address Document type
                  </label>
                  <div className={styles.inputGroup}>
                    <select
                      className={styles.input}
                      value={item.account}
                      onChange={(e) =>
                        handleAccountChange(index, "account", e.target.value)
                      }
                    >
                      <option value="">Bank Statement</option>
                      <option value="gtb">Card</option>
                    </select>
                  </div>
                  <div
                    className={styles.container6}
                    onClick={() =>
                      fileInputRef.current && fileInputRef.current.click()
                    }
                  >
                    <p className={styles.text}>Proof of Address Document</p>
                    <FaCamera className={styles.icon} />
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                    />
                  </div>
                </div>
              ))}

              <div className={styles.buttonGroup}>
                <button className={styles.dashboardBtn}>Cancel</button>
                <button
                  className={styles.btnproceed}
                  onClick={() => setStep(step + 1)}
                >
                  Proceed
                </button>
              </div>

              <p className={styles.skipText}>
                Click Cancel to skip onboarding process and continue to
                dashboard
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
