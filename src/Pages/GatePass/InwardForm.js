import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select'
import { useSelector } from "react-redux";
import Loader from "../../Layout/Loader/Loader.js";
import { customStyles } from '../../Components/reactCustomSelectStyle';
import { endPoint } from "../../config/Config.js";
import { toast } from "react-toastify";
import axios from "axios";

import { Button, Modal } from 'react-bootstrap';
import { preventMinus } from '../../config/preventMinus.js';

function InwardForm() {
    const showNavMenu = useSelector((state) => state.NavState);
    const [isLoading, setisLoading] = useState(true);

    const [ListOfParty, setListOfParty] = useState([]);
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
            url: `${endPoint}api/PartyInfo/GetPartyData`,
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

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
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
                        <span>&nbsp;Gate Pass Inward Form</span>
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
                                        <div className="col-5">
                                            <i className="fa fa-filter"></i>&nbsp;Gate Pass / Vehicle Information 
                                        </div>
                                        <div className="col-9 text-right "></div>
                                    </div>
                                </span>

                        {/* /////////////////////////////////UPPER INFO TABLE DATA///////////////////////////////////// */}
                                <div id="report">
                                    <div className="card" style={{ marginTop: "25px " }}> <h5 className="headings reportTableHead border-bottom card-header"> Gate Pass Information</h5>
                                        <div className="row" style={{ marginTop: "6px " }}>
                                            <div className="field item form-group col-md-6 col-sm-6">
                                                <label className="col-form-label col-md-3 col-sm-3 label-align"> Select Inward Type </label>
                                                <div className="col-md-8 col-sm-8">
                                                    <Select
                                                        placeholder={"Select Employee"}
                                                        // getOptionLabel={(e) => e.salary_label}
                                                        // getOptionValue={(e) => e.salary_value}
                                                        value={selectedValue}
                                                        options={inputOptions}
                                                        //onChange={handleChange}
                                                        onChange={(e) => {
                                                            setSelectedValue(e);
                                                        }}
                                                        styles={customStyles}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row" >
                                            <div className="field item form-group col-md-6 col-sm-6">
                                                <label className="col-form-label col-md-3 col-sm-3 label-align">Select Party</label>{
                                                }
                                                <div className="col-md-8 col-sm-8">
                                                    <Select
                                                        placeholder={"Select Party"}
                                                        getOptionLabel={(e) => e.party_name}
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
                                                </div>
                                            </div>

                                            <div className="field item form-group col-md-6 col-sm-6">
                                                <label className="col-form-label col-md-3 col-sm-3 label-align"> Cell No. </label>{
                                                }
                                                <div className="col-md-8 col-sm-8">
                                                    <Select
                                                        getOptionLabel={(e) => e.cell}
                                                        getOptionValue={(e) => e.chart_id}
                                                        value={selectedValue}
                                                        options={inputOptions}
                                                        isDisabled
                                                        styles={customStyles}
                                                    />
                                                </div>
                                            </div>

                                            <div className="field item form-group col-md-6 col-sm-6">
                                                <label className="col-form-label col-md-3 col-sm-3 label-align">Address</label>{
                                                }
                                                <div className="col-md-8 col-sm-8">
                                                    <Select
                                                        getOptionLabel={(e) => e.address}
                                                        getOptionValue={(e) => e.chart_id}
                                                        value={selectedValue}
                                                        options={inputOptions}
                                                        isDisabled
                                                        styles={customStyles}
                                                    />
                                                </div>
                                            </div>

                                            <div className="field item form-group col-md-6 col-sm-6">
                                                <label className="col-form-label col-md-3 col-sm-3 label-align">Gate Pass Date</label>{
                                                }
                                                <div className="col-md-8 col-sm-8">
                                                    <input
                                                        name="name"
                                                        type="date"
                                                        className='form-control'
                                                    //value={ListOfEmployee?.employee_detail.employee_name}

                                                    />
                                                </div>
                                            </div>

                                            <div className="field item form-group col-md-6 col-sm-6">
                                                <label className="col-form-label col-md-3 col-sm-3 label-align">Select Attachment</label>{
                                                }
                                                <div className="col-md-8 col-sm-8">
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

                                            <div className="field item form-group col-md-6 col-sm-6">
                                                <label className="col-form-label col-md-3 col-sm-3 label-align">Attachments</label>{
                                                }
                                                <div className="col-md-8 col-sm-8">
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
                                            </div>



                                        </div>



                                    </div>

                                    <div className="card" style={{ marginTop: "25px " }}> <h5 className="headings reportTableHead border-bottom card-header"> Vehicle Information</h5>
                                        <div className="row" style={{ marginTop: "6px " }}>
                                            <div className="field item form-group col-md-6 col-sm-6">
                                                <label className="col-form-label col-md-3 col-sm-3 label-align"> Vehicle No. </label>
                                                <div className="col-md-8 col-sm-8">
                                                    <input
                                                        name="name"
                                                        className='form-control'
                                                    //value={ListOfEmployee.employee_detail.employee_code}

                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row" >
                                            <div className="field item form-group col-md-6 col-sm-6">
                                                <label className="col-form-label col-md-3 col-sm-3 label-align">Driver Name</label>{
                                                }
                                                <div className="col-md-8 col-sm-8">
                                                    <input
                                                        name="name"

                                                        className='form-control'
                                                    //value={ListOfEmployee?.employee_detail.employee_name}

                                                    />
                                                </div>
                                            </div>

                                            <div className="field item form-group col-md-6 col-sm-6">
                                                <label className="col-form-label col-md-3 col-sm-3 label-align">Driver Cell </label>{
                                                }
                                                <div className="col-md-8 col-sm-8">
                                                    <input
                                                        name="name"

                                                        className='form-control'
                                                    //value={ListOfEmployee?.employee_detail.employee_name}

                                                    />
                                                </div>
                                            </div>

                                            <div className="field item form-group col-md-6 col-sm-6">
                                                <label className="col-form-label col-md-3 col-sm-3 label-align">Rent Type</label>{
                                                }
                                                <div className="col-md-8 col-sm-8">
                                                    <Select
                                                        placeholder={"Select Employee"}
                                                        // getOptionLabel={(e) => e.salary_label}
                                                        // getOptionValue={(e) => e.salary_value}
                                                        value={selectedValue}
                                                        options={inputOptions}
                                                        //onChange={handleChange}
                                                        onChange={(e) => {
                                                            setSelectedValue(e);
                                                        }}
                                                        styles={customStyles}
                                                    />
                                                </div>
                                            </div>

                                            <div className="field item form-group col-md-6 col-sm-6">
                                                <label className="col-form-label col-md-3 col-sm-3 label-align">Vehicle Rent</label>{
                                                }
                                                <div className="col-md-8 col-sm-8">
                                                    <input
                                                        name="name"

                                                        className='form-control'
                                                    //value={ListOfEmployee?.employee_detail.employee_name}

                                                    />
                                                </div>
                                            </div>

                                            <div className="field item form-group col-md-6 col-sm-6">
                                                <label className="col-form-label col-md-3 col-sm-3 label-align">Bility No.</label>{
                                                }
                                                <div className="col-md-8 col-sm-8">
                                                    <input
                                                        name="name"

                                                        className='form-control'
                                                    //value={ListOfEmployee?.employee_detail.employee_name}

                                                    />
                                                </div>
                                            </div>


                                        </div>



                                    </div>
                                </div>

                            </div>
                        </div>




                        {/* /////////////////////////////////LOWER TABLE STOCK ENTRIES///////////////////////////////////// */}

                        <div className="x_panel  ">
                            <div className="x_content ">
                                <span className="section">
                                    <div className="row px-2  pt-3">
                                        <div className="col-5 ">
                                            <i className='fa fa-list'></i>&nbsp;Stock Entries
                                        </div>
                                    </div>
                                </span>

                                <div className="table-responsive px-3 pb-2" style={{ marginTop: "25px " }}>
                                    <table className="table table-striped jambo_table bulk_action ">
                                        <thead>
                                            <tr className="headings reportTableHead">
                                                <th className="column-title right-border-1 text-center " width="20%" >
                                                    PRODUCT COMMODITY
                                                </th>
                                                <th className="column-title  right-border-1 text-center" width="20%">
                                                    UNIT
                                                </th>
                                                <th className="column-title right-border-1 text-center" width="15%">
                                                    PIECES
                                                </th>
                                                <th className="column-title right-border-1 text-center" width="15%">
                                                    PIECE WEIGHT
                                                </th>
                                                <th className="column-title right-border-1 text-center" width="15%">
                                                    TOTAL WEIGHT
                                                </th>
                                                <th className="column-title text-center" width="15%">
                                                    CONDITION
                                                </th>

                                            </tr>
                                        </thead>

                                        {/* //////////////////////////Form Entries///////////////////////////////// */}
                                        <tbody>
                                            {ListOfParty.map((item, index) => {
                                                return (
                                                    <tr className="even pointer" key={index}>
                                                        <td className=" "> {item.account_code}</td>
                                                        <td className=" "> {item.account_name} </td>
                                                        <td className="">
                                                            {" "}
                                                            <input
                                                                type="number"
                                                                value={item?.debit}
                                                                className="form-control border-none"
                                                                //disabled={visableDiv == "true" ? true : false}
                                                                min="0"
                                                                onKeyPress={(e) => preventMinus(e)}
                                                                onChange={(e) => {
                                                                    let arr = ListOfParty;
                                                                    let selected_index = arr.findIndex(
                                                                        (obj) =>
                                                                            obj.finance_entries_id ==
                                                                            item.finance_entries_id
                                                                    ); //it tells us about index of selected account in array of ListOfParty

                                                                    arr[selected_index] = {
                                                                        ...arr[selected_index],
                                                                        debit: e.target.value,
                                                                        credit: "0",
                                                                    };

                                                                    setListOfParty(arr);
                                                                    //setreRender(!reRender);
                                                                }}
                                                            />
                                                        </td>
                                                        <td className=" "> {item.account_name} </td>
                                                        <td className=" ">
                                                            {" "}
                                                            <input
                                                                type="number"
                                                                value={item?.credit}
                                                                className="form-control border-none"
                                                                //disabled={visableDiv == "true" ? true : false}
                                                                min="0"
                                                                onKeyPress={(e) => preventMinus(e)}
                                                                onChange={(e) => {
                                                                    let arr = ListOfParty;
                                                                    let selected_index = arr.findIndex(
                                                                        (obj) =>
                                                                            obj.finance_entries_id ==
                                                                            item.finance_entries_id
                                                                    );
                                                                    arr[selected_index] = {
                                                                        ...arr[selected_index],
                                                                        debit: "0",
                                                                        credit: e.target.value,
                                                                    };

                                                                    setListOfParty(arr);
                                                                    //setreRender(!reRender);
                                                                }}
                                                            />
                                                        </td>
                                                        <td className=" "> {item.account_name} </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                        <tfoot>
                                            <tr className="font-weight-bold">
                                                <td></td>
                                                <td className="col-md-12 col-sm-12" align="right">
                                                    Total:
                                                </td>
                                                <td>
                                                    {ListOfParty
                                                        .map((values) => {
                                                            return Number(values.debit);
                                                        })
                                                        .reduce((a, b) => a + b, 0)}
                                                </td>
                                                <td></td>
                                                <td>
                                                    {ListOfParty
                                                        .map((values) => {
                                                            return Number(values.credit);
                                                        })
                                                        .reduce((a, b) => a + b, 0)}
                                                </td>
                                            </tr>
                                        </tfoot>
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
export default InwardForm;