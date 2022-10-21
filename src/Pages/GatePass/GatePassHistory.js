import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from "react-redux";
import ReactToPrint from 'react-to-print'
import { useNavigate } from "react-router-dom";
import CustomInnerHeader from '../../Components/CustomInnerHeader';

const GatePassHistory = () => {
    const navigate = useNavigate();
    var day = new Date().toLocaleDateString(undefined, { day: "2-digit" });
    var month = new Date().toLocaleDateString(undefined, { month: "2-digit" });
    var year = new Date().toLocaleDateString(undefined, { year: "numeric" });
    const dateToday = `${year}-${month}-${day}`
    const showNavMenu = useSelector((state) => state.NavState);
    const componentRef = useRef();
    const [dateFrom, setDateFrom] = useState(dateToday)
    const [dateTo, setDateTo] = useState(dateToday)
    const [GatepassInv, setGatepassInv] = useState([])
    const [isShowVoucher, setisShowVoucher] = useState(false)
    const [ReportData, setReportData] = useState({})
    const GatePassReport = (id) => {
        var config = {
            method: 'get',
            url: `http://rightway-api.genial365.com/api/GatePassInward/GetGatePassInvReport?gate_pass_main_id=${id}`,
            headers: {
                'Authorization': `bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`
            }
        };

        axios(config)
            .then(function (response) {
                setReportData(response.data)
                setisShowVoucher(true)
                console.log(response.data);

            })
            .catch(function (error) {
                console.log(error);
            });

    }
    var axios = require('axios');
    const showInv = () => {

        var config = {
            method: 'get',
            url: `http://rightway-api.genial365.com/api/GatePassInward/GetGatePassInvHistory?date_from=${dateFrom}T00:00:00.928Z&date_to=${dateTo}T00:00:00.928Z`,
            headers: {
                'Authorization': `bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`
            }
        };

        axios(config)
            .then(function (response) {
                setGatepassInv(response.data)
                console.log(response.data);

            })
            .catch(function (error) {
                console.log(error);
            });

    }
    return (
        <>
            <div className={`container-fluid page-title-bar ${showNavMenu == false ? "right_col-margin-remove" : ""}   `} >
            <CustomInnerHeader moduleName={"Gate Inward"} isShowSelector={true}/> 
            </div>
            <div role="main" style={{ padding: '0px', backgroundColor: 'white' }} className={`right_col  h-100  ${showNavMenu === false ?
                "right_col-margin-remove" : " "} `}>
                <div className="row">
                    <div className="col-md-5 ">
                        <div className="x_panel px-0">
                            <div className="x_content  ">
                                <span className="section pl-4">
                                    <i className="fa fa-list"></i>&nbsp;History
                                </span>
                                <div className="field item form-group">
                                    <label className="col-form-label col-md-4 col-sm-4   label-align px-0">
                                        Date From
                                    </label>
                                    <div className="col-md-8 col-sm-6">
                                        <input
                                            value={dateFrom}
                                            min="2022-07-27"
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
                                <div className="text-right">
                                    <button
                                        className="btn btn-customOrange btn-sm px-3 mt-2 mr-0"
                                        onClick={() => {
                                            showInv()

                                        }}
                                    >

                                        Search <i className="ml-2 fa fa-search"></i>
                                    </button></div></div></div>
                    </div>

                    {
                        isShowVoucher && <div className="col-md-7">
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
                                                                        className="btn btn-sm btn-success my-2 pt-1 borderRadiusRound"
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
                                                            data-toggle="tooltip" data-placement="top" title="View Attachments"
                                                        ><i className="fa fa-file-pdf-o" aria-hidden="true"></i>
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button
                                                            className="btn btn-sm btn-customOrange my-2 pt-1 borderRadiusRound"
                                                            data-toggle="tooltip" data-placement="top" title="View Attachments"

                                                        >
                                                            <i className="fa fa-plus" aria-hidden="true"></i>
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button
                                                            className="btn btn-sm btn-customOrange my-2 pt-1 borderRadiusRound"
                                                            data-toggle="tooltip" data-placement="top" title="View Attachments"

                                                        >
                                                            <i className="fa fa-paperclip" aria-hidden="true"></i>
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button
                                                            className="btn btn-sm btn-customOrange my-2 pt-1 borderRadiusRound"
                                                            onClick={() => {navigate('/GatePassInward', { state: { id: ReportData.inward_gatepass_main_id, flag: true } }) }}
                                                        >
                                                            <i className="fa fa-edit" ></i>
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </span>
                                    <div className="x_content my-3" ref={componentRef}>
                                        <h2 >GatePass Report </h2>

                                        <div className="row row-1 mx-0 ">
                                            <div className="col-md-4 col-4">
                                                <div className="row row-1">
                                                    <div className="col-md-6 col-4 bold-5   text-dark ">   Voucher Inv: </div>
                                                    <div className="col-md-6 col-6  bold-6  text-dark "> {ReportData.voucher_inv} </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3 col-4">
                                                <div className="row row-1">
                                                    <div className="col-md-4 col-2 bold-5  text-dark ">Date:</div>
                                                    <div className="col-md-8 col-4 bold-6  text-dark "> {ReportData.voucher_date.slice(0, 10)} </div>
                                                </div>
                                            </div>
                                            <div className="col-md-5 col-4">
                                                <div className="row row-1">
                                                    <div className="col-md-5  col-4 bold-5  text-dark ">Party Name:</div>
                                                    <div className="col-md-7 col-7 bold-6  text-dark "> {ReportData.party_name}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row row-1 mx-1  reportTableHead mt-2">

                                            <div className="col-md-2 col-2 font-size-12  text-center  my-1 ">
                                                Account Name
                                            </div>
                                            <div className="col-md-2  col-2 font-size-12  text-center  my-1 ">
                                                Account Code
                                            </div>
                                            <div className="col-md-2 col-2 font-size-12  text-center  my-1 ">
                                                Stock Unit name
                                            </div>
                                            <div className="col-md-2 col-2 font-size-12  text-center  my-1 ">

                                                Stock Piece
                                            </div>
                                            <div className="col-md-2 col-2 font-size-12  text-center  my-1 ">
                                                Total Weight
                                            </div>
                                            <div className="col-md-2 col-2 font-size-12  text-center  my-1 ">
                                                Weight Per Piece
                                            </div>
                                        </div>
                                        {
                                            ReportData.stock_entries.length === 0 && <div className="row mx-1 row-1  reportTableBody bottom-border-2" style={{ cursor: "pointer" }}>
                                            <div className="col-md-12  col-12  font-size-12 bold-6   py-1 pt-1   text-center ">
                                                        <span className='text-center'> No Data Available</span>
                                                    </div>
                                                </div>
                                            }{
                                            ReportData.stock_entries.map((each_entry, index) => {
                                                return <React.Fragment key={index}>
                                                    <div className="row mx-1 row-1  reportTableBody bottom-border-2">

                                                        <div className="col-md-2  col-2  font-size-12 bold-6   py-1 pt-1 right-border-2 left-border-2   d-flex justify-content-start align-items-center ">
                                                            {each_entry.account_name.toUpperCase()}
                                                        </div>
                                                        <div className="col-md-2  col-2  font-size-12    py-1  right-border-2 pt-1  d-flex justify-content-center align-items-center ">
                                                            {each_entry.account_code}
                                                        </div>
                                                        <div className="col-md-2  col-2  font-size-12    py-1  right-border-2 pt-1  d-flex justify-content-center align-items-center ">
                                                            {each_entry.stock_unit_name}</div>
                                                        <div className="col-md-2  col-2  font-size-12    py-1  right-border-2 pt-1  d-flex justify-content-center align-items-center ">
                                                            {each_entry.total_stock_piece}</div>
                                                        <div className="col-md-2  col-2  font-size-12    py-1  right-border-2 pt-1  d-flex justify-content-center align-items-center ">
                                                            {each_entry.total_weight}</div>
                                                        <div className="col-md-2 col-2   font-size-12    py-1  right-border-2 pt-1  d-flex justify-content-center align-items-center ">
                                                            {each_entry.weight_per_piece}</div>
                                                    </div>
                                                </React.Fragment>
                                            })
                                        }


                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className="row">
                    <div className="col-md-5 ">
                        <div className="x_panel px-0">
                            <div className="x_content  ">
                                <div className="table-responsive" style={{ height: '400px', overflow: 'scroll' }}>
                                    <table className="table table-striped jambo_table bulk_action">
                                        <thead>
                                            <tr className="headings positionFixed">
                                                <th className="column-title   text-left" width="50%">GatePass Inv</th>
                                                <th className="column-title     text-right " width="50%"></th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                GatepassInv.length === 0 && <tr className="even pointer" style={{ cursor: "pointer" }}>
                                                    <td className='text-left pb-0 pt-1 text-center' colSpan={2}>
                                                        <span > No Data Available</span>
                                                    </td>
                                                </tr>
                                            }
                                            {GatepassInv.map((each_voucher_record, index) => {
                                                return <tr className="even pointer" style={{ cursor: "pointer" }} key={index}>

                                                    <td className='text-left pb-0 pt-1'
                                                        onClick={() => GatePassReport(each_voucher_record.inward_gatepass_main_id)}
                                                    >
                                                        <div> <strong style={{ fontSize: '12px' }}> {each_voucher_record.voucher_date.slice(0, 10)}</strong></div>
                                                        <div> <strong style={{ fontSize: '12px' }}> {each_voucher_record.voucher_inv}</strong></div>
                                                    </td>
                                                    <td className='text-right pb-0 pt-1' >
                                                        <div> <strong style={{ fontSize: '12px' }} onClick={() => GatePassReport(each_voucher_record.inward_gatepass_main_id)}> {each_voucher_record.party_name}</strong> </div>
                                                        <div className='py-0'>
                                                            <span className='text-customOrange'>
                                                                <u onClick={() => {navigate('/GatePassInward', { state: { id: each_voucher_record.inward_gatepass_main_id, flag: true } }) }
                                                                }
                                                                > Edit</u>
                                                            </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </table>
                                </div></div></div>
                    </div></div>
            </div>
        </>
    )
}

export default GatePassHistory