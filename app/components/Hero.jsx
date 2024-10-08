import React from 'react'
import bgImage from "../assets/images/hero-bg.png"
import Image from 'next/image'
import Navbar from './Navbar'
import HorizontalInfoScroll from './HorizontalInfoScroll'
import blockImage from '../assets/images/block.png'

const Hero = () => {
    return (
        <section className='w-full h-[150dvh]'>
            <div className="w-full h-full">
                <div className="relative h-full w-full">
                    <div className="absolute w-full h-full">
                        <Image src={bgImage} alt="hero-bg" layout="fill" objectFit="cover" />
                    </div>
                    <div className="relative w-full h-full z-10">
                        <div>
                            <Navbar />
                        </div>
                        <div className='flex flex-col gap-y-7 mt-5'>
                            <h2 className='text-[70px] leading-[79px] font-normal text-center capitalize gradient-text'>
                                Revolutionizing <br />
                                Messaging with privacy <br />
                                & speed
                            </h2>
                            <p className='text-white leading-[32.4px] text-[24px] font-normal text-center'>Experience secure, decentralized <br /> communication built on the Sui Blockchain</p>
                        </div>
                        <div className='mt-[10rem]'>
                            <HorizontalInfoScroll />
                        </div>

                        <div className='w-full flex justify-center my-20'>
                            <div className='w-[70%] h-full flex bg-gradient-to-r from-[#B779F533] to-[#8547F61A] rounded-2xl'>
                                <div className='w-1/2 px-4 flex items-center gap-x-5'>
                                    <div>
                                        <Image src={blockImage} className='w-[178px] h-[174px]' alt='block image' />
                                    </div>
                                    <div className="flex flex-col gap-y-2">
                                        <h2 className='text-[23px] leading-[32.2px] font-medium'>Give You 100% Privacy</h2>
                                        <p className='text-[18px] leading-[24.3px] font-normal'>Give You 100% Security. <br />
                                            Give You 100% Security</p>
                                    </div>
                                </div>

                                <div className='w-1/2 px-4 flex justify-between items-center gap-x-5 border-l-[1px] border-gray-100'>
                                    <div>
                                        <h1 className='text-[80px] font-medium'>90%</h1>
                                    </div>
                                    <div className="flex flex-col gap-y-2">
                                        <h2 className='text-[23px] leading-[32.2px] font-medium'>Give You 100% Security</h2>
                                        <p className='text-[18px] leading-[24.3px] font-normal'>Give You 100% Security. Give You 100% Security</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero