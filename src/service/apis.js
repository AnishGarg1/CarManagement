const BASE_URL = process.env.REACT_APP_BASE_URL

// Auth Endpoints
export const authEndpoints = {
    LOGIN_API: BASE_URL + "/auth/login",
    SIGNUP_API: BASE_URL + "/auth/signup",
}

// Task Endpoints
export const carEndpoints = {
    CREATE_CAR_API: BASE_URL + "/car/createCar",
    GET_CAR_API: BASE_URL + "/car/getCar",
    GET_ALL_CARS_API: BASE_URL + "/car/getAllCars",
    UPDATE_CAR_API: BASE_URL + "/car/updateCar",
    DELETE_CAR_API: BASE_URL + "/car/deleteCar",
}