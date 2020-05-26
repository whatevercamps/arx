import React, { useEffect, useRef } from "react";
import $ from "jquery";
export default function LikeOrNot(props) {
  const reff = useRef();
  useEffect(() => {
    $("#staticBackdrop").modal("show");
    return () => {
      $("#staticBackdrop").modal("hide");
    };
  }, []);
  return (
    <div
      className='modal fade'
      ref={reff}
      id='staticBackdrop'
      data-backdrop='static'
      tabIndex='-1'
      role='dialog'
      aria-labelledby='staticBackdropLabel'
      aria-hidden='true'
    >
      <div
        className='modal-dialog modal-dialog-centered modal-sm'
        role='document'
      >
        <div className='modal-content text-center'>
          <div className='modal-header'>
            <h5 className='modal-title'>Did you like it?</h5>
          </div>
          <div className='modal-body mx-auto'>
            <button
              onClick={props.onHeart}
              id='scenesButton'
              type='button'
              className='btn btn-success yeah'
              data-dismiss='modal'
            >
              Yeah
            </button>
            <button
              onClick={props.onCancel}
              id='scenesButton'
              type='button'
              className='btn btn-danger nope'
              data-dismiss='modal'
            >
              Nope
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
