import Accordion from "@/common/interaction/Accordion";
import { IAccordionContent } from "@/common/models";
import { useState } from "react";

const COMMON_SYTLES = {
  list: "text-[0.8rem] md:text-sm list-disc list-inside ml-3 space-y-1",
};

interface IFaqType {
  label: string;
  value: string;
}

const faqTypes: IFaqType[] = [
  {
    label: "General Information",
    value: "general information",
  },
  {
    label: "Buying and Selling",
    value: "buy and sell",
  },
  {
    label: "Payments and Transactions",
    value: "payments and transactions",
  },
  {
    label: "Security and Compliance",
    value: "security and compliance",
  },
];

const generalFAQ: IAccordionContent[] = [
  {
    title: "What is the SLEM Technologies Real Estate Platform?",
    description: (
      <span>
        The SLEM Technologies Real Estate Platform is a digital marketplace
        designed for <strong>secure property transactions</strong>. Users can
        buy, sell, and manage real estate assets exclusively from{" "}
        <strong>trusted real estate companies,</strong> not agents.
      </span>
    ),
  },
  {
    title: "Who can use the platform?",
    description: (
      <span>
        The platform is open to{" "}
        <strong>
          individual buyers, investors, and real estate companies.
        </strong>{" "}
        Whether you're looking to purchase land, homes, or commercial
        properties, you can find verified listings here.{" "}
      </span>
    ),
  },
  {
    title: "What types of properties are available on the platform?",
    description: (
      <span>
        Users can browse and purchase{" "}
        <strong>
          lands, residential houses, commercial buildings, and investment
          properties
        </strong>{" "}
        listed by
        <strong>verified real estate companies.</strong>
      </span>
    ),
  },
  {
    title: "Can I use the platform if I’m not in Nigeria?",
    description: (
      <span>
        Yes, the platform is designed for both{" "}
        <strong>local and international investors</strong>. Users outside
        Nigeria can buy properties through the platform, provided they comply
        with local property ownership laws.
      </span>
    ),
  },
  {
    title: "How do I register on the platform?",
    description: (
      <span>
        To sign up, users must provide{" "}
        <strong>
          basic information, verify their identity, and complete account setup
        </strong>
        . Real estate companies go through an additional
        <strong> verification process</strong> before listing properties.
      </span>
    ),
  },
  {
    title: "Does the platform allow corporate buyers?",
    description: (
      <span>
        Yes, businesses, organizations, and{" "}
        <strong>real estate investment groups</strong> can create corporate
        accounts to purchase properties or list their own.
      </span>
    ),
  },
];

