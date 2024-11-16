import toast from "react-hot-toast";
import { apiConnect } from "../apiConnect";
import { setCarsList } from "../../redux/slices/carSlice";
import { carEndpoints } from "../apis";

const {
    CREATE_CAR_API,
    GET_CAR_API,
    GET_ALL_CARS_API,
    UPDATE_CAR_API,
    DELETE_CAR_API,
} = carEndpoints;

export const createCar = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnect(
            "POST",
            CREATE_CAR_API,
            data,
            {
                Authorization: `Bearer ${token}`
            }
        );
        console.log("CREATE CAR API RESPONSE.....", response);

        if (!response?.data?.success) {
            toast.error(response?.data?.message);
            throw new Error("Error");
        }
        result = response.data.car;
        toast.success("Car Created Successfully");
    } catch (error) {
        console.log("CREATE CAR API ERROR:", error);
        toast.error("Something went wrong");
    }
    toast.dismiss(toastId);
    return result;
};

export const getCar = async (carId, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnect(
            "POST",
            GET_CAR_API,
            {
                carId,
            },
            {
                Authorization: `Bearer ${token}`
            }
        );
        console.log("GET CAR API RESPONSE.....", response);

        if (!response?.data?.success) {
            toast.error(response.data.message);
            throw new Error("Error");
        }
        result = response.data.car;
    } catch (error) {
        console.log("GET CAR API ERROR:", error);
        toast.error("Something went wrong");
    }
    toast.dismiss(toastId);
    return result;
};

export const getAllCars = async (token, dispatch) => {
    let result = [];
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnect(
            "GET",
            GET_ALL_CARS_API, 
            null,
            {
                Authorization: `Bearer ${token}`
            }
        );
        console.log("GET ALL CARS API RESPONSE.....", response);

        if (!response?.data?.success) {
            toast.error(response?.data?.message);
            throw new Error("Error");
        }
        result = response.data.allCars;
        dispatch(setCarsList(result));
    } catch (error) {
        console.log("GET ALL CARS API Error:", error);
        toast.error("Something went wrong");
    }
    toast.dismiss(toastId);
    return result;
};

export const updateCar = async (data, token, dispatch) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnect(
            "PUT",
            UPDATE_CAR_API,
            data,
            {   
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        );
        console.log("UPDATE CAR API RESPONSE.....", response);

        if (!response.data.success) {
            toast.error(response?.data?.message);
            throw new Error("Error");
        }

        result = response.data.car;
        toast.success("Car Updated Successfully");
    } catch (error) {
        console.log("UPDATE CAR API ERROR:", error);
        toast.error("Something went wrong");
    }
    toast.dismiss(toastId);
    return result;
};

export const deleteCar = async (carId, token) => {
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnect(
            "DELETE",
            DELETE_CAR_API,
            { carId },
            {
                Authorization: `Bearer ${token}`
            }
        );
        console.log("DELETE CAR API RESPONSE.....", response);

        if (!response?.data?.success) {
            toast.error(response?.data?.message);
            throw new Error("Error");
        }

        toast.success("Car Deleted Successfully");
    } catch (error) {
        console.log("DELETE CAR API ERROR:", error);
        toast.error("Something went wrong");
    }
    toast.dismiss(toastId);
};
