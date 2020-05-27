import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";
import "./Utils.css";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [emptyError, setEmptyError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordLengthError, setPasswordLError] = useState("");
  const [digitError, setDigitError] = useState("");
  const [upperError, setUpperError] = useState("");
  const [lowerError, setLowerError] = useState("");

  const validate = () => {
    let emptyError = "";
    let emailError = "";
    let passwordLError = "";
    let digitError = "";
    let upperError = "";
    let lowerError = "";

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
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (email && email.trim() != "" && password.trim().length > 8) {
      const payload = {
        email: email,
        password: password,
      };
      console.log("registrando", payload);

      fetch("/auth/getTokenWithEmail", {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          if (res.status && res.status === 200) return res.json();
        })
        .then((data) => {
          if (data && data.success) {
            fetch("/auth/emailValidate", {
              method: "GET",
              credentials: "include",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
              },
            })
              .then((res) => {
                if (res.status && res.status === 200) return res.json();
              })
              .then((data) => {
                if (data && data.success && data.user) {
                  props.setUser(data.user);
                  window.location("/");
                } else {
                  console.log("error validating data", data);
                }
              })
              .catch((err) => {
                console.log("err validating", err);
              });
          } else console.log("error", data);
        })
        .catch((err) => {
          console.log("errrror", err);
        });
    }
    validate();
  };

  return (
    <div className='Login' role='form'>
      <div className='container-login100'>
        {" "}
        <div className='wrap-login100 p-l-20 p-r-20 p-t-30 p-b-30'>
          {" "}
          <form className='login100-form validate-form' onSubmit={handleSubmit}>
            {" "}
            <h1 className='login100-form-title p-b-37'> Sign In </h1>{" "}
            <div
              className='wrap-input100 validate-input m-b-8'
              data-validate='Enter username or email'
            >
              {" "}
              <input
                aria-label='email'
                className='input100'
                name='username'
                onChange={(e) => setEmail(e.target.value)}
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
                aria-label='password'
                className='input100'
                type='password'
                onChange={(e) => setPassword(e.target.value)}
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
            <div className='text-center p-t-20 p-b-10'>
              {" "}
              <span className='txt1'> Or login with </span>{" "}
            </div>{" "}
            <div className='flex-c p-b-20'>
              {" "}
              <a
                aria-label='login with facebook'
                href={`${window.location.origin.replace(
                  "3000",
                  "3001"
                )}/auth/facebook`}
                className='login100-social-item'
              >
                {" "}
                <i className='fab fa-facebook-f'></i>{" "}
              </a>{" "}
              <a
                className='login100-social-item'
                href='/auth/facebook '
                aria-label='login with google'
              >
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
  );
}
