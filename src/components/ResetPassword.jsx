import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
const ResetPassword = () => {
  let navigate = useNavigate();
  const { resetToken } = useParams();
  const [ResetPassword, setResetPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = (e) => {
    setResetPassword(e.target.value);
  };
  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  const [isNotEquals, setIsNotEquals] = useState(false);
  const handleSubmit = (e) => {
    setIsNotEquals(true);
    e.preventDefault();
    if (ResetPassword === confirmPassword) {
      setIsNotEquals(false);
      console.log(resetToken);
      axios
        .post(
          "http://localhost:5000/api/reset-password/" + resetToken,
          JSON.stringify({ password: ResetPassword }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          toast.success("Password reset successfully!");
          navigate("/login");
        })
        .catch((err) => {
          toast.error("Failed to reset password. Please try again.");
          console.log(err);
        });
    }
  };

  return (
    <div className="w-fit-content m-auto bg-white text-black p-10 rounded-md space-y-5">
      <h1>Reset Password</h1>
      <p>Enter your new password</p>
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
            type="password"
            name="password"
            id=""
            onChange={handleChangePassword}
            placeholder="Password"
            className="border border-black rounded-md py-2 px-2 w-full text-white"
          />
        </div>
        <div>
          <input
            type="password"
            name="confirmPassword"
            id=""
            onChange={handleChangeConfirmPassword}
            placeholder="Confirm Password"
            className="border border-black rounded-md py-2 px-2 w-full text-white"
          />
          {isNotEquals === true && (
            <p className="text-red-500 text-start">Passwords do not match</p>
          )}
        </div>
        <div className="flex justify-center items-center w-full">
          <button className="bg-black text-white rounded-2xl py-1 px-2 w-full">
            Reset Password
          </button>
        </div>
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

export default ResetPassword;
