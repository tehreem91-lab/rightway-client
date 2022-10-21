import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select'
import { useSelector } from "react-redux";
import Loader from "../../Layout/Loader/Loader.js";
import { customStyles } from '../../Components/reactCustomSelectStyle';
import { endPoint } from "../../config/Config.js";
import { toast } from "react-toastify";
import axios from "axios";
import { preventMinus } from '../../config/preventMinus.js';
<<<<<<< HEAD
import { useLocation } from 'react-router-dom';
=======
import CustomInnerHeader from '../../Components/CustomInnerHeader.jsx';
>>>>>>> 196b2d3faf08ff97792be245356c2b7141a8cf81

const InwardForm = (props) => {
    const [noOfRows, setNoOfRows] = useState(1);
    const showNavMenu = useSelector((state) => state.NavState);
    const [isLoading, setisLoading] = useState(true);

    const [ListOfParty, setListOfParty] = useState([]);
    const [ListOfPartyPost, setListOfPartyPost] = useState([]);
    const [dataForUpdate, setDataForUpdate] = useState([]);

    var day = new Date().toLocaleDateString(undefined, { day: "2-digit" });
    var month = new Date().toLocaleDateString(undefined, { month: "2-digit" });
    var year = new Date().toLocaleDateString(undefined, { year: "numeric" });
    const dateToday = `${year}-${month}-${day}`;
    const [selectedDate, setSelectedDate] = useState(dateToday);
    const [selectedValue, setSelectedValue] = useState("");
    const [inputOptions, setInputOptions] = useState("");
    const [reRenderedCustom, setReRenderedCustom] = useState(false)

    const [selectedAttachmentFile, setSelectedAttachmentFile] = useState("")
    const [selectedAttachmentName, setSelectedAttachmentName] = useState("")
    const [isFileUploadingModeOn, setIsFileUploadingModeOn] = useState(false)
    const [fileEntity, setFileEntity] = useState([]);
    const [gatepassID, setGatepassID] = useState("");

    const [stockValue, setStockValue] = useState("");
    const [stock, setStock] = useState([]);
    const [packetValue, setPacketValue] = useState("");
    const [packet, setPacket] = useState([]);
    const location = useLocation();
    const [updateMode, setUpdateMode] = useState(false);


    const optionsInwardType = [
        { value: 'purchase', label: 'Purchase' },
        { value: 'cmt', label: 'CMT' }
    ]

    const optionsRentType = [
        { value: 'excluded', label: 'Excluded' },
        { value: 'included', label: 'Included' }
    ]

    const optionsCondition = [
        { value: 'defected', label: 'Defected' },
        { value: 'acceptable', label: 'Acceptable' },
        { value: 'good', label: 'Good' },
    ]

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

    const fetchPartyData = async () => {
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
                { console.log("selected", location.state.gatepassID) }
                const gpid =
                    setGatepassID(location.state.gatepassID)
                gatepassID !== "" ? setUpdateMode(true) : setUpdateMode(false)
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const fetchStockData = async (e) => {

        var axios = require('axios');

        var config = {
            method: 'get',
            url: `${endPoint}api/GatePassInward/GetStockOptions`,
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
            },
        };

        axios(config)
            .then(function (response) {
                setListOfParty(response.data);
                //console.log(response.data, "rerererere");
                let stockarr = [];
                response.data.map((item) => {
                    stockarr.push({
                        label: item?.stock_account.stock_account_label,
                        value: item?.stock_account?.stock_account_value,
                        stock_account_unit: item?.stock_account?.stock_account_unit,

                        childElement: item.packets_details.map((er) => {
                            return {
                                label: er.packet_title,
                                value: er.stock_packet_id,
                                pair_base_unit: er.pair_base_unit
                            }
                        })
                    });
                })
                console.log(stockarr, "data for options");
                console.log(stockarr[1].childElement, "data for child");
                setStock(stockarr);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const updateData = async () => {
        var axios = require('axios');
        var data = JSON.stringify({
            "party_chart_id": selectedValue.chart_id,
            "date": selectedDate,
            "vehicle_no": ListOfPartyPost.vehicle_no,
            "drive_name": ListOfPartyPost.drive_name,
            "driver_cell": ListOfPartyPost.driver_cell,
            "rent_type": ListOfPartyPost.rent_type,
            "rent_amount": ListOfPartyPost.rent_amount,
            "bilty_no": ListOfPartyPost.bilty_no,
            "inward_type": ListOfPartyPost.inward_type,
            "remarks": ListOfPartyPost.remarks,
            "attachments": fileEntity.join(",").toString(),
            "stock_entries": StockRecordsValue.length === 0 ? [] : StockRecordsValue.map((i) => {
                return {
                    "stock_chart_id": i.stock_chart_id,
                    "stock_unit_id": i.stock_unit_id,
                    "pair_unit_id": i.pair_unit_id,
                    "total_stock_pieces": i.total_stock_pieces,
                    "weight_per_piece": i.weight_per_piece,
                    "tatal_weight": i.tatal_weight
                }
            })
        });

        var config = {
            method: 'put',
            url: 'http://rightway-api.genial365.com/api/GatePassInward/PutData?gate_pass_main_id=231',
            //url: `${endPoint}api/GatePassInward/PutData?gate_pass_main_id=${e}`,
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


    };

    const fetch_selected_voucher_detail = () => {
        setUpdateMode(false);
        var config = {
            method: 'get',
            //url: `${endPoint}api/GatePassInward/GetGatePassById?gate_pass_main_id=221`,
            url: `${endPoint}api/GatePassInward/GetGatePassById?gate_pass_main_id=${gatepassID}`,
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
            }
        };

        axios(config)
            .then(function (response) {
                //console.log(response.data);
                setListOfParty(response.data);
                setUpdateMode(true);
                // setroutePathToBeNavigate(voucherTypes.find(
                //     (o) => o.voucher_id === response.data.voucher_type_id
                // ).multiple_router_path)


                //setisShowVoucher(true)
            })
            .catch(function (error) {
                console.log(error);
            });

    };

    const postData = async () => {


        var axios = require('axios');
        var data = JSON.stringify({
            "party_chart_id": selectedValue.chart_id,
            "date": selectedDate,
            "vehicle_no": ListOfPartyPost.vehicle_no,
            "drive_name": ListOfPartyPost.drive_name,
            "driver_cell": ListOfPartyPost.driver_cell,
            "rent_type": ListOfPartyPost.rent_type,
            "rent_amount": ListOfPartyPost.rent_amount,
            "bilty_no": ListOfPartyPost.bilty_no,
            "inward_type": ListOfPartyPost.inward_type,
            "remarks": ListOfPartyPost.remarks,
            "attachments": ListOfPartyPost.attachments,
            "stock_entries": ListOfParty.map((i) => {
                return {
<<<<<<< HEAD
                    "stock_chart_id": i.stock_chart_id,
                    "stock_unit_id": i.stock_unit_id,
                    "pair_unit_id": i.pair_unit_id,
=======
                    "stock_chart_id": i.stock_account.stock_account_value,
                    "stock_unit_id": i.packets_details.stock_packet_id,
                    "pair_unit_id": i.packets_details.pair_base_unit,
>>>>>>> 196b2d3faf08ff97792be245356c2b7141a8cf81
                    "total_stock_pieces": i.total_stock_pieces,
                    "weight_per_piece": i.weight_per_piece,
                    "tatal_weight": i.tatal_weight
                }

            })
        });


        var config = {
            method: 'post',
            url: 'http://rightway-api.genial365.com/api/GatePassInward/PostData',
            //url: `${endPoint}api/GatePassInward/PostData`,
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            // .then(function (response) {
            //     console.log(JSON.stringify(response.data));
            // })
            .then(function (response) {
                if (response.status === 200) {

                    toast.success("Inward Form Information has been Added successfully!")
                    fetchStockData();
                }
                else {
                    toast.error("An error occured!")
                    fetchStockData();
                }
            })
            .catch(function (error) {
                console.log(error);
                // console.table(data);
                // console.table(JSON.stringify(data));
            });

    };

    const formSubmit = () => {
        console.log(updateMode, "mode");

        fetch(
            URL +
            (updateMode ? "/api/GatePassInward/PutData?gate_pass_main_id=" + gatepassID
                : "/api/GatePassInward/PostData"),
            {
                method: updateMode ? "PUT" : "POST",
                headers: {
                    Authorization:
                        "Bearer " +
                        JSON.parse(localStorage.getItem("access_token")).access_token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "party_chart_id": selectedValue.chart_id,
                    "date": selectedDate,
                    "vehicle_no": ListOfPartyPost.vehicle_no,
                    "drive_name": ListOfPartyPost.drive_name,
                    "driver_cell": ListOfPartyPost.driver_cell,
                    "rent_type": ListOfPartyPost.rent_type,
                    "rent_amount": ListOfPartyPost.rent_amount,
                    "bilty_no": ListOfPartyPost.bilty_no,
                    "inward_type": ListOfPartyPost.inward_type,
                    "remarks": ListOfPartyPost.remarks,
                    "attachments": fileEntity.join(",").toString(),
                    "stock_entries": StockRecordsValue.length === 0 ? [] : StockRecordsValue.map((i) => {
                        return {
                            "stock_chart_id": i.stock_chart_id,
                            "stock_unit_id": i.stock_unit_id,
                            "pair_unit_id": i.pair_unit_id,
                            "total_stock_pieces": i.total_stock_pieces,
                            "weight_per_piece": i.weight_per_piece,
                            "tatal_weight": i.tatal_weight
                        }

                    })
                }),
            }
        ).then((response) => {
            if (response.status === 201 || response.status === 400 || response.status === 204) {

                toast.success(
                    "Entry has been " +
                    (updateMode ? "Updated" : "Added" + " successfully!")
                );
                //clearFields();
                fetchStockData();
                fetchPartyData();

            }
        });
    };


    const CustomEffectRerendered = async () => {
        await fetchStockData();
        await fetchPartyData();
    }

    useEffect(() => {
        CustomEffectRerendered()
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
                    <CustomInnerHeader moduleName="Gate Pass Inword" isShowSelector={true} />
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
                                                        placeholder={"Select Inward Type"}
                                                        // getOptionLabel={(e) => e.salary_label}
                                                        // getOptionValue={(e) => e.salary_value}
                                                        //value={optionsInwardType.find(e => Number(e.value) == ListOfParty.inward_type)}
                                                        value={optionsInwardType.find(e => e.value == ListOfParty.inward_type)}
                                                        options={optionsInwardType}
                                                        styles={customStyles}
                                                        onChange={(e) => {
                                                            setListOfPartyPost({
                                                                ...ListOfPartyPost,
                                                                inward_type: e.value
                                                            });
                                                        }}
                                                    // onChange={(value) => {
                                                    //     setListOfPartyPost({
                                                    //         ...ListOfPartyPost,
                                                    //         inward_type: value.value,
                                                    //     });
                                                    // }}
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
                                                        value={selectedDate}
                                                        //min="2022-09-09"
                                                        onChange={(e) => {
                                                            setSelectedDate(e.target.value);

                                                        }}
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
                                                    <input required
                                                        type="text"
                                                        className='form-control'
                                                        placeholder=""
                                                        //value={ListOfParty.vehicle_no}
                                                        value={ListOfParty.vehicle_number}
                                                        onInput={(er) => (er.target.value = er.target.value.slice(0, 7))}
                                                        onChange={(e) => {
                                                            setListOfPartyPost({
                                                                ...ListOfPartyPost,
                                                                vehicle_no: e.target.value
                                                            });
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row" >
                                            <div className="field item form-group col-md-6 col-sm-6">
                                                <label className="col-form-label col-md-3 col-sm-3 label-align">Driver Name</label>{
                                                }
                                                <div className="col-md-8 col-sm-8">
                                                    <input required
                                                        type="text"
                                                        className='form-control'
                                                        placeholder=""
                                                        //value={ListOfParty.drive_name}
                                                        value={ListOfParty.driver}
                                                        onChange={(e) => {
                                                            setListOfPartyPost({
                                                                ...ListOfPartyPost,
                                                                drive_name: e.target.value
                                                            });
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="field item form-group col-md-6 col-sm-6">
                                                <label className="col-form-label col-md-3 col-sm-3 label-align">Driver Cell </label>{
                                                }
                                                <div className="col-md-8 col-sm-8">
                                                    <input required
                                                        type="text"
                                                        className='form-control'
                                                        placeholder=""
                                                        value={ListOfParty.driver_cell}
                                                        onChange={(e) => {
                                                            setListOfPartyPost({
                                                                ...ListOfPartyPost,
                                                                driver_cell: e.target.value
                                                            });
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="field item form-group col-md-6 col-sm-6">
                                                <label className="col-form-label col-md-3 col-sm-3 label-align">Rent Type</label>{
                                                }
                                                <div className="col-md-8 col-sm-8">
                                                    <Select
                                                        placeholder={"Select Rent Type"}
                                                        //value={optionsRentType.find(e => Number(e.value) == ListOfParty.rent_type)}
                                                        value={optionsRentType.find(e => e.value == ListOfParty.rent_type)}
                                                        options={optionsRentType}
                                                        styles={customStyles}
                                                        onChange={(e) => {
                                                            setListOfPartyPost({
                                                                ...ListOfPartyPost,
                                                                rent_type: e.value
                                                            });
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="field item form-group col-md-6 col-sm-6">
                                                <label className="col-form-label col-md-3 col-sm-3 label-align">Vehicle Rent</label>{
                                                }
                                                <div className="col-md-8 col-sm-8">
                                                    <input required
                                                        type="number"
                                                        className='form-control'
                                                        placeholder=""
                                                        value={ListOfParty.rent_amount}
                                                        onChange={(e) => {
                                                            setListOfPartyPost({
                                                                ...ListOfPartyPost,
                                                                rent_amount: parseInt(e.target.value)
                                                            });
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="field item form-group col-md-6 col-sm-6">
                                                <label className="col-form-label col-md-3 col-sm-3 label-align">Bility No.</label>{
                                                }
                                                <div className="col-md-8 col-sm-8">
                                                    <input required
                                                        type="number"
                                                        className='form-control'
                                                        placeholder=""
                                                        value={ListOfParty.bilty_no}
                                                        onChange={(e) => {
                                                            setListOfPartyPost({
                                                                ...ListOfPartyPost,
                                                                bilty_no: e.target.value
                                                            });
                                                        }}
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


                                {/* //////////////////////////XXXXXXXXXXXXXXXXXXXXXXXXX///////////////////////////////// */}
                                <div className="app container p-5">
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
                                                    Action
                                                </th>

                                            </tr>
                                        </thead>
                                        <tbody>
<<<<<<< HEAD
                                            {StockRecordsValue.map(((eachBenValue, index) => {
                                                return <tr>
                                                    <td>
                                                        <Select
                                                            className="col-md-11 col-sm-11"
                                                            key={index}
                                                            //value={StockRecordsValue[index].stock_account_value}
                                                            value={StockRecordsValue[index].stock_account_value}
                                                            //value= { value: item.designation_id, label: item.designationName },

                                                            isSearchable={true}
                                                            styles={customStyles}
                                                            options={stock}
                                                            onChange={(e) => {
                                                                console.log("1eee hai", e);
                                                                setStockValue(e);
                                                                const objectData = StockRecordsValue;
                                                                objectData[index] = {
                                                                    ...e,
                                                                    //stock_chart_id: objectData[index].stock_account_value,
                                                                    stock_unit_id: e.stock_account_unit,

                                                                    stock_chart_id: e.value,
                                                                    //label: e.label,

                                                                }
                                                                setStockRecordsValue(objectData)
                                                                //setReRender(!reRender)
                                                                console.log(objectData)
                                                                console.log(StockRecordsValue)
                                                            }}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Select
                                                            className="col-md-11 col-sm-11"
                                                            key={index}
                                                            value={StockRecordsValue[index].stock_packet_id}
                                                            //value={ListOfParty?.packets_details?.stock_packet_id}
                                                            isSearchable={true}
                                                            styles={customStyles}
                                                            options={stockValue.childElement}
                                                            onChange={(e) => {
                                                                console.log("2eee hai", e);
                                                                const objectData = StockRecordsValue;
                                                                objectData[index] = {
                                                                    ...e,
                                                                    //stock_chart_id: objectData[index].stock_account_value,
                                                                    // stock_packet_id: objectData[index].stock_packet_id,
                                                                    // packet_title: objectData[index].packet_title,
                                                                    // pair_base_unit: objectData[index].pair_base_unit,
                                                                    // stock_chart_id: stockValue.value,
                                                                    // stock_unit_id: e.value,

                                                                    stock_unit_id: stockValue.stock_account_unit,
                                                                    stock_chart_id: stockValue.value,
                                                                    pair_unit_id: e.value,
                                                                }
                                                                setStockRecordsValue(objectData)
                                                                //setReRender(!reRender)
                                                            }}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            className="form-control"
                                                            name="Pieces" min="0"
                                                            placeholder=""
                                                            value={StockRecordsValue[index].total_stock_pieces}
                                                            type="number"
                                                            key={index}
                                                            onInput={(er) => (er.target.value = er.target.value.slice(0, 6))}
                                                            onChange={(e) => {
                                                                const objectData = StockRecordsValue;
                                                                objectData[index] = {
                                                                    ...objectData[index],
                                                                    total_stock_pieces: parseInt(e.target.value)
                                                                }
                                                                setStockRecordsValue(objectData)
                                                                // setReRender(!reRender)
                                                            }} />
                                                    </td>
                                                    <td>
                                                        <input
                                                            className="form-control"
                                                            name="Piece Weight" min="0"
                                                            placeholder=""
                                                            value={StockRecordsValue[index].weight_per_piece}
                                                            type="number"
                                                            key={index}
                                                            onInput={(er) => (er.target.value = er.target.value.slice(0, 6))}
                                                            onChange={(e) => {
                                                                const objectData = StockRecordsValue;
                                                                objectData[index] = {
                                                                    ...objectData[index],
                                                                    weight_per_piece: parseInt(e.target.value)
                                                                }
                                                                setStockRecordsValue(objectData)
                                                            }} />
                                                    </td>
                                                    <td>
                                                        <input
                                                            className="form-control"
                                                            name="Total Weight" min="0"
                                                            placeholder=""
                                                            value={StockRecordsValue[index].tatal_weight}
                                                            type="number"
                                                            key={index}
                                                            onInput={(er) => (er.target.value = er.target.value.slice(0, 6))}
                                                            onChange={(e) => {
                                                                const objectData = StockRecordsValue;
                                                                objectData[index] = {
                                                                    ...objectData[index],
                                                                    tatal_weight: parseInt(e.target.value)
                                                                }
                                                                setStockRecordsValue(objectData)
                                                            }} />
                                                    </td>
                                                    <td>      {(stock?.length - 1) > (StockRecordsValue?.length - 1) &&
                                                        <div className="col-md-1 col-sm-1  " style={{ marginLeft: "-12px", marginTop: "5px" }}>
                                                            <i className="fa fa-plus-circle text-customBlue"
                                                                onClick={() => {
                                                                    setStockRecordsValue([...StockRecordsValue, {
                                                                        stock_chart_id: "",
                                                                        stock_unit_id: "",
                                                                        pair_unit_id: "",
                                                                        total_stock_pieces: "",
                                                                        weight_per_piece: "",
                                                                        tatal_weight: "",
                                                                    }])
=======
                                            {[...Array(noOfRows)].map((elementInArray, index) => {
                                                return (
                                                    <tr className="even pointer" key={index}>
                                                        {/* <th scope="row">{index}</th> */}
                                                        <td>
                                                            <Select
                                                                isClearable={false}
                                                                options={stock}
                                                                //value={{ label: ListOfParty?.stock_account?.stock_account_label, value: ListOfParty?.stock_account?.stock_account_value }}
                                                                value={ListOfParty?.stock_account?.stock_account_value}
                                                                styles={customStyles}
                                                                onChange={(e) => {
                                                                    setStockValue(e)
                                                                    setListOfPartyPost({
                                                                        ...setListOfParty,
                                                                        stock_account: {
                                                                            stock_account_value: e.value,
                                                                            stock_account_label: e.label
                                                                        },
                                                                    });
>>>>>>> 196b2d3faf08ff97792be245356c2b7141a8cf81
                                                                }}
                                                            />
                                                        </td>
                                                        <td>
                                                            <Select
                                                                isClearable={false}
                                                                options={stockValue.childElement}
                                                                value={ListOfParty?.packets_details?.stock_packet_id}
                                                                //value= {ListOfParty?.packets_details?.stock_packet_id.packet.find(e => Number(e.value) == stockValue) }
                                                                styles={customStyles}
                                                                onChange={(e) => {
                                                                    setPacketValue(e)
                                                                    setListOfPartyPost({
                                                                        ...setListOfParty,
                                                                        packets_details: {
                                                                            stock_packet_id: e.value,
                                                                            packet_title: e.label,
                                                                            pair_base_unit: e.pair_base_unit
                                                                        },
                                                                    });
                                                                }}
                                                            />
                                                        </td>
                                                        <td>
                                                            <input required
                                                                type="number"
                                                                className='form-control'
                                                                placeholder=""
                                                                value={ListOfParty.total_stock_pieces}
                                                                onChange={(e) => {
                                                                    setListOfPartyPost({
                                                                        ...ListOfPartyPost,
                                                                        total_stock_pieces: e.target.value
                                                                    });
                                                                }}
                                                            />
                                                        </td>
                                                        <td>
                                                            <input required
                                                                type="number"
                                                                className='form-control'
                                                                placeholder=""
                                                                value={ListOfParty.weight_per_piece}
                                                                onChange={(e) => {
                                                                    setListOfPartyPost({
                                                                        ...ListOfPartyPost,
                                                                        weight_per_piece: e.target.value
                                                                    });
                                                                }}
                                                            />
                                                        </td>
                                                        <td>
                                                            <input required
                                                                type="number"
                                                                className='form-control'
                                                                placeholder=""
                                                                value={ListOfParty.tatal_weight}
                                                                onChange={(e) => {
                                                                    setListOfPartyPost({
                                                                        ...ListOfPartyPost,
                                                                        tatal_weight: e.target.value
                                                                    });
                                                                }}
                                                            />
                                                        </td>
                                                        <td>
                                                            <Select
                                                                placeholder={"Condition"}
                                                                value={optionsCondition.find(e => Number(e.value) == ListOfParty.rent_type)}
                                                                options={optionsCondition}
                                                                styles={customStyles}
                                                                onChange={(e) => {
                                                                    setListOfPartyPost({
                                                                        ...ListOfPartyPost,
                                                                        rent_type: e.value
                                                                    });
                                                                }}
                                                            />
                                                        </td>
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
                                                            return Number(values.total_stock_pieces);
                                                        })
                                                        .reduce((a, b) => a + b, 0)}
                                                </td>
                                                <td></td>
                                                <td>
                                                    {ListOfParty
                                                        .map((values) => {
                                                            return Number(values.tatal_weight);
                                                        })
                                                        .reduce((a, b) => a + b, 0)}
                                                </td>
                                                <td></td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                    <button type="button" className="btn btn-dark me-3" onClick={() => setNoOfRows(noOfRows + 1)}>Add</button>
                                    <button type="button" className="btn btn-danger" onClick={() => noOfRows > 1 ? setNoOfRows(noOfRows - 1) : ""}>Delete</button>
                                </div>
                                {/* //////////////////////////XXXXXXXXXXXXXXXXXXXXXXXXXX///////////////////////////////// */}

                                <div className="col-md-12 text-right x_footer">
                                    <button
                                        className="btn btn-primary"
                                        type="submit"
                                        onClick={() => {
<<<<<<< HEAD
                                            let is_form_validated = true;
                                            console.log("hayee", Number(ListOfParty.inward_type) === 0, Number(selectedValue) === 0, Number(ListOfParty.vehicle_no) === 0);

                                            if (Number(ListOfParty.inward_type) === 0 || Number(selectedValue) === 0 || Number(ListOfParty.vehicle_no) === 0 || Number(ListOfParty.drive_name) === 0
                                                || Number(ListOfParty.driver_cell) === 0 || Number(ListOfParty.rent_type) === 0 || Number(ListOfParty.rent_amount) === 0 || Number(ListOfParty.bilty_no) === 0) {
                                                setIsValidateValue(false);
                                                is_form_validated = false;
                                            }

                                            if (is_form_validated === true) {
                                                postData();
                                                //fetch_selected_voucher_detail();
                                                //updateData();
                                                fetchStockData();
                                                //setisLoading(true);
                                                formSubmit();
                                            }
=======

                                            postData();
                                            //fetchAllData();
>>>>>>> 196b2d3faf08ff97792be245356c2b7141a8cf81
                                        }}
                                    >
                                        Save and Publish
                                    </button>
                                </div>
                            </div>
                        </div>


                    </div>
                </>
            )}
        </>
    );
};
export default InwardForm;