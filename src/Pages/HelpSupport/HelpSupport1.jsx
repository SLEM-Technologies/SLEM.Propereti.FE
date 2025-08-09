import React, { useState } from 'react';
import styles from './HelpSupport.module.css';
import AccessFAQs from './AccessFAQs';
import SendMessage from './SendMessage';
import SupportHistory from './SupportHistory';

const HelpSupport = () => {
  const [activeTab, setActiveTab] = useState('sendMessage');

  const tabs = [
    { id: 'accessFAQs', label: 'Access FAQs' },
    { id: 'sendMessage', label: 'Send Message' },
    { id: 'supportHistory', label: 'Support History' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'accessFAQs':
        return <AccessFAQs />;
      case 'sendMessage':
        return <SendMessage />;
      case 'supportHistory':
        return <SupportHistory />;
      default:
        return <SendMessage />;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabNavigation}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tabButton} ${
              activeTab === tab.id ? styles.activeTab : ''
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className={styles.tabContent}>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default HelpSupport;

