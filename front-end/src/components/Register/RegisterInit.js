import React, { useState } from "react";
import { Redirect } from "react-router";

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
  const [userAlreadyExists, setUserAlreadyExists] = useState("");

  const [registered, setRegistered] = useState(false);

  /* Validate form function */
  const validate = (email, password, password2) => {
    let emptyError = "";
    let emailError = "";
    let passwordLError = "";
    let digitError = "";
    let upperError = "";
    let lowerError = "";
    let passError = "";

    if (
      (email !== false && !email.length) ||
      (password !== false && !password.length) ||
      (password2 !== false && !password2.length)
    ) {
      emptyError = "Empty fields, please complete";
      setEmptyError(emptyError);
    } else {
      setEmptyError("");
    }
    if (
      email !== false &&
      !email.match(
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
      )
    ) {
      emailError = "Please type a valid email";
      setEmailError(emailError);
    } else {
      setEmailError("");
    }
    if (password !== false && !password.match(/^.{8,}$/)) {
      passwordLError = "Password must be al least 8 characters";
      setPasswordLError(passwordLError);
    } else {
      setPasswordLError("");
    }
    if (password !== false && !password.match(/(.*\d.*)/)) {
      digitError = "Password must contain at least one digit";
      setDigitError(digitError);
    } else {
      setDigitError("");
    }
    if (password !== false && !password.match(/(.*[a-z].*)/)) {
      upperError = "Password must contain at least one uppercase";
      setUpperError(upperError);
    } else {
      setUpperError("");
    }
    if (password !== false && !password.match(/(.*[A-Z].*)/)) {
      lowerError = "Password must contain at least one lowercase";
      setLowerError(lowerError);
    } else {
      setLowerError("");
    }

    if (password !== false && password2 !== false && password !== password2) {
      passError = "Passwords must be equal";
      setPassError(passError);
    } else {
      setPassError("");
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (
      email &&
      email.trim() != "" &&
      password === password2 &&
      password.trim().length >= 8
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
      })
        .then((resp) => {
          console.log("resp line 33", resp);
          return resp.json();
        })
        .then((res) => {
          console.log("data", res);

          if (res && res.data && res.data.lastErrorObject.upserted) {
            setRegistered(true);
          } else if (
            res &&
            res.data &&
            res.data.lastErrorObject.updatedExisting
          ) {
            setUserAlreadyExists("User already registered.");
          } else {
            setUserAlreadyExists("Sign-up process failed. Reload");
          }
        });
    }
    validate(email, password, password2);
  };

  return registered === false ? (
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
                aria-label='email'
                className='input100'
                type='text'
                name='username'
                placeholder='email'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validate(e.target.value, false, false);
                }}
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
                aria-label='password'
                className='input100'
                type='password'
                name='pass'
                onChange={(e) => {
                  setPassword(e.target.value);
                  validate(false, e.target.value, false);
                }}
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
                aria-label='repeat password'
                className='input100'
                type='password'
                onChange={(e) => {
                  setPassword2(e.target.value);
                  validate(false, password, e.target.value);
                }}
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
            <p>{userAlreadyExists}</p>
          </form>{" "}
        </div>{" "}
      </div>
    </div>
  ) : (
    <Redirect to='/signin' />
  );
}
