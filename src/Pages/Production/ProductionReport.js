import React, { useState,useRef,useEffect } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import axios from "axios";
import { endPoint } from "../../config/Config";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import CustomInnerHeader from "../../Components/CustomInnerHeader";
import { customStyles } from "../../Components/reactCustomSelectStyle";
import ReactToPrint from "react-to-print";

const ProductionReport = () => {
  var day = new Date().toLocaleDateString(undefined, { day: "2-digit" });
  var month = new Date().toLocaleDateString(undefined, { month: "2-digit" });
  var year = new Date().toLocaleDateString(undefined, { year: "numeric" });
  let componentRef = useRef();

  //  const  time = today.getHours() + ':' + today.getMinutes() ;
  const dateToday = `${year}-${month}-${day}`;

  const [validationState, setValidationState] = useState(true);
  const [dateFrom, setdateFrom] = useState(dateToday);
  const [AvailableReport, setAvailableReport] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [isLoader, setisLoader] = useState(true);
  const showNavMenu = useSelector((state) => state.NavState);
  return (
    <>
      <div
        className={` container-fluid right_col  page-title-bar ${
          showNavMenu === false ? "right_col-margin-remove" : ""
        }   `}
      >
        <CustomInnerHeader
          moduleName="Production Report"
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

            <div className="row">
              <div className="field item form-group col-md-12 col-sm-12">
                <label className="col-form-label col-md-2 col-sm-2 label-align">
                  {" "}
                  Select Product <span className="required">*</span>
                </label>
                <div className="col-md-3 col-sm-3">
                  <Select
                    isSearchable={true}
                    styles={customStyles}
                    placeholder={"Select Product"}
                  />
                </div>
                <div className="col-md-3 col-sm-3 mt-1">
                  <button
                    className="btn bg-customBlue text-white"
                    type="submit"
                    onClick={() => {
                      setisLoading(false);
                      setisLoader(false)
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

            {!isLoading && (
              <>
              <span className="section mb-0 pb-1 mt-4 "> 
              <div className="row">
              <div className="col-md-3">
              <i className="fa fa-list mx-1"></i>&nbsp;Report Data
              </div>
              <div className="col-md-9"></div>
              </div>
        
               </span>
                <div className="table-responsive mt-2  pb-2" >
                  <table className="table table-striped jambo_table bulk_action">
                    <thead>
                      <tr className="headings bg-customBlue">
                        <th
                          className="column-title  right-border-1 text-center"
                          width="10%"
                        >
                          {" "}
                         shift Incharge
                        </th>
                        <th className="column-title  right-border-1 text-center">
                          Shift No
                        </th>
                        <th className="column-title text-center right-border-1 " >
                          Shift Name
                        </th>
                        <th className="column-title text-center right-border-1 " >
                          Product Name
                        </th>
                        <th className="column-title text-center right-border-1 " width="10%">
                          Total qunatity
                        </th>
                        <th className="column-title text-center right-border-1 " width="10%">
                          A Grade
                        </th>
                        <th className="column-title text-center right-border-1 " width="10%">
                          B Grade
                        </th>
                        <th className="column-title text-center right-border-1 " width="10%">
                          Wasted
                        </th>
                        <th className="column-title text-center right-border-1 " width="10%">
                        Status
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                    {AvailableReport.length === 0 ? (
                        <tr style={{ cursor: "pointer" }}>
                   <td colspan="9" className="text-center"> No data available</td>
                                                </tr> 
              ) : (<>
                
                </>)}
                    </tbody>
                  </table>
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

export default ProductionReport;
