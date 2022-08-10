import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import ReactToPrint from "react-to-print";
import GeneralLadgerReciept from "./GeneralLadgerReciept.js";
import { customStyles } from "../../../../Components/reactCustomSelectStyle";
const GeneralLadger = () => {
    const componentRef = useRef();
    const showNavMenu = useSelector((state) => state.NavState);
    var day = new Date().toLocaleDateString(undefined, { day: "2-digit" });
    var month = new Date().toLocaleDateString(undefined, { month: "2-digit" });
    var year = new Date().toLocaleDateString(undefined, { year: "numeric" });
    const dateToday = `${year}-${month}-${day}`;
    const [dateFrom, setdateFrom] = useState(dateToday);
    const [dateTo, setdateTo] = useState(dateToday);
    const [isLoadingSelector, setIsLoadingSelector] = useState(false)
    const [selectValidation, setSelectorValidation] = useState(true)
    const [LadgerData, setLadgerData] = useState({})
    const fetchWeaverList = () => { };

    const fetchLadger = () => { };
    useEffect(() => {
        fetchWeaverList();
    }, []);

    return (
        <>
            <div
                className={`container-fluid page-title-bar ${showNavMenu == false ? "right_col-margin-remove" : ""
                    }   `}
            >
                <span>&nbsp;Ledger Report</span>
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
                                    <label className="col-form-label col-md-3 col-sm-3 label-align"> Enter Color Title <span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <input
                                            className="form-control"
                                            type="date"
                                            value={dateFrom}
                                            onChange={(e) => {
                                                setdateFrom(e.target.value);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align"> Enter Color Title <span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <input
                                            className="form-control w-100"
                                            type="date"
                                            value={dateTo}
                                            onChange={(e) => {
                                                setdateTo(e.target.value);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align"> Enter Color Title <span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <Select
                                            isSearchable={true}
                                            styles={customStyles}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="col-md-12 text-right x_footer">

                            <button className="btn btn-primary" type="submit" >
                                Show Report
                            </button>



                        </div>

                    </div>
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
                            {/* </div> */}
                            <GeneralLadgerReciept ref={componentRef} LadgerData={LadgerData}
                                grandTotal={234} selectValidation={selectValidation}
                                dateFrom={dateFrom} dateTo={dateTo} employeeNameForPrint={"lorem"}
                            />
                            {/* </div> */}
                        </div>

                    </div>
                    <div className="col-md-8 px-0">

                    </div>
                </div>
            </div>
        </>
    );
};

export default GeneralLadger;