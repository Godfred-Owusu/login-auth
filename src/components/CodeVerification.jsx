import React, { useState, useContext } from "react";
import { HiMail } from "react-icons/hi";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { EmailContext } from "./useContext/EmailContext";
import { useNavigate } from "react-router-dom";

/**
 * CodeVerification component renders a form for verifying a code sent via email.
 *
 * The component consists of:
 * - A header with an icon and instructions to check the email.
 * - Six input fields for entering the verification code.
 * - A button to submit the entered code.
 * - A link to resend the code if not received.
 *
 * The component handles:
 * - Input changes to allow only digits and auto-focus the next input.
 * - Backspace key to auto-focus the previous input if the current one is empty.
 * - Form submission to log the entered code.
 *
 * @component
 * @example
 * return (
 *   <CodeVerification />
 * )
 */
const CodeVerification = () => {
  let navigate = useNavigate();
  const { email } = useContext(EmailContext);
  const [code, setCode] = useState(Array(6).fill(""));

  const handleChange = (e) => {
    const { value } = e.target;
    const index = parseInt(e.target.getAttribute("data-index"), 10);

    if (!/^\d$/.test(value) && value !== "") return; // Allow only digits

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Focus the next input if a value was entered
    if (value && index < 5) {
      const nextInput = e.target.nextElementSibling;
      if (nextInput) nextInput.focus();
    }
  };
  const handleKeyDown = (e) => {
    const index = parseInt(e.target.getAttribute("data-index"), 10);

    if (e.key === "Backspace" && !e.target.value && index > 0) {
      const previousInput = e.target.previousElementSibling;
      if (previousInput) previousInput.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/api/verify-email",
        { code: code.join("") },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success("Code verified successfully!");
        console.log(res.data);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to verify the code. Please try again.");
      });
    console.log(code.join(""));
  };

  const resend = () => {
    axios
      .post(
        "http://localhost:5000/api/resend-code",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success("Code resent successfully!");
        console.log(res.data);
      })
      .catch((err) => {
        toast.error("Failed to resend the code. Please try again.");
        console.log(err);
      });
  };

  return (
    <>
      <div className="w-fit bg-white space-y-5 rounded-md text-black p-10">
        <div className="flex justify-center items-center ">
          <HiMail color="black" size={50} className="text-center" />
        </div>
        <div>
          <h1 className="text-3xl font-semibold mt-10 mb-2 text-black">
            Check your email
          </h1>
          <p className="text-lg">Enter the verification code sent to:</p>
          <p className=" font-semibold">{email}</p>
          <div className="flex justify-center items-center my-2">
            <hr className="w-1/2 " />
          </div>
        </div>
        {code.map((item, index) => (
          <input
            className="mr-4 last-of-type:mr-0  md:w-14 md:h-14 w-10 h-10 text-center border border-gray-300 rounded-md text-white"
            key={index}
            type="text"
            maxLength="1"
            data-index={index}
            value={code[index]}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        ))}
        <div>
          <p className="text-sm text-gray-500 mb-1">
            Didn't receive the code?{" "}
            <span className="text-blue-500 cursor-pointer" onClick={resend}>
              Resend
            </span>
          </p>
          <button
            className="w-full p-3 mb-5 text-white"
            type="submit"
            onClick={handleSubmit}
          >
            Verify email
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default CodeVerification;
