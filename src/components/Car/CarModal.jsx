import React, { useEffect, useState } from 'react'
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createCar } from '../../service/apiUtils/carAPIs';

const CarModal = ({ setIsModalOpen }) => {
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [title, setCurrTitle] = useState("");
    const [isCreate, setIsCreate] = useState(false);

    const handleChangeTitle = (e) => {
        setCurrTitle(e.target.value);
    }

    const handleClickCancel = () => {
        setCurrTitle("");
        setIsCreate(false);
    }

    const handleClickSave = async () => {
        const result = await createCar({ title }, token);
        navigate(`/car/${result._id}`)
        setCurrTitle("");
        setIsModalOpen(false);
    }

    useEffect(() => {
        if(title.trim() !== ""){
            setIsCreate(true);
        }
        else{
            setIsCreate(false);
        }
    }, [title])

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50'>
        <div className='bg-white rounded-lg shadow-lg p-6 w-[350px] max-w-md animate-fadeIn'>
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-semibold'>Create Car</h2>
                <IoIosCloseCircleOutline
                    className='cursor-pointer text-2xl text-gray-500 hover:text-red-600 transition-colors' 
                    onClick={() => {
                        setIsCreate(false);
                        setCurrTitle("");
                        setIsModalOpen(false)
                    }}
                />
            </div>
            <div className='mb-4'>
                <label 
                    htmlFor='title'
                    className='block text-sm font-medium text-gray-700'
                >
                    Title
                </label>
                <input
                    type='text'
                    value={title}
                    className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    placeholder='Type the car name...'
                    onChange={handleChangeTitle}
                    autoFocus
                />
            </div>

            <div className='flex gap-2'>
                <button
                    className={`flex-1 py-2 rounded-md text-white font-semibold transition-all ${
                        isCreate ? "bg-red-500 hover:bg-red-600" : "bg-gray-800 bg-opacity-50 cursor-not-allowed"}`
                    }
                    onClick={handleClickCancel}
                    disabled={!isCreate}
                >
                    Cancel
                </button>
                <button
                    className={`flex-1 py-2 rounded-md text-white font-semibold transition-all ${
                        isCreate ? "bg-green-500 hover:bg-green-600" : "bg-gray-800 bg-opacity-50 cursor-not-allowed"}`
                    }
                    onClick={handleClickSave}
                    disabled={!isCreate}
                >
                    Create
                </button>
            </div>
        </div>
    </div>
  )
}

export default CarModal