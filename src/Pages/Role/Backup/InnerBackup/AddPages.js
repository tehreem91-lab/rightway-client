import React, { useEffect, useState } from "react";
import Loader from "../../Layout/Loader/Loader";
import "./Role.css";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Pagination from "./Pagination";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { endPoint } from "../../config/Config";

const AddPages = () => {
  const url = localStorage.getItem("authUser");
  const showNavMenu = useSelector((state) => state.NavState);
  const [isLoading, setisLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const [postsPerPage, setpostsPerPage] = useState(50);
  const [Module, setModule] = useState([]);
  const [UserRegistered, setUserRegistered] = useState([]);
  const [pageRegisteredAdd, setPageRegisteredAdd] = useState({
    page_name: "",
    page_link: "",
    module_id: "",
  });

  const [addPageValidation, setAddPageValidation] = useState({ page_name: true, page_link: true })
  const [EditPageValidation, setEditPageValidation] = useState({ page_name: true, page_link: true })

  const [currentEditPage, setCurrentEditPage] = useState({
    page_id: "",
    page_name: "",
    page_link: "",
    module_id: "",
  });
  const [displayUserRegBox, setdisplayUserRegBox] = useState(true);

  const notifyAdd = () => toast("Page Created Successfully!");
  const notifyDelete = () => toast("Page Deleted Successfully!");
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setEditPageValidation({ page_name: true, page_link: true })
    setShow(false)
  };
  const handleShow = () => setShow(true);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = UserRegistered.slice(indexOfFirstPost, indexOfLastPost);

  const fetchAllData = () => {
    fetch(url + "/api/Pages")
      .then((response) => response.json())
      .then((json) => {
        setUserRegistered(json);
        fetch(url + "/api/Modules")
          .then((response) => response.json())
          .then((ModuleList) => {


            setModule(ModuleList);
            setPageRegisteredAdd({
              page_name: "",
              page_link: "",
              module_id: ModuleList[0].module_id,
            })




            setisLoading(false);
          });
      });
  };
  const AddPageRegistered = () => {


    if (pageRegisteredAdd.page_name === "" || pageRegisteredAdd.page_name == "" || pageRegisteredAdd.page_name === undefined ||
      pageRegisteredAdd.page_name === null || pageRegisteredAdd.page_name === " " || pageRegisteredAdd.page_name == " ") {
      setAddPageValidation({ ...addPageValidation, page_name: false })
    } else if (pageRegisteredAdd.page_link === "" || pageRegisteredAdd.page_link == "" || pageRegisteredAdd.page_link === undefined ||
      pageRegisteredAdd.page_link === null || pageRegisteredAdd.page_link === " " || pageRegisteredAdd.page_link == " ") {
      setAddPageValidation({ ...addPageValidation, page_link: false })
    } else {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pageRegisteredAdd),
      };
      fetch(url + "/api/Pages", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          fetchAllData();
          notifyAdd();
          setPageRegisteredAdd({
            page_name: "",
            page_link: "",
            module_id: "",
          });
          setAddPageValidation({ page_name: true, page_link: true })
        })
        .catch((err) => {
          console.log("err", err);
        });
    }




  };
  const deletePage = (e) => {
    console.log(e);
    fetch(`${endPoint}api/Pages/${e}`, {
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
        fetchAllData();
        notifyDelete();
      })
      .catch((error) => console.log("error", error));
  };
  const updatePage = () => {

    if (currentEditPage.page_name === "" || currentEditPage.page_name == "" || currentEditPage.page_name === undefined ||
      currentEditPage.page_name === null || currentEditPage.page_name === " " || currentEditPage.page_name == " ") {
      setEditPageValidation({ ...EditPageValidation, page_name: false })
    } else if (currentEditPage.page_link === "" || currentEditPage.page_link == "" || currentEditPage.page_link === undefined ||
      currentEditPage.page_link === null || currentEditPage.page_link === " " || currentEditPage.page_link == " ") {
      setEditPageValidation({ ...EditPageValidation, page_link: false })
    } else {





      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentEditPage),
      };

      fetch('http://rightway-api.genial365.com//api/Pages', requestOptions)
        .then((response) => response)
        .then((data) => {
          fetchAllData();
          console.log(data, "updated user");


          notifyAdd();
        })
        .catch((err) => {
          console.log("err", err);
        });
      setEditPageValidation({ page_name: true, page_link: true })
      fetchAllData();
      handleClose();
    }
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
                    <h2 className="pl-2 pt-2">Page Creation</h2>
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
                      {/* <span className="section sorry for late reply actualy mein   ">Personal Info</span> */}
                      <div className="field item form-group">
                        <label className="col-form-label col-md-3 col-sm-3  label-align">
                          Page Title<span className="required">*</span>
                        </label>
                        <div className="col-md-6 col-sm-6">
                          <input
                            className={addPageValidation.page_name ? "form-control" : "form-control requiredValidateInput"}
                            data-validate-length-range={6}
                            data-validate-words={2}
                            name="name"
                            placeholder="ex. Purchases"
                            value={pageRegisteredAdd.page_name}
                            onChange={(e) => {
                              setAddPageValidation({ ...addPageValidation, page_name: true })
                              setPageRegisteredAdd({
                                ...pageRegisteredAdd,
                                page_name: e.target.value,
                              })
                            }
                            }
                            required="required"
                          />
                        </div>
                      </div>

                      <div className="field item form-group">
                        <label className="col-form-label col-md-3 col-sm-3  label-align">
                          Url<span className="required">*</span>
                        </label>
                        <div className="col-md-6 col-sm-6">
                          <input
                            className={addPageValidation.page_link ? "form-control" : "form-control requiredValidateInput"}

                            name="url"
                            // required="required"
                            type="text"
                            value={pageRegisteredAdd.page_link}
                            onChange={(e) => {
                              setAddPageValidation({ ...addPageValidation, page_link: true })
                              setPageRegisteredAdd({
                                ...pageRegisteredAdd,
                                page_link: e.target.value,
                              })
                            }
                            }
                          />
                        </div>
                      </div>

                      <div className="field item form-group">
                        <label className="col-form-label col-md-3 col-sm-3  label-align">
                          Select Module<span className="required">*</span>
                        </label>
                        <div className="col-md-6 col-sm-6">
                          <Form.Select
                            aria-label="Default select example"
                            className="form-control text-center w-50"
                            value={pageRegisteredAdd.module_id}
                            onChange={(e) =>
                              setPageRegisteredAdd({
                                ...pageRegisteredAdd,
                                module_id: e.target.value,
                              })
                            }
                          >
                            {Module.map((item) => {
                              return (
                                <>
                                  <option value={item.module_id}>
                                    {item.module_name}
                                  </option>
                                </>
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
                            onClick={(e) => {
                              e.preventDefault();
                              AddPageRegistered();
                            }}
                          >
                            Submit
                          </button>
                          <button
                            onClick={() => {
                              console.log("added");
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
                    Page Title<span className="required">*</span>
                  </label>
                  <div className="col-md-9 col-sm-9">
                    <input
                      className={EditPageValidation.page_name ? "form-control" : "form-control requiredValidateInput"}

                      data-validate-length-range={6}
                      data-validate-words={2}
                      name="name"
                      placeholder="ex. Ali A.Khan"
                      required="required"
                      value={currentEditPage.page_name}
                      onChange={(e) => {
                        setEditPageValidation({ ...EditPageValidation, page_name: true })
                        setCurrentEditPage({
                          ...currentEditPage,
                          page_name: e.target.value,
                        })
                      }
                      }
                    />
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-3 col-sm-3  label-align">
                    Page Url<span className="required">*</span>
                  </label>
                  <div className="col-md-9 col-sm-9">
                    <input
                      className={EditPageValidation.page_link ? "form-control" : "form-control requiredValidateInput"}

                      name="text"
                      required="required"
                      type="text"
                      value={currentEditPage.page_link}
                      onChange={(e) => {
                        setEditPageValidation({ ...EditPageValidation, page_link: true })
                        setCurrentEditPage({
                          ...currentEditPage,
                          page_link: e.target.value,
                        })
                      }
                      }
                    />
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-3 col-sm-3  label-align">
                    Select Module<span className="required">*</span>
                  </label>
                  <div className="col-md-6 col-sm-6">
                    <Form.Select
                      aria-label="Default select example"
                      className="form-control text-center w-75"
                      value={currentEditPage.module_id}
                      onChange={(e) =>
                        setCurrentEditPage({
                          ...currentEditPage,
                          module_id: e.target.value,
                        })
                      }  >
                      {Module.map((item) => {
                        return (
                          <>
                            <option value={item.module_id}>
                              {item.module_name}
                            </option>
                          </>
                        );
                      })}
                    </Form.Select>
                  </div>
                </div>
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
                  variant="success"
                  className="btn-sm px-3 ModalButtonPositionAdjectment 
                "
                  onClick={() => {

                    updatePage()

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
                        <th className="column-title">Page Title </th>
                        <th className="column-title">Page Url </th>
                        <th className="column-title">Module </th>
                        <th className="column-title text-center">Action </th>
                      </tr>
                    </thead>

                    <tbody>
                      {currentPosts.map((Page, index) => {
                        return (
                          <tr className="even pointer">
                            <td className=" ">{index + 1}</td>
                            <td className=" "> {Page.name} </td>
                            <td className=" ">{Page.pageUrl}</td>
                            <td className=" ">{Page.module}</td>

                            <td className="a-right a-right  text-center ">
                              <i
                                className="fa fa-edit pr-2"
                                onClick={() => {
                                  handleShow();
                                  setCurrentEditPage({
                                    page_id: Page.id,
                                    page_name: Page.name,
                                    page_link: Page.pageUrl,
                                    module_id: Page.moduleId,
                                  })
                                }}
                              ></i>
                              <i
                                className="fa fa-trash-o"
                                onClick={() => {
                                  deletePage(Page.id);
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

export default AddPages;
