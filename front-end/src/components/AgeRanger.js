import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Range, getTrackBackground } from "react-range";

const AgeRanger = (props) => {
  const STEP = 1;
  const MIN = 18;
  const MAX = 90;

  const [values, setValues] = useState([]);

  const changeValues = (v) => {
    if (v[0] >= v[1]) {
      if (MAX - v[1] > 2) {
        v[1] = v[1] + 1;
      } else {
        v[0] = v[0] - 1;
      }
    }

    setValues(v);
  };

  useEffect(() => {
    setValues(props.ages);
  }, []);

  return (
    values.length && (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Range
          values={values}
          step={STEP}
          min={MIN}
          max={MAX}
          onChange={(values) => changeValues(values)}
          onFinalChange={(values) => props.setAges(values)}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: "36px",
                display: "flex",
                width: "100%",
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: "5px",
                  width: "100%",
                  borderRadius: "4px",
                  background: getTrackBackground({
                    values: values,
                    colors: ["#ccc", "#548BF4", "#ccc"],
                    min: MIN,
                    max: MAX,
                  }),
                  alignSelf: "center",
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ index, props, isDragged }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "22px",
                width: "40px",
                borderRadius: "4px",
                backgroundColor: "#FFF",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 2px 6px #AAA",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "32px",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "11px",
                  fontFamily: "Arial,Helvetica Neue,Helvetica,sans-serif",
                  padding: "4px",
                  borderRadius: "4px",
                  backgroundColor: "#548BF4",
                  width: "60px",
                }}
              >
                {values[index]}
              </div>
              <div
                style={{
                  height: "16px",
                  width: "5px",
                  backgroundColor: isDragged ? "#548BF4" : "#CCC",
                }}
              />
            </div>
          )}
        />
      </div>
    )
  );
};

export default AgeRanger;
