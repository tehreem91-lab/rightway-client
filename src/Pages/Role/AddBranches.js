import PageTemplate from '../../Components/PageTemplate';
import React, { useEffect, useState } from "react";
import * as Yup from 'yup';
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function AddBranches({ pagePermission }) { 
    const rolePermissionTable = {
        Add: pagePermission.AddPermission,
        Delete: pagePermission.DelPermission,
        Edit: pagePermission.EditPermission,
    }
    const URL = localStorage.getItem("authUser");
    const [isLoading, setIsLoading] = useState(true);
    const [updateMode, setUpdateMode] = useState(false);
    const [listingData, setListingData] = useState([]);
    const [initialValues, setInitialValues] = useState({
        branch_id: 0,
        branch_name: ""
    });

    let formFields = [
        {
            label: "Branch Name",
            name: "branch_name",
            type: "text",
            placeholder: "Enter Branch Name",
            required: true,
            disabled: false,
            hidden: false
        },
    ]
    // const [formFields, setFormFields] = useState()

    const DisplayingErrorMessagesSchema = Yup.object().shape({
        branch_name: Yup.string().required("Select Branch First"),
    });

    useEffect(() => {
        fetchData()
    }, []);

    const clearFields = () => {
        setInitialValues({
            branch_id: 0,
            branch_name: ""
        });
        setUpdateMode(false);
    }

    const changeFieldValue = (field, value) => {
        var obj = initialValues;
        obj.branch_name = value;
        setInitialValues(obj);
    }

    const fetchData = () => {
        fetch(URL + "api/BrachesConfig/GetData", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + JSON.parse(localStorage.getItem("access_token")).access_token,
            },
        })
            .then((response) => response.json())
            .then((json) => {
                var theadData = [
                    {
                        heading: "SR #",
                        className: "",
                        style: {}
                    },
                    {
                        heading: "Branch Name",
                        className: "",
                        style: {}
                    },
                    {
                        heading: "Actions",
                        className: "text-right",
                        style: {},
                    }
                ]

                var tbodyData = [];
                json.map((value, index) => {
                    tbodyData.push([
                        {
                            name: "sr_no",
                            value: (index + 1),
                            className: "",
                            style: {}
                        },
                        {
                            name: "branch_name",
                            value: value.branch_name,
                            className: "",
                            style: {}
                        },
                        {
                            name: "actions",
                            value: "",
                            icons: [
                                {
                                    type: "edit",
                                    clickFunction: fetchDataForEdit
                                },
                                {
                                    type: "delete",
                                    clickFunction: deleteCity
                                }
                            ],
                            className: "text-right",
                            style: {
                                width: "20%"
                            },
                            entity_id: value.branch_id
                        },
                    ])
                })

                setListingData([{
                    title: "Listing",
                    icon: "fa fa-list",
                    theadData,
                    tbodyData
                }])

                setIsLoading(false);
            });
    };

    const fetchDataForEdit = (branch_id) => {
        setUpdateMode(false);
        fetch(URL + "api/BrachesConfig/GetDataById?id=" + branch_id, { 
            method: "GET",
            headers: {
                Authorization: "Bearer " + JSON.parse(localStorage.getItem("access_token")).access_token,
            },
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.branch_name === null) {
                    json.branch_name = ""
                }
 
                let obj = initialValues;
                obj.branch_id = json.branch_id;
                obj.branch_name = json.branch_name;

                setInitialValues(obj)
                setUpdateMode(true);
            });
    }

    const formSubmit = (data) => {
        console.log(data , "adadada");
        fetch(URL + (updateMode ? "/api/BrachesConfig/PutData?branch_id=" + initialValues.branch_id+"&branch_name="+data.branch_name : "/api/BrachesConfig/PostData?branch_name="+data.branch_name), {
            method: (updateMode ? "PUT" : "POST"),
            headers: {
                Authorization: "Bearer " + JSON.parse(localStorage.getItem("access_token")).access_token,
                "Content-Type": "application/json",
            },
            // body: JSON.stringify({
            //     "city_name": data.city_name,
            //     "page_name": page_name
            // }),
        }).then((response) => {
            if (response.status === 200) {
                toast.success("Branch Name has been " + (updateMode ? "Updated" : "Added" + " successfully!"));
                clearFields();
                fetchData();
            }
            else{
                (response).json().then((json) => {
                    toast.error(json.Message);
                })
            }
        })
    }

    const deleteCity = (branch_id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this Branch name!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Do it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(URL + "api/BrachesConfig/DeleteData?branch_id=" + branch_id, {
                    method: "DELETE",
                    headers: {
                        Authorization: "Bearer " + JSON.parse(localStorage.getItem("access_token")).access_token,
                    },
                }).then((response) => {
                    if (response.status === 200) {
                        toast.success("Branch Name has been Deleted successfully!");
                        fetchData();
                        clearFields();

                    }
                    else {
                        (response).json().then((json) => {
                            toast.error(json.Message);
                        })
                    }
                })
            }
        })
    }

    return (
        <PageTemplate
            pagePermission={rolePermissionTable}
            moduleName="Add Branches"
            formTitle="Add/Edit Branch Name"
            formFields={formFields}
            initialValues={initialValues}
            DisplayingErrorMessagesSchema={DisplayingErrorMessagesSchema}
            updateMode={updateMode}
            formSubmit={formSubmit}
            listing={listingData}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            fetchData={fetchData}
            clearFields={clearFields}
            isShowSelector={true}
            changeFieldValue={changeFieldValue}
            showButtons={true}
        />
    );
};

export default AddBranches;