import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select'
import { useSelector } from "react-redux";
import Loader from "../../Layout/Loader/Loader.js";
import { customStyles } from '../../Components/reactCustomSelectStyle';
import { endPoint } from "../../config/Config.js";
import { toast } from "react-toastify";
import axios from "axios";
import CustomInnerHeader from '../../Components/CustomInnerHeader.jsx';
import { Button, Modal } from 'react-bootstrap';

function PartyInfo() {
    const showNavMenu = useSelector((state) => state.NavState);
    const [isLoading, setisLoading] = useState(true);

    const [ListOfParty, setListOfParty] = useState([]);
    const [isValidateValue, setisValidateValue] = useState(true);
    const [ListOfPartyPost, setListOfPartyPost] = useState([]);


    const [selectedValue, setSelectedValue] = useState("");
    const [inputOptions, setInputOptions] = useState("");

    const [selectedAttachmentFile, setSelectedAttachmentFile] = useState("")
    const [selectedAttachmentName, setSelectedAttachmentName] = useState("")
    const [isFileUploadingModeOn, setIsFileUploadingModeOn] = useState(false)
    const [fileEntity, setFileEntity] = useState([]);

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
                    { label: "Select Party", value: 0 },
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
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    };

    const postData = async () => {
        var axios = require('axios');
        if(selectedValue === ""|| selectedAttachmentFile === "" )
        {
              setisValidateValue(false)
        }else{
        var data = JSON.stringify({
            "chart_id": selectedValue.chart_id,
            "party_cell": ListOfPartyPost.cell,
            "party_address": ListOfPartyPost.address,
            "party_attachments": ListOfPartyPost.attachments
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
    }
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                toast.success("Your Response has been Added")
            })
            .catch(function (error) {
                console.log(error);
            });

    }


    useEffect(() => {
        fetchData();
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
                    <CustomInnerHeader moduleName="Part Info" isShowSelector={true} />
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
                                                <Select
                                                    placeholder={"Select Party"}
                                                    getOptionLabel={(e) => e.account_name}
                                                    getOptionValue={(e) => e.chart_id}
                                                    value={selectedValue}
                                                    options={inputOptions}
                                                    //onChange={handleChange}
                                                    onChange={(e) => {
                                                        setSelectedValue(e) &&
                                                            setListOfPartyPost({
                                                                ...ListOfPartyPost,
                                                                chart_id: e.target.value
                                                            });
                                                    }}
                                                    styles={customStyles}
                                                />
                                                 {!isValidateValue && Number(selectedValue === "") && <span className="text-danger">First Select this field </span>} 

                                            </div>
                                        </div>

                                        <label className="col-form-label col-md-2 col-sm-2 label-align">
                                            Account Code <span className="required">*</span>
                                        </label>
                                        <div className="col-md-3 col-sm-3">
                                            <div>
                                                <Select
                                                    getOptionLabel={(e) => e.account_code}
                                                    // getOptionValue={(e) => e.chart_id}
                                                    value={selectedValue}
                                                    // options={inputOptions}
                                                    isDisabled
                                                    styles={customStyles}
                                                />
                                                {!isValidateValue && Number(selectedValue === "") && <span className="text-danger">First Select this field </span>} 
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
                                                    getOptionLabel={(e) => e.category_name}
                                                    getOptionValue={(e) => e.chart_id}
                                                    value={selectedValue}
                                                    options={inputOptions}
                                                    isDisabled
                                                    styles={customStyles}
                                                />
                                                {!isValidateValue && Number(selectedValue === "") && <span className="text-danger">First Select this field </span>}
                                            </div>
                                        </div>

                                        <label className="col-form-label col-md-2 col-sm-2 label-align">
                                            Cell <span className="required">*</span>
                                        </label>
                                        <div className="col-md-3 col-sm-3">
                                            <div>
                                                <input required
                                                    name="name"
                                                    className='form-control'
                                                    placeholder=""
                                                    value={ListOfParty.cell}
                                                    onChange={(e) => {
                                                        setListOfPartyPost({
                                                            ...ListOfPartyPost,
                                                            cell: e.target.value
                                                        });
                                                    }}
                                                />
                                                {/*{!isValidateValue && Number(ListOfPartyPost === "") && <span className="text-danger">First Select this field </span>}*/}
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
                                                {/*{!isValidateValue && Number(ListOfPartyPost === "") && <span className="text-danger">First Select this field </span>}*/}
                                            </div>
                                        </div>

                                        <label className="col-form-label col-md-2 col-sm-2 label-align">
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
                                        </div>

                                    </div>
                                </div>

                                <div className="row">
                                    <div className="field item form-group col-md-6 col-sm-6 w-50 p-3">
                                        <label className="col-form-label col-md-4 col-sm-4 label-align">Select Attachment</label>

                                        <div className="row">
                                            <div className="col-md-10 ">
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
                                                {!isValidateValue && Number(selectedAttachmentFile === "") && <span className="text-danger">First Select this field </span>}
                                            </div>
                                            <div className="col-md-1  " style={{ paddingTop: "1.5px" }}>
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

                                            postData();
                                            fetchAllData();
                                            // let is_form_validated = true;
                                            // {

                                            //     if (Number(selectedValue) === 0 || Number(selectedDate) === 0) {
                                            //         setIsValidateValue(false);
                                            //         is_form_validated = false;
                                            //     }

                                            // }
                                            // if (is_form_validated === true) {
                                            //     fetchAllData();
                                            //     setShow(true);
                                            //     setisLoading(true);
                                            //     setAttendenceData([{}]);
                                            // }

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
                                                        <td className=" ">{item.attachments}</td>
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