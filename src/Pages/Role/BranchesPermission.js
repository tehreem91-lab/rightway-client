import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Select from "react-select";
import { customStyles } from "../../Components/reactCustomSelectStyle";
import { endPoint } from "../../config/Config";
const BranchesPermission = () => {
  const [branchesOptions, setBranchesOptions] = useState([]);
  const [branchesValues, setBranchesValues] = useState("");
  const [userOptions, setUserOptions] = useState([]);
  const [userValue, setUserValue] = useState("");
  const [userBranchesMainState, setUserBranchesMainState] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const accessToken = localStorage.getItem("access_token");
  const [isEditModeOn, setIsEditModeOn] = useState(false)
  const fetchUser = () => {
    // fetching user for selector
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + JSON.parse(accessToken).access_token
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${endPoint}api/Users`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        let optionArr = [];

        result.map((eachUser) => {
          optionArr.push({ value: eachUser.id, label: eachUser.userName });
        });
        setUserOptions(optionArr);
      })
      .catch((error) => console.log("error", error));
    // fetching branches for selector
    fetch(`${endPoint}api/BrachesConfig/GetData`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        let arrOptionForBr = [];
        result.map((eachBranch) => {
          arrOptionForBr.push({
            value: eachBranch.branch_id,
            label: eachBranch.branch_name,
          });
        });
        setBranchesOptions(arrOptionForBr);
      })
      .catch((error) => console.log("error", error));
    // fetching all data for table

    fetch(`${endPoint}/api/UserBranches/GetData`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setUserBranchesMainState(result);
        setisLoading(false);
      })
      .catch((error) => console.log("error", error));
  };
  const updateBranchesPermission = () => {
    let commaSeperatedBranches = [];
    branchesValues.map((eachBranch) => {
      commaSeperatedBranches.push(eachBranch.value);
    });
    let commaSeperatedString = commaSeperatedBranches.join(",").toString();
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + JSON.parse(accessToken).access_token
    );
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${endPoint}api/UserBranches/PutData?user_id=${userValue.value}&commaSeperatedString=${commaSeperatedString}`,
      requestOptions
    )
      .then((response) => {
        if (response.status === 200) {
          toast.success("Updated Successfully");
          // fetchUser()
          setIsEditModeOn(false)




          // setUserValue("");

          // setBranchesValues("");

          // fetching user for selector
          var myHeaders2 = new Headers();
          myHeaders2.append(
            "Authorization",
            "Bearer " + JSON.parse(accessToken).access_token
          );

          var requestOptions2 = {
            method: "GET",
            headers: myHeaders2,
            redirect: "follow",
          };

          setIsEditModeOn(false)
          fetch(`${endPoint}/api/UserBranches/GetData`, requestOptions2)
            .then((response) => response.json())
            .then((result) => {
              console.log(result , 'fethc after');
              setUserBranchesMainState(result);
              // setisLoading(false);
            })
            .catch((error) => console.log("error", error));

        }

        return response.json();
      })
      .then((result) => console.log(result))
      .catch((error) => {
        toast.error("Something went wrong")
      });
  };

  const showNavMenu = useSelector((state) => state.NavState);
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <div
        className={`container-fluid page-title-bar ${showNavMenu == false ? "right_col-margin-remove" : ""
          }   `}
      >
        <span>&nbsp; Branches Management</span>
      </div>
      {isLoading ? (
        <>loading</>
      ) : (
        <>
          {" "}
          <div
            role="main"
            className={`right_col  h-100  ${showNavMenu === false ? "right_col-margin-remove" : " "
              } `}
          >
            {
              isEditModeOn &&    <div className="x_panel">
              <div className="x_content my-3">
                <span className="section pl-4">
                  <i className="fa fa-edit"></i>&nbsp;Add Branches Permission
                </span>
                <div className="row">
                  <div className="field item form-group col-md-6 col-sm-6">
                    <label className="col-form-label col-md-3 col-sm-3 label-align">
                      {" "}
                      Select User <span className="required">*</span>
                    </label>
                    <div className="col-md-8 col-sm-8">
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        value={userValue}
                        isDisabled={true}
                        onChange={(e) => {
                          setUserValue(e);
                        }}
                        styles={customStyles}
                        isSearchable={true}
                        name="branches"
                        options={userOptions}
                      />
                    </div>
                  </div>
                  <div className="field item form-group col-md-6 col-sm-6">
                    <label className="col-form-label col-md-3 col-sm-3 label-align">
                      {" "}
                      Select Branches <span className="required">*</span>
                    </label>
                    <div className="col-md-8 col-sm-8">
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        isMulti
                        isDisabled={!isEditModeOn}
                        value={branchesValues}
                        onChange={(e) => {
                          setBranchesValues(e);
                        }}

                        styles={customStyles}
                        isSearchable={true}
                        name="branches"
                        options={branchesOptions}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12 text-right x_footer">
           
 
                    <button
                      className="btn btn-dark"
                      type="button"
            onClick={()=>setIsEditModeOn(false)}
                    >
                      Cancel
                    </button>
 
                    <button
                  
                      className="btn "
                      type="button"
                      onClick={() => updateBranchesPermission()}
                      style={{
                        backgroundColor: " #f79c74 ",
                        color: "white",
                        borderColor:"#f79c74 "
                      
                      }}
                      >
               
                      Update
                    </button>





              </div>
            </div>
            }
          

            <div className="x_panel  ">
              <div className="x_content">
                <span className="section pl-3">
                  <div className="row   pt-3">
                    <div className="col-3">
                      <i className="fa fa-list"></i>&nbsp;Listing
                    </div>
                    <div className="col-9 text-right "></div>
                  </div>
                </span>

                <div className="table-responsive px-3 pb-2">
                  <table className="table table-striped jambo_table bulk_action">
                    <thead>
                      <tr className="headings">
                        <th
                          className="column-title  right-border-1 text-center"
                          width="10%"
                        >
                          Sr.
                        </th>
                        <th className="column-title  right-border-1 text-center">
                          User
                        </th>
                        <th className="column-title  right-border-1 text-center">
                          Assign Branches
                        </th>
                        <th className="column-title text-center" width="10%">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {userBranchesMainState.map((eachUSer) => {
                        return (
                          <tr className="even pointer" key={eachUSer.user_id}>
                            <td className=" ">1</td>
                            <td className=" ">{eachUSer.user_name}</td>
                            <td className=" ">
                              {eachUSer.branches_detail.map(
                                (eachNestedBranch) => {
                                  return (
                                    <button
                                      style={{
                                        backgroundColor: " #f79c74 ",
                                        color: "white",
                                        borderRadius: "20px ",
                                      }}
                                      className="btn btn-sm  "
                                      key={eachNestedBranch.branch_id}
                                      s
                                    >
                                      {eachNestedBranch.branch_name}
                                    </button>
                                  );
                                }
                              )}
                            </td>
                            <td className="a-right a-right     text-center">
                              <i
                                className="fa fa-edit pl-3"
                                onClick={() => {
                                  setUserValue({
                                    label: eachUSer.user_name,
                                    value: eachUSer.user_id,
                                  });
                                  var branchesOpt = [];
                                  eachUSer.branches_detail.map((eachBrn) => {
                                    branchesOpt.push({
                                      label: eachBrn.branch_name,
                                      value: eachBrn.branch_id,
                                    });
                                  });
                                  setBranchesValues(branchesOpt);
                                  setIsEditModeOn(true) 
                                  //==========================================================
                                  //Add here function to go to top of screen window.scrol
                                  //==========================================================
                                }}
                              ></i>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BranchesPermission;
