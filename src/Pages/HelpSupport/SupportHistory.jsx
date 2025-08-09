import React, { useState } from 'react';
import styles from './SupportHistory.module.css';

const SupportHistory = () => {
  const [selectedCase, setSelectedCase] = useState('case1');

  const supportCases = [
    {
      id: 'case1',
      title: 'Wallet not funding',
      date: '27, Jan 2020',
      preview: "I'm having issues with funding wallet, money has left my account, but no value seen on my wallet...",
      status: 'Open'
    },
    {
      id: 'case2',
      title: 'Wallet not funding',
      date: '27, Jan 2020',
      preview: "I'm having issues with funding wallet, money has left my account, but no value seen on my wallet...",
      status: 'Closed'
    }
  ];

  const chatMessages = [
    {
      id: 1,
      sender: 'Support Admin',
      message: 'Welcome to RealSus.\nStart investing in the global and local stock markets.\n\nDownload on Google Playstore\nDownload on iOS App Store\n\nJoin RealSus Community\n\nAccess our FAQs\n\nRealSus Support hours: Mon. - Fri. (9 am - 5 pm)',
      isAdmin: true,
      avatar: '🔵'
    },
    {
      id: 2,
      sender: 'Olowu Oluwatobi',
      message: 'Any update?',
      isAdmin: false,
      avatar: '🟡'
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <h2 className={styles.panelTitle}>View Open and Closed Support Cases</h2>
        
        <div className={styles.casesList}>
          {supportCases.map((supportCase) => (
            <div 
              key={supportCase.id}
              className={`${styles.caseItem} ${
                selectedCase === supportCase.id ? styles.selectedCase : ''
              }`}
              onClick={() => setSelectedCase(supportCase.id)}
            >
              <div className={styles.caseHeader}>
                <div className={styles.caseIcon}>
                  {supportCase.status === 'Open' ? '💬' : '✅'}
                </div>
                <div className={styles.caseInfo}>
                  <h3 className={styles.caseTitle}>{supportCase.title}</h3>
                  <p className={styles.casePreview}>{supportCase.preview}</p>
                </div>
                <div className={styles.caseMetadata}>
                  <span className={styles.caseDate}>{supportCase.date}</span>
                  <span className={`${styles.caseStatus} ${
                    supportCase.status === 'Open' ? styles.statusOpen : styles.statusClosed
                  }`}>
                    {supportCase.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.rightPanel}>
        <div className={styles.chatHeader}>
          <h2 className={styles.chatTitle}>Wallet not funding</h2>
        </div>

        <div className={styles.chatContainer}>
          {chatMessages.map((msg) => (
            <div key={msg.id} className={styles.messageGroup}>
              <div className={styles.messageHeader}>
                <span className={styles.avatar}>{msg.avatar}</span>
                <span className={styles.senderName}>{msg.sender}</span>
              </div>
              <div className={`${styles.messageCard} ${
                msg.isAdmin ? styles.adminMessage : styles.userMessage
              }`}>
                <p className={styles.messageText}>{msg.message}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.messageInput}>
          <input 
            type="text" 
            placeholder="Write a message"
            className={styles.textInput}
          />
          <button className={styles.sendButton}>
            <span className={styles.sendIcon}>📤</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupportHistory;

