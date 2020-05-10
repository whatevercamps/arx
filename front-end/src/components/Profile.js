import React from "react";

const Profile = () => {
  return (
    <div className='Profile'>
      <div className='container profile-content'>
        <div className='text-center'>
          {" "}
          <i style={{ fontSize: "100px" }} className='fas fa-user-circle'></i>
          <h3>David Bautista</h3>
        </div>
        <hr />
        <div>
          <small>Age</small>
          <p>22 years</p>
        </div>
        <hr />
        <div>
          <small>Gender</small>
          <p>Male</p>
        </div>
        <hr />
        <div>
          <small>School</small>
          <p>Universidad de los Andes</p>
        </div>
        <hr />
        <div>
          <small>Location</small>
          <p>Colombia</p>
        </div>
        <hr />
        <div className='row tastes'>
          <div className='col-10'>
            {" "}
            <p>Tastes</p>
          </div>
          <div className='col-2'>
            {" "}
            <button>
              {" "}
              <i class='fas fa-chevron-right'></i>
            </button>
          </div>
        </div>
        <hr />
        <div className='row edit-profile'>
          <div className='col-10'></div>
          <div className='col-2'>
            <button className='edit-button'>
              <i className='fas fa-pencil-alt'></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
