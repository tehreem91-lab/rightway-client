import PageTemplate from "../../Components/PageTemplate";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
function AddBenefits({ pagePermission }) {
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
    benefit_id: 0,
    benefit_title: "",
  });

  let formFields = [
    {
      label: "Benefit Title",
      name: "benefit_title",
      type: "text",
      placeholder: "Enter Benefit Title",
      required: true,
      disabled: false,
      hidden: false,
    },
  ];

  const DisplayingErrorMessagesSchema = Yup.object().shape({
    benefit_title: Yup.string().required("Select Benefit First"),
  });

  useEffect(() => {
    fetchData();
  }, []);

  const clearFields = () => {
    setInitialValues({
      benefit_id: 0,
      benefit_title: "",
    });
    setUpdateMode(false);
  };

  const changeFieldValue = (field, value) => {
    var obj = initialValues;
    obj.benefit_title = value;
    setInitialValues(obj);
  };

  const fetchData = () => {
    fetch(URL + "api/Benefits", {
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
            heading: "Benefit Title",
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
              name: "benefit_title",
              value: value.benefit_title,
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
                  clickFunction: deleteBenefit,
                },
              ],
              className: "text-right",
              style: {
                width: "20%",
              },
              entity_id: value.benefit_id,
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

  const fetchDataForEdit = (benefit_id) => {
    setUpdateMode(false);

    fetch(URL + "api/Benefits/" + benefit_id, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("access_token")).access_token,
      },

    })
      .then((response) => response.json())
      .then((json) => {
        if (json.benefit_title === null) {
          json.benefit_title = "";
        }

        let obj = initialValues;
        obj.benefit_id = json.benefit_id;
        obj.benefit_title = json.benefit_title;
        //console.log(obj);
        setInitialValues(obj);
        setUpdateMode(true);
      });
  };

  const formSubmit = (data) => {
    //console.log(data, "adadada");

    fetch(
      URL +
      (updateMode
        ? "/api/Benefits/" +
        initialValues.benefit_id
        : "/api/Benefits/"),
      {
        method: updateMode ? "PUT" : "POST",
        headers: {
          Authorization:
            "Bearer " +
            JSON.parse(localStorage.getItem("access_token")).access_token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "benefit_id": initialValues.benefit_id,
          "benefit_title": initialValues.benefit_title
        }),
      }
    ).then((response) => {
      if (response.status === 201 || response.status === 400) {

        toast.success(
          "Benefit Title has been " +
          (updateMode ? "Updated" : "Added" + " successfully!")
        );
        clearFields();
        fetchData();
      }
    });
  };

  const deleteBenefit = (benefit_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this 'Benefit'!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Do it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(URL + "api/Benefits/" + benefit_id, {
          method: "DELETE",
          headers: {
            Authorization:
              "Bearer " +
              JSON.parse(localStorage.getItem("access_token")).access_token,
          },
        }).then((response) => {
          if (response.status === 200) {
            toast.success("Benefit has been Deleted successfully!");
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
      moduleName="Manage Benefits"
      formTitle="Add/Edit Benefit Title"
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
}

export default AddBenefits;

