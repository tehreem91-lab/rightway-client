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
import { customStyles } from "../../Components/reactCustomSelectStyle.jsx";
import { toast } from "react-toastify";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
const InwardForm = () => {

    const showNavMenu = useSelector((state) => state.NavState);
    const [isLoading, setisLoading] = useState(false);
    const [attendenceData, setAttendenceData] = useState([{}]);
    const [attendenceDataCSV, setAttendenceDataCSV] = useState([{}]);
    const [reRender, setreRender] = useState(false);
    const [accountList, setAccountList] = useState([{}]);

    const [selectedDate, setSelectedDate] = useState("2020-09-01");
    const [indate, setindate] = useState();
    const [outdate, setoutdate] = useState();

    const [visableDiv, setVisableDiv] = useState("true");
    const setDivToVisable = (displayDiv) => {
        setVisableDiv(displayDiv);
    };

    const [selectedValue, setSelectedValue] = useState("");
    const [show, setShow] = useState(false);
    const [isValidateValue, setIsValidateValue] = useState(true);

    const [inputOptions, setInputOptions] = useState("");

    const [ListOfEmployee, setListOfEmployee] = useState([]);




    const fetchData = async () => {
        var config = {
            method: "get",
            url: `${endPoint}api/EmployeeDetails/GetActiveEmployee`,
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token
                    }`,
            },
        };
        await axios(config)
            .then(function (response) {
                setInputOptions([
                    { label: "Select Employee", value: 0 },
                    ...response.data,
                ]);
                setisLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const fetchAllData = async (e) => {
        var axios = require('axios');
        var config = {
            method: 'get',
            // url: 'http://rightway-api.genial365.com/api/EmployeeDetails/GetEmployeeProfile?emp_id=11',
            url: `${endPoint}api/EmployeeDetails/GetEmployeeProfile?emp_id=${selectedValue.value}`,
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
            },
        };

        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setListOfEmployee((response.data));
                    setisLoading(false);
                    console.log({ ListOfEmployee });
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    };






    ////////////////////////////For Downloading CSV Files////////////////////////////

    const headers = [
        { label: "Code", key: "employee_code" },
        { label: "Employee Name", key: "employee_name" },
        { label: "Designation", key: "designation_title" },
        { label: "Shift Name", key: "shift_title" },
        { label: "Shift Start Time", key: "shift_start_time" },
        { label: "Shift End Time", key: "shift_end_time" },
        { label: "Date/Time In", key: "in_date" },
        { label: "Date/Time Out", key: "out_date" },
        { label: "Duty Time", key: "total_hour" },
        { label: "Over Time", key: "extra_hour" }, ,
    ];

    const csvReport = {
        filename: "Attendance.csv",
        headers: headers,
        data: attendenceDataCSV,
    };

    ////////////////////////////For Downloading PDF Files////////////////////////////
    const downloadPdf = async () => {
        var data = document.getElementById("report");

        document.getElementById("report").style.overflow = "inherit";
        document.getElementById("report").style.maxHeight = "inherit";

        await html2canvas(data).then((canvas) => {
            const contentDataURL = canvas.toDataURL("image/png", 1.0);


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
        fetchAllData({ department_id: 0 });
        fetchData();
    }, []);

    return (

        <>
            <div
                className={`container-fluid page-title-bar ${showNavMenu == false ? "right_col-margin-remove" : ""
                    }   `}
            >
                <span>&nbsp;Gate Pass Inward Form</span>

            </div>
            <div
                role="main"
                className={`right_col  h-100  ${showNavMenu === false ? "right_col-margin-remove" : " "
                    } `}
            >
                <div className="x_panel  ">
                    <div className="x_content">
                        <span className="section pl-3">
                            <div className="row   pt-3">
                                <div className="col-3">
                                    <i className="fa fa-filter"></i>&nbsp;Employee Filter
                                </div>
                                <div className="col-9 text-right "></div>
                            </div>
                        </span>

                        <div className="row">
                            <div className="field item form-group col-md-12 col-sm-12">


                                <label className="col-form-label col-md-2 col-sm-2 label-align">
                                    Select Employee <span className="required">*</span>
                                </label>
                                <div className="col-md-3 col-sm-3">
                                    <div>
                                        <Select
                                            placeholder={"Select Employee"}
                                            // getOptionLabel={(e) => e.salary_label}
                                            // getOptionValue={(e) => e.salary_value}
                                            value={selectedValue}
                                            options={inputOptions}
                                            //onChange={handleChange}
                                            onChange={(e) => {
                                                setSelectedValue(e);
                                            }}
                                            styles={customStyles}
                                        />
                                        {isValidateValue === false && Number(selectedValue) === 0 && <span className="text-danger">First Select Employee </span>}

                                    </div>
                                </div>



                            </div>
                        </div>
                        <div className="col-md-12 text-right x_footer">
                            <button
                                className="btn btn-primary"
                                type="submit"
                                onClick={() => {

                                    let is_form_validated = true;
                                    {

                                        if (Number(selectedValue) === 0) {
                                            setIsValidateValue(false);
                                            is_form_validated = false;
                                        }

                                    }
                                    if (is_form_validated === true) {
                                        setAttendenceData([{}]);
                                        fetchAllData();
                                        setShow(true);
                                    }

                                    { (selectedValue.value) && setisLoading(true) }
                                }}
                            >
                                Show Report
                            </button>
                        </div>
                    </div>
                </div>

                <>
                    {isLoading ? (
                        <>
                            <Loader />
                        </>
                    ) : (

                        <div className="">
                            {show ?
                                <>
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

                                            {/* ///////////////////////For Downloadling Data/////////////////////////// */}
                                            {/* <div className="col-md-12 col-sm-12 pr-4" > Color Indicators:
                                                <span class=" bg-danger text-white col-1 h-50 d-inline-block">Absent</span>
                                                <span class=" bg-warning text-dark col-1 h-50 d-inline-block">Incomplete</span>

                                                <ul className="mr-3 nav navbar-right panel_toolbox d-flex justify-content-end">
                                                    <div className="form-group col-md-3">
                                                        <button className="btn btn-sm btn-primary borderRadiusRound">
                                                            <i className="fa fa-print"></i>
                                                        </button>
                                                    </div>

                                                    <div className="form-group col-md-3">
                                                        <button
                                                            className="btn btn-sm btn-warning borderRadiusRound"
                                                            onClick={downloadPdf}
                                                            type="button"
                                                        >
                                                            <i className="fa fa-file-pdf-o" aria-hidden="true"></i>
                                                        </button>
                                                    </div>
                                                    <div className="form-group col-md-3">
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
                                            </div> */}


                                            {/* //////////////////////////Personal Info///////////////////////////////// */}
                                            <div id="report">

                                                <div className="card" style={{ marginTop: "25px " }}> <h5 className="headings reportTableHead border-bottom card-header"> Gate Pass Information</h5>
                                                    <div className="row" style={{ marginTop: "6px " }}>
                                                        <div className="field item form-group col-md-6 col-sm-6">
                                                            <label className="col-form-label col-md-3 col-sm-3 label-align"> Select Inward Type </label>
                                                            <div className="col-md-8 col-sm-8">
                                                                <Select
                                                                    placeholder={"Select Employee"}
                                                                    // getOptionLabel={(e) => e.salary_label}
                                                                    // getOptionValue={(e) => e.salary_value}
                                                                    value={selectedValue}
                                                                    options={inputOptions}
                                                                    //onChange={handleChange}
                                                                    onChange={(e) => {
                                                                        setSelectedValue(e);
                                                                    }}
                                                                    styles={customStyles}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row" >
                                                        <div className="field item form-group col-md-6 col-sm-6">
                                                            <label className="col-form-label col-md-3 col-sm-3 label-align">Select Party</label>{
                                                            }
                                                            <div className="col-md-8 col-sm-8">
                                                                <Select
                                                                    placeholder={"Select Employee"}
                                                                    // getOptionLabel={(e) => e.salary_label}
                                                                    // getOptionValue={(e) => e.salary_value}
                                                                    value={selectedValue}
                                                                    options={inputOptions}
                                                                    //onChange={handleChange}
                                                                    onChange={(e) => {
                                                                        setSelectedValue(e);
                                                                    }}
                                                                    styles={customStyles}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="field item form-group col-md-6 col-sm-6">
                                                            <label className="col-form-label col-md-3 col-sm-3 label-align"> Cell No. </label>{
                                                            }
                                                            <div className="col-md-8 col-sm-8">
                                                                <input
                                                                    name="name"

                                                                    className='form-control'
                                                                    value={ListOfEmployee?.employee_detail.employee_name}

                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="field item form-group col-md-6 col-sm-6">
                                                            <label className="col-form-label col-md-3 col-sm-3 label-align">Address</label>{
                                                            }
                                                            <div className="col-md-8 col-sm-8">
                                                                <input
                                                                    name="name"

                                                                    className='form-control'
                                                                    value={ListOfEmployee?.employee_detail.employee_name}

                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="field item form-group col-md-6 col-sm-6">
                                                            <label className="col-form-label col-md-3 col-sm-3 label-align">Gate Pass Date</label>{
                                                            }
                                                            <div className="col-md-8 col-sm-8">
                                                                <input
                                                                    name="name"
                                                                    type="date"
                                                                    className='form-control'
                                                                    value={ListOfEmployee?.employee_detail.employee_name}

                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="field item form-group col-md-6 col-sm-6">
                                                            <label className="col-form-label col-md-3 col-sm-3 label-align">Select Attachment</label>{
                                                            }
                                                            <div className="col-md-8 col-sm-8">
                                                                <input
                                                                    name="name"

                                                                    className='form-control'
                                                                    value={ListOfEmployee?.employee_detail.employee_name}

                                                                />
                                                            </div>
                                                        </div>


                                                    </div>



                                                </div>


                                                <div className="card" style={{ marginTop: "25px " }}> <h5 className="headings reportTableHead border-bottom card-header"> Vehicle Information</h5>
                                                    <div className="row" style={{ marginTop: "6px " }}>
                                                        <div className="field item form-group col-md-6 col-sm-6">
                                                            <label className="col-form-label col-md-3 col-sm-3 label-align"> Vehicle No. </label>
                                                            <div className="col-md-8 col-sm-8">
                                                                <input
                                                                    name="name"
                                                                    className='form-control'
                                                                    value={ListOfEmployee.employee_detail.employee_code}

                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row" >
                                                        <div className="field item form-group col-md-6 col-sm-6">
                                                            <label className="col-form-label col-md-3 col-sm-3 label-align">Driver Name</label>{
                                                            }
                                                            <div className="col-md-8 col-sm-8">
                                                                <input
                                                                    name="name"

                                                                    className='form-control'
                                                                    value={ListOfEmployee?.employee_detail.employee_name}

                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="field item form-group col-md-6 col-sm-6">
                                                            <label className="col-form-label col-md-3 col-sm-3 label-align">Driver Cell </label>{
                                                            }
                                                            <div className="col-md-8 col-sm-8">
                                                                <input
                                                                    name="name"

                                                                    className='form-control'
                                                                    value={ListOfEmployee?.employee_detail.employee_name}

                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="field item form-group col-md-6 col-sm-6">
                                                            <label className="col-form-label col-md-3 col-sm-3 label-align">Rent Type</label>{
                                                            }
                                                            <div className="col-md-8 col-sm-8">
                                                                <Select
                                                                    placeholder={"Select Employee"}
                                                                    // getOptionLabel={(e) => e.salary_label}
                                                                    // getOptionValue={(e) => e.salary_value}
                                                                    value={selectedValue}
                                                                    options={inputOptions}
                                                                    //onChange={handleChange}
                                                                    onChange={(e) => {
                                                                        setSelectedValue(e);
                                                                    }}
                                                                    styles={customStyles}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="field item form-group col-md-6 col-sm-6">
                                                            <label className="col-form-label col-md-3 col-sm-3 label-align">Vehicle Rent</label>{
                                                            }
                                                            <div className="col-md-8 col-sm-8">
                                                                <input
                                                                    name="name"

                                                                    className='form-control'
                                                                    value={ListOfEmployee?.employee_detail.employee_name}

                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="field item form-group col-md-6 col-sm-6">
                                                            <label className="col-form-label col-md-3 col-sm-3 label-align">Bility No.</label>{
                                                            }
                                                            <div className="col-md-8 col-sm-8">
                                                                <input
                                                                    name="name"

                                                                    className='form-control'
                                                                    value={ListOfEmployee?.employee_detail.employee_name}

                                                                />
                                                            </div>
                                                        </div>


                                                    </div>



                                                </div>

                                                <div className="table-responsive px-3 pb-2" style={{ marginTop: "25px " }}>
                                                    <table className="table table-striped jambo_table bulk_action ">
                                                        <thead>
                                                            <tr className="headings reportTableHead">
                                                                <th className="column-title right-border-1 text-center " width="20%" >
                                                                    PRODUCT COMMODITY
                                                                </th>
                                                                <th className="column-title  right-border-1 text-center" width="20%">
                                                                    UNIT
                                                                </th>
                                                                <th className="column-title right-border-1 text-center" width="15%">
                                                                    PIECES
                                                                </th>
                                                                <th className="column-title right-border-1 text-center" width="15%">
                                                                    PIECE WEIGHT
                                                                </th>
                                                                <th className="column-title right-border-1 text-center" width="15%">
                                                                    TOTAL WEIGHT
                                                                </th>
                                                                <th className="column-title text-center" width="15%">
                                                                    CONDITION
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
                                                                        <td className=" "> {item.account_name} </td>
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
                                                                        <td className=" "> {item.account_name} </td>
                                                                    </tr>
                                                                );
                                                            })}
                                                        </tbody>
                                                        <tfoot>
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
                                                                <td></td>
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



                                        </div>
                                    </div>
                                </> : null
                            }
                        </div>
                    )}
                </>
            </div>
        </>

    );
};

export default InwardForm;
