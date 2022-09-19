import React from "react";
import { useNavigate } from "react-router-dom";

const SalaryGenReciept = React.forwardRef(
    ({
        setSelectedAttachmentName,
        setSelectedAttachmentFile,
        isFileUploadingModeOn,
        UploadFile,
        fileEntity,
        customStyles,
        downloadPdf,
        CSVLink,
        csvReport,
        attendenceData,
        setAttendenceData,
        visableDiv,
        preventMinus,
        setreRender,
        reRender,
        setindate,
        setoutdate,
        endPoint }, ref) => {
        const navigate = useNavigate();
        //let curent_balance = LadgerData;

        return (
            <div>

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
                <div className="col-md-12 text-right x_footer">
                    <button
                        className="btn btn-dark"
                        type="submit"
                        onClick={() => {
                        }}
                    >
                        Generate Report
                    </button>
                </div>
            </div>
        );
    }
);

export default SalaryGenReciept;
