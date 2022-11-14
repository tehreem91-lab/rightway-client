import React, { useEffect, useState, useRef } from 'react'
import CustomInnerHeader from '../../Components/CustomInnerHeader';
import Select from 'react-select'
import { useSelector } from "react-redux";
import { customStyles } from "../../Components/reactCustomSelectStyle.jsx";
const CloseShift = () => {
    
    const ref = useRef();
    var day = new Date().toLocaleDateString(undefined, { day: "2-digit" });
    var month = new Date().toLocaleDateString(undefined, { month: "2-digit" });
    var year = new Date().toLocaleDateString(undefined, { year: "numeric" });
    const dateToday = `${year}-${month}-${day}`
    const showNavMenu = useSelector((state) => state.NavState);
    const [ShiftSel, setShiftSel] = useState();
    const [inchargeSel, setinchargeSel] = useState();
    const [showtables, setshowtables] = useState(false);
    const [ApiParam, setApiParam] = useState({ id: 1, date: dateToday })
    const [closeRec, setcloseRec] = useState({});
    const [empSel, setempSel] = useState()
    const [machSel, setmachSel] = useState()
    const [Overtime, setovertime] = useState()
    const [fileupload, setfileupload] = useState('')
    const [isFileUploadingModeOn, setisFileUploadingModeOn] = useState(false)
    const [filearray, setfilearray] = useState([])
    const [product_name, setproduct_name] = useState()
    var axios = require('axios');
    const fetchIdData = () => {


        var config = {
            method: 'get',
            url: `http://rightway-api.genial365.com/api/CloseShift/GetCloseShiftRecord?date=${ApiParam.date}&shift_id=${ApiParam.id}`,
            headers: {
                'Authorization': `bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
            }
        };

        axios(config)
            .then(function (response) {
                // console.log(response.data);
                setshowtables(true)
                setcloseRec(response.data[0])
                setovertime(response.data[0].over_time_info)
            })
            .catch(function (error) {
                // console.log(error);
            })
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
                    setcloseRec({ ...closeRec, attachments: [...filearray, response_from_api].toString() })
                    setfileupload("")
                }
            })
        }

    }
    const postData = () => {
        // console.log(closeRec);
        var data = JSON.stringify({
            "shift_id": closeRec.shift_id,
            "quality_incharge_id": closeRec.quality_incharge_id,
            "date": closeRec.date,
            "remarks": closeRec.remarks,
            "attachments": closeRec.attachments,
            "job_entity": closeRec.job_entity.map((data, i) => {
                return {
                    "job_id": data.job_pass_no,
                    "machine_info": data.machine_info.map((item, id) => {
                        return {
                            "machine_id": 0,
                            "status": item.status,
                            "total_product": item.total_product,
                            "total_a_grade_pieces": item.total_a_grade_pieces,
                            "total_b_grade_pieces": item.total_b_grade_pieces,
                            "total_wasted": item.total_wasted,
                            "remarks": item.remarks

                        }
                    }),
                    "stock_info": data.stock_info.map((stock, index) => {
                        return {
                            "item_id": stock.item_id,
                              "remaing_quantity":  stock.remaing_quantity - data.machine_info[index].total_product -data.machine_info[index].total_wasted
                        }
                    })

                }
            }),
            "over_time_info": Overtime.map(over => {
                return {
                    "employee_id": over.employee_id,
                    "product_id": over.product_id,
                    "overtime": over.overtime,
                    "machine_ids": over.machine_ids

                }
            }),
            "total_record": [
                {
                    "total_a_grade_pieces": closeRec.job_entity.map((data, i) => (data?.machine_info.map(((item, id) => (item.total_a_grade_pieces))))).toString().split(',')
                        .map(Number)
                        .reduce((a, b) => a + b),
                    "total_b_grade_pieces": closeRec.job_entity.map((data, i) => (data?.machine_info.map(((item, id) => (item.total_b_grade_pieces))))).toString().split(',')
                        .map(Number)
                        .reduce((a, b) => a + b),
                    "total_wasted": closeRec.job_entity.map((data, i) => (data?.machine_info.map(((item, id) => (item.total_wasted))))).toString().split(',')
                        .map(Number)
                        .reduce((a, b) => a + b),
                    "total_remaing_stock_products": closeRec.job_entity.map((data, i) => (data?.stock_info.map(((item, id) => (item.remaing_quantity))))).toString().split(',')
                        .map(Number)
                        .reduce((a, b) => a + b),
                    "total_activated_machines": closeRec.job_entity.map((data, i) => (data?.machine_info.filter(((item, id) => (item.status == 'true')))).length).toString().split(',').map(Number)
                        .reduce((a, b) => a + b)
                }
            ]
        });
        console.log(data);

        //   var config = {
        //     method: 'post',
        //     url: `http://rightway-api.genial365.com/api/CloseShift/PostCloseShiftRecord?date=${ApiParam.date}&shift_id=${ApiParam.id}`,
        //     headers: { 
        //         'Authorization': `bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`, 
        //       'Content-Type': 'application/json'
        //     },
        //     data : data
        //   };

        //   axios(config)
        //   .then(function (response) {
        //     console.log(JSON.stringify(response.data));
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //     console.log(data);
        //   });
    }
    const fetchData = (url) => {
        var axios = require('axios');

        var config = {
            method: 'get',
            url: url,
            headers: {
                'Authorization': `bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
            }
        };

        (config.url == "http://rightway-api.genial365.com/api/CloseShift/GetShiftSelectorOptions") ? (axios(config)
            .then(function (response) {
                const shift = response.data.map((each_voucher) => {
                    return {
                        label: each_voucher.shift_name,
                        value: each_voucher.shift_id,
                    }

                })

                setShiftSel(shift);
            })
            .catch(function (error) {

            })) : (config.url == "http://rightway-api.genial365.com/api/CloseShift/GetQualityIncharge") ? (axios(config)
                .then(function (response) {
                    const incharge = response.data.map((each_voucher) => {
                        return {
                            label: each_voucher.quality_inacharge_name,
                            value: each_voucher.quality_inacharge_id,

                        }

                    })

                    setinchargeSel(incharge);
                })
                .catch(function (error) {

                })) : (config.url == "http://rightway-api.genial365.com/api/CloseShift/GetMachineList") ? (axios(config)
                    .then(function (response) {
                        const machines = response.data.map((each_voucher) => {
                            return {
                                label: each_voucher.machine_model_name,
                                value: each_voucher.machine_id,

                            }

                        })

                        setmachSel(machines);

                    })
                    .catch(function (error) {

                    })) : (config.url == "http://rightway-api.genial365.com/api/CloseShift/GetJobProduct") ? (axios(config)
                        .then(function (response) {
                            const Pro = response.data.map((each_voucher) => {
                                return {
                                    label: each_voucher.product_name,
                                    value: each_voucher.product_id,

                                }

                            })
                            setproduct_name(Pro);
                        })
                        .catch(function (error) {

                        })) : (axios(config)
                            .then(function (response) {
                                const emp = response.data.map((each_voucher) => {
                                    return {
                                        label: each_voucher.employee_name,
                                        value: each_voucher.employee_id,

                                    }

                                })
                                setempSel(emp)
                            })
                            .catch(function (error) {

                            }))


    }
    useEffect(() => {
        fetchData('http://rightway-api.genial365.com/api/CloseShift/GetShiftSelectorOptions');
        fetchData('http://rightway-api.genial365.com/api/CloseShift/GetQualityIncharge');
        fetchData('http://rightway-api.genial365.com/api/CloseShift/GetEmployeeList')
        fetchData('http://rightway-api.genial365.com/api/CloseShift/GetMachineList')
        fetchData('http://rightway-api.genial365.com/api/CloseShift/GetJobProduct')

    }, [])

    return (
        <>
            <div className={`container-fluid right_col page-title-bar ${showNavMenu == false ? "right_col-margin-remove" : ""}   `} >
                <CustomInnerHeader moduleName={"Close Shift"} isShowSelector={true} />
            </div>
            <div role="main" className={`right_col  h-100 heightFixForFAult  ${showNavMenu === false ?
                "right_col-margin-remove" : " "} `}>
                <div className="row">
                    <div className="col-md-8 ">
                        <div className="x_panel px-0">

                            <div className="x_content  ">
                                <div className="row">
                                    <div className="field item form-group col-md-4 col-sm-6">
                                        <label className="col-form-label col-md-4 col-sm-3 label-align">Date<span className="required">*</span></label>
                                        <div className="col-md-8 col-sm-8">
                                            <input
                                                value={ApiParam.date}

                                                type="Date"
                                                className="form-control"
                                                data-validate-length-range={6}
                                                data-validate-words={2}
                                                onChange={(e) => { setApiParam({ ...ApiParam, date: e.target.value }) }}

                                            /></div>
                                    </div>
                                    <div className="field item form-group col-md-4 col-sm-6">
                                        <label className="col-form-label col-md-4 col-sm-3 label-align">Shift<span className="required">*</span></label>
                                        <div className="col-md-8 col-sm-8">
                                            <Select
                                                options={ShiftSel} styles={customStyles} value={ShiftSel?.find(e => e.value == ApiParam?.id) || ''}
                                                onChange={(e) => { setApiParam({ ...ApiParam, id: e.value }) }}
                                            /></div>
                                    </div>


                                    <div className="field item form-group col-md-4 col-sm-6">

                                        <div className="col-md-12 text-right ">
                                            <button className="btn btn-primary " type="submit" onClick={fetchIdData}  >
                                                Show Report
                                            </button>

                                        </div>
                                    </div>

                                </div>
                                {/* {showtables && */}


                                {/* <div className="field item form-group col-md-4 col-sm-6">
                                            <label className="col-form-label col-md-4 col-sm-3 label-align">Issued Job<span className="required">*</span></label>
                                            <div className="col-md-8 col-sm-8">
                                                <input

                                                    type="text"
                                                    className="form-control"
                                                    data-validate-length-range={6}
                                                    data-validate-words={2}

                                                    name="product_name"
                                                /></div>
                                        </div> */}

                                {/* } */}
                                {showtables && closeRec.job_entity.map((data, i) => (<div className="row"
                                // style={{height:'300px', overflow: 'scroll'}}
                                >
                                    <div className="col-md-12 col-sm-12 ">
                                        <div className="x_panel">
                                            <div className="x_content">
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="card-box table-responsive">

                                                            <tr><td>Pass No:</td><td> <input
                                                                value={data.job_pass_no}
                                                                type="text"
                                                                className="form-control text-center ml-1"
                                                                data-validate-length-range={6}
                                                                data-validate-words={2}
                                                                disabled

                                                            /></td> <td className=" pl-3"></td><td >Product Name: </td>
                                                                <td><input
                                                                    value={data.product_name}
                                                                    type="text"
                                                                    className="form-control text-center ml-1"
                                                                    data-validate-length-range={6}
                                                                    data-validate-words={2}
                                                                    disabled

                                                                /></td></tr>
                                                            <table id="datatable-checkbox" className="table table-striped  jambo_table bulk_action">

                                                                <thead>
                                                                    <tr  >
                                                                        <th className='right-border-1' width="30%">
                                                                            Machine No
                                                                        </th>
                                                                        <th className='right-border-1'>Total Product</th>
                                                                        <th className='right-border-1'>A Grade</th>
                                                                        <th className='right-border-1'>B Grade</th>
                                                                        <th className='right-border-1'>Waste</th>
                                                                        <th >Remarks</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {data?.machine_info?.map((item, id) => (<tr>
                                                                        <td key={id}>
                                                                            <input type="checkbox" id="check-all"
                                                                                checked={item?.status}
                                                                                onChange={(e) => {
                                                                                    // console.log(item,"jsh")
                                                                                    let Rec1 = [...closeRec.job_entity]
                                                                                    Rec1[i].machine_info[id].status = e.target.checked
                                                                                    setcloseRec({ ...closeRec, job_entity: Rec1 })
                                                                                    let Rec2 = [...closeRec.job_entity]
                                                                                    if (Rec2[i].machine_info[id].status == false) {
                                                                                        Rec2[i].machine_info[id].total_product = 0
                                                                                        Rec2[i].machine_info[id].total_a_grade_pieces = 0
                                                                                        Rec2[i].machine_info[id].total_b_grade_pieces = 0;
                                                                                        setcloseRec({ ...closeRec, job_entity: Rec2 })

                                                                                    }


                                                                                    // console.log(e.target.checked, item, id)
                                                                                }} /> {item.machine_model_name}
                                                                        </td>
                                                                        <td><input type="number" min='0' value={item.total_product} onChange={(e) => {

                                                                            let Rec1 = [...closeRec.job_entity]
                                                                            Rec1[i].machine_info[id].total_product = Number(e.target.value)
                                                                            Rec1[i].stock_info[id].remaing_quantity =Rec1[i].stock_info[id].issue_quantity -  Number(e.target.value)-Number(Rec1[i].machine_info[id].total_wasted)

                                                                            setcloseRec({ ...closeRec, job_entity: Rec1 })
                                                                            let Rec2 = [...closeRec.job_entity]
                                                                            Rec2[i].machine_info[id].total_a_grade_pieces = Number(e.target.value) - Number(Rec2[i].machine_info[id].total_b_grade_pieces) ;
                                                                            setcloseRec({ ...closeRec, job_entity: Rec2 })
                                                                            let Rec3 = [...closeRec.job_entity]
                                                                            Rec3[i].machine_info[id].total_b_grade_pieces = Number(e.target.value) - Number(Rec3[i].machine_info[id].total_a_grade_pieces);
                                                                            setcloseRec({ ...closeRec, job_entity: Rec3 })


                                                                        }}
                                                                            className="form-control" /></td>
                                                                        <td><input type="number" min='0' value={item.total_a_grade_pieces} onChange={(e) => {
                                                                            // console.log(closeRec.job_entity)
                                                                            let Rec1 = [...closeRec.job_entity]
                                                                            Rec1[i].machine_info[id].total_product = Number(Rec1[i].machine_info[id].total_b_grade_pieces) + Number(e.target.value);
                                                                            // Rec1[i].stock_info[id].remaing_quantity =Rec1[i].stock_info[id].issue_quantity -  Number(e.target.value)-Number(Rec1[i].machine_info[id].total_wasted)
                                                                            setcloseRec({ ...closeRec, job_entity: Rec1 })
                                                                            let Rec2 = [...closeRec.job_entity]
                                                                            Rec2[i].machine_info[id].total_a_grade_pieces = Number(e.target.value);
                                                                            setcloseRec({ ...closeRec, job_entity: Rec2 })
                                                                            let Rec3 = [...closeRec.job_entity]
                                                                            Rec3[i].machine_info[id].total_b_grade_pieces = Number(Rec3[i].machine_info[id].total_product) - Number(e.target.value);
                                                                            setcloseRec({ ...closeRec, job_entity: Rec3 })


                                                                        }} className="form-control" /></td>
                                                                        <td><input type="number" min='0' value={item.total_b_grade_pieces} onChange={(e) => {

                                                                            let Rec1 = [...closeRec.job_entity]
                                                                            Rec1[i].machine_info[id].total_product = Number(e.target.value) + Number(Rec1[i].machine_info[id].total_a_grade_pieces)
                                                                            setcloseRec({ ...closeRec, job_entity: Rec1 })
                                                                            let Rec2 = [...closeRec.job_entity]
                                                                            Rec2[i].machine_info[id].total_a_grade_pieces = Number(Rec2[i].machine_info[id].total_product) - Number(e.target.value);
                                                                            setcloseRec({ ...closeRec, job_entity: Rec2 })
                                                                            let Rec3 = [...closeRec.job_entity]
                                                                            Rec3[i].machine_info[id].total_b_grade_pieces = Number(e.target.value);
                                                                            setcloseRec({ ...closeRec, job_entity: Rec3 })


                                                                        }} className="form-control" /></td>
                                                                        <td><input type="number" min='0' value={item.total_wasted} onChange={(e) => {

                                                                            let Rec1 = [...closeRec.job_entity]
                                                                            Rec1[i].machine_info[id].total_wasted = Number(e.target.value)
                                                                            Rec1[i].stock_info[id].remaing_quantity =Rec1[i].stock_info[id].issue_quantity -  Number(e.target.value)-Number(Rec1[i].machine_info[id].total_product)
                                                                            setcloseRec({ ...closeRec, job_entity: Rec1 })



                                                                        }} className="form-control" /></td>
                                                                        <td><input type="text" value={item.remarks} onChange={(e) => {

                                                                            let Rec1 = [...closeRec.job_entity]
                                                                            Rec1[i].machine_info[id].remarks = e.target.value
                                                                            setcloseRec({ ...closeRec, job_entity: Rec1 })



                                                                        }} className="form-control" /></td>

                                                                    </tr>))}
                                                                    {/* ///total */}
                                                                    <tr>
                                                                        <td>
                                                                            Total:{closeRec.job_entity[i].machine_info.map(data => data.machine_per_hour_capacity).reduce((prev, curr) => Number(prev) + Number(curr), 0).toFixed(2)}
                                                                        </td>
                                                                        <td> Total:{closeRec.job_entity[i].machine_info.map(data => data.total_product).reduce((prev, curr) => Number(prev) + Number(curr), 0).toFixed(2)}</td>
                                                                        <td> Total:{closeRec.job_entity[i].machine_info.map(data => data.total_a_grade_pieces).reduce((prev, curr) => Number(prev) + Number(curr), 0).toFixed(2)}</td>
                                                                        <td> Total:{closeRec.job_entity[i].machine_info.map(data => data.total_b_grade_pieces).reduce((prev, curr) => Number(prev) + Number(curr), 0).toFixed(2)}</td>
                                                                        <td> Total:{closeRec.job_entity[i].machine_info.map(data => data.total_wasted).reduce((prev, curr) => Number(prev) + Number(curr), 0).toFixed(2)}</td>
                                                                        <td></td>

                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div></div>

                                                </div></div>

                                        </div></div>





                                </div>))}


                                {showtables && <div className="row">
                                    <div className="col-md-12 col-sm-12 ">
                                        <div className="x_panel">
                                            <div className="x_content">
                                                <div className="row">

                                                    <div className="col-sm-12">
                                                        <h3 style={{ fontSize: '20px' }}>Total</h3>
                                                        <div className="card-box table-responsive">


                                                            <table id="datatable-checkbox" className="table table-striped  jambo_table bulk_action">
                                                                <thead>
                                                                    <tr>

                                                                    </tr>
                                                                    <tr  >

                                                                        <th className='right-border-1'>Total Product A</th>
                                                                        <th className='right-border-1'>B Grade</th>
                                                                        <th className='right-border-1'>Total Wasted</th>
                                                                        <th className='right-border-1'>Remaining Stock</th>
                                                                        <th >Active Machined</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>




                                                                       
                                                                        <td>{closeRec.job_entity.map((data, i) => (data?.machine_info.map(((item, id) => (item.total_a_grade_pieces))))).toString().split(',')
                                                                            .map(Number)
                                                                            .reduce((a, b) => a + b)}</td>
                                                                        <td>{closeRec.job_entity.map((data, i) => (data?.machine_info.map(((item, id) => (item.total_b_grade_pieces))))).toString().split(',')
                                                                            .map(Number)
                                                                            .reduce((a, b) => a + b)}</td>
                                                                        <td>{closeRec.job_entity.map((data, i) => (data?.machine_info.map(((item, id) => (item.total_wasted))))).toString().split(',')
                                                                            .map(Number)
                                                                            .reduce((a, b) => a + b)}</td>
                                                                            <td>{closeRec.job_entity.map((data, i) => (data?.stock_info.map(((item, id) => (item.remaing_quantity))))).toString().split(',')
                                                                            .map(Number)
                                                                            .reduce((a, b) => a + b)}</td>
                                                                        <td>{closeRec.job_entity.map((data, i) => (data?.machine_info.filter(((item, id) => (item.status == 'true')))).length).toString().split(',').map(Number)
                                                                            .reduce((a, b) => a + b)}</td>


                                                                    </tr>

                                                                </tbody>
                                                            </table>
                                                        </div></div>

                                                </div></div>

                                        </div></div>





                                </div>}
                                {showtables && <div className="row">
                                    <div className="col-md-12 col-sm-12 ">
                                        <div className="x_panel">
                                            <div className="x_content">
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <h3 style={{ fontSize: '20px' }}>Overtime Management</h3>
                                                        <div className="card-box table-responsive" style={{ height: '200px' }}>


                                                            <table id="datatable-checkbox" className="table table-striped  jambo_table bulk_action">
                                                                <thead>

                                                                    <tr  >

                                                                        <th className='right-border-1'>Employee Management</th>
                                                                        <th className='right-border-1'>Product</th>
                                                                        <th className='right-border-1'>Machine</th>
                                                                        <th className='right-border-1'>Overtime</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {Overtime.map((item, id) => (<tr>
                                                                        <td><Select styles={customStyles} options={empSel} value={empSel.find(e => e.value == item.employee_id) || ''} onChange={(e) => {
                                                                            let m = [...Overtime]
                                                                            m[id].employee_id = e.value;
                                                                            setovertime(m)
                                                                        }} /></td>
                                                                        <td><Select options={product_name} styles={customStyles} value={product_name.find(e => e.value == item.product_id) || ''} onChange={(e) => {
                                                                            let m = [...Overtime]
                                                                            m[id].product_id = e.value;
                                                                            m[id].product_name = e.label;
                                                                            setovertime(m)
                                                                        }} /></td>
                                                                        <td><Select styles={customStyles} options={machSel} isMulti onChange={(e) => {
                                                                            let m = [...Overtime]
                                                                            m[id].machine_ids = []
                                                                           e.map((data, i) => {


                                                                                m[id].machine_ids[i] = { machine_id: data.value }

                                                                                setovertime(m)


                                                                            })

                                                                           
                                                                        }} /></td>
                                                                        <td><input className="form-control" type="number" value={item.overtime} onChange={(e) => {
                                                                            let m = [...Overtime]
                                                                            m[id].overtime = e.target.value;
                                                                            setovertime(m)
                                                                        }} /></td>



                                                                    </tr>))}

                                                                </tbody>
                                                                <button className="btn btn-primary btn-sm" onClick={() => {
                                                                    setovertime([...Overtime,
                                                                    {
                                                                        employee_id: 0,
                                                                        prouduct_id: 0,
                                                                        overtime: 0,
                                                                        machine_ids: [
                                                                            {
                                                                                machine_id: 0
                                                                            }
                                                                        ]
                                                                    }
                                                                    ])
                                                                }}>Add ine</button>
                                                            </table>
                                                        </div></div>

                                                </div></div>

                                        </div></div>





                                </div>}
                                {showtables && <div className="row">
                                    <div className="field item form-group col-md-6 col-sm-6">
                                        <label className="col-form-label col-md-4 col-sm-3 label-align">Remarks<span className="required">*</span></label>
                                        <div className="col-md-8 col-sm-8">
                                            <input

                                                type="text"
                                                className="form-control"
                                                data-validate-length-range={6}
                                                data-validate-words={2}
                                                value={closeRec.remarks}
                                                onChange={(e) => {

                                                    setcloseRec({ ...closeRec, remarks: e.target.value })

                                                }}

                                            /></div>
                                    </div>





                                </div>}
                                {showtables && <><div className="row">
                                    <div className="field item form-group col-md-12 col-sm-6">
                                        <label className="col-form-label col-md-2 col-sm-3 label-align">Attachments<span className="required">*</span></label>
                                        <div className="col-md-4 col-sm-8">
                                            <input

                                                type="file"
                                                ref={ref}
                                                data-validate-length-range={6}
                                                data-validate-words={2}

                                                onChange={(e) => {
                                                    setfileupload(e.target.files[0])

                                                }}
                                            /></div>
                                        <div className="col-md-1 col-sm-2 p-0">{
                                            isFileUploadingModeOn ? <div className="spinner-border my-2 text-customOrange" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div> : (<button className="btn btn-sm btn-outline-primary" type="button" onClick={() => { uploadFile() }}><i className="fa fa-upload"></i></button>)}
                                        </div>
                                    </div> </div>
                                    <div className="row"><div className="field item form-group col-md-6 col-sm-6">
                                        <div className="col-md-8 col-sm-8">
                                            <div className="col-md-12 col-sm-6 text-center">
                                                {filearray?.map((file, i) => (<a key={i} target="_blank" className=" bg-customBlue text-light m-1 p-1">{i + 1}.   {file?.substring(file.indexOf("s") + 2, file.indexOf("_"))}<i className="fa fa-times" onClick={() => { setfilearray(filearray.filter((del, index) => (i !== index))); setcloseRec({ ...closeRec, attachments: closeRec.attachments.replace(`,${filearray[i]}`, '') }) }}></i></a>))}
                                            </div>
                                        </div>

                                    </div></div>

                                    <div className="row"> <div className="field item form-group col-md-12 col-sm-6">

                                        <div className="col-md-12 text-right ">
                                            <button className="btn btn-primary " type="submit" onClick={postData}>
                                                Close Shift
                                            </button>

                                        </div>
                                    </div>
                                    </div>




                                </>}

                            </div>

                        </div>
                    </div>
                    {showtables && <div className="col-md-4 ">
                        <div className="x_panel px-0">

                            <div className="x_content  ">
                                <div className="row">
                                    <div className="field item form-group col-md-12 col-sm-6">
                                        <label className="col-form-label col-md-5 col-sm-4 ">Shift Incharge<span className="required">*</span></label>
                                        <div className="col-md-7 col-sm-8">
                                            <input type="text" className="form-control" value={closeRec.shift_incharge_name} disabled
                                            />
                                        </div>
                                    </div>

                                </div>
                                <div className="row">

                                    <div className="field item form-group col-md-12 col-sm-6">
                                        <label className="col-form-label col-md-5 col-sm-4 ">Quality Incharge<span className="required">*</span></label>
                                        <div className="col-md-7 col-sm-8">
                                            <Select options={inchargeSel}
                                                // value={console.log(inchargeSel?.find(e => e.value == closeRec?.quality_incharge?.quality_incharge_id) || '')}
                                                styles={customStyles}
                                                onChange={(e) => {
                                                    let incharge = closeRec
                                                    incharge.quality_incharge.quality_incharge_id = e.value;
                                                    incharge.quality_incharge.quality_incharge_name = e.label;
                                                    setcloseRec(incharge)

                                                }} /></div>
                                    </div>
                                </div>



                                {closeRec.job_entity.map((data, i) => (<div className="row"
                                // style={{height:'300px', overflow: 'scroll'}}
                                >
                                    <div className="col-md-12 col-sm-12 ">
                                        <div className="x_panel">
                                            <div className="x_content">
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <h3 style={{ fontSize: '20px' }}>Stock Config Table</h3>

                                                        <div className="card-box table-responsive">

                                                            <tr><td>Operator Name: </td><td><input type="text" className="form-control ml-1" value={data.operator_name} disabled
                                                            /></td></tr>
                                                            <table id="datatable-checkbox" className="table table-striped  jambo_table bulk_action">
                                                                <thead>

                                                                    <tr  >
                                                                        <th className='right-border-1'>
                                                                            Item List
                                                                        </th>
                                                                        <th className='right-border-1'>Total Stock</th>
                                                                        <th className='right-border-1'>Remaining Stock</th>
                                                                       


                                                                    </tr>
                                                                </thead>
                                                                <tbody  >
                                                                    {data?.stock_info?.map((item, id) => (<tr >
                                                                        <td><input type='text' value={item.account_name} className='form-control'  disabled onChange={(e) => {

                                                                          



                                                                        }} /></td>
                                                                        <td><input type='number' value={item.issue_quantity} disabled onChange={(e) => {

                                                                           



                                                                        }} className='form-control' /></td>
                                                                        <td><input type='number'  step="0" value={item.remaing_quantity -data.machine_info[id].total_product -data.machine_info[id].total_wasted}
                                                                            
                                                                            className='form-control'  onChange={(e)=>{console.log(e.target.value)}} /></td>
                                                                        


                                                                    </tr>))}

                                                                </tbody>
                                                            </table>
                                                        </div></div>

                                                </div></div>

                                        </div></div>





                                </div>))}
                            </div>
                        </div>
                    </div>}
                </div>
            </div>

        </>
    )
}

export default CloseShift