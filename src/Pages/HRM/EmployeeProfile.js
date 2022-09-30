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
const EmployeeProfile = () => {

    const showNavMenu = useSelector((state) => state.NavState);
    const [isLoading, setisLoading] = useState(false);
    const [attendenceData, setAttendenceData] = useState([{}]);
    const [attendenceDataCSV, setAttendenceDataCSV] = useState([{}]);
    const [reRender, setreRender] = useState(false);

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
                <span>&nbsp;Employee Profile</span>

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
                                                <div className="card" style={{ marginTop: "25px " }}> <h5 className="card-header"> Personal Information</h5>
                                                    <div className="row" style={{ marginTop: "6px " }}>
                                                        <div className="field item form-group col-md-6 col-sm-6">
                                                            <label className="col-form-label col-md-3 col-sm-3 label-align"> Employee Code </label>
                                                            <div className="col-md-8 col-sm-8">
                                                                <input
                                                                    name="name"
                                                                    className='form-control'
                                                                    value={ListOfEmployee.employee_detail.employee_code}
                                                                    disabled
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row" >
                                                        <div className="field item form-group col-md-6 col-sm-6">
                                                            <label className="col-form-label col-md-3 col-sm-3 label-align">Name</label>{
                                                            }
                                                            <div className="col-md-8 col-sm-8">
                                                                <input
                                                                    name="name"
                                                                    disabled
                                                                    className='form-control'
                                                                    value={ListOfEmployee?.employee_detail.employee_name}

                                                                />
                                                            </div>
                                                        </div>

                                                        {/* <div className="field item form-group col-md-6 col-sm-6">
                                                            <label className="col-form-label col-md-3 col-sm-3 label-align pl-0">Surname  </label>
                                                            <div className="col-md-8 col-sm-8">
                                                                <input
                                                                    name="name"
                                                                    className='form-control'
                                                                    disabled
                                                                    value={ListOfEmployee?.employee_detail.sur_name}
                                                                />
                                                            </div>
                                                        </div>


                                                        <div className="field item form-group col-md-6 col-sm-6">
                                                            <label className="col-form-label col-md-3 col-sm-3 label-align">Address  </label>
                                                            <div className="col-md-8 col-sm-8">
                                                                <input
                                                                    name="name"
                                                                    className='form-control'
                                                                    value={ListOfEmployee?.employee_detail.address}
                                                                    disabled
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="field item form-group col-md-6 col-sm-6">
                                                            <label className="col-form-label col-md-3 col-sm-3 label-align pl-0">Department </label>
                                                            <div className="col-md-8 col-sm-8">

                                                                <input
                                                                    name="name"
                                                                    className='form-control'
                                                                    placeholder=""
                                                                    value={ListOfEmployee?.employee_detail.designation_id}
                                                                    disabled
                                                                />
                                                            </div>
                                                        </div>


                                                        <div className="field item form-group col-md-6 col-sm-6">
                                                            <label className="col-form-label col-md-3 col-sm-3 label-align pl-0">Phone  </label>
                                                            <div className="col-md-8 col-sm-8">
                                                                <input
                                                                    name="name"
                                                                    className='form-control'
                                                                    type="number"
                                                                    placeholder=""
                                                                    value={ListOfEmployee?.employee_detail.cell}
                                                                    disabled
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="field item form-group col-md-6 col-sm-6">
                                                            <label className="col-form-label col-md-3 col-sm-3 label-align">CNIC
                                                            </label>
                                                            <div className="col-md-8 col-sm-8">
                                                                <input
                                                                    name="name"
                                                                    className='form-control'
                                                                    type="number"
                                                                    value={ListOfEmployee?.employee_detail.cnic}
                                                                    disabled
                                                                />
                                                            </div>
                                                        </div> */}

                                                    </div>



                                                </div>


                                                {/* //////////////////////////Tab Info///////////////////////////////// */}
                                                <div style={{ marginTop: "25px " }}>
                                                    <Tabs
                                                        defaultActiveKey="profile"
                                                        id="uncontrolled-tab-example"
                                                        className="nav nav-tabs nav-justified"
                                                    >

                                                        <Tab eventKey="profile" title="Employee Profile">
                                                            <div className="card" style={{ marginTop: "25px " }}> <h5 className="card-header"> Employee Profile</h5>

                                                                <div className="row" style={{ marginTop: "6px " }}>
                                                                    <div className="field item form-group col-md-6 col-sm-6">
                                                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Total Presents</label>
                                                                        <div className="col-md-8 col-sm-8">
                                                                            <input
                                                                                disabled
                                                                                className='form-control'
                                                                                //type="number"
                                                                                value={ListOfEmployee?.emp_profile.total_presence}
                                                                            />
                                                                        </div>
                                                                    </div>



                                                                    <div className="field item form-group col-md-6 col-sm-6">
                                                                        <label className="col-form-label col-md-3 col-sm-3 label-align pl-0">Total Absents </label>
                                                                        <div className="col-md-8 col-sm-8">
                                                                            <input
                                                                                disabled
                                                                                className='form-control'
                                                                                //type="number"
                                                                                value={ListOfEmployee?.emp_profile.total_absent}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="field item form-group col-md-6 col-sm-6">
                                                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Total Holidays
                                                                        </label>
                                                                        <div className="col-md-8 col-sm-8">
                                                                            <input
                                                                                disabled
                                                                                className='form-control'
                                                                                //type="number"
                                                                                value={ListOfEmployee?.emp_profile.holidays_in_month}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    {ListOfEmployee?.current_loan_info.map(((item, index) => {
                                                                        return (
                                                                            <>
                                                                                <div className="field item form-group col-md-6 col-sm-6">
                                                                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Loan Status
                                                                                    </label>
                                                                                    <div className="col-md-8 col-sm-8">
                                                                                        <input
                                                                                            disabled
                                                                                            className='form-control'
                                                                                            // type="number"
                                                                                            value={item?.status}
                                                                                        />
                                                                                    </div>
                                                                                </div>


                                                                                <div className="field item form-group col-md-6 col-sm-6">
                                                                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Loan Remaining Amount
                                                                                    </label>
                                                                                    <div className="col-md-8 col-sm-8">
                                                                                        <input
                                                                                            disabled
                                                                                            className='form-control'
                                                                                            //type="number"
                                                                                            value={item?.remaining_amount}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </>
                                                                        )
                                                                    }))}



                                                                    <div className="field item form-group col-md-6 col-sm-6">
                                                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Net Salary
                                                                        </label>
                                                                        <div className="col-md-8 col-sm-8">
                                                                            <input
                                                                                disabled
                                                                                className='form-control'
                                                                                //type="number"
                                                                                value={ListOfEmployee?.emp_profile.net_salary}
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                </div>



                                                            </div>
                                                        </Tab>
                                                        {/* "employee_detail": {
        
        "employee_name": "Faryad",
        "employee_code": "EMP-2",

        "salary_type": "Wages",
        "salary": 2000.000,
        "is_overtime_allow": 0,
        "holiday_assigned": 6,
        "benefits_amount": 6500.000
    },
    "emp_profile": {
      

        "overtime_hour": 0.0,
        "total_working_hour": 70.0333333333333,
        "advance_deduction": 0.0,
        "total_presence": 9,
        "total_absent": 17,
        "holidays_in_month": 4,

        "net_salary": 6883.6111111111108333333333333,
        "loan_deduction_record": [
            {
                "loan_deduction_amount": 200.000
            }
        ]
    }, */}
                                                        <Tab eventKey="salary" title="Salary Info" >
                                                            <div className="card" style={{ marginTop: "25px " }}> <h5 className="card-header"> Salary Information</h5>

                                                                <div className="row" style={{ marginTop: "6px " }}>
                                                                    <div className="field item form-group col-md-6 col-sm-6">
                                                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Salary Type</label>
                                                                        <div className="col-md-8 col-sm-8">
                                                                            <input
                                                                                disabled
                                                                                className='form-control'
                                                                                //type="number"
                                                                                value={ListOfEmployee?.employee_detail.salary_type}
                                                                            />
                                                                        </div>
                                                                    </div>



                                                                    <div className="field item form-group col-md-6 col-sm-6">
                                                                        <label className="col-form-label col-md-3 col-sm-3 label-align pl-0">Salary Amount </label>
                                                                        <div className="col-md-8 col-sm-8">
                                                                            <input
                                                                                disabled
                                                                                className='form-control'
                                                                                type="number"
                                                                                value={ListOfEmployee?.employee_detail.salary}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="field item form-group col-md-6 col-sm-6">
                                                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Benefits Amount
                                                                        </label>
                                                                        <div className="col-md-8 col-sm-8">
                                                                            <input
                                                                                disabled
                                                                                className='form-control'
                                                                                type="number"
                                                                                value={ListOfEmployee?.employee_detail.benefits_amount}
                                                                            />
                                                                        </div>
                                                                    </div>


                                                                    <div className="field item form-group col-md-6 col-sm-6">
                                                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Overtime (Hours)
                                                                        </label>
                                                                        <div className="col-md-8 col-sm-8">
                                                                            <input
                                                                                disabled
                                                                                className='form-control'
                                                                                type="number"
                                                                                value={ListOfEmployee?.emp_profile.overtime_hour}
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <div className="field item form-group col-md-6 col-sm-6">
                                                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Total Working Hours
                                                                        </label>
                                                                        <div className="col-md-8 col-sm-8">
                                                                            <input
                                                                                disabled
                                                                                className='form-control'
                                                                                type="number"
                                                                                value={ListOfEmployee?.emp_profile.total_working_hour}
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <div className="field item form-group col-md-6 col-sm-6">
                                                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Advance Deduction
                                                                        </label>
                                                                        <div className="col-md-8 col-sm-8">
                                                                            <input
                                                                                disabled
                                                                                className='form-control'
                                                                                type="number"
                                                                                value={ListOfEmployee?.emp_profile.advance_deduction}
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    {/* <div className="field item form-group col-md-6 col-sm-6">
                                                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Presents
                                                                        </label>
                                                                        <div className="col-md-8 col-sm-8">
                                                                            <input
                                                                                disabled
                                                                                className='form-control'
                                                                                type="number"
                                                                                value={ListOfEmployee?.emp_profile.total_presence}
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <div className="field item form-group col-md-6 col-sm-6">
                                                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Absents
                                                                        </label>
                                                                        <div className="col-md-8 col-sm-8">
                                                                            <input
                                                                                disabled
                                                                                className='form-control'
                                                                                type="number"
                                                                                value={ListOfEmployee?.emp_profile.total_absent}
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <div className="field item form-group col-md-6 col-sm-6">
                                                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Holidays
                                                                        </label>
                                                                        <div className="col-md-8 col-sm-8">
                                                                            <input
                                                                                disabled
                                                                                className='form-control'
                                                                                type="number"
                                                                                value={ListOfEmployee?.emp_profile.holidays_in_month}
                                                                            />
                                                                        </div>
                                                                    </div> */}

                                                                    {/* <div className="field item form-group col-md-6 col-sm-6">
                                                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Loan Deduction
                                                                        </label>
                                                                        <div className="col-md-8 col-sm-8">
                                                                            <input
                                                                                disabled
                                                                                className='form-control'
                                                                                type="number"
                                                                                value={ListOfEmployee?.emp_profile.loan_deduction_record.loan_deduction_amount}
                                                                            />
                                                                        </div>
                                                                    </div> */}

                                                                    <div className="field item form-group col-md-6 col-sm-6">
                                                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Net Salary
                                                                        </label>
                                                                        <div className="col-md-8 col-sm-8">
                                                                            <input
                                                                                disabled
                                                                                className='form-control'
                                                                                type="number"
                                                                                value={ListOfEmployee?.emp_profile.net_salary}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </Tab>
                                                        <Tab eventKey="loan" title="Loan Info" >
                                                            <div className="card" style={{ marginTop: "25px " }}> <h5 className="card-header"> Loan Information</h5>

                                                                {ListOfEmployee?.current_loan_info.map(((item, index) => {
                                                                    return <div className="row" style={{ marginTop: "6px " }}>
                                                                        <div className="field item form-group col-md-6 col-sm-6">
                                                                            <label className="col-form-label col-md-3 col-sm-3 label-align">Loan Voucher</label>
                                                                            <div className="col-md-8 col-sm-8">
                                                                                <input
                                                                                    disabled
                                                                                    className='form-control'
                                                                                    //type="number"
                                                                                    value={item?.loan_voucher_inv}
                                                                                />
                                                                            </div>
                                                                        </div>



                                                                        <div className="field item form-group col-md-6 col-sm-6">
                                                                            <label className="col-form-label col-md-3 col-sm-3 label-align pl-0">Loan Amount </label>
                                                                            <div className="col-md-8 col-sm-8">
                                                                                <input
                                                                                    disabled
                                                                                    className='form-control'
                                                                                    type="number"
                                                                                    value={item?.amount}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="field item form-group col-md-6 col-sm-6">
                                                                            <label className="col-form-label col-md-3 col-sm-3 label-align">Status
                                                                            </label>
                                                                            <div className="col-md-8 col-sm-8">
                                                                                <input
                                                                                    disabled
                                                                                    className='form-control'
                                                                                    type="number"
                                                                                    value={item?.status}
                                                                                />
                                                                            </div>
                                                                        </div>

                                                                        <div className="field item form-group col-md-6 col-sm-6">
                                                                            <label className="col-form-label col-md-3 col-sm-3 label-align">Remaining Amount
                                                                            </label>
                                                                            <div className="col-md-8 col-sm-8">
                                                                                <input
                                                                                    disabled
                                                                                    className='form-control'
                                                                                    type="number"
                                                                                    value={item?.remaining_amount}
                                                                                />
                                                                            </div>
                                                                        </div>

                                                                        <div className="field item form-group col-md-6 col-sm-6">
                                                                            <label className="col-form-label col-md-3 col-sm-3 label-align">Monthly Deduction
                                                                            </label>
                                                                            <div className="col-md-8 col-sm-8">
                                                                                <input
                                                                                    disabled
                                                                                    className='form-control'
                                                                                    type="number"
                                                                                    value={item?.monthly_deduction}
                                                                                />
                                                                            </div>
                                                                        </div>

                                                                        <div className="field item form-group col-md-6 col-sm-6">
                                                                            <label className="col-form-label col-md-3 col-sm-3 label-align"> Deduction Starting Date
                                                                            </label>
                                                                            <div className="col-md-8 col-sm-8">
                                                                                <input
                                                                                    disabled
                                                                                    className='form-control'
                                                                                    type="string"
                                                                                    value={item?.deduction_starting_date.slice(0, 10)}
                                                                                />
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                }))}

                                                            </div>

                                                        </Tab>
                                                    </Tabs>

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

export default EmployeeProfile;
