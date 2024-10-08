import React from 'react'

const Header = ({ title }) => {
    return (
        <div className='bg-[#D9D9D9]/10 w-[5rem] flex items-center justify-center border border-[#D1D1D1] rounded-full'>
            <p className='text-[B7B4FF] text-sm'>{title}</p>
        </div>
    )
}

export default Header