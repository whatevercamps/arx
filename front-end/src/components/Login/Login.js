import React from "react";
import "./Login.css";
import "./Utils.css";

export default function Login() {
  return (
    <div className='Login'>
      <div className='container-login100'>
        {" "}
        <div className='wrap-login100 p-l-20 p-r-20 p-t-30 p-b-30'>
          {" "}
          <form className='login100-form validate-form'>
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
                placeholder='username or email'
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
            <div className='container-login100-form-btn'>
              {" "}
              <button className='login100-form-btn'> Sign In </button>{" "}
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
              <a className='login100-social-item'>
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
