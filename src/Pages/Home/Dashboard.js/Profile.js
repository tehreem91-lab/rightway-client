import React from 'react'
import { useSelector } from "react-redux";
import CustomInnerHeader from '../../../Components/CustomInnerHeader';
const Profile = () => {
    const showNavMenu = useSelector((state) => state.NavState);
  return (
    <>
    <div className={`container-fluid page-title-bar ${showNavMenu == false ? "right_col-margin-remove" : ""}   `} >
                <CustomInnerHeader moduleName={"User Profile"} isShowSelector={true} />
            </div>
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
      <div class="x_content">
									<br />
									<form id="demo-form2" data-parsley-validate class="form-horizontal form-label-left">

										<div class="item form-group">
											<label class="col-form-label col-md-3 col-sm-3 label-align" for="first-name">First Name <span class="required">*</span>
											</label>
											<div class="col-md-6 col-sm-6 ">
												<input type="text" id="first-name" required="required" class="form-control " />
											</div>
										</div>
										<div class="item form-group">
											<label class="col-form-label col-md-3 col-sm-3 label-align" for="last-name">Last Name <span class="required">*</span>
											</label>
											<div class="col-md-6 col-sm-6 ">
												<input type="text" id="last-name" name="last-name" required="required" class="form-control" />
											</div>
										</div>
										
										
										
										<div class="ln_solid"></div>
										

									</form>
								</div>
    </div>
  </div>
  </>
  )
}

export default Profile