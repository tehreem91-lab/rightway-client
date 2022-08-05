import PageTemplate from "../../Components/PageTemplate";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function StockUnits({ pagePermission }) {
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
    stock_unit_id: 0,
    stock_unit_name: "",
  });

  let formFields = [
    {
      label: "Stock Name",
      name: "stock_unit_name",
      type: "text",
      placeholder: "Enter Stock Name",
      required: true,
      disabled: false,
      hidden: false,
    },
  ];

  const DisplayingErrorMessagesSchema = Yup.object().shape({
    stock_unit_name: Yup.string().required("Stock name cannot be empty"),
  });

  useEffect(() => {
    fetchData();
  }, []);

  const clearFields = () => {
    setInitialValues({
      stock_unit_name: "",
    });

    setUpdateMode(false);
  };

  const changeFieldValue = (field, value) => {
    var obj = initialValues;
    if (field === "stock_unit_name") {
      obj.stock_unit_name = value;
    }

    setInitialValues(obj);
  };

  const fetchData = () => {
    fetch(URL + "api/StockUnits/GetData", {
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
            heading: "Stock Name",
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
              name: "stock_unit_name",
              value: value.stock_unit_name,
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
              entity_id: value.stock_unit_id,
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

  const fetchDataForEdit = (stock_unit_id) => {
    setUpdateMode(false);
    fetch(URL + "api/StockUnits/GetDataById?id=" + stock_unit_id, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("access_token")).access_token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.stock_unit_name === null) {
          json.stock_unit_name = "";
        }

        console.log("get data by id data", json);
        let obj = initialValues;
        obj.stock_unit_id = json.stock_unit_id;
        obj.stock_unit_name = json.stock_unit_name;

        setInitialValues(obj);
        setUpdateMode(true);
      });
  };
  const formSubmit = (data) => {
    fetch(
      URL +
      (updateMode
        ? "api/StockUnits/PutData?id=" + initialValues.stock_unit_id
        : "api/StockUnits/PostData"),
      {
        method: updateMode ? "PUT" : "POST",
        headers: {
          Authorization:
            "Bearer " +
            JSON.parse(localStorage.getItem("access_token")).access_token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stock_unit_name: data.stock_unit_name,
        }),
      }
    ).then((response) => {
      if (response.status === 200) {
        toast.success(
          "Stoke Name has been " +
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

  const deleteMachineName = (stock_unit_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this city name!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Do it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(URL + "api/StockUnits/DeleteData?id=" + stock_unit_id, {
          method: "DELETE",
          headers: {
            Authorization:
              "Bearer " +
              JSON.parse(localStorage.getItem("access_token")).access_token,
          },
        }).then((response) => {
          if (response.status === 200) {
            toast.success("Stoke Name has been Deleted successfully!");
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
      moduleName="Manage Stock Names"
      formTitle="Add/Edit Stock Name"
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
    />
  );
}

export default StockUnits;
