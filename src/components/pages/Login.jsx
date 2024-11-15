import React, { useState } from 'react'
import { login } from '../../service/apiUtils/authAPIs'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const { email, password } = formData;

    const handleChangeForm = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password, dispatch, navigate);
    }

  return (
    <div className='flex items-center justify-center mt-10'>
        <div className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full'>
            <h2 className='text-2xl font-semibold mb-4 text-center'>Login to Your Account</h2>
            <form
                onSubmit={handleSubmit}
                className='space-y-6'
            >
                <div>
                    <label
                        htmlFor='email'
                        className='text-sm block font-medium text-gray-700'
                    >
                        Email
                    </label>
                    <input
                        required
                        id='email'
                        type='text'
                        name='email'
                        value={email}
                        onChange={handleChangeForm}
                        placeholder='Enter email'
                        className='w-full border-2 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500'
                    />
                </div>
                <div>
                    <label
                        htmlFor='password'
                        className='text-sm block font-medium text-gray-700'
                    >
                        Password
                    </label>
                    <input
                        required
                        id='password'
                        type='password'
                        name='password'
                        value={password}
                        onChange={handleChangeForm}
                        placeholder='Enter Passowrd'
                        className='w-full border-2 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500'
                    />
                </div>
                <button
                    type='submit'
                    className='w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors focus:outline-none'
                >
                    Login
                </button>
            </form>
        </div>
    </div>
  )
}

export default Login