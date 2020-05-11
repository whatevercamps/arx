import React from "react";

const Register1 = ({ changePage2 }) => {
  const endFirstStep = () => {};

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
                  placeholder='David Bautista'
                  className='form-control'
                />
              </label>
            </div>
            <div className='form-group row'>
              <label className='col-md-4'>
                Age
                <input type='number' className='form-control' />
              </label>
              <label className='col-md-8'>
                City
                <input
                  type='text'
                  className='form-control'
                  placeholder='Bogotá'
                />
              </label>
            </div>
            <div className='form-group gender'>
              <label>Gender</label>
              <div class='custom-control custom-radio custom-control-inline'>
                <input
                  type='radio'
                  id='customRadioInline1'
                  name='customRadioInline1'
                  class='custom-control-input'
                />
                <label class='custom-control-label' for='customRadioInline1'>
                  Male{" "}
                </label>
              </div>
              <div class='custom-control custom-radio custom-control-inline'>
                <input
                  type='radio'
                  id='customRadioInline2'
                  name='customRadioInline1'
                  class='custom-control-input'
                />
                <label class='custom-control-label' for='customRadioInline2'>
                  Female{" "}
                </label>
              </div>
              <div class='custom-control custom-radio custom-control-inline'>
                <input
                  type='radio'
                  id='customRadioInline2'
                  name='customRadioInline1'
                  class='custom-control-input'
                />
                <label class='custom-control-label' for='customRadioInline2'>
                  Other{" "}
                </label>
              </div>
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
