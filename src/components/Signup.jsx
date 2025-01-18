import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import "../App.css";
import { EmailContext } from "./useContext/EmailContext";
const Signup = () => {
  const { setEmail } = useContext(EmailContext);
  let navigate = useNavigate();
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [eye, setEye] = useState(false);

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    setEmail(value.email);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!value.name.trim()) {
      validationErrors.name = "Name is required";
    }
    if (!value.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!value.email.includes("@") || !value.email.includes(".")) {
      validationErrors.email = "Email is invalid";
    }
    if (!value.password.trim()) {
      validationErrors.password = "Password is required";
    } else if (value.password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters";
    }
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      console.log(validationErrors);
      // return;
    } else {
      // console.log(value);
      // reset
      setValue({
        name: "",
        email: "",
        password: "",
      });
      axios
        .post(`${import.meta.env.VITE_API_URL}/users`, JSON.stringify(value), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(function (response) {
          console.log(response);
          toast.success("User registered successfully!");
          navigate("/code-verification");
        })
        .catch(function (error) {
          console.error(error);
          toast.error("Failed to register the user. Please try again.");
        });
    }
  };
  return (
    <>
      <div className="flex pt-10 md:flex-row flex-col-reverse justify-center items-center  text-black bg-white rounded-2xl w-fit ">
        {/* left */}
        <div className="h-full border-r shadow-sm rounded-r-3xl ">
          <img src="./logo1.avif" alt="" />
        </div>

        {/* right */}
        <div className=" text-center   md:w-8/12 w-11/12 h-full px-5">
          <div className="flex justify-center items-center">
            <img className="w-10 " src="./icon.png" alt="" />
          </div>
          <h1 className="text-3xl font-semibold mt-10 mb-2">Sign Up</h1>
          <p className="text-sm text-gray-500 mb-8">
            Please sign up to your details
          </p>
          <form action="" onSubmit={handleSubmit} className="space-y-2 ">
            <div>
              <input
                type="text"
                name="name"
                value={value.name}
                onChange={handleChange}
                id=""
                placeholder="Name"
                className="border border-black rounded-md py-2 px-4 w-full text-white"
              />
              {errors.name && (
                <p className="text-red-500 text-start">{errors.name}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                name="email"
                onChange={handleChange}
                value={value.email}
                id=""
                placeholder="Email"
                className="border border-black rounded-md py-2 px-4 w-full text-white"
              />
              {errors.email && (
                <p className="text-red-500 text-start">{errors.email}</p>
              )}
            </div>
            <div className=" flex justify-between items-center  rounded-md  px-2 w-full text-white bg-black outline-red border border-black ">
              <input
                type={eye ? "text" : "password"}
                name="password"
                value={value.password}
                onChange={handleChange}
                id=""
                placeholder="Password"
                className="w-full  py-2 px-2 text-white outline-none"
              />
              <div className="  pr-2">
                {eye ? (
                  <FaRegEyeSlash
                    color="white"
                    className="cursor-pointer"
                    onClick={() => setEye(!eye)}
                  />
                ) : (
                  <FaRegEye
                    color="white"
                    className="cursor-pointer"
                    onClick={() => setEye(!eye)}
                  />
                )}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-start">{errors.password}</p>
            )}
            <div className="flex justify-center items-center w-full">
              <button className="bg-black text-white rounded-2xl py-2 px-2 w-full hover:scale-105 transform transition-all duration-300">
                Sign Up
              </button>
            </div>
            <div className="flex justify-center items-center w-full">
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <span
                  className="text-sm text-blue-500 cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Login
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Signup;
