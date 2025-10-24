import React, { useState } from "react";
import styles from "../Styles/signup.module.css";
import Charticon from "../assets/icons/Pie chart _Isometric 2.svg";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { BASE_URL } from "../Components/API/API.js";
import { isValidEmail } from "../utils/validators";
import http, { tokenStore } from "../api/http";
import googlelogo from "../assets/icons/Google Logo.svg";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { ThemedSwal } from "../utils/ThemedSwal.js";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      ThemedSwal({
        icon: "warning",
        title: "Missing Fields",
        text: "Please enter both email and password.",
      });
      return;
    }
    if (!isValidEmail(formData.email)) {
      ThemedSwal({
        icon: "warning",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });
      return;
    }

    setIsLoading(true);

    http
      .post(`/api/v1/accounts/user-login`, {
        email: formData.email,
        password: formData.password,
        firstLogin: true,
      })
      .then((res) => {
        console.log("Login response:", res.data);

        const token = res.data?.data?.token;
        const refresh = res.data?.data?.refreshToken;
        if (!token) {
          ThemedSwal({
            icon: "error",
            title: "Login Failed",
            text: "No access token received from server.",
          });
          return;
        }

        // Save token
        tokenStore.access = token;
        if (refresh) tokenStore.refresh = refresh;
        localStorage.setItem("token", token);
        if (refresh) localStorage.setItem("refresh_token", refresh);

        ThemedSwal({
          icon: "success",
          title: "Login Successful",
          text: "Welcome back!",
          timer: 1500,
          showConfirmButton: false,
        });
        // Save balances
        const walletBalance = res.data?.data?.walletBalance || 0;
        const portfolioBalance = res.data?.data?.portfolioBalance || 0;

        localStorage.setItem("walletBalance", walletBalance);
        localStorage.setItem("portfolioBalance", portfolioBalance);

        // Decode token and route based on role
        try {
          const payloadBase64 = token.split(".")[1];
          const decodedPayload = JSON.parse(atob(payloadBase64));
          const userRole = decodedPayload?.Role;
          console.log("User Role:", userRole);

          if (userRole === "CompanyAdministrator") {
            navigate("/admin-properties");
          } else {
            navigate("/dashboard");
          }
        } catch (decodeError) {
          console.error("Failed to decode token:", decodeError);
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        ThemedSwal({
          icon: "error",
          title: "Login Failed",
          text: err?.response?.data?.message || "Invalid credentials.",
        });
      })
      .finally(() => setIsLoading(false));
  };

  const handleGoogleLogin = () => {
    const clientId = "YOUR_GOOGLE_CLIENT_ID";
    const redirectUri = "http://localhost:3000/auth/callback"; // or your hosted frontend URL
    const scope = "email profile openid";
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scope}`;

    // open popup
    const width = 500;
    const height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;

    const popup = window.open(
      authUrl,
      "Google Login",
      `width=${width},height=${height},top=${top},left=${left}`
    );

    // listen for auth response (needs your backend to redirect back to redirectUri with token)
    window.addEventListener("message", (event) => {
      if (event.data.type === "google-auth-success") {
        ThemedSwal({
          icon: "success",
          title: "Login successful!",
          text: `Welcome ${event.data.user.name}`,
        });
      } else if (event.data.type === "google-auth-error") {
        ThemedSwal({
          icon: "error",
          title: "Login failed",
          text: "Please try again.",
        });
      }
    });
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
        <div className={styles.rightSide_1}>
          <h2 className={styles.formTitle}>Login</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email address"
                className={styles.input}
                id="login-email"
                aria-label="Email address"
              />
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className={styles.input}
                  id="login-password"
                  aria-label="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.eyeButton}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {isLoading && (
              <div className={styles.spinnerWrapper}>
                <div className={styles.spinner}></div>
              </div>
            )}

            <button
              type="submit"
              className={styles.btnproceed_on}
              aria-label="Login"
            >
              Login
            </button>

            <p className={styles.or}>or</p>

            <div className={styles.inputGroup}>
              <div className={styles.googleWrapper} onClick={handleGoogleLogin}>
                <img src={googlelogo} alt="Google logo" />
                <p>Continue with Google</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
