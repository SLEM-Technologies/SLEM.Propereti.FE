import React from "react";
import styles from "../Styles//signup.module.css"; // uses same styles

const PropertySteps = ({ currentStep }) => {
  return (
    <div className={styles.stepBarContainer}>
      {[1, 2, 3].map((step) => (
        <div
          key={step}
          className={`${styles.stepBar} ${
            currentStep >= step ? styles.activeStepBar : ""
          }`}
        ></div>
      ))}
    </div>
  );
};

export default PropertySteps;
