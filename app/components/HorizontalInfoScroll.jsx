import React from 'react'
import { displayCoreFeatures } from '../utils/constants'

import zapIcon from '../assets/icons/zap.svg'
import Image from 'next/image'

const HorizontalInfoScroll = () => {
    return (
        <div className="scroll-container bg-white/10 py-3 backdrop:blur-sm">
            <div className="scroll-content">
                {/* Add your horizontally scrolling content here */}

                {
                    displayCoreFeatures.concat(displayCoreFeatures).map((feature, index) => (
                        <div key={index} className='scroll-item'>
                            <div className="flex items-center gap-x-5">
                                <Image src={zapIcon} className='h-[40px] w-[30px]' alt='zap-icon' />
                                <p className='text-[40px] text-white/20 font-medium leading-[67.5px]'>{feature}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default HorizontalInfoScroll