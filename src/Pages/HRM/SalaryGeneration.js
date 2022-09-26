import React, { useEffect, useState, useRef } from "react";
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
import SalaryGenReciept from "./SalaryGenReciept.js";

const SalaryGeneration = () => {

    const showNavMenu = useSelector((state) => state.NavState);
    const [isLoading, setisLoading] = useState(false);
    const [attendenceData, setAttendenceData] = useState([{}]);
    const [attendenceDataCSV, setAttendenceDataCSV] = useState([{}]);
    const [reRender, setreRender] = useState(false);
    const [show, setShow] = useState(false);
    const [selectedDate, setSelectedDate] = useState("2020-09-01");


    var day = new Date().toLocaleDateString(undefined, { day: "2-digit" });
    var month = new Date().toLocaleDateString(undefined, { month: "2-digit" });
    var year = new Date().toLocaleDateString(undefined, { year: "numeric" });
    const dateToday = `${year}-${month}-${day}`;
    // const [date, setdate] = useState("2020-09-01T00:00:00");
    const [date, setdate] = useState("2020-09-01");
    const [indate, setindate] = useState();
    const [outdate, setoutdate] = useState();

    const [visableDiv, setVisableDiv] = useState("true");
    const setDivToVisable = (displayDiv) => {
        setVisableDiv(displayDiv);
    };

    const [inputValue, setInputValue] = useState("");
    const [selectedValue, setSelectedValue] = useState("");

    const [inputOptions, setInputOptions] = useState("");

    const [selectedAttachmentFile, setSelectedAttachmentFile] = useState("")
    const [selectedAttachmentName, setSelectedAttachmentName] = useState("")
    const [isFileUploadingModeOn, setIsFileUploadingModeOn] = useState(false)
    const [fileEntity, setFileEntity] = useState([]);
    const ref = useRef();
    const reset = () => {
        ref.current.value = "";
    };

    // handle input change event
    const handleInputChange = (value) => {
        setInputValue(value);
    };
    // handle selection
    const handleChange = (value) => {
        setSelectedValue(value);
        fetchAllData(value);
    };

    const handleChangeDate = (value) => {
        setdate(value);
        fetchAllData(value);
    };


    const UploadFile = async (e) => {
        setIsFileUploadingModeOn(true)
        const options = {
            onUploadProgerss: (progressEvent) => {
                const { loaded, total } = progressEvent;
                let percentage = Math.floor((loaded * 100) / total)
                console.log(`${loaded}bytes of ${total}bytes | ${percentage}%`);
            }
        }
        let data = new FormData();
        data.append("UploadedImage", selectedAttachmentFile);
        await axios.post(`${endPoint}/api/FileUpload?file_name=${selectedAttachmentName}`, data, options).then(res => {
            setFileEntity([...fileEntity, res.data])
            if (res.status === 200) {
                setIsFileUploadingModeOn(false)
                reset()
            }
        })
    }

    const fetchData = async () => {
        var config = {
            method: "get",
            url: `${endPoint}api/ChartOfAccounts/GetSalaryDepartments`,
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token
                    }`,
            },
        };
        await axios(config)
            .then(function (response) {
                setInputOptions([
                    { label: "All", value: 0 },
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
            url: `${endPoint}api/Attendence/GetSalaryDepartmentWiseFormData?date=${selectedDate}-01&sal_dept_id=${selectedValue.salary_value}`,
            //url: `${endPoint}api/Attendence/GetShiftWiseAttendenceReport?department_id=${e.department_id}&date=${e.date}`,
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
            },
        };

        await axios(config)
            .then(function (response) {
                setAttendenceData(response.data);
                let core_data = response.data.map((item) => {
                    return {
                        employee_id: item.employee_id,
                        //employee_code: item.employee_code,
                        employee_name_code: item.employee_name_code,
                        monthly_salary: item.monthly_salary,
                        benefits_amount: item.benefits_amount,
                        overtime_hour: item.overtime_hour,
                        total_working_hour: item.total_working_hour,
                        remarks: item.remarks,
                        advance_deduction: item.advance_deduction,
                        total_presence: item.total_presence,
                        total_absent: item.total_absent,
                        holidays_in_month: item.holidays_in_month,
                        attachments: item.attachments,
                        net_salary: item.net_salary,
                        loan_deduction_record: item.loan_deduction_record,
                    };
                });
                setAttendenceDataCSV([
                    ...core_data,
                    {
                        // employee_code: "",
                        // employee_name: "Total",
                        // in_date: response.data.map((e) => e.in_date).reduce((a, b) => a + b, 0),
                        // out_date: response.data
                        //     .map((e) => e.out_date)
                        //     .reduce((a, b) => a + b, 0),
                    },
                ]);
                setisLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const editBalance = () => {

        const updatedCode4post = attendenceData.filter((item) => {
            // if ((item.in_date != null && item.out_date != null) || (item.in_date != null && item.out_date == null) || (item.in_date == null && item.out_date != null))
            if (item.in_date != null && item.out_date != null)
                return {
                    "employee_id": item.employee_id,
                    "entry_MachineInfo1_id": item.entry_MachineInfo1_id,
                    "last_MachineInfo1_id": item.last_MachineInfo1_id,
                    "in_time": item.in_date,
                    "out_time": item.out_date,
                }

            else {
                console.log("Errorlalala")
            }

        });

        const updatedCode = updatedCode4post.map((item) => {
            return {
                "employee_id": item.employee_id,
                "entry_MachineInfo1_id": item.entry_MachineInfo1_id,
                "last_MachineInfo1_id": item.last_MachineInfo1_id,
                "in_time": item.in_date,
                "out_time": item.out_date,
            };
        });

        var data = {
            attendence_record: updatedCode,
        };
        console.log(data);

        var config = {
            method: "put",
            url: `${endPoint}api/Attendence/UpdateShiftWiseAttendenceReport?date=${date}`,
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token
                    }`,
            },
            data: data,
        };

        axios(config)
            .then(function (response) { })
            .catch(function (error) {
                console.log(error);
            });
    };

    const postSalary = () => {
        var axios = require('axios');
        var data = JSON.stringify({
            "attachment": "string",
            "first_date_of_month": "2022-09-26T06:48:57.292Z",
            "remarks": "Sample Data",
            "department_id": 0,
            "records": [
                {
                    "employee_id": 2,
                    "department_id": 146,
                    "emoloyee_over_time": 74,
                    "total_working_hour": 300,
                    "monthly_salary": 95000,
                    "allowence_amount": 0,
                    "gross_salary": 114800,
                    "total_loan_deduction": 0,
                    "advance_deduction": 0,
                    "total_deduction": 0,
                    "net_salary": 115000,
                    "benefits_amount": 70,
                    "loan_records": [
                        {
                            "loan_id": 144,
                            "deduction_amount": 20
                        }
                    ]
                }
            ]
        });

        var config = {
            method: 'post',
            url: 'http://rightway-api.genial365.com/api/Attendence/PostSalaryForm',
            headers: {
                'Authorization': 'Bearer Sxbn4dmKcKAmmkhOxRG2j1vOlEf1OPWV2I4CrTZ0GWuisJYo92BYQRmBpMZ1eeBcVnjYN3VXwTv26_6Z5HOZrK-n1rpmiHowYeSWH3VhKO-80Ok-LxQ9wNM7Xby5jPCKR4fO59d40aWI0OMpMDNU1O5WDhQJUN477Wv-Im6baho0KyCLhaeICOnZG40_UKucfzC6L1tKYxjH7SVY4yT1SwmGqifYUjdKUHz-xy_RQwJ8c0dSMSLhH0tYKKhwM0kGFXmxlScdQ36QtEb4fdlsOZWgogPYgB1ImRSVvuqoQss08OWW8rYfiw0VQaSQWsk-YhPoad5ROHv1JiuYYOVd3JqqrGLBLkbc4aheciTNH8e5_nRltVplG6lRTpjkcaImpBSmFav9NaBcy1IbsQbOPgrh3kI7Ha5U8gnQOnCo4J5hASxt0OpIe3veXAbD8wyXhmIiELTQJ08yGtpdvxguj_bRYaCUwTXhJd3UtAV1HoWpvnOngkrNMRzDPMXWvafD534sCmHPwmESNIORFYLyrg',
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    };

    ////////////////////////////For Downloading CSV Files////////////////////////////

    const headers = [
        { label: "Code", key: "employee_code" },
        { label: "Employee Name", key: "employee_name" },
        { label: "in_date", key: "in_date" },
        { label: "out_date", key: "out_date" },
    ];

    const csvReport = {
        filename: "Attendance.csv",
        headers: headers,
        data: attendenceDataCSV,
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
        fetchAllData({ department_id: 0 });
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
                        className={`container-fluid page-title-bar ${showNavMenu == false ? "right_col-margin-remove" : ""
                            }   `}
                    >
                        <span>&nbsp;Salary Generation Form</span>

                    </div>
                    <div
                        role="main"
                        className={`right_col  h-100  ${showNavMenu === false ? "right_col-margin-remove" : " "
                            } `}
                    >
                        <div className="x_panel  ">
                            <div className="x_content">
                                {/* <span className="section pl-3">
                                    <div className="row   pt-3">
                                        <div className="col-3">
                                            <i className="fa fa-list"></i>&nbsp;Listing
                                        </div>
                                        <div className="col-9 text-right "></div>
                                    </div>
                                </span> */}

                                <div className="x_panel  px-0 ">
                                    <div className="x_content my-3">
                                        <span className="section  px-2 ">
                                            <i className="fa fa-filter pl-2"></i>&nbsp;Report Filter
                                        </span>
                                        <div className="row">
                                            <div className="field item form-group col-md-12 col-sm-12">


                                                <label className="col-form-label col-md-2 col-sm-2 label-align">
                                                    Select Date <span className="required">*</span>
                                                </label>
                                                <div className="col-md-3 col-sm-3">
                                                    <div>
                                                        <input

                                                            //onChange={handleChangeDate}
                                                            //placeholder="All Dates"
                                                            styles={customStyles}
                                                            className="form-control"
                                                            type="month"
                                                            value={selectedDate}
                                                            //min="2022-09-09"
                                                            onChange={(e) => {
                                                                setSelectedDate(e.target.value);

                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                <label className="col-form-label col-md-2 col-sm-2 label-align">
                                                    Select Department <span className="required">*</span>
                                                </label>
                                                <div className="col-md-3 col-sm-3">
                                                    <div>
                                                        <Select
                                                            placeholder={"Select Department"}
                                                            getOptionLabel={(e) => e.salary_label}
                                                            getOptionValue={(e) => e.salary_value}
                                                            value={selectedValue}
                                                            options={inputOptions}
                                                            onChange={(e) => {
                                                                setSelectedValue(e);
                                                            }}
                                                            styles={customStyles}
                                                        />
                                                    </div>
                                                </div>



                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12 text-right x_footer">
                                        <button
                                            className="btn btn-primary"
                                            type="submit"
                                            onClick={() => {
                                                // setfromDate(dateFrom);
                                                // settoDate(dateTo);
                                                fetchAllData();
                                                setShow(true);
                                                // setAttendenceData = { attendenceData }
                                                // setindate = { indate }
                                                // setoutdate = { outdate }
                                                // console.log({ LadgerData });
                                            }}
                                        >
                                            Show Report
                                        </button>
                                    </div>
                                </div>



                            </div >


                        </div >
                    </div >


                    <div
                        role="main"
                        className={`right_col  h-100  ${showNavMenu === false ? "right_col-margin-remove" : " "
                            } `}
                    >
                        {show ?
                            <>
                                <div className="x_panel  ">
                                    <div className="clearfix" >
                                        <SalaryGenReciept
                                            ref={ref}
                                            setSelectedAttachmentName={setSelectedAttachmentName}
                                            setSelectedAttachmentFile={selectedAttachmentFile}
                                            isFileUploadingModeOn={isFileUploadingModeOn}
                                            UploadFile={UploadFile}
                                            fileEntity={fileEntity}
                                            customStyles={customStyles}
                                            downloadPdf={downloadPdf}
                                            CSVLink={CSVLink}
                                            csvReport={csvReport}
                                            attendenceData={attendenceData}
                                            setAttendenceData={setAttendenceData}
                                            visableDiv={visableDiv}
                                            preventMinus={preventMinus}
                                            setreRender={setreRender}
                                            reRender={reRender}
                                            setindate={setindate}
                                            setoutdate={setoutdate}
                                            endPoint={endPoint}
                                            postSalary={postSalary}
                                        />
                                    </div>
                                </div>
                            </> : null
                        }
                    </div>
                </>
            )
            }
        </>
    );
};

export default SalaryGeneration;
