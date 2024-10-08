import React from 'react'
import Header from './Header'

const NewFeatures = () => {
    return (
        <div className='w-full flex justify-center'>
            <div className="md:w-2/3 container px-5 md:px-0 pt-16 space-y-2">
                <div>
                    <Header title="Features" />
                </div>
                <div>
                    <h3 className='font-semibold leading-[2rem] md:leading-[3.5rem] font-inter text-3xl md:text-[65px]'>Secure Messaging for the <br className='hidden md:block' /> Decentralized Future</h3>
                    <p>Building a decentralized world with the future of secure world of messaging for both new users and old users</p>
                </div>
            </div>
        </div>
    )
}

export default NewFeatures