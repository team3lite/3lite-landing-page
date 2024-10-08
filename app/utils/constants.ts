import {
  Binoculars,
  Home,
  Info,
  Layers,
  LockOpen,
  MessageCircle,
  Users,
} from "lucide-react";
import cardFastIcon from "../assets/images/perks/card-fast-icon.png";
import cardPrivacyIcon from "../assets/images/perks/card-privacy-icon.png";
import cardTransparentIcon from "../assets/images/perks/card-transparent-icon.png";

export const navLinks = [
  {
    name: "Home",
    link: "#home",
    icon: Home,
  },
  {
    name: "About",
    link: "#about",
    icon: Info,
  },
  {
    name: "Features",
    link: "#features",
    icon: Layers,
  },
  {
    name: "Join Community",
    link: "/",
    icon: Users,
  },
];

export const perks = [
  {
    title: "Blazing Fast Messaging",
    description:
      "Powered by the Sui Blockchain Experience lightning-fast messaging with Suift, where conversations flow as quickly and seamlessly as in real life. With the scalability and speed of the Sui Blockchain, your chats are instant and fluid, keeping communication smooth and uninterrupted",
    image: cardFastIcon,
  },
  {
    title: "Ultimate Privacy and Control",
    description:
      "Your Data, Your RulesSuift guarantees that your messages and data remain private and secure. Built on a decentralized platform, no third parties have access to monitor or sell your information. You have full control over your communications, ensuring complete privacy every time you connect.",
    image: cardPrivacyIcon,
  },
  {
    title: "Transparent Polling & Secure Wallet",
    description:
      "Seamless Voting and Easy Transactions; Suift makes voting and fund transfers effortless. Organize polls and track votes on the blockchain with absolute transparency, ensuring that results can be revisited at any time. With our integrated wallet, sending and receiving funds is as easy as sending a message—simply use a username to make secure transactions swiftly and safely.",
    image: cardTransparentIcon,
  },
];

export const displayCoreFeatures = [
  "Welcome to 3lite",
  "Secure Messaging for the Decentralized Future",
  "Start your Project’s journey with us",
];

export const testimonials = [
  {
    title: "Blazing Fast Messaging",
    description:
      "Powered by the Sui Blockchain Experience lightning-fast messaging with Suift, where conversations flow as quickly and seamlessly as in real life. With the scalability and speed of the Sui Blockchain, your chats are instant and fluid, keeping communication smooth and uninterrupted",
  },
  {
    title: "Ultimate Privacy and Control",
    description:
      "Your Data, Your RulesSuift guarantees that your messages and data remain private and secure. Built on a decentralized platform, no third parties have access to monitor or sell your information. You have full control over your communications, ensuring complete privacy every time you connect.",
  },
  {
    title: "Transparent Polling & Secure Wallet",
    description:
      "Seamless Voting and Easy Transactions; Suift makes voting and fund transfers effortless. Organize polls and track votes on the blockchain with absolute transparency, ensuring that results can be revisited at any time. With our integrated wallet, sending and receiving funds is as easy as sending a message—simply use a username to make secure transactions swiftly and safely.",
  },
];
