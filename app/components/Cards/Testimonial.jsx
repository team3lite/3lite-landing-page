import React from 'react'

const Testimonial = ({ title, name, description }) => {
    return (
        <div className='w-[600px] bg-[#2B264480]/20 rounded-2xl border-[1px] border-gray-200 px-8 py-5'>
            <div className='w-full flex flex-col gap-y-7'>
                <div className='flex flex-col gap-y-2'>
                    <h2 className='text-center text-[30px] font-medium text-white'>{title}</h2>
                    <p className='text-[18px] text-white text-center font-normal leading-[24.3px]'>{description}</p>
                </div>
                <div className='w-full flex justify-center'>
                    <span className='text-[25px] text-center text-white font-medium'>{name}</span>
                </div>
            </div>
        </div>
    )
}

// embla__slide
export default Testimonial