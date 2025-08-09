import React, { useState } from 'react';
import styles from './SendMessage.module.css';

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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 18C7 18.5523 7.44772 19 8 19H16C16.5523 19 17 18.5523 17 18V11H19L12 4L5 11H7V18Z" fill="#4f46e5"/>
              <path d="M8 12H16V17H8V12Z" fill="#4f46e5"/>
            </svg>
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

