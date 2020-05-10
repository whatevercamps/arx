import React from "react";
import PropTypes from "prop-types";

function MatchList(props) {
  return (
    <div className='MatchList'>
      <div className='row no-gutters'>
        <form>
          <div className='form-group'>
            <label>
              <h2>Chats</h2>
              <input
                type='text'
                placeholder='Search'
                className='form-control'
              />
            </label>
          </div>
        </form>
      </div>
      <hr />
      <div className='row'>
        <div className='col-12'>
          {props.conversations &&
            props.conversations.length &&
            props.conversations.map((chat) => (
              <div className='row match-item'>
                <div className='col-2'>
                  <i
                    style={{ fontSize: "35px" }}
                    class='fas fa-user-circle'
                  ></i>
                </div>
                <div className='col-10'>
                  <div className='row'>
                    <div className='col-8'>
                      {props.user.name === chat.user1name ? (
                        <p data-testid='name-display'>{chat.user2name}</p>
                      ) : (
                        <p>{chat.user1name}</p>
                      )}
                    </div>
                    <div className='col-4'>
                      <small>12:44</small>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-12'>
                      {chat.messages &&
                        chat.messages.length &&
                        chat.messages[chat.messages.length - 1]}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

MatchList.propTypes = {};

export default MatchList;
