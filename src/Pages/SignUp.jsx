import React, { useState, useRef, useEffect } from "react";
import styles from "../Styles/signup.module.css";
import Charticon from "../assets/icons/Pie chart _Isometric 2.svg";
import Swal from "sweetalert2";
import verifiedImg from "../assets/images/undraw_completed_ngx6 2.png";
import { Link, useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import { BASE_URL } from "../Components/API/API.js";
import http from "../api/http";
import { isValidEmail, isStrongPassword, isPhone } from "../utils/validators";
import SignupSteps from "../Components/Stepcounter.jsx";

import { ArrowLeft, Eye, EyeOff, ChevronDown } from "lucide-react";

const SignUp = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef();

  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [countryList, setCountryList] = useState([]);

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

    // If country is selected, update phone code automatically
    if (name === "country") {
      const selected = countryList.find((c) => c.name === value);
      if (selected) {
        setFormData((prev) => ({
          ...prev,
          country: value,
          phoneCode: selected.dialCode,
        }));
        return;
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const inputsRef = useRef([]);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;

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

    http
      .post(`/api/v1/accounts/verify-email`, {
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
  const [isLoading, setIsLoading] = useState(false);

  const resendOTP = () => {
    http
      .post(`/api/v1/accounts/register-user`, {
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

  const Spinner = () => (
    <div className={styles.spinnerWrapper}>
      <div className={styles.spinner}></div>
    </div>
  );

  useEffect(() => {
    http
      .get("/api/v1/countries/get-all-countries")
      .then((res) => {
        console.log("Countries response:", res.data);

        const countries = res?.data?.data || [];
        setCountryList(countries);

        // Default Nigeria if present
        const nigeria = countries.find((c) => c.name === "Nigeria");
        if (nigeria) {
          setFormData((prev) => ({
            ...prev,
            country: nigeria.name,
            phoneCode: nigeria.dialCode,
          }));
        }
      })
      .catch((err) => {
        console.error("Error fetching countries:", err.response?.data || err);
      });
  }, []);

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
          <ArrowLeft size={20} />
          Back
        </button>

        <div className={styles.progressBar}>
          <SignupSteps currentStep={step} />
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

                const fieldNames = {
                  firstName: "First Name",
                  surname: "Surname",
                  email: "Email",
                  phoneNumber: "Phone Number",
                  gender: "Gender",
                  dob: "Date of Birth",
                  address: "Residential Address",
                  password: "Password",
                  confirmPassword: "Confirm Password",
                };

                const emptyFields = requiredFields.filter(
                  (field) => !formData[field]
                );

                if (emptyFields.length > 0) {
                  const missingFieldsText = emptyFields
                    .map((f) => fieldNames[f] || f)
                    .join(", ");

                  setIsLoading(false);
                  Swal.fire({
                    title: "Missing Fields",
                    text: `Please fill out the following field(s): ${missingFieldsText}.`,
                    icon: "warning",
                  });
                  return;
                }

                if (!isValidEmail(formData.email)) {
                  setIsLoading(false);
                  Swal.fire({
                    title: "Invalid Email",
                    text: "Please enter a valid email address.",
                    icon: "warning",
                  });
                  return;
                }

                if (!isPhone(formData.phoneNumber)) {
                  setIsLoading(false);
                  Swal.fire({
                    title: "Invalid Phone",
                    text: "Please enter a valid phone number.",
                    icon: "warning",
                  });
                  return;
                }

                if (!isStrongPassword(formData.password)) {
                  setIsLoading(false);
                  Swal.fire({
                    title: "Weak Password",
                    text: "Password must be 8+ chars incl. upper, lower, digit and symbol.",
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
                // DOB check (no future birthdays)
                if (formData.dob && new Date(formData.dob) > new Date()) {
                  setIsLoading(false);
                  Swal.fire({
                    title: "Invalid Date of Birth",
                    text: "Date of birth cannot be in the future.",
                    icon: "warning",
                  });
                  return;
                }

                // normalize phone to E.164
                const cleanedPhone = formData.phoneNumber.replace(/\s|-/g, "");
                const phoneWithoutLeadingZeros = cleanedPhone.replace(
                  /^0+/,
                  ""
                );
                const normalizedPhone = cleanedPhone.startsWith("+")
                  ? cleanedPhone
                  : `${formData.phoneCode}${phoneWithoutLeadingZeros}`;

                // then send the request with normalizedPhone
                // --- Replace your existing http.post(...).then(() => { /* ... */ }) with this:

                http
                  .post(`/api/v1/accounts/register-user`, {
                    email: formData.email,
                    password: formData.password,
                    phoneNumber: normalizedPhone,
                    username: formData.email.split("@")[0],
                    firstName: formData.firstName,
                    lastName: formData.surname,
                    dob: formData.dob,
                    address: formData.address,
                    nationality: formData.country,
                    gender: formData.gender,
                    refCode: formData.referralCode || "",
                  })
                  .then((res) => {
                    // Helpful debug log — remove in production if you like
                    console.log(
                      "Registration success response:",
                      res?.data ?? res
                    );

                    // Show success alert using server-provided message if available
                    const message =
                      res?.data?.message ||
                      res?.data?.data?.message ||
                      "Registration successful. A verification code has been sent to your email.";

                    Swal.fire({
                      title: "Registration Successful",
                      text: message,
                      icon: "success",
                      confirmButtonText: "OK",
                    }).then(() => {
                      // move to verification step (OTP input)
                      setStep(2);

                      // optional: focus first OTP input after short delay
                      setTimeout(() => {
                        inputsRef.current[0]?.focus();
                      }, 100);
                    });
                  })
                  .catch((err) => {
                    console.error(
                      "Registration error response:",
                      err?.response ?? err
                    );
                    Swal.fire({
                      title: "Registration Failed",
                      text:
                        err?.response?.data?.message ||
                        JSON.stringify(err?.response?.data) ||
                        "Something went wrong.",
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
              {/* <div className={styles.inputGroup}>
                <div className={styles.selectWrapper}>
                  <span className={styles.flag}>🇳🇬</span>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className={styles.select}
                  >
                    {countryList.map((country) => (
                      <option key={country.id} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>

                  <ChevronDown size={16} className={styles.selectIcon} />
                </div>
              </div> */}

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
                    aria-label="First name"
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
                    aria-label="Surname"
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
                  aria-label="Email address"
                />
                {/* <span className={styles.errorIcon}>!</span> */}
              </div>

              {/* Phone Number */}
              <div className={styles.phoneRow}>
                <div className={styles.inputGroup}>
                  <div className={styles.selectWrapper}>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={(e) => {
                        const selected = countryList.find(
                          (c) => c.name === e.target.value
                        );
                        setFormData({
                          ...formData,
                          country: selected?.name || "",
                          phoneCode: selected?.dialCode || "",
                        });
                      }}
                    >
                      <option value="">
                        {countryList.length
                          ? "Select a country"
                          : "Loading countries..."}
                      </option>
                      {countryList.map((country) => (
                        <option key={country.id} value={country.name}>
                          {country.name} ({country.dialCode})
                        </option>
                      ))}
                    </select>

                    <ChevronDown size={16} className={styles.selectIcon} />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    className={styles.input}
                    aria-label="Phone number"
                  />
                </div>
              </div>

              {/* Gender and DOB */}
              <div className={styles.nameRow}>
                <div className={styles.inputGroup}>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className={styles.input}
                    aria-label="Gender"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    placeholder="Date of Birth"
                    className={styles.input}
                    aria-label="Date of birth"
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
                  aria-label="Residential address"
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
                  aria-label="Referral code"
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
                    aria-label="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={styles.eyeButton}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
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

              <button
                className={styles.btnproceed}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Proceed"}
              </button>

              <p className={styles.ptag}>
                Already have an account ? <Link to="/login">Login</Link>
              </p>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className={styles.form}>
            <div className={styles.container1}>
              <h2 className={styles.title1}>Verify Phone Number</h2>
              <p className={styles.subtitle1}>
                A six-digit code has been sent to the inputted email address
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
              </div>

              <button className={styles.backButton} onClick={() => setStep(1)}>
                <ArrowLeft size={20} /> Back
              </button>
              <button className={styles.btnproceed} onClick={verifyEmail}>
                Verify
              </button>
            </div>
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
                Your Email and Phone number has been verified. You can proceed
                to the dashboard or click continue to complete your profile.
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
                  onClick={() => navigate("/signup/step-4")}
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
      </div>
    </div>
  );
};

export default SignUp;
