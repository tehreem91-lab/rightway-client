import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react'
import Select from 'react-select'
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// import { endPoint } from '../../../config/Config' 
import Loader from '../../../../Layout/Loader/Loader';
import { customStyles } from '../../../../Components/reactCustomSelectStyle';
import dateToday, { dateFormaterForInput } from '../../../../config/todayDate';
import { endPoint } from '../../../../config/Config';
import CustomInnerHeader from "../../../../Components/CustomInnerHeader"
// import dateToday, { dateFormaterForInput } from '../../../config/todayDate';
// import { preventMinus } from '../../../config/preventMinus'

const AdvancePayementVoucher = () => {

    const ref = useRef();
    const voucherAbbr = "APV"
    const { state } = useLocation();
    const [selectedAttachmentFile, setSelectedAttachmentFile] = useState("")
    const [selectedAttachmentName, setSelectedAttachmentName] = useState("")
    const [isFileUploadingModeOn, setIsFileUploadingModeOn] = useState(false)

    const [voucherDetail, setVoucherDetail] = useState()
    const [voucherDate, setVoucherDate] = useState(dateToday)
    const showNavMenu = useSelector((state) => state.NavState);

    const [isLoading, setisLoading] = useState(false)
    const [accountType, setAccountType] = useState("bank")
    const [employeeOptions, setEmployeeOptions] = useState([])
    const [employeeOptionValue, setEmployeeOptionValue] = useState("")

    const [bankAccountOptions, setBankAccountOptions] = useState([])
    const [cashAccountOptions, setCashAccountOptions] = useState([])
    const [accountOptions, setAccountOptions] = useState("")
    const [accountOptionValue, setAccountOptionValue] = useState("")
    const [reRender, setReRender] = useState(false)
    const [subAccountValues, setSubAccountValues] = useState([{
        value: "",
        label: "",
        amount: ""
    }])
    const [loanVocherValue, setLoanVocherValue] = useState("")

    const [fileEntity, setFileEntity] = useState([]);
    const [loanMainState, setloanMainState] = useState({
        naration: "",
        loanTotalAmount: "",
        deductionInPercentage: "",
        deductionInAmount: "",
        commaSeperatedAttachmentsPath: "",
        deductionStartingMonth: dateToday.slice(0, 7)
    })

    const accountTypeHandle = (e) => {
        setAccountType(e)
        setAccountOptionValue("")
        e === "cash" ? setAccountOptions(cashAccountOptions) : setAccountOptions(bankAccountOptions)
        setSubAccountValues([{
            value: "",
            label: "",
            amount: ""
        }])

    }
    const fetchInitiallAlldata = () => {
        let voucher_detail_temprary; // a state to manage voucher detail while updating
        // fetching voucher detail 
        var config = {
            method: 'get',
            url: `${endPoint}api/VoucherInvGenerator?abbr=${voucherAbbr}`,
            headers: {
                'Authorization': "Bearer " +
                    JSON.parse(localStorage.getItem("access_token")).access_token,
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setVoucherDetail(response.data)
                    voucher_detail_temprary = response.data;
                }
            })
            .catch(function (error) {
                console.log(error);
            });


        var config2 = {
            method: 'get',
            url: `${endPoint}/api/EmployeeDetails/GetEmployeeForAdvancePayement`,
            // url: `${endPoint}api/EmployeeDetails/GetEmployeeForLoanSettlement`,
            headers: {
                'Authorization': "Bearer " +
                    JSON.parse(localStorage.getItem("access_token")).access_token,
            }
        };

        axios(config2)
            .then(function (response) {
                setEmployeeOptions(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
        var configForAccount = {
            method: 'get',
            url: `${endPoint}api/AccountOptions/GetData?category_name=cash`,
            headers: {
                'Authorization': "Bearer " +
                    JSON.parse(localStorage.getItem("access_token")).access_token,
            }
        };
        axios(configForAccount)
            .then(function (res) {
                if (res.status === 200) {
                    let accOptions = [];
                    res.data.map((eachAccount) => {
                        accOptions.push({
                            value: eachAccount.chart_id,
                            label: `${eachAccount.account_name} (${eachAccount.account_code})`,
                            children: eachAccount?.sub_account, wholeData: eachAccount
                        })
                    })
                    setCashAccountOptions(accOptions)

                }
            })
            .catch(function (error) {
                console.log(error);
            });
        var configForAccount2 = {
            method: 'get',
            url: `${endPoint}api/AccountOptions/GetData?category_name=bank`,
            headers: {
                'Authorization': "Bearer " +
                    JSON.parse(localStorage.getItem("access_token")).access_token,
            }
        };
        axios(configForAccount2)
            .then(function (res) {
                if (res.status === 200) {
                    let accOptions = [];
                    res.data.map((eachAccount) => {
                        accOptions.push({
                            value: eachAccount.chart_id,
                            label: `${eachAccount.account_name} (${eachAccount.account_code})`,
                            children: eachAccount?.sub_account, wholeData: eachAccount
                        })
                    })
                    setBankAccountOptions(accOptions)
                    setAccountOptions(accOptions)

                }
            })
            .catch(function (error) {
                console.log(error);
            });


        if (state !== null) {




        } else {

            setisLoading(false)
        }

    }

    // a function to reset file input after uploading image 
    const reset = () => {
        ref.current.value = "";
    };

    const UploadFile = async (e) => {
        setIsFileUploadingModeOn(true)
        const options = {
            onUploadProgerss: (progressEvent) => {
                const { loaded, total } = progressEvent;
                let percentage = Math.floor((loaded * 100) / total)
                console.log(`${loaded}bytes of ${total}bytes | ${percentage}%`);
            }
        }
        let data = new FormData();
        data.append("UploadedImage", selectedAttachmentFile);
        await axios.post(`${endPoint}/api/FileUpload?file_name=${selectedAttachmentName}`, data, options).then(res => {
            setFileEntity([...fileEntity, res.data])
            if (res.status === 200) {
                setIsFileUploadingModeOn(false)
                reset()
            }
        })
    }


    const PostData = () => {
        console.log(`${endPoint}/api/LoanVoucher/PostSettlement?loan_id=${loanVocherValue}`, "lowerwero");
        var data = JSON.stringify({
            "voucher_date": `${voucherDate}T00:00:00.077Z`,
            "voucher_type_id": 13,
            "naration": loanMainState.naration,
            "attachments": fileEntity.join(",").toString(),
            "chart_id": accountOptionValue.value,
            "entries_naration": loanMainState.naration,
            "debit": loanMainState.loanTotalAmount,
            "credit": 0,
            "monthly_deduction": loanMainState.deductionInAmount,
            "dedction_starting_date": `${loanMainState.deductionStartingMonth}-01T00:00:00.077Z`,
            "sub_account_entries": subAccountValues.map((eachSubAcc) => {
                return {
                    "sub_ladger_chart_id": eachSubAcc.value,
                    "debit": eachSubAcc.amount,
                    "credit": 0,
                }
            }),
            "employee_id": employeeOptionValue.value
        });

        var config = {
            method: 'post',
            url: `${endPoint}/api/LoanVoucher/PostSettlement?loan_id=${loanVocherValue.value}`,
            headers: {
                'Authorization': "Bearer " + JSON.parse(localStorage.getItem("access_token")).access_token,
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    toast.success("Loan Settlement Voucher Added")
                    setEmployeeOptionValue("")
                    setAccountOptionValue("")
                    setSubAccountValues([{
                        value: "",
                        label: "",
                        amount: ""
                    }])

                    setloanMainState({
                        naration: "",
                        loanTotalAmount: "",
                        commaSeperatedAttachmentsPath: "",
                        deductionStartingMonth: dateToday.slice(0, 7)
                    })
                    setIsFileUploadingModeOn(false)
                    setFileEntity([])
                    fetchInitiallAlldata()
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    useEffect(() => {
        fetchInitiallAlldata()
    }, [])

    return (
        <>
            <div
                className={`container-fluid page-title-bar ${showNavMenu == false ? "right_col-margin-remove" : ""
                    }   `}
            >
            <CustomInnerHeader moduleName="Advanced Payment Voucher" isShowSelector={true} />
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
                                <i className="fa fa-edit"></i>&nbsp;Add/Edit Advance Payement Voucher
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
                                            placeholder="BP-2344"
                                            value={voucherDetail?.next_voucher_inv}
                                        />
                                    </div>
                                </div>
                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align"> Date <span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <input
                                            type="date"
                                            className="form-control"
                                            data-validate-length-range={6}
                                            data-validate-words={2}
                                            name="voucher_date"
                                            value={voucherDate}
                                            onChange={(e) => setVoucherDate(e.target.value)}
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
                                            name="last_voucher_inv"
                                            value={voucherDetail?.last_voucher_inv}
                                        />
                                    </div>
                                </div>
                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align pl-0">Last Voucher Date <span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <input
                                            disabled
                                            type="date"
                                            className="form-control"
                                            data-validate-length-range={6}
                                            data-validate-words={2}
                                            name="last_voucher_created_date"
                                            value={dateFormaterForInput(voucherDetail?.last_voucher_created_date)}
                                        />
                                    </div>
                                </div>
                            </div>




                            <div className="row">
                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Select Employee <span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <Select
                                            value={employeeOptionValue}
                                            isSearchable={true}
                                            styles={customStyles}
                                            onChange={(e) => {

                                                setEmployeeOptionValue(e)
                                                setLoanVocherValue("")
                                            }}
                                            options={employeeOptions}

                                        />
                                    </div>
                                </div>
                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Remaining Adv<span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <input
                                            disabled
                                            type="text"
                                            className="form-control"
                                            name="remaining advance capacity"
                                            value={`${employeeOptionValue.remaining_advance_limit} / ${employeeOptionValue.total_advance_limit}`}
                                        />

                                    </div>
                                </div>

                            </div>
                            <div className="row">
                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Preference<span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8 ">

                                        < div className='col-md-6'>
                                            <input type="radio" id="bank" name="fav_language" className='mr-1 mt-2'
                                                checked={accountType === "bank"} value="bank"
                                                onChange={(e) => accountTypeHandle(e.target.value)} />
                                            <label htmlFor="bank" className='mr-4'>Bank </label>

                                        </div>
                                        <div className="col-md-6">
                                            <input type="radio" id="cash" name="fav_language" className='mr-1 mt-2'
                                                checked={accountType === "cash"}
                                                onChange={(e) => accountTypeHandle(e.target.value)} value="cash" />
                                            <label htmlFor="cash" className='mr-4'>Cash</label>
                                        </div>





                                    </div>
                                </div>
                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align">{accountType.toUpperCase()} Account <span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <Select
                                            value={accountOptionValue}
                                            isSearchable={true}
                                            onChange={(e) => {
                                                console.log(e);
                                                setAccountOptionValue(e)
                                                setSubAccountValues([{
                                                    value: "",
                                                    label: "",
                                                    amount: ""
                                                }])
                                                setloanMainState({
                                                    ...loanMainState, loanTotalAmount: ""
                                                })
                                            }}
                                            styles={customStyles}
                                            options={accountOptions}

                                        />
                                    </div>
                                </div>
                            </div>


                            {
                                accountOptionValue !== undefined && accountOptionValue !== "" && accountOptionValue?.children?.length !== 0 && <>{subAccountValues.map((eachAcc, index) => {
                                    return <div className="row" key={index}>
                                        <div className="field item form-group col-md-6 col-sm-6">
                                            <label className="col-form-label col-md-3 col-sm-3 label-align">Sub Account<span className="required">*</span></label>
                                            <div className="col-md-8 col-sm-8">
                                                <Select
                                                    value={subAccountValues[index]}
                                                    isSearchable={true}
                                                    onChange={(e) => {
                                                        const objectData = subAccountValues;
                                                        objectData[index] = {
                                                            ...e,
                                                            amount: objectData[index].amount
                                                        }
                                                        setSubAccountValues(objectData)
                                                        setReRender(!reRender)

                                                    }}
                                                    styles={customStyles}
                                                    options={accountOptionValue?.children?.map((eachOpt) => { return { label: eachOpt.account_name, value: eachOpt.chart_id } })}

                                                />
                                            </div>
                                            {accountOptionValue?.children?.length > subAccountValues?.length && <div className="col-md-1 col-sm-1  " style={{ marginLeft: "-12px", marginTop: "5px" }}>
                                                <i className="fa fa-plus-circle text-customBlue"
                                                    onClick={() => {

                                                        setSubAccountValues([...subAccountValues, {
                                                            value: "",
                                                            label: "",
                                                            amount: ""
                                                        }])

                                                    }}
                                                ></i>
                                            </div>}





                                            {/* <i className="fa fa-times pt-2 text-danger" aria-hidden="true"
    onClick={() => remove_account(index)}
></i>
 */}



                                        </div>
                                        <div className="field item form-group col-md-6 col-sm-6">
                                            <label className="col-form-label col-md-3 col-sm-3 label-align">Amount <span className="required">*</span></label>
                                            <div className="col-md-8 col-sm-8">
                                                <input

                                                    className="form-control"
                                                    value={subAccountValues[index].amount}
                                                    name="last_voucher_"
                                                    placeholder="Enter Amount"
                                                    type="number"
                                                    onChange={(e) => {

                                                        const objectData = subAccountValues;
                                                        objectData[index] = {
                                                            ...objectData[index],
                                                            amount: e.target.value
                                                        }

                                                        let totalLoanAmountCal = 0;
                                                        objectData.map((EachAmo) => {
                                                            totalLoanAmountCal = totalLoanAmountCal + Number(EachAmo.amount)
                                                        })


                                                        setSubAccountValues(objectData)
                                                        setReRender(!reRender)
                                                        setloanMainState({ ...loanMainState, loanTotalAmount: totalLoanAmountCal })


                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                })
                                }</>
                            }

                            <div className="row">
                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Naration <span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <input

                                            className="form-control"
                                            data-validate-length-range={6}
                                            data-validate-words={2}
                                            name="last_voucher_"
                                            value={loanMainState.naration}
                                            placeholder="Enter Naration Here "
                                            type="text"
                                            onChange={(e) => {
                                                setloanMainState({
                                                    ...loanMainState,
                                                    naration: e.target.value,
                                                })
                                            }} />
                                    </div>
                                </div>
                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Advance Amount<span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <input

                                            className="form-control"
                                            disabled={accountOptionValue?.children?.length !== 0 ? true : false}
                                            data-validate-length-range={6}
                                            data-validate-words={2}
                                            name="last_voucher_"
                                            value={loanMainState.loanTotalAmount}
                                            placeholder="Enter Naration Here "
                                            type="number"
                                            onChange={(e) => {
                                                setloanMainState({
                                                    ...loanMainState,
                                                    loanTotalAmount: e.target.value,
                                                    deductionInAmount: "",
                                                    deductionInPercentage: ""
                                                })
                                            }}

                                        />
                                    </div>
                                </div>

                            </div>

                            <div className="row">
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
                                                onChange={(e) => {
                                                    setSelectedAttachmentName((e.target.files[0].name.split("."))[0])
                                                    setSelectedAttachmentFile(e.target.files[0])
                                                }}
                                            /></div>
                                            <div className="col-md-1  " style={{ paddingTop: "1.5px" }}>
                                                {
                                                    isFileUploadingModeOn ? <div className="spinner-border my-2 text-customOrange" role="status">
                                                        <span className="sr-only">Loading...</span>
                                                    </div> : <button
                                                        disabled={ref?.current?.value === "" ? true : false}
                                                        className="btn btn-sm btn-outline-success" onClick={() => UploadFile()} type="button"><i className="fa fa-upload"></i></button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="row">
                                {fileEntity.length !== 0 && <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Attachments</label>
                                    <div className="col-md-8 col-sm-8 ">
                                        {
                                            fileEntity.map((each_attachment, index) => {
                                                return <button className="btn btn-sm  bg-customBlue  text-light">
                                                    <a href={`${endPoint + each_attachment}`} target="_blank" rel="noopener noreferrer" className='text-light'>
                                                        {((each_attachment.split("_"))[0]).slice(15)} {index + 1}</a>
                                                    <i className="fa fa-times   text-light ml-1 " aria-hidden="true"
                                                        onClick={() => {
                                                            let arr_data = fileEntity.filter((each_image) => {
                                                                return (fileEntity.indexOf(each_image) !== index);
                                                            });
                                                            setFileEntity(arr_data)
                                                            setReRender(!reRender)
                                                        }}
                                                    ></i>
                                                </button>
                                            })
                                        }
                                    </div>
                                </div>}
                            </div>
                        </div>
                        <div className="col-md-12 d-flex justify-content-end x_footer mt-0">


                            <button className="btn btn-primary" type="submit" onClick={() => PostData()}>
                                {state === null ? "Submit" : "Update"}
                            </button>

                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default AdvancePayementVoucher;
