import PageTemplate from "../../Components/PageTemplate";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const AddPages = ({ pagePermission }) => {
  const accessToken  = localStorage.getItem("access_token");
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
    page_id: 0,
    page_name: "",
    page_url: "",
    module: "",
    module_id: 0,
    module_name: "",
  });

  const [formFields, setFormFields] = useState([
    {
      label: "Page Title",
      name: "page_name",
      type: "text",
      placeholder: "Enter Page Title",
      required: true,
      disabled: false,
      hidden: false,
    },
    {
      label: "Page Url",
      name: "page_url",
      type: "text",
      placeholder: "Enter Page Title",
      required: true,
      disabled: false,
      hidden: false,
    },
    {
      label: "Module",
      name: "module_name",
      type: "select",
      placeholder: "",
      required: true,
      disabled: false,
      hidden: false,
    },
  ]);

  const DisplayingErrorMessagesSchema = Yup.object().shape({
    page_name: Yup.string().required("Add Page Tilte First"),
    page_url: Yup.string().required("Add Page Url First"),
    module_name: Yup.string().required("Select Module First"),
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
      page_id: "",
      page_name: "",
      page_url: "",
      module: "",
      module_id: "",
      module_name: "",
    });
    setUpdateMode(false);
  };

  const changeFieldValue = (field, value) => {
    var obj = initialValues;
    if (field === "page_name") {
      obj.page_name = value;
    } else if (field === "page_url") {
      obj.page_url = value;
    } else if (field === "module") {
      obj.module = value;
    }

    setInitialValues(obj);
  };

  const fetchData = () => {
    fetch(URL + "api/Pages", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + JSON.parse(accessToken).access_token,
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
            heading: "Page Title",
            className: "",
            style: {},
          },
          {
            heading: "Page Url",
            className: "",
            style: {},
          },
          {
            heading: "Module Name",
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
              name: "page_name",
              value: value.name,
              className: "",
              style: {},
            },
            {
              name: "page_url",
              value: value.pageUrl,
              className: "",
              style: {},
            },
            {
              name: "module_name",
              value: value.module,
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
              entity_id: value.id,
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
    fetch(URL + "api/Modules", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + JSON.parse(accessToken).access_token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        var arr = [];
        arr.push({ label: "--- Select Module ---", value: "" });
        json.map((item) => {
          arr.push({ label: item.module_name, value: item.module_id });
        });

        var arrFields = formFields;
        arrFields[2].defaultValue = arr[0];
        arrFields[2].options = arr;
        setFormFields(arrFields);
      });
  };
  const fetchDataForEdit = (page_id) => {
    setUpdateMode(false);
    fetch(URL + "api/Pages/" + page_id, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + JSON.parse(accessToken).access_token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.page_name === null) {
          json.page_name = "";
        }

        console.log("get data by id data", json);
        let arrFields = formFields;
        arrFields.forEach((element) => {
          element.disabled = false;
        });
        arrFields[1].defaultValue = {
          label: json.module_id,
          value: json.module_id,
        };
        let obj = initialValues;

        // page_id: 0,
        // page_name: "",
        // page_url: "",
        // module: "",
        // module_id: 0,
        // module_name: "",


        obj.page_id = json.page_id;
        obj.page_name = json.page_name;
        obj.page_url = json.page_link;
        obj.module_name = json.module_id;
        setFormFields(arrFields);

        setInitialValues(obj);
        setUpdateMode(true);
      });
  };
  const formSubmit = (data) => { 
    fetch(
      URL +
        (updateMode
          ? "api/Pages?page_name='Manage Pages'"
          : "api/Pages?page_name='Manage Pages'"),
      {
        method: updateMode ? "PUT" : "POST",
        headers: {
          Authorization: "Bearer " + JSON.parse(accessToken).access_token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page_id: data.page_id,
          page_name: data.page_name,
          page_link: data.page_url,
          module_id: data.module_name,
        }),
      }
    ).then((response) => {
      console.log(response , "role"); 
      if (response.status === 200 || response.status === 204 ) {
        toast.success(
          "Page Name has been " +
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

  const deleteBankName = (page_id) => {
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
        fetch(URL + `api/Pages/${page_id}?page_name='Manage Pages'`, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + JSON.parse(accessToken).access_token,
          },
        }).then((response) => {
          if (response.status === 200) {
            toast.success("Page has been Deleted successfully!");
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
      moduleName="Manage Pages"
      formTitle="Add/Edit Page Name"
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
};

export default AddPages;
