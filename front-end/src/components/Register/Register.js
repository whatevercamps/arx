import React, { useState, useEffect } from "react";
import Register1 from "./Register1";
import Register2 from "./Register2";
import Register3 from "./Register3";

const Register = (props) => {
  const [page, setPage] = useState(1);

  const changePage1 = () => {
    setPage(1);
  };

  const changePage2 = () => {
    setPage(2);
  };

  const changePage3 = () => {
    setPage(3);
  };

  useEffect(() => {
    if (props.user)
      if (!props.user.name || !props.user.age || !props.user.gender) setPage(1);
      else if (!props.user.lookingFor) setPage(2);
  }, [props.user]);

  return props.user ? (
    <div className='Register'>
      {page === 1 && <Register1 changePage2={changePage2} {...props} />}
      {page === 2 && (
        <Register2
          changePage1={changePage1}
          changePage3={changePage3}
          {...props}
        />
      )}
      {page === 3 && <Register3 changePage2={changePage2} {...props} />}
    </div>
  ) : (
    <></>
  );
};

export default Register;
