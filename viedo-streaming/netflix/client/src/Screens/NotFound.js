import React from 'react'
import { Link } from 'react-router-dom'
import { BiHomeAlt } from 'react-icons/bi'

const NotFound = () => {
    return (
        <div className='flex-colo gap-8 w-full min-h-screen text-white bg-main lg:py-20 py-10 px-6'>
            <img className='w-full h-96 object-contain' src="/images/notfound.png" alt="not found" />
            <h1 className='lg:text-4xl font-bold'>Page Not Found</h1>
            <p className='font-medium text-border italic leading-6'>
                The Page You Are Looking For Does Not Exist. You May Have Mistyped The URL.
            </p>
            <Link to='/' className='bg-subMain text-white hover:text-main transitions flex-rows gap-4 font-medium py-3 px-4 rounded-md'>
                <BiHomeAlt /> Back Home
            </Link>
        </div>
    )
}

export default NotFound