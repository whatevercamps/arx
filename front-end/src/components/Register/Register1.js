import React from "react";

const Register1 = ({ changePage2 }) => {
  return (
    <div className='Register'>
      <div className='container'>
        <div className='col-3'></div>
        <div className='col-6 register-content'>
          <h2>Complete your profile</h2>
          <p>Complete your profile adding some information in the next steps</p>
          <form action=''>
            <div className='form-group'>
              <label>
                Name
                <input
                  type='text'
                  disabled
                  placeholder='David Bautista'
                  className='form-control'
                />
              </label>
            </div>
            <div className='form-group'>
              <label>
                Email
                <input
                  type='email'
                  disabled
                  placeholder='dj.bautista10@gmail.com'
                  className='form-control'
                />
              </label>
            </div>
            <div className='form-group'>
              <label>
                Phone
                <input
                  type='text'
                  className='form-control'
                  placeholder='3421253478'
                />
              </label>
            </div>
            <div className='form-group'>
              <label>
                Age
                <input type='number' className='form-control' />
              </label>
            </div>
            <div className='form-group'>
              <label>
                City
                <input
                  type='text'
                  className='form-control'
                  placeholder='Bogotá'
                />
              </label>
            </div>
            <div className='row'>
              {" "}
              <div className='col-10'></div>
              <div className='col-2'>
                {" "}
                <button onClick={changePage2}>Next</button>
              </div>
            </div>
          </form>
        </div>
        <div className='col-3'></div>
      </div>
    </div>
  );
};

export default Register1;
