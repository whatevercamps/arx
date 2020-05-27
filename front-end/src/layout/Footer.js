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
    <footer className='Footer'>
      <div className='container'>
        <div className='row'>
          <div className='col-6 copyright'>
            <p>
              Arx App All rights reserved 2020{" "}
              <FontAwesomeIcon icon={faCopyright}></FontAwesomeIcon>
            </p>
          </div>
          <div className='col-6 social'>
            <a
              aria-label='instagram'
              href='https://www.instagram.com/arxapp/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <span>
                <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
              </span>
            </a>
            <a
              aria-label='facebook'
              href='https://www.facebook.com/ArxColombia'
              target='_blank'
              rel='noopener noreferrer'
            >
              <span>
                <FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon>
              </span>
            </a>
            <a
              aria-label='twitter'
              href='https://twitter.com/Arx_App'
              target='_blank'
              rel='noopener noreferrer'
            >
              <span>
                <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
