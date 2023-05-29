import React, { useEffect, useState } from "react";
import ActivityLoader from "component/activityLoader";

export default function RegisterModal(props) {
  const { requestRegister, isRegisterLoading, registerError, isLogin } = props;
  const [validationLabel, setValidationLabel] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (registerError) {
      setValidationLabel(registerError);
    } else if (isLogin) {
      setValidationLabel("");
    }
  }, [registerError, isLogin]);

  const { firstName, lastName, email, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmit = (event) => {
    console.log("ONSUBMIT TRIGGERD");
    event.preventDefault();

    if (!(firstName && lastName && email && password)) {
      setValidationLabel("Please insert all required field");
      console.log("NOT WORKING");
      return;
    }
    requestRegister({ email, password });
    //event.target.reset();
  };

  return (
    <form
      style={{ display: "flex", flexDirection: "column" }}
      data-testid='register-form'
      onSubmit={onSubmit}
    >
      {validationLabel && (
        <label style={{ color: "red", fontWeight: "bold", fontSize: "15px" }}>
          {validationLabel}
        </label>
      )}
      <input
        name='firstName'
        placeholder='First Name'
        value={firstName}
        onChange={handleInputChange}
      />
      <input
        name='lastName'
        placeholder='Last Name'
        value={lastName}
        onChange={handleInputChange}
      />
      <input
        name='email'
        type='email'
        placeholder='Email'
        value={email}
        onChange={handleInputChange}
      />
      <input
        name='password'
        type='password'
        placeholder='Password'
        value={password}
        onChange={handleInputChange}
      />
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
