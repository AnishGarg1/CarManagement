import React, { useState } from 'react'
import { PiCarProfileLight } from "react-icons/pi";
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../service/apiUtils/authAPIs'

const Navbar = () => {
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isLogOpen, setIsLogOpen] = useState(false);
    
    const handleClickLog = () => {
        logout(dispatch, navigate);
        setIsLogOpen(false);
    }

    const handleClickCancel = () => {
        setIsLogOpen(false);
    }
    
  return (
    <div className='flex mx-10 md:w-3/4 md:mx-auto justify-center items-center border bg-black bg-opacity-20 py-2 mt-10 rounded-lg'>
        <div className='flex items-center h-full w-full mx-3 px-1 justify-between md:w-11/12'>
            <Link to={"/"}>
                <div className='flex justify-center items-center gap-1 hover:text-white hover:scale-110 transition-all duration-200'>
                    <PiCarProfileLight className='text-2xl' />
                    <p>
                        Car Management App
                    </p>
                </div>
            </Link>
            <div className='flex gap-5'>
                <Link to={"/"}>
                    <p
                        className='relative group hover:text-white'
                    >
                        Home
                        <span className='absolute bottom-0 left-1/2 w-0 h-[2px] bg-white transition-all duration-300 ease-out group-hover:w-full group-hover:left-0'></span>
                    </p>
                </Link>

                <Link to={"/contact"}>
                    <p
                        className='relative group hover:text-white'
                    >
                        Contact
                        <span className='absolute bottom-0 left-1/2 w-0 h-[2px] bg-white transition-all duration-300 ease-out group-hover:w-full group-hover:left-0'></span>
                    </p>
                </Link>

                <Link to={"/about"}>
                    <p
                        className='relative group hover:text-white'
                    >
                        About Us
                        <span className='absolute bottom-0 left-1/2 w-0 h-[2px] bg-white transition-all duration-300 ease-out group-hover:w-full group-hover:left-0'></span>
                    </p>
                </Link>
            </div>
            {token ? (
                <div className='flex gap-3'>
                    <button
                        onClick={() => navigate("/dashboard")}
                        className='relative group hover:text-white'
                    >
                        Dashboard
                        <span className='absolute bottom-0 left-1/2 w-0 h-[2px] bg-white transition-all duration-300 ease-out group-hover:w-full group-hover:left-0'></span>
                    </button>            
                    <button
                        onClick={() => setIsLogOpen(true)}
                        className='relative group hover:text-white'
                    >
                        Logout
                        <span className='absolute bottom-0 left-1/2 w-0 h-[2px] bg-white transition-all duration-300 ease-out group-hover:w-full group-hover:left-0'></span>
                    </button>            
                </div>
            ): (
                <div className='flex gap-3'>
                    <button
                        onClick={() => navigate("/login")}
                        className='relative group hover:text-white'
                    >
                        Login
                        <span className='absolute bottom-0 left-1/2 w-0 h-[2px] bg-white transition-all duration-300 ease-out group-hover:w-full group-hover:left-0'></span>
                    </button>
                    <button
                        onClick={() => navigate("/signup")}
                        className='relative group hover:text-white'
                    >
                        Signup
                        <span className='absolute bottom-0 left-1/2 w-0 h-[2px] bg-white transition-all duration-300 ease-out group-hover:w-full group-hover:left-0'></span>
                    </button>
                </div>
            )}
        </div>
        
        {isLogOpen
        ? (
            <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50'>
                <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md animate-fadeIn">
                    <div
                        className='text-xl font-semibold text-gray-800 mb-4' 
                    >
                        Do you want to logout?
                    </div>

                    <div className='flex gap-2'>
                        <button
                            className='flex-1 py-2 rounded-md border border-gray-300 text-gray-800 font-semibold bg-white hover:bg-gray-500 transition-colors'
                            onClick={handleClickCancel}
                        >
                            Cancel
                        </button>
                        <button
                            className='flex-1 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-800 transition-colors'
                            onClick={handleClickLog}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        ) : (
            <></>
        )}
    </div>
  )
}

export default Navbar