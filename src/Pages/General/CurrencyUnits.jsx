import PageTemplate from "../../Components/PageTemplate";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function CurrencyUnits({ pagePermission }) {
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
    currency_unit_id: 0,
    unit_name: "",
    unit_sign: "",
  });

  let formFields = [
    {
      label: "Unit Name",
      name: "unit_name",
      type: "text",
      placeholder: "Enter Unit Name",
      required: true,
      disabled: false,
      hidden: false,
    },
    {
      label: " Unit sign",
      name: "unit_sign",
      type: "text",
      placeholder: "Enter Unit Sign",
      required: true,
      disabled: false,
      hidden: false,
    },
  ];

  const DisplayingErrorMessagesSchema = Yup.object().shape({
    unit_name: Yup.string().required("Unit name cannot be empty"),
    unit_sign: Yup.string().required("Unit sign cannot be empty"),
  });

  useEffect(() => {
    fetchData();
  }, []);

  const clearFields = () => {
    setInitialValues({
      currency_unit_id: 0,
      unit_name: "",
      unit_sign: "",
    });

    setUpdateMode(false);
  };

  const changeFieldValue = (field, value) => {
    var obj = initialValues;
    if (field === "unit_name") {
      obj.machine_model_name = value;
    } else if (field === "unit_sign") {
      obj.unit_sign = value;
    }

    setInitialValues(obj);
  };

  const fetchData = () => {
    fetch(URL + "api/CurrencyUnits/GetData", {
      method: "GET",
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("access_token")).access_token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        var theadData = [
          {
            heading: "SR #",
            className: "",
            style: {},
          },
          {
            heading: "Unit Name",
            className: "",
            style: {},
          },
          {
            heading: "Unit Sign",
            className: "",
            style: {},
          },
          {
            heading: "Actions",
            className: "text-right",
            style: {},
          },
        ];

        var tbodyData = [];
        json.map((value, index) => {
          tbodyData.push([
            {
              name: "sr_no",
              value: index + 1,
              className: "",
              style: {},
            },
            {
              name: "unit_name",
              value: value.unit_name,
              className: "",
              style: {},
            },
            {
              name: "unit_sign",
              value: value.unit_sign,
              className: "",
              style: {},
            },
            {
              name: "actions",
              value: "",
              icons: [
                {
                  type: "edit",
                  clickFunction: fetchDataForEdit,
                },
                {
                  type: "delete",
                  clickFunction: deleteMachineName,
                },
              ],
              className: "text-right",
              style: {
                width: "20%",
              },
              entity_id: value.currency_unit_id,
            },
          ]);
        });

        setListingData([{
          title: "Listing",
          icon: "fa fa-list",
          theadData,
          tbodyData,
        }]);

        setIsLoading(false);
      });
  };

  const fetchDataForEdit = (currency_unit_id) => {
    setUpdateMode(false);
    fetch(URL + "api/CurrencyUnits/GetDataById?id=" + currency_unit_id, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("access_token")).access_token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.unit_name === null) {
          json.unit_name = "";
        }

        console.log("get data by id data", json);
        let obj = initialValues;
        obj.currency_unit_id = json.currency_unit_id;
        obj.unit_name = json.unit_name;
        obj.unit_sign = json.unit_sign;

        setInitialValues(obj);
        setUpdateMode(true);
      });
  };
  const formSubmit = (data) => {
    fetch(
      URL +
      (updateMode
        ? "api/CurrencyUnits/PutData?id=" + initialValues.currency_unit_id
        : "api/CurrencyUnits/PostData"),
      {
        method: updateMode ? "PUT" : "POST",
        headers: {
          Authorization:
            "Bearer " +
            JSON.parse(localStorage.getItem("access_token")).access_token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          unit_name: data.unit_name,
          unit_sign: data.unit_sign,
        }),
      }
    ).then((response) => {
      if (response.status === 200) {
        toast.success(
          "Unit Name has been " +
          (updateMode ? "Updated" : "Added" + " successfully!")
        );
        clearFields();
        fetchData();
      } else {
        response.json().then((json) => {
          toast.error(json.Message);
        });
      }
    });
  };

  const deleteMachineName = (currency_unit_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this currency unit!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Do it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(URL + "api/CurrencyUnits/DeleteData?id=" + currency_unit_id, {
          method: "DELETE",
          headers: {
            Authorization:
              "Bearer " +
              JSON.parse(localStorage.getItem("access_token")).access_token,
          },
        }).then((response) => {
          if (response.status === 200) {
            toast.success("Unit Name has been Deleted successfully!");
            fetchData();
            clearFields();
          } else {
            response.json().then((json) => {
              console.log(response);
              toast.error(json.Message);
            });
          }
        });
      }
    });
  };

  return (
    <PageTemplate
      pagePermission={rolePermissionTable}
      moduleName="Currency Units"
      formTitle="Add/Edit Unit Name"
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
      changeFieldValue={changeFieldValue}
      showButtons={true}
      isShowSelector={true}
    />
  );
}

export default CurrencyUnits;
