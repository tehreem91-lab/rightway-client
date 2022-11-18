import React, { useState } from 'react'
import { useSelector } from "react-redux";
import CustomInnerHeader from '../../../Components/CustomInnerHeader';
import { toast } from "react-toastify";

const Profile = () => {

    const role = (localStorage.getItem("role_name"))
    const user = (localStorage.getItem("user_name"))
    const userId = (localStorage.getItem("user_id")).replace(/['"]+/g, '')
    const [isValidateAllStates,setisValidateAllStates]=useState(true)
    const [newPassVal,setnewPassVal]=useState(true)
    console.log(userId);
    const [Password, setPassword] = useState({ old: '', new: '' })
    const changePass = (e) => {

        e.preventDefault()
        var axios = require('axios');
        //
        var pass = Password.new;
let validation=true;
if(Password.new=='' || Password.old ==''){
    validation=false;
}
setisValidateAllStates(validation)
if(validation===true){
        var reg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
        var test = reg.test(pass);
        if (test) {
            setnewPassVal(true)
            var config = {
                method: 'post',
                url: `http://rightway-api.genial365.com/api/Users/changePassword?Userid=${userId}&UserOldPassword=${Password.old}&UserNewPassword=${Password.new}`,
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token
                        }`,
                }
            };
    
            axios(config)
                .then(function (response) {
                    toast.success(
                        "Password has been " +
                        ("Changed" + " successfully!")
                    );
                   
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            setnewPassVal(false)
        }
      





    }

    }

    const showNavMenu = useSelector((state) => state.NavState);
    return (
        <>
            <div className={`container-fluid page-title-bar ${showNavMenu == false ? "right_col-margin-remove" : ""}   `} >
                <CustomInnerHeader moduleName={"User Profile"} isShowSelector={true} />
            </div>
            <div
                className={`right_col  h-10 heightFixForFAult  ${showNavMenu == false ? "right_col-margin-remove" : " "
                    } `}
                role="main"
            >
                {" "}
                <div className="x_panel">
                    <div className="x_content  ">
                        <span className="section pl-4">
                            <i className="fa fa-edit"></i>&nbsp;User Profile
                        </span>



                    </div>
                    <div className="x_content">

                        <form id="demo-form2" data-parsley-validate className="form-horizontal form-label-left">

                            <div className="item form-group">
                                <label className="col-form-label col-md-3 col-sm-3 label-align" for="first-name">User Name <span className="required">*</span>
                                </label>
                                <div className="col-md-6 col-sm-6 ">
                                    <input type="text" value={user} className="form-control " />
                                </div>
                            </div>
                            <div className="item form-group">
                                <label className="col-form-label col-md-3 col-sm-3 label-align" for="last-name">Role  <span className="required">*</span>
                                </label>
                                <div className="col-md-6 col-sm-6 ">
                                    <input type="text" className="form-control" value={role} />
                                </div>
                            </div>
                            <div className="item form-group">
                                <label className="col-form-label col-md-3 col-sm-3 label-align" for="last-name">Old Password  <span className="required">*</span>
                                </label>
                                <div className="col-md-6 col-sm-6 ">
                                    <input type="password" required="required" className="form-control" value={Password.old} onChange={(e) => setPassword({ ...Password, old: e.target.value })} />
                                    {!isValidateAllStates && (Password.old == "") && <span className="text-danger">First Select this </span>}
                               
                                </div>
                            </div>
                            <div className="item form-group">
                                <label className="col-form-label col-md-3 col-sm-3 label-align" for="last-name">New Password  <span className="required">*</span>
                                </label>
                                <div className="col-md-6 col-sm-6 ">
                                    <input type="password" required="required" className="form-control" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" value={Password.new} onChange={(e) => setPassword({ ...Password, new: e.target.value })} />
                                    {!isValidateAllStates && (Password.new == "") && <span className="text-danger">First Select this </span>}
                                    {!newPassVal  && <span className="text-danger">Password must be of (8 to 15) characters which must be alphanumeric and must contain special characters </span>}
                                   
                                    
                                </div>
                            </div>
                            <div className="item form-group">
                                <div className="col-md-12 text-right ">
                                    <button className="btn btn-primary text-light" type="submit" onClick={changePass}>Change Password</button>
                                </div>
                            </div>




                            <div className="ln_solid"></div>


                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile