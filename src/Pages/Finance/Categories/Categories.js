import React, { useState, useEffect } from 'react'
import Loader from '../../../Layout/Loader/Loader'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { fetchTreeNodeData, updateTreeNodeData } from '../../../store/actions/TreeStates';
import Tree from './Tree/Tree.js'
import './Categories.css'
import { customStyles } from '../../../Components/reactCustomSelectStyle'
import Select from 'react-select'
import { endPoint } from '../../../config/Config'

import { toast } from "react-toastify";

// let nodeData = false;
// let nodeEditable = "";
// export const functionAltea = (node, nodeState) => {
//     nodeData = node;
//     nodeEditable = nodeState;  

// }
// export const updateStates = (editableState ,dataState ) => {
//     console.log(nodeEditable, nodeData , "Inside");
//     editableState(nodeData)
//     dataState(nodeEditable)
// }

const Categories = ({ pagePermission }) => {
    const rolePermissionTable = {
        Add: pagePermission.AddPermission,
        Delete: pagePermission.DelPermission,
        Edit: pagePermission.EditPermission,
    }
    const dispatch = useDispatch();
    const URL = localStorage.getItem("authUser");
    const [isLoading, setIsLoading] = useState(true)
    const showNavMenu = useSelector((state) => state.NavState);
    const stateWholeReducer = useSelector((state) => state.TreeReducer);
    const [coreData, setCoreData] = useState([])

    const [textFieldInput, setTextFieldInput] = useState("")
    const [textFieldInputForUpdate, setTextFieldInputForUpdate] = useState("")
    const [dropSownOptionsForParentInUpdate, setDropSownOptionsForParentInUpdate] = useState("")
    const accessToken = localStorage.getItem("access_token");
    const [validationStateForOne, setValidationStateForOne] = useState(false)
    const fetchApi = async (e) => {

        var config = {
            method: 'get',
            url: URL + '/api/ChartOfAccounts/GetChartOfAccounts',
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
            }
        };

        axios(config)
            .then(function (response) {
                console.log(response.data);


                if (response.status === 200) {
                    setCoreData(response.data)
                    if (e === undefined) {
                        // fetchOptionsForStock()
                        fetchOptionsLevelWise(0)
                    }

                } else {
                    console.log(response.status, "Err");
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const [dropDownActions, setDropDownActions] = useState({
        level_1: [],
        level_1_value: "",
        level_2: [],
        level_2_value: "",
        level_3: [],
        level_3_value: "",
        level_4: [],
        level_4_value: "",
        level_5: [],
        level_5_value: "",
    })
    const refecteringDropDownActions = {
        ...dropDownActions,
        level_1_value: "",
        level_2: [],
        level_2_value: "",
        level_3: [],
        level_3_value: "",
        level_4: [],
        level_4_value: "",
        level_5: [],
        level_5_value: "",

    };
    const [editMode, setEditMode] = useState(false)

    // const [stockOption, setStockOption] = useState([])
    // const [stockValue, setStockValue] = useState("")
    // state foradd account form  __POST__
    // state to display level base form
    const [formToShow, setformToShow] = useState({
        level_3: true,
        level_4: false,
        level_5: false,
        level_6: false,
    })
    // const fetchOptionsForStock = () => {
    //     var config = {
    //         method: 'get',
    //         url: `${endPoint}/api/StockUnits/GetData`,
    //         headers: {
    //             'Authorization': "Bearer " + JSON.parse(accessToken).access_token,
    //             'Content-Type': 'application/json'
    //         },
    //     };

    //     axios(config)
    //         .then(function (response) {
    //             let stockOptions = [];
    //             if (response.status === 200) {
    //                 response.data.map((eachStock) => {
    //                     stockOptions.push({ label: eachStock.stock_unit_name, value: eachStock.stock_unit_id })

    //                 })
    //             }
    //             setStockOption(stockOptions)
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }
    // fetch data for dropdown selector 
    const fetchOptionsLevelWise = (categoriesLevel, e) => {
        let levelToFetch = categoriesLevel + 1;
        var config = {
            method: 'get',
            url: `${endPoint}api/ChartOfAccounts/GetCategoriesByLevel?level=${levelToFetch}`,
            headers: {
                'Authorization': "Bearer " + JSON.parse(accessToken).access_token,
            }
        };

        axios(config)
            .then(function (response) {
                let level_options = [];
                if (response.status === 200) {
                    response.data.map((eachCategory) => {
                        level_options.push({ label: eachCategory.category_name, value: eachCategory.category_id === undefined ? eachCategory.chart_id : eachCategory.category_id, wholeDate: eachCategory.category_id === undefined ? { ...eachCategory, category_id: eachCategory.chart_id } : eachCategory })
                    })
                    if (categoriesLevel + 1 === 1) {
                        console.log("effected");
                        setDropDownActions({
                            ...dropDownActions, level_1: level_options
                        })
                    } else if (categoriesLevel + 1 === 2) {
                        console.log("effected 2");
                        // parent_category

                        const filteredLevelOption = level_options.filter((each_level_2_category) => {
                            return each_level_2_category.wholeDate.parent_category === e.label
                        })
                        setDropDownActions({

                            ...dropDownActions, level_2: filteredLevelOption, level_1_value: e, level_2_value: "", level_3_value: "", level_4_value: "", level_5_value: ""
                        })
                    } else if (categoriesLevel + 1 === 3) {
                        console.log("effected 3");
                        const filteredLevelOption = level_options.filter((each_level_3_category) => {
                            return each_level_3_category.wholeDate.parent_category === e.label
                        })
                        setDropDownActions({

                            ...dropDownActions, level_3: filteredLevelOption, level_2_value: e, level_3_value: "", level_4_value: "", level_5_value: ""
                        })
                    } else if (categoriesLevel + 1 === 4) {
                        console.log("effected 4");
                        const filteredLevelOption = level_options.filter((each_level_4_category) => {
                            return each_level_4_category.wholeDate.parent_category === e.label
                        })
                        setDropDownActions({

                            ...dropDownActions, level_4: filteredLevelOption, level_3_value: e, level_4_value: "", level_5_value: ""
                        })
                    } else if (categoriesLevel + 1 === 5) {
                        console.log("effected 5");
                        const filteredLevelOption = level_options.filter((each_level_5_category) => {
                            return each_level_5_category.wholeDate.parent_category === e.label
                        })
                        setDropDownActions({

                            ...dropDownActions, level_5: filteredLevelOption, level_4_value: e, level_5_value: "",
                        })
                    } else {
                        console.log("effect 5")
                    }

                    console.log(dropDownActions);
                    setIsLoading(false)
                }

            })
            .catch(function (error) {
                console.log(error);
            });

    }


    const submitData = async (lastLevelSelected) => {
        setValidationStateForOne(false)
        // category_id,
        // level+1 
        // console.log({
        //     "title": textFieldInput,
        //     "stock_unit_id": 1,
        //     "level": lastLevelSelected.wholeDate.level + 1,
        //     "parent_id": lastLevelSelected.wholeDate.category_id,
        //     "page_name": "chart_of_account"
        // });
        var data = JSON.stringify({
            "title": textFieldInput,
            "stock_unit_id": 1,
            "level": lastLevelSelected.wholeDate.level + 1,
            "parent_id": lastLevelSelected.wholeDate.category_id,
            "page_name": "chart_of_account"
        });
        var config = {
            method: 'post',
            url: `${endPoint}api/ChartOfAccounts/PostData`,
            headers: {
                'Authorization': "Bearer " + JSON.parse(accessToken).access_token,
                'Content-Type': 'application/json'
            },
            data: data
        };

        await axios(config)
            .then((response) => {
                if (response.status === 200) {
                    //  
                    toast.success("Added Successfully")
                    setDropDownActions(refecteringDropDownActions)
                    setTextFieldInput("")
                    // setStockValue("")
                }
            })
            .catch(function (error) {
                toast.error("Already Exist")
                console.log(error);
                setTextFieldInput("")
            });
        // setDropDownActions(refecteringDropDownActions)
        // setTextFieldInput("")
        fetchApi(-1) //fetching api to show newly added data , 
        // passing parameter minus one which prevent to fetch 
        // first level drop down again which was already fetch initially
    }



    console.log(stateWholeReducer);
    const submitDataForUpdate = (textF, optionValue, nodeData) => {
        let textFieldToBeUpdate = textF === "" || textF === undefined ? nodeData.name : textF;
        let parentIdToUpdate = optionValue === "" ? nodeData.parent_id : optionValue.value;
        // console.log("___________________");
        // // optionValue===""?console.log("select old option just updTE option "): console.log(optionValue); 
        // console.log(  "node Data" ,nodeData);
        // // textF==="" || textF===undefined?console.log("select old option just updTE NAME "): console.log(textF) ;
        // console.log("___________________"); 
        var data = JSON.stringify({
            "title": textFieldToBeUpdate,
            "stock_unit_id": 1,
            "level": nodeData.level,
            "parent_id": parentIdToUpdate,
            "page_name": "chart_of_account_update"
        });

        var config = {
            method: 'put',
            url: `${endPoint}api/ChartOfAccounts/PutData?id=${nodeData.primary_key}&level=${nodeData.level}`,
            headers: {
                'Authorization': "Bearer " + JSON.parse(accessToken).access_token,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {

                if (response.status === 200) {
                    fetchApi();
                    dispatch(updateTreeNodeData(null));
                    toast.success("Updated Successfully")
                } else {
                    toast.error("Name Already Exist")
                }
            })
            .catch(function (error) {
                toast.error("Name Already Exist")

            });

    }

    useEffect(() => {
        fetchApi()
        // updateStates(setEditMode ,setDataToUpdate )
       

    }, [])
    useEffect(() => {
        console.log("resux state updated");
        setDropSownOptionsForParentInUpdate({ label: stateWholeReducer?.parent_name, value: stateWholeReducer?.parent_id })
        setTextFieldInputForUpdate(stateWholeReducer?.name)
        setValidationStateForOne(false)
    }, [stateWholeReducer])




    return (
        <>
            {isLoading ?
                <Loader />
                :
                <> <div className={`container-fluid page-title-bar ${showNavMenu == false ? "right_col-margin-remove" : ""
                    }   `}>
                    <span>&nbsp;Chart of Accounts</span>
                </div>
                    <div
                        className={`right_col  h-100 ${showNavMenu == false ? "right_col-margin-remove" : "lorem "}   `} role="main"    >
                        <div className="row">
                            <div className="col-md-6  ">
                                <div className="x_panel">
                                    <div className="x_content">
                                        <span className="section mb-2">
                                            <div className="row">
                                                <div className="col-9">
                                                    <i className="fa fa-sitemap"></i>&nbsp;&nbsp;Accounts Tree
                                                </div>
                                            </div>
                                        </span>
                                        <div className='mb-1'>
                                            <button className="btn btn-sm btn-info"
                                                disabled={formToShow.level_3 && !editMode && stateWholeReducer === null}
                                                onClick={() => {
                                                    setformToShow({
                                                        level_3: true,
                                                        level_4: false,
                                                        level_5: false,
                                                        level_6: false,
                                                    })
                                                    setEditMode(false)
                                                    setDropDownActions(refecteringDropDownActions)
                                                    setTextFieldInput("")
                                                    setValidationStateForOne(false)
                                                    // setStockValue("")
                                                    dispatch(updateTreeNodeData(null));


                                                }}>Categories_3</button>
                                            <button className="btn btn-sm btn-warning"
                                                style={{ color: "#fff" }}
                                                disabled={formToShow.level_4 && !editMode}
                                                onClick={() => {

                                                    setformToShow({
                                                        level_3: false,
                                                        level_4: true,
                                                        level_5: false,
                                                        level_6: false,
                                                    })
                                                    setEditMode(false)
                                                    // setStockValue("")
                                                    setDropDownActions(refecteringDropDownActions)
                                                    setTextFieldInput("")
                                                    setValidationStateForOne(false)

                                                    dispatch(updateTreeNodeData(null));

                                                }}>Categories_4</button>
                                            <button className="btn btn-sm btn-danger"
                                                disabled={formToShow.level_5 && !editMode}
                                                onClick={() => {
                                                    setformToShow({
                                                        level_3: false,
                                                        level_4: false,
                                                        level_5: true,
                                                        level_6: false,
                                                    })
                                                    setEditMode(false)
                                                    setDropDownActions(refecteringDropDownActions)
                                                    setTextFieldInput("")
                                                    setValidationStateForOne(false)
                                                    // setStockValue("")
                                                    dispatch(updateTreeNodeData(null));
                                                }}>Add Account</button>
                                            <button className="btn btn-sm  btn-primary"
                                                disabled={formToShow.level_6 && !editMode}
                                                onClick={() => {
                                                    setformToShow({
                                                        level_3: false,
                                                        level_4: false,
                                                        level_5: false,
                                                        level_6: true,
                                                    })
                                                    setEditMode(false)
                                                    setDropDownActions(refecteringDropDownActions)
                                                    setTextFieldInput("")
                                                    setValidationStateForOne(false)
                                                    // setStockValue("")
                                                    dispatch(updateTreeNodeData(null));
                                                }}>Add Sub Account</button>
                                        </div>
                                        <Tree data={coreData} />
                                    </div>
                                </div>
                            </div>

                            {stateWholeReducer !== null && stateWholeReducer.editable === "true" ? <>
                                <div className="col-md-6  ">
                                    <div className="x_panel">
                                        <div className="x_content">
                                            <span className="section">
                                                <div className="row">
                                                    <div className="col-9">
                                                        <i className="fa fa-edit icon"></i>&nbsp;Account Detail
                                                    </div>
                                                </div>
                                            </span>
                                            {
                                                <div className="level_3_form">
                                                    {/* <div className="row">
                                                        <div className="field item form-group col-md-12 col-sm-12">
                                                            <label className="col-form-label col-md-4 col-sm-4 label-align">Select Parent</label>
                                                            <div className="col-md-8 col-sm-8">
                                                                <Select
                                                                    value={dropSownOptionsForParentInUpdate}
                                                                    // value={dropDownActions.level_1_value}
                                                                    isSearchable={true}
                                                                    onChange={(e) => {
                                                                        setDropSownOptionsForParentInUpdate(e)
                                                                    }}
                                                                    styles={customStyles}
                                                                    options={stateWholeReducer.optionsForSelector}
                                                                />  </div>
                                                        </div>
                                                    </div> */}
                                                    <div className="row mt-1 mx-1">
                                                        <div className="col-md-4 text-right pt-1">Categories name</div>
                                                        <div className="col-md-8 px-2">
                                                            <input type="text" className='form-control form-control-sm ' placeholder='Enter Entity Name'
                                                                onInput={(er) => er.target.value = er.target.value.toUpperCase()}
                                                                value={textFieldInputForUpdate}
                                                                onChange={(e) => setTextFieldInputForUpdate(e.target.value)}
                                                            />
                                                            {validationStateForOne && textFieldInputForUpdate === "" && <span className="text-danger">First Select this </span>}

                                                        </div>
                                                    </div>
                                                    <div className="row mt-1">
                                                        <div className="col-md-12 text-right px-1">
                                                            <button className="btn btn-sm btn-primary" onClick={() => {
                                                                if (textFieldInputForUpdate === "") {
                                                                    setValidationStateForOne(true)
                                                                } else {
                                                                    submitDataForUpdate(textFieldInputForUpdate, dropSownOptionsForParentInUpdate, stateWholeReducer)
                                                                    setValidationStateForOne(false)
                                                                }

                                                            }}>



                                                                update
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            }



                                        </div>
                                    </div>
                                </div>


                            </> :
                                <>


                                </>
                            }
                            {
                                stateWholeReducer === null && <div className="col-md-6  ">
                                    <div className="x_panel">
                                        <div className="x_content">
                                            <span className="section">
                                                <div className="row">
                                                    <div className="col-9">
                                                        <i className="fa fa-plus icon"></i>&nbsp;Account Detail
                                                    </div>
                                                </div>
                                            </span>
                                            {/* first form basic logic complete  */}
                                            {
                                                (stateWholeReducer === null || stateWholeReducer.editable === 'false') && formToShow.level_3 && <div className="level_3_form">
                                                    <div className="row">
                                                        <div className="field item form-group col-md-12 col-sm-12">
                                                            <label className="col-form-label col-md-4 col-sm-4 label-align">Select Level_1</label>
                                                            <div className="col-md-8 col-sm-8">
                                                                <Select
                                                                    value={dropDownActions.level_1_value}
                                                                    isSearchable={true}
                                                                    onChange={async (e) => {
                                                                        await fetchOptionsLevelWise(e.wholeDate.level, e)
                                                                    }}
                                                                    styles={customStyles}
                                                                    options={dropDownActions.level_1}
                                                                />
                                                                {validationStateForOne && dropDownActions.level_1_value === "" && <span className="text-danger">First Select this </span>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row mt-1">
                                                        <div className="field item form-group col-md-12 col-sm-12">
                                                            <label className="col-form-label col-md-4 col-sm-4 label-align">Select Level_2</label>
                                                            <div className="col-md-8 col-sm-8">
                                                                <Select
                                                                    value={dropDownActions.level_2_value}
                                                                    isSearchable={true}
                                                                    onChange={(e) => {
                                                                        setDropDownActions({
                                                                            ...dropDownActions,
                                                                            level_2_value: e
                                                                        })
                                                                    }}
                                                                    styles={customStyles}
                                                                    options={dropDownActions.level_2}
                                                                />
                                                                {validationStateForOne && dropDownActions.level_2_value === "" && <span className="text-danger">First Select this </span>}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row mt-1 mx-1">
                                                        <div className="col-md-4 text-right pt-1">Categories name</div>
                                                        <div className="col-md-8 px-2">
                                                            <input type="text" className='form-control form-control-sm ' placeholder='Enter Entity Name'
                                                                onInput={(er) => er.target.value = er.target.value.toUpperCase()}
                                                                value={textFieldInput}
                                                                onChange={(e) => setTextFieldInput(e.target.value)}
                                                            />
                                                            {validationStateForOne && textFieldInput === "" && <span className="text-danger">First Select this </span>}

                                                        </div>
                                                    </div>
                                                    <div className="row mt-1">
                                                        <div className="col-md-12 text-right px-1">
                                                            <button className="btn btn-sm btn-primary" onClick={() => {
                                                                if (dropDownActions.level_1_value === "" || dropDownActions.level_2_value === "" || textFieldInput === "") {
                                                                    setValidationStateForOne(true)
                                                                } else {
                                                                    setValidationStateForOne(false)
                                                                    submitData(dropDownActions.level_2_value)
                                                                }
                                                            }}>



                                                                Submit
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            }

                                            {
                                                (stateWholeReducer === null || stateWholeReducer.editable === 'false') && formToShow.level_4 && <div className="level_4_form">
                                                    <div className="row">
                                                        <div className="field item form-group col-md-12 col-sm-12">
                                                            <label className="col-form-label col-md-4 col-sm-4 label-align">Select Level_1</label>
                                                            <div className="col-md-8 col-sm-8">
                                                                <Select
                                                                    value={dropDownActions.level_1_value}
                                                                    isSearchable={true}
                                                                    onChange={async (e) => {
                                                                        await fetchOptionsLevelWise(e.wholeDate.level, e)
                                                                    }}
                                                                    styles={customStyles}
                                                                    options={dropDownActions.level_1}
                                                                />
                                                                {validationStateForOne && dropDownActions.level_1_value === "" && <span className="text-danger">First Select this </span>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row mt-1">
                                                        <div className="field item form-group col-md-12 col-sm-12">
                                                            <label className="col-form-label col-md-4 col-sm-4 label-align">Select Level_2</label>
                                                            <div className="col-md-8 col-sm-8">
                                                                <Select
                                                                    value={dropDownActions.level_2_value}
                                                                    isSearchable={true}
                                                                    onChange={async (e) => {
                                                                        console.log(e.wholeDate.level, e);
                                                                        await fetchOptionsLevelWise(e.wholeDate.level, e)
                                                                    }}
                                                                    styles={customStyles}
                                                                    options={dropDownActions.level_2}
                                                                />
                                                                {validationStateForOne && dropDownActions.level_2_value === "" && <span className="text-danger">First Select this </span>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row mt-1">
                                                        <div className="field item form-group col-md-12 col-sm-12">
                                                            <label className="col-form-label col-md-4 col-sm-4 label-align">Select Level_3</label>
                                                            <div className="col-md-8 col-sm-8">
                                                                <Select

                                                                    value={dropDownActions.level_3_value}
                                                                    isSearchable={true}
                                                                    onChange={(e) => {
                                                                        setDropDownActions({
                                                                            ...dropDownActions,
                                                                            level_3_value: e
                                                                        })

                                                                    }}
                                                                    styles={customStyles}
                                                                    options={dropDownActions.level_3}
                                                                />
                                                                {validationStateForOne && dropDownActions.level_3_value === "" && <span className="text-danger">First Select this </span>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row mt-1 mx-1">
                                                        <div className="col-md-4 text-right pt-1">Categories name</div>
                                                        <div className="col-md-8 px-2">
                                                            <input type="text" className='form-control form-control-sm ' placeholder='Enter Entity Name'
                                                                onInput={(er) => er.target.value = er.target.value.toUpperCase()}
                                                                value={textFieldInput}
                                                                onChange={(e) => setTextFieldInput(e.target.value)}
                                                            />
                                                            {validationStateForOne && textFieldInput === "" && <span className="text-danger">First Select this </span>}
                                                        </div>
                                                    </div>
                                                    <div className="row mt-1">
                                                        <div className="col-md-12 text-right px-1">
                                                            <button className="btn btn-sm btn-primary" onClick={() => {

                                                                if (dropDownActions.level_1_value === "" || dropDownActions.level_2_value === "" || dropDownActions.level_3_value === "" || textFieldInput === "") {
                                                                    setValidationStateForOne(true)
                                                                } else {
                                                                    setValidationStateForOne(false)
                                                                    submitData(dropDownActions.level_3_value)
                                                                }
                                                            }



                                                            }>
                                                                Submit
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                            {
                                                (stateWholeReducer === null || stateWholeReducer.editable === 'false') && formToShow.level_5 && <div className="level_5_form">
                                                    <div className="row">
                                                        <div className="field item form-group col-md-12 col-sm-12">
                                                            <label className="col-form-label col-md-4 col-sm-4 label-align">Select Level_1</label>
                                                            <div className="col-md-8 col-sm-8">
                                                                <Select
                                                                    value={dropDownActions.level_1_value}
                                                                    isSearchable={true}
                                                                    onChange={async (e) => {
                                                                        await fetchOptionsLevelWise(e.wholeDate.level, e)
                                                                    }}
                                                                    styles={customStyles}
                                                                    options={dropDownActions.level_1}
                                                                />
                                                                {validationStateForOne && dropDownActions.level_1_value === "" && <span className="text-danger">First Select this </span>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row mt-1">
                                                        <div className="field item form-group col-md-12 col-sm-12">
                                                            <label className="col-form-label col-md-4 col-sm-4 label-align">Select Level_2</label>
                                                            <div className="col-md-8 col-sm-8">
                                                                <Select
                                                                    value={dropDownActions.level_2_value}
                                                                    isSearchable={true}
                                                                    onChange={async (e) => {
                                                                        console.log(e.wholeDate.level, e);
                                                                        await fetchOptionsLevelWise(e.wholeDate.level, e)
                                                                    }}
                                                                    styles={customStyles}
                                                                    options={dropDownActions.level_2}
                                                                />
                                                                {validationStateForOne && dropDownActions.level_2_value === "" && <span className="text-danger">First Select this </span>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row mt-1">
                                                        <div className="field item form-group col-md-12 col-sm-12">
                                                            <label className="col-form-label col-md-4 col-sm-4 label-align">Select Level_3</label>
                                                            <div className="col-md-8 col-sm-8">
                                                                <Select
                                                                    value={dropDownActions.level_3_value}
                                                                    isSearchable={true}
                                                                    onChange={async (e) => {
                                                                        console.log(e.wholeDate.level, e);
                                                                        await fetchOptionsLevelWise(e.wholeDate.level, e)
                                                                    }}
                                                                    styles={customStyles}
                                                                    options={dropDownActions.level_3}

                                                                />
                                                                {validationStateForOne && dropDownActions.level_3_value === "" && <span className="text-danger">First Select this </span>}
                                                            </div>
                                                        </div>
                                                    </div>




                                                    <div className="row mt-1">
                                                        <div className="field item form-group col-md-12 col-sm-12">
                                                            <label className="col-form-label col-md-4 col-sm-4 label-align">Select Level_4</label>
                                                            <div className="col-md-8 col-sm-8">
                                                                <Select
                                                                    value={dropDownActions.level_4_value}
                                                                    isSearchable={true}
                                                                    onChange={(e) => {
                                                                        setDropDownActions({
                                                                            ...dropDownActions,
                                                                            level_4_value: e
                                                                        })

                                                                    }}
                                                                    styles={customStyles}
                                                                    options={dropDownActions.level_4}
                                                                />
                                                                {validationStateForOne && dropDownActions.level_4_value === "" && <span className="text-danger">First Select this </span>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <div className="row mt-1">
                                                        <div className="field item form-group col-md-12 col-sm-12">
                                                            <label className="col-form-label col-md-4 col-sm-4 label-align">Select Stock</label>
                                                            <div className="col-md-8 col-sm-8">
                                                                <Select
                                                                    value={stockValue}
                                                                    isSearchable={true}
                                                                    onChange={(value) => {
                                                                        setStockValue(value)
                                                                    }}
                                                                    styles={customStyles}
                                                                    options={stockOption}
                                                                />
                                                                {validationStateForOne && stockValue === "" && <span className="text-danger">First Select this </span>}
                                                            </div>
                                                        </div>
                                                    </div> */}
                                                    <div className="row mt-1 mx-1">
                                                        <div className="col-md-4 text-right pt-1">Account_Name</div>
                                                        <div className="col-md-8 px-2">
                                                            <input type="text" className='form-control form-control-sm ' placeholder='Enter Entity Name'
                                                                onInput={(er) => er.target.value = er.target.value.toUpperCase()}
                                                                value={textFieldInput}
                                                                onChange={(e) => setTextFieldInput(e.target.value)}
                                                            />
                                                            {validationStateForOne && textFieldInput === "" && <span className="text-danger">First Select this </span>}

                                                        </div>
                                                    </div>
                                                    <div className="row mt-1">
                                                        <div className="col-md-12 text-right px-1">
                                                            <button className="btn btn-sm btn-primary" onClick={() => {
                                                                if (dropDownActions.level_1_value === "" || dropDownActions.level_2_value === "" || dropDownActions.level_3_value === "" || dropDownActions.level_4_value === "" || textFieldInput === "") {
                                                                    setValidationStateForOne(true)
                                                                } else {
                                                                    setValidationStateForOne(false)
                                                                    submitData(dropDownActions.level_4_value)
                                                                }

                                                            }}>
                                                                Submit
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>}

                                            {
                                                (stateWholeReducer === null || stateWholeReducer.editable === 'false') && formToShow.level_6 && <div className="level_6_form">
                                                    <div className="row">
                                                        <div className="field item form-group col-md-12 col-sm-12">
                                                            <label className="col-form-label col-md-4 col-sm-4 label-align">Select Level_1</label>
                                                            <div className="col-md-8 col-sm-8">
                                                                <Select
                                                                    value={dropDownActions.level_1_value}
                                                                    isSearchable={true}
                                                                    onChange={async (e) => {
                                                                        await fetchOptionsLevelWise(e.wholeDate.level, e)
                                                                    }}
                                                                    styles={customStyles}
                                                                    options={dropDownActions.level_1}
                                                                />
                                                                {validationStateForOne && dropDownActions.level_1_value === "" && <span className="text-danger">First Select this </span>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row mt-1">
                                                        <div className="field item form-group col-md-12 col-sm-12">
                                                            <label className="col-form-label col-md-4 col-sm-4 label-align">Select Level_2</label>
                                                            <div className="col-md-8 col-sm-8">
                                                                <Select
                                                                    value={dropDownActions.level_2_value}
                                                                    isSearchable={true}
                                                                    onChange={async (e) => {
                                                                        console.log(e.wholeDate.level, e);
                                                                        await fetchOptionsLevelWise(e.wholeDate.level, e)
                                                                    }}
                                                                    styles={customStyles}
                                                                    options={dropDownActions.level_2}
                                                                />

                                                                {validationStateForOne && dropDownActions.level_2_value === "" && <span className="text-danger">First Select this </span>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row mt-1">
                                                        <div className="field item form-group col-md-12 col-sm-12">
                                                            <label className="col-form-label col-md-4 col-sm-4 label-align">Select Level_3</label>
                                                            <div className="col-md-8 col-sm-8">
                                                                <Select
                                                                    value={dropDownActions.level_3_value}
                                                                    isSearchable={true}
                                                                    onChange={async (e) => {
                                                                        console.log(e.wholeDate.level, e);
                                                                        await fetchOptionsLevelWise(e.wholeDate.level, e)
                                                                    }}
                                                                    styles={customStyles}
                                                                    options={dropDownActions.level_3}

                                                                />

                                                                {validationStateForOne && dropDownActions.level_3_value === "" && <span className="text-danger">First Select this </span>}
                                                            </div>
                                                        </div>
                                                    </div>




                                                    <div className="row mt-1">
                                                        <div className="field item form-group col-md-12 col-sm-12">
                                                            <label className="col-form-label col-md-4 col-sm-4 label-align">Select Level_4</label>
                                                            <div className="col-md-8 col-sm-8">
                                                                <Select
                                                                    value={dropDownActions.level_4_value}
                                                                    isSearchable={true}
                                                                    onChange={async (e) => {
                                                                        console.log(e.wholeDate.level, e);
                                                                        await fetchOptionsLevelWise(e.wholeDate.level, e)
                                                                    }}
                                                                    styles={customStyles}
                                                                    options={dropDownActions.level_4}
                                                                />
                                                                {validationStateForOne && dropDownActions.level_4_value === "" && <span className="text-danger">First Select this </span>}
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="row mt-1">
                                                        <div className="field item form-group col-md-12 col-sm-12">
                                                            <label className="col-form-label col-md-4 col-sm-4 label-align">Select Account</label>
                                                            <div className="col-md-8 col-sm-8">
                                                                <Select

                                                                    value={dropDownActions.level_5_value}
                                                                    isSearchable={true}
                                                                    onChange={(e) => {
                                                                        setDropDownActions({
                                                                            ...dropDownActions,
                                                                            level_5_value: e
                                                                        })

                                                                    }}
                                                                    styles={customStyles}
                                                                    options={dropDownActions.level_5}
                                                                />
                                                                {validationStateForOne && dropDownActions.level_5_value === "" && <span className="text-danger">First Select this </span>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <div className="row mt-1">
                                                        <div className="field item form-group col-md-12 col-sm-12">
                                                            <label className="col-form-label col-md-4 col-sm-4 label-align">Select Stock</label>
                                                            <div className="col-md-8 col-sm-8">
                                                                <Select
                                                                    value={stockValue}
                                                                    isSearchable={true}
                                                                    onChange={(value) => {
                                                                        console.log(value)
                                                                        setStockValue(value)
                                                                    }}
                                                                    styles={customStyles}
                                                                    options={stockOption}
                                                                />
                                                                {validationStateForOne && stockValue === "" && <span className="text-danger">First Select this </span>}
                                                            </div>
                                                        </div>
                                                    </div> */}
                                                    <div className="row mt-1 mx-1">
                                                        <div className="col-md-4 text-right pt-1">Sub Ladger</div>
                                                        <div className="col-md-8 px-2">
                                                            <input type="text" className='form-control form-control-sm ' placeholder='Enter Entity Name'
                                                                value={textFieldInput}
                                                                onInput={(er) => er.target.value = er.target.value.toUpperCase()}
                                                                onChange={(e) => setTextFieldInput(e.target.value)}

                                                            />
                                                            {validationStateForOne && textFieldInput === "" && <span className="text-danger">First Select this </span>}
                                                        </div>
                                                    </div>
                                                    <div className="row mt-1">
                                                        <div className="col-md-12 text-right px-1">
                                                            <button className="btn btn-sm btn-primary" onClick={() => {
                                                                if (dropDownActions.level_1_value === "" || dropDownActions.level_2_value === "" || dropDownActions.level_3_value === "" || dropDownActions.level_4_value === "" || dropDownActions.level_5_value === "" || textFieldInput === "") {
                                                                    setValidationStateForOne(true)
                                                                } else {
                                                                    setValidationStateForOne(false)
                                                                    submitData(dropDownActions.level_5_value)
                                                                }

                                                            }}>
                                                                Submit
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            }

                                        </div>
                                    </div>
                                </div>
                            }


                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default Categories