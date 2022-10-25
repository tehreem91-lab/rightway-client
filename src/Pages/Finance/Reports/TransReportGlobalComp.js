import React, { useEffect, useState, useRef} from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import ReactToPrint from "react-to-print";
import TransReportGlobalCompReciept from "./TransReportGlobalCompReciept";
import { customStyles } from "../../../Components/reactCustomSelectStyle";
import axios from "axios";
import { endPoint } from "../../../config/Config.js";
import { preventLowerDate } from "../../../config/preventMinus.js";
import CustomInnerHeader from "../../../Components/CustomInnerHeader";
import { CSVLink } from "react-csv";
import Pdf from "react-to-pdf";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
const TransReportGlobalComp = ({ account_type, page_name }) => {
  const componentRef = useRef();

 
  const showNavMenu = useSelector((state) => state.NavState);
  var day = new Date().toLocaleDateString(undefined, { day: "2-digit" });
  var month = new Date().toLocaleDateString(undefined, { month: "2-digit" });
  var year = new Date().toLocaleDateString(undefined, { year: "numeric" });
  const dateToday = `${year}-${month}-${day}`;
  const [dateFrom, setdateFrom] = useState(dateToday);
  const [dateTo, setdateTo] = useState(dateToday);
  const [isLoading, setIsLoading] = useState(true);
  const [LadgerData, setLadgerData] = useState({});
  const [LadgerDataCSV, setLadgerDataCSV] = useState([{}]);
  const [accountOptions, setaccountOptions] = useState([]);
  const [accountValue, setAccountValue] = useState("");
  const [validationState, setValidationState] = useState(true);
  const[isUpload,setIsUpload] = useState(false)
  const [fromDate, setfromDate] = useState("");
  const [toDate, settoDate] = useState("");
  const ref1 = React.createRef();
 
const [isLoader, setisLoader] = useState(true);



  const fetchLadger = () => {
    if (dateFrom === "" || dateTo === "") {
      setValidationState(false);
    } else {
      setisLoader(false)
      var config = {
        method: "get",
        url: `${endPoint}api/TransactionReport/GetReport?dateFrom=${dateFrom}T00:00:00&dateTo=${dateTo}T00:00:00`,
        headers: {
          Authorization: `bearer ${
            JSON.parse(localStorage.getItem("access_token")).access_token
          }`,
        },
      };

      axios(config)
        .then(function (response) {
          if (response.status === 200) {
            setisLoader(true)
            setLadgerData(response.data);
            let core_data = response.data.map((item) => {
              return {
                voucher_date: item.voucher_date,
                voucher_inv: item.voucher_inv,
                account_name: item.account_name,
                account_code: item.account_code,
                description: item.description,
                debit: Number(item.debit),
                credit: Number(item.credit),
              };
            });
            setLadgerDataCSV([
              ...core_data,
              {
                voucher_date: "",
                voucher_inv: "",
                account_name: "",
                account_code: "",
                description: "Total",
                debit: response.data
                  .map((e) => e.debit)
                  .reduce((a, b) => a + b, 0),
                credit: response.data
                  .map((e) => e.credit)
                  .reduce((a, b) => a + b, 0),
              },
            ]);
           
            setIsLoading(false);
            
          }
        })
        .catch(function (error) {
          console.log(error);
          setIsLoading(true);
      
          setLadgerData({});
          setLadgerDataCSV([]);
        });
    }
  };

  ////////////////////////////For Downloading CSV Files////////////////////////////
  //   const data = LadgerDataCSV.map((item) => {
  //     return {
  //       voucher_date: item.voucher_date,
  //       voucher_inv: item.voucher_inv,
  //       description: item.description,
  //       debit: Number(item.debit),
  //       credit: Number(item.credit),
  //     };
  //   });

  const headers = [
    { label: "Date", key: "voucher_date" },
    { label: "Voucher Inv", key: "voucher_inv" },
    { label: "Account Name", key: "account_name" },
    { label: "Account Code", key: "account_code" },
    { label: "Description", key: "description" },
    { label: "Debit", key: "debit" },
    { label: "Credit", key: "credit" },
  ];

  const csvReport = {
    filename: "TransactionReport.csv",
    headers: headers,
    data: LadgerDataCSV,
  };

  ////////////////////////////For Downloading PDF Files////////////////////////////
 

  useEffect(() => {
    //fetch_selelctor_options();
    //fetchLadger();
  }, []);

  return (
    <>
      <div
        className={`container-fluid right_col page-title-bar ${
          showNavMenu == false ? "right_col-margin-remove" : ""
        }   `}
      >
        <CustomInnerHeader moduleName={page_name} isShowSelector={true} />
      </div>
      <div
        className={`right_col  h-10 heightFixForFAult  ${
          showNavMenu == false ? "right_col-margin-remove" : " "
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
                    <label className="col-form-label col-md-3 col-sm-36 label-align">
                      {" "}
                      From Date <span className="required">*</span>
                    </label>
                    <div className="col-md-8 col-sm-8">
                      <input
                        className="form-control"
                        type="date"
                        value={dateFrom}
                        min="2022-09-09"
                        onKeyPress={async (e) => await preventLowerDate(e)} //not working yet
                        onChange={(e) => {
                          setdateFrom(e.target.value);
                        }}
                      />

                      {validationState === false && dateFrom === "" && (
                        <span className="text-danger">First Select this </span>
                      )}

                      {/* // it shows fiscal year's initial value */}
                    </div>
                  </div>
                  <div className="field item form-group col-md-6 col-sm-6">
                    <label className="col-form-label col-md-3 col-sm-3 label-align">
                      {" "}
                      To Date <span className="required">*</span>
                    </label>
                    <div className="col-md-8 col-sm-8">
                      <input
                        className="form-control w-100"
                        type="date"
                        value={dateTo}
                        onChange={(e) => {
                          setdateTo(e.target.value);
                        }}
                      />
                      {validationState === false && dateTo === "" && (
                        <span className="text-danger">First Select this </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12 text-right x_footer">
                <button
                className="btn btn-primary"
                type="submit"
                onClick={() => {
                  setfromDate(dateFrom);
                  settoDate(dateTo);
                  fetchLadger();
                  console.log({ LadgerData });
                }}
              >
                Show Report
                {!isLoader && 
                  (
                   <i class="fa fa-circle-o-notch fa-spin mx-1"></i>
                  )
               }
             
              </button>
             
           
                
                
           
                 
                 
                
              
             
               
                
               
              </div>
            </div>

            {!isLoading && (
              <>
                <div className="x_panel px-0">
                  <div className="x_content ">
                    <span className="section mb-0 pb-1">
                      <div className="row pl-2 ">
                        <div className="col-5 ">
                          <i className="fa fa-list"></i>&nbsp;Report Data
                        </div>
                        <div className="col-7 text-right px-0 ">
                          <div className="col-md-5"> </div>
                          <div className="col-md-4  text-left "> </div>
                          <div className="col-md-3 pr-4">
                            <ul className="mr-3 nav navbar-right panel_toolbox d-flex justify-content-end">
                              <div className="form-group col-4">
                              <ReactToPrint
                              trigger={() =>  
                              <button className="btn btn-sm btn-primary borderRadiusRound">
                              <i className="fa fa-print"></i>
                              </button>}
                              content={() => componentRef.current}
                              documentTitle='new docs'
                            />
                              </div>

                            
                              <div className="form-group col-4">
                                <CSVLink {...csvReport}>
                                  <button className="btn btn-sm btn-success borderRadiusRound">
                                    <i
                                      className="fa fa-file-pdf-o"
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
                  </div>

                  <div className="clearfix" />
                  <TransReportGlobalCompReciept
                    ref={componentRef}
                    LadgerData={LadgerData}
                    grandTotal={234}
                    dateFrom={fromDate}
                    dateTo={toDate}
                  />
                </div>{" "}
              </>
           
            )
          }
          </div>
          <div className="col-md-8 px-0"></div>
        </div>
      </div>
    </>
  );
};

export default TransReportGlobalComp;
