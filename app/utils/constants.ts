import {
  Binoculars,
  Home,
  Info,
  Layers,
  LockOpen,
  MessageCircle,
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
    name: "Reviews",
    link: "#reviews",
    icon: MessageCircle,
  },
  {
    name: "Chat",
    link: "/chat",
    icon: Binoculars,
  },
  {
    name: "Login",
    link: "/login",
    icon: LockOpen,
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
  "Welcome to Suift",
  "Privacy is a right, not a luxury",
  "Blazing Fast Messaging",
];

export const testimonials = [
  {
    name: "Josh Sparks",
    title: "Seamless Transactions!",
    description:
      "The wallet feature is a life-saver! I can send payments just as easily as sending a message—no complicated wallet addresses needed. Suift has made transactions simple and secure.",
  },
  {
    name: "Big Cee",
    title: "Totally Amazing!",
    description:
      "I’ve never felt more in control of my privacy. Suift's user-friendly design and blockchain-based security make it my go-to messaging app for all my personal and professional communications.",
  },
  {
    name: "Ugwu Chidi",
    title: "Unmatched Privacy and Speed",
    description:
      "Suift has completely changed how our team communicates. With top-notch privacy features and lightning-fast messaging, we can stay connected securely without any worries about data leaks!",
  },
];
