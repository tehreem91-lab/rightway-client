import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import ReactToPrint from "react-to-print";
import { customStyles } from "../../../../Components/reactCustomSelectStyle";
import axios from 'axios'
import { endPoint } from "../../../../config/Config.js";
import { preventLowerDate } from "../../../../config/preventMinus.js";
import CustomInnerHeader from '../../../../Components/CustomInnerHeader'
import TrialSheetReciept from "./TrialSheetReciept.js";
const TrialSheet = () => {

    const componentRef = useRef();
    const showNavMenu = useSelector((state) => state.NavState);
    var day = new Date().toLocaleDateString(undefined, { day: "2-digit" });
    var month = new Date().toLocaleDateString(undefined, { month: "2-digit" });
    var year = new Date().toLocaleDateString(undefined, { year: "numeric" });
    const dateToday = `${year}-${month}-${day}`;
    const [dateFrom, setdateFrom] = useState(dateToday);
    const [dateTo, setdateTo] = useState(dateToday);
    const [isLoading, setIsLoading] = useState(true)
    const [validationState, setValidationState] = useState(true)
    const [reportData, setReportData] = useState([])

    const fetchTrialBalanceReport = () => {
        var config = {
            method: 'get',
            url: `${endPoint}api/trialBalace/GetData?dateFrom=${dateFrom}T00:00:00&dateTo=${dateTo}T00:00:00`,
            headers: {
                'Authorization': `bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
            }
        };

        axios(config)
            .then(function (response) {
                console.log(response.data);
                if (response.status === 200) {
                    setIsLoading(false)
                    setReportData(response.data)
                }
            })
            .catch(function (error) {
                console.log(error);
            });



    }


    return (
        <>
            <div
                className={`container-fluid page-title-bar ${showNavMenu == false ? "right_col-margin-remove" : ""
                    }   `}
            >
                <CustomInnerHeader moduleName="Trial Balance" isShowSelector={true} />

            </div>
            <div
                className={`right_col  h-10 heightFixForFAult  ${showNavMenu == false ? "right_col-margin-remove" : " "
                    } `}
                role="main"
            >
                <div className="row">
                    <div className="col-md-12">
                        <div className="x_panel  px-0 ">
                            <div className="x_content my-3">
                                <span className="section  px-2 ">
                                    <i className="fa fa-filter pl-2"></i>&nbsp;Report Filter
                                </span>
                                <div className="row">
                                    <div className="field item form-group col-md-6 col-sm-6">
                                        <label className="col-form-label col-md-3 col-sm-36 label-align"> From Date <span className="required">*</span></label>
                                        <div className="col-md-8 col-sm-8">
                                            <input
                                                className="form-control"
                                                type="date"
                                                value={dateFrom}
                                                min="2022-07-27"
                                                onKeyPress={async (e) => await preventLowerDate(e)} //not working yet
                                                onChange={(e) => {
                                                    setdateFrom(e.target.value);
                                                }}
                                            />

                                            {validationState === false && dateFrom === "" && <span className="text-danger">First Select this </span>}

                                            {/* // its show fiscal year initial value */}
                                        </div>
                                    </div>
                                    <div className="field item form-group col-md-6 col-sm-6">
                                        <label className="col-form-label col-md-3 col-sm-3 label-align"> To Date <span className="required">*</span></label>
                                        <div className="col-md-8 col-sm-8">
                                            <input
                                                className="form-control w-100"
                                                type="date"
                                                value={dateTo}
                                                onChange={(e) => {
                                                    setdateTo(e.target.value);
                                                }}
                                            />
                                            {validationState === false && dateTo === "" && <span className="text-danger">First Select this </span>}

                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="col-md-12 text-right x_footer">

                                <button className="btn btn-primary" type="submit" onClick={() => { fetchTrialBalanceReport() }} >
                                    Show Report
                                </button>



                            </div>

                        </div>


                        {!isLoading &&
                            <>
                                <div className="x_panel px-0">
                                    <div className="x_content ">
                                        <span className="section mb-0 pb-1">
                                            <div className="row pl-2 ">
                                                <div className="col-5 ">
                                                    <i className='fa fa-list'></i>&nbsp;Report Data
                                                </div>
                                                <div className="col-7 text-right px-0 ">
                                                    <div className="col-md-5"> </div>
                                                    <div className="col-md-4  text-left "> </div>
                                                    <div className="col-md-3 pr-4">
                                                        <ul className="mr-3 nav navbar-right panel_toolbox d-flex justify-content-end">
                                                            <li>
                                                                <ReactToPrint
                                                                    trigger={() => {
                                                                        return (
                                                                            <button className="btn btn-sm btn-success borderRadiusRound">
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
                                                                    className="btn btn-sm btn-primary borderRadiusRound"
                                                                    onClick={() => console.log("print")}
                                                                >
                                                                    <i className="fa fa-file-pdf-o" aria-hidden="true"></i>
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>

                                            </div>
                                        </span>


                                    </div>
                                    <div className="clearfix" />
                                    <TrialSheetReciept ref={componentRef}
                                        dateFrom={dateFrom} dateTo={dateTo}
                                        reportData={reportData}
                                    />

                                </div>     </>
                        }




                    </div>
                    <div className="col-md-8 px-0">

                    </div>
                </div>
            </div>
        </>
    );
};

export default TrialSheet;