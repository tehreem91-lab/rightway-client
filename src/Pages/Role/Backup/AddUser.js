import React, { useEffect, useState } from "react";
import Loader from "../../Layout/Loader/Loader";
import "./Role.css";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Pagination from "./Pagination";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import {
//   fetchAllUser,
//   deleteUser,
// } from "../../store/actions/RoleManagement/userAction";
const AddUser = () => {
  const url = localStorage.getItem("authUser");
  const showNavMenu = useSelector((state) => state.NavState);
  // const userData = useSelector((state)=>state)
  const [displayUserRegBox, setdisplayUserRegBox] = useState(true);
  const [isLoading, setisLoading] = useState(true);
  const [UserRegistered, setUserRegistered] = useState([{}]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(5);
  const [showPassword, setshowPassword] = useState("password")
  const [repeatPassword, setRepeatPassword] = useState("");
  const [userRegisteredAdd, setuserRegisteredAdd] = useState({
    userName: "",
    password: "",
    email: "",
  });
  const [currentEditUser, setcurrentEditUser] = useState({
    email: "",
    id: "",
    userName: "",
  });

  const [Roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState();
  // const dispatch = useDispatch();

  // const allUserData = useSelector((state) => state.UserReducer);
  // console.log(allUserData);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  //   Edit Model
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = UserRegistered.slice(indexOfFirstPost, indexOfLastPost);

  const notifyDelete = () => toast("Deleted Successfully!");
  const notifyAdd = () => toast("User Created Successfully!");

  // const fetchAllData = () => {
  //   fetch(url + "/api/Users")
  //     .then((response) => response.json())
  //     .then((json) => {
  //       console.log(json);
  //       setUserRegistered(json);


  //       // fetching list of role 
  //       fetch(url + "/api/Roles")
  //         .then((response) => response.json())
  //         .then((role) => {
  //           setRoles(role);
  //           setSelectedRole(role[0].Id)
  //           setisLoading(false);
  //         });
  //     });

  // };

  const fetchAllData = () => {
    fetch(url + "/api/Users", {
      method: "GET",
      headers: {
        Authorization:
          `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setUserRegistered(json);


        // fetching List of Role 
        fetch(url + "/api/Roles", {
          method: "GET",
          headers: {
            Authorization:
              `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
          .then((response) => response.json())
          .then((role) => {
            setRoles(role);
            setSelectedRole(role[0].Id)
            setisLoading(false);
          });
      });

  };
  // const AddUserRegistered = () => { 
  //   const requestOptions = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(userRegisteredAdd),
  //   };

  //   fetch(url + "/api/Users", requestOptions)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("user created" , data , selectedRole);
  //       const requestOptionsForRole = {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           UserId: data.Id,
  //           RoleId: selectedRole,
  //         }),
  //       };
  //       fetch(url + "/api/UserRoles", requestOptionsForRole)
  //         .then((response) => response.json())
  //         .then((data) => {
  //           console.log("success", data);
  //           setuserRegisteredAdd({
  //             userName: "",
  //             password: "",
  //             phoneNumber: "",
  //             email: "",
  //           });
  //           fetchAllData();
  //           setRepeatPassword("");
  //           notifyAdd();
  //         })
  //         .catch((err) => {
  //           console.log("err", err);
  //         });
  //     })
  //     .catch((err) => {
  //       console.log("err", err);
  //     });
  // };

  const AddUserRegistered = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization:
          `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userRegisteredAdd),
    };

    fetch(url + "/api/Users", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const requestOptionsForRole = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            UserId: data.Id,
            RoleId: selectedRole,
          }),
        };
        fetch(url + "/api/UserRoles", requestOptionsForRole)
          .then((response) => response.json())
          .then((data) => {
            setuserRegisteredAdd({
              userName: "",
              password: "",
              phoneNumber: "",
              email: "",
            });
            fetchAllData();
            setRepeatPassword("");
            notifyAdd();
          })
          .catch((err) => {
            console.log("err", err);
          });
      })
      .catch((err) => {
        console.log("err", err);
      });
  };


  const UpdateUserRegistered = () => {
    console.log("Update DAta", currentEditUser, selectedRole);

    fetch(
      url +
        `/api/Users?InputId=${currentEditUser.id}&InputuserName=${currentEditUser.userName}&Inputemail=${currentEditUser.email}`,
      {
        method: "PUT",
        // headers: {
        //   Authorization:
        //     JSON.parse(localStorage.getItem("authUser")).token_type +
        //     " " +
        //     JSON.parse(localStorage.getItem("authUser")).access_token,
        //   "Content-Type": "application/x-www-form-urlencoded",
        // },
      }
    )
      .then((response) => { 
        fetchAllData();
      })
      .catch((error) => console.log("error", error));
  };
  // const deleteUser = (e) => {
  //   console.log(e, "Delte this one");
  //   //

  //   fetch(`${url}/api/Users/${e}`, {
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

  //    fetchAllData();
  //       notifyDelete();
  //     })
  //     .catch((error) => console.log("error", error));
  // };
  const deleteUser = (e) => {
    fetch(`${url}/api/Users/${e}`, {
      method: "DELETE",
      // headers: {
      //   Authorization:
      //     JSON.parse(localStorage.getItem("authUser")).token_type +
      //     " " +
      //     JSON.parse(localStorage.getItem("authUser")).access_token,
      //   "Content-Type": "application/x-www-form-urlencoded",
      // },
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
            className={`right_col  h-100  ${showNavMenu === false ? "footer-margin-remove" : " "
              } `}
            role="main"
          >
            {/* Registration Form  */}

            {displayUserRegBox ? (
              <>
                {" "}
                <div className="x_panel">
                  <div className="x_title">
                    <h2 className="pl-2 pt-2">User Registration</h2>
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
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        AddUserRegistered();
                      }}
                    >
                      {/* <span className="section">Personal Info</span> */}
                      <div className="field item form-group">
                        <label className="col-form-label col-md-3 col-sm-3  label-align">
                          Username<span className="required">*</span>
                        </label>
                        <div className="col-md-6 col-sm-6">
                          <input
                            className="form-control"
                            data-validate-length-range={6}
                            data-validate-words={2}
                            name="name"
                            placeholder="ex. Ali A.Khan"
                            value={userRegisteredAdd.userName}
                            onChange={(e) =>
                              setuserRegisteredAdd({
                                ...userRegisteredAdd,
                                userName: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="field item form-group">
                        <label className="col-form-label col-md-3 col-sm-3  label-align">
                          Email<span className="required">*</span>
                        </label>
                        <div className="col-md-6 col-sm-6">
                          <input
                            className="form-control"
                            name="email"
                            type="email"
                            value={userRegisteredAdd.email}
                            onChange={(e) =>
                              setuserRegisteredAdd({
                                ...userRegisteredAdd,
                                email: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="field item form-group">
                        <label className="col-form-label col-md-3 col-sm-3  label-align">
                          Password<span className="required">*</span>
                        </label>
                        <div className="col-md-6 col-sm-6">
                          <input
                            className="form-control"
                            type={showPassword ? "password" : "text"}
                            id="password1"
                            name="password"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}"
                            title="Minimum 8 Characters Including An Upper And Lower Case Letter, A Number And A Unique Character"
                            required
                            value={userRegisteredAdd.password}
                            onChange={(e) =>
                              setuserRegisteredAdd({
                                ...userRegisteredAdd,
                                password: e.target.value,
                              })
                            }
                          />
                          <span
                            style={{ position: "absolute", right: 15, top: 7 }}
                            onClick={() => { setshowPassword(!showPassword) }}
                          >
                            <i id="slash" className="fa fa-eye-slash" />
                            <i id="eye" className="fa fa-eye" />
                          </span>
                        </div>
                      </div>
                      {/* <div className="field item form-group">
                        <label className="col-form-label col-md-3 col-sm-3  label-align">
                          Repeat Password<span className="required">*</span>
                        </label>
                        <div className="col-md-6 col-sm-6">
                          <input
                            className="form-control"
                            type="password"
                            name="password2"
                            data-validate-linked="password"
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                          />
                        </div>
                      </div> */}

                      <div className="field item form-group">
                        <label className="col-form-label col-md-3 col-sm-3  label-align">
                          Select Role<span className="required">*</span>
                        </label>
                        <div className="col-md-6 col-sm-6">
                          <Form.Select
                            aria-label="Default select example"
                            className="form-control text-center w-50"
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                          >
                            {Roles.map((item) => {
                              return (
                                <option value={item.Id}>{item.Name}</option>
                              );
                            })}
                          </Form.Select>
                        </div>
                      </div>

                      {/* <div className="ln_solid"> */}
                      <div className="form-group">
                        <div className="col-md-6 offset-md-3 pb-2">
                          <button
                            type="submit"
                            className="btn btn-primary btn-sm px-3"
                          >
                            Submit
                          </button>
                          <button
                            onClick={() => {
                              setuserRegisteredAdd({
                                userName: "",
                                password: "",
                                email: "",
                              });
                              setRepeatPassword("");
                            }}
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
                <Modal.Title>Update User</Modal.Title>
                <i onClick={handleClose} className="fa fa-close"></i>
              </Modal.Header>
              <Modal.Body>
                <div className="field item form-group">
                  <label className="col-form-label col-md-3 col-sm-3  label-align">
                    Username<span className="required">*</span>
                  </label>
                  <div className="col-md-9 col-sm-9">
                    <input
                      className="form-control"
                      data-validate-length-range={6}
                      data-validate-words={2}
                      name="name"
                      placeholder="ex. Ali A.Khan"
                      value={currentEditUser.userName}
                      onChange={(e) =>
                        setcurrentEditUser({
                          ...currentEditUser,
                          userName: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-3 col-sm-3  label-align">
                    email<span className="required">*</span>
                  </label>
                  <div className="col-md-9 col-sm-9">
                    <input
                      className="form-control"
                      name="email"
                      type="email"
                      value={currentEditUser.email}
                      onChange={(e) =>
                        setcurrentEditUser({
                          ...currentEditUser,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                {/* <div className="field item form-group">
                  <label className="col-form-label col-md-3 col-sm-3  label-align">
                    Select Role<span className="required">*</span>
                  </label>
                  <div className="col-md-6 col-sm-6">
                    <Form.Select
                      aria-label="Default select example"
                      className="form-control text-center w-75"
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                    >
                      {Roles.map((item) => {
                        return <option value={item.Id}>{item.Name}</option>;
                      })}
                    </Form.Select>
                  </div>
                </div> */}
              </Modal.Body>
              <Modal.Footer>
                {/* <Button
                  variant="primary"
                  className="btn-sm px-3"
                  onClick={handleClose}
                >
                  Update
                </Button> */}
                <Button
                  variant="primary"
                  className="btn-sm px-3 ModalButtonPositionAdjectment 
                  "
                  onClick={() => {
                    UpdateUserRegistered();
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
                        <th className="column-title"> # </th>
                        <th className="column-title">User Name </th>
                        <th className="column-title">Email </th>
                        <th className="column-title">Role </th>
                        <th className="column-title text-center">Action </th>
                      </tr>
                    </thead>

                    <tbody>
                      {currentPosts.map((user, index) => {
                        return (
                          <tr className="even pointer">
                            <td className=" ">{index + 1}</td>
                            <td className=" "> {user.userName} </td>
                            <td className=" ">{user.email}</td>

                            <td className="a-right a-right  ">
                              {user.roleName}
                            </td>
                            <td className="a-right a-right  text-center ">
                              <i
                                className="fa fa-edit pr-2"
                                onClick={() => {
                                  setcurrentEditUser(user);
                                  setSelectedRole(user.role);
                                  handleShow();
                                }}
                              ></i>
                              <i
                                className="fa fa-trash-o"
                                onClick={() => {
                                  deleteUser(user.id)
                                  // dispatch(deleteUser(user.id));
                                }}
                              ></i>{" "}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  <div className="  d-flex justify-content-between pr-3 pt-2">
                    <div className="d-flex  ml-3 mb-3">
                      <span className="pt-1 pr-2">Show</span>
                      <div className="wisthOfOtions">
                        {" "}
                        <Form.Select
                          onChange={(e) =>
                            postsPerPage(parseInt(e.target.value))
                          }
                          aria-label="Default select example"
                          className="form-control  wisthOfOtions"
                        >
                          <option value="5">5</option>
                          <option value="10">10</option>
                          <option value="20">20</option>
                          <option value="25">25</option>
                        </Form.Select>
                      </div>
                      <span className="pt-1 pl-2">Entities</span>
                    </div>
                    <Pagination
                      postsPerPage={postsPerPage}
                      totalPosts={UserRegistered.length}
                      paginate={paginate}
                    />
                  </div>

                  {/* Pagination  */}

                  {/* Pagination  */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AddUser;
