import React from "react";
import PropTypes from "prop-types";

function MatchList(props) {
  const clicked = (index) => {
    props.setCurrentChat(index);
  };
  return (
    <div className='MatchList'>
      <div className='row match-header'>
        <div className='row header'>
          <div className='col-11'>
            {" "}
            <h2>Chats</h2>
          </div>
          <div className='col-1'>
            <a href='/profile' id='prof-but'>
              <i style={{ fontSize: "30px" }} class='fas fa-user-circle'></i>
            </a>
          </div>
        </div>
        <form className='search-header'>
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
              <div className='row match-item' onClick={() => clicked(index)}>
                <div className='col-2'>
                  <i
                    style={{ fontSize: "40px" }}
                    class='fas fa-user-circle'
                  ></i>
                </div>
                <div className='col-10'>
                  <div className='row'>
                    <div className='col-9 name'>
                      {props.user.name === chat.user1name ? (
                        <p data-testid='name-display'>
                          {chat.user2name.split(" ")[0]}
                        </p>
                      ) : (
                        <p>{chat.user1name.split(" ")[0]}</p>
                      )}
                    </div>
                    <div className='col-3'>
                      <small>12:44</small>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-12 message'>
                      {chat.messages && chat.messages.length && (
                        <p>
                          {chat.messages[chat.messages.length - 1] &&
                            chat.messages[chat.messages.length - 1].split(
                              "%=%splitmessage%=%"
                            )[1]}
                        </p>
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
