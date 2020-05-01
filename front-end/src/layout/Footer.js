import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <div className='Footer'>
      <div className='container'>
        <div className='row'>
          <div className='col-6 copyright'>
            <p>
              Arx App All rights reserved 2020{" "}
              <FontAwesomeIcon icon={faCopyright}></FontAwesomeIcon>
            </p>
          </div>
          <div className='col-6 social'>
            <span>
              {" "}
              <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
            </span>
            <span>
              {" "}
              <FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon>
            </span>
            <span>
              {" "}
              <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
