import React, { useEffect, useState } from "react";
// Component Import
import Loader from "../../Layout/Loader/Loader";
// Boostraps Import
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
// Notifier Import
import { toast } from "react-toastify";
// style Import
import "./Role.css";

import { useSelector } from "react-redux";
const AddModules = () => {
  const URL = localStorage.getItem("authUser");
  const [isLoading, setisLoading] = useState(true);
  // Nav Toggle State
  const showNavMenu = useSelector((state) => state.NavState);

  const [displayUserRegBox, setdisplayUserRegBox] = useState(true);
  // User Data in State
  const [ModuleRegistered, setModuleRegistered] = useState([]);

  const [currentEditUser, setCurrentEditUser] = useState({
    module_id: "",
    module_name: "",
    module_icon: "",
  });
  // Notifier Function
  const notifyAdd = () => toast("Module added Successfully!");
  const notifyDelete = () => toast("Module Deleted Successfully!");
  const notifyUpdate = () => toast("Module Updated Successfully!");

  //   Edit Model
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [moduleRegisteredAdd, setModuleRegisteredAdd] = useState({
    module_name: "",
    module_icon: "",
  });

 
  const fetchAllData = () => {
    fetch(URL + "/api/Modules" , {
      method: "GET",
      headers: {
        Authorization:
        `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setModuleRegistered(json);
        setisLoading(false);
      });
  };
  
  const ModuleAdd = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization:
            `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
        "Content-Type": "application/json" },
      body: JSON.stringify(moduleRegisteredAdd),
    };

    fetch(URL + "/api/Modules", requestOptions)
      .then((response) => response.json())
      .then((data) => { 
        notifyAdd();
        setModuleRegisteredAdd({ module_name: "", module_icon: "" });
        fetchAllData();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  // const updateModule = () => { 
  //   const requestOptions = {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(currentEditUser),
  //   };

  //   fetch(URL + "/api/Modules", requestOptions)
  //     .then((response) => response)
  //     .then((data) => { 
  //      fetchAllData();
  //      notifyUpdate();
  //      setCurrentEditUser({
  //       module_name: "",
  //       module_icon: "",
  //     });

  //     })
  //     .catch((err) => {
  //       console.log("err", err);
  //     });
  //     fetchAllData()
  // };
  // Delete
  
  const updateModule = () => {
    console.log(currentEditUser);
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentEditUser),
    };

    fetch(URL + "/api/Modules", requestOptions)
      .then((response) => response)
      .then((data) => { 
       fetchAllData();
       notifyUpdate();
       setCurrentEditUser({
        module_name: "",
        module_icon: "",
      });

      })
      .catch((err) => {
        console.log("err", err);
      });
      fetchAllData()
  };

  const deleteModule = (e) => {
     
    fetch(`${URL}/api/Modules/${e}`, {
      method: "DELETE",
      body: JSON.stringify(moduleRegisteredAdd),
      headers: {
        Authorization:
            `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
        "Content-Type": "application/json" },
    })
      .then((response) => {
        // deleteing Role for this Id

        fetchAllData();
        notifyDelete();
      })
      .catch((error) => console.log("error", error));
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
            className={`right_col  h-100 ${
              showNavMenu == false ? "right_col-margin-remove" : "lorem "
            }   `}
            role="main"
          >
            {displayUserRegBox ? (
              <>
                {" "}
                <div className={`x_panel `}>
                  <div className="x_title">
                    <h2 className="pl-2 pt-2">Add Module</h2>
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
                          Module Name<span className="required">*</span>
                        </label>
                        <div className="col-md-6 col-sm-6">
                          <input
                            className="form-control"
                            data-validate-length-range={6}
                            data-validate-words={2}
                            name="name"
                            placeholder="ex. Sales Record"
                            required="required"
                            value={moduleRegisteredAdd.module_name}
                            onChange={(e) =>
                              setModuleRegisteredAdd({
                                ...moduleRegisteredAdd,
                                module_name: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="field item form-group">
                        <label className="col-form-label col-md-3 col-sm-3  label-align">
                          Module Icon<span className="required">*</span>
                        </label>
                        <div className="col-md-6 col-sm-6">
                          <input
                            className="form-control"
                            data-validate-length-range={6}
                            data-validate-words={2}
                            name="name"
                            placeholder="ex. fa fa-edit"
                            required="required"
                            value={moduleRegisteredAdd.module_icon}
                            onChange={(e) =>
                              setModuleRegisteredAdd({
                                ...moduleRegisteredAdd,
                                module_icon: e.target.value,
                              })
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
                              e.preventDefault();
                              ModuleAdd();
                            }}
                          >
                            Submit
                          </button>
                          <button
                            type="reset"
                            className="btn btn-success btn-sm ml-2 px-3"
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
                <i className="fa fa-close" onClick={() => handleClose()}></i>
              </Modal.Header>
              <Modal.Body>
                <div className="field item form-group">
                  <label className="col-form-label col-md-4 col-sm-4  label-align">
                    Module Name<span className="required">*</span>
                  </label>
                  <div className="col-md-8 col-sm-8">
                    <input
                      className="form-control"
                      data-validate-length-range={6}
                      data-validate-words={2}
                      name="name"
                      placeholder="ex. Sales"
                      required="required"
                      value={currentEditUser.module_name}
                      onChange={(e) =>
                        setCurrentEditUser({
                          ...currentEditUser,
                          module_name: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-4 col-sm-4  label-align">
                    Module Icon<span className="required">*</span>
                  </label>
                  <div className="col-md-8 col-sm-8">
                    <input
                      className="form-control"
                      data-validate-length-range={6}
                      data-validate-words={2}
                      name="name"
                      placeholder="ex. fa fa-facebook"
                      required="required"
                      value={currentEditUser.module_icon}
                      onChange={(e) =>{
                        setCurrentEditUser({
                          ...currentEditUser,
                          module_icon: e.target.value,
                        })}}
                      // onChange={(e)=>setcurrentEditUser({...currentEditUser ,name:e.target.value}) }
                    />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
               
                <Button
                  variant="success"
                  className="btn-sm px-3 ModalButtonPositionAdjectment"
                  onClick={()=>{handleClose()
                    updateModule()}}
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
                        <th className="column-title">Module Name</th>
                        <th className="column-title">Icon Name</th>
                        <th className="column-title text-center" width="20%">
                          Action{" "}
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {ModuleRegistered.map((Module, index) => {
                        return (
                          <tr className="even pointer">
                            <td className=" ">{index + 1}</td>
                            <td className=" "> {Module.module_name} </td>
                            <td className=" "> {Module.module_icon} </td>

                            <td
                              width="20%"
                              className="a-right a-right     text-center"
                            >
                              <i
                                className="fa fa-edit"
                                onClick={() => {
                                  handleShow();
                                  setCurrentEditUser({
                                    module_id: Module.module_id,
                                    module_name: Module.module_name,
                                    module_icon: Module.module_icon,
                                  });
                                }}
                              ></i>{" "}
                              <i
                                className="fa fa-trash-o pl-3"
                                onClick={() => {
                                  deleteModule(Module.module_id);
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

export default AddModules;
