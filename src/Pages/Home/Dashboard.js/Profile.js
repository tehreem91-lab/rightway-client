import React from 'react'
import { useSelector } from "react-redux";
import CustomInnerHeader from '../../../Components/CustomInnerHeader';
const Profile = () => {
    const showNavMenu = useSelector((state) => state.NavState);
  return (
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
       
      </div>
    </div>
  </div>
  )
}

export default Profile