import PageTemplate from "../../Components/PageTemplate";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

function AddShifts({ pagePermission }) {
  const showNavResult = useSelector((state) => state.NavReducer.data);
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
    shift_name: "",
    shift_start_time: "",
    shift_end_time: "",
  });

  let formFields = [
    {
      label: "Shift Name",
      name: "shift_name",
      type: "text",
      placeholder: "Enter Shift Name",
      required: true,
      disabled: false,
      hidden: false,
    },
    {
      label: "Shift Start Time",
      name: "shift_start_time",
      type: "time",
      // pattern: "[0-9]{2}:[0-9]{2}",

      placeholder: "",
      required: true,
      disabled: false,
      hidden: false,
    },
    {
      label: "Shift End Time",
      name: "shift_end_time",
      type: "time",
      // pattern: "[0-9]{2}:[0-9]{2}",

      placeholder: "",
      required: true,
      disabled: false,
      hidden: false,
    },
  ];

  const formatStartDate = (shift_start_time) => {
    let hours = Number(shift_start_time.split(":")[0]);
    let minutes = Number(shift_start_time.split(":")[1]);
    let AmOrPm = hours >= 12 ? " PM" : " AM";
    minutes = minutes < 10 ? "0" + minutes : minutes;
    hours = hours % 12 || 12;
    let some = hours < 10 ? "0" + hours : hours;
    return some + ":" + minutes + AmOrPm;
  };
  const formatEndDate = (shift_start_time) => {
    let hours = Number(shift_start_time.split(":")[0]);
    let minutes = Number(shift_start_time.split(":")[1]);
    let AmOrPm = hours >= 12 ? " PM" : " AM";
    minutes = minutes < 10 ? "0" + minutes : minutes;

    hours = hours % 12 || 12;
    let some = hours < 10 ? "0" + hours : hours;
    return some + ":" + minutes + AmOrPm;
  };

  const DisplayingErrorMessagesSchema = Yup.object().shape({
    shift_name: Yup.string().required("Shift name cannot be empty"),
    shift_start_time: Yup.string().required("Shift Time cannot be empty"),
    shift_end_time: Yup.string().required("Shift Time cannot be empty"),
  });

  useEffect(() => {
    fetchData();
 
  }, []);

  const clearFields = () => {
    setInitialValues({
      shift_id: 0,
      shift_name: "",
      shift_start_time: "",
      shift_end_time: "",
    });

    setUpdateMode(false);
  };

  const changeFieldValue = (field, value) => {
    var obj = initialValues;
    if (field === "shift_name") {
      obj.shift_name = value;
    } else if (field === "shift_start_time") {
      obj.shift_start_time = value;
    } else if (field === "shift_end_time") {
      obj.shift_end_time = value;
    }

    setInitialValues(obj);
  };

  const fetchData = () => {
    fetch(URL + "api/Shifts/GetData", {
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
            heading: "Shift Name",
            className: "",
            style: {},
          },
          {
            heading: "Shift Start Time",
            className: "",
            style: {},
          },
          {
            heading: "Shift End Time",
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
              name: "shift_name",
              value: value.shift_name,
              className: "",
              style: {},
            },
            {
              name: "shift_start_time",
              value: (value.shift_start_time.slice(11,19)),
              className: "",
              style: {},
            },
            {
              name: "shift_end_time",
              value: (value.shift_end_time.slice(11,19)),
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
              entity_id: value.shift_id,
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

  const fetchDataForEdit = (shift_id) => {
    setUpdateMode(false);
    fetch(URL + "api/Shifts/GetDataById?id=" + shift_id, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("access_token")).access_token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.shift_name === null) {
          json.shift_name = "";
        }

        console.log("get data by id data", json);
        let obj = initialValues;
        obj.shift_id = json.shift_id;
        obj.shift_name = json.shift_name;
        obj.shift_start_time = json.shift_start_time.slice(11,19);
        obj.shift_end_time = json.shift_end_time.slice(11,19); 
        setInitialValues(obj);
        setUpdateMode(true);
      });
  };
  const formSubmit = (data) => {
    fetch(
      URL +
      (updateMode
        ? "api/Shifts/PutData?id=" + initialValues.shift_id
        : "api/Shifts/PostData"),
      {
        method: updateMode ? "PUT" : "POST",
        headers: {
          Authorization:
            "Bearer " +
            JSON.parse(localStorage.getItem("access_token")).access_token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shift_name: data.shift_name,
          shift_start_time: data.shift_start_time,
          shift_end_time: data.shift_end_time,
        }),
      }
    ).then((response) => {
      if (response.status === 200) {
        toast.success(
          "Shift Name has been " +
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

  const deleteMachineName = (shift_id) => {
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
        fetch(URL + "api/Shifts/DeleteData?id=" + shift_id, {
          method: "DELETE",
          headers: {
            Authorization:
              "Bearer " +
              JSON.parse(localStorage.getItem("access_token")).access_token,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            toast.success("Shift Name has been Deleted successfully!");
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
      moduleName="Shifts "
      formTitle="Add/Edit Shifts Name"
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

export default AddShifts;
