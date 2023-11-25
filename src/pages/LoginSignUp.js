import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import logo from "../images/logo.png"
// import { Link } from "react-router-dom";

const LoginSignUp = () => {
  const [showLogin, setShowLogin] = useState(false);

  const toggleComponent = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="flex flex-col sm:flex-row w-[100%] m-auto h-screen p-4 lg:p-40 rounded-lg">
      <div className="shadow-2xl">
        <div className="lg:w-1/2 bg-blue-400 rounded-t-2xl p-5 content-center flex flex-col items-center leading-9">
          <img src={logo} className="w-1/2" alt="" />
          <p className="text-2xl text-yellow-300 font-semibold">
            Ecosysytem test
          </p>
          <p className="text-xl my-5 text-white">
            price{" "}
            <span className="px-3 text-black rounded bg-yellow-300">Free</span>
          </p>
          <p className="text-white font-bold text-xl">Scholarship up to 50%</p>
        </div>
        <div className="w-full lg:w-1/2 p-3 border border-blue-400 rounded-b-2xl">
          <div className="flex gap-4">
            <div
              className={showLogin ? "" : "bg-blue-400 px-2 text-white"}
              onClick={toggleComponent}
            >
              Register
            </div>
            <div
              className={showLogin ? "bg-blue-400 px-2 text-white" : ""}
              onClick={toggleComponent}
            >
              Login
            </div>
          </div>
          <hr className=" h-[2px] bg-blue-900" />

          <div className="mt-6">{showLogin ? <Login /> : <Register />}</div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
