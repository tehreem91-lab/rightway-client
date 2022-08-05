import PageTemplate from "../../Components/PageTemplate";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { endPoint } from "../../config/Config";

function EmployeeDesignations({ pagePermission }) {
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
    designation_id: 0,
    designationName: "",
  });

  let formFields = [
    {
      label: "Designation",
      name: "designationName",
      type: "text",
      placeholder: "Enter designation Name",
      required: true,
      disabled: false,
      hidden: false,
    },
  ];

  const DisplayingErrorMessagesSchema = Yup.object().shape({
    designationName: Yup.string().required("Designation Name cannot be empty"),
  });

  useEffect(() => {
    fetchData();
  }, []);

  const clearFields = () => {
    setInitialValues({
      designation_id: 0,
      designationName: "",
    });

    setUpdateMode(false);
  };

  const changeFieldValue = (field, value) => {
    var obj = initialValues;
    if (field === "designationName") {
      obj.designationName = value;
    }

    setInitialValues(obj);
  };

  const fetchData = () => {
    fetch(URL + "api/EmployeeDesignations/GetData", {
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
            heading: "Employee Designation Name",
            className: "text-center",
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
              name: "designationName",
              value: value.designationName,
              className: "text-center",
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
              entity_id: value.designation_id,
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

  const fetchDataForEdit = (designation_id) => {
    setUpdateMode(false);
    fetch(URL + "api/EmployeeDesignations/GetDataById?id=" + designation_id, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("access_token")).access_token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.designationName === null) {
          json.designationName = "";
        }

        console.log("get data by id data", json);
        let obj = initialValues;
        obj.designation_id = json.designation_id;
        obj.designationName = json.designationName;

        setInitialValues(obj);
        setUpdateMode(true);
      });
  };
  const formSubmit = (data) => {
    fetch(
      URL +
      (updateMode
        ? "api/EmployeeDesignations/PutData?id=" +
        initialValues.designation_id
        : "api/EmployeeDesignations/PostData"),
      {
        method: updateMode ? "PUT" : "POST",
        headers: {
          Authorization:
            "Bearer " +
            JSON.parse(localStorage.getItem("access_token")).access_token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          designation_name: data.designationName,
          page_name: "Employee_Designation"
        }),
      }
    ).then((response) => {
      if (response.status === 200) {
        toast.success(
          "Employee Name has been " +
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
  const page_name='Manage_Designation_Names'
  const deleteMachineName = (designation_id) => {
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
        fetch( `${endPoint}api/EmployeeDesignations/DeleteData?id=${designation_id}&page_name=${page_name}`,
          // URL + "api/EmployeeDesignations/DeleteData?id=" + designation_id,
          {
            method: "DELETE",
            headers: {
              Authorization:
                "Bearer " +
                JSON.parse(localStorage.getItem("access_token")).access_token,
            },
          }
        ).then((response) => {
          if (response.status === 200) {
            toast.success("Employee Name has been Deleted successfully!");
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
      moduleName="Manage  Designation Names"
      formTitle="Add/Edit Designation Name"
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

export default EmployeeDesignations;
