import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from "react-redux";
import Select from 'react-select'
import { useLocation } from 'react-router-dom';
import CustomInnerHeader from '../../Components/CustomInnerHeader';
const ProductReciept = () => {

    const imageInputRef = useRef();
    const location = useLocation();

    const showNavMenu = useSelector((state) => state.NavState);
    const [proDetails, setProDetails] = useState({
        product_name: "",
        product_barcode: "", stock_unit_id: 0, consumption_chart_id: 0,
        quantity_in_grams: 0, image: "",
    })
    const [packets_details, setpackets_details] = useState([{ packet_name: "", pair_base_unit: 0 }]);
    const [stock_attachments, setstock_attachments] = useState([{ stock_id: 0, product_quantity: 0, product_percentage: "" }]);
    const [imgPreview, setimgPreview] = useState(false)
    const [stock, setstock] = useState([]);
    const [stockUnit, setstockUnit] = useState([]);
    const [consumption, setconsumption] = useState([]);
    const [imgsrc, setImgsrc] = useState('')
    const [filename, setfilename] = useState('')
    const [proId, setProId] = useState('')
    const [isValidateAllStates, setIsValidateAllStates] = useState(true)


    const delPacketitem = (idx) => {
        setpackets_details(packets_details.filter((del, i) => (idx !== i + 1)))


    }
    const handlePacketChange = (index, e) => {

        const { name, value } = e.target;
        const list = [...packets_details];
        list[index][name] = value;
        setpackets_details(list);

    }
    const delStockitem = (delindex) => {
        setstock_attachments(stock_attachments.filter((del, i) => (delindex !== i + 1)))

    }
    const handleProductChange = (e) => {
        e.preventDefault();

        const { name, value } = e.target;

        setProDetails({ ...proDetails, [name]: value })

    }
    const handleStockChange = (index, e) => {
        const { name, value } = e.target;
        const list = [...stock_attachments];
        list[index][name] = value;
        setstock_attachments(list);
    }
    //GET
    var axios = require('axios');
    const fetchData = (APIurl) => {
        var config = {
            method: 'GET',
            url: APIurl,
            headers: {
                'Authorization': 'Bearer wMxdleUk-ZhHC2QAxte0dLEyHUnUGoKHNOdRalFYVYvLlWTMMgGNYyJEpa3WiyVdOipdhCUHc6-7U_07tsd8RPYMfcMU3DgAMeYVtiJSkI9LMJlq-mT0lwg94tYRhdnX9Dd1ui_uN0iyglhAz4CTygiHcrQKH0lzEhPZCRGO4qSpJjVuhYmZbnV_jLiP6q3WzbWL_uB9AvLSiKDmNysYVKMTw-sM0SzaTZ0QsQchpw6EigJ4Aat5mqHOV8KyuueTBZTVWOpYBR6r7ul1RK0IBfc2g8TpXIr4EbyyddKEFC8eprWIzNMOA8s-7TQoGUUZk3qQCGG8UgHzyX_mjzr6KD14CXVgS7T_gbUi9ELHIoYfgccorQbUN9v5ann4kQXpwYWjRsRkQnnrQk6uJrwRYe_rTBo374jtmW5opg77FgBRVTbXeUCaaNTdLFKs4grYCNzCk43tCUhV6-q7uUkgxU-BqpQcPrrJTHrruJMOgufR9KTfPrvUPlMC984k7LovM8pHTs-Dy9MwptZPQopGig'
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
               
            })) : (config.url == "http://rightway-api.genial365.com/api/Stock/GetStockSelector") ? (
                axios(config)
                    .then(function (response) {
                        const stockdata = response.data.map((each_voucher) => {
                            return {
                                label: each_voucher.stock_account.stock_account_label,
                                value: each_voucher.stock_account.stock_account_value
                            }

                        })
                        setstock(stockdata);

                    })
                    .catch(function (error) {
                       
                    })) : (config.url == "http://rightway-api.genial365.com/api/Product/GetProductConsumtionAccount") ?
            (axios(config)
                .then(function (response) {
                  

                    const consdata = response.data.map((each_voucher) => {
                        return {
                            label: each_voucher.account_name,
                            value: each_voucher.chart_id
                        }

                    })

                    setconsumption(consdata);
                })
                .catch(function (error) {
                  
                })) : (
                axios(config)
                    .then(function (response) {



                        const { product_bare_code, product_id, image, quantity_in_grams, product_account, consumption_account, stock_attachemnts } = response.data || {}

                        setpackets_details([])

                        setstock_attachments([])
                        setProDetails({
                            product_name: product_account.product_account_label,
                            product_barcode: product_bare_code, stock_unit_id: product_account.product_unit_id, consumption_chart_id: consumption_account.account_value,
                            quantity_in_grams: quantity_in_grams, image: response.data.image
                        })

                        setProId(product_account.product_account_value)

                        setpackets_details(response.data.packets_details)
                        setstock_attachments(stock_attachemnts)
                     
                    })




                    .catch(function (error) {
                      
                    }))
    }
    const EditAPi = () => {
        setIsValidateAllStates(true);

        let isValidationOk = true;

        //proDetails Validation

        if (proDetails.product_name == "") {
            isValidationOk = false

        }
        if (proDetails.product_barcode == "") {
            isValidationOk = false
        }
        if (proDetails.stock_unit_id == "") {
            isValidationOk = false
        }
        if (proDetails.consumption_chart_id == "") {
            isValidationOk = false
        }
        if (proDetails.quantity_in_grams == 0) {

            isValidationOk = false
        }
       
        //pairPacket Validation
        packets_details.map((each_entry) => {
            if (each_entry.packet_name == "") {
                isValidationOk = false
            }
            if (each_entry.pair_base_unit == "") {
                isValidationOk = false
            }
        })
        //pairPacket Validation
        stock_attachments.map((each_entry) => {
            if (each_entry.stock_id == "") {
                isValidationOk = false

            }
            if (each_entry.product_quantity == "") {
                isValidationOk = false
            }
            // if (each_entry.product_percentage == "") {
            //     isValidationOk = false
            // }
        })
        setIsValidateAllStates(isValidationOk)

        if (isValidationOk === true) {
            var data = JSON.stringify({
                product_name: proDetails.product_name,
                product_barcode: proDetails.product_barcode,
                stock_unit_id: proDetails.stock_unit_id,
                consumption_chart_id: proDetails.consumption_chart_id,
                quantity_in_grams: proDetails.quantity_in_grams,
                image: proDetails.image,
                packets_details: packets_details,
                stock_attachments: stock_attachments
            });
           
            var config = {
                method: 'PUT',

                url: `http://rightway-api.genial365.com/api/Product/PutProduct?product_chart_id=${proId}`,
                headers: {
                    'Authorization': 'Bearer wMxdleUk-ZhHC2QAxte0dLEyHUnUGoKHNOdRalFYVYvLlWTMMgGNYyJEpa3WiyVdOipdhCUHc6-7U_07tsd8RPYMfcMU3DgAMeYVtiJSkI9LMJlq-mT0lwg94tYRhdnX9Dd1ui_uN0iyglhAz4CTygiHcrQKH0lzEhPZCRGO4qSpJjVuhYmZbnV_jLiP6q3WzbWL_uB9AvLSiKDmNysYVKMTw-sM0SzaTZ0QsQchpw6EigJ4Aat5mqHOV8KyuueTBZTVWOpYBR6r7ul1RK0IBfc2g8TpXIr4EbyyddKEFC8eprWIzNMOA8s-7TQoGUUZk3qQCGG8UgHzyX_mjzr6KD14CXVgS7T_gbUi9ELHIoYfgccorQbUN9v5ann4kQXpwYWjRsRkQnnrQk6uJrwRYe_rTBo374jtmW5opg77FgBRVTbXeUCaaNTdLFKs4grYCNzCk43tCUhV6-q7uUkgxU-BqpQcPrrJTHrruJMOgufR9KTfPrvUPlMC984k7LovM8pHTs-Dy9MwptZPQopGig',
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                  
                    setProDetails({
                        product_name: "",
                        product_barcode: "", stock_unit_id: 0, consumption_chart_id: "",
                        quantity_in_grams: 0, image: "",
                    })
                    setpackets_details([{ packet_name: "", pair_base_unit: 0 }]);
                    setstock_attachments([{ stock_id: 0, product_quantity: 0, product_percentage: "" }]);
                    setImgsrc(null);
                    setfilename(null);

                })
                .catch(function (error) {
                  
                });
        }
    }
    //POST
    const postdata = () => {

        let isValidationOk = true;

        //proDetails Validation

        if (proDetails.product_name == "") {
            isValidationOk = false

        }
        if (proDetails.product_barcode == "") {
            isValidationOk = false
        }
        if (proDetails.stock_unit_id == "") {
            isValidationOk = false
        }
        if (proDetails.consumption_chart_id == "") {
            isValidationOk = false
        }
        if (proDetails.quantity_in_grams == 0) {

            isValidationOk = false
        }
       
        //pairPacket Validation
        packets_details.map((each_entry) => {
            if (each_entry.packet_name == "") {
                isValidationOk = false
            }
            if (each_entry.pair_base_unit == "") {
                isValidationOk = false
            }
        })
        //pairPacket Validation
        stock_attachments.map((each_entry) => {
            if (each_entry.stock_id == "") {
                isValidationOk = false
             
            }
            if (each_entry.product_quantity == "") {
                isValidationOk = false
            }
            // if (each_entry.product_percentage == "") {
            //     isValidationOk = false
            // }
        })
        setIsValidateAllStates(isValidationOk)

        if (isValidationOk === true) {
            var data = JSON.stringify({
                product_name: proDetails.product_name,
                product_barcode: proDetails.product_barcode,
                stock_unit_id: proDetails.stock_unit_id,
                consumption_chart_id: proDetails.consumption_chart_id,
                quantity_in_grams: proDetails.quantity_in_grams,
                image: proDetails.image,
                packets_details: packets_details,
                stock_attachments: stock_attachments
            });

            var config = {
                method: 'POST',
                url: 'http://rightway-api.genial365.com/api/Product/AddProduct',
                headers: {
                    'Authorization': 'Bearer wMxdleUk-ZhHC2QAxte0dLEyHUnUGoKHNOdRalFYVYvLlWTMMgGNYyJEpa3WiyVdOipdhCUHc6-7U_07tsd8RPYMfcMU3DgAMeYVtiJSkI9LMJlq-mT0lwg94tYRhdnX9Dd1ui_uN0iyglhAz4CTygiHcrQKH0lzEhPZCRGO4qSpJjVuhYmZbnV_jLiP6q3WzbWL_uB9AvLSiKDmNysYVKMTw-sM0SzaTZ0QsQchpw6EigJ4Aat5mqHOV8KyuueTBZTVWOpYBR6r7ul1RK0IBfc2g8TpXIr4EbyyddKEFC8eprWIzNMOA8s-7TQoGUUZk3qQCGG8UgHzyX_mjzr6KD14CXVgS7T_gbUi9ELHIoYfgccorQbUN9v5ann4kQXpwYWjRsRkQnnrQk6uJrwRYe_rTBo374jtmW5opg77FgBRVTbXeUCaaNTdLFKs4grYCNzCk43tCUhV6-q7uUkgxU-BqpQcPrrJTHrruJMOgufR9KTfPrvUPlMC984k7LovM8pHTs-Dy9MwptZPQopGig',
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                  
                    setProDetails({
                        product_name: "",
                        product_barcode: "", stock_unit_id: 0, consumption_chart_id: "",
                        quantity_in_grams: 0, image: null || '',
                    })

                    setpackets_details([{ packet_name: "", pair_base_unit: 0 }]);
                    setstock_attachments([{ stock_id: 0, product_quantity: 0, product_percentage: "" }]);
                    setImgsrc('');
                    setfilename('');
                    imageInputRef.current.value = "";

                })
                .catch(function (error) {
                   

                });
        }

    }
    //UseEffect to call GET
    useEffect(() => {
        fetchData("http://rightway-api.genial365.com/api/StockUnits/GetData");
        fetchData("http://rightway-api.genial365.com/api/Stock/GetStockSelector");
        fetchData("http://rightway-api.genial365.com/api/Product/GetProductConsumtionAccount")
        if ((location?.state?.id) && (location?.state?.flag)) {
            fetchData(
                `http://rightway-api.genial365.com/api/Product/GetProductById?product_id=${location.state.id}`)

        }

    }, [])
    //POST Image (Upload)
    const updateData = async () => {
        if(filename){
        let data = new FormData();
        data.append("UploadedImage", filename);
        await axios.post(`http://rightway-api.genial365.com/api/FileUpload?file_name=${filename.name}`, data).then(res => {
            if (res.status === 200) {
                setimgPreview(true);
            }
        })
    }
    }
    return (
        <>
            <div className={`container-fluid page-title-bar ${showNavMenu == false ? "right_col-margin-remove" : ""}   `} >
            <CustomInnerHeader moduleName={"Production"} isShowSelector={true}/>
            </div>
            <div role="main" className={`right_col  h-100  ${showNavMenu === false ?
                "right_col-margin-remove" : " "} `}>
                <div className="x_panel needs-validation">
                    <div className="x_content my-3">
                        <span className="section pl-4">
                            <i className="fa fa-edit"></i>&nbsp;Product Details
                        </span>
                        <div className="row">
                            <div className="field item form-group col-md-6 col-sm-6">
                                <label className="col-form-label col-md-3 col-sm-3 label-align">Product Name<span className="required">*</span></label>
                                <div className="col-md-5 col-sm-8">
                                    <input
                                        type="text"
                                        className="form-control"
                                        data-validate-length-range={6}
                                        data-validate-words={2}
                                        value={proDetails.product_name}
                                        name="product_name"
                                        onChange={handleProductChange} />
                                    {!isValidateAllStates && (proDetails.product_name === "" || proDetails.product_name === undefined) && <span className="text-danger">First Select this </span>}
                                </div>
                                <label className="col-form-label col-md-3 col-sm-3 label-align">Stock Unit<span className="required">*</span></label>
                                <div className="col-md-4 col-sm-8">
                                    <Select

                                        isSearchable={true}

                                        value={stockUnit.find(e => e.value == proDetails.stock_unit_id) || ''}
                                        options={stockUnit}
                                        onChange={(e) => { setProDetails({ ...proDetails, stock_unit_id: e.value }); }}
                                    />




                                    {!isValidateAllStates && (proDetails.stock_unit_id == "") && <span className="text-danger">First Select this </span>}</div>
                                <label className="col-form-label col-md-4 col-sm-3 label-align">Consumption Account<span className="required">*</span></label>
                                <div className="col-md-5 col-sm-8">
                                    <Select

                                        isSearchable={true}
                                        options={consumption}

                                        value={consumption.find(e => e.value == proDetails.consumption_chart_id) || ''}
                                        onChange={(e) => { setProDetails({ ...proDetails, consumption_chart_id: e.value }); }}

                                    />

                                    {!isValidateAllStates && (proDetails.consumption_chart_id == "") && <span className="text-danger">First Select this </span>}</div>
                            </div>

                        </div>
                        <div className="row my-1">
                            <div className="field item form-group col-md-6 col-sm-6">
                                <label className="col-form-label col-md-3 col-sm-3 label-align">Barcode<span className="required">*</span></label>
                                <div className="col-md-5 col-sm-8">
                                    <input
                                        type="text"
                                        className="form-control"
                                        data-validate-length-range={6}
                                        data-validate-words={2}
                                        value={proDetails.product_barcode}
                                        name="product_barcode"
                                        onChange={handleProductChange}

                                    />
                                    {!isValidateAllStates && (proDetails.product_barcode === "" || proDetails.product_barcode === undefined) && <span className="text-danger">First Select this </span>}
                                </div>
                                <label className="col-form-label col-md-3 col-sm-3 label-align">Quantity in gram<span className="required">*</span></label>
                                <div className="col-md-4 col-sm-8">
                                    <input
                                        type="number"
                                        className="form-control"
                                        min="0"
                                        value={proDetails.quantity_in_grams}
                                        data-validate-length-range={6}
                                        data-validate-words={2}
                                        name="quantity_in_grams"
                                        onChange={handleProductChange}
                                    />
                                    {!isValidateAllStates && (proDetails.quantity_in_grams === 0 || proDetails.quantity_in_grams === undefined) && <span className="text-danger">First Select this </span>}
                                </div>
                                <label className="col-form-label col-md-3 col-sm-3 label-align" htmlFor="img">Select image</label>
                                <div className="col-md-6 col-sm-8  border p-1">
                                    <input type="file" id="img" name="image" accept="image/*"
                                        //  style={{display:"none"}}
                                        ref={imageInputRef} onChange={(e) => {

                                            setimgPreview(false)
                                            setImgsrc(URL.createObjectURL(e.target.files[0]));
                                            handleProductChange(e);
                                            setfilename(e.target.files[0])

                                        }} />
                                    {/* <label for="img">Click me to upload image</label> */}
                                    {(imgPreview) ? (<img className="my-1 mx-1" width="80" src={imgsrc} />) : null}
                                    {/* <img src="http://rightway-api.genial365.com/api/Product/GetProduct/C:/fakepath/pexels-nao-triponez-129208.jpg" /> */}
                                   
                                </div>
                                <div className="col-md-1 col-sm-2 p-1">
                                    <button className="btn btn-sm btn-outline-warning" type="button" onClick={() => updateData()}><i className="fa fa-upload"></i></button>
                                </div>

                            </div>

                        </div>

                    </div>
                    <div className="x_content my-3">
                        <span className="section pl-4">
                            <i className="fa fa-edit"></i>&nbsp;Pair Packet
                        </span>
                        {packets_details?.map((Rec, id) => <><div key={id} className="row">
                            <div className="field item form-group col-md-6 col-sm-6">
                                <label className="col-form-label col-md-3 col-sm-3 label-align">Packet Name<span className="required">*</span></label>
                                <div className="col-md-5 col-sm-8">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="packet_name"

                                        data-validate-length-range={6}
                                        data-validate-words={2}
                                        value={Rec.packet_name}
                                        onChange={(e) => { handlePacketChange(id, e) }}
                                    />
                                    {!isValidateAllStates && (packets_details[id].packet_name === "" || packets_details[id].packet_name === undefined) && <span className="text-danger">First Select this </span>}
                                </div>
                                <label className="col-form-label col-md-3 col-sm-3 label-align">Packet Id<span className="required">*</span></label>
                                <div className="col-md-5 col-sm-8">
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="pair_base_unit"
                                        data-validate-length-range={6}
                                        data-validate-words={2}
                                        min="0"
                                        value={Rec.pair_base_unit}
                                        onChange={(e) => { handlePacketChange(id, e) }}
                                    />
                                    {!isValidateAllStates && (packets_details[id].pair_base_unit == "" || packets_details[id].pair_base_unit == 0) && <span className="text-danger">First Select this </span>}
                                </div>
                                <i className="fa fa-trash-o btn text-danger  mx-0 p-0 " onClick={() => delPacketitem(id + 1)}></i>
                            </div>

                        </div></>)}
                        <button className="btn-sm btn-primary x_footer mx-3 my-3" onClick={() => setpackets_details([...packets_details, { packet_name: "", pair_base_unit: 0 }])}  >
                            Add Packet Line
                        </button>
                    </div>
                    <div className="x_content my-3">
                        <span className="section pl-4">
                            <i className="fa fa-edit"></i>&nbsp;Attach Stock
                        </span>
                        {stock_attachments?.map((Rec, i) => <><div key={i} className="row">
                            <div className="field item form-group col-md-6 col-sm-6">
                                <label className="col-form-label col-md-3 col-sm-3 label-align">Stock Name<span className="required">*</span></label>
                                <div className="col-md-4 col-sm-8">

                                    <Select

                                        value={stock.find(e => e.value == stock_attachments[i].stock_id) || ''}
                                        isSearchable={true}
                                        options={stock}
                                        onChange={((e) => {

                                            const list = [...stock_attachments];
                                            list[i].stock_id = e.value;
                                            setstock_attachments(list);
                                        })

                                        }
                                    />

                                    {!isValidateAllStates && (stock_attachments[i].stock_id == "") && <span className="text-danger">First Select this </span>}</div>
                                <label className="col-form-label col-md-3 col-sm-3 label-align">Quantity<span className="required">*</span></label>
                                <div className="col-md-5 col-sm-8">
                                    <input
                                        type="number"
                                        data-validate-length-range={6}
                                        data-validate-words={2}
                                        min="0"
                                        className="form-control"
                                        name="product_quantity"
                                        value={Rec.product_quantity}
                                        onChange={(e) => { handleStockChange(i, e) }}
                                    />
                                    {!isValidateAllStates && (stock_attachments[i].product_quantity == "" || stock_attachments[i].product_quantity == 0) && <span className="text-danger">First Select this </span>}
                                </div>
                                <label className="col-form-label col-md-3 col-sm-3 label-align">Percentage<span className="required">*</span></label>
                                <div className="col-md-5 col-sm-8">
                                    <input
                                        type="text"
                                        data-validate-length-range={6}
                                        data-validate-words={2}
                                        className="form-control"
                                        name="product_percentage"
                                        value={Rec.product_percentage}
                                        onChange={(e) => { handleStockChange(i, e) }}
                                        disabled
                                    />
                                    {/* {!isValidateAllStates && (stock_attachments[id].product_percentage === "" || stock_attachments.product_percentage === undefined) && <span className="text-danger">First Select this </span>} */}
                                </div>
                                <i className="fa fa-trash-o btn text-danger  mx-0 p-0 " onClick={() => delStockitem(i + 1)} ></i>
                            </div>

                        </div></>)}
                        <button className="btn-sm btn-primary x_footer mx-3 my-3" onClick={() => setstock_attachments([...stock_attachments, { stock_id: 0, product_quantity: 0, product_percentage: " " }])}  >
                            Add Stock Line
                        </button>
                    </div>
                    <div className="col-md-12 text-right x_footer">
                        {(location?.state?.flag) ? (<button className="btn btn-primary" onClick={EditAPi} type="submit">Edit</button>) : (<button className="btn btn-primary" type="submit" onClick={() => postdata()}>
                            Submit
                        </button>)}
                    </div>   </div>
            </div></>
    )
}

export default ProductReciept