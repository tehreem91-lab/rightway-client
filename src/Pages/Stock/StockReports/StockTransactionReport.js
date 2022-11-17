import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import axios from "axios";
import { endPoint } from "../../../config/Config";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import CustomInnerHeader from "../../../Components/CustomInnerHeader";
import { customStyles } from "../../../Components/reactCustomSelectStyle";
import ReactToPrint from "react-to-print";
import  {CSVLink}  from "react-csv";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const downloadPdf = async () => {
  var data = document.getElementById("report");
  //$("pdfOpenHide").attr("hidden", true);
  // To disable the scroll
  document.getElementById("report").style.overflow = "inherit";
  document.getElementById("report").style.maxHeight = "inherit";

  await html2canvas(data).then((canvas) => {
    const contentDataURL = canvas.toDataURL("image/png", 1.0);
    // enabling the scroll
    //document.getElementById("report").style.overflow = "scroll";
    //document.getElementById("report").style.maxHeight = "150px";

    let pdf = new jsPDF("l", "mm", "a4"); // A4 size page of PDF

    let imgWidth = 300;
    let pageHeight = pdf.internal.pageSize.height;
    let imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    window.open(
      pdf.output("bloburl", { filename: "new-file.pdf" }),
      "_blank"
    );
  });
};

const StockTransactionReport = () => {
  let componentRef = useRef();

  var day = new Date().toLocaleDateString(undefined, { day: "2-digit" });
  var month = new Date().toLocaleDateString(undefined, { month: "2-digit" });
  var year = new Date().toLocaleDateString(undefined, { year: "numeric" });

  //  const  time = today.getHours() + ':' + today.getMinutes() ;
  const dateToday = `${year}-${month}-${day}`;

  const [validationState, setValidationState] = useState(true);
  const [dateFrom, setdateFrom] = useState(dateToday);
  const [dateto, setdateTo] = useState(dateToday);
  const [ReportData, setReportData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [isLoader, setisLoader] = useState(true);
  const [StockAccountOption, setStockAccountOption] = useState([]);
  const [PartyAccountOption, setPartyOption] = useState([]);
  const [StockAccountvalue, setStockAccountvalue] = useState("");
  const [PartAccountvalue, setPartvalue] = useState("");
  const [Stock_typevalue, setStock_typevalue] = useState("")
  const [Exceldata, setExceldata] = useState([])
  const options = [
    { value: 'CMT', label: 'CMT' },
    { value: 'Purchase', label: 'Purchase' },
  ]

  const showNavMenu = useSelector((state) => state.NavState);
// Account selector
  const StockAccount = () => {
    var axios = require("axios");
    var data = "";

    var config = {
      method: "get",
      url: "http://rightway-api.genial365.com/api/Stock/GetStockAccounts",
      headers: {
        Authorization: `bearer ${
          JSON.parse(localStorage.getItem("access_token")).access_token
        }`,
      },
      data: data,
    };

    axios(config).then(function (response) {
  
      //  setStockAccountOption(response.data.unshift()
      
       
      let res=response.data.map((item,i) => {
          return {
          
            value: item.item_id,
            label: item.item_name,
          };
        })
        setStockAccountOption([{
               value:-1,
               label:"All"
           },...res,]
      
      )
      
    });
  };

    // partAccount selector
const PartyAccount = ()=>{
  var axios = require("axios");
    var data = "";

    var config = {
      method: "get",
      url: "http://rightway-api.genial365.com/api/Stock/GetPartyAccounts",
      headers: {
        Authorization: `bearer ${
          JSON.parse(localStorage.getItem("access_token")).access_token
        }`,
      },
      data: data,
    };

    axios(config).then(function (response) {
      setPartyOption(
        response.data.map((item) => {
          return {
            value: item.party_id,
            label: item.party_name,
          };
        })
      );
    });
}

const Get_Transaction_Report =(e)=>{

    var axios = require('axios');
    var data = '';
    if ( StockAccountvalue=== ""|| PartAccountvalue === "" || Stock_typevalue ==="" || dateFrom === "" || dateto === "") {
        setValidationState(false);
    }else{

    setisLoader(false)
    

    var config = {
    method: "get",
    url: `http://rightway-api.genial365.com/api/StockReports?item_id=${StockAccountvalue.value}&party_id=${PartAccountvalue.value}&stock_type=${Stock_typevalue.value}&date_from=${dateFrom}&date_to=${dateto}`,
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem("access_token")).access_token
      }`,
    },
    data: data,
  };
    }
  axios(config)
  .then(function (response) {
   
    setReportData(response.data)
    setisLoader(true)
    setisLoading(false)
    setExceldata(response.data.map((val) =>{
      
      return{
          
        voucher_date : val.voucher_date,
        voucher_inv: val.voucher_inv,
        item_name: val.item_name,
        naration:val.nartion,
        stock_in: val.stock_in,
        stock_out:val.stock_out,
        rate: val.amount,
        amount: val.amount,
  
  
      }
  
    }))
  })
  .catch(function (error) {
    setisLoader(true)
  });
}

const headers = [
  { label: "Date", key: "voucher_date" },
  { label: "Invoice", key: "voucher_inv" },
  { label: "Account Title", key: "item_name" },
  { label: "Naration", key: "designationName" },
  { label: "Stock In", key: "stock_in" },
  { label: "Stock Out", key: "stock_out" },
  { label: "Rate", key: "amount" },
  { label: "Amount", key: "amount" },
 
];

const csvReport = {
  filename: "StockTransactionReport.csv",
  headers: headers,
  data: Exceldata
};

  useEffect(() => {
    StockAccount()
    PartyAccount()
  }, []);




  return (
    <>
      <div
        className={` container-fluid right_col  page-title-bar ${
          showNavMenu === false ? "right_col-margin-remove" : ""
        }   `}
      >
        <CustomInnerHeader
          moduleName="Stock Transaction Report"
          isShowSelector={true}
        />
      </div>
      <div
        className={`right_col  h-10 heightFixForFAult  ${
          showNavMenu === false ? "right_col-margin-remove" : " "
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
            <div className="row  mx-3">
              <div className="field item form-group col-md-12 col-sm-12">
                <div className="col-md-6">
                  
                   
                      <label className=" col-md-3 col-form-label">
                        Accounts <span className="required">*</span>
                      </label>
                       <div className="col-md-8">
                      <Select
                        className=""
                        isSearchable={true}
                        styles={customStyles}
                        placeholder={"Select Accounts"}
                        options={StockAccountOption}
                        value={StockAccountvalue}
                        onChange={(e)=>setStockAccountvalue(e) }
                      />
                      {validationState === false && Number(StockAccountvalue) === 0 && (
                        <span className="text-danger">First Select this </span>
                      )}
                    </div>
                 
                </div>
                <div className="col-md-6">
                  
                      <label className=" col-md-4 col-form-label">
                        Party Accounts <span className="required">*</span>
                      </label>
                    
                  
                  
                    <div className="col-md-8">
                      <Select
                        className=""
                        isSearchable={true}
                        styles={customStyles}
                        placeholder={"---select party name---"}
                        options={PartyAccountOption}
                        value={PartAccountvalue}
                        onChange={(e)=>setPartvalue(e)}
                      />
                      {validationState === false && PartAccountvalue === "" && (
                        <span className="text-danger">First Select this </span>
                      )}
                    </div>
                    </div>
                    </div>
                  
                    <div className="field item form-group col-md-12 col-sm-12">
                <div className="col-md-6">
                  
                   
                      <label className=" col-md-3 col-form-label">
                      Stock Type <span className="required">*</span>
                      </label>
                       <div className="col-md-8">
                       <Select
                        isSearchable={true}
                        styles={customStyles}
                        options={options}
                        value={Stock_typevalue}
                        onChange={(e)=>{
                            setStock_typevalue(e)
                        }}
                      />
                      {validationState === false && Stock_typevalue === "" && (
                        <span className="text-danger">First Select this </span>
                      )}
                    </div>
                 
                </div>
                <div className="col-md-6">
                  
                      <label className=" col-md-4 col-form-label">
                      From Date <span className="required">*</span>
                      </label>
                    
                  
                  
                    <div className="col-md-8">
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
                   
                    <div className="field item form-group col-md-12 col-sm-12">
                <div className="col-md-6">
                  
                   
                      <label className=" col-md-3 col-form-label">
                      Date To : <span className="required">*</span>
                      </label>
                       <div className="col-md-8">
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
                <div className="col-md-6 text-right mr-3">
                  
                <button
                        className="btn bg-customBlue text-light mt-2 "
                        type="submit"
                        onClick={() => {
                          Get_Transaction_Report()
                        }}
                      >
                       Submit
                        {!isLoader && (
                          <i class="fa fa-circle-o-notch fa-spin mx-1"></i>
                        )}
                      </button>
                    
                  
                  
                    
                    </div>
                    </div>
                 
             
                  

                
              
            
            </div>
            ///
           

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
                      <div className="form-group col-4" >
                      <ReactToPrint
                      trigger={() =>  
                      <button className="btn btn-sm  m1-1 borderRadiusRound text-white" style={{ backgroundColor: "#003A4D" }}>
                      <i className="fa fa-print"></i>
                      </button>}
                      content={() => componentRef.current}
                      documentTitle='new docs'
                    />
                      </div>

                      <div className="form-group col-4">
                            <button className="btn btn-sm ml-1  mr-2 borderRadiusRound text-white" 
                            onClick={downloadPdf}
                            type="button"
                            style={{ backgroundColor: "#003A4D" }}>
                              <i
                                className="fa fa-file-pdf-o"
                                aria-hidden="true"
                              ></i>
                            </button>
                      </div>
                      <div className="form-group col-4">
                      <CSVLink {...csvReport}>
                            <button className="btn btn-sm ml-2 borderRadiusRound text-white" style={{ backgroundColor: "#003A4D" }}>
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
                <div id="report" className="x_content mt-3  " ref={componentRef}>
                  <div className="displayPropertyForPrint">
                    <h2 className="text-dark text-center font-weight-bold  ">
                      Stock Transaction Report
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
                 <div className="container p-2">
                  <div
                    className=" row   reportTableHead bottom-border-1   "
                    style={{ fontSize: 11 }}
                  >
                    <div className="col-md-1 col-1  p-1 right-border-1 my-1">
                      DATE
                    </div>
                    <div className="col-md-2 col-2  text-center p-1  right-border-1 my-1 ">
                      INVOICE NO
                    </div>
                    <div className="col-md-3 col-3 text-center p-1  right-border-1 my-1  ">
                      ACCOUNT TITLE
                    </div>
                    <div className="col-md-2 col-2   text-center  p-1 right-border-1 my-1   ">
                      NARRATION
                    </div>
                    <div className="col-md-1 col-1 text-center p-1  right-border-1 my-1   ">
                      STOCK IN
                    </div>
                    <div className="col-md-1 col-1 text-center p-1 right-border-1 my-1   ">
                      STOCK OUT
                    </div>

                    <div className="col-md-1 col-1 text-center p-1  right-border-1 my-1   ">
                      RATE
                    </div>

                    <div className="col-md-1 col-1 text-center p-1    my-1 ">
                      AMOUNT
                    </div>
                  </div>

                  {ReportData.length === 0 ? (
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
                    {ReportData.map((data,i)=>{
                        return(
                          <>
                          <div
                          className=" row   reportTableBody bottom-border-2  "
                          style={{ fontSize: 12 }}
                        >
                          <div className="col-md-1 col-1  p-2 left-border-2 text-left  ">
                            {`${data.voucher_date.slice(
                              8,
                              10
                            )}-${data.voucher_date.slice(
                              5,
                              7
                            )}-${data.voucher_date.slice(0, 4)}`}
                          </div>
                          <div className="col-md-2 col-2   p-1  left-border-2 text-left  right-border-2  ">
                            {data.voucher_inv}
                          </div>
                          <div className="col-md-3 col-3  p-1  right-border-2  ">
                            {data.item_name}
                          </div>
                          <div className="col-md-2 col-2     p-1 text-right  right-border-2    ">
                             Naration
                          </div>
                          <div className="col-md-1 col-1   p-1 text-right  right-border-2    ">
                            {data.stock_in}
                          </div>
                          <div className="col-md-1 col-1    p-1 text-right  right-border-2    ">
                            {data.stock_out}
                          </div>
  
                          <div className="col-md-1 col-1    p-1 text-right   right-border-2    ">
                            Rate
                          </div>
  
                          <div className="col-md-1 col-1  p-1 text-right   right-border-2   ">
                            {data.amount}
                          </div>
                        </div>

                      
                          
                          
                          </>
                        )
                      
                    })}

                    <div
                    className=" row   reportTableBody bottom-border-2  "
                    style={{ fontSize: 12 }}
                  >
                    <div className="col-md-1 col-1  p-2 left-border-2  ">
                  
                    </div>
                    <div className="col-md-2 col-2   p-1 left-border-2  right-border-2  ">
                    </div>
                    <div className="col-md-3 col-3    p-1 right-border-2  ">
                    </div>
                    <div className="col-md-2 col-2    p-1 text-right right-border-2    ">
                      Grand Total:
                    </div>
                    <div className="col-md-1 col-1  p-1 text-right   right-border-2    ">
                      {ReportData.map(data => data.stock_in).reduce((prev, curr) => Number(prev) + Number(curr), 0 ) }
                    </div>
                    <div className="col-md-1 col-1  p-1 text-right  right-border-2    ">
                      {ReportData.map(data => data.stock_out).reduce((prev, curr) => Number(prev) + Number(curr), 0 ) }
                    </div>

                    <div className="col-md-1 col-1 text-right p-1    right-border-2    ">
                      Rate
                    </div>

                    <div className="col-md-1 col-1 text-right p-1  right-border-2   ">
                      {ReportData.map(data => data.amount).reduce((prev, curr) => Number(prev) + Number(curr), 0 ) }
                    </div>
                  </div>
                      

                      
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

export default StockTransactionReport;
