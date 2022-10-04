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
import SalaryReportReciept from "./SalaryReportReciept.js";

const SalaryReport = () => {

    const showNavMenu = useSelector((state) => state.NavState);
    const [isLoading, setisLoading] = useState(false);
    const [attendenceData, setAttendenceData] = useState([{}]);
    const [attendenceDataCSV, setAttendenceDataCSV] = useState([{}]);
    const [reRender, setreRender] = useState(false);
    const [show, setShow] = useState(false);



    const [isError, setisError] = useState(false);
    var month = new Date().toLocaleDateString(undefined, { month: "2-digit" });
    var year = new Date().toLocaleDateString(undefined, { year: "numeric" });
    const dateToday = `${year}-${month}`;
    const [selectedDate, setSelectedDate] = useState(dateToday);
    const [indate, setindate] = useState();
    const [outdate, setoutdate] = useState();

    const [visableDiv, setVisableDiv] = useState("true");
    const setDivToVisable = (displayDiv) => {
        setVisableDiv(displayDiv);
    };

    const [inputValue, setInputValue] = useState("");
    const [selectedValue, setSelectedValue] = useState("");
    const [isValidateValue, setIsValidateValue] = useState(true);

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
        var config = {
            method: "get",
            // url: `${endPoint}api/Attendence/GetSalaryDepartmentWiseFormData?date=${selectedDate}-01&sal_dept_id=${selectedValue.salary_value}`,
            url: `${endPoint}api/Attendence/GetEmployeeSalaryReport?first_date_month=${selectedDate}-01&employee_id=${selectedValue.value}`,

            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
            },
        };

        await axios(config)
            .then(function (response) {
                setAttendenceData(response.data);
                // let core_data = response.data.map((item) => {
                //     return {
                //         main_voucher_inv: item.main_voucher_inv,
                //         single_voucher_inv: item.single_voucher_inv,
                //         employee_name: item.employee_name,
                //         employee_code: item.employee_code,
                //         salary_type: item.salary_type,
                //         status: item.status,
                //         designationName: item.designationName,
                //         salary_id: item.salary_id,
                //         department_id: item.department_id,
                //         over_time: item.over_time,
                //         total_working_hour: item.total_working_hour,
                //         total_deduction: item.total_deduction,
                //         pm_salary: item.pm_salary,
                //         allowence_amount: item.allowence_amount,
                //         gross_salary: item.gross_salary,
                //         date: item.date,
                //         loan_deduction: item.loan_deduction,
                //         advance_deduction: item.advance_deduction,
                //         net_salary: item.net_salary,
                //         created_by: {
                //             user_id: item.created_by.user_id,
                //             UserName: item.created_by.UserName,
                //         }
                //     };

                // });

                setAttendenceDataCSV([
                    // ...core_data,
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
            {isLoading ? (
                <>
                    <Loader />
                </>
            ) : isError ? <div> <div className="x_panel text-center"><div className="">No record for this date</div></div></div> : (

                <>
                    <div
                        className={`container-fluid page-title-bar ${showNavMenu == false ? "right_col-margin-remove" : ""
                            }   `}
                    >
                        <span>&nbsp;Employee Salary Report</span>

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
                                                        {isValidateValue === false && Number(selectedDate) === 0 && <span className="text-danger">First Select Date </span>}

                                                    </div>
                                                </div>

                                                <label className="col-form-label col-md-2 col-sm-2 label-align">
                                                    Select Employee <span className="required">*</span>
                                                </label>
                                                <div className="col-md-3 col-sm-3">
                                                    <div>
                                                        <Select
                                                            placeholder={"Select Employee"}
                                                            // getOptionLabel={(e) => e.label}
                                                            // getOptionValue={(e) => e.value}
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
                                                    setAttendenceData = attendenceData
                                                    setisLoading(true);
                                                }
                                                // setfromDate(dateFrom);
                                                // settoDate(dateTo);

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
                                        <SalaryReportReciept
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

export default SalaryReport;
