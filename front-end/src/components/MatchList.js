import React from "react";
import PropTypes from "prop-types";

function MatchList(props) {
  return (
    <div className='MatchList'>
      <div className='row match-header'>
        <div className='header'>
          <h2>Chats</h2>
        </div>
        <form>
          <div className='form-group'>
            <input type='text' placeholder='Search' className='form-control' />
          </div>
        </form>
      </div>
      <div className='row'>
        <div className='col-12'>
          {props.conversations &&
            props.conversations.length &&
            props.conversations.map((chat, index) => (
              <div
                className='row match-item'
                onClick={() => props.setCurrentChat(index)}
              >
                <div className='col-2'>
                  <i
                    style={{ fontSize: "35px" }}
                    class='fas fa-user-circle'
                  ></i>
                </div>
                <div className='col-10'>
                  <div className='row'>
                    <div className='col-9 name'>
                      {props.user.name === <p>{chat.user1name}</p> ? (
                        <p data-testid='name-display'>{chat.user2name}</p>
                      ) : (
                        <p>{chat.user1name}</p>
                      )}
                    </div>
                    <div className='col-3'>
                      <small>12:44</small>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-12 message'>
                      {chat.messages && chat.messages.length && (
                        <p>{chat.messages[chat.messages.length - 1]}</p>
                      )}
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

MatchList.propTypes = {};

export default MatchList;
