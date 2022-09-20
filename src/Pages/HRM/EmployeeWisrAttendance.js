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
const EmployeeWiseAttendance = () => {

    const showNavMenu = useSelector((state) => state.NavState);
    const [isLoading, setisLoading] = useState(false);
    const [attendenceData, setAttendenceData] = useState([{}]);
    const [attendenceDataCSV, setAttendenceDataCSV] = useState([{}]);
    const [reRender, setreRender] = useState(false);

    var day = new Date().toLocaleDateString(undefined, { day: "2-digit" });
    var month = new Date().toLocaleDateString(undefined, { month: "2-digit" });
    var year = new Date().toLocaleDateString(undefined, { year: "numeric" });
    const dateToday = `${year}-${month}-${day}`;
    // const [date, setdate] = useState("2020-09-01T00:00:00");
    const [selectedDate, setSelectedDate] = useState("2020-09-01");
    const [indate, setindate] = useState();
    const [outdate, setoutdate] = useState();

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

    const handleChangeDate = (value) => {
        setSelectedDate(value);
        fetchAllData(value);
    };
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
            url: `${endPoint}api/Attendence/GetEmployeeAttendenceReport?employee_id=${e.value}&date=${selectedDate}`,
            //url: `${endPoint}api/Attendence/GetShiftWiseAttendenceReport?department_id=${e.department_id}&date=${e.date}`,
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
                        employee_code: "",
                        employee_name: "Total",
                        in_date: response.data.map((e) => e.in_date).reduce((a, b) => a + b, 0),
                        out_date: response.data
                            .map((e) => e.out_date)
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
                console.log("Error Ageya!")
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


    // const editBalance = () => {
    //     var axios = require('axios');
    //     const updatedCode4post = attendenceData.filter((item) => {
    //         if ((item.in_date != null && item.out_date != null) || (item.in_date != null && item.out_date == null) || (item.in_date == null && item.out_date != null))
    //             // if (item.in_date != null && item.out_date != null)
    //             return {
    //                 "employee_id": item.employee_id,
    //                 "entry_MachineInfo1_id": item.entry_MachineInfo1_id,
    //                 "last_MachineInfo1_id": item.last_MachineInfo1_id,
    //                 "in_time": item.in_date,
    //                 "out_time": item.out_date,
    //             }

    //         else {
    //             console.log("Errorlalala")
    //         }

    //     });

    //     const updatedCode = updatedCode4post.map((item) => {
    //         return {
    //             "employee_id": item.employee_id,
    //             "entry_MachineInfo1_id": item.entry_MachineInfo1_id,
    //             "last_MachineInfo1_id": item.last_MachineInfo1_id,
    //             "in_time": item.in_date,
    //             "out_time": item.out_date,
    //         };
    //     });

    //     var data = JSON.stringify({
    //         "attendence_record": updatedCode
    //     });

    //     var config = {
    //         method: 'put',
    //         url: `${endPoint}api/Attendence/UpdateShiftWiseAttendenceReport?date=${date}`,
    //         headers: {
    //             'Authorization': 'Bearer 6MXIGHVUI8s-yesABITtSioEralCZMzBAhaF28RLWWEVRyZkwG8XylzdbrsUSZTlV4dgz1-q8qq0xPk7zB5qOd75eOM3qjG1CLH88Q1tJZ2B6CosyGuWXC64jc7tKfXn_HPcRdk7vRd_no0dAeA84hADK7GmHeoyukfBjIl0n6PVtd4Oz09ZqEg6SX8L4U58LmnMz-eK-c7YoJwzzT_0L7qESohelJ-mWvaf04I7UfNbtlumqUyv8uWfdOQQY82h3eTGHACJ9NMvywcs438ok-Xwg2QVy-H0n21sfvIR4_oxRjai4XskDIYmcoNNTFHaFc-UdFKEWp37n9SVcFhmNLgaIP0s5RwHzhGOCkF5t40fBp2Lu1LCHN5JjmAdaJkYIFotuHoXLYrqRBeBCGKf0nfr7c_XmpdBgphX98bhP_ewKfK609MYelsYM4PpBmbxb_aARrDu46TDY45IPW3NhC_Tf9aNux_nBeWiOctGpipM-aKgZoGZlZR09T20ke1uBd_bYdhxEq83S5tHL5OqbQ',
    //             'Content-Type': 'application/json'
    //         },
    //         data: data
    //     };

    //     axios(config)
    //         .then(function (response) {
    //             console.log(JSON.stringify(response.data));
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });

    // };

    ////////////////////////////For Downloading CSV Files////////////////////////////

    const headers = [
        { label: "Date", key: "Date" },
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
                        <span>&nbsp;Employee Monthly Attendance</span>

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
                                            <i className="fa fa-list"></i>&nbsp;Listing
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
                                                    placeholder={"All"}
                                                    getOptionLabel={(e) => e.label}
                                                    getOptionValue={(e) => e.value}
                                                    value={selectedValue}
                                                    options={inputOptions}
                                                    onChange={handleChange}
                                                    styles={customStyles}
                                                />
                                            </div>
                                        </div>

                                        <label className="col-form-label col-md-2 col-sm-2 label-align">
                                            Select Date <span className="required">*</span>
                                        </label>
                                        <div className="col-md-3 col-sm-3">
                                            <div>
                                                <input
                                                    // type="date"
                                                    //     //getOptionLabel={(e) => e.department_name}
                                                    //     //getOptionValue={(e) => e.department_id}
                                                    //     value={selectedValue}
                                                    //     options={inputOptions}
                                                    onChange={handleChangeDate}
                                                    //placeholder="All Dates"
                                                    styles={customStyles}
                                                    className="form-control"
                                                    type="month"
                                                //value={selectedDate}
                                                //min="2022-09-09"
                                                // onChange={(e) => {
                                                //     setdate(e.target.value);
                                                //     fetchAllData();
                                                // }}
                                                />
                                            </div>
                                        </div>


                                        <div className="col-md-2 col-sm-2" align="right">
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
                                                    Update
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* ///////////////////////For Downloadling Data/////////////////////////// */}
                                <div className="col-md-12 col-sm-12 pr-4" >

                                    {/* <button type="button" className="btn btn-outline-success" align="left">Present</button> */}
                                    <button type="button" className="btn btn-danger" align="left">Absent</button>
                                    <button type="button" className="btn btn-warning" align="left">Incomplete</button>

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
                                </div>

                                {/* //////////////////////////Form Structure///////////////////////////////// */}
                                <div id="report">
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
                                                                    min="0"
                                                                    onKeyPress={(e) => preventMinus(e)}
                                                                    onChange={(e) => {
                                                                        let arr = attendenceData;
                                                                        let selected_index = arr.findIndex(
                                                                            (obj) =>
                                                                                obj.employee_id ==
                                                                                item.employee_id
                                                                        ); //it tells us about index of selected account in array of attendenceData

                                                                        arr[selected_index] = {
                                                                            ...arr[selected_index],
                                                                            in_date: e.target.value,
                                                                            //out_date: e.target.value,
                                                                        };

                                                                        //<span className="text-danger">First Select this </span>
                                                                        //(item.in_date == null || item.out_date == null) ? <span className="text-danger">First Select this </span> : <span className="text-danger">First Select this </span>
                                                                        setAttendenceData(arr);
                                                                        setreRender(!reRender);
                                                                        setindate(e.target.value);
                                                                    }}
                                                                />
                                                                {(attendenceData.at(item.in_date) == null || attendenceData.at(item.out_date) == null) ? <span className="text-danger">Please Select Both Dates </span> : ""}
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
                                                                        let arr = attendenceData;
                                                                        let selected_index = arr.findIndex(
                                                                            (obj) =>
                                                                                obj.employee_id ==
                                                                                item.employee_id
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
                                                            </td>
                                                            <td className={" " + ((item.in_date == null && item.out_date == null) ? ' bg-danger text-white' : (item.in_date == null || item.out_date == null) ? ' bg-warning text-white' : '')} > {item.total_hour}</td>
                                                            <td className={" " + ((item.in_date == null && item.out_date == null) ? ' bg-danger text-white' : (item.in_date == null || item.out_date == null) ? ' bg-warning text-white' : '')} > {item.extra_hour}</td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                            {/* <tfoot>
                                                <tr className="font-weight-bold">
                                                    <td></td>
                                                    <td className="col-md-12 col-sm-12" align="right">
                                                        Total:
                                                    </td>
                                                    <td>
                                                        {attendenceData
                                                            .map((values) => {
                                                                return Number(values.in_date);
                                                            })
                                                            .reduce((a, b) => a + b, 0)}
                                                    </td>
                                                    <td>
                                                        {attendenceData
                                                            .map((values) => {
                                                                return Number(values.out_date);
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
                    </div>
                </>
            )}
        </>
    );
};

export default EmployeeWiseAttendance;