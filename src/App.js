import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home";
import Error from "./components/pages/Error";
import Navbar from "./components/Navbar";
import OpenRoute from "./components/Auth/OpenRoute";
import PrivateRoute from "./components/Auth/PrivateRoute";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Dashboard from "./components/Dashboard";
import Car from "./components/Car/Car";

function App() {
  return (
    <div className="w-screen min-h-screen flex flex-col bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradient-x">
      {/* <div className="absolute inset-0 bg-black opacity-10"></div> */}
      
      <Navbar/>

      <Routes>
        <Route path='/' element={<Home/>}/>

        <Route 
          path='/login' 
          element={
            <OpenRoute>
              <Login/>
            </OpenRoute>
          }
        />
        
        <Route 
          path='/signup' 
          element={
            <OpenRoute>
              <Signup/>
            </OpenRoute>
          }
        />
        
        <Route 
          path='/dashboard' 
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }
        />
        
        <Route 
          path='/car/:carId' 
          element={
            <PrivateRoute>
              <Car/>
            </PrivateRoute>
          }
        />
        
        <Route path='/contact' element={<div className='w-full flex justify-center border-2'>Contact</div>}/>
        <Route path='/about' element={<div className='w-full flex justify-center border-2'>About us</div>}/>

        <Route path='*' element={<Error/>}/>
      </Routes>
    </div>
  );
}

export default App;
