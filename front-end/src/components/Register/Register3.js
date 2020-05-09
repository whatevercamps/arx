import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faCommentDots } from "@fortawesome/free-solid-svg-icons";

const Register3 = ({ changePage2 }) => {
  return (
    <div className='Register'>
      <div className='container'>
        <div className='col-3'></div>
        <div className='col-6 register-content'>
          <h2>Complete your profile</h2>
          <p>
            And last but not least, select your tastes in different categories
          </p>
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
                  <p>La casa de Papel</p>
                </div>
                <div className='col-4'>
                  {" "}
                  <FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon>
                  <p>J Balvin</p>
                </div>
                <div className='col-4'>
                  {" "}
                  <FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon>
                  <p>Mr. Robot</p>
                </div>
              </div>
              <div className='row category'>
                <div className='col-4'>
                  {" "}
                  <FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon>
                  <p>Interstellar</p>
                </div>
                <div className='col-4'>
                  {" "}
                  <FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon>
                  <p>La divina comedia</p>
                </div>
                <div className='col-4'>
                  {" "}
                  <FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon>
                  <p>Dark</p>
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
                <button type='submit'> Finish</button>
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
