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
      class='flex flex-col space-y-2 text-m mb-5'
      onSubmit={onSubmit}
      data-testid='login-form'
    >
      {validationLabel && (
        <label class='text-rose-600 font-bold font-l'>{validationLabel}</label>
      )}
      <input
        class='p-2 text-black'
        name='email'
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        class='p-2 text-black'
        name='password'
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {isLoginLoading ? (
        <ActivityLoader />
      ) : (
        <div class='pt-5 flex'>
          <button class='py-3 bg-green-500 w-full'>LOGIN</button>
        </div>
      )}
    </form>
  );
}
