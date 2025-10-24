import React, { useEffect, useState } from "react";
import Sidemenu from "../Components/Sidebar.jsx";
import Header from "../Components/Header.jsx";
import styles from "../Styles/dashboard.module.css";
import { Wallet, TrendingUp, MoreHorizontal } from "lucide-react";
import Wally from "../assets/icons/wally.svg";
import Port from "../assets/icons/Port.svg";
import { Link } from "react-router";

const Dashboard = () => {
  const recentViewUsers = [
    {
      name: "James Benny",
      message: "Hey, Let me know if you are still available",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      time: "2m",
    },
    {
      name: "William Chuntra",
      message: "Okay sure",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      time: "5m",
    },
    {
      name: "Henry David",
      message: "Alright I'll get back to you ASAP",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      time: "12m",
    },
    {
      name: "Charlotte Flair",
      message: "Sounds good buddy",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      time: "1h",
    },
  ];
  const [walletBalance, setWalletBalance] = useState(null);
  const [portfolioBalance, setPortfolioBalance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchBalances = async () => {
      // Start loading
      setIsLoading(true);

      // Ensure skeleton shows for at least 2 seconds
      const minLoadTime = new Promise((resolve) => setTimeout(resolve, 2000));

      try {
        // Try to use saved data first
        const storedWallet = localStorage.getItem("walletBalance");
        const storedPortfolio = localStorage.getItem("portfolioBalance");

        if (storedWallet && storedPortfolio) {
          setWalletBalance(storedWallet);
          setPortfolioBalance(storedPortfolio);
        }

        // Fetch fresh data (optional but recommended)
        const res = await http.get(`${BASE_URL}/api/v1/user/balances`);
        const newWallet = res.data?.data?.walletBalance ?? 0;
        const newPortfolio = res.data?.data?.portfolioBalance ?? 0;

        await minLoadTime; // wait at least 2 seconds

        if (isMounted) {
          setWalletBalance(newWallet);
          setPortfolioBalance(newPortfolio);

          // Update localStorage for next login
          localStorage.setItem("walletBalance", newWallet);
          localStorage.setItem("portfolioBalance", newPortfolio);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Error loading balances:", err);
        await minLoadTime; // still delay for skeleton
        if (isMounted) setIsLoading(false);
      }
    };

    fetchBalances();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      <Sidemenu />
      <Header />
      <div className={styles.dashboard}>
        {/* Profile Completion Section */}
        <div className={styles.profileSection}>
          <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
              <div className={styles.progressFill}></div>
            </div>
            <div className={styles.progressText}>
              <p className={styles.progressTitle}>
                Your profile is 40% complete.
              </p>
              <p className={styles.progressSubtitle}>
                <Link to="/signup/step-4">Please update your profile</Link>
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className={styles.mainGrid}>
          {/* Left Column */}
          <div className={styles.leftColumn}>
            {/* Balance Cards */}
            <div className={styles.balanceCards}>
              {/* Wallet Balance */}
              <div className={styles.balanceCard}>
                <div className={styles.cardIcon}>
                  <img src={Wally} alt="Wallet Icon" />
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>Wallet Balance</h3>
                  {isLoading ? (
                    <div className={styles.skeleton}></div>
                  ) : (
                    <p className={`${styles.cardAmount} ${styles.fadeIn}`}>
                      ₦{Number(walletBalance || 0).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>

              {/* Portfolio Balance */}
              <div className={styles.balanceCard}>
                <div className={styles.cardIcon}>
                  <img src={Port} alt="Portfolio Icon" />
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>Portfolio Balance</h3>
                  {isLoading ? (
                    <div className={styles.skeleton}></div>
                  ) : (
                    <p className={`${styles.cardAmount} ${styles.fadeIn}`}>
                      ₦{Number(portfolioBalance || 0).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className={styles.rightColumn}>
            {/* Recent View Section */}
            <div className={styles.recentView}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Recent View</h3>
                <MoreHorizontal className={styles.moreIcon} size={20} />
              </div>
              <div className={styles.userList}>
                {recentViewUsers.map((user, index) => (
                  <div key={index} className={styles.userItem}>
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className={styles.userAvatar}
                    />
                    <div className={styles.userInfo}>
                      <h4 className={styles.userName}>{user.name}</h4>
                      <p className={styles.userMessage}>{user.message}</p>
                    </div>
                    <span className={styles.userTime}>{user.time}</span>
                  </div>
                ))}
              </div>
              <div className={styles.mapView}>
                <div className={styles.sectionHeader}>
                  <h3 className={styles.sectionTitle}>Map View</h3>
                  <MoreHorizontal className={styles.moreIcon} size={20} />
                </div>
                <div className={styles.mapContainer}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d3.375295414770757!3d6.5276316452784755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1635959592890!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0, borderRadius: "12px" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Map View"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Map View Section */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
