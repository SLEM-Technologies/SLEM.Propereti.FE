import React, { useState } from 'react';
import styles from './SupportHistory.module.css';
import pending from "../../assets/icons/pending_dots.svg";
import notfunded from "../../assets/icons/not_funding.svg";
import msg from "../../assets/icons/sendmsg.svg";

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
                  <img
                    src={supportCase.status === 'Open' ? pending : notfunded}
                    alt={supportCase.status === 'Open' ? 'Pending' : 'Not Funded'}
                  />
                </div>
                <div className={styles.caseInfo}>
                  <h3 className={styles.caseTitle}>{supportCase.title}</h3>
                  <p className={styles.casePreview}>{supportCase.preview}</p>
                </div>
                <div className={styles.caseMetadata}>
                  <span className={styles.caseDate}>{supportCase.date}</span>
                  <span
                    className={`${styles.caseStatus} ${
                      supportCase.status === 'Open'
                        ? styles.statusOpen
                        : styles.statusClosed
                    }`}
                  >
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
          {[
            {
              id: 1,
              sender: 'Support Admin',
              message:
                'Welcome to RealSus.\nStart investing in the global and local stock markets.\n\nDownload on Google Playstore\nDownload on iOS App Store\n\nJoin RealSus Community\n\nAccess our FAQs\n\nRealSus Support hours: Mon. - Fri. (9 am - 5 pm)',
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
          ].map((msg) => (
            <div
              key={msg.id}
              className={`${styles.messageGroup} ${
                msg.isAdmin ? styles.adminGroup : styles.userGroup
              }`}
            >
              {!msg.isAdmin && <div className={styles.spacer}></div>}

              <div className={styles.messageContent1}>
                <div className={styles.messageHeader}>
                  <span className={styles.avatar}>{msg.avatar}</span>
                </div>
                <div
                  className={`${styles.messageCard} ${
                    msg.isAdmin ? styles.adminMessage : styles.userMessage
                  }`}
                >
                  <span className={styles.senderName}>{msg.sender}</span>
                  <p className={styles.messageText}>{msg.message}</p>
                </div>
              </div>

              {msg.isAdmin && <div className={styles.spacer}></div>}
            </div>
          ))}
        </div>

        <div className={styles.messageInput}>
          <div className={styles.messageInput1}>
            <input
              type="text"
              placeholder="Write a message"
              className={styles.textInput}
            />
            <button className={styles.sendButton}>
              <span className={styles.sendIcon}>
                <img src={msg} alt="" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportHistory;
