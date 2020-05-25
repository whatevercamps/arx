import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faCommentDots,
  faStopwatch,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = (props) => {
  return (
    <div className='Navbar'>
      <div className='container'>
        <div className='row'>
          <div className='col-6 logo'>
            <a href='/'>
              <svg
                id='arx-icon'
                data-name='arx-icon'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 300 300'
              >
                <defs></defs>
                <g id='QR6piZ.tif'>
                  <path
                    className='cls-1'
                    d='M257.86,184.68c-1.25,3.65-1.25,7.51-2,11.25a106.24,106.24,0,0,1-25.18,50.38c-15.58,17.51-34.82,29-57.76,33.91a105.49,105.49,0,0,1-67.35-7.16A106.75,106.75,0,0,1,61,235.64a104.7,104.7,0,0,1-17.23-42.4C40.37,173,42.25,153.39,50,134.45A107.16,107.16,0,0,1,92.64,83.58a104.05,104.05,0,0,1,40.68-15.36A108,108,0,0,1,239,113.9a105.66,105.66,0,0,1,17.34,42.37c.53,3.07.45,6.25,1.52,9.23ZM149.68,266.05c49.06-.26,91-38.5,91.44-90.81.4-48.87-38.11-91-90.61-91.49-49.14-.44-91.22,38.32-91.56,90.8C58.63,223.81,97.53,265.09,149.68,266.05Z'
                  />
                  <path
                    className='cls-1'
                    d='M168.69,17.24c4.64,1.9,6.57,5.3,6.28,10.33-.26,4.73,0,9.49-.06,14.24,0,4.38-2.54,7.72-6.76,8.47-1.45.26-1.57.79-1.54,1.93,0,2.16,0,4.32,0,6.48,0,1-.08,1.46-1.39,1.27a104.7,104.7,0,0,0-30.41,0c-1.32.19-1.42-.24-1.4-1.27,0-2.16,0-4.32,0-6.48,0-1.14-.09-1.67-1.55-1.93-4.22-.75-6.74-4.09-6.76-8.47,0-4.75.21-9.51-.06-14.24-.29-5,1.64-8.43,6.28-10.33Z'
                  />
                  <path
                    className='cls-1'
                    d='M68.13,64.07a7.93,7.93,0,0,1,3.78-6.93c5-3,10-6,15.18-8.75,4.1-2.19,8.48-.88,10.93,3.15,2.87,4.68,5.52,9.5,8.34,14.22.68,1.15.36,1.55-.75,2a115.42,115.42,0,0,0-26,15.07c-.88.68-1.41,1-2.13-.28C74.8,77.76,72,73,69.28,68.25A7.59,7.59,0,0,1,68.13,64.07Z'
                  />
                  <path
                    className='cls-1'
                    d='M209.8,47.37a10.55,10.55,0,0,1,4.3,1.54c4.31,2.5,8.64,5,12.93,7.49,5.05,3,6.24,7.37,3.38,12.47-2.53,4.5-5.17,8.92-7.69,13.41-.62,1.09-1,1.57-2.23.6a111.71,111.71,0,0,0-26-15.08c-1.37-.55-1.34-1.07-.67-2.2,2.72-4.58,5.32-9.23,8-13.8A8.64,8.64,0,0,1,209.8,47.37Z'
                  />
                </g>
                <path
                  className='cls-1'
                  d='M150.72,251.45h.36A.23.23,0,0,0,150.72,251.45Z'
                />
                <path
                  className='cls-1'
                  d='M150.72,251.45h0l0,0S150.7,251.46,150.72,251.45Z'
                />
                <path
                  className='cls-1'
                  d='M216,154.51a9.17,9.17,0,0,1-.33-2.14,30.37,30.37,0,0,0-11.93-19.81,34,34,0,0,0-18.15-6.94c-.17,0-.37.06-.49-.13h-6a7.74,7.74,0,0,1-2.14.31c-8.71,1-15.53,5.21-20.79,12.12a73,73,0,0,0-6.38,10.18c-.19.35-.38.7-.58,1.09a3,3,0,0,1-.62-.95A62.81,62.81,0,0,0,139.05,135a28.56,28.56,0,0,0-18.71-8.57,37.54,37.54,0,0,0-16.59,1.92c-11.1,4.22-18.3,11.94-20.9,23.69-.23,1-.31,2.11-.46,3.17,0,.14,0,.32-.15.4v4.68c.15,0,.13.16.13.26.55,8.1,3.15,15.58,6.82,22.74a123.94,123.94,0,0,0,15.15,22.28,317.45,317.45,0,0,0,24.89,26.2C136,238.26,143,244.62,149.94,251l.3.28c-.21.22-.5,0-.68.19h1.14c1.23-1.35,2.4-2.77,3.7-4,9.89-9.61,19.79-19.2,29.11-29.38a198.38,198.38,0,0,0,19.1-23.87,87.8,87.8,0,0,0,10.61-21,53.68,53.68,0,0,0,2.62-12.72c0-.17-.07-.37.14-.48Zm-63,52.8a8.23,8.23,0,0,1-11-6.08c-.44-2,.34-3.8.74-5.64,2.34-10.75,4.75-21.49,7.14-32.23a3.13,3.13,0,0,1,.28-.41c1.54,6.91,3,13.61,4.52,20.32,1.12,5.06,2.25,10.12,3.35,15.19A7.83,7.83,0,0,1,153,207.31Z'
                />
              </svg>
            </a>
          </div>

          <div className='col-6 profile'>
            <a href='/meet'>
              <span>
                {" "}
                <FontAwesomeIcon icon={faStopwatch}></FontAwesomeIcon>
              </span>
            </a>
            <a
              href={
                props.conversations && props.conversations.length
                  ? "/"
                  : "/meet"
              }
            >
              <span>
                {" "}
                <FontAwesomeIcon icon={faCommentDots}></FontAwesomeIcon>
              </span>
            </a>
            {props.user ? (
              <span onClick={props.handleLogout} style={{ cursor: "pointer" }}>
                {" "}
                <FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon> Signout
              </span>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
