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

const Attendance = () => {

    const showNavMenu = useSelector((state) => state.NavState);
    const [isLoading, setisLoading] = useState(false);
    const [accountList, setAccountList] = useState([{}]);
    const [accountListCSV, setAccountListCSV] = useState([{}]);
    const [reRender, setreRender] = useState(false);

    var day = new Date().toLocaleDateString(undefined, { day: "2-digit" });
    var month = new Date().toLocaleDateString(undefined, { month: "2-digit" });
    var year = new Date().toLocaleDateString(undefined, { year: "numeric" });
    const dateToday = `${year}-${month}-${day}`;
    const [date, setdate] = useState("2020-09-01T00:00:00");
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


    function difference(a, b) {

        return (Math.abs(a - b) / 36e5);
    }
    const fetchData = async () => {
        var config = {
            method: "get",
            url: `${endPoint}api/Departments`,
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token
                    }`,
            },
        };
        await axios(config)
            .then(function (response) {
                setInputOptions([
                    { department_name: "All", department_id: 0 },
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
            url: `${endPoint}api/Attendence/GetShiftWiseAttendenceReport?department_id=${e.department_id}&date=${date}`,
            //url: `${endPoint}api/Attendence/GetShiftWiseAttendenceReport?department_id=${e.department_id}&date=${e.date}`,
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
                        employee_id: item.employee_id,
                        employee_code: item.employee_code,
                        employee_name: item.employee_name,
                        in_date: item.in_date,
                        out_date: item.out_date,
                        entry_MachineInfo1_id: item.entry_MachineInfo1_id,
                        last_MachineInfo1_id: item.last_MachineInfo1_id,
                    };
                });
                setAccountListCSV([
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
        const updatedCode = accountList.map((item) => {
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

    ////////////////////////////For Downloading CSV Files////////////////////////////

    const headers = [
        { label: "Code", key: "employee_code" },
        { label: "Employee Name", key: "employee_name" },
        { label: "in_date", key: "in_date" },
        { label: "out_date", key: "out_date" },
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
                        <span>&nbsp;Manage Attendance</span>

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
                                            Select Department <span className="required">*</span>
                                        </label>
                                        <div className="col-md-3 col-sm-3">
                                            <div>
                                                <Select
                                                    placeholder={"All"}
                                                    getOptionLabel={(e) => e.department_name}
                                                    getOptionValue={(e) => e.department_id}
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
                                                    //     onChange={handleChange}
                                                    placeholder="All Dates"
                                                    styles={customStyles}
                                                    className="form-control"
                                                    type="date"
                                                    value={date}
                                                    //min="2022-09-09"
                                                    onChange={(e) => {
                                                        setdate(e.target.value);
                                                        fetchAllData();
                                                    }}
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
                                <div className="col-md-12 col-sm-12 pr-4" align="right">
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
                                        <table className="table table-striped jambo_table bulk_action ">
                                            <thead>
                                                <tr className="headings reportTableHead">
                                                    <th
                                                        className="column-title right-border-1 text-center "
                                                        width="10%"
                                                    >
                                                        {" "}
                                                        Employee Code{" "}
                                                    </th>
                                                    <th className="column-title  right-border-1">
                                                        Employee Name
                                                    </th>
                                                    <th
                                                        className="column-title right-border-1 text-center"
                                                        width="10%"
                                                    >
                                                        Date/Time In
                                                    </th>
                                                    <th className="column-title text-center right-border-1" width="10%">
                                                        Date/Time Out
                                                    </th>

                                                    <th className="column-title text-center" width="10%">
                                                        Total Time
                                                    </th>
                                                </tr>
                                            </thead>

                                            {/* //////////////////////////Form Entries///////////////////////////////// */}
                                            <tbody>
                                                {accountList.map((item, index) => {
                                                    return (
                                                        <tr className="even pointer" key={index}>
                                                            <td className=" "> {item.employee_code}</td>
                                                            <td className=" "> {item.employee_name} </td>
                                                            <td className="">
                                                                {" "}
                                                                <input
                                                                    type="datetime-local"
                                                                    value={item?.in_date}
                                                                    className="form-control border-none"
                                                                    disabled={visableDiv == "true" ? true : false}
                                                                    min="0"
                                                                    onKeyPress={(e) => preventMinus(e)}
                                                                    onChange={(e) => {
                                                                        let arr = accountList;
                                                                        let selected_index = arr.findIndex(
                                                                            (obj) =>
                                                                                obj.employee_id ==
                                                                                item.employee_id
                                                                        ); //it tells us about index of selected account in array of accountList

                                                                        arr[selected_index] = {
                                                                            ...arr[selected_index],
                                                                            in_date: e.target.value,
                                                                            //out_date: e.target.value,
                                                                        };

                                                                        setAccountList(arr);
                                                                        setreRender(!reRender);
                                                                        setindate(e.target.value);
                                                                    }}


                                                                />
                                                            </td>

                                                            <td className=" ">
                                                                {" "}
                                                                <input
                                                                    type="datetime-local"
                                                                    value={item?.out_date}
                                                                    className="form-control border-none"
                                                                    disabled={visableDiv == "true" ? true : false}
                                                                    min="0"
                                                                    onKeyPress={(e) => preventMinus(e)}
                                                                    onChange={(e) => {
                                                                        let arr = accountList;
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

                                                                        setAccountList(arr);
                                                                        setreRender(!reRender);
                                                                        setoutdate(e.target.value);
                                                                    }}


                                                                />
                                                            </td>
                                                            <td className=" ">

                                                                {/* { Math.abs({item?.out_date} - {item?.in_date}) / 36e5} 
                                                                {difference({ item.out_date }, { item.in_date })}  */}
                                                                difference({item?.out_date},{item?.in_date})

                                                            </td>
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
                                                        {accountList
                                                            .map((values) => {
                                                                return Number(values.in_date);
                                                            })
                                                            .reduce((a, b) => a + b, 0)}
                                                    </td>
                                                    <td>
                                                        {accountList
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

export default Attendance;
