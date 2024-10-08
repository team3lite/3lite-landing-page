import React from "react";
import HeroComponent from "../components/HeroEdited";

import Testimonials from "../components/Testimonials";

import NewFeatures from "../components/NewFeatures";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

const OPTIONS = { loop: true }
// const SLIDE_COUNT = 5
// const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const Homepage = () => {
  return (
    <div className="text-white w-screen overflow-x-hidden">
      <HeroComponent />

      <NewFeatures />

      <Testimonials options={OPTIONS} />
      <CTA />
      <Footer />
    </div>
  );
};

export default Homepage;
