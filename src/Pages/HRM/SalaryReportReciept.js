import React from "react";
import { useNavigate } from "react-router-dom";

const SalaryReportReciept = React.forwardRef(
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
        endPoint,
        postSalary }, ref) => {
        const navigate = useNavigate();
        //let curent_balance = LadgerData;

        return (
            <div>

                <div className="x_panel  px-0 ">
                    <div className="x_content my-3">
                        <span className="section  px-2 ">
                            <i className="fa fa-list"></i>&nbsp; Report Data
                        </span>



                        {/* //////////////////////////Form Structure///////////////////////////////// */}


                        {/* ///////////////////////For Downloadling Data/////////////////////////// */}

                        {/* <div className="col-md-12 col-sm-12 pr-4" >

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


                        {/* //////////////////////////Form Entries///////////////////////////////// */}
                        <div id="report">
                            <div className="table-responsive px-3 pb-2 ">

                                <div className="row  mx-3 ">
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-5 bold-5   text-dark ">   Main Voucher No: </div>
                                            <div className="col-md-5  bold-6  text-dark "> {attendenceData.main_voucher_inv} </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-5  bold-5  text-dark ">Single Voucher No:</div>
                                            <div className="col-md-5  bold-6  text-dark "> {attendenceData.single_voucher_inv} </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-5  bold-5  text-dark ">Employee Code:</div>
                                            <div className="col-md-5  bold-6  text-dark "> {attendenceData.employee_code}</div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-5  bold-5  text-dark ">Status:</div>
                                            <div className="col-md-5  bold-6  text-dark "> {attendenceData.status} </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-5  bold-5  text-dark ">Employee Name:</div>
                                            <div className="col-md-5  bold-6  text-dark "> {attendenceData.employee_name}</div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-5  bold-5  text-dark ">User Name:</div>
                                            <div className="col-md-5  bold-6  text-dark "> {attendenceData.created_by.UserName}</div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-5 bold-5     text-dark ">Salary Type: </div>
                                            <div className="col-md-5  bold-6   text-dark ">{attendenceData.salary_type} </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-5 bold-5     text-dark "> Date: </div>
                                            <div className="col-md-5  bold-6   text-dark ">{attendenceData.date} </div>
                                            {/* <div className="col-md-9  bold-6   text-dark " style={{ marginLeft: "-8px" }}>{attendenceData.date} </div> */}
                                        </div>
                                    </div>
                                </div>






                                <div className="col-lg-10 col-sm-10" style={{ marginTop: "28px" }}>
                                    <table class="table">

                                        <tbody>
                                            <tr>
                                                <th className="headings reportTableHead border-bottom" width="20%">Overtime</th>
                                                <td>{attendenceData.over_time}</td>
                                                {/* <td>Carter</td>
                                                <td>johncarter@mail.com</td> */}
                                            </tr>
                                            <tr>
                                                <th className="headings reportTableHead border-bottom">Working Hours</th>
                                                <td>{attendenceData.total_working_hour}</td>
                                            </tr>
                                            <tr>
                                                <th className="headings reportTableHead  border-bottom">Total Deductions</th>
                                                <td>{attendenceData.total_deduction}</td>
                                            </tr>
                                            <tr>
                                                <th className="headings reportTableHead border-bottom">Primary Salary</th>
                                                <td>{attendenceData.pm_salary}</td>
                                            </tr>
                                            <tr>
                                                <th className="headings reportTableHead  border-bottom">Allowence Amount</th>
                                                <td>{attendenceData.allowence_amount}</td>
                                            </tr>
                                            <tr>
                                                <th className="headings reportTableHead border-bottom">Gross Salary</th>
                                                <td>{attendenceData.gross_salary}</td>
                                            </tr>
                                            <tr>
                                                <th className="headings reportTableHead  border-bottom">Loan Deductions</th>
                                                <td>{attendenceData.loan_deduction}</td>
                                            </tr>
                                            <tr>
                                                <th className="headings reportTableHead border-bottom">Advance Deduction</th>
                                                <td>{attendenceData.advance_deduction}</td>
                                            </tr>
                                            <tr>
                                                <th className="headings reportTableHead  border-bottom">Net Salary</th>
                                                <td>{attendenceData.net_salary}</td>
                                            </tr>
                                            <tr>
                                                <th className="headings reportTableHead border-bottom">llWorking Hours</th>
                                                <td>{attendenceData.total_working_hour}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>



                                <table className="table ">
                                    {/* <thead>
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
                                                Monthly Salary
                                            </th>
                                            <th
                                                className="column-title right-border-1 text-center " width="10%" >
                                                Benefits Amount
                                            </th>
                                            <th
                                                className="column-title right-border-1 text-center " width="10%" >
                                                Overtime
                                            </th>
                                            <th
                                                className="column-title right-border-1 text-center " width="10%" >
                                                Working Hours
                                            </th>
                                            <th
                                                className="column-title right-border-1 text-center " width="10%" >
                                                Remarks
                                            </th>
                                            <th
                                                className="column-title right-border-1 text-center " width="10%" >
                                                Advance Deduction
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
                                                Holidays in Month
                                            </th>
                                            <th
                                                className="column-title right-border-1 text-center " width="10%" >
                                                Attachments
                                            </th>
                                            <th
                                                className="column-title right-border-1 text-center " width="10%" >
                                                Net Salary
                                            </th>
                                            <th
                                                className="column-title right-border-1 text-center " width="10%" >
                                                Advance Deduction
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
                                                Holidays in Month
                                            </th>
                                            <th
                                                className="column-title right-border-1 text-center " width="10%" >
                                                Attachments
                                            </th>
                                            <th
                                                className="column-title right-border-1 text-center " width="10%" >
                                                Net Salary
                                            </th>


                                        </tr>
                                    </thead> */}



                                    {/* //////////////////////////Form Entries///////////////////////////////// */}
                                    {/* <tbody>
                                        <tr className="even pointer" >
                                            <td   > {attendenceData.main_voucher_inv}</td>
                                            <td   > {attendenceData.single_voucher_inv} </td>
                                            <td   > {attendenceData.employee_name}</td>
                                            <td   > {attendenceData.employee_code}</td>
                                            <td   > {attendenceData.salary_type}</td>
                                            <td   > {attendenceData.status}</td>
                                            <td   > {attendenceData.department_id}</td>
                                            <td   > {attendenceData.over_time}</td>
                                            <td   > {attendenceData.total_working_hour}</td>
                                            <td   > {attendenceData.total_deduction}</td>
                                            <td   > {attendenceData.pm_salary}</td>
                                            <td   > {attendenceData.allowence_amount}</td>
                                            <td   > {attendenceData.gross_salary}</td>
                                            <td   > {attendenceData.date}</td>
                                            <td   > {attendenceData.loan_deduction}</td>
                                            <td   > {attendenceData.advance_deduction}</td>
                                            <td   > {attendenceData.net_salary}</td>
                                            <td   > {attendenceData.created_by.user_id}</td>
                                            <td   > {attendenceData.created_by.UserName}</td>
                                        </tr>
                                    </tbody> */}

                                </table>
                            </div>

                        </div>
                    </div>
                </div>

                {/* //////////////////////////Attachments///////////////////////////////// */}
                <div className="x_panel  px-0 ">
                    <div className="x_content my-3">
                        <div className="row">
                            <div className="field item form-group col-md-6 col-sm-6 w-50 p-3">
                                <label className="col-form-label col-md-3 col-sm-3 label-align">Attachments:</label>



                                {fileEntity.length !== 0 &&
                                    <div className="field item form-group col-md-8 col-sm-8">
                                        <div className="col-md-12 col-sm-12 ">
                                            {
                                                fileEntity.map((each_attachment, index) => {
                                                    return <button className="btn btn-sm  bg-customBlue  text-light">
                                                        <a href={`${endPoint + each_attachment}`}
                                                            src={`${URL}${attendenceData.attachments_paths?.slice(1, -1)}`}
                                                            target="_blank" rel="noopener noreferrer" className='text-light'>
                                                            {((each_attachment.split("_"))[0])?.slice(15)} {index + 1}</a>
                                                    </button>
                                                })
                                            }
                                        </div>
                                    </div>}
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        );
    }
);

export default SalaryReportReciept;
