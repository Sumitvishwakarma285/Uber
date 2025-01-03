import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
        <div className=' bg-cover bg-[url(https://images.unsplash.com/photo-1557404763-69708cd8b9ce?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen w-full pt-8 flex justify-between flex-col'>
            <img className='w-16 ml-8' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" />
            <div className='bg-white pb-7 px-4 py-4'>
                <h2 className=' text-3xl font-bold'>Get Started with Uber</h2>
                <Link to='/userlogin' className=' flex justify-center w-full bg-black text-white py-3 rounded mt-5'>continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Home;