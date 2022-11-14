import PageTemplate from "../../Components/PageTemplate";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function Banknames({ pagePermission }) {
  const rolePermissionTable = {
    Add: pagePermission.AddPermission,
    Delete: pagePermission.DelPermission,
    Edit: pagePermission.EditPermission,
  };
  const URL = localStorage.getItem("authUser");
  const [isLoading, setIsLoading] = useState(true);
  const [updateMode, setUpdateMode] = useState(false);
  const [listingData, setListingData] = useState([]);
  const [initialValues, setInitialValues] = useState({
    bank_id: 0,
    bank_name: "",
    branch_city: 0,
    branch_city_id: 0,
    branch_city_name: "",
  });

  const [formFields, setFormFields] = useState([
    {
      label: "Bank Name",
      name: "bank_name",
      type: "text",
      placeholder: "Enter Bank Name",
      required: true,
      disabled: false,
      hidden: false,
    },
    {
      label: "Branch City",
      name: "branch_city",
      type: "select",
      placeholder: "",
      required: true,
      disabled: false,
      hidden: false,
    },
  ]);

  const DisplayingErrorMessagesSchema = Yup.object().shape({
    bank_name: Yup.string().required("Select Bank Name First"),
    branch_city: Yup.string().required("Select Branch First"),
  });

  useEffect(() => {
    fetchData();
    fetchCityNames();
  }, []);

  const clearFields = () => {
    let arrFields = formFields;
    arrFields.forEach((element) => {
      element.disabled = false;
    });
    arrFields[1].defaultValue = { label: "--- Select City ---", value: "" };
    setInitialValues({
      bank_id: 0,
      bank_name: "",
      branch_city: 0,
    });
    setUpdateMode(false);
  };

  const changeFieldValue = (field, value) => {
    var obj = initialValues;
    if (field === "bank_name") {
      obj.bank_name = value;
    } else if (field === "branch_city") {
      obj.branch_city = value;
    }

    setInitialValues(obj);
  };

  const fetchData = () => {
    fetch(URL + "api/BankNames/GetData", {
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
            heading: "Bank Name",
            className: "",
            style: {},
          },
          {
            heading: "Branch City",
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
              name: "bank_name",
              value: value.bank_name,
              className: "",
              style: {},
            },
            {
              name: "branch_city",
              value: value.branch_city,
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
                  clickFunction: deleteBankName,
                },
              ],
              className: "text-right",
              style: {
                width: "20%",
              },
              entity_id: value.bank_id,
            },
          ]);
        });

        setListingData([
          {
            title: "Listing",
            icon: "fa fa-list",
            theadData,
            tbodyData,
          },
        ]);

        setIsLoading(false);
      });
  };
  const fetchCityNames = () => {
    fetch(URL + "api/CityNames/GetData", {
      method: "GET",
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("access_token")).access_token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        var arr = [];
        arr.push({ label: "--- Select City ---", value: "" });
        json.map((item) => {
          arr.push({ label: item.city_name, value: item.city_id });
        });

        var arrFields = formFields;
        arrFields[1].defaultValue = arr[0];
        arrFields[1].options = arr;
        setFormFields(arrFields);
      });
  };
  const fetchDataForEdit = (bank_id) => {
    setUpdateMode(false);
    fetch(URL + "api/BankNames/GetDataById?id=" + bank_id, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("access_token")).access_token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.bank_name === null) {
          json.bank_name = "";
        }

        console.log("get data by id data", json);
        let arrFields = formFields;
        arrFields.forEach((element) => {
          element.disabled = false;
        });
        arrFields[1].defaultValue = {
          label: json.branch_city_name,
          value: json.branch_city_id,
        };
        let obj = initialValues;
        obj.bank_id = json.bank_id;
        obj.bank_name = json.bank_name;
        obj.branch_city = json.branch_city;
        setFormFields(arrFields);

        setInitialValues(obj);
        setUpdateMode(true);
      });
  };
  const formSubmit = (data) => {
    if (data.bank_name && data.branch_city) {
      fetch(
        URL +
          (updateMode
            ? "api/BankNames/PutData?id=" + initialValues.bank_id
            : "api/BankNames/PostData"),
        {
          method: updateMode ? "PUT" : "POST",
          headers: {
            Authorization:
              "Bearer " +
              JSON.parse(localStorage.getItem("access_token")).access_token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bank_name: data.bank_name,
            branch_city: data.branch_city,
          }),
        }
      ).then((response) => {
        if (response.status === 200) {
          toast.success(
            "Bank Name has been " +
              (updateMode ? "Updated" : "Added" + " successfully!")
          );
          clearFields();
          fetchData();
        } else {
          response.json().then((json) => {});
        }
      });
    }
  };

  const deleteBankName = (bank_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this bank name!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Do it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(URL + "api/BankNames/DeleteData?id=" + bank_id, {
          method: "DELETE",
          headers: {
            Authorization:
              "Bearer " +
              JSON.parse(localStorage.getItem("access_token")).access_token,
          },
        }).then((response) => {
          if (response.status === 200) {
            toast.success("Bank has been Deleted successfully!");
            fetchData();
            clearFields();
          } else {
            response.json().then((json) => {
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
      moduleName="Bank Names"
      formTitle="Add/Edit Bank Name"
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

export default Banknames;
