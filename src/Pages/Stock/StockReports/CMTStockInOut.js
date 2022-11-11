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

const CMTStockInOut = () => {
  let componentRef = useRef();

  var day = new Date().toLocaleDateString(undefined, { day: "2-digit" });
  var month = new Date().toLocaleDateString(undefined, { month: "2-digit" });
  var year = new Date().toLocaleDateString(undefined, { year: "numeric" });
 
  const showNavMenu = useSelector((state) => state.NavState);
  //  const  time = today.getHours() + ':' + today.getMinutes() ;
  const dateToday = `${year}-${month}-${day}`;

  const [validationState, setValidationState] = useState(true);
  const [dateFrom, setdateFrom] = useState(dateToday);
  const [dateto, setdateTo] = useState(dateToday);
  const [AvailableReport, setAvailableReport] = useState([1]);
  const [isLoading, setisLoading] = useState(true);
  const [isLoader, setisLoader] = useState(true);

  const [Exceldata, setExceldata] = useState([]);
  const headers = [
    { label: "Date", key: "voucher_date" },
    { label: "Invoice", key: "voucher_inv" },
  
    { label: "Stock In", key: "stock_in" },
    { label: "Stock Out", key: "stock_out" },
    { label: "Description", key: "amount" },
    { label: "Action", key: "amount" },
   
  ];
  
  const csvReport = {
    filename: "CMTStockReport.csv",
    headers: headers,
    data: Exceldata
  };
  return (
    <>
      <div
        className={` container-fluid right_col  page-title-bar ${
          showNavMenu === false ? "right_col-margin-remove" : ""
        }   `}
      >
        <CustomInnerHeader
          moduleName="CMT Stock In/Out"
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
            <div className="row mx-4  ">
            <div className="field form-group col-md-12 col-sm-12   ">
             
                    <button
                      className="btn bg-customBlue text-light mt-2"
                      type="submit"
                    >
                    + Add CMT stock in/out
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
                          setisLoading(false);
                          setisLoader(false);
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
                          <div className="form-group col-4" >
                          <ReactToPrint
                          trigger={() =>  
                          <button className="btn btn-sm  borderRadiusRound text-white" style={{ backgroundColor: "#003A4D" }}>
                          <i className="fa fa-print"></i>
                          </button>}
                          content={() => componentRef.current}
                          documentTitle='new docs'
                        />
                          </div>

                          <div className="form-group col-4">
                                <button className="btn btn-sm  borderRadiusRound text-white" 
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
                                <button className="btn btn-sm  borderRadiusRound text-white" style={{ backgroundColor: "#003A4D" }}>
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
                      CMT Stock In/Out
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
                    <div className="col-md-1 col-1   text-center  p-1 right-border-1 my-1   ">
                      DATE
                    </div>
                    <div className="col-md-2 col-2  text-center p-1  right-border-1 my-1 ">
                      INVOICE NO
                    </div>

                    <div className="col-md-2 col-2 text-center p-1  right-border-1 my-1   ">
                      STOCK IN
                    </div>
                    <div className="col-md-2 col-2 text-center p-1 right-border-1 my-1   ">
                      STOCK OUT
                    </div>

                    <div className="col-md-2 col-2 text-center p-1  right-border-1 my-1   ">
                      DESCRIPTION
                    </div>

                    <div className="col-md-2 col-2 text-center p-1    my-1 ">
                      ACTION
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
                      <div
                        className=" row   reportTableBody bottom-border-2  "
                        style={{ fontSize: 11 }}
                      >
                        <div className="col-md-1 col-1  p-2 left-border-2  ">
                          SR.
                        </div>
                        <div className="col-md-1 col-1  text-center py-1 px-1 left-border-2  right-border-2  ">
                          DATE
                        </div>
                        <div className="col-md-2 col-2 text-center py-1 px-1  right-border-2  ">
                          INVOICE #
                        </div>

                        <div className="col-md-2 col-2 text-center py-1 px-1  right-border-2    ">
                          STOCK IN
                        </div>
                        <div className="col-md-2 col-2 text-center py-1 px-1  right-border-2    ">
                          STOCK OUT
                        </div>

                        <div className="col-md-2 col-2 text-center py-1 px-1  right-border-2    ">
                          DESCRIPTION
                        </div>

                        <div className="col-md-2 col-2 text-center py-1 px-1  right-border-2   ">
                          ACTION
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

export default CMTStockInOut;
