import React,{useState} from 'react'
import { useSelector } from "react-redux";
// import ReactToPrint from 'react-to-print'
import { useNavigate } from "react-router-dom";
import CustomInnerHeader from '../../Components/CustomInnerHeader';
import Select from 'react-select'
const Purchase = () => {
    const showNavMenu = useSelector((state) => state.NavState);
    var day = new Date().toLocaleDateString(undefined, { day: "2-digit" });
    var month = new Date().toLocaleDateString(undefined, { month: "2-digit" });
    var year = new Date().toLocaleDateString(undefined, { year: "numeric" });
    const dateToday = `${year}-${month}-${day}`
    const [dateFrom, setDateFrom] = useState(dateToday)
    const [dateTo, setDateTo] = useState(dateToday)
    const navigate = useNavigate();
    const status = [{ label: 'All', value: 'all' }, { label: 'Pending', value: 'pending' }, { label: 'Purchased', value: 'purchased' }]
    const [GatepassInv, setGatepassInv] = useState([])
    const [isValidateOK, setIsValidateOK] = useState(true)
    const [isShowInv, setisShowInv] = useState(false)
     const [SearchInv, setSearchInv] = useState([])
    const [Status, setStatus] = useState('')
    var axios = require('axios');

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
console.log('hello');
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
                    </div>
                    {isShowInv && <div className="row">
                    <div className="col-md-5 ">
                        <div className="x_panel px-0">
                            <div className="x_content  ">
                                <div className="table-responsive" style={{ height: '400px', overflow: 'scroll' }}>
                                    <table className="table table-striped jambo_table bulk_action">
                                        <thead>
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
                                                        // onClick={() => GatePassReport(each_voucher_record.inward_gatepass_main_id)}
                                                    >
                                                        <div> <strong style={{ fontSize: '12px' }}> {each_voucher_record.voucher_date.slice(0, 10)}</strong></div>
                                                        <div> <strong style={{ fontSize: '12px' }}> {each_voucher_record.voucher_inv}</strong></div>
                                                    </td>
                                                    <td className='text-right pb-0 pt-1' >
                                                        <div> <strong style={{ fontSize: '12px' }}
                                                        //  onClick={() => GatePassReport(each_voucher_record.inward_gatepass_main_id)}
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