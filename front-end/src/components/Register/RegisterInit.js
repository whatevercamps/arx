import React, { useState } from "react";

import "./Register.css";
import "./Utils1.css";

export default function RegisterInit() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  /* Error hooks */
  const [emptyError, setEmptyError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordLengthError, setPasswordLError] = useState("");
  const [digitError, setDigitError] = useState("");
  const [upperError, setUpperError] = useState("");
  const [lowerError, setLowerError] = useState("");
  const [passError, setPassError] = useState("");

  /* Validate form function */
  const validate = () => {
    let emptyError = "";
    let emailError = "";
    let passwordLError = "";
    let digitError = "";
    let upperError = "";
    let lowerError = "";
    let passError = "";

    if (!email || !password) {
      emptyError = "Empty fields, please complete";
      setEmptyError(emptyError);
    }
    if (!email || !email.includes("@")) {
      emailError = "Please type a valid email";
      setEmailError(emailError);
    }
    if (!password || !password.match(/^.{8,}$/)) {
      passwordLError = "Password must be al least 8 characters";
      setPasswordLError(passwordLError);
    }
    if (!password || !password.match(/(.*\d.*)/)) {
      digitError = "Password must contain at least one digit";
      setDigitError(digitError);
    }
    if (!password || !password.match(/(.*[a-z].*)/)) {
      upperError = "Password must contain at least one uppercase";
      setUpperError(upperError);
    }
    if (!password || !password.match(/(.*[A-Z].*)/)) {
      lowerError = "Password must contain at least one lowercase";
      setLowerError(lowerError);
    }

    if (!password || !password2 || password !== password2) {
      passError = "Passwords must be equal";
      setPassError(passError);
    }
  };

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

      fetch("/auth/createUserWithEmail", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(payload),
      }).then((resp) => {
        console.log("resp line 33", resp);
        if (resp.status !== 200) window.location("/");
      });
    }
    validate();
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
              className='wrap-input100 validate-input m-b-8'
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
            <p>{emailError}</p>
            <div
              className='wrap-input100 validate-input m-b-8 m-t-8'
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
            <p>{passwordLengthError}</p>
            <p>{digitError}</p>
            <p>{upperError}</p>
            <p>{lowerError}</p>
            <div
              className='wrap-input100 validate-input m-b-8 m-t-8'
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
            <p>{passError}</p>
            <p>{emptyError}</p>
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
