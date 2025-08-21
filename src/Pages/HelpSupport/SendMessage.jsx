import React, { useState } from 'react';
import styles from './SendMessage.module.css';
import Upload from "../../assets/icons/save.svg"

const SendMessage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [message, setMessage] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);

  const categories = [
    'Technical Issues',
    'Account Problems',
    'Billing Questions',
    'Feature Requests',
    'General Support'
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Form submitted:', {
      category: selectedCategory,
      message: message,
      file: uploadedFile
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <h2 className={styles.title}>Our Support Staff will respond with the hour</h2>
        
        <div className={styles.divider}></div>
        
        <div className={styles.formGroup}>
          <select
            className={styles.dropdown}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <div className={styles.dropdownIcon}>▼</div>
        </div>

        <div className={styles.formGroup}>
          <textarea
            className={styles.textarea}
            placeholder="Describe your issue"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
          />
        </div>

        <div className={styles.uploadSection}>
          <div className={styles.uploadIcon}>
      <img src={Upload} alt="/" />
          </div>
          <label className={styles.uploadLabel}>
            Upload picture if any
            <input
              type="file"
              className={styles.fileInput}
              onChange={handleFileUpload}
              accept="image/*"
            />
          </label>
          {uploadedFile && (
            <span className={styles.fileName}>{uploadedFile.name}</span>
          )}
        </div>

        <button className={styles.submitButton} onClick={handleSubmit}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SendMessage;

