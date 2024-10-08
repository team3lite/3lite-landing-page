import overlay1 from "@/assets/images/hero-overlay-1.svg"
import overlay2 from "@/assets/images/hero-overlay-2.svg"
import Image from "next/image"

import React from 'react'

const HeroOverlay = () => {
  return (
    <div className="relative h-[400px] flex justify-center ">
      <div className="absolute z-[50] left-0">
        <Image src={overlay1} alt="light top overlay" />
      </div>
      <div className="dotted hidden md:block absolute h-[250px] right-0">
        <Image src={overlay2} alt="dotted overlay" />
      </div>

    </div>
  )
}

export default HeroOverlay