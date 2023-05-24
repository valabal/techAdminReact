import React, { useEffect, useState } from "react";
import logo from "logo.svg";
import "App.css";
import LoginModal from "./component/LoginModal";
import RegisterModal from "./component/RegisterModal";

export default function LoginScreen(props) {
  const { isLogin } = props;

  const [loginMode, setLoginMode] = useState(true);

  useEffect(() => {
    if (isLogin) {
      console.log("USER SUCCESSFULLY LOGIN");
    }
  }, [isLogin]);

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
