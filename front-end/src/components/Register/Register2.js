import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import AgeRanger from "../AgeRanger";

const Register2 = ({ changePage1, changePage3 }) => {
  const [ages, setAges] = useState([18, 90]);
  return (
    <div className='Register'>
      <div className='container'>
        <div className='col-3'></div>
        <div className='col-6 register-content'>
          <h2>Complete your profile</h2>
          <p>
            Now lets add information that your better half would like to know
          </p>
          <form
            action=''
            className='row'
            style={{ marginLeft: "5%", marginRight: "5%" }}
          >
            <div className='form-group gender col-md-6'>
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
                  Both{" "}
                </label>
              </div>
            </div>
            <div className='form-group col-md-6'>
              <label>
                Age
                <AgeRanger ages={ages} setAges={setAges} />
              </label>
            </div>
            <div className='row'>
              <div className='col-10'></div>
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
