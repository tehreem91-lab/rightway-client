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
import { toast } from "react-toastify";
import { customStyles } from '../../Components/reactCustomSelectStyle';
import CustomInnerHeader from "../../Components/CustomInnerHeader.jsx";



const StoreOpeningBalances = () => {
  const showNavMenu = useSelector((state) => state.NavState);
  const [isLoading, setisLoading] = useState(false);
  const [accountList, setAccountList] = useState([{}]);
  const [accountListCSV, setAccountListCSV] = useState([{}]);
  const [reRender, setreRender] = useState(false);
  const [applyChangesLoader, setApplyChangesLoader] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const componentRef = useRef();


  const [visableDiv, setVisableDiv] = useState("true");
  const setDivToVisable = (displayDiv) => {
    setVisableDiv(displayDiv);
  };

  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState({ stock_label: "All", stock_value: -1 });
  const [inputOptions, setInputOptions] = useState("");
  // handle input change event
  const handleInputChange = (value) => {
    setInputValue(value);
  };
  // handle selection
  const handleChange = (value) => {
    console.log(value);
    setSelectedValue(value);
    // fetchAllData(value);
  };
  // handle get on selection
  const handleGetOnSelection = () => {
    setApplyChangesLoader(true);
    fetchAllData(selectedValue);
  };

  const fetchData = async () => {

    var config = {
      method: "get",
      url: `${endPoint}api/OpeningBalane/GetStoreSelector`,
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token
          }`,
      },
    };
    await axios(config)
      .then(function (response) {
        setInputOptions([
          { stock_label: "All", stock_value: -1 },
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
      url: `${endPoint}api/OpeningBalane/GetStoreData?fiscal_year_id=1&account=${e.stock_value}`,
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
            quantity_debit: Number(item.quantity_debit),
            quantity_credit: Number(item.quantity_credit),    
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
            quantity_debit: response.data.map((e) => e.quantity_debit).reduce((a, b) => a + b, 0),
            quantity_credit: response.data
              .map((e) => e.quantity_credit)
              .reduce((a, b) => a + b, 0),
          },
        ]);
        setisLoading(false);
        setApplyChangesLoader(false);
      })
      .catch(function (error) {
        setApplyChangesLoader(false);
        console.log(error);
      });
  };

  const editBalance = () => {
    setUpdateLoading(true)
    const updatedCode = accountList.map((item) => {
      return {
        finance_entries_id: item.finance_entries_id,
        finance_sub_entries_id: item.finance_sub_entries_id,
        debit: Number(item.debit),
        credit: Number(item.credit),
        quantity_debit: Number(item.quantity_debit),
        quantity_credit: Number(item.quantity_credit),
      };
    });

    var data = {
      account_entries: updatedCode,
    };

    var config = {
      method: "put",
      url: "http://rightway-api.genial365.com/api/OpeningBalane/UpdateStockStoreData",
      headers: {
        Authorization:
          `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        if (response.status === 204 || response.status === 200) {
          setUpdateLoading(false)
          setDivToVisable("true")
          toast.success(
            "Store has been " +
            ("Updated successfully!"),
          );
        } else {
          response.json().then((json) => {
            toast.error(json.Message);
          });
        }
      })
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
    fetchAllData({ stock_value: -1 });
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
                  <i className="fa fa-filter"></i>&nbsp;Select Store
                </div>
                <div className="col-9 text-right "></div>
              </div>
            </span>
            <div className="row">
              <div className="field item form-group col-md-12 col-sm-12">
                <label className="col-form-label col-md-2 col-sm-2 label-align">
                  Store Category <span className="required">*</span>
                </label>
                <div className="col-md-3 col-sm-3">
                  <div>
                    <Select
                      getOptionLabel={(e) => e.stock_label}
                      getOptionValue={(e) => e.stock_value}
                      value={selectedValue}
                      options={inputOptions}
                      onChange={handleChange}
                      styles={customStyles}
                    />
                  </div>
                </div>
                <div className="col-md-7 col-sm-7" align="right">


                  <button
                    className="btn btn-dark fa fa-edit pl-3"
                    type="submit"
                    style={{ backgroundColor: "#003A4D" }}
                    onClick={() => {
                      handleGetOnSelection();
                    }}
                  >
                    Apply Changes
                    {applyChangesLoader &&
                      <i class="fa fa-circle-o-notch fa-spin mx-1"></i>
                    }
                  </button>
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
                    <div className="col-3">
                      <i className="fa fa-list"></i>&nbsp;Listing
                    </div>

                    <div className="col-9 col-md-9 col-sm-9" align="right">
                      {visableDiv === "true" && (
                        <button
                          className="btn btn-dark fa fa-upload pl-3"
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
                          // disabled={updateLoading}
                          onClick={() => {
                            editBalance();
                            // setDivToVisable("true");
                          }}
                        >
                          Update
                          {updateLoading &&
                            <i class="fa fa-circle-o-notch fa-spin mx-1"></i>
                          }
                        </button>
                      )}
                    </div>
                    {/* <div className="col-9 text-right "></div> */}
                  </div>
                </span>



                {/* ///////////////////////For Downloadling Data/////////////////////////// */}
                <div className="col-md-12 col-sm-12 pr-4" align="right">
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
                        documentTitle="new docs"
                        pageStyle="print"
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

                {/* //////////////////////////Form Structure///////////////////////////////// */}
                <div id="report">
                  <div className="table-responsive px-3 pb-2 " ref={componentRef}>
                    <div className="displayPropertyForPrint">
                      <h2 className="text-dark text-center font-weight-bold  ">
                        Opening Balances
                      </h2>
                    </div>

                    <table className="table table-striped jambo_table bulk_action ">
                      <thead>
                        <tr className="headings reportTableHead bottom-border-1 ">
                          <th className="column-title right-border-1 text-center" width="10%">
                            Code
                          </th>
                          <th className="column-title  right-border-1 text-left">
                            Account Name
                          </th>
                          <th
                            className="column-title right-border-1 text-center"
                            width="15%"
                          >
                            Quantity Debit
                          </th>
                          <th
                            className="column-title right-border-1 text-center"
                            width="15%"
                          >
                            Quantity Credit
                          </th>
                          <th
                            className="column-title right-border-1 text-center"
                            width="10%"
                          >
                            Debit
                          </th>
                          <th className="column-title text-center" width="10%">
                            Credit
                          </th>
                        </tr>
                      </thead>

                      {/* //////////////////////////Form Entries///////////////////////////////// */}
                      <tbody>
                        {accountList.map((item, index) => {
                          return (
                            <tr className="even pointer" key={index}>
                              <td className=" "> {item.account_code}</td>
                              <td className=" "> {item.account_name} </td>
                              <td className="">
                                {" "}
                                <input
                                  type="number"
                                  value={item?.quantity_debit}
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
                                      quantity_debit: e.target.value,
                                      quantity_credit: "0",
                                    };

                                    setAccountList(arr);
                                    setreRender(!reRender);
                                  }}
                                />
                              </td>
                              <td className="">
                                {" "}
                                <input
                                  type="number"
                                  value={item?.quantity_credit}
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
                                      quantity_credit: e.target.value,
                                      quantity_debit: "0",
                                    };

                                    setAccountList(arr);
                                    setreRender(!reRender);
                                  }}
                                />
                              </td>
                              <td className="">
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
                              </td>

                              <td className=" ">
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
                              </td>
                            </tr>
                          );
                        })}
                        <tr className="font-weight-bold">
                          <td></td>
                          <td className="col-md-12 col-sm-12" align="right">
                            Total:
                          </td>
                          <td>
                            {accountList
                              .map((values) => {
                                return Number(values.debit);
                              })
                              .reduce((a, b) => a + b, 0)}
                          </td>
                          <td>
                            {accountList
                              .map((values) => {
                                return Number(values.credit);
                              })
                              .reduce((a, b) => a + b, 0)}
                          </td>
                        </tr>
                      </tbody>
                      {/* <tfoot>
                        <tr className="font-weight-bold">
                          <td></td>
                          <td className="col-md-12 col-sm-12" align="right">
                            Total:
                          </td>
                          <td>
                            {accountList
                              .map((values) => {
                                return Number(values.debit);
                              })
                              .reduce((a, b) => a + b, 0)}
                          </td>
                          <td>
                            {accountList
                              .map((values) => {
                                return Number(values.credit);
                              })
                              .reduce((a, b) => a + b, 0)}
                          </td>
                        </tr>
                      </tfoot> */}
                    </table>
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

export default StoreOpeningBalances;
