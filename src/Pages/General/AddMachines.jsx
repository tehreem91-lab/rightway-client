import PageTemplate from "../../Components/PageTemplate";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function AddMachines({ pagePermission }) {
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
    machine_id: 0,
    machine_model_name: "",
    machine_per_hour_capacity: 1,
  });

  let formFields = [
    {
      label: "Machine Name",
      name: "machine_model_name",
      type: "text",
      placeholder: "Enter Machine Name",
      required: true,
      disabled: false,
      hidden: false,
    },
    {
      label: " Capacity",
      name: "machine_per_hour_capacity",
      type: "number",
      placeholder: "",
      // min: "1",
      required: true,
      disabled: false,
      hidden: false,
    },
  ];

  const DisplayingErrorMessagesSchema = Yup.object().shape({
    machine_model_name: Yup.string().required("Machine name cannot be empty"),
    machine_per_hour_capacity: Yup.number()
      .required("Machine capacity cannot be empty")
      .min(1, "must be at least 1 characters long"),
  });

  useEffect(() => {
    fetchData();
  }, []);

  const clearFields = () => {
    setInitialValues({
      machine_id: 0,
      machine_model_name: "",
      machine_per_hour_capacity: 1,
    });

    setUpdateMode(false);
  };

  const changeFieldValue = (field, value) => {
    var obj = initialValues;
    if (field === "machine_model_name") {
      obj.machine_model_name = value;
    } else if (field === "machine_per_hour_capacity") {
      obj.machine_per_hour_capacity = value;
    }

    setInitialValues(obj);
  };

  const fetchData = () => {
    fetch(URL + "api/Machines/GetData", {
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
            heading: "Machine Name",
            className: "",
            style: {},
          },
          {
            heading: "Machine Capacity",
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
              name: "machine_model_name",
              value: value.machine_model_name,
              className: "",
              style: {},
            },
            {
              name: "machine_per_hour_capacity",
              value: value.machine_per_hour_capacity,
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
              entity_id: value.machine_id,
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

  const fetchDataForEdit = (machine_id) => {
    setUpdateMode(false);
    fetch(URL + "api/Machines/GetDataById?id=" + machine_id, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("access_token")).access_token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.machine_model_name === null) {
          json.machine_model_name = "";
        }

        console.log("get data by id data", json);
        let obj = initialValues;
        obj.machine_id = json.machine_id;
        obj.machine_model_name = json.machine_model_name;
        obj.machine_per_hour_capacity = json.machine_per_hour_capacity;

        setInitialValues(obj);
        setUpdateMode(true);
      });
  };
  const formSubmit = (data) => {
    fetch(
      URL +
      (updateMode
        ? "api/Machines/PutData?id=" + initialValues.machine_id
        : "api/Machines/PostData"),
      {
        method: updateMode ? "PUT" : "POST",
        headers: {
          Authorization:
            "Bearer " +
            JSON.parse(localStorage.getItem("access_token")).access_token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          machine_model_name: data.machine_model_name,
          machine_per_hour_capacity: data.machine_per_hour_capacity,
        }),
      }
    ).then((response) => {
      if (response.status === 200) {
        toast.success(
          "Machine Name has been " +
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

  const deleteMachineName = (machine_id) => {
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
        fetch(URL + "api/Machines/DeleteData?id=" + machine_id, {
          method: "DELETE",
          headers: {
            Authorization:
              "Bearer " +
              JSON.parse(localStorage.getItem("access_token")).access_token,
          },
        }).then((response) => {
          if (response.status === 200) {
            toast.success("Machine Name has been Deleted successfully!");
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
      moduleName="Manage Machines Names"
      formTitle="Add/Edit Machines Name"
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

export default AddMachines;
