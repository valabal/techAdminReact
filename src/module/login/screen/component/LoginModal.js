import React, { useEffect, useState } from "react";
import ActivityLoader from "component/activityLoader";
import { useMutation } from "react-query";
import { RESPONSE_STATUS } from "util/constant";

export default function LoginModal(props) {
  const { loginUser, requestLoginSuccess } = props;
  const [validationLabel, setValidationLabel] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isLoading, data, error } = useMutation(loginUser);

  useEffect(() => {
    if (error) {
      const statusCode = error.response?.status;
      let errorString = "";
      switch (statusCode) {
        case RESPONSE_STATUS.ERROR:
        case RESPONSE_STATUS.BAD_REQUEST:
          errorString = "Username or Password not match";
          break;
        default:
          errorString = "There something wrong in the server please try again";
      }
      setValidationLabel(errorString);
    } else if (data) {
      console.log(data);
      setValidationLabel("");
      //put data to redux
      requestLoginSuccess({ ...data, username: email });
    }
  }, [error, data, setValidationLabel, requestLoginSuccess]);

  const onSubmit = (event) => {
    event.preventDefault();

    if (!(email && password)) {
      setValidationLabel("Please insert all required field");
      return;
    }
    mutate({ email, password });
  };

  return (
    <form
      className='flex flex-col space-y-2 text-m mb-5'
      onSubmit={onSubmit}
      data-testid='login-form'
    >
      {validationLabel && (
        <label className='text-rose-600 font-bold font-l'>
          {validationLabel}
        </label>
      )}
      <input
        className='p-2 text-black'
        name='email'
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className='p-2 text-black'
        name='password'
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {isLoading ? (
        <ActivityLoader />
      ) : (
        <div className='pt-5 flex'>
          <button className='py-3 bg-green-500 w-full'>LOGIN</button>
        </div>
      )}
    </form>
  );
}
