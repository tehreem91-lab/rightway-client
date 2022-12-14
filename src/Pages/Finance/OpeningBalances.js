import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../../Layout/Loader/Loader.js";
import { endPoint } from "../../config/Config.js";
import axios from "axios";
import Select from "react-select";
import { preventMinus } from "../../config/preventMinus";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import ReactToPrint from "react-to-print";
import { useRef } from "react";

import CustomInnerHeader from "../../Components/CustomInnerHeader.jsx";
const customStyles = {
  control: (provided, state, base) => ({
    ...provided,
    border: "1px solid #c2cad8",
    borderRadius: "5px",
    minHeight: "30px",
    height: "30px",
    color: "#555",
    ...base,
    boxShadow: "none",
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "#f79c74" : "#555",
    background: "#fff",
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    height: "30px",
    padding: "0 6px",
  }),

  input: (provided, state) => ({
    ...provided,
    margin: "0px",
    color: "#555",
  }),
  indicatorSeparator: (state) => ({
    display: "none",
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: "30px",
  }),
};

const OpeningBalances = () => {
  const showNavMenu = useSelector((state) => state.NavState);
  const [isLoading, setisLoading] = useState(false);
  const [accountList, setAccountList] = useState([{}]);
  const [accountListCSV, setAccountListCSV] = useState([{}]);
  const [reRender, setreRender] = useState(false);
  const componentRef = useRef();


  const [visableDiv, setVisableDiv] = useState("true");
  const setDivToVisable = (displayDiv) => {
    setVisableDiv(displayDiv);
  };

  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [inputOptions, setInputOptions] = useState("");
  // handle input change event
  const handleInputChange = (value) => {
    setInputValue(value);
  };
  // handle selection
  const handleChange = (value) => {
    setSelectedValue(value);
    fetchAllData(value);
    console.log(value);
  };

  const fetchData = async () => {

    var config = {
      method: "get",
      url: `${endPoint}api/ChartOfAccounts/GetCategoriesByLevel?level=4`,
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token
          }`,
      },
    };
    await axios(config)
      .then(function (response) {
        setInputOptions([
          { category_name: "All", category_id: -1 },
          ...response.data,
        ]);
        setisLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const fetchAllData = async (e) => {
    setisLoading(true);
    var config = {
      method: "get",
      url: `${endPoint}api/OpeningBalane/GetData?fiscal_year_id=1&account=${e.category_id}`,
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token
          }`,
      },
    };

    await axios(config)
      .then(function (response) {
        setAccountList(response.data);
        let core_data = response.data.map((item) => {
          return {
            account_code: item.account_code,
            account_name: item.account_name,
            debit: Number(item.debit),
            credit: Number(item.credit),
          };
        });
        setAccountListCSV([
          ...core_data,
          {
            account_code: "",
            account_name: "Total",
            debit: response.data.map((e) => e.debit).reduce((a, b) => a + b, 0),
            credit: response.data
              .map((e) => e.credit)
              .reduce((a, b) => a + b, 0),
          },
        ]);
        setisLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const editBalance = () => {
    const updatedCode = accountList.map((item) => {
      return {
        finance_entries_id: item.finance_entries_id,
        debit: Number(item.debit),
        credit: Number(item.credit),
      };
    });

    var data = {
      account_entries: updatedCode,
    };

    var config = {
      method: "put",
      url: "http://rightway-api.genial365.com/api/OpeningBalane/UpdateData",
      headers: {
        Authorization:
          "Bearer u_SPDanITkUdlIjRow9o8JWdLZwSxXJL3tN4L3_18LtMBqj-U-y6PQjyz_6G2pMHIgtRVCDFUEH3CFq-FSH6yn33RP-k9CTo4LFI4ApeTLkUtIqU-GI2jeR3pLF5kPIKeTy8hzwMk37RUIjxfHl4lnzWBiWnhc4vDLpOUB5-deQn4IS58IvrMMLB7WIEbe8cmaIU0RhGBQDk8wsYygIhh4Jye71k6KJrkbGZcht1ERZZW2v8rw5Spm69bfIJXKqjg-y79xiycfFbSWs98x7DhOBE_AB7BtAMeSoKBHyuVcolN-BlXxkY98xYMmJqNOLQ49RvOqkdYeDfXb_7JCsmThx2qU0nw8cSB0ztJ2DeU94OS2YDwuEqlTWKk5fwfDSkpFtLriF9bI6KrUDBByFP22swtkERZGuW1BAIqTkqXimIa1F_KNKYnCUr1ArJC4Gzm8V2nmHTlps7IVEQoqc_h0K2bWQaARdrs7DDDbavdlU6lgwUoWaCC2j0f0CDECtAoX8QnpqizUcDh66u5-34Mg",
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) { })
      .catch(function (error) {
        console.log(error);
      });
  };
  ////////////////////////////For Downloading CSV Files////////////////////////////

  const headers = [
    { label: "Code", key: "account_code" },
    { label: "Account Name", key: "account_name" },
    { label: "Debit", key: "debit" },
    { label: "Credit", key: "credit" },
  ];

  const csvReport = {
    filename: "OpeningBalance.csv",
    headers: headers,
    data: accountListCSV,
  };

  ////////////////////////////For Downloading PDF Files////////////////////////////
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

  useEffect(() => {
    fetchAllData({ category_id: -1 });
    fetchData();
  }, []);

  return (
    <>

      <div className={`container-fluid page-title-bar ${showNavMenu == false ? "right_col-margin-remove" : ""}`}>
        <CustomInnerHeader moduleName="Manage Opening Balance" isShowSelector={true} />
      </div>

      <div role="main" className={`right_col  h-100  ${showNavMenu === false ? "right_col-margin-remove" : " "} `} >
        <div className="x_panel  ">
          <div className="x_content">
            <span className="section pl-3">
              <div className="row   pt-3">
                <div className="col-3">
                  <i className="fa fa-filter"></i>&nbsp;Select Account
                </div>
                <div className="col-9 text-right "></div>
              </div>
            </span>
            <div className="row">
              <div className="field item form-group col-md-12 col-sm-12">
                <label className="col-form-label col-md-2 col-sm-2 label-align">
                  Account Category <span className="required">*</span>
                </label>
                <div className="col-md-3 col-sm-3">
                  <div>
                    <Select
                      getOptionLabel={(e) => e.category_name}
                      getOptionValue={(e) => e.category_id}
                      value={selectedValue}
                      options={inputOptions}
                      onChange={handleChange}
                      styles={customStyles}
                    />
                  </div>
                </div>
                <div className="col-md-7 col-sm-7" align="right">
                  {visableDiv === "true" && (
                    <button
                      className="btn  btn-primary  pl-3"
                      type="button"
                      onClick={(e) => {
                        setDivToVisable("false");
                        <input disabled="false" />;
                      }}
                    >
                      Edit
                    </button>
                  )}

                  {visableDiv === "false" && (
                    <button
                      className="btn btn-primary fa fa-save pl-3"
                      type="submit"
                      onClick={() => {
                        editBalance();
                        setDivToVisable("true");
                      }}
                    >
                      Update
                    </button>
                  )}
                </div>
              </div>
            </div></div>
        </div>


        {isLoading ? (
          <> <Loader /> </>
        ) : (
          <>
            <div className="x_panel  ">
              <div className="x_content">
                <span className="section pl-3">
                  <div className="row   pt-3">
                    <div className="col-3 mt-4">
                      <i className="fa fa-list "></i>&nbsp;Listing
                    </div>
                {/* ///////////////////////For Downloadling Data/////////////////////////// */}

                    <div className="col-9 mt-3 ">
                    <ul className="mr-3 nav navbar-right panel_toolbox d-flex justify-content-end">
                    <div className="form-group col-md-3">

                      <ReactToPrint className="form-group col-md-3"
                        trigger={() => {
                          return (
                            <button className="btn btn-sm  borderRadiusRound" title="Print" style={{ backgroundColor: "#003A4D", color: "white" }}>
                              <i className="fa fa-print"></i>
                            </button>
                          );
                        }}
                        content={() => componentRef.current}
                        documentTitle='new docs'
                      />
                    </div>

                    <div className="form-group col-md-3">
                      <button
                        className="btn btn-sm  borderRadiusRound" title="Download as PDF" style={{ backgroundColor: "#003A4D", color: "white" }}
                        onClick={downloadPdf}
                        type="button"
                      >
                        <i className="fa fa-file-pdf-o" aria-hidden="true"></i>
                      </button>
                    </div>
                    <div className="form-group col-md-3">
                      <CSVLink {...csvReport}>
                        <button className="btn btn-sm  borderRadiusRound" title="Download as CSV" style={{ backgroundColor: "#003A4D", color: "white" }}>
                          <i
                            className="fa fa-table"
                            aria-hidden="true"
                          ></i>
                        </button>
                      </CSVLink>
                    </div>
                  </ul>
                    </div>
                  </div>
                </span>



               

                {/* //////////////////////////Form Structure///////////////////////////////// */}
                <div id="report">
                  <div className="table-responsive px-3 pb-2 " ref={componentRef}>
                    <div className="displayPropertyForPrint">
                      <h2 className="text-dark text-center font-weight-bold  ">
                        Opening Balances
                      </h2>
                      <div className="row pb-2">
                      <div className="col-md-6 col-6 text-dark text-center ">
                        {" "}
                        <strong className="text-dark  font-weight-bold ">
                          {selectedValue}
                        </strong>{" "}
                      </div>
                    
                    </div>
                    </div>


                    <div className="table table-striped jambo_table bulk_action " >
                      <div>
                        <div className=" row headings reportTableHead bottom-border-1 ">
                          <div className="col-md-2 col-2 p-1 right-border-1 text-center" width="10%">
                            Code
                          </div>
                          <div className="col-md-4 col-4 p-1  right-border-1 text-center">
                            Account Name
                          </div>
                          <div
                            className=" col-md-3 col-3 p-1 right-border-1 text-center"
                            width="10%"
                          >
                            Debit
                          </div>
                          <div className="col-md-3 col-3 p-1 text-center" width="10%">
                            Credit
                          </div>
                        </div>
                      </div>

                      {/* //////////////////////////Form Entries///////////////////////////////// */}
                      <div>
                        {accountList.map((item, index) => {
                          return (
                            <div className="row even pointer reportTableBody" key={index}>
                              <div className="col-md-2 col-2 p-1 "> {item.account_code}</div>
                              <div className="col-md-4 col-4  p-1"> {item.account_name} </div>
                              <div className="col-md-3 col-3 p-1 ">
                                {" "}
                                <input
                                  type="number"
                                  value={item?.debit}
                                  className="form-control border-none"
                                  disabled={visableDiv == "true" ? true : false}
                                  min="0"
                                  onKeyPress={(e) => preventMinus(e)}
                                  onChange={(e) => {
                                    let arr = accountList;
                                    let selected_index = arr.findIndex(
                                      (obj) =>
                                        obj.finance_entries_id ==
                                        item.finance_entries_id
                                    ); //it tells us about index of selected account in array of accountList

                                    arr[selected_index] = {
                                      ...arr[selected_index],
                                      debit: e.target.value,
                                      credit: "0",
                                    };

                                    setAccountList(arr);
                                    setreRender(!reRender);
                                  }}
                                />
                              </div>

                              <div className="col-md-3 col-3 p-1 ">
                                {" "}
                                <input
                                  type="number"
                                  value={item?.credit}
                                  className="form-control border-none"
                                  disabled={visableDiv == "true" ? true : false}
                                  min="0"
                                  onKeyPress={(e) => preventMinus(e)}
                                  onChange={(e) => {
                                    let arr = accountList;
                                    let selected_index = arr.findIndex(
                                      (obj) =>
                                        obj.finance_entries_id ==
                                        item.finance_entries_id
                                    );
                                    arr[selected_index] = {
                                      ...arr[selected_index],
                                      debit: "0",
                                      credit: e.target.value,
                                    };

                                    setAccountList(arr);
                                    setreRender(!reRender);
                                  }}
                                />
                              </div>
                            </div>
                          );
                        })}
                        <tr className="font-weight-bold">
                          <div></div>
                          <div className="col-md-12 col-sm-12" align="right">
                            Total:
                          </div>
                          <div>
                            {accountList
                              .map((values) => {
                                return Number(values.debit);
                              })
                              .reduce((a, b) => a + b, 0)}
                          </div>
                          <div>
                            {accountList
                              .map((values) => {
                                return Number(values.credit);
                              })
                              .reduce((a, b) => a + b, 0)}
                          </div>
                        </tr>
                      </div>
                      {/* <tfoot>
                        <tr className="font-weight-bold">
                          <div></div>
                          <div className="col-md-12 col-sm-12" align="right">
                            Total:
                          </div>
                          <div>
                            {accountList
                              .map((values) => {
                                return Number(values.debit);
                              })
                              .reduce((a, b) => a + b, 0)}
                          </div>
                          <div>
                            {accountList
                              .map((values) => {
                                return Number(values.credit);
                              })
                              .reduce((a, b) => a + b, 0)}
                          </div>
                        </tr>
                      </tfoot> */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12 col-sm-12" align="right">
                {visableDiv === "true" && (
                  <button
                    className="btn btn-dark fa fa-edit pl-3"
                    type="button" style={{ backgroundColor: "#003A4D" }}
                    onClick={(e) => {
                      setDivToVisable("false");
                      <input disabled="false" />;
                    }}
                  >
                    Edit
                  </button>
                )}

                {visableDiv === "false" && (
                  <button
                    className="btn btn-primary fa fa-save pl-3"
                    type="submit"
                    onClick={() => {
                      editBalance();
                      setDivToVisable("true");
                    }}
                  >
                    Update
                  </button>
                )}
              </div>
            </div>
          </>
        )}


      </div>

    </>
  );
};

export default OpeningBalances;
