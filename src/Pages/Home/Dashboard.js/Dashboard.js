import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../../../Layout/Loader/Loader";
import { endPoint } from "../../../config/Config";
import { toast } from "react-toastify";

const Dashboard = () => {
  const showNavMenu = useSelector((state) => state.NavState);
  return (
    <>
      <div
        className={`right_col  h-10 heightFixForFAult  ${
          showNavMenu == false ? "right_col-margin-remove" : " "
        } `}
        role="main"
      >
        {" "}
        <div className="x_panel">
          <div className="x_title">
            <h2 className="pl-2 pt-2">Welcome to Rightway</h2>
            <ul className="nav navbar-right panel_toolbox d-flex justify-content-end"></ul>
            <div className="clearfix" />
          </div>
          <div className="x_content m-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est qui
            corporis praesentium officiis animi iusto dolores porro neque
            soluta. Repudiandae magnam enim consequuntur unde quibusdam sint
            quae tenetur, doloremque temporibus!
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
