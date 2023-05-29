import React, { useEffect, useState } from "react";
import ActivityLoader from "component/activityLoader";

export default function LoginModal(props) {
  const { requestLogin, isLoginLoading, loginError, isLogin } = props;
  const [validationLabel, setValidationLabel] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (loginError) {
      setValidationLabel(loginError);
    } else if (isLogin) {
      setValidationLabel("");
    }
  }, [loginError, isLogin, setValidationLabel]);

  const onSubmit = (event) => {
    event.preventDefault();

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
      data-testid='login-form'
    >
      {validationLabel && (
        <label style={{ color: "red", fontWeight: "bold", fontSize: "15px" }}>
          {validationLabel}
        </label>
      )}
      <input
        name='email'
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        name='password'
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
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
