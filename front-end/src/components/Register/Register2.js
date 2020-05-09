import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

const Register2 = ({ changePage1, changePage3 }) => {
  return (
    <div className='Register'>
      <div className='container'>
        <div className='col-3'></div>
        <div className='col-6 register-content'>
          <h2>Complete your profile</h2>
          <p>
            Now lets add information that your better half would like to know
          </p>
          <form action=''>
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
            <div className='form-group gender'>
              <label>Looking for</label>
              <div class='custom-control custom-checkbox custom-control-inline'>
                <input
                  type='checkbox'
                  id='customCheckInline1'
                  name='customCheckInline1'
                  class='custom-control-input'
                />
                <label class='custom-control-label' for='customCheckInline1'>
                  Women{" "}
                </label>
              </div>
              <div class='custom-control custom-checkbox custom-control-inline'>
                <input
                  type='checkbox'
                  id='customCheckInline2'
                  name='customCheckInline2'
                  class='custom-control-input'
                />
                <label class='custom-control-label' for='customCheckInline2'>
                  Men{" "}
                </label>
              </div>
              <div class='custom-control custom-checkbox custom-control-inline'>
                <input
                  type='checkbox'
                  id='customCheckInline3'
                  name='customCheckInline3'
                  class='custom-control-input'
                />
                <label class='custom-control-label' for='customCheckInline3'>
                  Everyone{" "}
                </label>
              </div>
            </div>

            <div className='form-group'>
              <label>
                About you
                <input type='textarea' className='form-control' />
              </label>
            </div>
            <div className='form-group'>
              <label>
                School
                <input
                  type='text'
                  className='form-control'
                  placeholder='Universidad de los Andes'
                />
              </label>
            </div>
            <div className='form-group'>
              <label>Instagram Photos</label>
              <button id='instagram'>
                {" "}
                <FontAwesomeIcon
                  icon={faInstagram}
                  id='insta'
                ></FontAwesomeIcon>
                Connect Instagram
              </button>
            </div>
            <div className='row'>
              {" "}
              <div className='col-2'>
                <button onClick={changePage1}> Back</button>
              </div>
              <div className='col-8'></div>
              <div className='col-2'>
                {" "}
                <button onClick={changePage3}> Next</button>
              </div>
            </div>
          </form>
        </div>
        <div className='col-3'></div>
      </div>
    </div>
  );
};

export default Register2;
