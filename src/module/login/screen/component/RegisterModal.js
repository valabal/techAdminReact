import React, { useEffect, useState } from "react";
import ActivityLoader from "component/activityLoader";

export default function RegisterModal(props) {
  const { requestRegister, isRegisterLoading, registerError, isLogin } = props;
  const [validationLabel, setValidationLabel] = useState("");

  useEffect(() => {
    if (registerError) {
      setValidationLabel(registerError);
    } else if (isLogin) {
      setValidationLabel("");
    }
  }, [registerError, isLogin, setValidationLabel]);

  const onSubmit = (event) => {
    console.log("ONSUBMIT TRIGGERD");
    event.preventDefault();
    const firstName = event.target.firstName?.value;
    const lastName = event.target.lastName?.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (!(firstName && lastName && email && password)) {
      setValidationLabel("Please insert all required field");
      return;
    }
    requestRegister({ email, password });
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
      <input name='firstName' placeholder='First Name' />
      <input name='lastName' placeholder='Last Name' />
      <input name='email' type='email' placeholder='Email' />
      <input name='password' type='password' placeholder='Password' />
      {isRegisterLoading ? (
        <ActivityLoader />
      ) : (
        <>
          <button>REGISTER</button>
        </>
      )}
    </form>
  );
}
