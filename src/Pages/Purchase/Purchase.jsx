import React,{useState , useRef} from 'react'
import { useSelector } from "react-redux";
// import ReactToPrint from 'react-to-print'
import { useNavigate } from "react-router-dom";
import CustomInnerHeader from '../../Components/CustomInnerHeader';
import Select from 'react-select'
import ReactToPrint from 'react-to-print'
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
const Purchase = () => {
    const showNavMenu = useSelector((state) => state.NavState);
    var day = new Date().toLocaleDateString(undefined, { day: "2-digit" });
    var month = new Date().toLocaleDateString(undefined, { month: "2-digit" });
    var year = new Date().toLocaleDateString(undefined, { year: "numeric" });
    const dateToday = `${year}-${month}-${day}`
    const componentRef = useRef();
    const [dateFrom, setDateFrom] = useState(dateToday)
    const [dateTo, setDateTo] = useState(dateToday)
    const navigate = useNavigate();
    const status = [{ label: 'All', value: 'all' }, { label: 'Pending', value: 'pending' }, { label: 'Purchased', value: 'purchased' }]
    const [GatepassInv, setGatepassInv] = useState([])
    const [isValidateOK, setIsValidateOK] = useState(true)
    const [isShowInv, setisShowInv] = useState(false)
     const [SearchInv, setSearchInv] = useState([])
    const [Status, setStatus] = useState('')
    const [ReportData, setReportData] = useState()
    const [filearray, setfilearray] = useState([])
    const [flag, setflag] = useState(false);
    const [isShowVoucher, setisShowVoucher] = useState(false)
    var axios = require('axios');
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
      const PurchaseReport = (id) => {
        console.log(id);
        var config = {
            method: 'get',
            url: `http://rightway-api.genial365.com/api/PurchaseVoucher/GetPurchaseById?finance_main_id=${id}`,
            headers: {
                'Authorization': `bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`
            }
        };

        axios(config)
            .then(function (response) {

                setReportData(response.data[0])
                console.log(ReportData,'s;k');
                if (response.data?.attachments_paths)
                    setfilearray(response.data.attachments_paths.split(','))
                setisShowVoucher(true)


            })
            .catch(function (error) {

            });

    }
    const searchItem = (e) => {
        var allData = SearchInv;
        setGatepassInv(SearchInv);
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
        setGatepassInv(filteredData);
    };
    const showInv = () => {
        let ValidationOk = true;

        //  validation
        if (Status === "") {

            ValidationOk = false

        }
        setIsValidateOK(ValidationOk)
        if (ValidationOk === true) {
            var config = {
                method: 'get',
                // http://rightway-api.genial365.com/api/PurchaseVoucher/PurchaseHistory?dateFrom=09-09-2022&dateTo=02-10-2029&purchase_status=pending
                url: `http://rightway-api.genial365.com/api/PurchaseVoucher/PurchaseHistory?dateFrom=${dateFrom}T00:00:00.928Z&dateTo=${dateTo}T00:00:00.928Z&purchase_status=${Status}`,
                headers: {
                    'Authorization': `bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`
                }
            };

            axios(config)
                .then(function (response) {
                 console.log(response.data);
                    setisShowInv(true)
                    setGatepassInv(response.data)
                    setSearchInv(response.data)

                })
                .catch(function (error) {

                });

        }
    }
  return (
    <>
               <div className={`container-fluid page-title-bar ${showNavMenu == false ? "right_col-margin-remove" : ""}   `} >
                <CustomInnerHeader moduleName={"Purchase"} isShowSelector={true} />
            </div>
            <div role="main" style={{ padding: '0px' }} className={`right_col  h-100  heightFixForFAult${showNavMenu === false ?
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
                                            min="2022-07-27"
                                            className="form-control"
                                            type="date"
                                            onChange={(e) => setDateFrom(e.target.value)}

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
                                    Purchase Status
                                    </label>
                                    <div className="col-md-8 col-sm-6">

                                        <Select
                                            value={status.value}
                                            isSearchable={true}

                                            options={status}
                                            onChange={(e) => setStatus(e.value)}
                                        />
                                        {
                                            !isValidateOK && Status === "" && <span className="text-danger">First Select this </span>
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
                                                            className="btn btn-sm btn-customOrange my-2 pt-1 borderRadiusRound"
                                                            data-toggle="tooltip" data-placement="top" onClick={downloadPdf}
                                                        ><i className="fa fa-file-pdf-o" aria-hidden="true"></i>
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button
                                                            className="btn btn-sm btn-customOrange my-2 pt-1 borderRadiusRound"
                                                            data-toggle="tooltip" data-placement="top" title="Add New Record"
                                                            onClick={() => { navigate('/billinfoaccess') }}
                                                        >
                                                            <i className="fa fa-plus" aria-hidden="true"></i>
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button
                                                            className="btn btn-sm btn-customOrange my-2 pt-1 borderRadiusRound"
                                                            data-toggle="tooltip" data-placement="top" title="View Attachments"
                                                            onClick={() => { setflag(!flag) }}
                                                        >
                                                            <i className="fa fa-paperclip" aria-hidden="true"></i>
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button
                                                            className="btn btn-sm btn-customOrange my-2 pt-1 borderRadiusRound" title="Edit Record"
                                                            onClick={() => { navigate('/billinfoaccess', { state: { id: ReportData.finance_main_id,flag: true } }) }
                                                                }

                                                        >
                                                            <i className="fa fa-edit" ></i>
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </span>
                                    <div className="x_content my-3" id='report' ref={componentRef}>
                                        <h2> GatePass Report </h2>
                                        <div className="row">
                                            <div className="col-md-12 px-5 bold-7 text-dark ">
                                                {flag && <h6>Attachment: {ReportData.attachments ? (filearray?.map((file, i) => (<a key={i} target="_blank" className=" bg-customBlue text-light m-1 p-1">{i + 1}.   {file?.substring(file.indexOf("s") + 2, file.indexOf("_"))}</a>))) : "Not Available"}</h6>}
                                            </div></div>

                                        <div className="row row-1 mx-0 ">
                                            <div className="col-md-4 col-4">
                                                <div className="row row-1">
                                                    <div className="col-md-6 col-4 bold-5   text-dark ">   Voucher Inv: </div>
                                                    <div className="col-md-6 col-6  bold-6  text-dark "> {ReportData?.purchase_voucher} </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3 col-4">
                                                <div className="row row-1">
                                                    <div className="col-md-4 col-2 bold-5  text-dark ">Date:</div>
                                                    <div className="col-md-8 col-4 bold-6  text-dark "> {ReportData?.purchase_voucher_date.slice(0, 10)} </div>
                                                </div>
                                            </div>
                                            <div className="col-md-5 col-4">
                                                <div className="row row-1">
                                                    <div className="col-md-5  col-4 bold-5  text-dark ">Vehicle Number:</div>
                                                    <div className="col-md-7 col-7 bold-6  text-dark "> {ReportData?.vehicle_number}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row row-1 mx-1  reportTableHead mt-2">

                                            <div className="col-md-2 col-2 font-size-12  text-center  my-1 ">
                                               Item title
                                            </div>
                                            <div className="col-md-2  col-2 font-size-12  text-center  my-1 ">
                                                Item Code
                                            </div>
                                            <div className="col-md-2 col-2 font-size-12  text-center  my-1 ">
                                                Stock Unit name
                                            </div>
                                            <div className="col-md-2 col-2 font-size-12  text-center  my-1 ">

                                               Total Stock Piece
                                            </div>
                                            <div className="col-md-2 col-2 font-size-12  text-center  my-1 ">
                                               Stock Type
                                            </div>
                                            <div className="col-md-2 col-2 font-size-12  text-center  my-1 ">
                                               Quantity Debit
                                            </div>
                                        </div>
                                        {
                                            ReportData?.stock_entries?.length === 0 && <div className="row mx-1 row-1  reportTableBody bottom-border-2" style={{ cursor: "pointer" }}>
                                                <div className="col-md-12  col-12  font-size-12 bold-6   py-1 pt-1   text-center ">
                                                    <span className='text-center'> No Data Available</span>
                                                </div>
                                            </div>
                                        }{
                                            ReportData?.stock_entries?.map((each_entry, index) => {
                                                return <React.Fragment key={index}>
                                                    <div className="row mx-1 row-1  reportTableBody bottom-border-2">

                                                        <div className="col-md-2 text-left  col-2  font-size-12 bold-6   py-1 pt-1 right-border-2 left-border-2    ">
                                                            {each_entry?.item_title?.toUpperCase()}
                                                        </div>
                                                        <div className="col-md-2 text-right col-2  font-size-12    py-1  right-border-2 pt-1    ">
                                                            {each_entry?.item_code}
                                                        </div>
                                                        <div className="col-md-2  text-left col-2  font-size-12    py-1  right-border-2 pt-1    ">
                                                            {each_entry?.stock_unit_name}</div>
                                                        <div className="col-md-2  col-2 text-right font-size-12    py-1  right-border-2 pt-1    ">
                                                            {each_entry?.total_stock_piece}</div>
                                                        <div className="col-md-2  col-2 text-right font-size-12    py-1  right-border-2 pt-1    ">
                                                            {each_entry?.type_tilte}</div>
                                                        <div className="col-md-2 col-2 text-right  font-size-12    py-1  right-border-2 pt-1    ">
                                                            {each_entry?.quantity_debit
}</div>
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
                                        <thead  style={{position: 'sticky', top: '0',zIndex: '1'}}>
                                            <tr className="headings positionFixed">
                                                <th className="column-title   text-left" width="50%">Purchase Inv</th>
                                                <th className="column-title     text-right " width="50%"></th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                GatepassInv.length === 0 && <tr className="even pointer" style={{ cursor: "pointer" }}>
                                                    <td className='text-left pb-0 pt-1 text-center' colSpan={2}>
                                                        <span > No Data Available</span>
                                                    </td>
                                                </tr>
                                            }
                                            {GatepassInv.map((each_voucher_record, index) => {
                                                return <tr className="even pointer" style={{ cursor: "pointer" }} key={index}>

                                                    <td className='text-left pb-0 pt-1'
                                                         onClick={() => PurchaseReport(each_voucher_record.finance_main_id)}
                                                    >
                                                        <div> <strong style={{ fontSize: '12px' }}> {each_voucher_record.voucher_date.slice(0, 10)}</strong></div>
                                                        <div> <strong style={{ fontSize: '12px' }}> {each_voucher_record.voucher_inv}</strong></div>
                                                    </td>
                                                    <td className='text-right pb-0 pt-1' >
                                                        <div> <strong style={{ fontSize: '12px' }}
                                                         onClick={() => PurchaseReport(each_voucher_record.finance_main_id)}
                                                        >
                                                         <span className="badge bg-warning">{each_voucher_record.status || each_voucher_record.purchase_status}</span> 
                                                         {each_voucher_record.gate_pass_no}</strong> </div>
                                                        <div className='py-0'>
                                                            <span className='text-customOrange'>
                                                                <u onClick={() => { navigate('/billinfoaccess', { state: { id: each_voucher_record.finance_main_id,flag: true } }) }
                                                                }
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

export default Purchase