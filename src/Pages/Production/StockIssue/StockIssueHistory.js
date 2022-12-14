import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from "react-redux";
import ReactToPrint from 'react-to-print'
import { useNavigate } from "react-router-dom";
import CustomInnerHeader from '../../../Components/CustomInnerHeader';
import Select from 'react-select'
import { useLocation } from 'react-router-dom';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { CSVLink } from "react-csv";
const StockIssueHistory = () => {
    const location = useLocation();
    const [isValidateOK, setIsValidateOK] = useState(true)
    const navigate = useNavigate();
    const [flag, setflag] = useState(false);
    const [LadgerDataCSV, setLadgerDataCSV] = useState([{}]);
    const InvType = [{ label: 'All', value: '-1' }, { label: 'A Shift', value: '1' }, { label: 'B Shift', value: '2' },{ label: 'C Shift', value: '3' }]
    var day = new Date().toLocaleDateString(undefined, { day: "2-digit" });
    var month = new Date().toLocaleDateString(undefined, { month: "2-digit" });
    var year = new Date().toLocaleDateString(undefined, { year: "numeric" });
    const dateToday = `${year}-${month}-${day}`
    const showNavMenu = useSelector((state) => state.NavState);
    const componentRef = useRef();
    const [dateFrom, setDateFrom] = useState(dateToday)
    const [dateTo, setDateTo] = useState(dateToday)
    const [shift, setShift] = useState(-1)
    const [StockInv,setStockInv] = useState([])
    const [isShowVoucher, setisShowVoucher] = useState(false)
    const [isShowInv, setisShowInv] = useState(false)
    const [ReportData, setReportData] = useState({})
    const [SearchInv, setSearchInv] = useState([])
    const [filearray, setfilearray] = useState([])
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
    const StockReport = (id) => {
        var config = {
            method: 'get',
            url: `http://rightway-api.genial365.com/api/ProductionReports/GetStockIssueInv?shift_stock_issue_record_id=${id}`,
            headers: {
                'Authorization': `bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`
            }
        };

        axios(config)
            .then(function (response) {
               
                setReportData(response.data)
                if (response.data?.attachments)
                    setfilearray(response.data.attachments.split(','))
                setisShowVoucher(true)
                setLadgerDataCSV(
                    ReportData.job
                    .map((item, id) => {
       
                      return {
                        Sr: id+1,
                        job_number: item.job_number,
                        job_incharge: item.job_incharge,
                        product_name: item.product_name,
                        stock_issue_status: item.stock_issue_status,
                        
                       
        
                      };
                    })
                  );


            })
            .catch(function (error) {

            });

    }
 
    const headers = [
      { label: "  Sr", key: "Sr" },
        { label: "  Job Number", key: "job_number" },
        { label: "Job incharge", key: "job_incharge" },
        { label: "Product Name", key: "product_name" },
        { label: "Stock Issue Status", key: "stock_issue_status" },
       
        
    
      ];
      const csvReport = {
        filename: "LedgerReport.csv",
        headers: headers,
        data: LadgerDataCSV,
      };
    var axios = require('axios');
    const showInv = () => {
        let ValidationOk = true;

        //  validation
        if (shift === "") {

            ValidationOk = false

        }
        setIsValidateOK(ValidationOk)
        if (ValidationOk === true) {

            var config = {
                method: 'get',
                url: `                http://rightway-api.genial365.com/api/ProductionReports/GetStockIssueHistory?dateFrom=${dateFrom}&dateTo=${dateTo}&shift_id=${shift}
                `,
                headers: {
                    'Authorization': `bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`
                }
            };

            axios(config)
                .then(function (response) {
              
                    setisShowInv(true)
                   setStockInv(response.data)
                    setSearchInv(response.data)

                })
                .catch(function (error) {

                });

        }
    }
    const searchItem = (e) => {
        var allData = SearchInv;
       setStockInv(SearchInv);
        var filteredData = allData.filter((obj) => {
            var data = Object.keys(obj)
                .filter((key) => obj[key].toString().toLowerCase().includes(e))
                .reduce((cur, key) => {
                    return Object.assign(cur, { [key]: obj[key] });
                }, {});
            if (Object.keys(data).length !== 0) {
                return obj;
            }
        });
       setStockInv(filteredData);
    };
    useEffect(() => {

        if ((location?.state?.id) && (location?.state?.flag)) {
            StockReport(location?.state?.id)
        }

    }, [])

    return (
        <>
            <div className={`container-fluid page-title-bar ${showNavMenu == false ? "right_col-margin-remove" : ""}   `} >
                <CustomInnerHeader moduleName={"Stock Issue History"} isShowSelector={true} />
            </div>
            <div role="main" style={{ padding: '0px' }} className={`right_col  h-100  ${showNavMenu === false ?
                "right_col-margin-remove" : " "} `}>
                <div className="row">
                    <div className="col-md-5 ">
                        <div className="x_panel px-0">
                            <div className="x_content  ">
                                <span className="section pl-4">
                                    <i className="fa fa-list"></i>&nbsp;History
                                </span>
                                <div className="field item form-group">
                                    <label className="col-form-label col-md-4 col-sm-4   label-align px-0">
                                        Date From
                                    </label>
                                    <div className="col-md-8 col-sm-6">
                                        <input
                                            value={dateFrom}
                                          
                                            className="form-control"
                                            type="date"
                                            onChange={(e) => (e.target.value.slice(0,4)) >= 2022 ?  setDateFrom(e.target.value) :null}

                                        />
                                    </div>
                                </div>
                                <div className="field item form-group">
                                    <label className="col-form-label col-md-4 col-sm-4   label-align px-0">
                                        Date To
                                    </label>
                                    <div className="col-md-8 col-sm-6">
                                        <input
                                            value={dateTo}
                                            className="form-control"
                                            type="date"
                                            onChange={(e) => setDateTo(e.target.value)}

                                        />
                                    </div>
                                </div>
                                <div className="field item form-group">
                                    <label className="col-form-label col-md-4 col-sm-4   label-align px-0">
                                        Type
                                    </label>
                                    <div className="col-md-8 col-sm-6">

                                        <Select
                                          
                                            value={InvType.find(e => e.value == shift) || ''}
                                            isSearchable={true}

                                            options={InvType}
                                            onChange={(e) => setShift(e.value)}
                                        />
                                        {
                                            !isValidateOK && shift == "" && <span className="text-danger">First Select this </span>
                                        }
                                    </div>
                                </div>
                                <div className="field item form-group">
                                    <label className="col-form-label col-md-4 col-sm-4   label-align px-0">
                                        Search
                                    </label>
                                    <div className="col-md-8 col-sm-6">
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder='seach ...'
                                            onChange={(e) => searchItem(e.target.value)}
                                        />

                                    </div>
                                </div>

                                <div className="text-right">
                                    <button
                                        className="btn btn-customOrange btn-sm px-3 mt-2 mr-0"
                                        onClick={() => {
                                            showInv()

                                        }}
                                    >

                                        Search <i className="ml-2 fa fa-search"></i>
                                    </button></div></div></div>
                    </div>

                    {
                        isShowVoucher && <div className="col-md-7">
                            <div className="x_panel p-0">
                                <div className="x_content ">
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
                                                                        className="btn btn-sm btn-success my-2 pt-1 borderRadiusRound" title="Print Doc"
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
                                                            className="btn btn-sm btn-customOrange my-2 pt-1 mr-0 borderRadiusRound"
                                                            data-toggle="tooltip" data-placement="top" onClick={downloadPdf}
                                                        ><i className="fa fa-file-pdf-o" aria-hidden="true"></i>
                                                        </button>
                                                    </li>
                                                    <li><CSVLink {...csvReport}>
                    <button className="btn btn-sm bg-customBlue text-light borderRadiusRound my-1 mr-0"  title="Excel" >
                     
                     <i
                        className="fa fa-file-excel-o"
                        aria-hidden="true"
                      ></i>
                    </button>
                  </CSVLink>

                  </li>
                                                    <li>
                                                        <button
                                                            className="btn btn-sm btn-customOrange my-2 pt-1 borderRadiusRound"
                                                            data-toggle="tooltip" data-placement="top" title="Add New Record"
                                                            onClick={() => { navigate('/GatePassInward') }}
                                                        >
                                                            <i className="fa fa-plus" aria-hidden="true"></i>
                                                        </button>
                                                    </li>
                                                    {/* <li>
                                                        <button
                                                            className="btn btn-sm btn-customOrange my-2 pt-1 borderRadiusRound"
                                                            data-toggle="tooltip" data-placement="top" title="View Attachments"
                                                            onClick={() => { setflag(!flag) }}
                                                        >
                                                            <i className="fa fa-paperclip" aria-hidden="true"></i>
                                                        </button>
                                                    </li> */}
                                                    <li>
                                                        <button
                                                            className="btn btn-sm btn-customOrange my-2 pt-1 borderRadiusRound" title="Edit Record"
                                                            onClick={() => { navigate('/GatePassInward', { state: { id: ReportData.inward_gatepass_main_id, flag: true } }) }}
                                                        >
                                                            <i className="fa fa-edit" ></i>
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </span>
                                    <div className="x_content my-3" id='report' ref={componentRef}>
                                        <h2> Stock Report </h2>
                                        <div className="row">
                                            {/* <div className="col-md-12 px-5 bold-7 text-dark ">
                                                {flag && <h6>Attachment: {ReportData.attachments ? (filearray?.map((file, i) => (<a key={i} target="_blank" className=" bg-customBlue text-light m-1 p-1">{i + 1}.   {file?.substring(file.indexOf("s") + 2, file.indexOf("_"))}</a>))) : "Not Available"}</h6>}
                                            </div> */}
                                            </div>

                                        <div className="row row-1 mx-0 ">
                                            <div className="col-md-3 col-4">
                                                <div className="row row-1">
                                                    <div className="col-md-7 col-4 bold-5   text-dark ">  Shift Status: </div>
                                                    <div className="col-md-5 col-6  bold-6  text-dark "> {ReportData.shift_status} </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-4">
                                                <div className="row row-1">
                                                    <div className="col-md-7 col-2 bold-5  text-dark ">Incharge Name:</div>
                                                    <div className="col-md-5 col-4 bold-6  text-dark "> {ReportData.shift_inchage_name} </div>
                                                </div>
                                            </div>
                                            <div className="col-md-5 col-4">
                                                <div className="row row-1">
                                                    <div className="col-md-5  col-4 bold-5  text-dark ">Pass No:</div>
                                                    <div className="col-md-7 col-7 bold-6  text-dark "> {ReportData.shift_pass_no}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row row-1 mx-1  reportTableHead mt-2">
                                       
       
                                            <div className="col-md-2 col-2 font-size-12  text-center  my-1 ">
                                                Sr
                                            </div>
                                            <div className="col-md-3  col-3 font-size-12  text-center  my-1 ">
                                            Job Number
                                            </div>
                                            <div className="col-md-2 col-2 font-size-12  text-center  my-1 ">
                                            Job incharge
                                            </div>
                                            <div className="col-md-2 col-2 font-size-12  text-center  my-1 ">

                                            Product Name
                                            </div>
                                            <div className="col-md-3 col-3 font-size-12  text-center  my-1 ">
                                            Stock Issue Status
                                            </div>
                                            
                                        </div>
                                        {
                                            ReportData.job.length === 0 && <div className="row mx-1 row-1  reportTableBody bottom-border-2" style={{ cursor: "pointer" }}>
                                                <div className="col-md-12  col-12  font-size-12 bold-6   py-1 pt-1   text-center ">
                                                    <span className='text-center'> No Data Available</span>
                                                </div>
                                            </div>
                                        }{
                                            ReportData.job.map((each_entry, index) => {
                                                return <React.Fragment key={index}>
                                                    <div className="row mx-1 row-1  reportTableBody bottom-border-2">
                                                    <div className="col-md-2 text-left  col-2  font-size-12 bold-6   py-1 pt-1  left-border-2    ">
                                                            {index+1}
                                                        </div>
                                                        <div className="col-md-3 text-left  col-3  font-size-12 bold-6   py-1 pt-1 right-border-2 left-border-2    ">
                                                            {each_entry.job_number}
                                                        </div>
                                                        <div className="col-md-2 text-right col-2  font-size-12    py-1  right-border-2 pt-1    ">
                                                            {each_entry.job_incharge}
                                                        </div>
                                                        <div className="col-md-2  text-left col-2  font-size-12    py-1  right-border-2 pt-1    ">
                                                            {each_entry.product_name}</div>
                                                        <div className="col-md-3 col-3 text-right font-size-12    py-1  right-border-2 pt-1    ">
                                                            {each_entry.stock_issue_status}</div>
                                                    
                                                    </div>
                                                </React.Fragment>
                                            })
                                        }


                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                {isShowInv && <div className="row">
                    <div className="col-md-5 ">
                        <div className="x_panel px-0">
                            <div className="x_content  ">
                                <div className="table-responsive" style={{ height: '400px', overflow: 'scroll' }}>
                                    <table className="table table-striped jambo_table bulk_action">
                                        <thead style={{position: 'sticky', top: '0',zIndex: '1'}}>
                                            <tr className="headings positionFixed">
                                                <th className="column-title   text-left" width="50%">Stock Inv</th>
                                                <th className="column-title     text-right " width="50%"></th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                StockInv.length === 0 && <tr className="even pointer" style={{ cursor: "pointer" }}>
                                                    <td className='text-left pb-0 pt-1 text-center' colSpan={2}>
                                                        <span > No Data Available</span>
                                                    </td>
                                                </tr>
                                            }
                                            {StockInv.map((each_voucher_record, index) => {
                                                return <tr className="even pointer" style={{ cursor: "pointer" }} key={index}>

                                                    <td className='text-left pb-0 pt-1'
                                                        onClick={() => StockReport(each_voucher_record.shift_stock_issue_record_id)}
                                                    >
                                                        <div> <strong style={{ fontSize: '12px' }}> {each_voucher_record.date.slice(0, 10)}</strong></div>
                                                        <div> <strong style={{ fontSize: '12px' }}> {each_voucher_record.shift_name}</strong></div>
                                                    </td>
                                                    <td className='text-right pb-0 pt-1' >
                                                        <div> <strong style={{ fontSize: '12px' }} onClick={() => StockReport(each_voucher_record.shift_stock_issue_record_id)}>{each_voucher_record.shift_pass_no}</strong> </div>
                                                        <div className='py-0'>
                                                            <span className='text-customOrange'>
                                                                <u 
                                                                // onClick={() => { navigate('/GatePassInward', { state: { id: each_voucher_record.shift_stock_issue_record_id, flag: true } }) }
                                                                // }
                                                                > Edit</u>
                                                            </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </table>
                                </div></div></div>
                    </div></div>}
            </div>
        </>
    )
}

export default StockIssueHistory