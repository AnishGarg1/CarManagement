import React from 'react'
import { useSelector } from 'react-redux'
import { deleteCar } from '../../service/apiUtils/carAPIs';

const CarModalEdit = ({ carId, setCarModalEdit, setCarModalEditId }) => {
    const { token } = useSelector((state) => state.auth);

    const handleClickCancel = () => {
        setCarModalEdit(false);
        setCarModalEditId("");
    }

    const handleClickDelete = async () => {
        await deleteCar(carId, token);
        setCarModalEdit(false);
        setCarModalEditId("");
    }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50'>
        <div className='bg-white rounded-lg shadow-lg p-6 w-[350px] max-w-md animate-fadeIn'>
            <div className='text-lg font-semibold mb-4'>Do you want to delete the car?</div>

            <div className='flex gap-2'>
                <button
                    className='flex-1 py-2 rounded-md text-white font-semibold bg-slate-700 hover:bg-slate-800 transition-colors'
                    onClick={handleClickCancel}
                >
                    Cancel
                </button>
                <button
                    className='flex-1 py-2 rounded-md text-white font-semibold bg-red-700 hover:bg-red-800 transition-colors'
                    onClick={handleClickDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    </div>
  )
}

export default CarModalEdit