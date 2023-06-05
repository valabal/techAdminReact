import React, { useEffect, useState } from "react";
import logo from "logo.svg";
import LoginModal from "./component/LoginModal";
import RegisterModal from "./component/RegisterModal";
import { useNavigate } from "react-router-dom";

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
    return loginMode ? <LoginModal {...props} /> : <RegisterModal {...props} />;
  };

  const buttonText = loginMode ? "Register" : "Back To Login";

  return (
    <header class='bg-[#282c34] min-h-screen flex flex-col items-center justify-center text-xl text-white'>
      <img src={logo} class='h-72 animate-spin-slow' alt='logo' />
      <div class='bg-gray-400 flex flex-col p-10 rounded-2xl'>
        <p class='text-3xl mb-5 font-bold'>
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
