import React, { useState } from "react";
import "./Register.css";
import "./Utils1.css";

export default function RegisterInit() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (
      email &&
      email.trim() != "" &&
      password === password2 &&
      password.trim().length > 8
    ) {
      const payload = {
        email: email,
        password: password,
      };
      console.log("registrando", payload);

      fetch("http://localhost:3001/auth/createUserWithEmail", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(payload),
      });
    }
  };

  return (
    <div className='RegisterInit'>
      <div className='container-login100'>
        {" "}
        <div className='wrap-login100 p-l-20 p-r-20 p-t-30 p-b-30'>
          {" "}
          <form className='login100-form validate-form' onSubmit={handleSubmit}>
            {" "}
            <span className='login100-form-title p-b-37'> Sign Up </span>{" "}
            <div
              className='wrap-input100 validate-input m-b-15'
              data-validate='Enter username or email'
            >
              {" "}
              <input
                className='input100'
                type='text'
                name='username'
                placeholder='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />{" "}
              <span className='focus-input100'></span>{" "}
            </div>{" "}
            <div
              className='wrap-input100 validate-input m-b-15'
              data-validate='Enter password'
            >
              {" "}
              <input
                className='input100'
                type='password'
                name='pass'
                onChange={(e) => setPassword(e.target.value)}
                placeholder='password'
              />{" "}
              <span className='focus-input100'></span>{" "}
            </div>{" "}
            <div
              className='wrap-input100 validate-input m-b-15'
              data-validate='Enter password'
            >
              {" "}
              <input
                className='input100'
                type='password'
                onChange={(e) => setPassword2(e.target.value)}
                name='pass'
                placeholder='validate password'
              />{" "}
              <span className='focus-input100'></span>{" "}
            </div>{" "}
            <div className='container-login100-form-btn'>
              {" "}
              <button className='login100-form-btn' type='submit'>
                {" "}
                Sign Up{" "}
              </button>{" "}
            </div>{" "}
          </form>{" "}
        </div>{" "}
      </div>
    </div>
  );
}
