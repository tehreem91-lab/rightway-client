import PageTemplate from "../../Components/PageTemplate";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";

function CompanyInfo({ pagePermission }) {
  const rolePermissionTable = {
    Add: pagePermission.AddPermission,
    Delete: pagePermission.DelPermission,
    Edit: pagePermission.EditPermission,
  };
  const URL = localStorage.getItem("authUser");
  const [isLoading, setIsLoading] = useState(true);
  const [updateMode, setUpdateMode] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [listingData, setListingData] = useState([]);
  const [files, setFiles] = useState([]);
  const [initialValues, setInitialValues] = useState({
    company_info_id: 0,
    company_name: "",
    address: "",
    city: "",
    zip_code: "",
    province: "",
    country: "",
    tax_reg_no: "",
    ntn_no: "",
    cell_no: "",
    office_no: "",
    logo: "",
    currency_unit_id: 0,
  });

  const [formFields, setFormFields] = useState([
    {
      label: "Company Name",
      name: "company_name",
      type: "text",
      placeholder: "Enter Company Name",
      required: true,
      disabled: true,
      hidden: false,
    },
    {
      label: "City",
      name: "city",
      type: "select",
      placeholder: "",
      required: true,
      disabled: true,
      hidden: false,
    },
    {
      label: "Cell No",
      name: "cell_no",
      type: "text",
      placeholder: "Enter Cell No",
      required: true,
      disabled: true,
      hidden: false,
    },
    {
      label: "Zip Code",
      name: "zip_code",
      type: "text",
      placeholder: "Enter Zip Code",
      required: false,
      disabled: true,
      hidden: false,
    },
    {
      label: "Office No",
      name: "office_no",
      type: "text",
      placeholder: "Enter Office No",
      required: false,
      disabled: true,
      hidden: false,
    },
    {
      label: "Ntn No",
      name: "ntn_no",
      type: "text",
      placeholder: "Enter Ntn No",
      required: false,
      disabled: true,
      hidden: false,
    },
    {
      label: "Logo",
      name: "logo",
      type: "file",
      placeholder: "Enter Ntn No",
      required: false,
      disabled: true,
      hidden: false,
    },
    {
      label: "Tax Reg No",
      name: "tax_reg_no",
      type: "text",
      placeholder: "Enter Tax Reg No",
      required: false,
      disabled: true,
      hidden: false,
    },
    {
      label: "Address",
      name: "address",
      type: "textarea",
      placeholder: "Enter Address",
      rows: "3",
      required: true,
      disabled: true,
      hidden: false,
    },
    {
      label: "Currency Unit",
      name: "currency_unit_id",
      type: "select",
      placeholder: "",
      required: true,
      disabled: true,
      hidden: false,
    },
  ]);

  const DisplayingErrorMessagesSchema = Yup.object().shape({
    company_name: Yup.string().required("Company name cannot be empty"),
    city: Yup.string().required("Select City First"),
    cell_no: Yup.number()
      .required("Cell No cannot be empty")
      .typeError("Invalid Cell No"),
    office_no: Yup.number().typeError("Invalid Office No"),
    logo: Yup.string().required("Company Logo is required"),
    address: Yup.string().required("Address cannot be empty"),
    currency_unit_id: Yup.string().required("Select Currency Unit First"),
  });

  useEffect(() => {
    fetchData();
    fetchCityNames();
    fetchUnitNames();
  }, []);

  const clearFields = () => {
    let arrFields = formFields;
    arrFields.forEach((element) => {
      element.disabled = true;
    });
    arrFields[1].defaultValue = { label: "--- Select City ---", value: "" };
    arrFields[9].defaultValue = {
      label: "--- Select Currency Unit ---",
      value: "",
    };
    setFormFields(arrFields);
    setInitialValues({
      company_info_id: 0,
      company_name: "",
      address: "",
      city: "",
      zip_code: "",
      province: "",
      country: "",
      tax_reg_no: "",
      ntn_no: "",
      cell_no: "",
      office_no: "",
      logo: "",
      currency_unit_id: 0,
    });
    setUpdateMode(false);
    setShowButtons(false);
  };

  const changeFieldValue = (field, value) => {
    var obj = initialValues;
    if (field === "company_name") {
      obj.company_name = value;
    } else if (field === "city") {
      obj.city = value;
    } else if (field === "cell_no") {
      obj.cell_no = value;
    } else if (field === "zip_code") {
      obj.zip_code = value;
    } else if (field === "office_no") {
      obj.office_no = value;
    } else if (field === "ntn_no") {
      obj.ntn_no = value;
    } else if (field === "tax_reg_no") {
      obj.tax_reg_no = value;
    } else if (field === "currency_unit_id") {
      obj.currency_unit_id = value;
    }
    setInitialValues(obj);
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

  const fetchUnitNames = () => {
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
        var arr = [];
        arr.push({ label: "--- Select Currency Unit ---", value: "" });
        json.map((item) => {
          arr.push({ label: item.unit_name, value: item.currency_unit_id });
        });

        var arrFields = formFields;
        arrFields[9].defaultValue = arr[0];
        arrFields[9].options = arr;
        setFormFields(arrFields);
      });
  };

  const fetchData = () => {
    fetch(URL + "api/CompanyInfo", {
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
            heading: "Company Name",
            className: "",
            style: {},
          },
          {
            heading: "Cell No",
            className: "",
            style: {},
          },
          {
            heading: "Address",
            className: "",
            style: {},
          },
          {
            heading: "City",
            className: "",
            style: {},
          },
          {
            heading: "Unit Name",
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
        tbodyData.push([
          {
            name: "company_name",
            value: json.company_name,
            className: "",
            style: {},
          },
          {
            name: "cell_no",
            value: json.cell_no,
            className: "",
            style: {},
          },
          {
            name: "address",
            value: json.address,
            className: "",
            style: {},
          },
          {
            name: "city_name",
            value: json.city_name,
            className: "",
            style: {},
          },
          {
            name: "unit_name",
            value: json.unit_name,
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
            ],
            className: "text-right",
            style: {
              width: "20%",
            },
          },
        ]);

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

  const fetchDataForEdit = (id) => {
    setUpdateMode(false);
    fetch(URL + "api/CompanyInfo", {
      method: "GET",
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("access_token")).access_token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.company_name === null) {
          data.company_name = "";
        }
        if (data.address === null) {
          data.address = "";
        }
        if (data.city_id === null) {
          data.city_id = "";
        }
        if (data.city_name === null) {
          data.city_name = "";
        }
        if (data.zip_code === null) {
          data.zip_code = "";
        }
        if (data.province === null) {
          data.province = "";
        }
        if (data.country === null) {
          data.country = "";
        }
        if (data.tax_reg_no === null) {
          data.tax_reg_no = "";
        }
        if (data.ntn_no === null) {
          data.ntn_no = "";
        }
        if (data.cell_no === null) {
          data.cell_no = "";
        }
        if (data.office_no === null) {
          data.office_no = "";
        }
        if (data.logo === null) {
          data.logo = "";
        }
        if (data.currency_unit_id === null) {
          data.currency_unit_id = "";
        }
        if (data.unit_name === null) {
          data.unit_name = "";
        }

        let arrFields = formFields;
        arrFields.forEach((element) => {
          element.disabled = false;
        });
        arrFields[1].defaultValue = {
          label: data.city_name,
          value: data.city_id,
        };
        arrFields[9].defaultValue = {
          label: data.unit_name,
          value: data.currency_unit_id,
        };

        let obj = initialValues;
        obj.company_info_id = data.company_info_id;
        obj.company_name = data.company_name;
        obj.address = data.address;
        obj.city = data.city_id;
        obj.zip_code = data.zip_code;
        obj.province = data.province;
        obj.country = data.country;
        obj.tax_reg_no = data.tax_reg_no;
        obj.ntn_no = data.ntn_no;
        obj.cell_no = data.cell_no;
        obj.office_no = data.office_no;
        obj.logo = data.logo;
        obj.currency_unit_id = data.currency_unit_id;

        var arrFiles = [
          {
            name: "logo",
            type: "image",
            value: data.logo,
          },
        ];

        setFormFields(arrFields);
        setInitialValues(obj);
        setFiles(arrFiles);
        setUpdateMode(true);
        setShowButtons(true);
      });
  };

  const formSubmit = (data) => {
    fetch(URL + "/api/CompanyInfo/" + data.company_info_id, {
      method: "PUT",
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("access_token")).access_token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status === 204) {
        toast.success("Company Info has been updated successfully!");
        fetchData();
        clearFields();
        setUpdateMode(false);
      } else {
        response.json().then((json) => {
          toast.error(json.Message);
        });
      }
    });
  };

  return (
    <PageTemplate
      pagePermission={rolePermissionTable}
      moduleName="Company Info"
      formTitle="Edit Company Info"
      formFields={formFields}
      initialValues={initialValues}
      files={files}
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
      showButtons={showButtons}
    />
  );
}

export default CompanyInfo;
