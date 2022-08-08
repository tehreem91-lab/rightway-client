import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../../Layout/Loader/Loader.js";
import { endPoint } from "../../config/Config.js";
import { toast } from "react-toastify";
import axios from "axios";

const AddBranches = () => {
  const showNavMenu = useSelector((state) => state.NavState);
  const [isLoading, setisLoading] = useState(false);
  const [branchList, setBranchList] = useState([{}]);
  const [addNewBranchTitle, setAddNewBranchTitle] = useState("");
  const [editBranchState, setEditBranchState] = useState({
    branch_id: "",
    branch_name: "",
  });

  const [visableDiv, setVisableDiv] = useState("true");
  const setDivToVisable = (displayDiv) => {
    setVisableDiv(displayDiv);
  };

  const fetchAllData = async () => {
    var config = {
      method: "get",
      url: `${endPoint}api/BrachesConfig/GetData  `,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("access_token")).access_token
        }`,
      },
    };

    await axios(config)
      .then(function (response) {
        setBranchList(response.data);
        setisLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const addNewBranch = (e) => {
    e.preventDefault();
    var config = {
      method: "post",
      url: `${endPoint}api/BrachesConfig/PostData?branch_name=${addNewBranchTitle}`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("access_token")).access_token
        }`,
      },
    };

    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          setAddNewBranchTitle("");
          fetchAllData();
          toast.success("Branch Added Successfully");
        } else if (response.status === 400) {
          toast.error("Already Exist");
        }
      })
      .catch(function (error) {
        toast.error("Already Exist");
      });
  };
  const deleteBranch = async (id) => {
    var config = {
      method: "delete",
      url: `${endPoint}api/BrachesConfig/DeleteData?branch_id=${id}`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("access_token")).access_token
        }`,
      },
    };

    await axios(config)
      .then(function (response) {
        fetchAllData();
        toast.success("Branch Deleted Successfully");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const editBranch = () => {
    var config = {
      method: "put",
      url: `${endPoint}api/BrachesConfig/PutData?branch_id=${editBranchState.branch_id}&branch_name=${editBranchState.branch_name}`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("access_token")).access_token
        }`,
      },
    };

    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          toast.success("Updated Sucessfully ");
          fetchAllData();
        } else if (response.status === 400) {
          toast.error("Already Exist");
        }
      })
      .catch(function (error) {
        toast.error("Already Exist");
      });
  };
  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <div
            className={`container-fluid page-title-bar ${
              showNavMenu == false ? "right_col-margin-remove" : ""
            }   `}
          >
            <span>&nbsp;Manage Branch</span>
          </div>
          <div
            role="main"
            className={`right_col  h-100  ${
              showNavMenu === false ? "right_col-margin-remove" : " "
            } `}
          >
            <div className="x_panel">
              <div className="x_content my-3">
                <span className="section pl-4">
                  <i className="fa fa-edit"></i>&nbsp;Add/Edit Branch
                </span>
                <div className="row">
                  <div className="field item form-group col-md-6 col-sm-6">
                    <label className="col-form-label col-md-3 col-sm-3 label-align">
                      {" "}
                      Branch Title <span className="required">*</span>
                    </label>
                    <div className="col-md-8 col-sm-8">
                      {visableDiv === "true" && (
                        <input
                          className="form-control"
                          data-validate-length-range={6}
                          data-validate-words={2}
                          name="name"
                          placeholder="Enter Branch Title"
                          value={addNewBranchTitle}
                          onChange={(e) => setAddNewBranchTitle(e.target.value)}
                        />
                      )}

                      {visableDiv === "false" && (
                        <input
                          className="form-control"
                          data-validate-length-range={6}
                          data-validate-words={2}
                          name="name"
                          placeholder="Enter Branch Title"
                          value={editBranchState.branch_name}
                          onChange={(e) =>
                            setEditBranchState({
                              ...editBranchState,
                              branch_name: e.target.value,
                            })
                          }
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12 text-right x_footer">
                <button
                  className="btn btn-dark"
                  type="button"
                  onClick={(e) => {
                    setDivToVisable("true");
                    setAddNewBranchTitle("");
                  }}
                >
                  Cancel
                </button>

                {visableDiv === "true" && (
                  <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={(e) => {
                      setDivToVisable("true");
                      addNewBranch(e);
                      setEditBranchState(e);
                    }}
                  >
                    Submit
                  </button>
                )}

                {visableDiv === "false" && (
                  <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={(e) => {
                      setDivToVisable("true");
                      editBranch();
                    }}
                  >
                    Update
                  </button>
                )}
              </div>
            </div>

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
                          {" "}
                          SR#{" "}
                        </th>
                        <th className="column-title  right-border-1 text-center">
                          Branch Name
                        </th>
                        <th className="column-title text-center" width="10%">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {branchList.map((item, index) => {
                        return (
                          <tr className="even pointer" key={item.branch_id}>
                            <td className=" ">{index + 1}</td>
                            <td className=" "> {item.branch_name} </td>
                            <td className="a-right a-right     text-center">
                              <i
                                className="fa fa-edit pl-3"
                                onClick={() => {
                                  setDivToVisable("false");
                                  setEditBranchState({
                                    branch_id: item.branch_id,
                                    branch_name: item.branch_name,
                                  });
                                }}
                              ></i>
                              <i
                                className="fa fa-trash-o pl-3"
                                onClick={() => {
                                  deleteBranch(item.branch_id);
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

export default AddBranches;
