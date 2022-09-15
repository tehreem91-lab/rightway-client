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

const SalaryGeneration = () => {

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
                setAttendenceData(response.data);
                let core_data = response.data.map((item) => {
                    return {
                        employee_id: item.employee_id,
                        employee_code: item.employee_code,
                        employee_name: item.employee_name,
                        department_title: item.department_title,
                        designation_title: item.designation_title,
                        shift_title: item.shift_title,
                        shift_start_time: item.shift_start_time,
                        shift_end_time: item.shift_end_time,
                        in_date: item.in_date,
                        out_date: item.out_date,
                        total_hour: item.total_hour,
                        extra_hour: item.extra_hour,
                        entry_MachineInfo1_id: item.entry_MachineInfo1_id,
                        last_MachineInfo1_id: item.last_MachineInfo1_id,
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
                                            <div className="field item form-group col-md-6 col-sm-6">
                                                <label className="col-form-label col-md-3 col-sm-36 label-align">
                                                    {" "}
                                                    Select Department <span className="required">*</span>
                                                </label>
                                                <div className="col-md-8 col-sm-8">
                                                    <Select
                                                        placeholder={"All"}
                                                        getOptionLabel={(e) => e.department_name}
                                                        getOptionValue={(e) => e.department_id}
                                                        value={selectedValue}
                                                        options={inputOptions}
                                                        onChange={handleChange}
                                                        styles={customStyles}
                                                    />

                                                    {/* {validationState === false && dateFrom === "" && (
                                                        <span className="text-danger">First Select this </span>
                                                    )} */}

                                                    {/* // it shows fiscal year's initial value */}
                                                </div>
                                            </div>
                                            <div className="field item form-group col-md-6 col-sm-6">
                                                <label className="col-form-label col-md-3 col-sm-3 label-align">
                                                    {" "}
                                                    Select Date <span className="required">*</span>
                                                </label>
                                                <div className="col-md-8 col-sm-8">
                                                    <input
                                                        onChange={handleChangeDate}
                                                        placeholder="All Dates"
                                                        styles={customStyles}
                                                        className="form-control"
                                                        type="date"
                                                        value={date}
                                                    />
                                                    {/* {validationState === false && dateTo === "" && (
                                                        <span className="text-danger">First Select this </span>
                                                    )} */}
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
                                                // fetchLadger();
                                                // console.log({ LadgerData });
                                            }}
                                        >
                                            Show Report
                                        </button>
                                    </div>
                                </div>










                                <div className="x_panel  px-0 ">
                                    <div className="x_content my-3">
                                        <span className="section  px-2 ">
                                            <i className="fa fa-list"></i>&nbsp; Add Attachments
                                        </span>
                                        <div className="row">
                                            <div className="field item form-group col-md-6 col-sm-6">
                                                <label className="col-form-label col-md-3 col-sm-3 label-align">
                                                    {" "}
                                                    Select Attachments <span className="required">*</span>
                                                </label>
                                                <div className="col-md-10 col-sm-10">
                                                    <div className="col-md-10 col-sm-10  ">
                                                        <div className="row">
                                                            <div className="col-md-10 ">
                                                                <input
                                                                    ref={ref}
                                                                    type="file"
                                                                    className="form-control form-control-sm customStyleForInput"
                                                                    data-validate-length-range={6}
                                                                    data-validate-words={2}
                                                                    name="name"
                                                                    onChange={(e) => {
                                                                        setSelectedAttachmentName((e.target.files[0].name.split("."))[0])
                                                                        setSelectedAttachmentFile(e.target.files[0])
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="col-md-1  " style={{ paddingTop: "1.5px" }}>
                                                                {
                                                                    isFileUploadingModeOn ?
                                                                        <div className="spinner-border my-2 text-customOrange" role="status">
                                                                            <span className="sr-only">Loading...</span>
                                                                        </div> :
                                                                        <button
                                                                            disabled={ref?.current?.value === "" ? true : false}
                                                                            className="btn btn-sm btn-outline-success" onClick={() => UploadFile()} type="button"><i className="fa fa-upload"></i>
                                                                        </button>
                                                                }
                                                            </div>
                                                        </div>

                                                    </div>

                                                    {fileEntity.length !== 0 && <div className="field item form-group col-md-8 col-sm-8">
                                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Attachments</label>
                                                        <div className="col-md-12 col-sm-12 ">
                                                            {
                                                                fileEntity.map((each_attachment, index) => {
                                                                    return <button className="btn btn-sm  bg-customBlue  text-light">
                                                                        <a href={`${endPoint + each_attachment}`} target="_blank" rel="noopener noreferrer" className='text-light'>
                                                                            {((each_attachment.split("_"))[0]).slice(15)} {index + 1}</a>
                                                                        <i className="fa fa-times   text-light ml-1 " aria-hidden="true"
                                                                            onClick={() => {
                                                                                let arr_data = fileEntity.filter((each_image) => {
                                                                                    return (fileEntity.indexOf(each_image) !== index);
                                                                                });
                                                                                // setFileEntity(arr_data)
                                                                                //setReRender(!reRender)
                                                                            }}
                                                                        ></i>
                                                                    </button>
                                                                })
                                                            }
                                                        </div>
                                                    </div>}
                                                </div>

                                            </div>
                                            <div className="field item form-group col-md-6 col-sm-6">
                                                <label className="col-form-label col-md-3 col-sm-3 label-align">
                                                    {" "}
                                                    Remarks <span className="required">*</span>
                                                </label>
                                                <div className="col-md-8 col-sm-8">
                                                    <div>
                                                        <input
                                                            //onChange={handleChangeDate}
                                                            placeholder="Type your remarks"
                                                            styles={customStyles}
                                                            className="form-control"
                                                            type="text"
                                                        //alue={date}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* ///////////////////////For Downloadling Data/////////////////////////// */}
                                <div className="col-md-12 col-sm-12 pr-4" >

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

                                <div className="x_panel  px-0 ">
                                    <div className="x_content my-3">
                                        <div id="report">
                                            <div className="table-responsive px-3 pb-2 ">



                                                <table className="table ">
                                                    <thead>
                                                        <tr className="headings reportTableHead">
                                                            <th
                                                                className="column-title right-border-1 text-center " width="10%" >
                                                                Employee Code
                                                            </th>
                                                            <th className="column-title  right-border-1" width="10%" >
                                                                Employee Name
                                                            </th>
                                                            <th
                                                                className="column-title right-border-1 text-center " width="10%" >
                                                                Gross Salary
                                                            </th>
                                                            <th
                                                                className="column-title right-border-1 text-center " width="10%" >
                                                                Net Salary
                                                            </th>
                                                            <th
                                                                className="column-title right-border-1 text-center " width="10%" >
                                                                Benefits
                                                            </th>
                                                            <th
                                                                className="column-title right-border-1 text-center " width="10%" >
                                                                Overtime
                                                            </th>
                                                            <th
                                                                className="column-title right-border-1 text-center " width="10%" >
                                                                Advance
                                                            </th>
                                                            <th
                                                                className="column-title right-border-1 text-center " width="10%" >
                                                                Loan
                                                            </th>
                                                            <th
                                                                className="column-title right-border-1 text-center " width="10%" >
                                                                Paid Salary
                                                            </th>
                                                            <th
                                                                className="column-title right-border-1 text-center " width="10%" >
                                                                Presents
                                                            </th>
                                                            <th
                                                                className="column-title right-border-1 text-center " width="10%" >
                                                                Absents
                                                            </th>
                                                            <th
                                                                className="column-title right-border-1 text-center " width="10%" >
                                                                Leaves
                                                            </th>
                                                            {/* <th
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
                                                    </th> */}
                                                        </tr>
                                                    </thead>



                                                    {/* //////////////////////////Form Entries///////////////////////////////// */}
                                                    <tbody>
                                                        {attendenceData.map((item, index) => {
                                                            return (




                                                                <tr className="even pointer" key={index}>
                                                                    <td   > {item.employee_code}</td>
                                                                    <td   > {item.employee_name} </td>
                                                                    <td   > {item.department_title}</td>
                                                                    <td   > {item.designation_title}</td>
                                                                    <td   > {item.shift_title}</td>
                                                                    <td   > {item.shift_start_time?.slice(8, 19)}</td>
                                                                    <td   > {item.shift_end_time?.slice(8, 19)}</td>
                                                                    <td   >
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

                                                                    <td   >
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
                                                                    <td   > {item.total_hour}</td>
                                                                    <td   > {item.extra_hour}</td>
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

export default SalaryGeneration;
