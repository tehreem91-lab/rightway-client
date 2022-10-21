import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select'
import { useSelector } from "react-redux";
import Loader from "../../Layout/Loader/Loader.js";
import { customStyles } from '../../Components/reactCustomSelectStyle';
import { endPoint } from "../../config/Config.js";
import { toast } from "react-toastify";
import axios from "axios";
import Creatable from "react-select/creatable";

import { Button, Modal } from 'react-bootstrap';

function PartyInfo() {
    const showNavMenu = useSelector((state) => state.NavState);
    const [isLoading, setisLoading] = useState(true);

    const [ListOfParty, setListOfParty] = useState([]);
    const [ListOfPartyPost, setListOfPartyPost] = useState([]);
    const [isValidateValue, setIsValidateValue] = useState(true);


    const [selectedValue, setSelectedValue] = useState("");
    const [inputOptions, setInputOptions] = useState("");

    const [selectedCategory, setSelectedCategory] = useState("");
    const [categoryOptions, setCategoryOptions] = useState("");

    const [selectedAttachmentFile, setSelectedAttachmentFile] = useState("")
    const [selectedAttachmentName, setSelectedAttachmentName] = useState("")
    const [isFileUploadingModeOn, setIsFileUploadingModeOn] = useState(false)
    const [fileEntity, setFileEntity] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const ref = useRef();
    const reset = () => {
        ref.current.value = "";
    };

    const URL = localStorage.getItem("authUser");

    const UploadFile = async (e) => {
        setIsFileUploadingModeOn(true)
        const options = {
            onUploadProgerss: (progressEvent) => {
                const { loaded, total } = progressEvent;
                let percentage = Math.floor((loaded * 100) / total)
                console.log(`${loaded}bytes of ${total}bytes | ${percentage}%`);
            }
        }
        let data = new FormData();
        data.append("UploadedImage", selectedAttachmentFile);
        await axios.post(`${endPoint}/api/FileUpload?file_name=${selectedAttachmentName}`, data, options).then(res => {
            setFileEntity([...fileEntity, res.data])
            if (res.status === 200) {
                setIsFileUploadingModeOn(false)
                reset()
            }
        })
    }

    const fetchData = async () => {
        var config = {
            method: "get",
            url: `${endPoint}api/PartyInfo/GetUnregisteredParty`,
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token
                    }`,
            },
        };
        await axios(config)
            .then(function (response) {
                setInputOptions([
                    ...response.data,
                ]);
                setisLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const fetchPartyCategory = async () => {
        var config = {
            method: "get",
            url: `${endPoint}api/ChartOfAccounts/GetCategoriesByParentId?id=1233`,
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token
                    }`,
            },
        };
        await axios(config)
            .then(function (response) {
                setCategoryOptions([
                    ...response.data,
                ]);
                setisLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const fetchAllData = async (e) => {

        var axios = require('axios');

        var config = {
            method: 'get',
            url: `${endPoint}api/PartyInfo/GetPartyData`,
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
            },
        };

        axios(config)
            .then(function (response) {
                setListOfParty(response.data);
                //console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    };

    const postNewParty = async () => {
        var axios = require('axios');
        var data = JSON.stringify({
            "title": ListOfPartyPost.newParty,
            "stock_unit_id": 1,
            "level": 5,
            "parent_id": selectedCategory.category_id,
            "page_name": "string"
        });

        var config = {
            method: 'post',
            url: `${endPoint}api/ChartOfAccounts/PostData`,
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                // console.log(JSON.stringify(response.data));
                if (response.status === 200) {
                    toast.success("New Party has been Created successfully!");
                    fetchData();
                } else {
                    response.json().then((json) => {
                        toast.error(json.Message);
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const postData = async () => {
        var axios = require('axios');
        var data = JSON.stringify({
            "chart_id": selectedValue.chart_id,
            "party_cell": ListOfPartyPost.cell,
            "party_address": ListOfPartyPost.address,
            "party_attachments": fileEntity.join(",").toString(),
        });

        var config = {
            method: 'post',
            //   url: 'http://rightway-api.genial365.com/api/PartyInfo/PostData',
            url: `${endPoint}api/PartyInfo/PostData`,
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                //console.log(JSON.stringify(response.data));
                if (response.status === 200) {
                    toast.success("Party Information has been Added Successfully!");
                    fetchData();
                } else {
                    response.json().then((json) => {
                        toast.error(json.Message);
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }


    useEffect(() => {
        fetchData();
        fetchPartyCategory();
        fetchAllData();

    }, []);

    return (
        <>
            {isLoading ? (
                <>
                    {" "}
                    <Loader />{" "}
                </>
            ) : (
                <>
                    <div
                        className={`container-fluid page-title-bar ${showNavMenu == false ? "right_col-margin-remove" : ""
                            }   `}
                    >
                        <span>&nbsp;Party Info</span>
                    </div>
                    <div
                        role="main"
                        className={`right_col  h-100  ${showNavMenu === false ? "right_col-margin-remove" : " "
                            } `}
                    >


                        <div className="x_panel  ">
                            <div className="x_content">
                                <span className="section pl-3">
                                    <div className="row   pt-3">
                                        <div className="col-3">
                                            <i className="fa fa-filter"></i>&nbsp;Party Selector
                                        </div>
                                        <div className="col-9 text-right "></div>
                                    </div>
                                </span>

                                <div className="row">
                                    <div className="field item form-group col-md-12 col-sm-12">

                                        <label className="col-form-label col-md-2 col-sm-2 label-align">
                                            Select Party <span className="required">*</span>
                                        </label>
                                        <div className="col-md-3 col-sm-3">
                                            <div>
                                                <Creatable
                                                    isClearable
                                                    placeholder={"Select Party"}
                                                    getOptionLabel={(e) => e.account_name}
                                                    getOptionValue={(e) => e.chart_id}
                                                    value={selectedValue}
                                                    options={inputOptions}
                                                    styles={customStyles}
                                                    onChange={(e) => {
                                                        setSelectedValue(e) &&
                                                            setListOfPartyPost({
                                                                ...ListOfPartyPost,
                                                                chart_id: e.target.value
                                                            });
                                                    }}
                                                />
                                                {isValidateValue === false && Number(selectedValue) === 0 && <span className="text-danger">First Select Party </span>}


                                            </div>

                                        </div>
                                        <>
                                            <button className="btn btn-sm btn-outline-primary" style={{ marginTop: "2px" }} type="submit" variant="primary" onClick={handleShow}>
                                                <i className="fa fa-plus"></i>
                                            </button>
                                            <Modal show={show} onHide={handleClose}>
                                                <Modal.Header >
                                                    <Modal.Title>
                                                        <i className="fa fa-plus"></i>&nbsp;Create New Party
                                                    </Modal.Title>
                                                    <Button variant="secondary" className="btn-close" onClick={handleClose}> x </Button>
                                                </Modal.Header>
                                                <Modal.Body>Please select the category of this newly created party
                                                    <Select
                                                        placeholder={"Select Party Category"}
                                                        getOptionLabel={(e) => e.category_name}
                                                        getOptionValue={(e) => e.category_id}
                                                        value={selectedCategory}
                                                        options={categoryOptions}
                                                        styles={customStyles}
                                                        onChange={(e) => {
                                                            setSelectedCategory(e)
                                                        }}
                                                    />
                                                    <input required
                                                        name="name"
                                                        className='form-control' style={{ marginTop: "10px" }}
                                                        placeholder="Enter Party Name"
                                                        value={ListOfParty.newParty}
                                                        onChange={(e) => {
                                                            setListOfPartyPost({
                                                                ...ListOfPartyPost,
                                                                newParty: e.target.value
                                                            });
                                                        }}
                                                    />
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    {/* <Button variant="secondary" onClick={handleClose}>
                                                        Close
                                                    </Button>
                                                    <Button variant="primary" onClick={handleClose}>Save Changes</Button> */}
                                                    <div className="col-md-12 text-right x_footer">
                                                        <button
                                                            className="btn btn-primary"
                                                            type="submit"
                                                            onClick={() => {
                                                                postNewParty();
                                                                fetchData();
                                                                handleClose();
                                                            }}
                                                        >
                                                            Create Party
                                                        </button>
                                                    </div>
                                                </Modal.Footer>
                                            </Modal>
                                        </>



                                        <label className="col-form-label col-md-2 col-sm-2 label-align">
                                            Account Code <span className="required">*</span>
                                        </label>
                                        <div className="col-md-3 col-sm-3">
                                            <div>
                                                <Select
                                                    placeholder={"Select Party for this"}
                                                    getOptionLabel={(e) => e.account_code}
                                                    // getOptionValue={(e) => e.chart_id}
                                                    value={selectedValue}
                                                    // options={inputOptions}
                                                    isDisabled
                                                    styles={customStyles}
                                                />

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="field item form-group col-md-12 col-sm-12">
                                        <label className="col-form-label col-md-2 col-sm-2 label-align">
                                            Category Name <span className="required">*</span>
                                        </label>
                                        <div className="col-md-3 col-sm-3">
                                            <div>
                                                <Select
                                                    placeholder={"Select Party for this"}
                                                    getOptionLabel={(e) => e.category_name}
                                                    getOptionValue={(e) => e.chart_id}
                                                    value={selectedValue}
                                                    options={inputOptions}
                                                    isDisabled
                                                    styles={customStyles}
                                                />

                                            </div>
                                        </div>

                                        <label className="col-form-label col-md-2 col-sm-2 label-align" style={{ marginLeft: "35px" }}>
                                            Cell <span className="required">*</span>
                                        </label>
                                        <div className="col-md-3 col-sm-3">
                                            <div>
                                                <input required
                                                    name="name"
                                                    className='form-control'
                                                    placeholder=""
                                                    value={ListOfParty.cell}
                                                    onInput={(er) => (er.target.value = er.target.value.slice(0, 11))}
                                                    onChange={(e) => {
                                                        setListOfPartyPost({
                                                            ...ListOfPartyPost,
                                                            cell: e.target.value
                                                        });
                                                    }}
                                                />
                                                {isValidateValue === false && Number(ListOfParty.cell) === 0 && <span className="text-danger">First Enter Cell </span>}
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="row">
                                    <div className="field item form-group col-md-12 col-sm-12">
                                        <label className="col-form-label col-md-2 col-sm-2 label-align">
                                            Address <span className="required">*</span>
                                        </label>
                                        <div className="col-md-3 col-sm-3">
                                            <div>
                                                <input required
                                                    name="name"
                                                    className='form-control'
                                                    placeholder=""
                                                    value={ListOfParty.address}
                                                    onChange={(e) => {
                                                        setListOfPartyPost({
                                                            ...ListOfPartyPost,
                                                            address: e.target.value
                                                        });
                                                    }}
                                                />
                                                {isValidateValue === false && Number(ListOfParty.address) === 0 && <span className="text-danger">First Enter Address </span>}
                                            </div>
                                        </div>

                                        {/* <label className="col-form-label col-md-2 col-sm-2 label-align">
                                            Attachments <span className="required">*</span>
                                        </label>
                                        <div className="col-md-3 col-sm-3">
                                            <div>
                                                <input required
                                                    name="name"
                                                    className='form-control'
                                                    placeholder=""
                                                    value={ListOfParty.attachments}
                                                    onChange={(e) => {
                                                        setListOfPartyPost({
                                                            ...ListOfPartyPost,
                                                            attachments: e.target.value
                                                        });
                                                    }}
                                                />

                                            </div>
                                        </div> */}

                                    </div>
                                </div>

                                <div className="row">
                                    <div className="field item form-group col-md-6 col-sm-6 w-50 p-3">
                                        <label className="col-form-label col-md-4 col-sm-4 label-align">Select Attachment</label>

                                        <div className="row">
                                            <div className="col-md-9 col-sm-9" style={{ marginLeft: "10px", marginRight: "10px" }}>
                                                <input
                                                    ref={ref}
                                                    type="file"
                                                    className="form-control form-control-sm customStyleForInput"
                                                    data-validate-length-range={6}
                                                    data-validate-words={2}
                                                    name="name"
                                                    onChange={(e) => {
                                                        setSelectedAttachmentName((e.target.files[0].name.split("."))[0])
                                                        setSelectedAttachmentFile(e.target.files[0])
                                                    }}
                                                />
                                            </div>
                                            <div className="col-md-1 col-sm-1 " style={{ paddingTop: "1.5px" }}>
                                                {
                                                    isFileUploadingModeOn ? <div className="spinner-border my-2 text-customOrange" role="status">
                                                        <span className="sr-only">Loading...</span>
                                                    </div> : <button
                                                        disabled={ref?.current?.value === "" ? true : false}
                                                        className="btn btn-sm btn-outline-success" onClick={() => UploadFile()} type="button"><i className="fa fa-upload"></i></button>
                                                }
                                            </div>
                                        </div>




                                    </div>
                                    {fileEntity.length !== 0 && <div className="field item form-group col-md-6 col-sm-6 w-50 p-3">
                                        <label className="col-form-label col-md-2 col-sm-2 label-align">Attachments</label>
                                        <div className="col-md-12 col-sm-12 ">
                                            {
                                                fileEntity.map((each_attachment, index) => {
                                                    return <button className="btn btn-sm  bg-customBlue  text-light">
                                                        <a href={`${endPoint + each_attachment}`} target="_blank" className='text-light'>
                                                            {((each_attachment.split("_"))[0]).slice(15)} {index + 1}</a>
                                                        <i className="fa fa-times   text-light ml-1 " aria-hidden="true"
                                                            onClick={() => {
                                                                let arr_data = fileEntity.filter((each_image) => {
                                                                    return (fileEntity.indexOf(each_image) !== index);
                                                                });
                                                                setFileEntity(arr_data)
                                                                //setReRender(!reRender)
                                                            }}
                                                        ></i>
                                                    </button>
                                                })
                                            }
                                        </div>
                                    </div>}
                                </div>

                                <div className="col-md-12 text-right x_footer">
                                    <button
                                        className="btn btn-primary"
                                        type="submit"
                                        onClick={() => {


                                            let is_form_validated = true;
                                            {
                                                if (Number(selectedValue) === 0 || Number(ListOfParty.cell) === 0 || Number(ListOfParty.address) === 0) {
                                                    setIsValidateValue(false);
                                                    is_form_validated = false;
                                                }
                                            }
                                            if (is_form_validated === true) {
                                                postData();
                                                fetchAllData();
                                                //setisLoading(true);
                                            }

                                        }}
                                    >
                                        Add Party
                                    </button>
                                </div>
                            </div>
                        </div>




                        {/* /////////////////////////////////TABLE DATA///////////////////////////////////// */}

                        <div className="x_panel  ">
                            <div className="x_content ">
                                <span className="section">
                                    <div className="row px-2  pt-3">
                                        <div className="col-5 ">
                                            <i className='fa fa-list'></i>&nbsp;Listing
                                        </div>



                                    </div>
                                </span>

                                <div className="table-responsive px-3 pb-2">
                                    <table className="table table-striped jambo_table bulk_action">
                                        <thead>
                                            <tr className="headings  ">
                                                <th className="column-title fontWeight300   right-border-1 text-center" width="7%"> SR #</th>
                                                <th className="column-title fontWeight300   right-border-1 text-center" width="12%">Party Name</th>
                                                <th className="column-title fontWeight300   right-border-1 text-center" width="8%">Cell</th>
                                                <th className="column-title fontWeight300   right-border-1 text-center" width="12%">Address</th>
                                                <th className="column-title fontWeight300   right-border-1 text-center" width="12%">Attachments</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {ListOfParty.map((item, index) => {
                                                return (
                                                    <tr className="even pointer">
                                                        <td className=" ">{index + 1}</td>
                                                        <td className=" ">{item.party_name}</td>
                                                        <td className=" ">{item.cell}</td>
                                                        <td className=" ">{item.address}</td>
                                                        <td className=" ">{item.attachments}
                                                            {/* {fileEntity.length !== 0 && <div className="field item form-group col-md-6 col-sm-6 w-50 p-3">
                                                                <label className="col-form-label col-md-2 col-sm-2 label-align">Attachments</label>
                                                                <div className="col-md-12 col-sm-12 ">
                                                                    {
                                                                        fileEntity.map((each_attachment, index) => {
                                                                            return <button className="btn btn-sm  bg-customBlue  text-light">
                                                                                <a href={`${endPoint + each_attachment}`} target="_blank" className='text-light'>
                                                                                    {((each_attachment.split("_"))[0]).slice(15)} {index + 1}</a>
                                                                                <i className="fa fa-times   text-light ml-1 " aria-hidden="true"
                                                                                    onClick={() => {
                                                                                        let arr_data = fileEntity.filter((each_image) => {
                                                                                            return (fileEntity.indexOf(each_image) !== index);
                                                                                        });
                                                                                        setFileEntity(arr_data)
                                                                                        //setReRender(!reRender)
                                                                                    }}
                                                                                ></i>
                                                                            </button>
                                                                        })
                                                                    }
                                                                </div>
                                                            </div>} */}
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
}
export default PartyInfo;