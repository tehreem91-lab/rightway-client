import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import ReactToPrint from "react-to-print";
import LadgerGlobalComponentReciept from "./LadgerGlobalComponentReciept.js";
import { customStyles } from "../../../Components/reactCustomSelectStyle";
import axios from 'axios'
import { endPoint } from "../../../config/Config.js";
import { preventLowerDate } from "../../../config/preventMinus.js";
import CustomInnerHeader from '../../../Components/CustomInnerHeader'
const LadgerGlobalComponent = ({ account_type, page_name }) => {

    const componentRef = useRef();
    const showNavMenu = useSelector((state) => state.NavState);
    var day = new Date().toLocaleDateString(undefined, { day: "2-digit" });
    var month = new Date().toLocaleDateString(undefined, { month: "2-digit" });
    var year = new Date().toLocaleDateString(undefined, { year: "numeric" });
    const dateToday = `${year}-${month}-${day}`;
    const [dateFrom, setdateFrom] = useState(dateToday);
    const [dateTo, setdateTo] = useState(dateToday);
    const [isLoading, setIsLoading] = useState(true)
    const [LadgerData, setLadgerData] = useState({})
    const [accountOptions, setaccountOptions] = useState([])
    const [accountValue, setAccountValue] = useState("")
    const [balanceState, setBalanceState] = useState(0)
    const [validationState, setValidationState] = useState(true)

    const fetch_selelctor_options = () => {
        var config = {
            method: 'get',
            url: `${endPoint}api/AccountOptions/GetData?category_name=${account_type}`,
            headers: {
                'Authorization': `bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
            }
        };

        axios(config)
            .then(function (response) {
                setaccountOptions(response.data.map((each_acc) => {
                    return {
                        value: each_acc.chart_id,
                        label: `${each_acc.account_name} (${each_acc.account_code})`,
                        account_name: each_acc.account_name,
                        account_code: each_acc.account_code,

                    }
                }))
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const fetchLadger = () => {

        if (accountValue === "" || dateFrom === "" || dateTo === "") {
            setValidationState(false)
        } else {


            var config = {
                method: 'get',
                url: `${endPoint}api/LadgerReport/GetReport?chart_id=${accountValue.value}&dateFrom=${dateFrom}T00:00:00&dateTo=${dateTo}T00:00:00`,
                headers: {
                    'Authorization': `bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
                }
            };

            axios(config)
                .then(function (response) {
                    if (response.status === 200) {
                        setLadgerData(response.data)
                        setBalanceState(response.data.opening_balance.opening_balance1)
                        setIsLoading(false)
                    }

                })
                .catch(function (error) {
                    console.log(error);
                    setIsLoading(true)
                    setLadgerData({})
                });
        }
    };
    useEffect(() => {
        fetch_selelctor_options();
    }, []);

    return (
        <>
            <div
                className={`container-fluid page-title-bar ${showNavMenu == false ? "right_col-margin-remove" : ""
                    }   `}
            >
                <CustomInnerHeader moduleName={page_name} isShowSelector={true} />

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
                                <div className="row">
                                    <div className="field item form-group col-md-6 col-sm-6">
                                        <label className="col-form-label col-md-3 col-sm-3 label-align"> Select Account <span className="required">*</span></label>
                                        <div className="col-md-8 col-sm-8">
                                            <Select
                                                isSearchable={true}
                                                styles={customStyles}
                                                options={accountOptions}
                                                value={accountValue}
                                                onChange={(e) => {
                                                    setAccountValue(e)
                                                }}
                                            />
                                            {validationState === false && accountValue === "" && <span className="text-danger">First Select this </span>}
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="col-md-12 text-right x_footer">

                                <button className="btn btn-primary" type="submit" onClick={() => { fetchLadger() }} >
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
                                                                    <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>

                                            </div>
                                        </span>


                                    </div>
                                    <div className="clearfix" />
                                    <LadgerGlobalComponentReciept ref={componentRef} LadgerData={LadgerData}
                                        balanceState={balanceState}
                                        grandTotal={234}
                                        dateFrom={dateFrom} dateTo={dateTo} employeeNameForPrint={"lorem"}
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

export default LadgerGlobalComponent;