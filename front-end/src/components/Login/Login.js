import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";
import "./Utils.css";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (email && email.trim() != "" && password.trim().length > 8) {
      const payload = {
        email: email,
        password: password,
      };
      console.log("registrando", payload);

      fetch("http://localhost:3001/auth/getTokenWithEmail", {
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
            fetch("http://localhost:3001/auth/emailValidate", {
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
  };

  return (
    <div className='Login'>
      <div className='container-login100'>
        {" "}
        <div className='wrap-login100 p-l-20 p-r-20 p-t-30 p-b-30'>
          {" "}
          <form className='login100-form validate-form' onSubmit={handleSubmit}>
            {" "}
            <span className='login100-form-title p-b-37'> Sign In </span>{" "}
            <div
              className='wrap-input100 validate-input m-b-15'
              data-validate='Enter username or email'
            >
              {" "}
              <input
                className='input100'
                type='text'
                name='username'
                onChange={(e) => setEmail(e.target.value)}
                placeholder='email'
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
                onChange={(e) => setPassword(e.target.value)}
                name='pass'
                placeholder='password'
              />{" "}
              <span className='focus-input100'></span>{" "}
            </div>{" "}
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
                href='http://localhost:3001/auth/facebook'
                className='login100-social-item'
              >
                {" "}
                <i className='fab fa-facebook-f'></i>{" "}
              </a>{" "}
              <a
                className='login100-social-item'
                href='http://localhost:3001/auth/facebook'
              >
                {" "}
                <i
                  className='fab fa-google'
                  style={{ color: "#de5246" }}
                ></i>{" "}
              </a>{" "}
            </div>{" "}
            <div className='text-center'>
              <p>
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
