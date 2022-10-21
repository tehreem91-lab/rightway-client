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
import { toast } from "react-toastify";
import CustomInnerHeader from "../../Components/CustomInnerHeader.jsx";

const SalaryGeneration = () => {

    const showNavMenu = useSelector((state) => state.NavState);
    const [isLoading, setisLoading] = useState(false);
    const [attendenceData, setAttendenceData] = useState([{}]);
    const [attendenceDataCSV, setAttendenceDataCSV] = useState([{}]);
    const [reRender, setreRender] = useState(false);
    const [show, setShow] = useState(false);
    const [isGenerated, setIsGenerated] = useState(false);


    const [isError, setisError] = useState(false);
    var month = new Date().toLocaleDateString(undefined, { month: "2-digit" });
    var year = new Date().toLocaleDateString(undefined, { year: "numeric" });
    const dateToday = `${year}-${month}`;
    const [selectedDate, setSelectedDate] = useState(dateToday);
    const [indate, setindate] = useState();
    const [outdate, setoutdate] = useState();

    const [isValidateValue, setIsValidateValue] = useState(true);

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
                        gross_salary: 5678,
                        loan_deduction_record: [
                            {
                                loan_id: item.loan_deduction_record.loan_id,
                                loan_deduction_amount: item.loan_deduction_record.loan_deduction_amount
                            }
                        ]
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
                setisError(false);
            })
            .catch(function (error) {
                console.log(error.response);
                setisLoading(false);
                setisError(true);
                console.error(error);
                if (error.response.data.Message == 'Salary Voucher is Already Generated') {
                    toast.error(error.response.data.Message);
                }


            });
    };


    const postSalary = () => {

        var records_data = attendenceData.map((item) => {
            return {
                "employee_id": item.employee_id,
                "department_id": selectedValue.salary_value,
                "emoloyee_over_time": item.overtime_hour,
                "total_working_hour": item.total_working_hour,
                "monthly_salary": item.monthly_salary,
                "allowence_amount": 0,
                "gross_salary": item.gross_salary,
                "total_loan_deduction": 0,
                "advance_deduction": item.advance_deduction,
                "total_deduction": 0,
                "net_salary": item.net_salary,
                "benefits_amount": item.benefits_amount,
                "loan_records": item.loan_deduction_record.map((i) => {
                    return {
                        "loan_id": i.loan_id,
                        "deduction_amount": i.loan_deduction_amount
                    }
                })

            }

        })


        var axios = require('axios');
        var data = JSON.stringify({
            "attachment": attendenceData.attachments,
            "first_date_of_month": selectedDate,
            "remarks": attendenceData.remarks,
            "department_id": selectedValue.salary_value,
            "records": records_data

        });

        var config = {
            method: 'post',
            url: `${endPoint}api/Attendence/PostSalaryForm`,
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
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
        //fetchAllData({ department_id: 0 });
        fetchData();
    }, []);

    return (
        <>
            <div
                className={`container-fluid page-title-bar ${showNavMenu == false ? "right_col-margin-remove" : ""
                    }   `}
            >
            <CustomInnerHeader moduleName="Salary Generation form" isShowSelector={true} />

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
                                                    //label={dateToday}
                                                    //min="2022-09-09"
                                                    onChange={(e) => {
                                                        setSelectedDate(e.target.value);

                                                    }}
                                                />
                                                {isValidateValue === false && Number(selectedDate) === 0 && <span className="text-danger">First Select Date </span>}
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
                                                {isValidateValue === false && Number(selectedValue) === 0 && <span className="text-danger">First Select Department </span>}
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
                                        let is_form_validated = true;
                                        {

                                            if (Number(selectedValue) === 0 || Number(selectedDate) === 0) {
                                                setIsValidateValue(false);
                                                is_form_validated = false;
                                            }

                                        }
                                        if (is_form_validated === true) {
                                            fetchAllData();
                                            setShow(true);
                                            setisLoading(true);
                                        }

                                        // fetchAllData();
                                        // setShow(true);
                                        // setisLoading(true);
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
            {isLoading ? (
                <>
                    <Loader />
                </>
            ) : isError ? <div> <div className="x_panel text-center"><div className="">No record for this date</div></div></div> : (

                <>



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
                                            setFileEntity={setFileEntity}
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
