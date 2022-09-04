import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react'
import Select from 'react-select'
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// import { endPoint } from '../../../config/Config' 
import Loader from '../../../../Layout/Loader/Loader';
import { customStyles } from '../../../../Components/reactCustomSelectStyle';
// import dateToday, { dateFormaterForInput } from '../../../config/todayDate';
// import { preventMinus } from '../../../config/preventMinus'

const LoanVoucher = () => {

    const ref = useRef();
    const { state } = useLocation();
    const [isFileUploadingModeOn, setIsFileUploadingModeOn] = useState(false)

    const showNavMenu = useSelector((state) => state.NavState);

    const [isLoading, setisLoading] = useState(false)



    return (
        <>
            <div
                className={`container-fluid page-title-bar ${showNavMenu == false ? "right_col-margin-remove" : ""
                    }   `}
            >
                <span>&nbsp;Loan Payement Voucher</span>
            </div>
            <div
                role="main"
                className={`right_col  h-100  ${showNavMenu === false ? "right_col-margin-remove" : " "
                    } `}
            >

                {
                    isLoading ? <><Loader /> </> : <div className="x_panel">
                        <div className="x_content mt-3">
                            <span className="section pl-4">
                                <i className="fa fa-edit"></i>&nbsp;Add/Edit Loan Payement Voucher
                            </span>
                            <div className="row">
                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align"> Voucher # <span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <input
                                            disabled
                                            className="form-control"
                                            data-validate-length-range={6}
                                            data-validate-words={2}
                                            name="next_voucher"
                                            placeholder="Loading"
                                            value="APV-123"
                                        />
                                    </div>
                                </div>
                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Voucher Date <span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <input

                                            type="date"
                                            className="form-control"
                                            data-validate-length-range={6}
                                            data-validate-words={2}
                                            name="voucher_date"
                                            value="27/09/2022"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Last Voucher # <span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <input
                                            disabled
                                            className="form-control"
                                            data-validate-length-range={6}
                                            data-validate-words={2}
                                            name="last_voucher_"
                                            placeholder="Loading"
                                            value="APV-122"
                                        />
                                    </div>
                                </div>
                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Last Voucher Date <span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <input

                                            type="date"
                                            className="form-control"
                                            data-validate-length-range={6}
                                            data-validate-words={2}
                                            name="last_date"
                                            value="27/09/2022"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Select Department <span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <Select
                                            value=""
                                            isSearchable={true}
                                            styles={customStyles}
                                            options={[{}, {}]}
                                        />
                                    </div>
                                </div>
                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Select Employee <span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <Select
                                            value=""
                                            isSearchable={true}
                                            styles={customStyles}
                                            options={[{}, {}]}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Loan Amount<span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <input
                                            disabled
                                            className="form-control"
                                            data-validate-length-range={6}
                                            data-validate-words={2}
                                            name="last_voucher_"
                                            placeholder="Loading"
                                            value="10000"
                                        />
                                    </div>
                                </div>
                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Monthly Deduction <span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <input
                                            disabled
                                            className="form-control"
                                            data-validate-length-range={6}
                                            data-validate-words={2}
                                            name="last_voucher_"
                                            placeholder="Loading"
                                            value="2000"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Naration <span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <input

                                            className="form-control"
                                            data-validate-length-range={6}
                                            data-validate-words={2}
                                            name="Select Amount"
                                            placeholder="Loading"

                                        />
                                    </div>
                                </div>
                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align px-0">Select Attachment</label>
                                    <div className="col-md-8 col-sm-8 ">
                                        <div className="row">
                                            <div className="col-md-10 ">  <input
                                                ref={ref}
                                                type="file"
                                                className="form-control form-control-sm customStyleForInput"
                                                data-validate-length-range={6}
                                                data-validate-words={2}
                                                name="name"

                                            /></div>
                                            <div className="col-md-1  " style={{ paddingTop: "1.5px" }}>
                                                {
                                                    isFileUploadingModeOn ? <div className="spinner-border my-2 text-customOrange" role="status">
                                                        <span className="sr-only">Loading...</span>
                                                    </div> : <button
                                                        disabled={ref?.current?.value === "" ? true : false}
                                                        className="btn btn-sm btn-outline-success" onClick={() => console.log()} type="button"><i className="fa fa-upload"></i></button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div className="col-md-12 d-flex justify-content-end x_footer mt-0">


                            <button className="btn btn-primary" type="submit" onClick={() => console.log()}>
                                {state === null ? "Submit" : "Update"}
                            </button>

                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default LoanVoucher;
