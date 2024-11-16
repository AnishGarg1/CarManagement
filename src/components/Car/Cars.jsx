import React, { useEffect, useState } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCars } from '../../service/apiUtils/carAPIs';
import CarModalEdit from './CarModalEdit';

const Cars = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { carsList } = useSelector((state) => state.car);

  const [currCarList, setCurrCarList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showMoreList, setShowMoreList] = useState([]);
  const [showTags, setShowTags] = useState({}); // Track the show more state for tags
  const [carModalEdit, setCarModalEdit] = useState(false);
  const [carModalEditId, setCarModalEditId] = useState("");

  const handleClickShowMore = (idx) => {
    setShowMoreList((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const handleShowMoreTags = (idx) => {
    setShowTags((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    if (!keyword) {
      setCurrCarList(carsList);
      return;
    }
    const filteredCars = carsList.filter((car) => {
      const titleMatch = car.title.toLowerCase().includes(keyword.toLowerCase());
      const descriptionMatch = car.description && car.description.toLowerCase().includes(keyword.toLowerCase());
      const tagsMatch = car.tags && car.tags.some((tag) => tag.toLowerCase().includes(keyword.toLowerCase()));
      return titleMatch || descriptionMatch || tagsMatch;
    });
    setCurrCarList(filteredCars);
  };

  useEffect(() => {
    const fetchCarList = async () => {
      const fetchedCar = await getAllCars(token, dispatch);

      if (fetchedCar) {
        setCurrCarList(fetchedCar);
      }
    };

    fetchCarList();
  }, [dispatch, token, carModalEditId]);

  const stripHtmlTags = (html) => {
    return html.replace(/<[^>]*>?/gm, '');
  };

  const isLength = (description) => {
    return stripHtmlTags(description).length > 80;
  };

  const highlightText = (text, keyword) => {
    if (!keyword) return text;
    const regExp = new RegExp(`(${keyword})`, 'gi');
    return text.replace(regExp, `<mark class="bg-yellow-200">$1</mark>`);
  };

  return (
    <div className='w-full'>
      <div className='flex flex-col gap-2 w-11/12 mx-auto'>
        {/* Search Input */}
        <div className="w-full mb-4">
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by title, description, or tags"
            className="border rounded-md px-4 py-2 w-full"
          />
        </div>

        <div className='flex flex-col w-full gap-2'>
          <div className='flex w-full border-2 rounded-md py-1 gap-2 px-2 font-bold'>
            <div className='w-[20%]'>Title</div>
            <div className='w-[50%]'>Description</div>
            <div className='w-[20%] text-center'>Tags</div>
            <div className='w-[10%] text-center'>Action</div>
          </div>

          <div className='w-full space-y-2'>
            {
              currCarList.map((car, idx) => (
                <div
                  key={idx}
                  className='flex gap-2 border-2 w-full rounded-md py-1 px-2'
                >
                  <div className='w-[20%]'>
                    <Link to={`/car/${car._id}`}>
                      <p className='hover:text-white hover:underline transition-all ease-in-out duration-200'
                        dangerouslySetInnerHTML={{
                          __html: highlightText(car.title, searchKeyword)
                        }}
                      />
                    </Link>
                  </div>
                  <div className='w-[50%]'>
                    {
                      !car?.description 
                      ? (
                        <p>...</p>
                      ) : (
                        <p>
                          {showMoreList[idx] || !isLength(car.description)
                            ? <div dangerouslySetInnerHTML={{__html: car.description}} />
                            : `${stripHtmlTags(car.description).substring(0, 80)}...`
                          }

                          {(isLength(car.description)) && (
                            <button
                              onClick={() => handleClickShowMore(idx)}
                              className='text-xs text-white hover:text-teal-900'
                            >
                              {showMoreList[idx] ? "Show Less" : "Show More"}
                            </button>
                          )}
                        </p>
                      )
                    }
                  </div>
                  <div className='w-[20%] flex flex-col justify-center items-center'>
                    {/* Show tags here with a "Show More" button */}
                    <div className="flex gap-2 flex-wrap justify-center">
                      {car.tags && car.tags.slice(0, showTags[idx] ? car.tags.length : 3).map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="border-2 rounded-full px-2 py-1 text-xs text-black bg-gray-300"
                          dangerouslySetInnerHTML={{
                            __html: highlightText(tag, searchKeyword)
                          }}
                        />
                      ))}
                    </div>
                    {car.tags && car.tags.length > 3 && (
                      <button
                        onClick={() => handleShowMoreTags(idx)}
                        className='text-xs text-white hover:text-teal-900'
                      >
                        {showTags[idx] ? "Show Less" : "Show More"}
                      </button>
                    )}
                  </div>
                  <div className='w-[10%] flex gap-2 justify-center items-center md:gap-10'>
                    <button
                      onClick={() => navigate(`/car/${car._id}`)}
                    >
                      <FiEdit2
                        className='text-white hover:text-teal-300 hover:scale-110 transition-all duration-200'
                      />
                    </button>
                    <button>
                      <RiDeleteBin6Line
                        onClick={() => {
                          setCarModalEditId(car._id);
                          setCarModalEdit(true);
                        }}
                        className='text-white hover:text-red-800 hover:scale-110 transition-all duration-200'
                      />
                    </button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>

      {
        carModalEdit
        ? (
          <CarModalEdit
            carId={carModalEditId}
            setCarModalEdit={setCarModalEdit}
            setCarModalEditId={setCarModalEditId}
          />
        ) : (
          <></>
        )
      }
    </div>
  );
};

export default Cars;
