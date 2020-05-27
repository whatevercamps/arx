import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import "./Login.css";
import "./Utils.css";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emptyError, setEmptyError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordLengthError, setPasswordLError] = useState("");
  const [digitError, setDigitError] = useState("");
  const [upperError, setUpperError] = useState("");
  const [lowerError, setLowerError] = useState("");

  const [emailOrPasswordWrong, setEmailOrPasswordWrong] = useState("");

  const validate = (email, password) => {
    let emptyError = "";
    let emailError = "";
    let passwordLError = "";
    let digitError = "";
    let upperError = "";
    let lowerError = "";

    if (
      (email !== false && !email.length) ||
      (password !== false && !password.length)
    ) {
      emptyError = "Empty fields, please complete";
      setEmptyError(emptyError);
    } else {
      setEmptyError("");
    }
    if (
      email &&
      !email.match(
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
      )
    ) {
      emailError = "Please type a valid email";
      setEmailError(emailError);
    } else {
      setEmailError("");
    }
    if (password && !password.match(/^.{8,}$/)) {
      passwordLError = "Password must be al least 8 characters";
      setPasswordLError(passwordLError);
    } else {
      setPasswordLError("");
    }
    if (password && !password.match(/(.*\d.*)/)) {
      digitError = "Password must contain at least one digit";
      setDigitError(digitError);
    } else {
      setDigitError("");
    }
    if (password && !password.match(/(.*[a-z].*)/)) {
      upperError = "Password must contain at least one lowercase";
      setUpperError(upperError);
    } else {
      setUpperError("");
    }
    if (password && !password.match(/(.*[A-Z].*)/)) {
      lowerError = "Password must contain at least one uppercase";
      setLowerError(lowerError);
    } else {
      setLowerError("");
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (email && email.trim() != "" && password.trim().length >= 8) {
      const payload = {
        username: email,
        password: password,
      };
      console.log("registrando", payload);

      fetch("/auth/local/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          if (res.status && res.status === 200) {
            return res.json();
          } else {
            setEmailOrPasswordWrong("Email or passord wrong");
            throw new Error("Email or passord wrong");
          }
        })
        .then((data) => {
          console.log("data login", data);

          if (data.success) props.setUser(data.user);
        })
        .catch((err) => {
          console.log("errrror", err);
        });
    }
    validate(email, password);
  };

  return !props.user ? (
    <div className='Login'>
      <div className='container-login100'>
        {" "}
        <div className='wrap-login100 p-l-20 p-r-20 p-t-30 p-b-30'>
          {" "}
          <form className='login100-form validate-form' onSubmit={handleSubmit}>
            {" "}
            <span className='login100-form-title p-b-37'> Sign In </span>{" "}
            <div
              className='wrap-input100 validate-input m-b-8'
              data-validate='Enter username or email'
            >
              {" "}
              <input
                className='input100'
                name='username'
                onChange={(e) => {
                  setEmail(e.target.value);
                  validate(e.target.value, false);
                }}
                placeholder='email'
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
                onChange={(e) => {
                  setPassword(e.target.value);
                  validate(false, e.target.value);
                }}
                name='pass'
                placeholder='password'
              />{" "}
              <span className='focus-input100'></span>{" "}
            </div>{" "}
            <p>{passwordLengthError}</p>
            <p>{digitError}</p>
            <p>{upperError}</p>
            <p>{lowerError}</p>
            <p>{emptyError}</p>
            <div className='container-login100-form-btn'>
              {" "}
              <button className='login100-form-btn' type='submit'>
                {" "}
                Sign In{" "}
              </button>{" "}
            </div>{" "}
            <p>{emailOrPasswordWrong}</p>
            <div className='text-center p-t-20 p-b-10'>
              {" "}
              <span className='txt1'> Or login with </span>{" "}
            </div>{" "}
            <div className='flex-c p-b-20'>
              {" "}
              <a
                href={`${window.location.origin.replace(
                  "3000",
                  "3001"
                )}/auth/facebook`}
                className='login100-social-item'
              >
                {" "}
                <i className='fab fa-facebook-f'></i>{" "}
              </a>{" "}
              <a className='login100-social-item' href='/auth/facebook'>
                {" "}
                <i
                  className='fab fa-google'
                  style={{ color: "#de5246" }}
                ></i>{" "}
              </a>{" "}
            </div>{" "}
            <div className='text-center'>
              <p id='member'>
                Not a member?{" "}
                <a href='/signup' id='signup-link'>
                  Sign up now
                </a>
              </p>
            </div>
          </form>{" "}
        </div>{" "}
      </div>
    </div>
  ) : (
    <Redirect to='/' />
  );
}
