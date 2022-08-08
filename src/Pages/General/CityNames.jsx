import PageTemplate from '../../Components/PageTemplate';
import React, { useEffect, useState } from "react";
import * as Yup from 'yup';
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function CityNames({ pagePermission }) {
    const page_name = "Manage City Names";
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
        city_id: 0,
        city_name: ""
    });

    let formFields = [
        {
            label: "City Name",
            name: "city_name",
            type: "text",
            placeholder: "Enter City Name",
            required: true,
            disabled: false,
            hidden: false
        },
    ]
    // const [formFields, setFormFields] = useState()

    const DisplayingErrorMessagesSchema = Yup.object().shape({
        city_name: Yup.string().required("Select City First"),
    });

    useEffect(() => {
        fetchData()
    }, []);

    const clearFields = () => {
        setInitialValues({
            city_id: 0,
            city_name: ""
        });
        setUpdateMode(false);
    }

    const changeFieldValue = (field, value) => {
        var obj = initialValues;
        obj.city_name = value;
        setInitialValues(obj);
    }

    const fetchData = () => {
        fetch(URL + "api/CityNames/GetData", {
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
                        heading: "City Name",
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
                            name: "city_name",
                            value: value.city_name,
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
                            entity_id: value.city_id
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

    const fetchDataForEdit = (city_id) => {
        setUpdateMode(false);
        fetch(URL + "api/CityNames/GetDataById?id=" + city_id, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + JSON.parse(localStorage.getItem("access_token")).access_token,
            },
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.city_name === null) {
                    json.city_name = ""
                }

                console.log("get data by id data", json)
                let obj = initialValues;
                obj.city_id = json.city_id;
                obj.city_name = json.city_name;

                setInitialValues(obj)
                setUpdateMode(true);
            });
    }

    const formSubmit = (data) => {
        fetch(URL + (updateMode ? "api/CityNames/PutData?id=" + initialValues.city_id : "/api/CityNames/PostData"), {
            method: (updateMode ? "PUT" : "POST"),
            headers: {
                Authorization: "Bearer " + JSON.parse(localStorage.getItem("access_token")).access_token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "city_name": data.city_name,
                "page_name": page_name
            }),
        }).then((response) => {
            if (response.status === 200) {
                toast.success("City Name has been " + (updateMode ? "Updated" : "Added" + " successfully!"));
                clearFields();
                fetchData();
            }
            else {
                (response).json().then((json) => {
                    toast.error(json.Message);
                })
            }
        })
    }

    const deleteCity = (city_id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this city name!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Do it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(URL + "api/CityNames/DeleteData?id=" + city_id + "page_name=" + page_name, {
                    method: "DELETE",
                    headers: {
                        Authorization: "Bearer " + JSON.parse(localStorage.getItem("access_token")).access_token,
                    },
                }).then((response) => {
                    if (response.status === 200) {
                        toast.success("City Name has been Deleted successfully!");
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
            moduleName="Manage City Names"
            formTitle="Add/Edit City Name"
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

export default CityNames;