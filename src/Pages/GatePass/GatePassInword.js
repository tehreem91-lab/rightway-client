import React, { useState, useEffect,useRef } from 'react'
import { useSelector } from "react-redux";
import Select from 'react-select'
import { useLocation } from 'react-router-dom';
import CustomInnerHeader from '../../Components/CustomInnerHeader';
const GatePassInward = () => {
  const location = useLocation();
  const [isFileUploadingModeOn, setisFileUploadingModeOn]=useState(false)
  const ref = useRef();
  const showNavMenu = useSelector((state) => state.NavState);
  const [isValidateAllStates, setIsValidateAllStates] = useState(true)
  const [stockAccount, setstockAccount] = useState([])
  const [packetsDetails, setpacketsDetails] = useState([])
  const [info, setinfo] = useState([])
  const [GatePassInward, setgatePassInward] = useState()
  const [InwardType, setInwardType] = useState([{ label: 'Cmt', value: 'Cmt' }, { label: 'Purchase', value: 'Purchase' }])
  const [PartyInfo, setPartyInfo] = useState({})
  const [Partyname, setPartyname] = useState([])
  const [fileupload, setfileupload] = useState('')
  const [filearray, setfilearray] = useState([])
  const [PartyApi, setpartyApi] = useState([])
  const [stockEntries, setstockEntries] = useState([{
    stock_chart_id: 0,
    stock_unit_id: 0,
    pair_unit_id: 0,
    total_stock_pieces: 0,
    weight_per_piece: 0,
    tatal_weight: 0
  }])
 let Rent_type=[{ label: 'Included', value: 'Included' }, { label: 'Excluded', value: 'Excluded' }]
  var day = new Date().toLocaleDateString(undefined, { day: "2-digit" });
  var month = new Date().toLocaleDateString(undefined, { month: "2-digit" });
  var year = new Date().toLocaleDateString(undefined, { year: "numeric" });
  const dateToday = `${year}-${month}-${day}`
  const [GatePass, setGatePass] = useState({
    party_chart_id: 0,
    date: dateToday,
    vehicle_no: "",
    drive_name: "",
    driver_cell: "",
    rent_type: "",
    rent_amount: 0,
    bilty_no: "",
    inward_type: "",
    remarks: "",
    attachments: "",
    stock_entries: stockEntries
  })
  const delPacketitem = (idx) => {
    setstockEntries(stockEntries.filter((del, i) => (idx !== i + 1)))


  }
  const postdata = () => {
    setGatePass({ ...GatePass, stock_entries: stockEntries })
    let isValidationOk = true;

    //proDetails Validation

    // GatePass validation
    if (GatePass.party_chart_id == 0) {

      isValidationOk = false

    }
    if (GatePass.inward_type == "") {

      isValidationOk = false

    }
    // if (GatePass.drive_name == "") {

    //   isValidationOk = false
    // }
    if (GatePass.vehicle_no == "") {
      isValidationOk = false
    }
    // if (GatePass.driver_cell == "") {
    //   isValidationOk = false
    // }
    if (GatePass.rent_amount == 0) {

      isValidationOk = false
    }
    if (GatePass.rent_type == "") {

      isValidationOk = false
    }
    if (GatePass.builty_no == "") {

      isValidationOk = false
    }
    if (GatePass.inward_type == "") {

      isValidationOk = false
    }
    if (GatePass.attachments == "") {

      isValidationOk = false
    }
    // Stock Entry Validation
    if (stockEntries.stock_chart_id == 0) {

      isValidationOk = false
    }
    if (stockEntries.stock_unit_id == 0) {

      isValidationOk = false
    }
    if (stockEntries.pair_unit_id == 0) {

      isValidationOk = false
    }
    if (stockEntries.total_stock_pieces == 0) {

      isValidationOk = false
    }
    if (stockEntries.weight_per_piece == 0) {

      isValidationOk = false
    }
    if (stockEntries.tatal_weight == 0) {

      isValidationOk = false
    }

    setIsValidateAllStates(isValidationOk)
    console.log(isValidationOk);
    if (isValidationOk === true) {
      var data = JSON.stringify(GatePass);
      console.log(data);
      var config = {
        method: 'POST',
        url: 'http://rightway-api.genial365.com/api/GatePassInward/PostData',
        headers: {
          'Authorization': 'Bearer wMxdleUk-ZhHC2QAxte0dLEyHUnUGoKHNOdRalFYVYvLlWTMMgGNYyJEpa3WiyVdOipdhCUHc6-7U_07tsd8RPYMfcMU3DgAMeYVtiJSkI9LMJlq-mT0lwg94tYRhdnX9Dd1ui_uN0iyglhAz4CTygiHcrQKH0lzEhPZCRGO4qSpJjVuhYmZbnV_jLiP6q3WzbWL_uB9AvLSiKDmNysYVKMTw-sM0SzaTZ0QsQchpw6EigJ4Aat5mqHOV8KyuueTBZTVWOpYBR6r7ul1RK0IBfc2g8TpXIr4EbyyddKEFC8eprWIzNMOA8s-7TQoGUUZk3qQCGG8UgHzyX_mjzr6KD14CXVgS7T_gbUi9ELHIoYfgccorQbUN9v5ann4kQXpwYWjRsRkQnnrQk6uJrwRYe_rTBo374jtmW5opg77FgBRVTbXeUCaaNTdLFKs4grYCNzCk43tCUhV6-q7uUkgxU-BqpQcPrrJTHrruJMOgufR9KTfPrvUPlMC984k7LovM8pHTs-Dy9MwptZPQopGig',
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios(config)
        .then(function (response) {
   
          setGatePass({
            party_chart_id: 0,
            date: dateToday,
            vehicle_no: "",
            drive_name: "",
            driver_cell: "",
            rent_type: "",
            rent_amount: 0,
            bilty_no: "",
            inward_type: "",
            remarks: "",
            attachments: "",
            stock_entries: []
          })
          setfilearray([]);
          setPartyInfo([{cell: '', address: ''}])
          setstockEntries([{
            stock_chart_id: 0,
            stock_unit_id: 0,
            pair_unit_id: 0,
            total_stock_pieces: 0,
            weight_per_piece: 0,
            tatal_weight: 0
          }])
      

        })
        .catch(function (error) {


        });
    }

  }
  var axios = require('axios');
  const fetchData = (APIurl) => {
    var config = {
      method: 'GET',
      url: APIurl,
      headers: {
        'Authorization': 'Bearer wMxdleUk-ZhHC2QAxte0dLEyHUnUGoKHNOdRalFYVYvLlWTMMgGNYyJEpa3WiyVdOipdhCUHc6-7U_07tsd8RPYMfcMU3DgAMeYVtiJSkI9LMJlq-mT0lwg94tYRhdnX9Dd1ui_uN0iyglhAz4CTygiHcrQKH0lzEhPZCRGO4qSpJjVuhYmZbnV_jLiP6q3WzbWL_uB9AvLSiKDmNysYVKMTw-sM0SzaTZ0QsQchpw6EigJ4Aat5mqHOV8KyuueTBZTVWOpYBR6r7ul1RK0IBfc2g8TpXIr4EbyyddKEFC8eprWIzNMOA8s-7TQoGUUZk3qQCGG8UgHzyX_mjzr6KD14CXVgS7T_gbUi9ELHIoYfgccorQbUN9v5ann4kQXpwYWjRsRkQnnrQk6uJrwRYe_rTBo374jtmW5opg77FgBRVTbXeUCaaNTdLFKs4grYCNzCk43tCUhV6-q7uUkgxU-BqpQcPrrJTHrruJMOgufR9KTfPrvUPlMC984k7LovM8pHTs-Dy9MwptZPQopGig'
      }
    };


    (config.url == "http://rightway-api.genial365.com/api/GatePassInward/GetGatePassInv") ? (axios(config)
      .then(function (response) {
        setgatePassInward(response.data);


      })
      .catch(function (error) {
        console.log(error);
      })) : (config.url == "http://rightway-api.genial365.com/api/PartyInfo/GetPartyData") ?
      (axios(config)
        .then(function (response) {
          setpartyApi(response.data)
         
          const partyname = response.data.map((each_voucher) => {
            return {
              label: each_voucher.party_name,
              value: each_voucher.chart_id,

            }

          })

          setPartyname(partyname);


        })
        .catch(function (error) {

        })) : (
        axios(config)
          .then(function (response) {

            setinfo(response.data);
            const stock_account = response.data.map((each_voucher) => {
              return {
                label: each_voucher.stock_account.stock_account_label,
                value: each_voucher.stock_account.stock_account_value,
                unit: each_voucher.stock_account.stock_account_unit
              }

            })
            setstockAccount(stock_account);
          })

          .catch(function (error) {
            console.log(error);
          }))
  }
  const  fetchIdData=()=>{
    var config = {
      method: 'GET',
      url:`http://rightway-api.genial365.com/api/GatePassInward/GetGatePassById?gate_pass_main_id=${location.state.id}`,
      headers: {
        'Authorization': 'Bearer wMxdleUk-ZhHC2QAxte0dLEyHUnUGoKHNOdRalFYVYvLlWTMMgGNYyJEpa3WiyVdOipdhCUHc6-7U_07tsd8RPYMfcMU3DgAMeYVtiJSkI9LMJlq-mT0lwg94tYRhdnX9Dd1ui_uN0iyglhAz4CTygiHcrQKH0lzEhPZCRGO4qSpJjVuhYmZbnV_jLiP6q3WzbWL_uB9AvLSiKDmNysYVKMTw-sM0SzaTZ0QsQchpw6EigJ4Aat5mqHOV8KyuueTBZTVWOpYBR6r7ul1RK0IBfc2g8TpXIr4EbyyddKEFC8eprWIzNMOA8s-7TQoGUUZk3qQCGG8UgHzyX_mjzr6KD14CXVgS7T_gbUi9ELHIoYfgccorQbUN9v5ann4kQXpwYWjRsRkQnnrQk6uJrwRYe_rTBo374jtmW5opg77FgBRVTbXeUCaaNTdLFKs4grYCNzCk43tCUhV6-q7uUkgxU-BqpQcPrrJTHrruJMOgufR9KTfPrvUPlMC984k7LovM8pHTs-Dy9MwptZPQopGig'
      }
    };
    axios(config)
              .then(function (response) {
    setGatePass({party_chart_id: response.data.party_chart_id ,
      date: response.data.voucher_date.slice(0, 10),
      vehicle_no: response.data.vehicle_number,
      drive_name: response.data.driver,
      driver_cell: response.data.driver_cell ,
      rent_type: response.data.rent_type,
      rent_amount: response.data.rent_amount,
      bilty_no: response.data.bilty_no ,
      inward_type: response.data.inward_type,
      remarks: response.data.description,
      attachments: response.data.attachments ,
      stock_entries: response.data.stock_entries

    })
    setfilearray(response.data.attachments.split(','));
    
               
              })
    
              .catch(function (error) {
                console.log(error);
              })


  }
  const uploadFile = async (e) => {

    if(fileupload.name){
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

        setGatePass({ ...GatePass, attachments: [...GatePass.attachments, response_from_api].toString() })
        setfileupload("")
      }


    })

  }
  }
  useEffect(() => {
    fetchData('http://rightway-api.genial365.com/api/GatePassInward/GetGatePassInv')
    fetchData('http://rightway-api.genial365.com/api/PartyInfo/GetPartyData')
    fetchData('http://rightway-api.genial365.com/api/GatePassInward/GetStockOptions')

    if ((location?.state?.id) && (location?.state?.flag)) {
      fetchIdData(
          )

  }

  }, [])
  const handlePacket = (id, e) => {
   
    info.map((each_voucher) => {
      if (each_voucher.packets_details[0].chart_id == e.value) {

        let packetOptions = each_voucher.packets_details.map((data) => {
          return {
            label: data.packet_title,
            value: data.pair_base_unit,
            chartid: data.chart_id
          }
        })
        let data = [...packetsDetails];
        data[id] = packetOptions
        setpacketsDetails(data)
        const list = [...stockEntries];
        list[id].stock_chart_id = e.value;
        list[id].stock_unit_id = e.unit
        setstockEntries(list);
      }
    })
  }
  useEffect(() => {
    if(GatePass?.party_chart_id)
    setPartyInfo(PartyApi.filter(data => data.chart_id == GatePass.party_chart_id)); 

  }, [ GatePass])

  return (
    <>
      <div className={`container-fluid page-title-bar ${showNavMenu == false ? "right_col-margin-remove" : ""}   `} >
      <CustomInnerHeader moduleName={"Gate Inward History"} isShowSelector={true}/>
      </div>
      <div role="main" style={{ padding: '0px', backgroundColor: 'white' }} className={`right_col  h-100  ${showNavMenu === false ?
        "right_col-margin-remove" : " "} `}>
        <div className="row">
          <div className="col-md-6 ">
            <div className="x_panel px-0">
              <div className="x_content  ">
                <div className="row px-2  bg-customBlue text-light m-1  ">
                  <div className="col-11 ">
                    <h2 >Gate Pass Info</h2>
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-4 col-sm-4   label-align px-0">
                    Gate Pass Inward
                    {/* <span className="required">*</span> */}
                  </label>
                  <div className="col-md-8 col-sm-6">
                    <input type="text" value={GatePassInward} disabled  className="form-control"/>
                    {/* {!isValidateAllStates && (JobData.customer_chart_id == "") && <span className="text-danger">First Select this </span>} */}
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-4 col-sm-4   label-align px-0">
                    Select Inward Type
                    <span className="required">*</span>
                  </label>
                  <div className="col-md-8 col-sm-6">
                    <Select options={InwardType}  value={InwardType.find(e => e.value.toLowerCase() == GatePass.inward_type) || ''} onChange={(e) => { setGatePass({ ...GatePass, inward_type: e.value }) }} />
                    {!isValidateAllStates && (GatePass.InwardType == "") && <span className="text-danger">First Select this </span>}
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-4 col-sm-4   label-align px-0">
                    Party Name<span className="required">*</span>
                  </label>
                  <div className="col-md-8 col-sm-6">
                    <Select options={Partyname}  value={Partyname.find(e => e.value == GatePass.party_chart_id) || ''} onChange={(e) => { setPartyInfo(PartyApi.filter(data => data.chart_id == e.value)); console.log(PartyInfo);setGatePass({ ...GatePass, party_chart_id: e.value }) }} />
                    {!isValidateAllStates && (GatePass.party_chart_id == 0) && <span className="text-danger">First Select this </span>}
                  </div>
                </div>

                <div className="field item form-group">
                  <label className="col-form-label col-md-4 col-sm-4   label-align px-0">
                    Cell No
                    {/* <span className="required">*</span> */}
                  </label>
                  <div className="col-md-8 col-sm-6">
                    <input type="Number" className="form-control" value={PartyInfo[0]?.cell} disabled />
                    {/* {!isValidateAllStates && (JobData.customer_chart_id == "") && <span className="text-danger">First Select this </span>} */}
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-4 col-sm-4   label-align px-0">
                    Address
                    {/* <span className="required">*</span> */}
                  </label>
                  <div className="col-md-8 col-sm-6">
                    <input type="text" className="form-control" value={PartyInfo[0]?.address} disabled />
                    {/* {!isValidateAllStates && (JobData.customer_chart_id == "") && <span className="text-danger">First Select this </span>} */}
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-4 col-sm-4   label-align px-0">
                    Gate Pass Date
                    {/* <span className="required">*</span> */}
                  </label>
                  <div className="col-md-8 col-sm-6">
                    <input
                      type="date"
                      className="form-control"
                      data-validate-length-range={6}
                      data-validate-words={2}
                      onChange={(e) => { setGatePass({ ...GatePass, date: e.target.value }) }}
                      value={GatePass.date} />

                    {/* {!isValidateAllStates && (JobData.customer_chart_id == "") && <span className="text-danger">First Select this </span>} */}
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-4 col-sm-4   label-align px-0">
                    Attachments
                    {/* <span className="required">*</span> */}
                  </label>
                  <div className="col-md-7 col-sm-6">
                    <input
                      type="file"  ref={ref} onChange={(e) => { setfileupload(e.target.files[0]) }}
                    />

                  </div>
                  <div className="col-md-1 col-sm-2 p-0">{
                  isFileUploadingModeOn?  <div className="spinner-border my-2 text-customOrange" role="status">
                            <span className="sr-only">Loading...</span>
                         </div> :(<button className="btn btn-sm btn-outline-success" type="button" onClick={(e) => {uploadFile(e)}}><i className="fa fa-upload"></i></button>)}
                  </div>

                </div>
                <div className="field item form-group">

                  <div className="col-md-12 col-sm-6 text-center">
                    {/* {!isValidateAllStates && (GatePass.attachments == "") && <span className="text-danger">First Select this </span>} */}
                    {filearray?.map((file, i) => (<a key={i} target="_blank" className=" bg-customBlue text-light m-1 p-1">{i + 1}.   {file.substring( file.indexOf("s") + 2, file.indexOf("_"))}<i className="fa fa-times" onClick={() => { setfilearray(filearray.filter((del, index) => (i !== index))); setGatePass({ ...GatePass, attachments: GatePass.attachments.replace(`,${filearray[i]}`, '') }) }}></i></a>))}
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
                    <h2 >Vehicle Info</h2>
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-4 col-sm-4   label-align px-0">
                    Vehicle No<span className="required">*</span>
                  </label>
                  <div className="col-md-8 col-sm-6">
                    <input type="text" className="form-control" value={GatePass.vehicle_no} onChange={(e) => { setGatePass({ ...GatePass, vehicle_no: e.target.value }) }} />
                    {!isValidateAllStates && (GatePass.vehicle_no == "") && <span className="text-danger">First Select this </span>}
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-4 col-sm-4   label-align px-0">
                    Driver Name
                    {/* <span className="required">*</span> */}
                  </label>
                  <div className="col-md-8 col-sm-6">
                    <input type="text" className="form-control" value={GatePass.drive_name} onChange={(e) => { setGatePass({ ...GatePass, drive_name: e.target.value }) }} />
                    {/* {!isValidateAllStates && (GatePass.drive_name == "") && <span className="text-danger">First Select this </span>} */}
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-4 col-sm-4   label-align px-0">
                    Driver Cell No
                    {/* <span className="required">*</span> */}
                  </label>
                  <div className="col-md-8 col-sm-6">
                    <input type="text" value={GatePass.driver_cell} onChange={(e) => { setGatePass({ ...GatePass, driver_cell: e.target.value }) }} className="form-control" />
                    {/* {!isValidateAllStates && (GatePass.driver_cell == "") && <span className="text-danger">First Select this </span>} */}
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-4 col-sm-4   label-align px-0">
                    Rent Type<span className="required">*</span>
                  </label>
                  <div className="col-md-8 col-sm-6">
                    <Select options={Rent_type}  value={Rent_type.find(e => e.value == GatePass.rent_type) || ''} onChange={(e) => { setGatePass({ ...GatePass, rent_type: e.value }) }} />
                    {!isValidateAllStates && (GatePass.rent_type == "") && <span className="text-danger">First Select this </span>}
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-4 col-sm-4   label-align px-0">
                    Vehicle Rent<span className="required">*</span>
                  </label>
                  <div className="col-md-8 col-sm-6">
                    <input type="Number" min="0" value={GatePass.rent_amount} onChange={(e) => { setGatePass({ ...GatePass, rent_amount: e.target.value }) }} className="form-control" />
                    {!isValidateAllStates && (GatePass.rent_amount == 0) && <span className="text-danger">First Select this </span>}
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-4 col-sm-4   label-align px-0">
                    Bility No<span className="required">*</span>
                  </label>

                  <div className="col-md-8 col-sm-6">
                    <input type="text" value={GatePass.bilty_no} onChange={(e) => { setGatePass({ ...GatePass,  bilty_no: e.target.value }) }} className="form-control" />
                    {!isValidateAllStates && (GatePass.bilty_no == "") && <span className="text-danger">First Select this </span>}
                  </div>
                </div>


              </div></div>
          </div>






        </div>
        <div className="row">
          <div className="col-md-12 "><div className="x_panel px-0">
            <div className="x_content  ">
              <div className="field item form-group" style={{ overflow: 'scroll', height: '270px' }}  >
                <table className="table table-striped"   >
                  <thead >
                    <tr className="bg-customBlue text-light">
                      <th scope="col">Product <span className="required">*</span></th>
                      <th scope="col">Unit <span className="required">*</span></th>
                      <th scope="col">Pieces <span className="required">*</span></th>
                      <th scope="col">PieceWeight <span className="required">*</span></th>
                      <th scope="col">TotalWeight <span className="required">*</span></th>
                      <th scope="col"></th>



                    </tr>
                  </thead>

                  <tbody >
                    {stockEntries?.map((data, id) => (
                      <tr key={id}>

                        <td><Select options={stockAccount} value={stockAccount.find(e => e.value == data.stock_chart_id) || ''}
                          onChange={(e) => { handlePacket(id, e) }} />
                          {!isValidateAllStates && (stockEntries[id].stock_chart_id == 0) && <span className="text-danger">First Select this </span>}
                        </td>
                        <td style={{ width: '20%' }}><Select options={packetsDetails[id]} value={packetsDetails[id]?.find(e => e.value == data.pair_unit_id) || ''}  onChange={(e) => {
                          const list = [...stockEntries];
                          list[id].pair_unit_id = e.value
                          setstockEntries(list);
                        }} />
                          {!isValidateAllStates && (stockEntries[id].pair_unit_id == "") && <span className="text-danger">First Select this </span>}</td>
                        <td style={{ width: '20%' }}><input className="form-control" type="number" min="0" 
                        value={stockEntries[id].total_stock_pieces}
                          onChange={(e) => {
                            const list = [...stockEntries];
                            list[id].total_stock_pieces = e.target.value
                            setstockEntries(list);
                          }} />{!isValidateAllStates && (stockEntries[id].total_stock_pieces == "") && <span className="text-danger">First Select this </span>}</td>
                        <td ><input className="form-control" type="number" min="0"
                          value={stockEntries[id].weight_per_piece}
                          onChange={(e) => {
                            const list = [...stockEntries];
                            list[id].weight_per_piece = e.target.value
                            setstockEntries(list);
                          }} />{!isValidateAllStates && (stockEntries[id].weight_per_piece == "") && <span className="text-danger">First Select this </span>}</td>
                        <td><input className="form-control" type="number" min="0"
                          value={stockEntries[id].tatal_weight}
                          onChange={(e) => {
                            const list = [...stockEntries];
                            list[id].tatal_weight = e.target.value
                            setstockEntries(list);
                          }}
                        />
                          {!isValidateAllStates && (stockEntries[id].tatal_weight == "") && <span className="text-danger">First Select this </span>}</td>
                        <td>
                          {/* Delete button */}

                          <i className="fa fa-trash-o btn " style={{ color: 'red' }} onClick={() => { delPacketitem(id + 1) }}>
                          </i>
                        </td>

                      </tr>)
                    )}
                    <tr><td></td>
                    <td></td>
                    <td><b>Total Pieces: {stockEntries?.map(data =>data.total_stock_pieces).reduce((prev, curr) => Number(prev) + Number(curr), 0)}</b></td>
                    <td></td>
                    <td><b>Total Weight:{stockEntries?.map(data =>data.tatal_weight).reduce((prev, curr) =>  Number(prev) +  Number(curr), 0)}</b></td></tr>
                  </tbody>
                </table>

              </div>
              <div className="col-md-12 ">

                <button className="btn btn-success  x_footer" onClick={() => {
                  setstockEntries([...stockEntries, {
                    stock_chart_id: 0,
                    stock_unit_id: 0,
                    pair_unit_id: 0,
                    total_stock_pieces: 0,
                    weight_per_piece: 0,
                    tatal_weight: 0
                  }])
                }}>
                  Add line
                </button>

                <button className="btn btn-primary x_footer" style={{ float: 'right' }} type="submit" onClick={postdata} disabled={isFileUploadingModeOn}>
                  Submit
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

export default GatePassInward