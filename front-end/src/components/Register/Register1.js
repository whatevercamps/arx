import React, { useState, useEffect } from "react";

const Register1 = (props) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    if (props.user) {
      setName(props.user.name || "");
      setAge(props.user.age);
      setCity(props.user.city || "");
      setGender(props.user.gender || []);
      setAbout(props.user.about || "");
    }
  }, [props.user]);

  const endFirstStep = (evt) => {
    evt.preventDefault();
    const payload = {
      name: name,
      age: age,
      gender: gender,
      city: city,
      about: about,
    };
    console.log("user", props.user);
    if (props.user)
      fetch(`http://localhost:3001/users/update?userid=${props.user._id}`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },

        body: JSON.stringify(payload),
      })
        .then((res) => {
          if (res.status && res.status === 200) return res.json();
        })
        .then((data) => {
          console.log("data", data);
          props.changeUserData(payload);
          props.changePage2();
        });
  };

  return (
    <div className='Register'>
      <div className='container'>
        <div className='col-3'></div>
        <div className='col-6 register-content'>
          <h2>Complete your profile</h2>
          <p>Complete your profile adding some information in the next steps</p>
          <form onSubmit={endFirstStep}>
            <div className='form-group'>
              <label>
                Name
                <input
                  type='text'
                  placeholder='David Bautista'
                  className='form-control'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
            </div>
            <div className='form-group row'>
              <label className='col-md-4'>
                Age
                {age ? (
                  <input
                    type='number'
                    value={age}
                    className='form-control'
                    onChange={(e) => setAge(1 * e.target.value)}
                  />
                ) : (
                  <input
                    type='number'
                    className='form-control'
                    onChange={(e) => setAge(1 * e.target.value)}
                  />
                )}
              </label>
              <label className='col-md-8'>
                City
                <input
                  type='text'
                  value={city}
                  className='form-control'
                  placeholder='Bogotá'
                  onChange={(e) => setCity(e.target.value)}
                />
              </label>
            </div>
            <div className='form-group'>
              <label>
                About you
                <input
                  type='textarea'
                  value={about}
                  className='form-control'
                  onChange={(e) => setAbout(e.target.value)}
                />
              </label>
            </div>
            <div className='form-group gender'>
              <label>Gender</label>
              <div className='custom-control custom-radio custom-control-inline'>
                <input
                  type='radio'
                  id='customRadioInline1'
                  name='customRadioInline1'
                  className='custom-control-input'
                />
                <label
                  className='custom-control-label'
                  for='customRadioInline1'
                >
                  Male{" "}
                </label>
              </div>
              <div className='custom-control custom-radio custom-control-inline'>
                <input
                  type='radio'
                  id='customRadioInline2'
                  name='customRadioInline2'
                  className='custom-control-input'
                />
                <label
                  className='custom-control-label'
                  for='customRadioInline2'
                >
                  Female{" "}
                </label>
              </div>
              <div className='custom-control custom-radio custom-control-inline'>
                <input
                  type='radio'
                  id='customRadioInline3'
                  name='customRadioInline3'
                  className='custom-control-input'
                />
                <label
                  className='custom-control-label'
                  for='customRadioInline3'
                >
                  Non Binary{" "}
                </label>
              </div>
            </div>
            <div className='row'>
              {" "}
              <div className='col-10'></div>
              <div className='col-2'>
                {" "}
                <button type='submit'>Next</button>
              </div>
            </div>
          </form>
        </div>
        <div className='col-3'></div>
      </div>
    </div>
  );
};

export default Register1;
