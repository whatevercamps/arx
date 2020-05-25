import React from "react";

const Profile = (props) => {
  return (
    <div className='Profile'>
      {props.user ? (
        <div className='container profile-content'>
          <div className='text-center'>
            {" "}
            <i style={{ fontSize: "100px" }} className='fas fa-user-circle'></i>
            <h3>{props.user.name}</h3>
          </div>
          <hr />
          <div>
            <small>About</small>
            <p>{props.user.about}</p>
          </div>
          <hr />
          <div>
            <small>Age</small>
            <p>{props.user.age} years</p>
          </div>
          <hr />
          <div>
            <small>Gender</small>
            <p>{props.user.gender}</p>
          </div>
          <hr />
          <div>
            <small>Email</small>
            <p>{props.user.email}</p>
          </div>
          <hr />
          <div>
            <small>Location</small>
            <p>{props.user.city}</p>
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
      ) : (
        <></>
      )}
    </div>
  );
};

export default Profile;