const buyAndSellFAQ: IAccordionContent[] = [
  {
    title: "How do I buy a property on the platform?",
    description: (
      <div>
        <h2>To buy a property, users must:</h2>
        <ul className={COMMON_SYTLES.list}>
          <li>Browse available listings.</li>
          <li>Select a property and view details.</li>
          <li>Choose a payment option (full payment or installment).</li>
          <li>Complete verification and payment.</li>
          <li>
            Receive digital documentation and property ownership confirmation.
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "Can I negotiate the price of a property?",
    description: (
      <span>
        Some real estate companies allow <strong>negotiation</strong>, while
        others list properties at fixed prices. Listings will indicate whether
        price negotiation is available.
      </span>
    ),
  },
  {
    title: "What are the payment options available?",
    description: (
      <div>
        <h2>Buyers can pay through:</h2>
        <ul className={COMMON_SYTLES.list}>
          <li>Bank transfer or card payment for full purchases.</li>
          <li>Installment plans offered by real estate companies.</li>
          <li>Choose a payment option (full payment or installment).</li>
          <li>Mortgage or financing options from partner banks.</li>
        </ul>
      </div>
    ),
  },
  {
    title: "What is the process for purchasing a property in installments?",
    description: (
      <ul className={COMMON_SYTLES.list}>
        <li>Select a property with an installment option.</li>
        <li>Agree to the payment plan and terms.</li>
        <li>Make the initial deposit.</li>
        <li>Follow the scheduled payment plan.</li>
        <li>Receive ownership documentation upon full payment.</li>
      </ul>
    ),
  },
  {
    title: "Can I resell a property I purchased on the platform?",
    description: (
      <span>
        Yes, users can resell properties they bought through the platform,
        either back to the real estate company or to another user.
      </span>
    ),
  },
  {
    title: " How does selling a property work?",
    description: (
      <ul className={COMMON_SYTLES.list}>
        <li>List the property for resale.</li>
        <li>Set the price or enable buyer offers.</li>
        <li>Receive offers from interested buyers.</li>
        <li>Finalize the sale and transfer ownership digitally.</li>
      </ul>
    ),
  },
];

const paymentsAndTractionsFAQ: IAccordionContent[] = [
  {
    title: "What payment methods are accepted on the platform?",
    description: (
      <div>
        <h2>We support multiple payment methods, including:</h2>
        <ul className={COMMON_SYTLES.list}>
          <li>Bank transfers</li>
          <li>Debit/credit cards</li>
          <li>Mobile money payments</li>
          <li>Cryptocurrency (if enabled by the real estate company)</li>
        </ul>
      </div>
    ),
  },
  {
    title: " Can I pay in installments?",
    description: (
      <span>
        Yes, if the real estate company allows it. Installment payments are
        structured based on the company’s terms and require an initial deposit.
      </span>
    ),
  },
  {
    title: "How do installment payments work?",
    description: (
      <div>
        <ul className={COMMON_SYTLES.list}>
          <li>Select a property with an installment option.</li>
          <li>Make an initial down payment</li>
          <li>Follow the agreed payment schedule.</li>
          <li>
            Receive full ownership documentation upon completing all payments.
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "What happens if I miss an installment payment?",
    description: (
      <div>
        <ul className={COMMON_SYTLES.list}>
          <li>Late fees may apply.</li>
          <li>
            A grace period may be provided (varies by real estate company).
          </li>
          <li>
            Continuous missed payments could result in contract termination and
            loss of the property.
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: " Are payments on the platform secure?",
    description: (
      <span>
        Yes, we use{" "}
        <strong>
          end-to-end encryption, fraud detection systems, and third-party
          payment gateways{" "}
        </strong>
        to ensure secure transactions.
      </span>
    ),
  },
  {
    title: "Can I request a refund after making a payment?",
    description: (
      <span>
        Refund policies are set by each real estate company. Some companies
        allow partial or full refunds within a specific period, while others do
        not allow refunds after payment confirmation.
      </span>
    ),
  },
];

const securityAndComplianceFAQ: IAccordionContent[] = [
  {
    title: "How does the platform ensure the security of my data?",
    description: (
      <span>
        <strong>
          end-to-end encryption, multi-factor authentication (MFA)
        </strong>
        , and <strong>secure cloud storage </strong> to protect user data from
        breaches and unauthorized access.
      </span>
    ),
  },
  {
    title: " Is my personal and payment information safe?",
    description: (
      <span>
        Yes, we comply with <strong>industry security standards </strong>
        (PCI-DSS for payments, GDPR for data protection) to ensure that all user
        information remains confidential and protected.
      </span>
    ),
  },
  {
    title: "How can I protect my account from unauthorized access?",
    description: (
      <div>
        <ul className={COMMON_SYTLES.list}>
          <li>
            Enable <strong>two-factor authentication (2FA).</strong>
          </li>
          <li>
            Use a <strong>strong, unique password.</strong>
          </li>
          <li>Avoid sharing your login details.</li>
          <li>Regularly update your security settings.</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Are the real estate companies verified?",
    description: (
      <div>
        <h2>
          Yes, every real estate company undergoes a strict verification
          process, including:
        </h2>
        <ul className={COMMON_SYTLES.list}>
          <li>
            <strong>Business registration checks.</strong>
          </li>
          <li>
            <strong>Physical property inspections.</strong>
          </li>
          <li>
            <strong>Compliance with real estate laws and regulations.</strong>
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "How does the platform prevent fraud?",
    description: (
      <div>
        <h2>We use:</h2>
        <ul className={COMMON_SYTLES.list}>
          <li>
            <strong>AI-powered fraud detection.</strong>
          </li>
          <li>
            <strong>Manual verification of sellers and buyers.</strong>
          </li>
          <li>
            <strong>Escrow services for secure transactions.</strong>
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "What should I do if I suspect fraud?",
    description: (
      <div>
        <h2>If you notice suspicious activity:</h2>
        <ul className={COMMON_SYTLES.list}>
          <li>
            <strong>Report the issue</strong> immediately through your
            dashboard.
          </li>
          <li>
            <strong>Contact customer support</strong> with details
          </li>
          <li>
            <strong>Freeze your account</strong> (if necessary) to prevent
            unauthorized actions.
          </li>
        </ul>
      </div>
    ),
  },
];

const FAQs: { [key: string]: IAccordionContent[] } = {
  "general information": generalFAQ,
  "buy and sell": buyAndSellFAQ,
  "payments and transactions": paymentsAndTractionsFAQ,
  "security and compliance": securityAndComplianceFAQ,
};

function FAQSection() {
  const [currentFAQ, setCurrentFAQ] = useState("general information");

  const handleFAQChange = (faqType: string) => {
    setCurrentFAQ(faqType);
  };

  return (
    <div className="w-full h-full bg-linear-to-t from-white to-secondary-100 md:pt-32">
      <div className="w-[70%] mx-auto flex flex-col justify-center items-center gap-y-8">
        <div className="space-y-2 text-center">
          <h2 className="text-primary-50 text-[1.1rem] leading-[35.48px] font-[700] md:leading-[60.48px] md:text-[1.8rem]">
            Frequently Asked Questions (FAQ)-{" "}
            <span className="capitalize">{currentFAQ}</span>
          </h2>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-[30%] flex flex-col gap-4">
            {faqTypes.map((type: IFaqType, index: number) => (
              <button
                key={index}
                onClick={() => handleFAQChange(type.value)}
                className={`text-base font-[500] md:text-[1.2rem] cursor-pointer ${
                  currentFAQ === type.value
                    ? "text-primary-100"
                    : "text-[#170F49]"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
          <div className="w-full md:w-[70%] flex flex-col gap-6">
            {FAQs[currentFAQ].map(
              (accordion: IAccordionContent, index: number) => (
                <Accordion content={accordion} key={index} />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQSection;
