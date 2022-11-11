import React, { useState, useEffect, useRef } from "react";
import CustomInnerHeader from "../../../Components/CustomInnerHeader";
import { useSelector } from "react-redux";
import Select from "react-select";
// import {Form.Check } from "react-bootstrap"
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import axios from "axios";
import { endPoint } from "../../../config/Config";
// import Moment from 'react-moment';
import { customStyles } from "../../../Components/reactCustomSelectStyle";
import { number } from "yup";
import "./ToggleSwitch.css";
import { pureFinalPropsSelectorFactory } from "react-redux/es/connect/selectorFactory";
const StockIssueShiftWise = () => {
  const ref = useRef(null);
  const reset = () => {
    ref.current.value = "";
  };

  const showNavMenu = useSelector((state) => state.NavState);
  var day = new Date().toLocaleDateString(undefined, { day: "2-digit" });
  var month = new Date().toLocaleDateString(undefined, { month: "2-digit" });
  var year = new Date().toLocaleDateString(undefined, { year: "numeric" });
  var hours = new Date().getHours(undefined, { hours: "2-digit" });
  var minuts = new Date().getMinutes(undefined, { minuts: "2-digit" });

  //  const  time = today.getHours() + ':' + today.getMinutes() ;
  const dateToday = `${year}-${month}-${day}`;

  const [date, setDate] = useState(dateToday);

  const [IsValidation, setIsValidation] = useState(true);
  const [selectedshiftIncharge, setselectedshiftIncharge] = useState("");
  const [Item_options, setItem_option] = useState([]);

  const [Hidden, setHidden] = useState(true);
  const [ShiftSelector, setShiftSelector] = useState([]);
  const [shiftvalue, setshiftvalue] = useState("");
  const [isupload, setIsUpload] = useState(false);
  const [isloading, setisloading] = useState(true);
  const [Remarks, setRemarks] = useState("");
  const [Active, setActive] = useState("");
  const [reRenderState, setReRenderState] = useState(false);

  const [stockissuedata, setstockissuedata] = useState([
    {
      shift_pass_no: "",
      shift_inchage_name: "",
      shift_incharge_id: 0,
      is_post: "",
      shift_status: "",
    },
  ]);
  const [selectshift_incharge, setselectshift_incharge] = useState([]);
  const [status, setstatus] = useState("active");
  const [toggle, setToggle] = useState(null);
  const [isDisabled, setisDisabled] = useState(null);
  const [ExtraEntity, setExtraEntity] = useState([]);

  const [Entity, setEntity] = useState([
    {
      job_number: "",
      job_id: 0,
      job_incharge: "",
      product_name: "",
      product_chart_id: 0,
      stock_issue_status: "",

      stock_entries: [
        {
          product_chart_id: 0,
          item_quantity: 0,
          item_name: "",
          item_code: 0,
          item_id: 0,
          stock_unit_name: "",
          remarks: "",
          weight_per_piece: 0,
          total_weight: 0,
        },
      ],
    },
  ]);

  const [stock_entries, setstock_entries] = useState([
    {
      product_chart_id: 0,
      item_quantity: 0,
      item_name: "",
      item_code: 0,
      item_id: 0,
      stock_unit_name: "",
      remarks: "",
      weight_per_piece: 0,
      total_weight: 0,
    },
  ]);

  // const handleClick = (job_id) => {
  //   setstatus("close")
  //   Entity.map((val,ind) => {

  //         (job_id  ===  val?.job_id) && setToggle(1);

  //       setToggle(toggle === 1 ? true : null)

  //   })

  // };

  // const [ExtraEntity ,setExtraEntity] = useState([{

  // }])

  const [fileEntity, setFileEntity] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [isLoader, setisLoader] = useState(true);

  // All selectors

  const Issue_To_Selector = () => {
    var axios = require("axios");
    var config = {
      method: "get",
      url: "http://rightway-api.genial365.com/api/EmployeeDetails/GetActiveEmployee",
      headers: {
        Authorization: `bearer ${
          JSON.parse(localStorage.getItem("access_token")).access_token
        }`,
      },
    };

    axios(config)
      .then(function (response) {
        setselectshift_incharge(
          response.data.map((item) => {
            return {
              value: item.value,
              label: item.label,
            };
          })
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const Get_Shift_Selector = () => {
    var axios = require("axios");
    var config = {
      method: "get",
      url: "http://rightway-api.genial365.com/api/IssueStock/GetShiftSelectorOptions",
      headers: {
        Authorization: `bearer ${
          JSON.parse(localStorage.getItem("access_token")).access_token
        }`,
      },
    };

    axios(config)
      .then(function (response) {
        setShiftSelector(response.data);
        setShiftSelector(
          response.data.map((item) => {
            return {
              value: item.shift_id,
              label: item.shift_name,
            };
          })
        );

        // console.log(ShiftSelector)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const Get_Item_Selector = () => {
    var axios = require("axios");
    var config = {
      method: "get",
      url: "http://rightway-api.genial365.com/api/IssueStock/GetItems",
      headers: {
        Authorization: `bearer ${
          JSON.parse(localStorage.getItem("access_token")).access_token
        }`,
      },
    };

    axios(config)
      .then(function (response) {
        // setItem_option(response.data)

        setItem_option(
          response.data.map((item) => {
            return {
              value: item.stock_account.item_chart_id,
              label: item.stock_account.item_name,
              unit: item.stock_account.stock_unit_name,
            };
          })
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const Get_Stock_Issue = (e) => {
    var axios = require("axios");
    if (shiftvalue === "") {
      setIsValidation(false);
    } else {
      var data = "";
      setisLoader(false);
      var config = {
        method: "get",
        url: `http://rightway-api.genial365.com/api/IssueStock/GetIssueStockRecord?date=${date}&shift_id=${e}
       
       `,
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
        console.log(response.data);
        setisloading(false);
        setstockissuedata([response.data]);
        setEntity(response.data.job);
        console.log([response.data]);
        // setExtraEntity(response.data.entity)
        // console.log(ExtraEntity)
        setisLoader(true);
        setHidden(true);
        setIsValidation(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  let removeAttchments = (i) => {
    let newAttachValues = [...fileEntity];
    // at position i remove 1 element
    newAttachValues.splice(i, 1);
    setFileEntity(newAttachValues);
  };

  const AttachmentFileHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsUpload(false);
  };
  const UploadFile = async (e) => {
    setIsUpload(true);
    const options = {
      onUploadProgerss: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percentage = Math.floor((loaded * 100) / total);
        console.log(`${loaded}bytes of ${total}bytes | ${percentage}%`);
      },
    };
    let data = new FormData();
    data.append("UploadedImage", selectedFile);
    await axios
      .post(
        `${endPoint}/api/FileUpload?file_name=${selectedFile.name}`,
        data,
        options
      )
      .then((res) => {
        setFileEntity([...fileEntity, res.data]);
        if (res.status === 200) {
          setIsUpload(false);
          reset();
        }
      });
  };

  function handleChange(i, id, event) {
    const values = [...Entity];
    values[i].stock_entries[id][event.target.name] = event.target.value;
    setEntity(values);
    console.log(Entity);
  }

  const handleAdd = (i) => {
  
      setEntity((prev) => {
        console.log(prev[i], "check data");
        const updatedSection = {
          ...prev[i],
          stock_entries: [
            ...prev[i].stock_entries,
            {
              product_chart_id: 0,
              item_quantity: 0,
              item_name: "",
              item_code: 0,
              item_id: 0,
              stock_unit_name: "",
              remarks: "",
              weight_per_piece: 0,
              total_weight: 0,
            },
          ],
        };
        return prev.map((section, index) => {
          return index === i ? updatedSection : section;
        });
      });
   
   
  };

  //handle button toggle

  const handleRemove = (i, id) => {
    const values = [...Entity];
    values[i].stock_entries.splice(id, 1);
    setEntity(values);
  };

  const [arrdata, setArrdata] = useState([]);

  const dataInput = () => {
    setArrdata((id) => {
      return [
        {
          type: "number",
          value: "",
        },
      ];
    });
  };

  const Submit_Issue_Stock = (e) => {
    var axios = require("axios");
    if (selectedshiftIncharge === "" || Entity.stock_entries === "") {
      setIsValidation(false);
    } else {
      var data = JSON.stringify({
        shift_incharge_id: Number(selectedshiftIncharge.value),
        remarks: Remarks,
        attachments: fileEntity.join(",").toString(),
        entity: Entity.map((main, i) => {
          return {
            job_id: Number(main.job_id),
            job_stock_status: main.stock_issue_status,
            remarks: Remarks,
            stock_entries: main?.stock_entries?.map((data, id) => {
              return {
                item_id: Number(data.item_id),
                item_quantity_issued: Number(data.item_quantity),
              };
            }),
          };
        }),
      });

      var config = {
        method: "post",
        url: `http://rightway-api.genial365.com/api/IssueStock/PostIssueStockRecord?date=${date}&shift_id=${e}`,
        headers: {
          Authorization:
            "Bearer " +
            JSON.parse(localStorage.getItem("access_token")).access_token,
          "Content-Type": "application/json",
        },
        data: data,
      };
    }
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        console.log(data);
        toast.success("Your Response has been added successfully");
        setselectedshiftIncharge("");
        setstockissuedata([]);
        setEntity([]);
        setFileEntity([]);
        setHidden(false);
        setRemarks("");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const check = () => {
    console.log(selectedshiftIncharge);
  };

  //update stock
  const Update_Issue_Stock = (e) => {
    var axios = require("axios");
    if (
      stockissuedata.shift_incharge_id === "" ||
      Entity.stock_entries === ""
    ) {
      setIsValidation(false);
    } else {
      var data = JSON.stringify({
        shift_incharge_id: Number(selectedshiftIncharge),
        remarks: Remarks,
        attachments: fileEntity.join(",").toString(),
        entity: Entity.map((main, i) => {
          return {
            job_id: Number(main.job_id),
            job_stock_status: main.stock_issue_status,
            remarks: Remarks,
            stock_entries: main?.stock_entries?.map((data, id) => {
              return {
                item_id: Number(data.item_id),
                item_quantity_issued: Number(data.item_quantity),
              };
            }),
          };
        }),
      });

      var config = {
        method: "post",
        url: `http://rightway-api.genial365.com/api/IssueStock/PostIssueStockRecord?date=${date}&shift_id=${e}`,
        headers: {
          Authorization:
            "Bearer " +
            JSON.parse(localStorage.getItem("access_token")).access_token,
          "Content-Type": "application/json",
        },
        data: data,
      };
    }
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        console.log(data);
        toast.success("Your Response has been updated successfully");
        setselectedshiftIncharge("");
        setstockissuedata([]);
        setEntity([]);
        setFileEntity([]);
        setHidden(false);
        setRemarks("");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    Get_Shift_Selector();
    Get_Item_Selector();
    Issue_To_Selector();
  }, []);

  return (
    <>
      <div
        className={`container-fluid right_col page-title-bar ${
          showNavMenu === false ? "right_col-margin-remove" : ""
        }   `}
      >
        <CustomInnerHeader
          moduleName="Stock Issue Shift Wise"
          isShowSelector={true}
        />
      </div>

      <div
        className={`right_col  h-10 heightFixForFAult  ${
          showNavMenu === false ? "right_col-margin-remove" : " "
        } `}
        role="main"
      >
        <div className="row">
          <div className="col-md-12">
            <div className="x_panel  px-0 ">
              <div className="x_content ">
                <span className="section  px-2 ">
                  <i className="fa fa-edit pl-2"></i>&nbsp; Issue Stock
                </span>
                <div className="row">
                  <div className=" col-md-12 col-sm-12">
                    <label className="col-form-label col-md-2 col-sm-2 label-align">
                      {" "}
                      Date <span className="required">*</span>
                    </label>
                    <div className="col-md-3 col-sm-3">
                      <input
                        className="form-control"
                        type="date"
                        value={date}
                        styles={customStyles}
                        onChange={(e) => {
                          setDate(e.target.value);
                        }}
                      />

                      {/* // its show fiscal year initial value */}
                    </div>
                    <label className="col-form-label col-md-2 col-sm-2 label-align ">
                      {" "}
                      Select Shift <span className="required">*</span>
                    </label>
                    <div className="col-md-3 col-sm-3">
                      <Select
                        isSearchable={true}
                        placeholder={"Select Shift"}
                        options={ShiftSelector}
                        styles={customStyles}
                        value={shiftvalue}
                        onChange={(e) => {
                          setshiftvalue(e);
                        }}
                      />
                      {!IsValidation && shiftvalue === "" && (
                        <span className="text-danger">First Select this </span>
                      )}
                    </div>
                    <div className="col-md-2">
                      <button
                        className="btn btn-primary "
                        type="submit"
                        onClick={() => {
                          Get_Stock_Issue(shiftvalue.value);
                        }}
                      >
                        Show Report
                        {!isLoader && (
                          <i class="fa fa-circle-o-notch fa-spin mx-1"></i>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-md-12 text-right x_footer"></div>
                {/*<div className="col-md-12 text-right x_footer">
                               
               
             
              </button>
              </div> */}

                {!isloading && (
                  <>
                    {stockissuedata.map((item, index) => {
                      return (
                        <>
                          <div className="row">
                            <div className="field item form-group col-md-12 col-sm-12">
                              <label className="col-form-label col-md-2 col-sm-2 label-align">
                                {" "}
                                Shift Pass no:
                              </label>
                              <div className="col-md-3 col-sm-3">
                                <input
                                  className="form-control"
                                  value={item.shift_pass_no}
                                  disabled
                                  styles={customStyles}
                                  onChange={(e) => {
                                    const list = [...stockissuedata];
                                    list[index].item.shift_pass_no = e.value;
                                    setstockissuedata(list);
                                  }}
                                />
                              </div>
                              <label className="col-form-label col-md-2 col-sm-2 label-align">
                                {" "}
                                Shift Incharge:
                              </label>
                              <div className="col-md-3 col-sm-3">
                                <Select
                                  options={selectshift_incharge}
                                  value={
                                    selectshift_incharge.find(
                                      (e) => e.value === item.shift_incharge_id
                                    ) || ""
                                  }
                                  styles={customStyles}
                                  onChange={(e) => {
                                    setselectedshiftIncharge(e);
                                    const list = [...stockissuedata];
                                    list[index].shift_incharge_id = e.value;
                                    list[index].shift_inchage_name = e.label;
                                    setstockissuedata(list);
                                  }}
                                />
                                {!IsValidation &&
                                  selectedshiftIncharge === "" && (
                                    <span className="text-danger">
                                      First Select this{" "}
                                    </span>
                                  )}
                              </div>
                            </div>
                          </div>

                          {Entity?.map((item, i) => {
                            return (
                              <>
                                <div key={i}>
                                  <div className="row mt-2">
                                    <div className="field item form-group col-md-12 col-sm-12">
                                      {/*...<label className="col-form-label col-md-2 col-sm-2 label-align">
                        {" "}
                         Job Number: 
                         </label>
                      ...*/}
                                      <div className="col-md-3 col-sm-3 mt-3 ">
                                        <input
                                          className="form-control mt-3"
                                          value={item?.job_number}
                                          disabled
                                          styles={customStyles}
                                          onChange={(e) => {
                                            const list = [...Entity];
                                            list[i].job_number = e.value;
                                            setEntity(list);
                                            console.log(list[i].job_number);
                                          }}
                                        />
                                      </div>

                                      <div className="col-md-3 col-sm-3  text-left mt-3">
                                        <input
                                          className="form-control mt-3"
                                          value={item?.product_name}
                                          styles={customStyles}
                                          disabled
                                          onChange={(e) => {
                                            const list = [...Entity];
                                            list[i].product_name = e.value;
                                            setEntity(list);
                                          }}
                                        />
                                      </div>

                                      <div className="col-md-6 col-sm-6 mt-2 text-right ">
                                      <span className="my-4">  OFF &nbsp;</span>
                                        <label class="switch mt-4">
                                          <input
                                            class="bg-customBlue"
                                            type="checkbox"
                                            checked={
                                              item.stock_issue_status ===
                                              "active"
                                                ? true
                                                : item.stock_issue_status ===
                                                  "close"
                                                ? false
                                                : null
                                            }
                                            onChange={() => {
                                              let a = Entity;
                                              if (
                                                a[i].stock_issue_status ===
                                                "close"
                                              ) {
                                                a[i].stock_issue_status =
                                                  "active";
                                              } else {
                                                a[i].stock_issue_status =
                                                  "close";
                                              }
                                              console.log(a[i], i);

                                              setEntity(a);
                                              setReRenderState(!reRenderState);
                                            }}
                                          />
                                          <span class="slider round"></span>
                                        </label>
                                        <span>&nbsp; ON</span>
                                        {/*
                         <button className="btn-sm bg-danger btn  mt-3 text-white "
                            onClick={()=>{
                              let a = Entity
                              if( a[i].stock_issue_status ==="close"){
                               a[i].stock_issue_status="active"
                              }
                              else{
                                a[i].stock_issue_status="close"
                              }
                              console.log(a[i] ,i)
          
                               setEntity(a)
                               setReRenderState(!reRenderState)
          
                              
                            }}
                            >
                          {item.stock_issue_status}
                            </button>
                        
                        */}
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="col-md-12  ">
                                      <table className="table table-striped jambo_table bulk_action ">
                                        <thead>
                                          <tr className="headings">
                                            <th
                                              className="column-title   text-center"
                                              width="18%"
                                            >
                                              Item Name{" "}
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </th>
                                            <th
                                              className="column-title   text-center"
                                              width="16%"
                                            >
                                              Stock Unit{" "}
                                              <span className="text-danger">
                                                *
                                              </span>{" "}
                                            </th>
                                            <th
                                              className="column-title   text-center"
                                              width="15%"
                                            >
                                              Quantity{" "}
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </th>
                                            <th
                                              className="column-title   text-center"
                                              width="18%"
                                            >
                                              Weight Per Piece{" "}
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </th>
                                            <th
                                              className="column-title   text-center"
                                              width="18%"
                                            >
                                              Total Weight{" "}
                                              <span className="text-danger">
                                                *
                                              </span>{" "}
                                            </th>
                                            <th
                                              className="column-title   text-center"
                                              width="13%"
                                            >
                                              Remarks
                                            </th>

                                            <th
                                              className="column-title   text-center"
                                              width="2%"
                                            >
                                              &nbsp;
                                            </th>
                                          </tr>
                                        </thead>

                                        <tbody>
                                          {item?.stock_entries?.map(
                                            (data, id) => {
                                              return (
                                                <>
                                                  <tr key={id}>
                                                    <td>
                                                      <Select
                                                        isSearchable={true}
                                                        disabled={false}
                                                        // isDisabled = {true}
                                                        placeholder={
                                                          "Select Item"
                                                        }
                                                        styles={customStyles}
                                                        value={Item_options.find(
                                                          (e) =>
                                                            e.value ===
                                                            data.item_id
                                                        )}
                                                        options={Item_options}
                                                        //  onChange={event => handleChange(i, id, event)}
                                                        onChange={(e) => {
                                                          const values = [
                                                            ...Entity,
                                                          ];
                                                          values[
                                                            i
                                                          ].stock_entries[
                                                            id
                                                          ].item_id = e.value;
                                                          values[
                                                            i
                                                          ].stock_entries[
                                                            id
                                                          ].item_name = e.label;
                                                          values[
                                                            i
                                                          ].stock_entries[
                                                            id
                                                          ].stock_unit_name =
                                                            e.unit;

                                                          setEntity(values);

                                                          //set stock unit
                                                          const value = [
                                                            ...Entity,
                                                          ];
                                                          value[
                                                            i
                                                          ].stock_entries[
                                                            id
                                                          ].stock_unit_name =
                                                            e.unit;
                                                          setEntity(value);

                                                          // set job id
                                                          const list = [
                                                            ...Entity,
                                                          ];
                                                          list[i].job_id =
                                                            item?.job_id;
                                                          setEntity(list);
                                                          console.log(
                                                            list[i].job_id
                                                          );
                                                        }}
                                                      />
                                                      {!IsValidation &&
                                                        Entity[i].stock_entries[
                                                          id
                                                        ].item_id === 0 && (
                                                          <span className="text-danger">
                                                            First Select this{" "}
                                                          </span>
                                                        )}
                                                    </td>
                                                    <td>
                                                      <input
                                                        type="text"
                                                        className="form-control"
                                                        disabled
                                                        value={
                                                          data.stock_unit_name
                                                        }
                                                        onChange={(e) => {
                                                          const values = [
                                                            ...Entity,
                                                          ];
                                                          values[
                                                            i
                                                          ].stock_entries[
                                                            id
                                                          ].stock_unit_name =
                                                            e.target.value;
                                                          setEntity(values);
                                                        }}
                                                      />
                                                    </td>
                                                    <td>
                                                      <input
                                                        type="number"
                                                        disabled={toggle}
                                                        min="0"
                                                        // name="item_quantity"
                                                        className="form-control"
                                                        value={
                                                          data.item_quantity
                                                        }
                                                        //  onChange={event => handleChange(i, id, event)}
                                                        onChange={(e) => {
                                                          const values = [
                                                            ...Entity,
                                                          ];
                                                          values[
                                                            i
                                                          ].stock_entries[
                                                            id
                                                          ].item_quantity = Number(
                                                            e.target.value
                                                          );
                                                          values[
                                                            i
                                                          ].stock_entries[
                                                            id
                                                          ].total_weight =
                                                            values[i]
                                                              .stock_entries[id]
                                                              .item_quantity *
                                                            values[i]
                                                              .stock_entries[id]
                                                              .weight_per_piece;
                                                          setEntity(values);
                                                        }}
                                                      />
                                                      {!IsValidation &&
                                                        Entity[i].stock_entries[
                                                          id
                                                        ].item_quantity ===
                                                          0 && (
                                                          <span className="text-danger">
                                                            First Select this{" "}
                                                          </span>
                                                        )}
                                                    </td>

                                                    <td>
                                                      <input
                                                        type="number"
                                                        disabled={false}
                                                        min="0"
                                                        // name="weight_per_piece"
                                                        className="form-control"
                                                        value={
                                                          data.weight_per_piece
                                                        }
                                                        //  onChange={event => handleChange(i, id, event)}
                                                        onChange={(e) => {
                                                          const values = [
                                                            ...Entity,
                                                          ];
                                                          values[
                                                            i
                                                          ].stock_entries[
                                                            id
                                                          ].weight_per_piece = Number(
                                                            e.target.value
                                                          );
                                                          values[
                                                            i
                                                          ].stock_entries[
                                                            id
                                                          ].total_weight =
                                                            values[i]
                                                              .stock_entries[id]
                                                              .weight_per_piece *
                                                            values[i]
                                                              .stock_entries[id]
                                                              .item_quantity;

                                                          setEntity(values);
                                                        }}
                                                      />
                                                      {!IsValidation &&
                                                        Entity[i].stock_entries[
                                                          id
                                                        ].weight_per_piece ===
                                                          0 && (
                                                          <span className="text-danger">
                                                            First Select this{" "}
                                                          </span>
                                                        )}
                                                    </td>
                                                    <td>
                                                      <input
                                                        type="number"
                                                        disabled={false}
                                                        min="0"
                                                        className="form-control"
                                                        value={
                                                          data.item_quantity *
                                                          data.weight_per_piece
                                                        }
                                                        //  value={item[i]?.stock_entries[id]?.Item_quantity * item[i]?.stock_entries[id]?.weight_per_piece}
                                                        //  onChange={event => handleChange(i, id, event)}
                                                        onchange={(e) => {
                                                          const values = [
                                                            ...Entity,
                                                          ];
                                                          values[
                                                            i
                                                          ].stock_entries[
                                                            id
                                                          ].total_weight = Number(
                                                            e.target.value
                                                          );

                                                          setEntity(values);
                                                        }}
                                                      />
                                                    </td>
                                                    <td>
                                                      <input
                                                        type="text"
                                                        disabled={false}
                                                        name="remarks"
                                                        className="form-control"
                                                        value={data.remarks}
                                                        onChange={(event) =>
                                                          handleChange(
                                                            i,
                                                            id,
                                                            event
                                                          )
                                                        }
                                                      />
                                                    </td>
                                                    <td>
                                                      <i
                                                        class="fa fa-times pt-2 text-danger font-size-18"
                                                        aria-hidden="true"
                                                        onClick={() =>
                                                          handleRemove(i, id)
                                                        }
                                                      ></i>
                                                    </td>
                                                  </tr>
                                                </>
                                              );
                                            }
                                          )}

                                          <tr>
                                            <td></td>
                                            <td></td>
                                            <td>
                                              <b>Total quantity: </b>{" "}
                                              {item?.stock_entries
                                                ?.map(
                                                  (data) => data.item_quantity
                                                )
                                                .reduce(
                                                  (prev, curr) =>
                                                    Number(prev) + Number(curr),
                                                  0
                                                )}{" "}
                                            </td>
                                            <td>
                                              <b>Total Weight Price:</b>{" "}
                                              {item?.stock_entries
                                                ?.map(
                                                  (data) =>
                                                    data.weight_per_piece
                                                )
                                                .reduce(
                                                  (prev, curr) =>
                                                    Number(prev) + Number(curr),
                                                  0
                                                )}{" "}
                                            </td>
                                            <td>
                                              <b>Total Weight :</b>{" "}
                                              {item?.stock_entries
                                                ?.map(
                                                  (data) => data.total_weight
                                                )
                                                .reduce(
                                                  (prev, curr) =>
                                                    Number(prev) + Number(curr),
                                                  0
                                                ) || 0}
                                            </td>
                                            <td> </td>

                                            <td></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                                <button
                                  className="btn  mx-2 text-white text-right my-1"
                                  style={{ backgroundColor: "#f79c74" }}
                                  disabled={Entity[i].stock_issue_status === "close" ? true : false}
                                  onClick={() =>
                                     handleAdd(i)}
                                >
                                  Add Line
                                </button>
                              </>
                            );
                          })}

                          {Hidden ? (
                            <>
                              <div className="row mt-3">
                                <div className="field item form-group col-md-12 col-sm-12">
                                  <label className="col-form-label col-md-1 col-sm-1 label-align">
                                    {" "}
                                    Attachments:
                                  </label>
                                  <div className="col-md-3 col-sm-3 text-left ">
                                    <input
                                      className="form-control"
                                      type="file"
                                      ref={ref}
                                      styles={customStyles}
                                      onChange={(e) => {
                                        AttachmentFileHandler(e);
                                      }}
                                    />
                                  </div>
                                  <div
                                    className="col-md-1  "
                                    style={{ paddingTop: "1.5px" }}
                                  >
                                    {isupload ? (
                                      <div
                                        className="spinner-border  text-customOrange "
                                        role="status"
                                      >
                                        <span className="sr-only">
                                          Loading...
                                        </span>
                                      </div>
                                    ) : (
                                      <button
                                        disabled={
                                          ref?.current?.value === ""
                                            ? true
                                            : false
                                        }
                                        className="btn btn-sm btn-outline-success "
                                        onClick={() => UploadFile()}
                                        type="button"
                                      >
                                        <i className="fa fa-upload"></i>
                                      </button>
                                    )}
                                  </div>

                                  <label className="col-form-label col-md-1 col-sm-1 label-align  ">
                                    {" "}
                                    Remarks:
                                  </label>
                                  <div className="col-md-3 col-sm-3 text-left  ">
                                    <input
                                      className="form-control"
                                      styles={customStyles}
                                      value={Remarks}
                                      onChange={(e) => {
                                        setRemarks(e.target.value);
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="row mt-2">
                                {fileEntity.length !== 0 && (
                                  <div className="field item form-group col-md-6 col-sm-6 ">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align">
                                      {" "}
                                      Selected Attachments:
                                    </label>
                                    <div className="col-md-8 col-sm-8  ">
                                      {fileEntity.map((each_file, index) => {
                                        return (
                                          <button className="btn btn-sm  bg-info  text-light">
                                            <a
                                              href={`${endPoint + each_file}`}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="text-light"
                                            >
                                              {each_file
                                                .split("_")[0]
                                                .slice(15)}{" "}
                                              {index + 1}
                                            </a>
                                            <i
                                              className="fa fa-times   text-light ml-1 "
                                              aria-hidden="true"
                                              onClick={() =>
                                                removeAttchments(index)
                                              }
                                            ></i>
                                          </button>
                                        );
                                      })}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </>
                          ) : null}

                          {Hidden ? (
                            <>
                              <div className="col-md-12   x_footer mt-4 text-right">
                                {stockissuedata[index].is_post === false ? (
                                  <>
                                    <button
                                      className="btn  ms-4 text-white text-right"
                                      style={{ backgroundColor: "#f79c74" }}
                                      onClick={() => {
                                        setselectedshiftIncharge(
                                          stockissuedata[index]
                                            .shift_incharge_id
                                        );
                                        Update_Issue_Stock(shiftvalue.value);
                                      }}
                                    >
                                      Update Issue Stock{" "}
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      className="btn  ms-4 text-white text-right"
                                      style={{ backgroundColor: "#f79c74" }}
                                      onClick={() =>
                                        Submit_Issue_Stock(shiftvalue.value)
                                      }
                                    >
                                      {" "}
                                      Issue Stock{" "}
                                    </button>
                                  </>
                                )}
                              </div>
                            </>
                          ) : null}
                        </>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StockIssueShiftWise;
