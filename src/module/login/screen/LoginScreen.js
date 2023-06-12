import React, { useEffect, useState } from "react";
import logo from "logo.svg";
import LoginModal from "./component/LoginModal";
import RegisterModal from "./component/RegisterModal";
import { useNavigate } from "react-router-dom";
import { loginUser, register } from "../loginApi";

export default function LoginScreen(props) {
  const { isLogin, loginReset } = props;

  const [loginMode, setLoginMode] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      localStorage.setItem("username", props.userName);
      localStorage.setItem("token", props.token);
      navigate("/dashboard");
    }
  }, [isLogin, navigate, loginReset]);

  const switchScreen = (event) => {
    event.preventDefault();
    setLoginMode((prevMode) => !prevMode);
  };

  const RenderContent = () => {
    return loginMode ? (
      <LoginModal {...props} {...{ loginUser }} />
    ) : (
      <RegisterModal {...props} {...{ registerUser: register }} />
    );
  };

  const buttonText = loginMode ? "Register" : "Back To Login";

  return (
    <header className='bg-[#282c34] min-h-screen flex flex-col items-center justify-center text-xl text-white'>
      <img src={logo} className='h-72 animate-spin-slow' alt='logo' />
      <div className='bg-gray-400 flex flex-col p-10 rounded-2xl'>
        <p className='text-3xl mb-5 font-bold'>
          Welcome to {loginMode ? "Login" : "Register"} Page
        </p>
        <div>
          <RenderContent />
        </div>
        <button onClick={switchScreen}>{buttonText}</button>
      </div>
    </header>
  );
}
