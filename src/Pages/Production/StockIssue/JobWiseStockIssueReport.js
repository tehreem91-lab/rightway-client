import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import axios from "axios";
import { endPoint } from "../../../config/Config";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import CustomInnerHeader from "../../../Components/CustomInnerHeader";
import { customStyles } from "../../../Components/reactCustomSelectStyle";
import ReactToPrint from "react-to-print";
import { CSVLink } from "react-csv";

const JobWiseStockIssueReport = () => {
  let componentRef = useRef();

  var day = new Date().toLocaleDateString(undefined, { day: "2-digit" });
  var month = new Date().toLocaleDateString(undefined, { month: "2-digit" });
  var year = new Date().toLocaleDateString(undefined, { year: "numeric" });

  //  const  time = today.getHours() + ':' + today.getMinutes() ;
  const dateToday = `${year}-${month}-${day}`;

  const [validationState, setValidationState] = useState(true);
  const [dateFrom, setdateFrom] = useState(dateToday);
  const [dateto, setdateTo] = useState(dateToday);
  const [AvailableReport, setAvailableReport] = useState([1]);
  const [isLoading, setisLoading] = useState(true);
  const [isLoader, setisLoader] = useState(true);
  const showNavMenu = useSelector((state) => state.NavState);
  const [Exceldata, setExceldata] = useState([]);

  const headers = [
    { label: "Sr", key: "Sr" },
    { label: "Product Name", key: "ProductName" },
    { label: "Product Code", key: "ProductCode" },
    { label: "Job No", key: "JobNo" },
    { label: "Stock Issue Date", key: "StockIssueDate" },
    { label: "Assigned Person", key: "AssignedPerson" },
    { label: "Decription", key: "Decription" },
    



  ];
  const csvReport = {
    filename: "JobStockIssueReport.csv",
    headers: headers,
    data: Exceldata
  };
  const fetchData = () => {
    
    setisLoader(false);
    var axios = require('axios');

    var config = {
      method: 'get',
      url: `http://rightway-api.genial365.com/api/ProductionReports/GetJobWiseStockIssueReport?dateFrom=${dateFrom}&dateTo=${dateto}`,
      headers: {
        'Authorization': `bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
      }
    };

    axios(config)
      .then(function (response) {
        setAvailableReport(response.data)
        
        setExceldata(
          AvailableReport.map((item, id) => {
            return {
              Sr: id+1,
              ProductName: item.product_name,
              ProductCode: item.product_code,
              JobNo: item.job_number,
              StockIssueDate: item.issued_stock_date,
              AssignedPerson: item.shift_incharge, 
              Decription: item.remarks

            };
          })
        );
        setisLoading(false);
        setisLoader(true);
      })
      .catch(function (error) {
        console.log(error);
      });

  }
  return (
    <>
      <div
        className={` container-fluid right_col  page-title-bar ${showNavMenu === false ? "right_col-margin-remove" : ""
          }   `}
      >
        <CustomInnerHeader
          moduleName="Job Stock Issue Report"
          isShowSelector={true}
        />
      </div>
      <div
        className={`right_col  h-10 heightFixForFAult  ${showNavMenu === false ? "right_col-margin-remove" : " "
          } `}
        role="main"
      >
        <div className="x_panel  ">
          <div className="x_content">
            <span className="section ">
              <div className="row   pt-3">
                <div className="col-md-3">
                  <i className="fa fa-filter "></i>&nbsp;Report Filter
                </div>
                <div className="col-md-9 text-right "></div>
              </div>
            </span>
            <div className="row mx-4  ">
              <div className="field form-group col-md-12 col-sm-12   ">
                <button
                  className="btn bg-customBlue text-light mt-2"
                  type="submit"
                >
                  + Stock Issue
                </button>
              </div>
            </div>
            <div className="row  mx-3">
              <div className="field item form-group col-md-12 col-sm-12">
                <div className="col-md-2">
                  <div className="row ">
                    <div className="col-md-12">
                      <label className="col-form-label">
                        From Date <span className="required">*</span>
                      </label>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-12">
                      <input
                        className="form-control"
                        type="date"
                        value={dateFrom}
                        styles={customStyles}
                        onChange={(e) => {
                          setdateFrom(e.target.value);
                        }}
                      />

                      {validationState === false && dateFrom === "" && (
                        <span className="text-danger">First Select this </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="row ">
                    <div className="col-md-12">
                      <label className="col-form-label">
                        Date To : <span className="required">*</span>
                      </label>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-12">
                      <input
                        className="form-control"
                        type="date"
                        value={dateto}
                        styles={customStyles}
                        onChange={(e) => {
                          setdateTo(e.target.value);
                        }}
                      />

                      {validationState === false && dateto === "" && (
                        <span className="text-danger">First Select this </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="row ">
                    <div className="col-md-12"></div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-md-12">
                      <button
                        className="btn bg-customBlue text-light mt-2"
                        type="submit"
                        onClick={() => {
                          fetchData()

                        }}
                      >
                        Run Report
                        {!isLoader && (
                          <i class="fa fa-circle-o-notch fa-spin mx-1"></i>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            {!isLoading && (
              <>
                <span className="section mb-0 pb-1 mt-4 ">
                  <div className="row">
                    <div className="col-5 ">
                      <i className="fa fa-list mx-1 mt-2"></i>&nbsp;Report Data
                    </div>
                    <div className="col-7 text-right px-0 ">
                      <div className="col-md-5"> </div>
                      <div className="col-md-4  text-left "> </div>
                      <div className="col-md-3 pr-4">
                        <ul className="mr-3 nav navbar-right panel_toolbox d-flex justify-content-end">
                          <div className="form-group col-4">
                            <ReactToPrint
                              trigger={() =>
                                <button className="btn btn-sm bg-customBlue text-light borderRadiusRound">
                                  <i className="fa fa-print"></i>
                                </button>}
                              content={() => componentRef.current}
                              documentTitle='new docs'
                            />
                          </div>


                          <div className="form-group col-4">
                            <CSVLink {...csvReport}>
                              <button className="btn btn-sm bg-customBlue text-light borderRadiusRound">
                                <i
                                  className="fa fa-file-excel-o"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            </CSVLink>
                          </div>
                        </ul>
                      </div>
                    </div>
                  </div>
                </span>
                <div id="report" className="x_content mt-3 " ref={componentRef}>
                  <div className="displayPropertyForPrint">
                    <h2 className="text-dark text-center font-weight-bold  ">
                      job Wise Stock Issue Report
                    </h2>
                    <div className="row pb-2">
                      <div className="col-md-6 col-6 text-dark ">
                        {" "}
                        Date From :{" "}
                        <strong className="text-dark  font-weight-bold ">
                          {" "}
                          {dateFrom}
                        </strong>{" "}
                      </div>
                      <div className="col-md-6 col-6 text-dark text-right">
                        {" "}
                        Date To :{" "}
                        <strong className="text-dark  font-weight-bold ">
                          {" "}
                          {dateto}
                        </strong>{" "}
                      </div>
                    </div>
                  </div>
                  <div className="container-fluid">
                    <div
                      className=" row   reportTableHead bottom-border-1   "
                      style={{ fontSize: 11 }}
                    >
                      <div className="col-md-1 col-1  p-1 right-border-1 my-1">
                        SR.
                      </div>

                      <div className="col-md-2 col-2 text-center p-1  right-border-1 my-1   ">
                        PRODUCT NAME
                      </div>
                      <div className="col-md-2 col-2 text-center p-1  right-border-1 my-1   ">
                        PRODUCT CODE
                      </div>
                      <div className="col-md-1 col-1 text-center p-1 right-border-1 my-1   ">
                        JOB NO
                      </div>
                      <div className="col-md-2 col-2 text-center p-1 right-border-1 my-1   ">
                        STOCK ISSUE DATE
                      </div>
                      <div className="col-md-2 col-2 text-center p-1 right-border-1 my-1   ">
                        ASSIGNED PERSON
                      </div>

                      <div className="col-md-2 col-2 text-center p-1  right-border-1 my-1   ">
                        DESCRIPTION
                      </div>

                      
                    </div>

                    {AvailableReport.length === 0 ? (
                      <div
                        className="row   reportTableBody bottom-border-2"
                        style={{ fontSize: 11 }}
                      >
                        <div className=" col-md-12   col-12   px-0 right-border-1 h-100 text-center font-size-12 right-border-2 py-1 h-100 left-border-2 d-flex justify-content-center align-items-center">
                          No Data Available
                        </div>
                      </div>
                    ) : (
                      <>
                        {AvailableReport.map((data,i)=>(<div
                          className=" row   reportTableBody bottom-border-2  "
                          style={{ fontSize: 11 }}
                        >
                          <div className="col-md-1 col-1  p-1 right-border-2 left-border-2 ">
                            {i+1}
                          </div>

                          <div className="col-md-2 col-2 text-center p-1  right-border-2    ">
                           {data.product_name}
                          </div>
                          <div className="col-md-2 col-2 text-center p-1  right-border-2    ">
                           {data.product_code}
                          </div>
                          <div className="col-md-1 col-1 text-center p-1 right-border-2    ">
                            {data.job_number}
                          </div>
                          <div className="col-md-2 col-2 text-center p-1 right-border-2   ">
                            {data.issued_stock_date}
                          </div>
                          <div className="col-md-2 col-2 text-center p-1 right-border-2    ">
                           {data.shift_incharge}
                          </div>

                          <div className="col-md-2 col-2 text-center p-1  right-border-2   ">
                            {data.remarks}
                          </div>

                         
                        </div>))}
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
            {/* ---------- */}
          </div>
        </div>
      </div>
    </>
  );
};

export default JobWiseStockIssueReport;
