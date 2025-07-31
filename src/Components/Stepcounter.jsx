import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../Styles/signup.module.css";

const steps = [
  "Account",
  "Verification",
  "Verified",
  "Bank Details",
  "Upload ID",
  "Finish",
];

const stepIndexToPath = {
  4: "/signup/step-4",
  5: "/signup/step-5",
  6: "/signup/step-6",
};

const pathToStepIndex = {
  "/signup": 1, // Steps 1–3 handled in one component via state
  "/signup/step-4": 4,
  "/signup/step-5": 5,
  "/signup/step-6": 6,
};

const SignupSteps = ({ setStep }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const currentStep = pathToStepIndex[currentPath] || 1;

  return (
    <div className={styles.progressBar}>
      {steps.map((label, i) => {
        const stepNumber = i + 1;

        return (
          <React.Fragment key={i}>
            <div className={styles.step}>
              <div
                className={`${styles.stepCircle} ${
                  currentStep >= stepNumber ? styles.active : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (stepNumber <= 3) {
                    setStep(stepNumber);
                    navigate("/signup");
                  } else {
                    navigate(stepIndexToPath[stepNumber]);
                  }
                }}
              >
                {stepNumber}
              </div>
              <span>{label}</span>
            </div>
            {i < steps.length - 1 && <div className={styles.stepLine}></div>}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default SignupSteps;
