import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../../Layout/Loader/Loader.js";
import { endPoint } from "../../config/Config.js";
import { toast } from "react-toastify";
import axios from "axios";
import Select from "react-select";
import { preventMinus } from "../../config/preventMinus";
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
  const [reRender, setreRender] = useState(false);

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
  };

  const fetchData = async () => {
    var config = {
      method: "get",
      url: `${endPoint}api/ChartOfAccounts/GetCategoriesByLevel?level=4`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("access_token")).access_token
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
    var config = {
      method: "get",
      url: `${endPoint}api/OpeningBalane/GetData?fiscal_year_id=1&account=${e.category_id}`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("access_token")).access_token
        }`,
      },
    };

    await axios(config)
      .then(function (response) {
        setAccountList(response.data);
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
      .then(function (response) {
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchAllData({ category_id: -1 });
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <div
            className={`container-fluid page-title-bar ${
              showNavMenu == false ? "right_col-margin-remove" : ""
            }   `}
          >
            <span>&nbsp;Manage Opening Balances</span>
          </div>
          <div
            role="main"
            className={`right_col  h-100  ${
              showNavMenu === false ? "right_col-margin-remove" : " "
            } `}
          >
            <div className="x_panel  ">
              <div className="x_content">
                <span className="section pl-3">
                  <div className="row   pt-3">
                    <div className="col-3">
                      <i className="fa fa-list"></i>&nbsp;Listing
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
                          className="btn btn-dark fa fa-edit pl-3"
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
                          Save
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="table-responsive px-3 pb-2">
                  <table className="table table-striped jambo_table bulk_action">
                    <thead>
                      <tr className="headings">
                        <th
                          className="column-title  right-border-1 text-center"
                          width="10%"
                        >
                          {" "}
                          Code{" "}
                        </th>
                        <th className="column-title  right-border-1 text-center">
                          Account Name
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
                    </tbody>
                    <tfoot>
                      <tr>
                        <td>Total</td>
                        <td></td>
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
                    </tfoot>
                  </table>
                </div>
              </div>

              <div className="col-md-12 col-sm-12" align="right">
                {visableDiv === "true" && (
                  <button
                    className="btn btn-dark fa fa-edit pl-3"
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
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OpeningBalances;
