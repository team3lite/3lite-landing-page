"use client";
import { useState } from "react";
import FaqItem from "./FaqItem";

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const messages = [
    {
      id: 1,
      question: "What makes Suift different from traditional messaging apps?",
      answer:
        "Suift is a decentralized messaging app built on the Sui Blockchain, ensuring complete privacy and user control. Unlike traditional apps, your data isn't accessible to any third parties for surveillance or sale. Additionally, Suift offers lightning-fast messaging, transparent voting, and seamless financial transactions using usernames.",
    },
    {
      id: 2,
      question: "How does the username-based wallet work?",
      answer:
        "The username-based wallet is a unique feature of Suift that allows users to send and receive cryptocurrency using only their username. This makes it easy for users to transact with each other without having to remember long and complicated wallet addresses. The wallet is built on the Sui Blockchain, which ensures that all transactions are secure and transparent.",
    },
    {
      id: 3,
      question: "Are my messages and data really private?",
      answer:
        "Yes, all messages and data sent through Suift are encrypted end-to-end, which means that only the sender and receiver can read them. This ensures that your conversations are private and secure. Additionally, Suift is built on the Sui Blockchain, which means that your data is stored securely and cannot be accessed by any third parties.",
    },
    {
      id: 4,
      question: "Is Suift available on both mobile and desktop?",
      answer:
        "Yes, Suift is available on both mobile and desktop. You can download the Suift app from the App Store or Google Play Store, or access it through your web browser. This allows you to stay connected with your friends and family no matter where you are.",
    },
  ];

  return (
    <div className="faq w-full mt-10 px-[30px] sm:px-[70px] lg:px-[120px] ">
      <div className="  flex-col justify-start w-full items-start gap-5 inline-flex">
        {messages.map((message, index) => {
          //handle the question and answer
          return (
            <FaqItem
              key={index}
              message={message}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FaqSection;
