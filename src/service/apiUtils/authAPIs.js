import toast from "react-hot-toast";
import { setToken, setUser } from "../../redux/slices/authSlice";
import { setCarsList } from "../../redux/slices/carSlice";
import { apiConnect } from "../apiConnect";
import { authEndpoints } from "../apis";

const {
    SIGNUP_API,
    LOGIN_API,
} = authEndpoints;

export const signup = async (firstName, lastName, email, password, navigate) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnect(
            "POST",
            SIGNUP_API,
            {
                firstName,
                lastName,
                email,
                password,
            }
        );
        console.log("SIGNUP API RESPONSE.....", response);
        
        if(!response?.data?.success){
            toast.error(response?.data?.message);
            throw new Error("Error");
        }

        result = response.data.user;
        toast.success("Account Created");
        navigate("/login");
    } catch (error) {
        console.log("SIGNUP API ERROR:", error);
    }
    toast.dismiss(toastId);
    return result;
}

export const login = async (email, password, dispatch, navigate) => {
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnect(
            "POST",
            LOGIN_API,
            {
                email,
                password,
            },
        )
        console.log("LOGIN API RESPONSE.....", response);

        if(!response?.data?.success){
            throw new Error("Error");
        }
        dispatch(setToken(response.data.token));
        dispatch(setUser(response.data.user));
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("user", JSON.stringify(response.data.user));
        toast.success("Login Successful");
        navigate("/dashboard");
    } catch (error) {
        toast.error(error?.response?.data?.message);
        console.log("LOGIN_API Error:", error);
    }
    toast.dismiss(toastId);
}

export function logout(dispatch, navigate) {
    dispatch(setToken(null));
    dispatch(setCarsList([]));
    localStorage.removeItem("token");
    toast.success("Logged Out");
    navigate("/");
}