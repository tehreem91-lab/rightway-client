import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

import { useSelector } from "react-redux";
import { endPoint } from '../../config/Config.js';
import { customStyles } from '../../Components/reactCustomSelectStyle.jsx';
import dateToday from '../../config/todayDate.js';

import ReactToPrint from 'react-to-print'

import { Link, useLocation, useNavigate } from "react-router-dom";
import VoucherReportReciept from "../Finance/MultipleVouchers/VoucherHistory/VoucherReportReciept";

import Select from 'react-select'
import voucherTypes from '../../config/voucherTypes.js';
import InwardHistoryReciept from './InwardHistoryReciept.js';

const InwardHistory = () => {

    const componentRef = useRef();
    const [routePathToBeNavigate, setroutePathToBeNavigate] = useState("JournalVoucherAccess")
    const navigate = useNavigate();

    const { state } = useLocation();
    const [isValidateOK, setIsValidateOK] = useState(true)
    const [voucherTypeOption, setvoucherTypeOption] = useState([])
    const [voucherTypeValue, setvoucherTypeValue] = useState("")

    const [dateFrom, setDateFrom] = useState(dateToday)
    const [dateTo, setDateTo] = useState(dateToday)
    const [voucherHistoryRecord, setVoucherHistoryRecord] = useState([])
    const [voucherHistoryRecordConst, setVoucherHistoryRecordConst] = useState([])
    const [selectedVoucher, setSelectedVoucher] = useState("")

    const [isShowVoucher, setisShowVoucher] = useState(false)

    const showNavMenu = useSelector((state) => state.NavState);
    const [showAttachment, setshowAttachment] = useState(false)
    const fetchHistory = () => {

        var config = {
            method: 'get',
            //url: `${endPoint}api/MultiVoucher/History?dateFrom=${dateFrom}T00:00:00.928Z&dateTo=${dateTo}T00:00:00.928Z&voucher_types=${voucherTypeValue.value}`,
            url: `${endPoint}api/GatePassInward/GetGatePassInvHistory?date_from=${dateFrom}&date_to=${dateTo}`,

            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
            }
        };

        axios(config)
            .then(function (response) {
                setVoucherHistoryRecord(response.data)
                //console.log(response.data);
                setVoucherHistoryRecordConst(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const fetchInitialData = () => {

        var config = {
            method: 'get',
            url: `${endPoint}api/VouchersType/GetData`,
            headers: {
                'Authorization': `bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`
            }
        };

        axios(config)
            .then(function (response) {
                //console.log(response.data);
                const voucher_option_modified = response.data.map((each_voucher) => {
                    return {
                        label: each_voucher.type_name,
                        value: each_voucher.voucher_id
                    }
                })
                setvoucherTypeOption(voucher_option_modified);
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const searchItem = (e) => {
        var allData = voucherHistoryRecordConst;
        setVoucherHistoryRecord(voucherHistoryRecordConst);
        var filteredData = allData.filter((obj) => {
            var data = Object.keys(obj)
                .filter((key) => obj[key].toString().toLowerCase().includes(e))
                .reduce((cur, key) => {
                    return Object.assign(cur, { [key]: obj[key] });
                }, {});
            if (Object.keys(data).length !== 0) {
                return obj;
            }
        });
        setVoucherHistoryRecord(filteredData);
    };

    const fetch_selected_voucher_detail = (e) => {
        var config = {
            method: 'get',
            //url: `${endPoint}api/MultipleVoucher/GetReport?voucher_id=${e}`,
            url: `${endPoint}api/GatePassInward/GetGatePassById?gate_pass_main_id=${e}`,
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
            }
        };

        axios(config)
            .then(function (response) {
                //console.log(response.data);
                setSelectedVoucher(response.data);

                // setroutePathToBeNavigate(voucherTypes.find(
                //     (o) => o.voucher_id === response.data.voucher_type_id
                // ).multiple_router_path)


                setisShowVoucher(true)
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    // const updateData = async () => {

    //     var axios = require('axios');
    //     var data = JSON.stringify({
    //         "party_chart_id": selectedValue.chart_id,
    //         "date": selectedDate,
    //         "vehicle_no": ListOfPartyPost.vehicle_no,
    //         "drive_name": ListOfPartyPost.drive_name,
    //         "driver_cell": ListOfPartyPost.driver_cell,
    //         "rent_type": ListOfPartyPost.rent_type,
    //         "rent_amount": ListOfPartyPost.rent_amount,
    //         "bilty_no": ListOfPartyPost.bilty_no,
    //         "inward_type": ListOfPartyPost.inward_type,
    //         "remarks": ListOfPartyPost.remarks,
    //         "attachments": fileEntity.join(",").toString(),
    //         "stock_entries": StockRecordsValue.length === 0 ? [] : StockRecordsValue.map((i) => {
    //             return {
    //                 "stock_chart_id": i.stock_chart_id,
    //                 "stock_unit_id": i.stock_unit_id,
    //                 "pair_unit_id": i.pair_unit_id,
    //                 "total_stock_pieces": i.total_stock_pieces,
    //                 "weight_per_piece": i.weight_per_piece,
    //                 "tatal_weight": i.tatal_weight
    //             }
    //         })
    //     });

    //     var config = {
    //         method: 'put',
    //         url: `${endPoint}api/GatePassInward/PutData?gate_pass_main_id=${e}`,

    //         headers: {
    //             Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
    //             'Content-Type': 'application/json'
    //         },
    //         data: data
    //     };

    //     axios(config)
    //         .then(function (response) {
    //             console.log(JSON.stringify(response.data));
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });


    // }

    useEffect(() => {
        fetchInitialData()
        state !== null && fetch_selected_voucher_detail(state.data)

    }, [])


    return (
        <>
            <div
                className={`container-fluid page-title-bar ${showNavMenu == false ? "right_col-margin-remove" : ""
                    }   `}
            >
                <span>&nbsp;Gate Pass Inward History</span>
            </div>
            <div
                className={`right_col  h-10 heightFixForFAult  ${showNavMenu == false ? "right_col-margin-remove" : " "
                    } `}
                role="main"
            >
                <div className="row">
                    <div className="col-md-4 ">
                        <div className="x_panel px-0">

                            <div className="x_content  ">
                                <span className="section">
                                    <div className="row px-2  ">
                                        <div className="col-11 ">
                                            <i className='fa fa-list'></i>&nbsp;History
                                        </div>
                                    </div>
                                </span>
                                <div className="field item form-group">
                                    <label className="col-form-label col-md-4 col-sm-4   label-align px-0">
                                        Date From
                                    </label>
                                    <div className="col-md-8 col-sm-6">
                                        <input
                                            value={dateFrom}
                                            className="form-control"
                                            type="date"
                                            onChange={(e) => setDateFrom(e.target.value)}

                                        />
                                    </div>
                                </div>
                                <div className="field item form-group">
                                    <label className="col-form-label col-md-4 col-sm-4   label-align px-0">
                                        Date To
                                    </label>
                                    <div className="col-md-8 col-sm-6">
                                        <input
                                            value={dateTo}
                                            className="form-control"
                                            type="date"
                                            onChange={(e) => setDateTo(e.target.value)}

                                        />
                                    </div>
                                </div>
                                {/* <div className="field item form-group">
                                    <label className="col-form-label col-md-4 col-sm-4   label-align px-0">
                                        Voucher Type
                                    </label>
                                    <div className="col-md-8 col-sm-6">
                                        <Select
                                            value={voucherTypeValue}
                                            isSearchable={true}
                                            styles={customStyles}
                                            options={voucherTypeOption}
                                            onChange={(e) => setvoucherTypeValue(e)}
                                        />
                                        {
                                            !isValidateOK && voucherTypeValue === "" && <span className="text-danger">First Select this </span>
                                        }
                                    </div>
                                </div> */}
                                <div className="field item form-group">
                                    {/* <label className="col-form-label col-md-4 col-sm-4   label-align px-0">
                                        Search
                                    </label> */}
                                    <div className="col-md-12 col-sm-12">
                                        {/* <input
                                            className="form-control"
                                            type="text"
                                            placeholder='search ...'
                                            onChange={(e) => searchItem(e.target.value)}
                                        /> */}
                                        <div className="text-right">
                                            <button
                                                className="btn btn-customOrange btn-sm px-3 mt-2 mr-0"
                                                onClick={() => {
                                                    // if (Number(voucherTypeValue) === 0) {
                                                    //     setIsValidateOK(false)
                                                    // } else 
                                                    {
                                                        fetchHistory()
                                                    }
                                                }}
                                            >
                                                Search <i className="ml-2 fa fa-search"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className=''>
                                    <div className="table-responsive">
                                        <table className="table table-striped jambo_table bulk_action">
                                            <thead>
                                                <tr className="headings positionFixed">
                                                    <th className="column-title   text-left" width="50%"> Voucher Inv</th>
                                                    <th className="column-title     text-right " width="50%">Party Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    voucherHistoryRecord.length === 0 && <tr className="even pointer" style={{ cursor: "pointer" }}>
                                                        <td className='text-left pb-0 pt-1 text-center' colSpan={2}>
                                                            <span > No Data Available</span>
                                                        </td>
                                                    </tr>
                                                }
                                                {voucherHistoryRecord.map((each_voucher_record, index) => {
                                                    return <tr className="even pointer" style={{ cursor: "pointer" }} key={index}>

                                                        <td className='text-left pb-0 pt-1' onClick={() => fetch_selected_voucher_detail(each_voucher_record.inward_gatepass_main_id)} >
                                                            <div> <strong style={{ fontSize: '12px' }}> {each_voucher_record.voucher_date.slice(0, 10)}</strong></div>
                                                            <div> <strong style={{ fontSize: '12px' }}> {each_voucher_record.voucher_inv}</strong></div>
                                                        </td>

                                                        <td className='text-right pb-0 pt-1' onClick={() => fetch_selected_voucher_detail(each_voucher_record.inward_gatepass_main_id)} >
                                                            <div> <strong style={{ fontSize: '12px' }}> {each_voucher_record.party_name}</strong></div>
                                                            <div className='py-0'>
                                                                <span className='text-customOrange'>
                                                                    <u onClick={() => {
                                                                        navigate('/InwardFormAccess', {
                                                                            state: null
                                                                        });


                                                                    }}> Edit</u>
                                                                </span>
                                                            </div>
                                                        </td>
                                                        {/* <td className='text-right pb-0 pt-1' >
                                                            <div> <strong style={{ fontSize: '12px' }} onClick={() => {
                                                                fetch_selected_voucher_detail(each_voucher_record.inward_gatepass_main_id)
                                                            }}> {each_voucher_record.balance}</strong> </div>
                                                            <div className='py-0'>
                                                                <span className='text-customOrange'>
                                                                    <u onClick={() => {
                                                                        if (each_voucher_record.is_multiple_voucher === 0) {
                                                                            // its mean its single  
                                                                            navigate(`/${voucherTypes.find(
                                                                                (o) => o.voucher_id === each_voucher_record.voucher_type_id
                                                                            ).single_router_path}`, {
                                                                                state: {
                                                                                    data: each_voucher_record.inward_gatepass_main_id
                                                                                }
                                                                                // here im using Dynamic rout path check nd blnce that on whicj route we have to go
                                                                            });
                                                                        } else {
                                                                            navigate(`/${voucherTypes.find(
                                                                                (o) => o.voucher_id === each_voucher_record.voucher_type_id
                                                                            ).multiple_router_path}`, {
                                                                                state: {
                                                                                    data: each_voucher_record.inward_gatepass_main_id
                                                                                }
                                                                                // here im using Dynamic rout path check nd blnce that on whicj route we have to go
                                                                            });
                                                                        }



                                                                    }}> Edit</u>
                                                                </span>
                                                            </div>
                                                        </td> */}
                                                    </tr>
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {
                        isShowVoucher && <div className="col-md-8">
                            <div className="x_panel p-0">
                                <div className="x_content ">
                                    <span className="section pb-0">
                                        <div className="row px-2 ">
                                            <div className="col-3  pt-3">
                                                <i className='fa fa-list'></i>&nbsp;Report
                                            </div>
                                            <div className="col-9 text-right ">
                                                <ul className="nav navbar-right panel_toolbox d-flex justify-content-end">

                                                    <li>
                                                        <ReactToPrint
                                                            trigger={() => {
                                                                return (
                                                                    <button
                                                                        className="btn btn-sm btn-success my-2 pt-1 borderRadiusRound" title="Print"
                                                                    >
                                                                        <i className="fa fa-print"></i>
                                                                    </button>
                                                                );
                                                            }}
                                                            content={() => componentRef.current}
                                                            documentTitle="new docs"
                                                            pageStyle="print"
                                                        />
                                                    </li>
                                                    <li>
                                                        <button
                                                            className="btn btn-sm btn-customOrange my-2 pt-1 borderRadiusRound"
                                                            data-toggle="tooltip" data-placement="top" title="Download as PDF"
                                                        ><i className="fa fa-file-pdf-o" aria-hidden="true"></i>
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button
                                                            className="btn btn-sm btn-customOrange my-2 pt-1 borderRadiusRound"
                                                            data-toggle="tooltip" data-placement="top" title="View in Inward Form"
                                                            onClick={() => {
                                                                navigate('/InwardFormAccess', {
                                                                    state: null
                                                                });
                                                            }
                                                            }
                                                        >
                                                            <i className="fa fa-plus" aria-hidden="true"></i>
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button
                                                            className="btn btn-sm btn-customOrange my-2 pt-1 borderRadiusRound"
                                                            data-toggle="tooltip" data-placement="top" title="View Attachments"
                                                            onClick={() => setshowAttachment(!showAttachment)}
                                                        >
                                                            <i className="fa fa-paperclip" aria-hidden="true"></i>
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button
                                                            className="btn btn-sm btn-customOrange my-2 pt-1 borderRadiusRound" title="Edit Inward Form"
                                                            // onClick={() => {
                                                            //     navigate(`/${voucherTypes.find(
                                                            //         (o) => o.voucher_id === selectedVoucher.voucher_type_id
                                                            //     ).multiple_router_path}`, {
                                                            //         state: {
                                                            //             data: selectedVoucher.voucher_id
                                                            //         }
                                                            //         // here im using Dynamic rout path check nd blnce that on which route we have to go
                                                            //     });
                                                            // }}
                                                            onClick={() => {
                                                                navigate('/InwardFormAccess', {
                                                                    state: null
                                                                });
                                                            }}
                                                        >
                                                            <i className="fa fa-edit"></i>
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </span>
                                    <InwardHistoryReciept
                                        showAttachment={showAttachment}
                                        selectedVoucher={selectedVoucher} ref={componentRef} />
                                </div>
                            </div>
                        </div>
                    }




                </div>
            </div>


        </>

    )
}

export default InwardHistory;