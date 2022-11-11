import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from "react-redux";
import Select from 'react-select'
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import CustomInnerHeader from '../../Components/CustomInnerHeader';
import { toast } from "react-toastify";
const CreateJob = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const ref = useRef();
    const [isFileUploadingModeOn, setisFileUploadingModeOn] = useState(false)
    var day = new Date().toLocaleDateString(undefined, { day: "2-digit" });
    var month = new Date().toLocaleDateString(undefined, { month: "2-digit" });
    var year = new Date().toLocaleDateString(undefined, { year: "numeric" });
    const dateToday = `${year}-${month}-${day}`

    const [fileupload, setfileupload] = useState('')
    const [filearray, setfilearray] = useState([])
    const [proName, setproName] = useState([])
    const [stockunit, setstockUnit] = useState([])
    const [machineId, setmachineId] = useState([])
    const [CustomerName, setCustomerName] = useState([])
    const type = [{ label: 'Company', value: 'Company' }, { label: 'cmt', value: 'cmt' }]
    const showNavMenu = useSelector((state) => state.NavState);
    const [machine_ids, setmachine_ids] = useState([])
    const [JobIncharge, setJobIncharge] = useState([])
    const [jobNumber, setjobNumber] = useState('')
    const [isValidateAllStates, setIsValidateAllStates] = useState(true)
    const [proIdData, setproIdData] = useState([{
        item_name: "Item Name",
        item_quantity: 0
    }])

    const [JobData, setJobdata] = useState({
        customer_chart_id: 0,
        stock_type: "",
        product_chart_id: 0,
        stock_unit_id: 0,
        product_quantity: 1,
        job_starting_date: dateToday,
        job_ending_date: "",
        job_incharge_id: 0,
        job_description: "",
        per_day_production: 0,
        per_shift_production: 0,
        per_hour_production: 0,
        total_required_days: 0,
        total_required_shift: 0,
        total_required_hour: 24,
        attachments: "",
        machine_entries: []
    })

    var axios = require('axios');
    const valChecked = (i) => {
        let a;
        const found = JobData.machine_entries.find(element => (element.machine_id == i));
        if (found?.machine_id == i)
            a = true
        else a = false
        return a;


    }
    const PutData = () => {
        setIsValidateAllStates(true)

        let isValidationOk = true;

        if (JobData.customer_chart_id == "") {
            isValidationOk = false
        }
        if (JobData.stock_type == "") {
            isValidationOk = false
        }
        if (JobData.product_chart_id == "") {
            isValidationOk = false
        }
        if (JobData.stock_unit_id == "") {
            isValidationOk = false
        }
        // if (JobData.job_starting_date == "") {
        //     isValidationOk = false
        // }
        // if (JobData.product_quantity == "") {
        //     isValidationOk = false
        // }
        if (JobData.job_incharge_id == "") {
            isValidationOk = false
        }
        // if (JobData.job_description == "") {
        //     isValidationOk = false
        // }
        // if ( JobData.attachments == "") {
        //     isValidationOk = false
        // }
        if (JobData.machine_entries == "") {
            isValidationOk = false
        }
        //  setIsValidateAllStates(isValidationOk)

        let dataupdate = false;
        if (isValidationOk === true) {
            let current = new Date(JobData.job_starting_date);
            current.setDate(current.getDate() + Math.round(JobData.product_quantity / (machine_ids.map(data => data.machine_per_hour_capacity).reduce((prev, curr) => prev + curr, 0) * 24)))
            setJobdata({
                ...JobData, per_day_production: machine_ids.map(data => data.machine_per_hour_capacity).reduce((prev, curr) => prev + curr, 0) * 24,
                per_shift_production: machine_ids.map(data => data.machine_per_hour_capacity).reduce((prev, curr) => prev + curr, 0) * 24 / 3,
                per_hour_production: machine_ids.map(data => data.machine_per_hour_capacity).reduce((prev, curr) => prev + curr, 0),
                total_required_days: JobData.product_quantity / (machine_ids.map(data => data.machine_per_hour_capacity).reduce((prev, curr) => prev + curr, 0) * 24), job_ending_date: current.toDateString()
            });
            dataupdate = true;
        }
        setIsValidateAllStates(isValidationOk)
        if (isValidationOk === true && dataupdate) {

            var data = JSON.stringify(JobData);

            var config = {
                method: 'put',
                url: `http://rightway-api.genial365.com/api/Jobs/UpdateProduct?job_id=${location.state.id}`,
                headers: {
                    'Authorization': `bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
                    'content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    toast.success(
                        "Record has been " +
                        ("Updated" + " successfully!")
                    );

                    // navigate('/CreateJobAccess', { state: {  } })
                    navigate(-1)
                    dataupdate = false;
                    setJobdata({
                        customer_chart_id: 0,
                        stock_type: "",
                        product_chart_id: 0,
                        stock_unit_id: 0,
                        product_quantity: 1,
                        job_starting_date: "",
                        job_ending_date: "",
                        job_incharge_id: 0,
                        job_description: "",
                        per_day_production: 0,
                        per_shift_production: 0,
                        per_hour_production: 0,
                        total_required_days: 0,
                        total_required_shift: 0,
                        total_required_hour: 0,
                        attachments: "",
                        machine_entries: []
                    })
                    setfilearray([]);
                    setmachine_ids([]);
                    setproIdData([])
                })
                .catch(function (error) {

                })
        }
    }
    const Postdata = () => {
        let isValidationOk = true;

        if (JobData.customer_chart_id == "") {
            isValidationOk = false
        }
        if (JobData.stock_type == "") {
            isValidationOk = false
        }
        if (JobData.product_chart_id == "") {
            isValidationOk = false
        }
        if (JobData.stock_unit_id == "") {
            isValidationOk = false
        }
        // if (JobData.job_starting_date == "") {
        //     isValidationOk = false
        // }
        if (JobData.product_quantity == "") {
            isValidationOk = false
        }
        if (JobData.job_incharge_id == "") {
            isValidationOk = false
        }
        // if (JobData.job_description == "") {
        //     isValidationOk = false
        // }
        // if ( JobData.attachments == "") {
        //     isValidationOk = false
        // }
        if (JobData.machine_entries == "") {
            isValidationOk = false
        }


        let dataupdate = false
        if (isValidationOk === true) {
            let current = new Date(JobData.job_starting_date);
            current.setDate(current.getDate() + Math.round(JobData.product_quantity / (machine_ids.map(data => data.machine_per_hour_capacity).reduce((prev, curr) => prev + curr, 0) * 24)))
            setJobdata({
                ...JobData, per_day_production: machine_ids.map(data => data.machine_per_hour_capacity).reduce((prev, curr) => prev + curr, 0) * 24,
                per_shift_production: machine_ids.map(data => data.machine_per_hour_capacity).reduce((prev, curr) => prev + curr, 0) * 24 / 3,
                per_hour_production: machine_ids.map(data => data.machine_per_hour_capacity).reduce((prev, curr) => prev + curr, 0),
                total_required_days: JobData.product_quantity / (machine_ids.map(data => data.machine_per_hour_capacity).reduce((prev, curr) => prev + curr, 0) * 24),
                total_required_shift: (isFinite(JobData.product_quantity / (machine_ids.map(data => data.machine_per_hour_capacity).reduce((prev, curr) => prev + curr, 0) * 24))) ? (<>{Math.round(JobData.product_quantity / (machine_ids.map(data => data.machine_per_hour_capacity).reduce((prev, curr) => prev + curr, 0) * 24)) * 3}</>) : (<>0</>), job_ending_date: current.toDateString()
            });
            dataupdate = true
        }
        setIsValidateAllStates(isValidationOk)

        if (isValidationOk === true && dataupdate) {

            var data = JSON.stringify(JobData);

            var config = {
                method: 'post',
                url: 'http://rightway-api.genial365.com/api/Jobs/AddProduct',
                headers: {
                    'Authorization': `bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
                    'content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    toast.success(
                        "Record has been " +
                        ("Added" + " successfully!")
                    );
                    dataupdate = false;
                 
                    setJobdata({
                        customer_chart_id: 0,
                        stock_type: "",
                        product_chart_id: 0,
                        stock_unit_id: 0,
                        product_quantity: 1,
                        job_starting_date: "",
                        job_ending_date: "",
                        job_incharge_id: 0,
                        job_description: "",
                        per_day_production: 0,
                        per_shift_production: 0,
                        per_hour_production: 0,
                        total_required_days: 0,
                        total_required_shift: 0,
                        total_required_hour: 0,
                        attachments: "",
                        machine_entries: []
                    })
                  
                    setfilearray([]);
                   
                    setmachine_ids([]);
                 
                    setproIdData([])
                  
                   
                })
                .catch(function (error) {

                  
                })
        }
    }
    const JobbyId = () => {

        var config = {
            method: 'GET',
            url: `http://rightway-api.genial365.com/api/Jobs/GetJobRecordById?job_id=${location.state.id}`,
            headers: {
                'Authorization': `bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`
            }
        };
        (axios(config)
            .then(function (response) {


                let dateFromApi = new Date(response.data[0].job_starting_date);
                var day = dateFromApi.toLocaleDateString(undefined, { day: "2-digit" });
                var month = dateFromApi.toLocaleDateString(undefined, { month: "2-digit" });
                var year = dateFromApi.toLocaleDateString(undefined, { year: "numeric" });
                const dateto = `${year}-${month}-${day}`
                setJobdata({
                    customer_chart_id: response.data[0].customer_info?.product_id,
                    stock_type: response.data[0].job_type,
                    product_chart_id: response.data[0].product_info?.product_chart_id,
                    stock_unit_id: response.data[0].stock_unit_info.stock_unit_id,
                    product_quantity: response.data[0].product_quantity,
                    job_starting_date: dateto,
                    job_ending_date: response.data[0].job_ending_date,
                    job_incharge_id: response.data[0].job_incharge.employee_id,
                    job_description: response.data[0].job_description,
                    per_day_production: response.data[0].per_day_production,
                    per_shift_production: response.data[0].per_shift_production,
                    per_hour_production: response.data[0].per_hour_production,
                    total_required_days: Math.round(response.data[0].total_required_days),
                    total_required_shift: 3,
                    total_required_hour: 24,
                    attachments: response.data[0].attachments,
                    machine_entries: response.data[0].machine_entires
                })
                fetchData(`http://rightway-api.genial365.com/api/Jobs/GetProductById?product_chart_id= ${response.data[0].product_info?.product_chart_id}`);
                setmachine_ids(response.data[0].machine_entires);
                if (response.data[0]?.attachments)
                    setfilearray(response.data[0].attachments.split(','));


            })
            .catch(function (error) {

            }))
    }
    const fetchData = (APIurl) => {

        var config = {
            method: 'GET',
            url: APIurl,
            headers: {
                'Authorization': `bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`
            }

        };



        (config.url == "http://rightway-api.genial365.com/api/StockUnits/GetData") ? (axios(config)
            .then(function (response) {

                const stockdata = response.data.map((each_voucher) => {
                    return {
                        label: each_voucher.stock_unit_name,
                        value: each_voucher.stock_unit_id,

                    }

                })
                setstockUnit(stockdata);

            })
            .catch(function (error) {

            })) : (config.url == "http://rightway-api.genial365.com/api/Jobs/GetProductionIncharge") ? (axios(config)
                .then(function (response) {

                    const data = response.data.map((each_voucher) => {
                        return {
                            label: each_voucher.production_inacharge_name,
                            value: each_voucher.production_inacharge_id,

                        }

                    })
                    setJobIncharge(data);

                })
                .catch(function (error) {

                })) : (config.url == "http://rightway-api.genial365.com/api/Jobs/GetCustomerName") ? (axios(config)
                    .then(function (response) {

                        const customer = response.data.map((each_voucher) => {
                            return {
                                label: each_voucher.customer_name,
                                value: each_voucher.customer_id,

                            }

                        })
                        setCustomerName(customer);

                    })
                    .catch(function (error) {

                    })) : (config.url == "http://rightway-api.genial365.com/api/Jobs/GetProductList") ? (
                        axios(config)
                            .then(function (response) {
                                const Product = response.data.map((each_voucher) => {
                                    return {
                                        label: each_voucher.product_account.product_account_label,
                                        value: each_voucher.product_account.product_account_value,
                                    }

                                })
                                setproName(Product);
                            })
                            .catch(function (error) {

                            })) : (config.url == "http://rightway-api.genial365.com/api/Jobs/GetAvailableMachine") ? (
                                axios(config)
                                    .then(function (response) {


                                        setmachineId(response.data);

                                    })
                                    .catch(function (error) {

                                    })) : (config.url == "http://rightway-api.genial365.com/api/Job/GetJobNumber") ? (axios(config)
                                        .then(function (response) {
                                            setjobNumber(response.data)
                                        })
                                        .catch(function (error) {

                                        })) : (axios(config)
                                            .then(function (response) {

                                                setproIdData(response.data)
                                            })
                                            .catch(function (error) {

                                            }))

    }
    const uploadFile = async () => {
        if (fileupload.name) {
            setisFileUploadingModeOn(true);

            let response_from_api = "";
            let data = new FormData();
            data.append("UploadedImage", fileupload);

            await axios.post(`http://rightway-api.genial365.com/api/FileUpload?file_name=${fileupload.name}`, data,).then(res => {
                if (res.status === 200) {
                    setisFileUploadingModeOn(false);
                    ref.current.value = "";
                    response_from_api = res.data
                    setfilearray([...filearray, res.data])
                    setJobdata({ ...JobData, attachments: [...filearray, response_from_api].toString() })
                    setfileupload("")
                }


            })
        }

    }

    useEffect(() => {

        fetchData("http://rightway-api.genial365.com/api/Jobs/GetProductList")
        fetchData("http://rightway-api.genial365.com/api/StockUnits/GetData");
        fetchData("http://rightway-api.genial365.com/api/Jobs/GetAvailableMachine")
        fetchData("http://rightway-api.genial365.com/api/Jobs/GetCustomerName")
        fetchData("http://rightway-api.genial365.com/api/Jobs/GetProductionIncharge")
        fetchData("http://rightway-api.genial365.com/api/Job/GetJobNumber")
        if ((location?.state?.id) && (location?.state?.flag)) {
            JobbyId()

        }

    }, [])
    const checkboxUpdate = (data, e) => {
        ;
        if (e.target.checked) {
            setJobdata({ ...JobData, machine_entries: [...JobData.machine_entries, { machine_id: parseInt(e.target.value) }] });

            setmachine_ids([...machine_ids, data])



        }
        else {

            setJobdata({ ...JobData, machine_entries: JobData.machine_entries.filter(data => data.machine_id != parseInt(e.target.value)) });
            setmachine_ids(machine_ids.filter(item => item.machine_id != e.target.value))



        }
    }

    return (

        <>
            <div className={`container-fluid page-title-bar ${showNavMenu == false ? "right_col-margin-remove" : ""}   `} >
                <CustomInnerHeader moduleName={"Create Job"} isShowSelector={true} />
            </div>
            <div role="main" className={`right_col  h-100  ${showNavMenu === false ?
                "right_col-margin-remove" : " "} `}>
                <div className="row">
                    <div className="col-md-6 ">
                        <div className="x_panel px-0">

                            <div className="x_content  ">
                                <span className="section">
                                    <div className="row px-2  ">
                                        <div className="col-11 ">
                                            <i className='fa fa-list'></i>&nbsp;Job Data
                                        </div>
                                    </div>
                                </span>
                                <div className="field item form-group">
                                    <label className="col-form-label col-md-4 col-sm-4   label-align px-0">
                                        Job Number<span className="required">*</span>
                                    </label>
                                    <div className="col-md-8 col-sm-6">
                                        <input type="text" className="form-control" disabled value={jobNumber} />
                                        {/* {!isValidateAllStates && (JobData.customer_chart_id == "") && <span className="text-danger">First Select this </span>} */}
                                    </div>
                                </div>
                                <div className="field item form-group">
                                    <label className="col-form-label col-md-4 col-sm-4   label-align px-0">
                                        Customer Name<span className="required">*</span>
                                    </label>
                                    <div className="col-md-8 col-sm-6">
                                        <Select
                                            options={CustomerName}
                                            value={CustomerName.find(e => e.value == JobData.customer_chart_id) || ''}
                                            onChange={(e) => { setJobdata({ ...JobData, customer_chart_id: e.value }); }}
                                        />
                                        {!isValidateAllStates && (JobData.customer_chart_id == "") && <span className="text-danger">First Select this </span>}
                                    </div>
                                </div>
                                <div className="field item form-group">
                                    <label className="col-form-label col-md-4 col-sm-4   label-align px-0">
                                        Stock Type<span className="required">*</span>
                                    </label>
                                    <div className="col-md-8 col-sm-6">
                                        <Select
                                            options={type}
                                            value={type.find(e => e.value == JobData.stock_type) || ''}
                                            onChange={(e) => { setJobdata({ ...JobData, stock_type: e.value }); }}
                                        />
                                        {!isValidateAllStates && (JobData.stock_type == "") && <span className="text-danger">First Select this </span>}
                                    </div>
                                </div>
                                <div className="field item form-group">
                                    <label className="col-form-label col-md-4 col-sm-4   label-align px-0">
                                        Product Name<span className="required">*</span>
                                    </label>
                                    <div className="col-md-8 col-sm-6">
                                        <Select
                                            options={proName}
                                            value={proName.find(e => e.value == JobData.product_chart_id) || ''}
                                            onChange={(e) => { setJobdata({ ...JobData, product_chart_id: e.value }); fetchData(`http://rightway-api.genial365.com/api/Jobs/GetProductById?product_chart_id= ${e.value}`) }}
                                        />
                                        {!isValidateAllStates && (JobData.product_chart_id == "") && <span className="text-danger">First Select this </span>}
                                    </div>
                                </div>
                                <div className="field item form-group">
                                    <label className="col-form-label col-md-4 col-sm-4   label-align px-0">
                                        Product Quantity<span className="required">*</span>
                                    </label>
                                    <div className="col-md-8 col-sm-6">
                                        <input type="number" className="form-control" min="1"
                                            onChange={(e) => { setJobdata({ ...JobData, product_quantity: e.target.value }) }}
                                            value={JobData.product_quantity} />
                                        {!isValidateAllStates && (JobData.product_quantity == "") && <span className="text-danger">First Select this </span>}
                                    </div>
                                </div>
                                <div className="field item form-group">
                                    <label className="col-form-label col-md-4 col-sm-4   label-align px-0">
                                        Stock Unit<span className="required">*</span>
                                    </label>
                                    <div className="col-md-8 col-sm-6">
                                        <Select
                                            options={stockunit}
                                            value={stockunit.find(e => e.value == JobData.stock_unit_id) || ''}
                                            onChange={(e) => { setJobdata({ ...JobData, stock_unit_id: e.value }); }} />

                                        {!isValidateAllStates && (JobData.stock_unit_id == "") && <span className="text-danger">First Select this </span>}
                                    </div>
                                </div>
                                <div className="field item form-group">
                                    <label className="col-form-label col-md-4 col-sm-4   label-align px-0">
                                        Job Starting date<span className="required">*</span>
                                    </label>
                                    <div className="col-md-8 col-sm-6">
                                        <input
                                            type="date"
                                            className="form-control"
                                            data-validate-length-range={6}
                                            data-validate-words={2}

                                            value={JobData.job_starting_date}
                                            onChange={(e) => {
                                                setJobdata({ ...JobData, job_starting_date: e.target.value });


                                            }
                                            }
                                        />
                                        {!isValidateAllStates && (JobData.job_starting_date == "") && <span className="text-danger">First Select this </span>}
                                    </div>
                                </div>
                                <div className="field item form-group">
                                    <label className="col-form-label col-md-4 col-sm-4   label-align px-0">
                                        Product Incharge<span className="required">*</span>
                                    </label>
                                    <div className="col-md-8 col-sm-6">
                                        <Select options={JobIncharge}
                                            value={JobIncharge.find(e => e.value == JobData.job_incharge_id) || ''}
                                            onChange={(e) => { setJobdata({ ...JobData, job_incharge_id: e.value }); }}
                                        />
                                        {!isValidateAllStates && (JobData.job_incharge_id == "") && <span className="text-danger">First Select this </span>}
                                    </div>
                                </div>
                                <div className="field item form-group">
                                    <label className="col-form-label col-md-4 col-sm-4   label-align px-0">
                                        Description
                                    </label>
                                    <div className="col-md-8 col-sm-6">
                                        <input required
                                            name="name"
                                            className='form-control'
                                            placeholder=""
                                            value={JobData.job_description}
                                            onChange={(e) => { setJobdata({ ...JobData, job_description: e.target.value }); }}
                                        />
                                        {!isValidateAllStates && (JobData.job_description == "") && <span className="text-danger">First Select this </span>}
                                    </div>
                                </div>
                                <div className="field item form-group">
                                    <label className="col-form-label col-md-4 col-sm-4   label-align px-0">
                                        Attachments
                                    </label>
                                    <div className="col-md-7 col-sm-6">
                                        <input required
                                            type="file" ref={ref} accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
text/plain, application/pdf, image/*" onChange={(e) => {



                                                setfileupload(e.target.files[0])

                                            }}

                                        />
                                        {/* {!isValidateAllStates && (JobData.attachments == "") && <span className="text-danger">First Select this </span>} */}


                                    </div>

                                    <div className="col-md-1 col-sm-2 p-0">{
                                        isFileUploadingModeOn ? <div className="spinner-border my-2 text-customOrange" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div> : (<button className="btn btn-sm btn-outline-primary" type="button" onClick={() => { uploadFile() }}><i className="fa fa-upload"></i></button>)}
                                    </div>
                                </div>
                                <div className="field item form-group">
                                    <div className="col-md-12 col-sm-6 text-center">
                                        {filearray?.map((file, i) => (<a key={i} target="_blank" className=" bg-customBlue text-light m-1 p-1">{i + 1}.   {file?.substring(file.indexOf("s") + 2, file.indexOf("_"))}<i className="fa fa-times" onClick={() => { setfilearray(filearray.filter((del, index) => (i !== index))); setJobdata({ ...JobData, attachments: JobData.attachments.replace(`,${filearray[i]}`, '') }) }}></i></a>))}
                                    </div>
                                </div>
                                <div className="field item form-group">
                                    <label className="col-form-label col-md-4 col-sm-4 m-3  label-align px-0">
                                        Machine Entries<span className="required">*</span>
                                    </label>
                                    <div className="col-md-8 col-sm-6">

                                        {machineId.map((data, i) => (<div><input className="form-check-input" style={{ width: '15px', height: '15px' }} type="checkbox" name="machines"
                                            checked={location?.state?.flag && valChecked(data.machine_id) || valChecked(data.machine_id) }
                                            value={data.machine_id}
                                            onChange={(e) => checkboxUpdate(data, e)} /><label className="form-check-label m-1" >{data.machine_model_name}</label></div>))}
                                        {!isValidateAllStates && (JobData.machine_entries == "") && <span className="text-danger">First Select this </span>}
                                    </div>

                                </div>
                                <div className="col-md-12 text-right x_footer">
                                    {location?.state?.flag ? (<button className="btn btn-primary" type="submit" onClick={() => { PutData() }} >
                                        Update
                                    </button>) : (<button className="btn btn-primary" type="submit" disabled={isFileUploadingModeOn} onClick={() => { Postdata() }} >
                                        Add
                                    </button>)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 ">
                        <div className="x_panel px-0 m-1">


                            <span className="section">
                                <div className="row px-2  ">
                                    <div className="col-11 ">
                                        <i className='fa fa-list'></i>&nbsp;Attach Stock
                                    </div>
                                </div>
                            </span>
                            <div className="x_content  ">
                                <div className="field item form-group">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th className="bg-customBlue text-light" scope="col">Stock Item Name</th>
                                                <th className="bg-customBlue text-light" scope="col">Quantity</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {proIdData?.map((item, id) => (<tr key={id}>
                                                <td><b>{id + 1}. </b>  {item.item_name}</td>
                                                <td>{item.item_quantity * JobData.product_quantity}</td>
                                            </tr>))}
                                        </tbody>
                                    </table>

                                </div></div> </div>
                        <div className="x_panel px-0 ">
                            <div className="x_content  ">
                                <div className="field item form-group">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr className="text-center"  >

                                                <th colSpan="2" className="bg-customBlue text-light" scope="col"><b>Production Calculations</b></th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Per Day production</td>
                                                <td>{machine_ids.map(data => data.machine_per_hour_capacity).reduce((prev, curr) => prev + curr, 0) * 24}</td>

                                            </tr>
                                            <tr>
                                                <td>Per Shift production</td>
                                                <td>{machine_ids.map(data => data.machine_per_hour_capacity).reduce((prev, curr) => prev + curr, 0) * 24 / 3}</td>
                                            </tr>
                                            <tr>
                                                <td>Per Hour production</td>
                                                <td>{machine_ids.map(data => data.machine_per_hour_capacity).reduce((prev, curr) => prev + curr, 0)}</td>
                                            </tr>
                                            <tr>
                                                <td>Total Days</td>
                                                <td>{(isFinite(JobData.product_quantity / (machine_ids.map(data => data.machine_per_hour_capacity).reduce((prev, curr) => prev + curr, 0) * 24))) ? (<>{Math.round(JobData.product_quantity / (machine_ids.map(data => data.machine_per_hour_capacity).reduce((prev, curr) => prev + curr, 0) * 24))}</>) : (<>0</>)}</td>
                                            </tr><tr>
                                                <td>Total Shifts</td>
                                                <td>{(isFinite(JobData.product_quantity / (machine_ids.map(data => data.machine_per_hour_capacity).reduce((prev, curr) => prev + curr, 0) * 24))) ? (<>{Math.round(JobData.product_quantity / (machine_ids.map(data => data.machine_per_hour_capacity).reduce((prev, curr) => prev + curr, 0) * 24)) * 3}</>) : (<>0</>)}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>




        </>
    )
}


export default CreateJob