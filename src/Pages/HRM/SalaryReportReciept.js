import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import ReactToPrint from "react-to-print";

const SalaryReportReciept = React.forwardRef(
    ({
        setSelectedAttachmentName,
        setSelectedAttachmentFile,
        isFileUploadingModeOn,
        UploadFile,
        fileEntity,
        customStyles,
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
        const componentRef = useRef();
        const [showAttachment, setshowAttachment] = useState(false);

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


        //let curent_balance = LadgerData;

        return (
            <div>

                <div className="x_panel  px-0 ">
                    <div className="x_content my-3">
                        <span className="section pb-0">
                            <div className="row px-2 ">
                                <div className="col-3  pt-3">
                                    <i className='fa fa-list'></i>&nbsp;Report
                                </div>
                                <div className="col-9 text-right ">
                                    <ul className="nav navbar-right panel_toolbox d-flex justify-content-end">

                                        <li>
                                            <ReactToPrint
                                                trigger={() => {
                                                    return (
                                                        <button
                                                            className="btn btn-sm btn-customOrange my-2 pt-1 borderRadiusRound" title="Print"
                                                        >
                                                            <i className="fa fa-print"></i>
                                                        </button>
                                                    );
                                                }}
                                                content={() => componentRef.current}
                                                documentTitle="new docs"
                                                pageStyle="print"
                                            />
                                        </li>
                                        <li>
                                            <button
                                                className="btn btn-sm btn-customOrange my-2 pt-1 borderRadiusRound"
                                                data-toggle="tooltip" data-placement="top" title="Download as PDF"
                                                onClick={downloadPdf}
                                            ><i className="fa fa-file-pdf-o" aria-hidden="true"></i>
                                            </button>
                                        </li>

                                        <li>
                                            <button
                                                className="btn btn-sm btn-customOrange my-2 pt-1 borderRadiusRound"
                                                data-toggle="tooltip" data-placement="top" title="View Attachments"
                                                onClick={() => setshowAttachment(!showAttachment)}
                                            >
                                                <i className="fa fa-paperclip" aria-hidden="true"></i>
                                            </button>
                                        </li>

                                    </ul>
                                </div>
                            </div>
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

                        {
                            showAttachment && <>
                                {
                                    <div className="row">
                                        <div className="col-md-12 px-5 bold-7 text-dark text-left" style={{ marginBottom: "10px" }}>
                                            Attachments : {
                                                attendenceData.attachments_paths !== "" ? attendenceData.attachments_paths?.split(',').map((each_file) => {
                                                    return <button className="btn btn-sm  bg-customBlue  text-light">
                                                        <a href={`${endPoint + each_file}`} target="_blank" rel="noopener noreferrer" className='text-light'>
                                                            {((each_file.split("_"))[0]).slice(15)}
                                                        </a></button>
                                                }) : "No Attachment Available "
                                            }
                                        </div>
                                    </div>
                                }
                            </>
                        }
                        {/* //////////////////////////Form Entries///////////////////////////////// */}
                        <div id="report" ref={componentRef}>
                            <div className="table-responsive px-3 pb-2 ">

                                <div className="row  mx-3 ">
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-5 bold-5   text-dark ">   Main Voucher No: </div>
                                            <div className="col-md-5  bold-6  text-dark "> {attendenceData?.main_voucher_inv} </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-5  bold-5  text-dark ">Single Voucher No:</div>
                                            <div className="col-md-5  bold-6  text-dark "> {attendenceData?.single_voucher_inv} </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-5  bold-5  text-dark ">Employee Code:</div>
                                            <div className="col-md-5  bold-6  text-dark "> {attendenceData?.employee_code}</div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-5  bold-5  text-dark ">Status:</div>
                                            <div className="col-md-5  bold-6  text-dark "> {attendenceData?.status} </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-5  bold-5  text-dark ">Employee Name:</div>
                                            <div className="col-md-5  bold-6  text-dark "> {attendenceData?.employee_name}</div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-5  bold-5  text-dark ">User Name:</div>
                                            <div className="col-md-5  bold-6  text-dark "> {attendenceData?.created_by?.UserName}</div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-5 bold-5     text-dark ">Salary Type: </div>
                                            <div className="col-md-5  bold-6   text-dark ">{attendenceData?.salary_type} </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-5 bold-5     text-dark "> Date: </div>
                                            <div className="col-md-5  bold-6   text-dark ">{attendenceData?.date} </div>
                                            {/* <div className="col-md-9  bold-6   text-dark " style={{ marginLeft: "-8px" }}>{attendenceData.date} </div> */}
                                        </div>
                                    </div>
                                </div>






                                {/* <div className="col-lg-5 col-sm-5" style={{ marginTop: "28px" }}>
                                    <table className="table">

                                        <tbody>
                                            <tr>
                                                <th className="headings reportTableHead border-bottom" width="20%">Overtime</th>
                                                <td>{attendenceData?.over_time}</td>
                                            </tr>
                                            <tr>
                                                <th className="headings reportTableHead border-bottom">Working Hours</th>
                                                <td>{attendenceData?.total_working_hour}</td>
                                            </tr>
                                            <tr>
                                                <th className="headings reportTableHead  border-bottom">Total Deductions</th>
                                                <td>{attendenceData?.total_deduction}</td>
                                            </tr>
                                            <tr>
                                                <th className="headings reportTableHead border-bottom">Primary Salary</th>
                                                <td>{attendenceData?.pm_salary}</td>
                                            </tr>
                                            <tr>
                                                <th className="headings reportTableHead  border-bottom">Allowence Amount</th>
                                                <td>{attendenceData?.allowence_amount}</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>

                                <div className="col-lg-5 col-sm-5" style={{ marginTop: "28px" }}>
                                    <table className="table">

                                        <tbody>

                                            <tr>
                                                <th className="headings reportTableHead border-bottom" width="20%">Gross Salary</th>
                                                <td>{attendenceData?.gross_salary}</td>
                                            </tr>
                                            <tr>
                                                <th className="headings reportTableHead  border-bottom">Loan Deductions</th>
                                                <td>{attendenceData?.loan_deduction}</td>
                                            </tr>
                                            <tr>
                                                <th className="headings reportTableHead border-bottom">Advance Deduction</th>
                                                <td>{attendenceData?.advance_deduction}</td>
                                            </tr>
                                            <tr>
                                                <th className="headings reportTableHead  border-bottom">Net Salary</th>
                                                <td>{attendenceData?.net_salary}</td>
                                            </tr>
                                            <tr>
                                                <th className="headings reportTableHead border-bottom">Working Hours</th>
                                                <td>{attendenceData?.total_working_hour}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div> */}




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
                            <div className="row mx-3  reportTableHead mt-2">

                                <div className="col-md-1 font-size-12  text-center  my-1 ">
                                    Overtime
                                </div>
                                <div className="col-md-1 font-size-12  text-center  my-1 ">
                                    Working Hours
                                </div>

                                <div className="col-md-2 font-size-12  text-center  my-1 ">
                                    Primary Salary
                                </div>
                                <div className="col-md-1 font-size-12  text-center  my-1 ">
                                    Allowence Amount
                                </div>
                                <div className="col-md-2 font-size-12  text-center  my-1 ">
                                    Gross Salary
                                </div>
                                <div className="col-md-1 font-size-12  text-center  my-1 ">
                                    Loan Deductions
                                </div>
                                <div className="col-md-1 font-size-12  text-center  my-1 ">
                                    Advance Deductions
                                </div>
                                <div className="col-md-1 font-size-12  text-center  my-1 ">
                                    Total Deductions
                                </div>
                                <div className="col-md-2 font-size-12  text-center  my-1 ">
                                    Net Salary
                                </div>

                            </div>

                            <div className="row mx-3  reportTableBody bottom-border-2">
                                <div className="col-md-1    font-size-12    py-1  right-border-2 pt-1  d-flex justify-content-center align-items-center ">
                                    {attendenceData?.over_time}
                                </div>
                                <div className="col-md-1    font-size-12    py-1  right-border-2 pt-1  d-flex justify-content-center align-items-center ">
                                    {attendenceData?.total_working_hour}
                                </div>

                                <div className="col-md-2    font-size-12  text-left  py-1 pt-1 right-border-2   d-flex justify-content-start align-items-center ">
                                    {attendenceData?.pm_salary}
                                </div>
                                <div className="col-md-1    font-size-12  text-left  py-1 pt-1 right-border-2   d-flex justify-content-start align-items-center ">
                                    {attendenceData?.allowence_amount}
                                </div>
                                <div className="col-md-2    font-size-12  text-left  py-1 pt-1 right-border-2   d-flex justify-content-start align-items-center ">
                                    {attendenceData?.gross_salary}
                                </div>
                                <div className="col-md-1    font-size-12  text-left  py-1 pt-1 right-border-2   d-flex justify-content-start align-items-center ">
                                    {attendenceData?.loan_deduction}
                                </div>
                                <div className="col-md-1    font-size-12  text-left  py-1 pt-1 right-border-2   d-flex justify-content-start align-items-center ">
                                    {attendenceData?.advance_deduction}
                                </div>
                                <div className="col-md-1    font-size-12  text-left  py-1 pt-1 right-border-2   d-flex justify-content-start align-items-center ">
                                    {attendenceData?.total_deduction}
                                </div>
                                <div className="col-md-2    font-size-12  text-left  py-1 pt-1 right-border-2   d-flex justify-content-start align-items-center ">
                                    {attendenceData?.net_salary}
                                </div>
                            </div>

                            <div className="row mx-3  reportTableBody bottom-border-2">

                                <div className="col-md-1    font-size-12   bold-6   py-1 pt-1     d-flex justify-content-start align-items-center ">  </div>
                                <div className="col-md-1    font-size-12    py-1    pt-1  d-flex justify-content-center align-items-center "> </div>
                                <div className="col-md-2    font-size-12  text-left  py-1 pt-1     d-flex justify-content-start align-items-center "></div>
                                <div className="col-md-1    font-size-12  text-left  py-1 pt-1     d-flex justify-content-start align-items-center "></div>
                                <div className="col-md-2    font-size-12  text-left  py-1 pt-1     d-flex justify-content-start align-items-center "></div>
                                <div className="col-md-1    font-size-12  text-left  py-1 pt-1     d-flex justify-content-start align-items-center "></div>
                                <div className="col-md-1    font-size-12  text-left  py-1 pt-1     d-flex justify-content-start align-items-center "></div>
                                <div className="col-md-1    font-size-12  text-left  py-1 pt-1     d-flex justify-content-start align-items-center "></div>
                                <div className="col-md-2    font-size-12  text-left  py-1 pt-1     d-flex justify-content-start align-items-center "></div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

export default SalaryReportReciept;
