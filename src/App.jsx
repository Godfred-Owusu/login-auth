import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { ToastContainer } from "react-toastify";
import Signup from "./components/signup";
import Login from "./components/login";
import "react-toastify/dist/ReactToastify.css";
import CodeVerification from "./components/codeVerification";
import { EmailProvider } from "./components/useContext/EmailContext";
import Homepage from "./components/Homepage";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
const App = () => {
  return (
    <div>
      <EmailProvider>
        <BrowserRouter>
          <Routes>
            {/* {children} */}
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/code-verification" element={<CodeVerification />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/reset-password/:resetToken"
              element={<ResetPassword />}
            />
            <Route path="/home" element={<Homepage />} />
          </Routes>
        </BrowserRouter>
      </EmailProvider>
    </div>
  );
};

export default App;
