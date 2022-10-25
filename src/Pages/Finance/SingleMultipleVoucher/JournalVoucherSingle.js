import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react'
import Select from 'react-select'
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Loader from '../../../Layout/Loader/Loader'
import { endPoint } from '../../../config/Config'
import { customStyles } from '../../../Components/reactCustomSelectStyle';
import dateToday, { dateFormaterForInput } from '../../../config/todayDate';
import { preventMinus } from '../../../config/preventMinus'

const JournalVoucherSingle = () => {
    let voucherAbbr = "JV"
    let accountAbbr = "all"
    let voucher_type_id = 10
    let page_name = "Journal Voucher"

    const user_id = localStorage.getItem("user_id");
    const ref = useRef();
    const navigate = useNavigate();
    const { state } = useLocation();


    const showNavMenu = useSelector((state) => state.NavState);

    const [isLoading, setisLoading] = useState(true)

    const [accountOptions, setAccountOptions] = useState([])
    const [voucherDetail, setVoucherDetail] = useState()
    const [voucherDate, setVoucherDate] = useState(dateToday)
    const [fileEntity, setFileEntity] = useState([]);
    const [balanceEntries, setBalanceEntries] = useState({
        total_credit: 0,
        total_debit: 0
    })
    const [isValidateAllStates, setIsValidateAllStates] = useState(true)
    const [selectedAttachmentFile, setSelectedAttachmentFile] = useState("")
    const [selectedAttachmentName, setSelectedAttachmentName] = useState("")
    const [draftEntries, setDraftEntries] = useState([])
    const [postDatedCheckDate, setPostDatedCheckDate] = useState(dateToday)
    const [isFileUploadingModeOn, setIsFileUploadingModeOn] = useState(false)
    const [reRendered, setReRendered] = useState(false)

    const [mainEntriesState1, setmainEntriesState1] = useState(
        [
            { naration: "", debit: "", credit: "", }
        ]
    )
    const [mainEntriesState, setmainEntriesState] = useState(
        [
            { naration: "", debit: "", credit: "", }
        ]
    )

    const [isPostDatedCheck, setisPostDatedCheck] = useState(false)





    // a function to reset file input after uploading image 
    const reset = () => {
        ref.current.value = "";
    };
    const fetch_draft_data = () => {

        var configDrafGet = {
            method: 'get',
            url: `${endPoint}api/userDraft?userId=${(user_id).slice(2, -2)}`,
            headers: {
                'Authorization': `bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
            }
        };

        axios(configDrafGet)
            .then(function (response) {
                setDraftEntries(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });

    }
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
    }// fetch initial data for form includes selectors nd other detail
    // but also fetch specially data if its in edit/update mode 
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
                    console.log(response.data, "------------");
                    setVoucherDetail(response.data)
                    voucher_detail_temprary = response.data;
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        // fetching account options 
        var configForAccount = {
            method: 'get',
            url: `${endPoint}api/AccountOptions/GetData?category_name=${accountAbbr}`,
            headers: {
                'Authorization': "Bearer " +
                    JSON.parse(localStorage.getItem("access_token")).access_token,
            }
        };
        axios(configForAccount)
            .then(function (res) {
                if (res.status === 200) {
                    let accOptions = [];
                    console.log(res.data);
                    res.data.map((eachAccount) => {
                        accOptions.push({
                            value: eachAccount.chart_id,
                            label: `${eachAccount.account_name} (${eachAccount.account_code})`,
                            disabled: eachAccount.sub_account.length === 0 ? false : true,
                            children: eachAccount?.sub_account, wholeData: eachAccount,
                        })
                        //  return null // just added to remove warning eg. Array.prototype.map() expects a return value from arrow function
                    })
                    setAccountOptions(accOptions)

                }
            })
            .catch(function (error) {
                console.log(error);
            });

        // fetching detail to update vocuher
        if (state !== null) {

            var config2 = {
                method: 'get',
                url: `${endPoint}/api/SingleVoucher/GetReportForUpdate?voucher_id=${state.data}`,
                headers: {
                    'Authorization': "Bearer " +
                        JSON.parse(localStorage.getItem("access_token")).access_token
                }
            };

            axios(config2)
                .then(function (response) {
                    console.log(response.data);
                    setVoucherDetail({ ...voucher_detail_temprary, next_voucher_inv: response.data.voucher_no })
                    setisPostDatedCheck(response.data.is_post_dated === 0 ? false : true)
                    setPostDatedCheckDate(response.data.post_dated_date.slice(0, 10))
                    if (response.data.attachments_paths !== "") {
                        setFileEntity(response.data.attachments_paths.split(","));
                    }  // setting files path from string to array with validation of being empty
                    const formal_state_to_rearrange_entries = response.data.entries.map((each_account) => {

                        return {
                            naration: each_account.naration,
                            debit: each_account.debit,
                            credit: each_account.credit,
                            selectedOptionValue: {
                                value: each_account.selectedOptionValue.value,
                                label: each_account.selectedOptionValue.label,
                                children: each_account.selectedOptionValue.children,
                                wholeData: each_account.selectedOptionValue.wholeData,
                            },
                            //data fetching from backend api is very well but strucute was a little bit messy as 
                            //these following line should come seperately but they received in nested
                            //but its working well so move on

                            showChild: each_account.selectedOptionValue.showChild,
                            numberOfChild: each_account.selectedOptionValue.numberOfChild,
                            sub_account_options: each_account.selectedOptionValue.sub_account_options,
                            sub_account_State: each_account.selectedOptionValue.sub_account_State,

                        }

                    })

                    setmainEntriesState(formal_state_to_rearrange_entries)
                    setmainEntriesState1(
                        [
                            {
                                showChild: false,
                                selectedOptionValue: {
                                    value: response.data.entries_1[0].selectedOptionValue.value,
                                    label: response.data.entries_1[0].selectedOptionValue.label,
                                    wholeData: response.data.entries_1[0].selectedOptionValue.wholeData,
                                },
                                naration: response.data.entries_1[0].naration, debit: response.data.entries_1[0].debit, credit: response.data.entries_1[0].credit,
                            }
                        ]
                    )
                    console.log(response.data.entries_1[0].selectedOptionValue.wholeData, "whole data ");
                    if (response.status === 200) {
                        setisLoading(false)
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });


        } else {
            fetch_draft_data()
            setisLoading(false)
        }

    }


    // input handler for first Account 
    const handleAccountSelector1 = (e, index) => {
        let sub_account_options_arr = [];
        e.children.map((eachChild) => {
            sub_account_options_arr.push({ label: eachChild?.account_name, value: eachChild?.chart_id })
        })
        const main_state_arr1 = mainEntriesState1;
        main_state_arr1[index] = {
            naration: "", debit: "", credit: "",
            selectedOptionValue: e, showChild: true,
            numberOfChild: e.children.length,
            sub_account_options: e.children.length > 0 ? sub_account_options_arr : null,
            sub_account_State: e.children.length > 0 ? [{
                //first sub_ladger 
                selected_sub_account: "",
                chart_id: "", account_name: "", account_code: "",
                credit: "", debit: ""
            }] : null
        }
        setmainEntriesState1(main_state_arr1)
        setReRendered(!reRendered)
    }
    const add_new_sub_account1 = (main_state_index1, sub_state_index) => {

        const main_state_arr1 = mainEntriesState1;
        main_state_arr1[main_state_index1] = {
            ...mainEntriesState1[main_state_index1],
            sub_account_State: [
                ...main_state_arr1[main_state_index1].sub_account_State,
                {
                    selected_sub_account: "",
                    chart_id: "", account_name: "", account_code: "",
                    credit: "", debit: ""
                }]
        }
        setmainEntriesState1(main_state_arr1)
        setReRendered(!reRendered)
    }

    const remove_sub_account_entry1 = (main_state_index1, sub_account_index) => {
        let arr_data1 = mainEntriesState1[main_state_index1].sub_account_State.filter((each_sub_state) => {
            return (mainEntriesState1[main_state_index1].sub_account_State.indexOf(each_sub_state) !== sub_account_index);
        });

        const main_state_arr1 = mainEntriesState1;
        main_state_arr1[main_state_index1] = {
            ...mainEntriesState1[main_state_index1],
            sub_account_State: arr_data1
        }
        setmainEntriesState1(main_state_arr1)
        setReRendered(!reRendered)
        update_total_balance()

    }
    const update_naration1 = (main_state_index1, e) => {
        const main_state_arr1 = mainEntriesState1;
        main_state_arr1[main_state_index1] = {
            ...mainEntriesState1[main_state_index1],
            naration: e.target.value
        }
        setmainEntriesState1(main_state_arr1)
        setReRendered(!reRendered)
    }
    const update_debit1 = (main_state_index1, e) => {
        const main_state_arr1 = mainEntriesState1;
        main_state_arr1[main_state_index1] = {
            ...mainEntriesState1[main_state_index1],
            debit: e.target.value, credit: "0"
        }
        setmainEntriesState1(main_state_arr1)
        setReRendered(!reRendered)

        update_total_balance()
    }
    const update_credit1 = (main_state_index1, e) => {
        const main_state_arr1 = mainEntriesState1;
        main_state_arr1[main_state_index1] = {
            ...mainEntriesState1[main_state_index1],
            credit: e.target.value, debit: "0"
        }
        setmainEntriesState1(main_state_arr1)
        setReRendered(!reRendered)

        update_total_balance()
    }
    const update_selcted_sub_account1 = (main_state_index1, sub_account_index, e) => {
        var arrMain1 = mainEntriesState1;
        var sub_account_array1 = arrMain1[main_state_index1].sub_account_State;
        sub_account_array1[sub_account_index] = { ...arrMain1[main_state_index1].sub_account_State[sub_account_index], selected_sub_account: e }
        arrMain1[main_state_index1] = {
            ...arrMain1[main_state_index1],
            sub_account_State: sub_account_array1
        }
        setmainEntriesState1(arrMain1)
        setReRendered(!reRendered)
    }
    const update_sub_account_credit1 = (main_state_index1, sub_account_index, e) => {

        var arrMain1 = mainEntriesState1;
        var sub_account_array1 = arrMain1[main_state_index1].sub_account_State;
        sub_account_array1.map((Each_sub_acc, index) => {
            sub_account_array1[index] = { ...arrMain1[main_state_index1].sub_account_State1[index], debit: "0" }
        })
        sub_account_array1[sub_account_index] = { ...arrMain1[main_state_index1].sub_account_State1[sub_account_index], credit: e.target.value, debit: "0" }
        arrMain1[main_state_index1] = {
            ...arrMain1[main_state_index1],
            sub_account_State: sub_account_array1
        }
        setmainEntriesState1(arrMain1)
        setReRendered(!reRendered)
        let debit = 0;
        let credit = 0;
        sub_account_array1.map((each_sub_account) => {
            debit = debit + Number(each_sub_account.debit)
            credit = credit + Number(each_sub_account.credit)
            // }
        })
        const main_state_arr1 = mainEntriesState1;
        main_state_arr1[main_state_index1] = {
            ...mainEntriesState1[main_state_index1],
            debit: debit, credit: credit
        }
        setmainEntriesState1(main_state_arr1)
        setReRendered(!reRendered)
        update_total_balance()
    }
    const update_sub_account_debit1 = (main_state_index1, sub_account_index, e) => {
        var arrMain1 = mainEntriesState1;
        var sub_account_array1 = arrMain1[main_state_index1].sub_account_State;
        sub_account_array1.map((Each_sub_acc, index) => {
            sub_account_array1[index] = { ...arrMain1[main_state_index1].sub_account_State[index], credit: "0" }
        })
        sub_account_array1[sub_account_index] = { ...arrMain1[main_state_index1].sub_account_State[sub_account_index], debit: e.target.value, credit: "0" }
        arrMain1[main_state_index1] = {
            ...arrMain1[main_state_index1],
            sub_account_State: sub_account_array1
        }
        setmainEntriesState1(arrMain1)
        setReRendered(!reRendered)
        let debit = 0;
        let credit = 0;
        sub_account_array1.map((each_sub_account) => {
            debit = debit + Number(each_sub_account.debit)
            credit = credit + Number(each_sub_account.credit)
        })
        const main_state_arr1 = mainEntriesState1;
        main_state_arr1[main_state_index1] = {
            ...mainEntriesState1[main_state_index1],
            debit: debit, credit: credit
        }
        setmainEntriesState1(main_state_arr1)
        setReRendered(!reRendered)
        update_total_balance()
    }
    // input handler for Multiple Account 
    const handleAccountSelector = (e, index) => {
        let sub_account_options_arr = [];
        e.children.map((eachChild) => {
            sub_account_options_arr.push({ label: eachChild?.account_name, value: eachChild?.chart_id })
        })
        const main_state_arr = mainEntriesState;
        main_state_arr[index] = {
            naration: "", debit: "", credit: "",
            selectedOptionValue: e, showChild: true,
            numberOfChild: e.children.length,
            sub_account_options: e.children.length > 0 ? sub_account_options_arr : null,
            sub_account_State: e.children.length > 0 ? [{
                //first sub_ladger 
                selected_sub_account: "",
                chart_id: "", account_name: "", account_code: "",
                credit: "", debit: ""
            }] : null
        }
        setmainEntriesState(main_state_arr)
        setReRendered(!reRendered)
    }
    const add_new_sub_account = (main_state_index, sub_state_index) => {

        const main_state_arr = mainEntriesState;
        main_state_arr[main_state_index] = {
            ...mainEntriesState[main_state_index],
            sub_account_State: [
                ...main_state_arr[main_state_index].sub_account_State,
                {
                    selected_sub_account: "",
                    chart_id: "", account_name: "", account_code: "",
                    credit: "", debit: ""
                }]
        }
        setmainEntriesState(main_state_arr)
        setReRendered(!reRendered)
    }

    const remove_account = (main_state_index) => {
        let arr_data = mainEntriesState.filter((eachShift) => {
            return (mainEntriesState.indexOf(eachShift) !== main_state_index);
        });
        setmainEntriesState(arr_data)
        setReRendered(!reRendered)
        update_total_balance()
    }
    const remove_sub_account_entry = (main_state_index, sub_account_index) => {
        let arr_data = mainEntriesState[main_state_index].sub_account_State.filter((each_sub_state) => {
            return (mainEntriesState[main_state_index].sub_account_State.indexOf(each_sub_state) !== sub_account_index);
        });

        const main_state_arr = mainEntriesState;
        main_state_arr[main_state_index] = {
            ...mainEntriesState[main_state_index],
            sub_account_State: arr_data
        }
        setmainEntriesState(main_state_arr)
        setReRendered(!reRendered)
        update_total_balance()

    }
    const update_naration = (main_state_index, e) => {
        const main_state_arr = mainEntriesState;
        main_state_arr[main_state_index] = {
            ...mainEntriesState[main_state_index],
            naration: e.target.value
        }
        setmainEntriesState(main_state_arr)
        setReRendered(!reRendered)
    }
    const update_debit = (main_state_index, e) => {
        const main_state_arr = mainEntriesState;
        main_state_arr[main_state_index] = {
            ...mainEntriesState[main_state_index],
            debit: e.target.value, credit: "0"
        }
        setmainEntriesState(main_state_arr)
        setReRendered(!reRendered)

        update_total_balance()
    }
    const update_credit = (main_state_index, e) => {
        const main_state_arr = mainEntriesState;
        main_state_arr[main_state_index] = {
            ...mainEntriesState[main_state_index],
            credit: e.target.value, debit: "0"
        }
        setmainEntriesState(main_state_arr)
        setReRendered(!reRendered)

        update_total_balance()
    }
    const update_selcted_sub_account = (main_state_index, sub_account_index, e) => {
        var arrMain = mainEntriesState;
        var sub_account_array = arrMain[main_state_index].sub_account_State;
        sub_account_array[sub_account_index] = { ...arrMain[main_state_index].sub_account_State[sub_account_index], selected_sub_account: e }
        arrMain[main_state_index] = {
            ...arrMain[main_state_index],
            sub_account_State: sub_account_array
        }
        setmainEntriesState(arrMain)
        setReRendered(!reRendered)
    }
    const update_sub_account_credit = (main_state_index, sub_account_index, e) => {

        var arrMain = mainEntriesState;
        var sub_account_array = arrMain[main_state_index].sub_account_State;
        sub_account_array.map((Each_sub_acc, index) => {
            sub_account_array[index] = { ...arrMain[main_state_index].sub_account_State[index], debit: "0" }
        })
        sub_account_array[sub_account_index] = { ...arrMain[main_state_index].sub_account_State[sub_account_index], credit: e.target.value, debit: "0" }
        arrMain[main_state_index] = {
            ...arrMain[main_state_index],
            sub_account_State: sub_account_array
        }
        setmainEntriesState(arrMain)
        setReRendered(!reRendered)
        let debit = 0;
        let credit = 0;
        sub_account_array.map((each_sub_account) => {
            debit = debit + Number(each_sub_account.debit)
            credit = credit + Number(each_sub_account.credit)
            // }
        })
        const main_state_arr = mainEntriesState;
        main_state_arr[main_state_index] = {
            ...mainEntriesState[main_state_index],
            debit: debit, credit: credit
        }
        setmainEntriesState(main_state_arr)
        setReRendered(!reRendered)
        update_total_balance()
    }
    const update_sub_account_debit = (main_state_index, sub_account_index, e) => {
        var arrMain = mainEntriesState;
        var sub_account_array = arrMain[main_state_index].sub_account_State;
        sub_account_array.map((Each_sub_acc, index) => {
            sub_account_array[index] = { ...arrMain[main_state_index].sub_account_State[index], credit: "0" }
        })
        sub_account_array[sub_account_index] = { ...arrMain[main_state_index].sub_account_State[sub_account_index], debit: e.target.value, credit: "0" }
        arrMain[main_state_index] = {
            ...arrMain[main_state_index],
            sub_account_State: sub_account_array
        }
        setmainEntriesState(arrMain)
        setReRendered(!reRendered)
        let debit = 0;
        let credit = 0;
        sub_account_array.map((each_sub_account) => {
            debit = debit + Number(each_sub_account.debit)
            credit = credit + Number(each_sub_account.credit)
        })
        const main_state_arr = mainEntriesState;
        main_state_arr[main_state_index] = {
            ...mainEntriesState[main_state_index],
            debit: debit, credit: credit
        }
        setmainEntriesState(main_state_arr)
        setReRendered(!reRendered)
        update_total_balance()
    }



    const update_total_balance = () => {
        let total_credit = 0;
        let total_debit = 0;
        mainEntriesState.map((each_entry) => {
            total_debit = total_debit + Number(each_entry.debit);
            total_credit = total_credit + Number(each_entry.credit);
        })
        const balance_obj = {
            total_credit, total_debit
        }
        setBalanceEntries(balance_obj)
    }


    const post_multiple_voucher = () => {
        // check validation 
        // setIsValidateAllStates
        let isValidationOk = true;
        mainEntriesState.map((each_entry) => {
            if (each_entry.naration === "") {
                isValidationOk = false
            }
            if (each_entry.selectedOptionValue === "") {
                isValidationOk = false
            }
            if (each_entry.credit === "" && each_entry.debit === "") {
                isValidationOk = false
            }
            if (each_entry.hasOwnProperty("sub_account_State") && each_entry.sub_account_State !== null) {
                if (each_entry.sub_account_State === null || each_entry.sub_account_State.selected_sub_account === "") {
                    isValidationOk = false
                }

                each_entry.sub_account_State.map((each_sub_entry) => {
                    if (each_sub_entry.credit === "" && each_sub_entry.debit === "") {
                        isValidationOk = false
                    }
                    if (each_sub_entry.selected_sub_account === "") {
                        isValidationOk = false
                    }

                })
            }
            setIsValidateAllStates(isValidationOk)
        })
        if (isValidationOk === true) {
            if ((mainEntriesState1[0].debit - mainEntriesState1[0].credit) + (balanceEntries.total_debit - balanceEntries.total_credit) !== 0) {
                toast.error("Current Balance Is Not Satisfy")
            } else {
                console.log(mainEntriesState, "----");
                const reFactoredState = mainEntriesState.map((each_main_entry) => {
                    const sub_account_entries = each_main_entry?.sub_account_State?.map((each_sub_account) => {
                        return {
                            "debit": Number(each_sub_account.debit),
                            "credit": Number(each_sub_account.credit),
                            "sub_ladger_account_id": each_sub_account.selected_sub_account[0] === undefined ? each_sub_account.selected_sub_account.value : each_sub_account.selected_sub_account[0].value,
                        }
                    })

                    // in above state value of selected sub account was receiviing as object in post method but in
                    // put method value erceived was in List(Array) from backend that was solved through front end with validation 

                    const state_to_return = {
                        "account_id": each_main_entry.selectedOptionValue.value,
                        "naration": each_main_entry.naration,
                        "debit": Number(each_main_entry.debit),
                        "credit": Number(each_main_entry.credit),
                        "sub_account_entries": sub_account_entries === undefined ? [] : sub_account_entries
                    }
                    return state_to_return;
                });





                let data_2 = JSON.stringify({

                    "fiscal_year": 1,
                    "voucher_inv": voucherDetail?.next_voucher_inv,
                    "voucher_date": `${voucherDate}T00:00:00.077Z`,
                    "voucher_type_id": voucher_type_id,
                    "is_multiple_vouchers": Number(false),
                    "is_post_dated": Number(isPostDatedCheck),
                    "post_dated_status": 0,
                    "post_dated_date": `${postDatedCheckDate}T00:00:00.077Z`,
                    "naration": "Naration for Finance main_hard_code_front_end",
                    "reference": "no reference",
                    "attachments": fileEntity.join(",").toString(),
                    "branch_id": 1,

                    // "account_entries_1": [
                    //     {
                    //         "account_id": mainEntriesState1[0].selectedOptionValue.value,
                    //         "naration": mainEntriesState1[0].naration,
                    //         "debit": 0,
                    //         "credit": 0, // its debit/credit doesnot effect anything except front end handling so i dont think we need to send this info in backend
                    //         "sub_account_entries": [
                    //             {
                    //                 "sub_ladger_account_id": 0,
                    //                 "debit": 0,
                    //                 "credit": 0
                    //             }
                    //         ]
                    //     }
                    // ],

                    "account_entries_1": [
                        {
                            "account_id": mainEntriesState1[0].selectedOptionValue.value,
                            "naration": mainEntriesState1[0].naration,
                            "debit": 0,
                            "credit": 0,
                            "sub_account_entries": [
                                {
                                    "sub_ladger_account_id": 0,
                                    "debit": 0,
                                    "credit": 0
                                }
                            ]
                        }
                    ],
                    "account_entries": reFactoredState,

                });
                var config = {
                    method: state === null ? 'post' : 'put',
                    url: state === null ? `${endPoint}/api/SingleMultipleVoucher/PostDataL` : `${endPoint}/api/SingleMultipleVoucher/UpdateDataL?voucher_id=${state.data}`,
                    headers: {
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
                        'Content-Type': 'application/json'
                    },
                    data: data_2
                };

                axios(config)
                    .then(function (response) {
                        // console.log(JSON.stringify(response.data));
                        if (response.status === 200) {

                            if (state === null) {

                                fetchInitiallAlldata();
                                setFileEntity([])
                                setBalanceEntries({
                                    total_credit: 0,
                                    total_debit: 0
                                })
                                setIsValidateAllStates(true)
                                setSelectedAttachmentFile("")
                                setIsFileUploadingModeOn(false)



                                setmainEntriesState1(
                                    [
                                        {
                                            showChild: false,
                                            selectedOptionValue: "",
                                            sub_account_options: "",
                                            sub_account_State: "",
                                            naration: "", debit: "", credit: "",
                                        }
                                    ]
                                )
                                setmainEntriesState(
                                    [
                                        {
                                            showChild: false,
                                            selectedOptionValue: "",
                                            sub_account_options: "",
                                            sub_account_State: "",
                                            naration: "", debit: "", credit: "",
                                        }
                                    ]
                                )











                                setReRendered(!reRendered)
                                toast.success("Vocuher Submit Succesfully")


                            } else {
                                navigate('/VoucherHistoryAccess', {
                                    state: {
                                        data: state.data
                                    }
                                });
                                toast.success("Vocuher Updated Succesfully")
                            }

                        } else {
                            toast.error("Inv Already Exist Please Referesh")
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }

    }

    const post_as_draft = () => {
        const draft_json = {
            main_entries: mainEntriesState,
            balanceEntries,
            fileEntity,
            accountOptions,
            selectedAttachmentFile,
            selectedAttachmentName,
        }

        var data = JSON.stringify({
            "draft_name": "simple_draft",
            "user_id": user_id.slice(2, -2),
            "page_name": page_name,
            "draft_json": JSON.stringify(draft_json),
        });

        var config = {
            method: 'post',
            url: `${endPoint}api/userDraft`,
            headers: {
                'Authorization': `bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    fetchInitiallAlldata();
                    setFileEntity([])
                    setBalanceEntries({
                        total_credit: 0,
                        total_debit: 0
                    })
                    setIsValidateAllStates(true)
                    setSelectedAttachmentFile("")
                    setIsFileUploadingModeOn(false)









                    setmainEntriesState1(
                        [
                            {
                                showChild: false,
                                selectedOptionValue: "",
                                sub_account_options: "",
                                sub_account_State: "",
                                naration: "", debit: "", credit: "",
                            }
                        ]
                    )
                    setmainEntriesState(
                        [
                            {
                                showChild: false,
                                selectedOptionValue: "",
                                sub_account_options: "",
                                sub_account_State: "",
                                naration: "", debit: "", credit: "",
                            }
                        ]
                    )















                    setReRendered(!reRendered)
                    toast.success("Draft Added Succesfully")
                }
            })
            .catch(function (error) {
                console.log(error);
            });


    }

    const refactor_draft_data = (e) => {

        // let e_json=JSON.parse(e) 

        // deleing selecting api from backend  
        setAccountOptions((JSON.parse(e.draft_json)).accountOptions)
        setBalanceEntries((JSON.parse(e.draft_json)).balanceEntries)
        setFileEntity((JSON.parse(e.draft_json)).fileEntity)
        setmainEntriesState((JSON.parse(e.draft_json)).main_entries)
        setSelectedAttachmentFile((JSON.parse(e.draft_json)).selectedAttachmentFile)
        setSelectedAttachmentName((JSON.parse(e.draft_json)).selectedAttachmentName)
        var myHeadersForDeleteDraft = new Headers();
        myHeadersForDeleteDraft.append("Authorization", `bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`);
        fetch(`${endPoint}api/userDraft?id=${e.draft_id}`, {
            method: "DELETE",
            headers: myHeadersForDeleteDraft
        })
            .then((response) => {
                if (response.status === 200) {
                    fetch_draft_data()
                }
            })
            .catch((error) => {
                toast.error("Something Went Wrong While Implementing Draft Data Into Form")
            });
    }

    const delete_draft = (e) => {
        var myHeadersForDeleteDraft = new Headers();
        myHeadersForDeleteDraft.append("Authorization", `bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`);


        fetch(`${endPoint}api/userDraft?id=${e}`, {
            method: "DELETE",
            headers: myHeadersForDeleteDraft
        })
            .then((response) => {
                if (response.status === 200) {
                    fetch_draft_data()
                    toast.success("Draft Deleted Succesfully")
                }
            })
            .catch((error) => {
                toast.error("Something Went Wrong While Implementing Draft Data Into Form")
            });
    };

    useEffect(() => {


        fetchInitiallAlldata()

    }, [])

    return (
        <>
            <div
                className={`right_col page-title-bar ${showNavMenu == false ? "right_col-margin-remove" : ""
                    }   `}
            >
                <span>&nbsp;{page_name}</span>
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
                                <i className="fa fa-edit"></i>&nbsp;Add/Edit {page_name}
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
                                                            setReRendered(!reRendered)
                                                        }}
                                                    ></i>
                                                </button>
                                            })
                                        }
                                    </div>
                                </div>}
                            </div>
                            <div className="row">
                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 px-0 label-align">Is Post Dated Check</label>
                                    <div className="col-md-8 col-sm-8 pt-2">
                                        <input
                                            type="checkbox"
                                            className="flat"
                                            checked={isPostDatedCheck}
                                            onChange={() => setisPostDatedCheck(!isPostDatedCheck)}
                                        />
                                    </div>
                                </div>
                                {
                                    isPostDatedCheck &&
                                    <div className="field item form-group col-md-6 col-sm-6">
                                        <label className="col-form-label col-md-3 col-sm-3 label-align pl-0  ">Post Check Date <span className="required">*</span></label>
                                        <div className="col-md-8 col-sm-8">
                                            <input
                                                type="date"
                                                className="form-control"
                                                data-validate-length-range={6}
                                                data-validate-words={2}
                                                onChange={(e) => setPostDatedCheckDate(e.target.value)}
                                                name="name"
                                                value={postDatedCheckDate}
                                            />
                                        </div>
                                    </div>}
                            </div>
                            <>

                                {
                                    mainEntriesState1.map((eachEntry, index) => {
                                        return <>
                                            <div className="row mt-3">
                                                <div className="field item form-group col-md-6 col-sm-6">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align"> First Account<span className="required">*</span></label>
                                                    <div className="col-md-8 col-sm-8">
                                                        <Select
                                                            isOptionDisabled={(option) => option.disabled}
                                                            value={mainEntriesState1[index].selectedOptionValue}
                                                            isSearchable={true}
                                                            styles={customStyles}
                                                            options={accountOptions}
                                                            onChange={(e) => {
                                                                handleAccountSelector1(e, index)
                                                                Number(mainEntriesState1[index].debit) === 0 ? update_credit1(index, { target: { value: 0 } }) : update_debit1(index, { target: { value: 0 } })
                                                            }}
                                                        />
                                                        {!isValidateAllStates && (mainEntriesState1[index].selectedOptionValue === "" || mainEntriesState1[index].selectedOptionValue === undefined || mainEntriesState1[index].selectedOptionValue === null) && <span className="text-danger">First Select this </span>}
                                                    </div>
                                                </div>
                                                <div className="field item form-group col-md-6 col-sm-6">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align"> A/C Balance <span className="required">*</span></label>
                                                    <div className="col-md-8 col-sm-8">
                                                        <input
                                                            disabled
                                                            type="text"
                                                            className="form-control"
                                                            data-validate-length-range={6}
                                                            data-validate-words={2}
                                                            name="balance"
                                                            value={mainEntriesState1[index].selectedOptionValue?.wholeData?.balance}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="field item form-group col-md-6 col-sm-6">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align"> Naration<span className="required">*</span></label>
                                                    <div className="col-md-8 col-sm-8">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            data-validate-length-range={6}
                                                            data-validate-words={2}
                                                            name="naration"
                                                            placeholder='Enter Naration/Description here'
                                                            value={mainEntriesState1[index]?.naration}
                                                            onChange={(e) => { update_naration1(index, e) }}
                                                        />
                                                        {!isValidateAllStates && mainEntriesState1[index]?.naration === "" && <span className="text-danger">First Select this </span>}

                                                    </div>
                                                </div>
                                                <div className="field item form-group col-md-6 col-sm-6">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align"> Debit/Credit <span className="required">*</span></label>
                                                    <div className="col-md-8 col-sm-8">
                                                        <div className="row  ">
                                                            <div className="col-md-6 "> <input
                                                                disabled={mainEntriesState1[index].numberOfChild > 0}
                                                                type="number"
                                                                onKeyPress={(e) => preventMinus(e)}
                                                                min="0"
                                                                className="form-control  "
                                                                data-validate-length-range={6}
                                                                data-validate-words={2}
                                                                name="debit"

                                                                placeholder='Enter Debit here'
                                                                value={mainEntriesState1[index].debit}
                                                                onChange={(e) => { update_debit1(index, e) }}
                                                            />
                                                                {!isValidateAllStates && mainEntriesState1[index].debit === "" && <span className="text-danger">First Select this </span>}


                                                            </div>
                                                            <div className="col-md-6 ">
                                                                <input
                                                                    disabled={mainEntriesState1[index].numberOfChild > 0}
                                                                    type="number"
                                                                    onKeyPress={(e) => preventMinus(e)}
                                                                    min="0"
                                                                    className="form-control"
                                                                    data-validate-length-range={6}
                                                                    data-validate-words={2}
                                                                    name="credit"
                                                                    placeholder='Enter Credit here'
                                                                    value={mainEntriesState1[index].credit}
                                                                    onChange={(e) => { update_credit1(index, e) }}
                                                                />
                                                                {!isValidateAllStates && mainEntriesState1[index].credit === "" && <span className="text-danger">First Select this </span>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>



                                            {
                                                mainEntriesState1[index].showChild && mainEntriesState1[index].sub_account_State?.map((each_sub_entry, i) => {
                                                    return <>

                                                        <div className="row">
                                                            <div className="field item form-group col-md-6 col-sm-6">
                                                                <label className="col-form-label col-md-3 col-sm-3 label-align"> Sub Account<span className="required">
                                                                    {
                                                                        mainEntriesState1[index].sub_account_State.length < mainEntriesState1[index].numberOfChild && <span >
                                                                            <i className="fa fa-plus-circle text-customBlue"
                                                                                onClick={() => { add_new_sub_account1(index, i) }}
                                                                            ></i>
                                                                        </span>}
                                                                </span></label>
                                                                <div className="col-md-8 col-sm-8">
                                                                    <div className="row">
                                                                        <div className={`col-md-${mainEntriesState1[index].sub_account_State.length === 1 ? 12 : 11}`}>
                                                                            <Select
                                                                                value={mainEntriesState1[index].sub_account_State[i]?.selected_sub_account}
                                                                                isSearchable={true}
                                                                                styles={customStyles}
                                                                                options={mainEntriesState1[index].sub_account_options}
                                                                                onChange={(e) => update_selcted_sub_account1(index, i, e)}
                                                                            />
                                                                            {!isValidateAllStates && (mainEntriesState1[index].sub_account_State[i]?.selected_sub_account === "" || mainEntriesState1[index].sub_account_State[i]?.selected_sub_account === undefined) && <span className="text-danger">First Select this </span>}


                                                                        </div>
                                                                        <div className="col-md-1 pr-3  o px-0">

                                                                            {
                                                                                mainEntriesState1[index].sub_account_State.length === 1 ? <></> : <i className="fa fa-times pt-2 text-danger" aria-hidden="true"
                                                                                    onClick={() => {
                                                                                        Number(mainEntriesState1[index].debit) === 0 ? update_credit1(index, { target: { value: mainEntriesState1[index].credit - mainEntriesState1[index].sub_account_State[i]?.credit } }) : update_debit1(index, { target: { value: mainEntriesState1[index].debit - mainEntriesState1[index].sub_account_State[i]?.debit } })
                                                                                        // the above function reset debit/credit only one thing which one is non zero on remove clicked 
                                                                                        remove_sub_account_entry1(index, i)

                                                                                    }}
                                                                                ></i>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="field item form-group col-md-6 col-sm-6">
                                                                <label className="col-form-label col-md-3 col-sm-3 label-align"> Credit/Debit <span className="required">*</span></label>
                                                                <div className="col-md-8 col-sm-8">
                                                                    <div className="row">
                                                                        <div className="col-md-6">      <input
                                                                            placeholder='Enter Debit '
                                                                            type="number"
                                                                            onKeyPress={(e) => preventMinus(e)}
                                                                            min="0"
                                                                            className="form-control"
                                                                            data-validate-length-range={6}
                                                                            data-validate-words={2}
                                                                            name="sub_debit"
                                                                            value={mainEntriesState1[index].sub_account_State[i]?.debit}
                                                                            onChange={(e) => update_sub_account_debit1(index, i, e)}
                                                                        />
                                                                            {!isValidateAllStates && mainEntriesState1[index].sub_account_State[i]?.debit === "" && <span className="text-danger">First Select this </span>}
                                                                        </div>
                                                                        <div className="col-md-6"> <input
                                                                            type="number"
                                                                            onKeyPress={(e) => preventMinus(e)}
                                                                            min="0"
                                                                            className="form-control"
                                                                            data-validate-length-range={6}
                                                                            data-validate-words={2}
                                                                            name="sub_credit"
                                                                            placeholder='Enter Credit '
                                                                            value={mainEntriesState1[index].sub_account_State[i]?.credit}
                                                                            onChange={(e) => update_sub_account_credit1(index, i, e)}
                                                                        />
                                                                            {!isValidateAllStates && mainEntriesState1[index].sub_account_State[i]?.credit === "" && <span className="text-danger">First Select this </span>}
                                                                        </div>
                                                                    </div>                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                })}
                                        </>
                                    })
                                }

                            </>
                            <div className="row mt-2">
                                <div className="table-responsive px-3 pb-0" style={{ overflowX: "unset" }}>
                                    <table className="table table-striped jambo_table bulk_action">
                                        <thead >
                                            <tr className="headings">
                                                <th className="column-title   text-center" width="20%">ACCOUNT</th>
                                                <th className="column-title   text-center" width="15%">A/C BALANCE</th>
                                                <th className="column-title   text-center" width="32%">NARATION</th>
                                                <th className="column-title   text-center" width="13%">DEBIT(RS)</th>
                                                <th className="column-title   text-center" width="13%">CREDIT(RS)</th>
                                                <th className="column-title   text-center" width="2%">&nbsp;</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                mainEntriesState.map((eachEntry, index) => {

                                                    return <> <tr className="even pointer"   >
                                                        <td className="py-0 " colSpan={6}>
                                                            <table className="table table-striped jambo_table bulk_action border-none-only mb-0">

                                                                <tbody>
                                                                    <tr className="even pointer"   >
                                                                        <td className=" " width="20%">
                                                                            <div className="row">
                                                                                <div className="col-md-11">
                                                                                    <Select
                                                                                        value={mainEntriesState[index].selectedOptionValue}
                                                                                        isSearchable={true}
                                                                                        styles={customStyles}
                                                                                        options={accountOptions}
                                                                                        onChange={(e) => {
                                                                                            handleAccountSelector(e, index)
                                                                                            Number(mainEntriesState[index].debit) === 0 ? update_credit(index, { target: { value: 0 } }) : update_debit(index, { target: { value: 0 } })


                                                                                        }}
                                                                                    />
                                                                                    {!isValidateAllStates && (mainEntriesState[index].selectedOptionValue === "" || mainEntriesState[index].selectedOptionValue === undefined) && <span className="text-danger">First Select this </span>}

                                                                                </div>
                                                                                <div className="col-md-1 px-0 ">
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td className=" " width="15%">
                                                                            <input
                                                                                disabled
                                                                                type="text"
                                                                                className="form-control"
                                                                                data-validate-length-range={6}
                                                                                data-validate-words={2}
                                                                                name="balance"
                                                                                value={mainEntriesState[index].selectedOptionValue?.wholeData?.balance}

                                                                            />
                                                                        </td>
                                                                        <td className=" " width="32%">
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                data-validate-length-range={6}
                                                                                data-validate-words={2}
                                                                                name="naration"
                                                                                placeholder='Enter Naration/Description here'
                                                                                value={mainEntriesState[index]?.naration}
                                                                                onChange={(e) => { update_naration(index, e) }}
                                                                            />
                                                                            {!isValidateAllStates && mainEntriesState[index]?.naration === "" && <span className="text-danger">First Select this </span>}

                                                                        </td>
                                                                        <td className=" " width="13%">
                                                                            <input
                                                                                disabled={mainEntriesState[index].numberOfChild > 0}
                                                                                type="number"
                                                                                onKeyPress={(e) => preventMinus(e)}
                                                                                min="0"
                                                                                className="form-control  "
                                                                                data-validate-length-range={6}
                                                                                data-validate-words={2}
                                                                                name="debit"

                                                                                placeholder='Enter Debit here'
                                                                                value={mainEntriesState[index].debit}
                                                                                onChange={(e) => { update_debit(index, e) }}
                                                                            />
                                                                            {!isValidateAllStates && mainEntriesState[index].debit === "" && <span className="text-danger">First Select this </span>}

                                                                        </td>
                                                                        <td className=" " width="13%">
                                                                            <input
                                                                                disabled={mainEntriesState[index].numberOfChild > 0}
                                                                                type="number"
                                                                                onKeyPress={(e) => preventMinus(e)}
                                                                                min="0"
                                                                                className="form-control"
                                                                                data-validate-length-range={6}
                                                                                data-validate-words={2}
                                                                                name="credit"
                                                                                placeholder='Enter Credit here'
                                                                                value={mainEntriesState[index].credit}
                                                                                onChange={(e) => { update_credit(index, e) }}
                                                                            />
                                                                            {!isValidateAllStates && mainEntriesState[index].credit === "" && <span className="text-danger">First Select this </span>}

                                                                        </td>
                                                                        <td className="" width="2%" >
                                                                            {
                                                                                mainEntriesState.length > 1 &&
                                                                                <i className="fa fa-times pt-2 text-danger" aria-hidden="true"
                                                                                    onClick={() => remove_account(index)}
                                                                                ></i>
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                    {
                                                                        mainEntriesState[index].showChild && mainEntriesState[index].sub_account_State?.map((each_sub_entry, i) => {
                                                                            return <tr className="even pointer">
                                                                                <td className="border-none text-right " colSpan={2} >
                                                                                    {
                                                                                        mainEntriesState[index].sub_account_State.length < mainEntriesState[index].numberOfChild && <span >
                                                                                            <i className="fa fa-plus-circle text-customBlue"
                                                                                                onClick={() => { add_new_sub_account(index, i) }}
                                                                                            ></i>
                                                                                        </span>}
                                                                                </td>
                                                                                <td className="border-none ">
                                                                                    <Select
                                                                                        value={mainEntriesState[index].sub_account_State[i]?.selected_sub_account}
                                                                                        isSearchable={true}
                                                                                        styles={customStyles}
                                                                                        options={mainEntriesState[index].sub_account_options}
                                                                                        onChange={(e) => update_selcted_sub_account(index, i, e)}
                                                                                    />
                                                                                    {!isValidateAllStates && (mainEntriesState[index].sub_account_State[i]?.selected_sub_account === "" || mainEntriesState[index].sub_account_State[i]?.selected_sub_account === undefined) && <span className="text-danger">First Select this </span>}
                                                                                </td>
                                                                                <td className="border-none ">
                                                                                    <input
                                                                                        placeholder='Enter Debit '
                                                                                        type="number"
                                                                                        onKeyPress={(e) => preventMinus(e)}
                                                                                        min="0"
                                                                                        className="form-control"
                                                                                        data-validate-length-range={6}
                                                                                        data-validate-words={2}
                                                                                        name="sub_debit"
                                                                                        value={mainEntriesState[index].sub_account_State[i]?.debit}
                                                                                        onChange={(e) => update_sub_account_debit(index, i, e)}
                                                                                    />
                                                                                    {!isValidateAllStates && mainEntriesState[index].sub_account_State[i]?.debit === "" && <span className="text-danger">First Select this </span>}
                                                                                </td>
                                                                                <td className="border-none ">
                                                                                    <input
                                                                                        type="number"
                                                                                        onKeyPress={(e) => preventMinus(e)}
                                                                                        min="0"
                                                                                        className="form-control"
                                                                                        data-validate-length-range={6}
                                                                                        data-validate-words={2}
                                                                                        name="sub_credit"
                                                                                        placeholder='Enter Credit '
                                                                                        value={mainEntriesState[index].sub_account_State[i]?.credit}
                                                                                        onChange={(e) => update_sub_account_credit(index, i, e)}
                                                                                    />
                                                                                    {!isValidateAllStates && mainEntriesState[index].sub_account_State[i]?.credit === "" && <span className="text-danger">First Select this </span>}
                                                                                </td>
                                                                                <td className="border-none ">
                                                                                    {
                                                                                        mainEntriesState[index].sub_account_State.length === 1 ? <></> : <i className="fa fa-times pt-2 text-danger" aria-hidden="true"
                                                                                            onClick={() => {
                                                                                                Number(mainEntriesState[index].debit) === 0 ? update_credit(index, { target: { value: mainEntriesState[index].credit - mainEntriesState[index].sub_account_State[i]?.credit } }) : update_debit(index, { target: { value: mainEntriesState[index].debit - mainEntriesState[index].sub_account_State[i]?.debit } })
                                                                                                // the above function reset debit/credit only one thing which one is non zero on remove clicked 
                                                                                                remove_sub_account_entry(index, i)

                                                                                            }}
                                                                                        ></i>
                                                                                    }
                                                                                </td>
                                                                            </tr>
                                                                        })
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr></>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    <strong>     Current Balance: {(mainEntriesState1[0].debit - mainEntriesState1[0].credit) + (balanceEntries.total_debit - balanceEntries.total_credit)} --- { }.</strong>
                                    <div>    <strong>   Drafts: &nbsp;   </strong>
                                        {
                                            draftEntries.map((each_draft, index) => {
                                                return <button className="btn btn-sm bg-customBlue text-light mt-1">
                                                    <span onClick={() => { refactor_draft_data(each_draft) }}>
                                                        {each_draft.draft_name}
                                                    </span>
                                                    <i className="fa fa-times   text-light ml-1 " aria-hidden="true"
                                                        onClick={() => { delete_draft(each_draft.draft_id) }}
                                                    ></i>
                                                </button>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 d-flex justify-content-between x_footer mt-0">
                            <button className="btn btn-primary" type="submit" onClick={() => {
                                setmainEntriesState([...mainEntriesState, {
                                    naration: "", debit: "", credit: "",
                                }])
                            }}>
                                Add Line
                            </button>
                            {state === null && <button className="btn btn-primary" type="submit" onClick={() => post_as_draft()}>
                                Save As Draft
                            </button>}

                            <button className="btn btn-primary" type="submit" onClick={() => post_multiple_voucher()}>
                                {state === null ? "Submit" : "Update"}
                            </button>

                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default JournalVoucherSingle
