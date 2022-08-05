import React from "react";
import "./Loader.css";
import { useSelector } from "react-redux";
const Loader = () => {
  const showNavMenu = useSelector((state) => state.NavState);
  return (
    <>
      <div
        className={`right_col    heightOfLoader   ${
          showNavMenu === false ? "right_col-margin-remove" : " "
        }  `}
        role="main"
      >
        <div className="loader   " style={{ marginTop: "250px" }}>
          <div className="outer" />
          <div className="middle" />
          <div className="inner" />
        </div>
      </div>
    </>
  );
};

export default Loader;
