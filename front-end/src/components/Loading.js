import React from "react";

export default function Loading() {
  return (
    <div>
      <div className='loader-container'>
        <div className='container'>
          <div className='switchbox'>
            <div className='switch'></div>
            <div className='switch'></div>
          </div>
          <h1
            style={{
              fontSize: "1rem !important",
              marginTop: "70px",
              color: "white",
            }}
          >
            Loading...
          </h1>
        </div>
      </div>
    </div>
  );
}
