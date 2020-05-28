import React, { useRef, useEffect, useState } from "react";
import Particles from "./Particles";

export default function ParticlesWrapper(props) {
  const particlesContainerRef = useRef();
  const [pA, setPA] = useState(null);
  useEffect(() => {
    console.log("cambio props.userdata", pA, props.usersData);
    if (props.usersData && props.usersData.users) {
      if (pA) {
        console.log("agregando usuarios de particles", props.usersData.users);
        pA.addUsers(props.usersData.users);
      } else {
        const pAA = Particles(
          props.usersData,
          particlesContainerRef.current,
          particlesContainerRef.current.offsetWidth,
          particlesContainerRef.current.offsetHeight
        );
        console.log("pA creado", pAA);

        setPA(pAA);
      }
    } else if (props.usersData && props.usersData.noUser) {
      console.log(
        "deberia elminar usuario de particles si existe particles",
        props.usersData.noUser,
        pA
      );
      if (pA) {
        console.log("eliminando usuario de particles", props.usersData.noUser);
        pA.removeUser(props.usersData.noUser);
      }
    }
  }, [props.usersData]);

  useEffect(() => {
    console.log("cambio pA", pA);
  }, [pA]);

  return (
    <div className='ParticlesWrapper'>
      <div
        className='particles'
        ref={particlesContainerRef}
        style={{ width: "100vw", height: "100vh" }}
      ></div>
    </div>
  );
}
