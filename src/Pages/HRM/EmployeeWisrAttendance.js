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
import CustomInnerHeader from "../../Components/CustomInnerHeader.jsx";
import { useRef } from "react";
import ReactToPrint from "react-to-print";
const EmployeeWiseAttendance = () => {

    const showNavMenu = useSelector((state) => state.NavState);
    const [isLoading, setisLoading] = useState(false);
    const [isError, setisError] = useState(false);
    const [attendenceData, setAttendenceData] = useState([{}]);
    const [attendenceDataCSV, setAttendenceDataCSV] = useState([{}]);
    const [reRender, setreRender] = useState(false);
    const componentRef = useRef();


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

    const [selectedValue, setSelectedValue] = useState("");
    const [show, setShow] = useState(false);
    const [isValidateValue, setIsValidateValue] = useState(true);

    const [inputOptions, setInputOptions] = useState("");


    const updateFunct = (e) => {

        e.preventDefault();
        let is_form_validated = true;

        {
            attendenceData.map((item, index) => {

                if (Number(item.in_date) === 0 || Number(item.out_date) === 0) {
                    setIsValidateValue(false);
                    is_form_validated = false;
                }

                if (Number(item.in_date) != 0 && Number(item.out_date) != 0) {
                    setIsValidateValue(true);
                    is_form_validated = true;
                }
                console.log(Number(item.in_date), "in"); console.log(Number(item.out_date), "out");

            })
        }
        if (is_form_validated === true) {
            editBalance();
            setDivToVisable("true");
        }
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
                console.error(error);
            });
    };

    const fetchAllData = async (e) => {

        var config = {
            method: "get",
            //url: `${endPoint}api/Attendence/GetShiftWiseAttendenceReport?department_id=${selectedValue.value}&date=${selectedDate}`,
            url: `${endPoint}api/Attendence/GetEmployeeAttendenceReport?employee_id=${selectedValue.value}&date=${selectedDate}-01`,
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token
                    }`,
            },
        };

        await axios(config)
            .then(function (response) {
                setAttendenceData(response.data);
                let core_data = response.data.map((item) => {
                    return {
                        shift_title: item.shift_title,
                        shift_start_time: item.shift_start_time,
                        shift_end_time: item.shift_end_time,
                        in_date: item.in_date,
                        out_date: item.out_date,
                        total_hour: item.total_hour,
                        extra_hour: item.extra_hour,
                        entry_MachineInfo1_id: item.entry_MachineInfo1_id,
                        last_MachineInfo1_id: item.last_MachineInfo1_id,
                        Date: item.Date
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
                setisLoading(false);
                setisError(true);
                console.error(error);
            });
    };





    const editBalance = () => {

        const updatedCode4post = attendenceData.filter((item) => {
            // if ((item.in_date != null && item.out_date != null) || (item.in_date != null && item.out_date == null) || (item.in_date == null && item.out_date != null))
            if (item.in_date != null && item.out_date != null)
                return {
                    "employee_id": selectedValue.value,
                    "entry_MachineInfo1_id": item.entry_MachineInfo1_id,
                    "last_MachineInfo1_id": item.last_MachineInfo1_id,
                    "in_time": item.in_date,
                    "out_time": item.out_date,
                }

            else {
                // console.log("Error Ageya!")
                // toast.error("Enter correct values of both in & out time")
                //setIsValidateValue(false);
            }

        });

        const updatedCode = updatedCode4post.map((item) => {

            return {
                "employee_id": selectedValue.value,
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
            url: `${endPoint}api/Attendence/UpdateShiftWiseAttendenceReport?date=${selectedDate}`,
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token
                    }`,
            },
            data: data,
        };


        axios(config)
            .then(function (response) {
                toast.success(
                    "Employee updated successfully")
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
        // fetchAllData({ department_id: 0 });
        fetchData();
    }, []);

    return (

        <>
            <div
                className={`container-fluid page-title-bar ${showNavMenu == false ? "right_col-margin-remove" : ""
                    }   `}
            >
                <CustomInnerHeader moduleName="Employee Monthly Attendance" isShowSelector={true} />

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
                                    Select Month <span className="required">*</span>
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

                                        if (Number(selectedValue) === 0 || Number(selectedDate) === 0) {
                                            setIsValidateValue(false);
                                            is_form_validated = false;
                                        }

                                    }
                                    if (is_form_validated === true) {
                                        setAttendenceData([{}]);
                                        fetchAllData();
                                        setShow(true);
                                        setisLoading(true);
                                    }
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
                    ) : isError ? <div> <div className="x_panel text-center"><div className="x_content">No Employee record for this date</div></div></div> : (

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

                                                    <div className="col-md-9 col-sm-9" align="right">
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
                                                            <div>

                                                                <button
                                                                    className="btn btn-primary fa fa-save pl-3"
                                                                    type="submit"
                                                                    // onClick={() => {
                                                                    //     editBalance();
                                                                    //     setDivToVisable("true");
                                                                    // }}
                                                                    onClick={(e) => {
                                                                        updateFunct(e)
                                                                    }}
                                                                >
                                                                    Update
                                                                </button>
                                                                <button
                                                                    className="btn btn-dark fa fa-edit pl-3"
                                                                    type="button"
                                                                    onClick={(e) => {
                                                                        setAttendenceData([{}]);
                                                                        setDivToVisable("true");
                                                                        fetchAllData();
                                                                        setisLoading(true);
                                                                        setIsValidateValue(true);
                                                                        // <input disabled="false" />;
                                                                    }}
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="col-9 text-right "></div>
                                                </div>
                                            </span>

                                            {/* ///////////////////////For Downloadling Data/////////////////////////// */}
                                            <div className="col-md-12 col-sm-12 pr-4" > Color Indicators:
                                                <span class=" bg-danger text-white col-1 h-50 d-inline-block">Absent</span>
                                                <span class=" bg-warning text-dark col-1 h-50 d-inline-block">Incomplete</span>

                                                <ul className="mr-3 nav navbar-right panel_toolbox d-flex justify-content-end">
                                                    <div className="form-group col-md-3">

                                                        <ReactToPrint className="form-group col-md-3"
                                                            trigger={() => {
                                                                return (
                                                                    <button className="btn btn-sm btn-primary borderRadiusRound">
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
                                            </div>


                                            {/* //////////////////////////Form Structure///////////////////////////////// */}
                                            <div id="report" ref={componentRef}>
                                                <div className="table-responsive px-3 pb-2 ">
                                                    <table className="table ">
                                                        <thead>
                                                            <tr className="headings reportTableHead">

                                                                <th
                                                                    className="column-title right-border-1 text-center " width="10%" >
                                                                    Date
                                                                </th>
                                                                <th
                                                                    className="column-title right-border-1 text-center " width="10%" >
                                                                    Shift Name
                                                                </th>
                                                                <th
                                                                    className="column-title right-border-1 text-center " width="10%" >
                                                                    Shift Start Time
                                                                </th>
                                                                <th
                                                                    className="column-title right-border-1 text-center " width="10%" >
                                                                    Shift End Time
                                                                </th>
                                                                <th
                                                                    className="column-title right-border-1 text-center" width="10%">
                                                                    Date/Time In
                                                                </th>
                                                                <th className="column-title text-center right-border-1" width="10%">
                                                                    Date/Time Out
                                                                </th>
                                                                <th
                                                                    className="column-title right-border-1 text-center " width="10%" >
                                                                    Duty Time
                                                                </th>

                                                                <th className="column-title text-center" width="10%">
                                                                    Over Time
                                                                </th>
                                                            </tr>
                                                        </thead>




                                                        {/* //////////////////////////Form Entries///////////////////////////////// */}
                                                        <tbody>
                                                            {attendenceData.map((item, index) => {
                                                                return (
                                                                    <tr className="even pointer" key={index}>
                                                                        <td className={" " + ((item.in_date == null && item.out_date == null) ? ' bg-danger text-white' : (item.in_date == null || item.out_date == null) ? ' bg-warning text-white' : '')} > {item.Date?.slice(0, 10)}</td>
                                                                        <td className={" " + ((item.in_date == null && item.out_date == null) ? ' bg-danger text-white' : (item.in_date == null || item.out_date == null) ? ' bg-warning text-white' : '')} > {item.shift_title}</td>
                                                                        <td className={" " + ((item.in_date == null && item.out_date == null) ? ' bg-danger text-white' : (item.in_date == null || item.out_date == null) ? ' bg-warning text-white' : '')} > {item.shift_start_time?.slice(8, 19)}</td>
                                                                        <td className={" " + ((item.in_date == null && item.out_date == null) ? ' bg-danger text-white' : (item.in_date == null || item.out_date == null) ? ' bg-warning text-white' : '')} > {item.shift_end_time?.slice(8, 19)}</td>
                                                                        <td className={" " + ((item.in_date == null && item.out_date == null) ? ' bg-danger text-white' : (item.in_date == null || item.out_date == null) ? ' bg-warning text-white' : '')} >
                                                                            {" "}
                                                                            <input
                                                                                type="datetime-local"
                                                                                value={item?.in_date}
                                                                                className="form-control border-none"
                                                                                disabled={visableDiv == "true" ? true : false}
                                                                                onKeyPress={(e) => preventMinus(e)}
                                                                                onChange={(e) => {
                                                                                    const limit = new Date(`${item.Date}`)
                                                                                    const setDate = new Date(e.target.value)
                                                                                    if (setDate < limit) {
                                                                                        e.target.value = `${item.Date}`
                                                                                    }
                                                                                    let arr = attendenceData;
                                                                                    let selected_index = arr.findIndex(
                                                                                        (obj) =>
                                                                                            obj.Date ==
                                                                                            item.Date
                                                                                    ); //it tells us about index of selected account in array of attendenceData

                                                                                    arr[selected_index] = {
                                                                                        ...arr[selected_index],
                                                                                        in_date: e.target.value,
                                                                                        //out_date: e.target.value,
                                                                                    };


                                                                                    setAttendenceData(arr);
                                                                                    setreRender(!reRender);
                                                                                    setindate(e.target.value);
                                                                                }}
                                                                            />
                                                                            {isValidateValue === false && Number(item.in_date) === 0 && <span className="text-danger">First Select this </span>}



                                                                        </td>

                                                                        <td className={" " + ((item.in_date == null && item.out_date == null) ? ' bg-danger text-white' : (item.in_date == null || item.out_date == null) ? ' bg-warning text-white' : '')} >
                                                                            {" "}
                                                                            <input
                                                                                type="datetime-local"
                                                                                value={item?.out_date}
                                                                                className="form-control border-none"
                                                                                disabled={visableDiv == "true" ? true : false}
                                                                                min="0"
                                                                                onKeyPress={(e) => preventMinus(e)}
                                                                                onChange={(e) => {
                                                                                    let limit = new Date(`${item.Date}`)
                                                                                    limit = new Date(limit.setDate(limit.getDate() + 2))
                                                                                    const setDate = new Date(e.target.value)
                                                                                    if (setDate > limit) {
                                                                                        const month = limit.toLocaleDateString(undefined, { month: "2-digit" });
                                                                                        const year = limit.toLocaleDateString(undefined, { year: "numeric" });
                                                                                        const day = limit.toLocaleDateString(undefined, { day: "2-digit" });
                                                                                        const stringLimit = `${year}-${month}-${day}T00:00`
                                                                                        e.target.value = stringLimit
                                                                                    }
                                                                                    let arr = attendenceData;
                                                                                    let selected_index = arr.findIndex(
                                                                                        (obj) =>
                                                                                            obj.Date ==
                                                                                            item.Date
                                                                                    );
                                                                                    arr[selected_index] = {
                                                                                        ...arr[selected_index],
                                                                                        //in_date: e.target.value,
                                                                                        out_date: e.target.value,

                                                                                    };

                                                                                    setAttendenceData(arr);
                                                                                    setreRender(!reRender);
                                                                                    setoutdate(e.target.value);
                                                                                }}


                                                                            />
                                                                            {isValidateValue === false && Number(item.out_date) === 0 && <span className="text-danger">First Select this </span>}


                                                                        </td>
                                                                        <td className={" " + ((item.in_date == null && item.out_date == null) ? ' bg-danger text-white' : (item.in_date == null || item.out_date == null) ? ' bg-warning text-white' : '')} > {item.total_hour}</td>
                                                                        <td className={" " + ((item.in_date == null && item.out_date == null) ? ' bg-danger text-white' : (item.in_date == null || item.out_date == null) ? ' bg-warning text-white' : '')} > {item.extra_hour}</td>
                                                                    </tr>
                                                                );
                                                            })}
                                                        </tbody>
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
                                                    <div>

                                                        <button
                                                            className="btn btn-primary fa fa-save pl-3"
                                                            type="submit"
                                                            // onClick={() => {
                                                            //     editBalance();
                                                            //     setDivToVisable("true");
                                                            // }}
                                                            onClick={(e) => {
                                                                updateFunct(e)
                                                            }}
                                                        >
                                                            Update
                                                        </button>
                                                        <button
                                                            className="btn btn-dark fa fa-edit pl-3"
                                                            type="button"
                                                            onClick={(e) => {
                                                                setAttendenceData([{}]);
                                                                setDivToVisable("true");
                                                                fetchAllData();
                                                                setisLoading(true);
                                                                setIsValidateValue(true);
                                                                // <input disabled="false" />;
                                                            }}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                )}
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

export default EmployeeWiseAttendance;
