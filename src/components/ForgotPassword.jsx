import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [resetEmail, setResetEmail] = useState("");
  const handleChange = (e) => {
    setResetEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/api/forgot-password",
        { email: resetEmail },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success("Password reset link sent successfully!");
        console.log(res.data);
        //   navigate("/login");
      })
      .catch((err) => {
        toast.error("Failed to send password reset link. Please try again.");
        console.log(err);
      });
    console.log(resetEmail);
  };
  return (
    <div className="w-fit-content m-auto bg-white text-black p-10 rounded-md space-y-5">
      <h1>Forgot Password</h1>
      <p>Enter your email address to reset your password</p>
      <div className="flex justify-center items-center">
        <hr className="w-1/2 -mt-5" />
      </div>
      <form
        action=""
        method="post"
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div>
          <input
            className="border border-black rounded-md py-2 px-2 w-full text-white"
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
        </div>
        <button
          className="text-white w-full rounded-md py-1 px-2"
          type="submit"
        >
          Reset Password
        </button>
      </form>
      <p>
        Remember your password?{" "}
        <span
          className="cursor-pointer text-blue-500"
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
