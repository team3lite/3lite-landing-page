import internetIcon from "@/assets/icons/internet.svg";
import messageIcon from "@/assets/icons/message.svg";
import circleBg from "@/assets/images/left-circle-bg.svg"
import Image from "next/image";
import Header from "./Header";

const CTA = () => {
    return (
        <section className='w-full md:mt-64'>
            <div className="relative w-full flex flex-col items-center justify-center space-y-3 px-5">

                <div className="absolute left-0">
                    <Image src={circleBg} className="w-[25rem]" alt="circle" />
                </div>

                <div className="">
                    <Header title="Join 3lite" />
                </div>
                <div className='bg-white rounded-3xl md:w-[39.5rem] py-16 px-16 space-y-5 relative z-10'>
                    <div className='text-black text-center'>
                        <h2 className="font-bold text-[30px] md:text-[45px] leading-[2rem] md:leading-[3rem]">Start your Project’s <br /> journey with us</h2>
                        <p className="text-sm">With a solid understanding of the Web3 world and a passion for excellence, I’m here to help projects succeed. Here’s why you should work with me:</p>
                    </div>
                    <div className="flex flex-col items-center justify-center md:flex-row gap-5">
                        <button className="w-[8rem] flex py-2 justify-center items-center gap-x-2 bg-[#C2C0F3]  rounded-lg text-brand">
                            <span>
                                Socials
                            </span>
                            <Image src={internetIcon} alt="internet" />
                        </button>
                        <button className="w-[8rem] flex py-2 justify-center items-center gap-x-2 bg-brand-light  rounded-lg">
                            <span>Book a Call</span>
                            <Image src={messageIcon} alt="message" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CTA