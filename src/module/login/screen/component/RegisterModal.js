import React, { useEffect, useState } from "react";
import ActivityLoader from "component/activityLoader";
import { useMutation } from "react-query";

export default function RegisterModal(props) {
  const { registerUser, requestRegisterSuccess } = props;
  const [validationLabel, setValidationLabel] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { mutate, isLoading, data, error } = useMutation(registerUser);

  useEffect(() => {
    if (error) {
      setValidationLabel(
        "There something wrong in the server please try again"
      );
    } else if (data) {
      setValidationLabel("");
      requestRegisterSuccess({ ...data, username: email });
    }
  }, [error, data, requestRegisterSuccess]);

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
    mutate({ email, password });
    //event.target.reset();
  };

  return (
    <form
      className='flex flex-col space-y-2 text-m mb-5'
      data-testid='register-form'
      onSubmit={onSubmit}
    >
      {validationLabel && (
        <label className='text-rose-600 font-bold font-l'>
          {validationLabel}
        </label>
      )}
      <input
        className='p-2 text-black'
        name='firstName'
        placeholder='First Name'
        value={firstName}
        onChange={handleInputChange}
      />
      <input
        className='p-2 text-black'
        name='lastName'
        placeholder='Last Name'
        value={lastName}
        onChange={handleInputChange}
      />
      <input
        className='p-2 text-black'
        name='email'
        type='email'
        placeholder='Email'
        value={email}
        onChange={handleInputChange}
      />
      <input
        className='p-2 text-black'
        name='password'
        type='password'
        placeholder='Password'
        value={password}
        onChange={handleInputChange}
      />
      {isLoading ? (
        <ActivityLoader />
      ) : (
        <div className='pt-5 flex'>
          <button className='p-3 bg-yellow-500 w-full'>REGISTER</button>
        </div>
      )}
    </form>
  );
}
