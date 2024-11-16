import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CiEdit } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { getCar, updateCar } from '../../service/apiUtils/carAPIs'; // Assuming getCar and updateCar functions exist

const Car = () => {
    const { carId } = useParams(); // Get carId from URL params
    const { token } = useSelector((state) => state.auth); // Assuming you have token in auth state
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [currCar, setCurrCar] = useState(null); // State to store the car data
    const [iSEditTitle, setIsEditTitle] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDesc, setEditedDesc] = useState('');
    const [tags, setTags] = useState([]); // State to store tags
    const [images, setImages] = useState([]); // State for images
    const [isUpdated, setIsUpdated] = useState(false);

    // Fetch car data by carId
    useEffect(() => {
        const fetchCar = async () => {
            try {
                const result = await getCar(carId, token); // Fetch car data using carId and token
                if (result) {
                    setCurrCar(result); // Save the fetched car data in state
                    setEditedTitle(result.title);
                    setEditedDesc(result.description);
                    setTags(result.tags || []);
                    setImages(result.images || []);
                }
            } catch (error) {
                console.error('Error fetching car details:', error);
            }
        };
        fetchCar();
    }, [carId, token]); // Re-fetch if carId or token changes

    // Handle title edit
    const handleEditTitle = (e) => {
        setEditedTitle(e.target.value);
        if (e.target.value.trim() !== '' && e.target.value.trim() !== currCar.title) {
            setIsUpdated(true);
        } else {
            setIsUpdated(false);
        }
    };

    // Handle description edit
    const handleEditDescription = (value) => {
        setEditedDesc(value);
        if (value.trim() !== "<p><br></p>" && value !== currCar.description) {
            setIsUpdated(true);
        } else {
            setIsUpdated(false);
        }
    };

    // Handle tag input and addition (either by Enter or comma)
    const handleTagInput = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault(); // Prevent default behavior to avoid comma being inserted into the input
            const value = e.target.value.trim();
            
            // If the value is not empty and not already in the tags, add it
            if (value && !tags.includes(value)) {
                setTags([...tags, value]);
                e.target.value = ''; // Clear the input field after adding the tag
                setIsUpdated(true);
            }
        }
    };

    // Handle image upload
    const handleImageUpload = (e) => {
        const files = e.target.files;
        if (files.length + images.length <= 10) {
            setImages(prevImages => {
                const newImages = [...prevImages, ...Array.from(files)];
                return newImages;
            });
            setIsUpdated(true);
        } else {
            alert('You can only upload up to 10 images.');
        }
    };

    // Handle image removal
    const handleImageRemove = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
        setIsUpdated(true);
    };

    // Handle cancel edit
    const handleClickCancel = () => {
        setIsEditTitle(false);
        setEditedTitle(currCar.title);
        setEditedDesc(currCar.description);
        setTags(currCar.tags || []);
        setImages(currCar.images || []);
        setIsUpdated(false);
    };

    // Handle save changes
    const handleClickSave = async () => {
        const updatedCar = {
            ...currCar,
            title: editedTitle,
            description: editedDesc,
            tags,
            newImages: images,  // Assuming images are file objects, convert to filenames
        };

        const result = await updateCar({ carId, ...updatedCar }, token, dispatch);
        if (result) {
            setCurrCar(result);
            navigate('/dashboard');
        }
        setIsUpdated(false);
    };

    // Handle tag removal
    const handleTagRemove = (tag) => {
        setTags(tags.filter((item) => item !== tag));
        setIsUpdated(true);
    };

    // Render the component only when car data is available
    if (!currCar) {
        return <div>Loading...</div>; // Show loading message while car data is being fetched
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto mt-8 animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
                {iSEditTitle ? (
                    <input
                        type="text"
                        value={editedTitle}
                        className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 focus:outline-none"
                        onChange={handleEditTitle}
                        onBlur={() => setIsEditTitle(false)}
                        autoFocus
                        placeholder="Type the car name here..."
                    />
                ) : (
                    <h1
                        className="text-2xl font-bold text-gray-800 cursor-pointer"
                        onClick={() => setIsEditTitle(true)}
                    >
                        {editedTitle || "Type the car name here..."}
                    </h1>
                )}
                <CiEdit
                    className="text-2xl text-gray-500 cursor-pointer hover:text-gray-700 transition-all"
                    onClick={() => setIsEditTitle(true)}
                />
            </div>

            <div className="mb-4">
                <label htmlFor="tags" className="block text-sm font-medium text-gray-600 mb-1">
                    Tags (e.g., car_type, company, dealer)
                </label>
                <input
                    type="text"
                    id="tags"
                    placeholder="Enter tags, separated by commas"
                    onKeyDown={handleTagInput}
                    className="w-full p-2 border rounded-md"
                />
                <div className="mt-2 flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                        <div
                            key={index}
                            className="flex items-center bg-gray-200 text-gray-700 px-3 py-1 rounded-full"
                        >
                            {tag}
                            <button
                                onClick={() => handleTagRemove(tag)}
                                className="ml-2 text-red-500"
                            >
                                <CiEdit className="text-xs" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-600 mb-1">Images</label>
                <div className="flex items-center justify-between gap-2 mb-2">
                    {/* Custom file input wrapper */}
                    <label htmlFor="file-upload" className="w-full p-4 border rounded-md cursor-pointer flex justify-center items-center gap-2 hover:bg-gray-100">
                        <CiEdit className="text-2xl text-gray-500" /> {/* Edit Icon */}
                        <span className="text-gray-500">Click or drag to upload images</span>
                        <input
                            id="file-upload"
                            type="file"
                            multiple
                            accept="image/*"  // Restrict file types to images
                            onChange={handleImageUpload}
                            className="hidden" // Hide the default file input
                        />
                    </label>
                </div>

                {/* Display uploaded images */}
                <div className="mt-2 flex flex-wrap gap-2">
                    {images.length > 0 &&
                        images.map((img, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={img instanceof File ? URL.createObjectURL(img) : img} // Check if it’s a file object or URL
                                    alt="car-img"
                                    className="w-24 h-24 object-cover rounded-md"
                                />
                                <button
                                    onClick={() => handleImageRemove(index)}
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                >
                                    <CiEdit className="text-xs" /> {/* Edit Icon for removal */}
                                </button>
                            </div>
                        ))}
                </div>
            </div>

            <div className="mb-6">
                <textarea
                    value={editedDesc}
                    onChange={(e) => handleEditDescription(e.target.value)}
                    className="w-full p-4 border rounded-md"
                    placeholder="Add a description here..."
                    rows="5"
                />
            </div>

            <div className="flex justify-between mt-6">
                <button
                    onClick={handleClickCancel}
                    className="text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                    Cancel
                </button>
                <div className="flex gap-4">
                    <button
                        onClick={handleClickSave}
                        disabled={!isUpdated}
                        className="bg-blue-500 text-white py-2 px-4 rounded-md disabled:bg-gray-400"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Car;
