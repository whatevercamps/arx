import React, { useState, useEffect } from "react";
import MatchList from "./MatchList";
function Matches(props) {
  const [currentChat, setCurrentChat] = useState(null);

  useEffect(() => {
    console.log("props conversations", props.conversations);
    console.log("props users", props.users);
  }, [props]);

  return (
    <div>
      <div className='row'>
        <div className='col-4'>
          <MatchList {...props} />
        </div>
        <div className='col-4'>
          {currentChat ? (
            {
              /* <Chat {...props} currentChat={currentChat} /> */
            }
          ) : (
            <></>
          )}
        </div>
        <div className='col-4'>{/* <Profile {...props} /> */}</div>
      </div>
    </div>
  );
}

export default Matches;
