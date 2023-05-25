import React, { useEffect, useState } from "react";
import logo from "logo.svg";
import "App.css";
import LoginModal from "./component/LoginModal";
import RegisterModal from "./component/RegisterModal";
import { useNavigate } from "react-router-dom";

export default function LoginScreen(props) {
  const { isLogin, loginReset } = props;

  const [loginMode, setLoginMode] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      navigate("/dashboard");
      loginReset();
    }
  }, [isLogin, navigate]);

  const switchScreen = (event) => {
    event.preventDefault();
    setLoginMode(!loginMode);
  };

  return (
    <header className='App-header'>
      <img src={logo} className='App-logo' alt='logo' />
      <p>Welcome to {loginMode ? "Login" : "Register"} Page</p>
      {loginMode ? <LoginModal {...props} /> : <RegisterModal {...props} />}
      <button onClick={switchScreen}>
        {loginMode ? "Register" : "Back To Login"}
      </button>
    </header>
  );
}
