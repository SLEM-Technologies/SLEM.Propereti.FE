import React, { useState } from "react";
import styles from "../Styles/Contact.module.css";
import Horheader from "../Components/Horheader";
import InstallmentIMg from "../assets/images/key-customers.png";
import InstallmentIMg2 from "../assets/images/key-customers.png";
import { ChevronDown, Mail, Phone, MapPin } from "lucide-react";
import ForFooter from "../Components/ForFooter.jsx";

const Contact = () => {
  const data = [
    {
      title: "Buying and Selling Process",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      title: "Rental Terms",
      content:
        "Here are the conditions that apply when renting a property with us. Please contact support for more clarification.",
    },
    {
      title: "Payment Options",
      content:
        "We support bank transfers, credit card payments, and installment plans. Talk to our team for custom payment schedules.",
    },
    {
      title: "Legal Documentation",
      content:
        "All transactions are backed with appropriate legal documents. You can consult our legal team before signing.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className={styles.contactBody}>
      <Horheader />

      <section className={styles.section_one}>
        <div className={styles.hero_one}>
          <div className={styles.text_one}>
            <h3>
              We are here to provide solutions for all your Real Estate
              problems.
            </h3>
            <p>
              Lorem ipsum dolor sit amet consectetur. Commodo mauris erat ipsum
              habitasse. Consectetur fringilla sed elementum at ac pharetra est
              pellentesque.
            </p>
            <button className={styles.btn_one}>Get Started</button>
          </div>
          <div className={styles.imageContainer}>
            <img
              className={styles.img_one}
              src={InstallmentIMg}
              alt="Customer"
            />
            <img
              className={styles.img_two}
              src={InstallmentIMg2}
              alt="Customer"
            />
          </div>
        </div>
      </section>

      <section className={styles.section_two_b}>
        <div className={styles.middle}>
          <h3>Frequently Asked Questions</h3>
          <p>
            Founded in 2010, [Company Name] has been a trusted name in the real
            estate industry, helping thousands of clients buy, sell, and rent
            properties across Nigeria.
          </p>
        </div>

        <div className={styles.container}>
          {data.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`${styles.item} ${isOpen ? styles.open : ""}`}
                onClick={() => toggle(index)}
              >
                <div className={styles.header}>
                  <h3>{item.title}</h3>
                  <div
                    className={`${styles.icon} ${isOpen ? styles.rotate : ""}`}
                  >
                    <ChevronDown size={20} />
                  </div>
                </div>
                {isOpen && item.content && (
                  <div className={styles.content}>{item.content}</div>
                )}
              </div>
            );
          })}
        </div>
      </section>
      <section className={styles.contactSection}>
        <div className={styles.left}>
          <h2>Let's talk with us</h2>
          <p>
            Questions, comments, or suggestions? Simply fill in the form and
            we’ll be in touch shortly.
          </p>

          <div className={styles.info}>
            <div className={styles.infoItem}>
              <MapPin size={18} className={styles.icon} />
              <span>
                <strong>1055 Arthur ave Elk Groot, 67.</strong>
                <br />
                New Palmas South Carolina.
              </span>
            </div>
            <div className={styles.infoItem}>
              <Phone size={18} className={styles.icon} />
              <strong>+1 234 678 9108 99</strong>
            </div>
            <div className={styles.infoItem}>
              <Mail size={18} className={styles.icon} />
              <strong>Contact@moralizer.com</strong>
            </div>
          </div>
        </div>

        <form className={styles.form}>
          <div className={styles.row}>
            <input type="text" placeholder="First Name*" required />
            <input type="text" placeholder="Last Name*" required />
          </div>
          <input type="email" placeholder="Email*" required />
          <input type="tel" placeholder="Phone Number*" required />
          <textarea placeholder="Your message..." rows={4} />
          <button type="submit">Send</button>
        </form>
      </section>
      <footer>
        <ForFooter />
      </footer>
    </div>
  );
};

export default Contact;
