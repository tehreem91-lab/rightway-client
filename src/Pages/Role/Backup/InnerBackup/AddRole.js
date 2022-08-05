import React, { useEffect, useState } from "react";
import Loader from "../../Layout/Loader/Loader";
import "./Role.css";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {endPoint} from '../../config/Config'
const AddRole = () => {
 
  const showNavMenu = useSelector((state) => state.NavState);
  const URL = localStorage.getItem("authUser");
  const [isLoading, setisLoading] = useState(true);

  const [displayUserRegBox, setdisplayUserRegBox] = useState(true);
  const [currentEditUser, setCurrentEditUser] = useState({ name: "", id: "" });

  const [RoleRegistered, setRoleRegistered] = useState([]);
  const [roleRegisteredAdd, setRoleRegisteredAdd] = useState("");
  const notifyAdd = () => toast("Role Added Successfully!");
  const notifyErr = () => toast("Somthing wrong try again!");
  const notifyDelete = () => toast("Deleted Successfully!");
  const notifyUpdate = () => toast("Updated Successfully!");

  //   Edit Model
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Create
  // const AddRoleRegistered = (e) => {
  //   e.preventDefault(e);

  //   fetch(URL + `/api/Roles?InputPageName=${roleRegisteredAdd}`, {
  //     method: "POST",
  //     // headers: {
  //     //   Authorization:
  //     //     JSON.parse(localStorage.getItem("authUser")).token_type +
  //     //     " " +
  //     //     JSON.parse(localStorage.getItem("authUser")).access_token,
  //     //   "Content-Type": "application/x-www-form-urlencoded",
  //     // },
  //   })
  //     .then((response) => {
  //       fetchAllData();
  //       setRoleRegisteredAdd("");
  //       notifyAdd();
  //     })
  //     .catch((error) => {
  //       console.log("error", error);
  //       notifyErr();
  //     });
  // };
  const AddRoleRegistered = (e) => {
    e.preventDefault(e);

    fetch(URL + `api/Roles?InputPageName=${roleRegisteredAdd}`, {
      method: "POST",
      headers: {
        Authorization:
        `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => {
        fetchAllData();
        setRoleRegisteredAdd("");
        notifyAdd();
      })
      .catch((error) => {
        console.log("error", error);
        notifyErr();
      });
  };
  //  Read
  // const fetchAllData = () => {
  //   fetch(URL + "/api/Roles")
  //     .then((response) => response.json())
  //     .then((json) => {
  //       setRoleRegistered(json);
  //       setisLoading(false);
  //     });
  // };
  // Delete
  const fetchAllData = () => {
    fetch(`${endPoint}api/Roles`, {
      method: "GET",
      headers: {
        Authorization:
        `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setRoleRegistered(json);
        setisLoading(false);
      });
  };

  

  // const deleteRoleRigistered = (idToBeDelete) => {
  //   fetch(`${URL}/api/Roles/${idToBeDelete}`, {
  //     method: "DELETE",
  //     // headers: {
  //     //   Authorization:
  //     //     JSON.parse(localStorage.getItem("authUser")).token_type +
  //     //     " " +
  //     //     JSON.parse(localStorage.getItem("authUser")).access_token,
  //     //   "Content-Type": "application/x-www-form-urlencoded",
  //     // },
  //   })
  //     .then((response) => {
  //       // deleteing Role for this Id

  //       fetchAllData();
  //       notifyDelete();
  //     })
  //     .catch((error) => {
  //       console.log("error", error);
  //       notifyErr();
  //     });
  // };
  // Update
  
  const deleteRoleRigistered = (idToBeDelete) => {
    fetch(`${endPoint}api/Roles/${idToBeDelete}`, {
      method: "DELETE",
      headers: {
        Authorization:
        `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => {
        // deleteing Role for this Id

        fetchAllData();
        notifyDelete();
      })
      .catch((error) => {
        console.log("error", error);
        notifyErr();
      });
  };

  // const UpdateRoleRegistered = () => {
  //   fetch(
  //     URL +
  //       `/api/Roles/${currentEditUser.id}?roleName=${currentEditUser.name}'`,
  //     {
  //       method: "PUT",
  //       // headers: {
  //       //   Authorization:
  //       //     JSON.parse(localStorage.getItem("authUser")).token_type +
  //       //     " " +
  //       //     JSON.parse(localStorage.getItem("authUser")).access_token,
  //       //   "Content-Type": "application/x-www-form-urlencoded",
  //       // },
  //     }
  //   )
  //     .then((response) => {
  //       notifyUpdate();
  //       fetchAllData();
  //     })
  //     .catch((error) => {
  //       console.log("error", error);
  //       notifyErr();
  //     });
  // };
  
  const UpdateRoleRegistered = () => {
    fetch(
      URL +
        `api/Roles/${currentEditUser.id}?roleName=${currentEditUser.name}'`,
      {
        method: "PUT",
        headers: {
          Authorization:
          `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
      .then((response) => {
        notifyUpdate();
        fetchAllData();
      })
      .catch((error) => {
        console.log("error", error);
        notifyErr();
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
          {" "}
          <div
            className={`right_col  h-100  ${
              showNavMenu == false ? "right_col-margin-remove" : " "
            } `}
            role="main"
          >
            {displayUserRegBox ? (
              <>
                {" "}
                <div className="x_panel">
                  <div className="x_title">
                    <h2 className="pl-2 pt-2">Role Creation</h2>
                    <ul className="nav navbar-right panel_toolbox d-flex justify-content-end">
                      <li>
                        <a
                          className="close-link"
                          onClick={() => setdisplayUserRegBox(false)}
                        >
                          <i className="fa fa-close" />
                        </a>
                      </li>
                    </ul>
                    <div className="clearfix" />
                  </div>
                  <div className="x_content">
                    <form>
                      {/* <span className="section">Personal Info</span> */}
                      <div className="field item form-group">
                        <label className="col-form-label col-md-3 col-sm-3  label-align">
                          Enter Role Type<span className="required">*</span>
                        </label>
                        <div className="col-md-6 col-sm-6">
                          <input
                            className="form-control"
                            data-validate-length-range={6}
                            data-validate-words={2}
                            name="name"
                            placeholder="ex. Saleman"
                            required="true"
                            value={roleRegisteredAdd}
                            onChange={(e) =>
                              setRoleRegisteredAdd(e.target.value)
                            }
                          />
                        </div>
                      </div>

                      {/* <div className="ln_solid"> */}
                      <div className="form-group">
                        <div className="col-md-6 offset-md-3 pb-2">
                          <button
                            type="submit"
                            className="btn btn-primary btn-sm px-3"
                            onClick={(e) => {
                              AddRoleRegistered(e);
                            }}
                            disabled={
                              roleRegisteredAdd == "" ||
                              roleRegisteredAdd == undefined ||
                              roleRegisteredAdd == null ||
                              roleRegisteredAdd == " "
                                ? true
                                : false
                            }
                          >
                            Submit
                          </button>
                          <button
                            type="reset"
                            className="btn btn-success btn-sm ml-2 px-3"
                            disabled={
                              roleRegisteredAdd == "" ||
                              roleRegisteredAdd == undefined ||
                              roleRegisteredAdd == null ||
                              roleRegisteredAdd == " "
                                ? true
                                : false
                            }
                          >
                            Reset
                          </button>

                          {/* </div> */}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}

            {/* Model  */}

            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header>
                <Modal.Title>Update Role</Modal.Title>
                <i onClick={handleClose} className="fa fa-close"></i>
              </Modal.Header>
              <Modal.Body>
                <div className="field item form-group">
                  <label className="col-form-label col-md-4 col-sm-4  label-align">
                    Type Role Name<span className="required">*</span>
                  </label>
                  <div className="col-md-8 col-sm-8">
                    <input
                      className="form-control"
                      data-validate-length-range={6}
                      data-validate-words={2}
                      name="name"
                      placeholder="ex. Admin"
                      required="required"
                      value={currentEditUser.name}
                      onChange={(e) => {
                        setCurrentEditUser({
                          ...currentEditUser,
                          name: e.target.value,
                        });
                      }}

                      // onChange={(e)=>setcurrentEditUser({...currentEditUser ,name:e.target.value}) }
                    />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="success"
                  className="btn-sm px-3 ModalButtonPositionAdjectment"
                  onClick={() => {
                    UpdateRoleRegistered();
                    handleClose();
                  }}
                >
                  Update
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Model  */}

            <div className="x_panel">
              <div className="x_content">
                <div className="table-responsive">
                  <table className="table table-striped jambo_table bulk_action">
                    <thead>
                      <tr className="headings">
                        <th className="column-title"> Sr. </th>
                        <th className="column-title">Role Name</th>
                        <th className="column-title text-center" width="20%">
                          Action{" "}
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {RoleRegistered.map((Role, index) => {
                        return (
                          <tr className="even pointer">
                            <td className=" ">{index + 1}</td>
                            <td className=" "> {Role.Name} </td>

                            <td
                              width="20%"
                              className="a-right a-right     text-center"
                            >
 <i
                                className="fa fa-edit"
                                onClick={() => {
                                  handleShow();
                                  setCurrentEditUser({
                                    id: Role.Id,
                                    name: Role.Name,
                                  });
                                }}
                              ></i> 
                              {" "}
                              <i
                                className="fa fa-trash-o pl-3"
                                onClick={() => {
                                  deleteRoleRigistered(Role.Id);
                                }}
                              ></i>{" "}
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

export default AddRole;
