import PageTemplate from "../../Components/PageTemplate";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function Categories({ pagePermission }) {
  const rolePermissionTable = {
    Add: pagePermission.AddPermission,
    Delete: pagePermission.DelPermission,
    Edit: pagePermission.EditPermission,
  }
  const URL = localStorage.getItem("authUser");
  const [isLoading, setIsLoading] = useState(true);
  const [updateMode, setUpdateMode] = useState(false);
  const [reRender, setReRender] = useState(false);
  const [allListingData, setAllListingData] = useState([]);
  const [listingData, setListingData] = useState([]);
  const [initialValues, setInitialValues] = useState({
    category_1: 0,
  });
  const [filterFields, setFilterFields] = useState([
    {
      label: "View Category",
      name: "filter_category",
      type: "select",
      defaultValue: { label: "All", value: "-1" }
    }
  ])
  const [formFields, setFormFields] = useState([
    {
      label: "Select Category 1",
      name: "category_1",
      type: "select",
      required: true,
      disabled: false,
      hidden: false,
    },
  ])

  //   const DisplayingErrorMessagesSchema = Yup.object().shape({
  //     city_name: Yup.string().required("Select City First"),
  //   });

  useEffect(() => {
    fetchData();
  }, []);

  //   const clearFields = () => {
  //     setInitialValues({
  //       city_id: 0,
  //       city_name: "",
  //     });
  //     setUpdateMode(false);
  //   };

  const generateTbody = (value, index) => {
    return [
      {
        name: "sr_no",
        value: index + 1,
        className: "",
        style: {},
      },
      {
        name: "category_name",
        value: value.category_name,
        className: "",
        style: {},
      },
      {
        name: "category_code",
        value: value.category_code,
        className: "",
        style: {},
      },
      {
        name: "parent_category",
        value: value.parent_category,
        className: "",
        style: {},
      },
      {
        name: "actions",
        value: value.editable === "true" ? "" : "Not Editable",
        icons: value.editable === "true" ? [
          {
            type: "edit",
            clickFunction: fetchDataForEdit,
          },
          {
            type: "delete",
            clickFunction: deleteCity,
          },
        ] : [],
        className: "text-right",
        style: {
          width: "20%",
        },
        entity_id: value.category_id,
      },
    ]
  }

  const changeFieldValue = (field, value) => {
    var obj = initialValues;
    obj.category_1 = value;
    setInitialValues(obj);
  };

  const changeFilterFieldValue = (field, value, currentListing = []) => {
    if (field.includes("filter_parent_category")) {
      // setReRender(!reRender)
      var arr = currentListing;
      arr.forEach(async element => {
        if (element.filters[0].name === field) {
          await fetch(URL + "api/Categories/" + (value === "-1" ? "GetCategoriesByLevel?level=" + Number(field.replace("filter_parent_category", "")) : "GetCategoriesByParentId?id=" + value), {
            method: "GET",
            headers: {
              Authorization:
                "Bearer " +
                JSON.parse(localStorage.getItem("access_token")).access_token,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              var tbodyData = [];
              data.map((value, index) => {
                tbodyData.push(generateTbody(value, index));
              });
              element.tbodyData = tbodyData;
              console.log("API data", data);
              setReRender(!reRender)
              // setFilterFields(filterFields)
            });
        };
      });
      console.log("after API call statement")
      setListingData(arr)
      
      // setReRender(!reRender)
    }
    else {
      var obj = filterFields[0];
      obj.options.forEach(element => {
        if (element.value === value) {
          obj.defaultValue = element;
        }
      });

      if (obj.defaultValue.label === "All") {
        setListingData(allListingData);
      }
      else {
        allListingData.forEach(element => {
          if (element.title === obj.defaultValue.label) {
            setListingData([element])
          }
        });
      }
      setFilterFields([obj]);
    }
  }

  const fetchData = () => {
    fetch(URL + "api/Categories/GetAllCategories", {
      method: "GET",
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("access_token")).access_token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        var listing = [];
        var theadData = [
          {
            heading: "SR #",
            className: "",
            style: {},
          },
          {
            heading: "Category",
            className: "",
            style: {},
          },
          {
            heading: "Category Code",
            className: "",
            style: {},
          },
          {
            heading: "Parent Category",
            className: "",
            style: {},
          },
          {
            heading: "Actions",
            className: "text-right",
            style: {},
          },
        ];

        var arrFormFieldsCat1 = [{ label: "--- Select Category 1 ---", value: "-1" }];
        var filterOptions = [{ label: "All", value: "-1" }];
        json.map((data) => {
          var level = "";
          var parent_categories = [{ label: "All", value: "-1" }];
          var tbodyData = [];

          data.map((value, index) => {
            level = value.level;
            if (level === 1) {
              arrFormFieldsCat1.push({ label: value.category_name, value: value.category_id })
            }
            tbodyData.push(generateTbody(value, index));

            var isFound = parent_categories.some(element => {
              if (element.value === value.parent_id) {
                return true;
              }

              return false;
            });
            if (!isFound) {
              parent_categories.push({ label: value.parent_category, value: value.parent_id })
            }
          });

          listing.push({
            title: "Category " + level,
            filters: [{
              label: "",
              name: "filter_parent_category" + level,
              options: parent_categories,
              defaultValue: { label: "All", value: "-1" },
              changeFilterFieldValue: changeFilterFieldValue
            }],
            icon: "",
            theadData,
            tbodyData,
          });

          filterOptions.push({ label: "Category " + level, value: level })

          var obj = formFields[0];
          obj.options = arrFormFieldsCat1;
          obj.defaultValue = { label: "--- Select Category 1 ---", value: "-1" };
          setFormFields([obj]);
        });
        setListingData(listing);
        setAllListingData(listing);

        var obj = filterFields[0];
        obj.options = filterOptions;
        setFilterFields([obj]);

        setIsLoading(false);
      });
  };

  const fetchDataForEdit = (city_id) => {
    // setUpdateMode(false);
    // fetch(URL + "api/CityNames/GetDataById?id=" + city_id, {
    //     method: "GET",
    //     headers: {
    //         Authorization: "Bearer " + JSON.parse(localStorage.getItem("access_token")).access_token,
    //     },
    // })
    //     .then((response) => response.json())
    //     .then((json) => {
    //         if (json.city_name === null) {
    //             json.city_name = ""
    //         }
    //         console.log("get data by id data", json)
    //         let obj = initialValues;
    //         obj.city_id = json.city_id;
    //         obj.city_name = json.city_name;
    //         setInitialValues(obj)
    //         setUpdateMode(true);
    //     });
  };

  const formSubmit = (data) => {
    // fetch(URL + (updateMode ? "api/CityNames/PutData?id=" + initialValues.city_id : "/api/CityNames/PostData"), {
    //     method: (updateMode ? "PUT" : "POST"),
    //     headers: {
    //         Authorization: "Bearer " + JSON.parse(localStorage.getItem("access_token")).access_token,
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //         "city_name": data.city_name
    //     }),
    // }).then((response) => {
    //     if (response.status === 200) {
    //         toast.success("City Name has been " + (updateMode ? "Updated" : "Added" + " successfully!"));
    //         clearFields();
    //         fetchData();
    //     }
    //     else {
    //         (response).json().then((json) => {
    //             toast.error(json.Message);
    //         })
    //     }
    // })
  };

  const deleteCity = (city_id) => {
    // Swal.fire({
    //     title: 'Are you sure?',
    //     text: "You won't be able to revert this city name!",
    //     icon: 'warning',
    //     showCancelButton: true,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     confirmButtonText: 'Yes, Do it!'
    // }).then((result) => {
    //     if (result.isConfirmed) {
    //         fetch(URL + "api/CityNames/DeleteData?id=" + city_id, {
    //             method: "DELETE",
    //             headers: {
    //                 Authorization: "Bearer " + JSON.parse(localStorage.getItem("access_token")).access_token,
    //             },
    //         }).then((response) => {
    //             if (response.status === 200) {
    //                 toast.success("City Name has been Deleted successfully!");
    //                 fetchData();
    //                 clearFields();
    //             }
    //             else {
    //                 (response).json().then((json) => {
    //                     toast.error(json.Message);
    //                 })
    //             }
    //         })
    //     }
    // })
  };

  return (
    <PageTemplate
      pagePermission={rolePermissionTable}
      moduleName="Manage Categories"
      formTitle="Add/Edit Categories"
      formFields={formFields}
      initialValues={initialValues}
      //   DisplayingErrorMessagesSchema={DisplayingErrorMessagesSchema}
      updateMode={updateMode}
      //   formSubmit={formSubmit}
      listing={listingData}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
      fetchData={fetchData}
      //   clearFields={clearFields}
      changeFieldValue={changeFieldValue}
      showButtons={true}
      addFilters={true}
      filterFields={filterFields}
      filterFormSubmit={() => { }}
      clearFilterFields={() => { }}
      isShowSelector={true}
      showFilterButtons={false}
      changeFilterFieldValue={changeFilterFieldValue}
    />
  );
}

export default Categories;
