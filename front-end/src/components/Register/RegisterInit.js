import React from "react";
import "./Register.css";
import "./Utils1.css";

export default function RegisterInit() {
  return (
    <div className='RegisterInit'>
      <div className='container-login100'>
        {" "}
        <div className='wrap-login100 p-l-20 p-r-20 p-t-30 p-b-30'>
          {" "}
          <form className='login100-form validate-form'>
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
