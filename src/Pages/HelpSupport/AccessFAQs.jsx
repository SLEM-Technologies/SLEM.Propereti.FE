import React, { useState } from "react";
import styles from "./AccessFAQs.module.css";
import downarr from "../../assets/icons/downarr.svg";
import uparr from "../../assets/icons/uparr.svg";

const AccessFAQs = () => {
  const [expandedItems, setExpandedItems] = useState({});

  const faqItems = [
    {
      id: 1,
      question: "We are here to help answer all possible questions",
      answer:
        "Our support team is available 24/7 to assist you with any questions or concerns you may have. We strive to provide comprehensive answers to help you get the most out of our platform.",
    },
    {
      id: 2,
      question: "We are here to help answer all possible questions",
      answer:
        "Our support team is available 24/7 to assist you with any questions or concerns you may have. We strive to provide comprehensive answers to help you get the most out of our platform.",
    },
    {
      id: 3,
      question: "We are here to help answer all possible questions",
      answer:
        "Our support team is available 24/7 to assist you with any questions or concerns you may have. We strive to provide comprehensive answers to help you get the most out of our platform.",
    },
    {
      id: 4,
      question: "How to get verified",
      answer:
        "To get verified on our platform, you need to complete the following steps: 1) Upload a valid government-issued ID, 2) Provide proof of address, 3) Complete the identity verification process, 4) Wait for our team to review your documents (usually takes 1-3 business days).",
      isExpanded: true,
    },
    {
      id: 5,
      question: "We are here to help answer all possible questions",
      answer:
        "Our support team is available 24/7 to assist you with any questions or concerns you may have. We strive to provide comprehensive answers to help you get the most out of our platform.",
    },
  ];

  const toggleExpanded = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const isExpanded = (id, defaultExpanded = false) => {
    return expandedItems.hasOwnProperty(id)
      ? expandedItems[id]
      : defaultExpanded;
  };

  return (
    <div className={styles.container}>
      <div className={styles.faqCard}>
        {faqItems.map((item) => (
          <div key={item.id} className={styles.faqItem}>
            <div
              className={styles.questionHeader}
              onClick={() => toggleExpanded(item.id)}
            >
              <h3 className={styles.question}>{item.question}</h3>
              <div
                className={`${styles.expandIcon} ${
                  isExpanded(item.id, item.isExpanded) ? styles.expanded : ""
                }`}
              >
                <img
                  src={isExpanded(item.id, item.isExpanded) ? uparr : downarr}
                  alt={
                    isExpanded(item.id, item.isExpanded) ? "Collapse" : "Expand"
                  }
                  className={styles.arrowIcon} // Optional for styling
                />
              </div>
            </div>

            {isExpanded(item.id, item.isExpanded) && (
              <div className={styles.answerContainer}>
                <div className={styles.answerDivider}></div>
                <p className={styles.answer}>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccessFAQs;
