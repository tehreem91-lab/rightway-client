import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from "react-redux";
import ReactToPrint from 'react-to-print'
import { useNavigate } from "react-router-dom";
import CustomInnerHeader from '../../Components/CustomInnerHeader';
import { useLocation } from 'react-router-dom';
import { toast } from "react-toastify";
const BillInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const ref = useRef();
  const [fileupload, setfileupload] = useState('')
  const [filearray, setfilearray] = useState([])
  const [entries, setentries] = useState([])
  const [isFileUploadingModeOn, setisFileUploadingModeOn] = useState(false)
  const showNavMenu = useSelector((state) => state.NavState);
  const [postData, setpostData] = useState({
    inward_gatepass_main_id: 0,
    purchase_voucher_date: 0,
    attachments_paths: "",
    description: "",
    stock_entries: [
      {
        finance_entries_id: 0,
        finance_sub_entries_id: 0,
        amount: 0
      }
    ]
  })
  const [data, setdata] = useState([])
  const publish = () => {
  
    var axios = require('axios');
    var data = JSON.stringify(postData);

    var config = {
      method: 'post',
      url: `http://rightway-api.genial365.com/api/PurchaseVoucher/PostPurchaseVoucher?finance_main_id=${location.state.id}`,
      headers: {
        'Authorization': `bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
  
        toast.success(
          "Record has been " +
          ("Added" + " successfully!")
      );
       navigate(-1)
      })
      .catch(function (error) {
      
      });

  }
  var axios = require('axios');
  const uploadFile = async (e) => {

    if (fileupload.name) {
      setisFileUploadingModeOn(true);
      let response_from_api = "";
      let data = new FormData();
      data.append("UploadedImage", fileupload);

      await axios.post(`http://rightway-api.genial365.com/api/FileUpload?file_name=${fileupload.name}`, data,).then(res => {
        if (res.status === 200) {

          ref.current.value = "";
          setisFileUploadingModeOn(false)
          response_from_api = res.data
          setfilearray([...filearray, res.data])
          setpostData({ ...postData, attachments_paths: [...filearray, response_from_api].toString() })
          setfileupload("")
        }

      })

    }
  }
  const fetchIdData = () => {
    var config = {
      method: 'GET',
      url: `http://rightway-api.genial365.com/api/PurchaseVoucher/GetPurchaseById?finance_main_id=${location.state.id}`,
      headers: {
        'Authorization': `bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`
      }
    };
    axios(config)
      .then(function (response) {
      

        setdata(response.data[0]);
        setentries(response.data[0].stock_entries)
        if (response.data[0]?.attachments_paths){
          setfilearray(response.data[0]?.attachments_paths?.split(','));
        }

      })

      .catch(function (error) {

      })

  }
  useEffect(() => {


    if ((location?.state?.id) && (location?.state?.flag)) {
      fetchIdData()

    }

  }, [])
  useEffect(() => {

    if (entries) {
      let entry = entries?.map((entry) => {

        return {
          finance_entries_id: entry.finance_entries_id,
          finance_sub_entries_id: entry.finance_sub_entries_id,
          amount: entry.amount * entry.total_stock_piece
        }

      })

      setpostData({

        inward_gatepass_main_id: data.inward_gatepass_main_id,
        purchase_voucher_date: data.purchase_voucher_date,
        attachments_paths: data.attachments_paths || '',
        description: data.description,
        stock_entries: entry,
      })

    }

  }, [data])
  return (
    <>
      <div className={`container-fluid page-title-bar ${showNavMenu == false ? "right_col-margin-remove" : ""}   `} >
        <CustomInnerHeader moduleName={"Bill Info"} isShowSelector={true} />
      </div>
      <div role="main" style={{ padding: '0px' }} className={`right_col  h-100  ${showNavMenu === false ?
        "right_col-margin-remove" : " "} `}>
        <div className="row">
          <div className="col-md-6 ">
            <div className="x_panel px-0">
              <div className="x_content  ">
                <div className="row px-2  bg-customBlue text-light m-1  ">
                  <div className="col-11 ">
                    <h2 >Bill Info</h2>
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-4 col-sm-4   label-align px-0">
                    Bilty No
                    <span className="required">*</span>
                  </label>
                  <div className="col-md-8 col-sm-6">
                    <input type="text" className="form-control" value={data.bilty_no} disabled/>
                    {/* {!isValidateAllStates && (JobData.customer_chart_id == "") && <span className="text-danger">First Select this </span>} */}
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-4 col-sm-4   label-align px-0">
                    Vehicle No
                    <span className="required">*</span>
                  </label>
                  <div className="col-md-8 col-sm-6">
                    <input type="text" className="form-control" value={data.vehicle_number} disabled />
                    {/* {!isValidateAllStates && (postData.InwardType == "") && <span className="text-danger">First Select this </span>} */}
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-4 col-sm-4   label-align px-0">
                    Purchase Date
                    <span className="required">*</span>
                  </label>
                  <div className="col-md-8 col-sm-6">
                    <input
                      type="date"
                      className="form-control"
                      data-validate-length-range={6}
                      data-validate-words={2}
                      value={data?.purchase_voucher_date?.slice(0, 10) || ''}
                      onChange={(e) => { setpostData({ ...postData, purchase_voucher_date: e.target.value }); setdata({ ...data, purchase_voucher_date: e.target.value }) }}
                    />

                    {/* {!isValidateAllStates && (JobData.customer_chart_id == "") && <span className="text-danger">First Select this </span>} */}
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-4 col-sm-4   label-align px-0">
                    Purchase Voucher
                    <span className="required">*</span>
                  </label>
                  <div className="col-md-8 col-sm-6">
                    <input type="text" className="form-control" value={data.purchase_voucher} disabled/>
                    {/* {!isValidateAllStates && (JobData.customer_chart_id == "") && <span className="text-danger">First Select this </span>} */}
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-4 col-sm-4   label-align px-0">
                    Description
                    {/* <span className="required">*</span> */}
                  </label>
                  <div className="col-md-8 col-sm-6">
                    <textarea className="form-control" value={postData.description} onChange={(e) => { setpostData({ ...postData, description: e.target.value }) }} />

                    {/* {!isValidateAllStates && (JobData.customer_chart_id == "") && <span className="text-danger">First Select this </span>} */}
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-4 col-sm-4   label-align px-0">
                    View/Edit Attachments
                    {/* <span className="required">*</span> */}
                  </label>
                  <div className="col-md-7 col-sm-6">
                    <input
                      type="file"
                      ref={ref} onChange={(e) => { setfileupload(e.target.files[0]) }}
                    />

                  </div>
                  <div className="col-md-1 col-sm-2 p-0">{
                    isFileUploadingModeOn ? <div className="spinner-border my-2 text-customOrange" role="status">
                      <span className="sr-only">Loading...</span>
                    </div> : (<button className="btn btn-sm btn-outline-primary" type="button" onClick={(e) => { uploadFile(e) }}><i className="fa fa-upload"></i></button>)}
                  </div>

                </div>
                <div className="field item form-group">

                  <div className="col-md-12 col-sm-6 text-center">
                    {/* {!isValidateAllStates && (postData.postDataattachments_paths == "") && <span className="text-danger">First Select this </span>} */}

                    {filearray?.map((file, i) => (<a key={i} target="_blank" className=" bg-customBlue text-light m-1 p-1">{i + 1}.   {file?.substring(file.indexOf("s") + 2, file.indexOf("_"))}<i className="fa fa-times" onClick={() => { setfilearray(filearray.filter((del, index) => (i !== index))); setpostData({ ...postData, postDataattachments_paths: postData.postDataattachments_paths.replace(`,${filearray[i]}`, '') }) }}></i></a>))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 ">
            {/* 
        <div className="x_panel px-0">
            <div className="x_content  ">
              <div className="row px-2  bg-customBlue text-light m-1  "></div> */}
            <div className="x_panel px-0">
              <div className="x_content  ">
                <div className="row px-2  bg-customBlue text-light m-1  ">
                  <div className="col-11 ">
                    <h2 >Gate Pass Info</h2>
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-4 col-sm-4   label-align px-0">
                    Gate Pass Voucher<span className="required">*</span>
                  </label>
                  <div className="col-md-8 col-sm-6">
                    <input type="text" className="form-control" value={data.gate_pass_voucher} disabled/>
                    {/* {!isValidateAllStates && (postData.vehicle_no == "") && <span className="text-danger">First Select this </span>} */}
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-4 col-sm-4   label-align px-0">
                    Party Name
                    {/* <span className="required">*</span> */}
                  </label>
                  <div className="col-md-8 col-sm-6">
                    <input type="text" className="form-control" value={data.party_info?.account_name} disabled />
                    {/* {!isValidateAllStates && (postData.drive_name == "") && <span className="text-danger">First Select this </span>} */}
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-4 col-sm-4   label-align px-0">
                    Address
                    {/* <span className="required">*</span> */}
                  </label>
                  <div className="col-md-8 col-sm-6">
                    <input type="text" className="form-control" value={data.party_info?.address} disabled />
                    {/* {!isValidateAllStates && (postData.driver_cell == "") && <span className="text-danger">First Select this </span>} */}
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-4 col-sm-4   label-align px-0">
                    Cell No
                    {/* <span className="required">*</span> */}
                  </label>
                  <div className="col-md-8 col-sm-6">
                    <input type="text" className="form-control" value={data.party_info?.cell} disabled />
                    {/* {!isValidateAllStates && (postData.driver_cell == "") && <span className="text-danger">First Select this </span>} */}
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-4 col-sm-4   label-align px-0">
                    Voucher Date
                    <span className="required">*</span>
                  </label>
                  <div className="col-md-8 col-sm-6">
                    <input
                      type="date"
                      className="form-control"
                      data-validate-length-range={6}
                      data-validate-words={2}
                      disabled
                      value={data?.gate_pass_voucher_date?.slice(0, 10) }
                    />

                    {/* {!isValidateAllStates && (JobData.customer_chart_id == "") && <span className="text-danger">First Select this </span>} */}
                  </div>
                </div>




              </div></div>
          </div>






        </div>
        <div className="row">
          <div className="col-md-12 "><div className="x_panel px-0">
            <div className="x_content  ">
              <div className="field item form-group" style={{ overflow: 'scroll' }}  >
                <table className="table table-striped"   >
                  <thead >
                    <tr className="bg-customBlue text-light">
                      <th scope="col" width='5%'>SR </th>
                      <th scope="col" width='5%'>Type </th>
                      <th scope="col">Product/Commodity </th>
                      <th scope="col" width='15%'>Product Code </th>
                      <th scope="col" width='6%'>Unit </th>
                      <th scope="col">Pieces</th>
                      <th scope="col" width='13%'>Total Weight </th>
                      <th scope="col">Rate </th>
                      <th scope="col">Amount </th>
                      <th scope="col">Narration</th>



                    </tr>
                  </thead>

                  <tbody >
                    {entries?.map((item, id) => (
                      <tr >

                        <td> {id + 1}</td>
                        <td > {item.type_tilte}</td>
                        <td >{item.item_title} </td>
                        <td >{item.item_code}  </td>
                        <td> {item.stock_unit_name}</td>
                        <td>{item.total_stock_piece}</td>
                        <td> {item.total_stock_piece}</td>
                        <td ><input type="Number" min="0" className="form-control" value={item.amount}
                          onChange={(e) => {
                            let entry = [...postData.stock_entries];
                            entry[id].amount = item.total_stock_piece * e.target.value

                            setpostData({ ...postData, stock_entries: entry })
                            let rec = [...entries];

                            rec[id].amount = postData?.stock_entries[id]?.amount / item.total_stock_piece

                            setentries(rec)
                           
                          }}


                        /></td>


                        <td><input type="Number" min="0" className="form-control" value={postData?.stock_entries[id]?.amount}

                          onChange={(e) => {
                            let entry = [...entries];
                            entry[id].amount = e.target.value / item.total_stock_piece

                            setentries(entry)
                            let rec = [...postData.stock_entries];
                            rec[id].amount = item.total_stock_piece * item.amount

                            setpostData({ ...postData, stock_entries: rec })
                    

                          }}
                        /></td>
                        <td > </td>
                      </tr>
                    ))}
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>

                      <td colSpan='2'><b>Total Weight:</b></td>
                      <td >{entries.map(data => data.amount).reduce((prev, curr) => prev + curr, 0).toFixed(2)}
                      </td>

                      <td></td>
                      <td></td>

                    </tr>
                    <tr><td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>

                      <td><b>Sub Total:
                      </b></td>
                      <td><b>{postData?.stock_entries.map(data => data.amount).reduce((prev, curr) => prev + curr, 0).toFixed(2)}
                      </b></td>

                    </tr>




                  </tbody>
                </table>

              </div>
              <div className="col-md-12 ">



                <button className="btn btn-primary  x_footer" style={{ float: 'right' }} type="submit" onClick={publish} disabled={isFileUploadingModeOn}>
                  Update & Publish
                </button>


              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BillInfo