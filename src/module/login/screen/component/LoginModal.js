import React, { useEffect, useState } from "react";
import ActivityLoader from "component/activityLoader";

export default function LoginModal(props) {
  const { requestLogin, isLoginLoading, loginError, isLogin } = props;
  const [validationLabel, setValidationLabel] = useState("");

  useEffect(() => {
    if (loginError) {
      setValidationLabel(loginError);
    } else if (isLogin) {
      setValidationLabel("");
    }
  }, [loginError, isLogin, setValidationLabel]);

  const onSubmit = (event) => {
    console.log("ONSUBMIT TRIGGERED");
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    if (!(email && password)) {
      setValidationLabel("Please insert all required field");
      return;
    }
    requestLogin({ email, password });
    //event.target.reset();
  };

  return (
    <form
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={onSubmit}
    >
      {validationLabel && (
        <label
          style={{ color: "red", "font-weight": "bold", "font-size": "15px" }}
        >
          {validationLabel}
        </label>
      )}
      <input name='email' type='email' placeholder='Email' />
      <input name='password' type='password' placeholder='Password' />
      {isLoginLoading ? (
        <ActivityLoader />
      ) : (
        <>
          <button>LOGIN</button>
        </>
      )}
    </form>
  );
}
