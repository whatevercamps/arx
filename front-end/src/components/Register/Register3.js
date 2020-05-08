import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faCommentDots } from "@fortawesome/free-solid-svg-icons";

const Register3 = ({ changePage2, changePage4 }) => {
  return (
    <div className='Register'>
      <div className='container'>
        <div className='col-3'></div>
        <div className='col-6 register-content'>
          <h2>Complete your profile</h2>
          <p>
            And last but not least, select your tastes in the different
            categories
          </p>
          <h3>Movies</h3>
          <form action=''>
            <div className='form-group'>
              <label>
                Search a tag or create one
                <input
                  type='text'
                  placeholder='Search'
                  className='form-control'
                />
              </label>
            </div>
            <div className='form-group'>
              <div className='row category'>
                <div className='col-4'>
                  <FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon>
                  <p>Drama</p>
                </div>
                <div className='col-4'>
                  {" "}
                  <FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon>
                  <p>Comedy</p>
                </div>
                <div className='col-4'>
                  {" "}
                  <FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon>
                  <p>Horror</p>
                </div>
              </div>
              <div className='row category'>
                <div className='col-4'>
                  {" "}
                  <FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon>
                  <p>Action</p>
                </div>
                <div className='col-4'>
                  {" "}
                  <FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon>
                  <p>Documentary</p>
                </div>
                <div className='col-4'>
                  {" "}
                  <FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon>
                  <p>SciFi</p>
                </div>
              </div>
            </div>

            <div className='row'>
              {" "}
              <div className='col-2'>
                <button onClick={changePage2}> Back</button>
              </div>
              <div className='col-8'></div>
              <div className='col-2'>
                {" "}
                <button onClick={changePage4}> Next</button>
              </div>
            </div>
          </form>
        </div>
        <div className='col-3'></div>
      </div>
    </div>
  );
};

export default Register3;
