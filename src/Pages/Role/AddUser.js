import PageTemplate from "../../Components/PageTemplate";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import Select from 'react-select'
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";

const customStyles = {
  control: (provided, state, base) => ({
      ...provided,
      border: '1px solid #c2cad8',
      borderRadius: "5px",
      minHeight: '30px',
      height: '30px',
      color: '#555',
      ...base, boxShadow: 'none'
  }),
  option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "#f79c74" : "#555",
      background: '#fff',
  }),
  valueContainer: (provided, state) => ({
      ...provided,
      height: '30px',
      padding: '0 6px',
  }),

  input: (provided, state) => ({
      ...provided,
      margin: '0px',
      color: "#555"
  }),
  indicatorSeparator: state => ({
      display: 'none',
  }),
  indicatorsContainer: (provided, state) => ({
      ...provided,
      height: '30px',
  }),

}





const AddUser = ({ pagePermission }) => {
  const accessToken = localStorage.getItem("access_token");
 
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
    user_id: 0,
    user_name: "",
    user_email: "",
    user_password: "",
    user_role: "",
    user_role_id: 0,
    user_role_name: "",
  });
const [roleOptions, setRoleOptions] = useState([])
const [roleValue , setRoleValue] = useState({label:"" , value:""})

  //   Edit Model
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setRoleValue({label:"" , value:""})
    setShow(false)};
  const handleShow = () => setShow(true);



  const [formFields, setFormFields] = useState([
    {
      label: "User Name",
      name: "user_name",
      type: "text",
      placeholder: "Enter Role Name",
      required: true,
      disabled: false,
      hidden: false,
    },
    {
      label: "Email",
      name: "user_email",
      type: "text",
      placeholder: "Enter Email",
      required: true,
      disabled: false,
      hidden: false,
    },
    {
      label: "Password",
      name: "user_password",
      type: "text",
      placeholder: "Enter Password (8 characters strong Password)",
      required: true,
      disabled: false,
      hidden: false,
    },
    {
      label: "Select Role",
      name: "user_role",
      type: "select",
      placeholder: "",
      required: true,
      disabled: false,
      hidden: false,
    },
  ]);

  const DisplayingErrorMessagesSchema = Yup.object().shape({
    user_name: Yup.string().required("Enter User Name First"),
    user_email: Yup.string().required("Enter Email First"),
    user_password: Yup.string().required("Choose Password First"),
    user_role: Yup.string().required("Select Role First"),
  });

  useEffect(() => {
    fetchCityNames();
    fetchData();
  }, []);

  const clearFields = () => {
    let arrFields = formFields;
    arrFields.forEach((element) => {
      element.disabled = false;
    });
    arrFields[1].defaultValue = { label: "--- Select City ---", value: "" };
    setInitialValues({
      user_id: 0,
      user_name: "",
      user_email: "",
      user_password: "",
      user_role: "",
      user_role_id: 0,
      user_role_name: "",
    });
    setUpdateMode(false);
  };



  const changeFieldValue = (field, value) => {
    var obj = initialValues;
    if (field === "user_name") {
      obj.bank_name = value;
    } else if (field === "user_email") {
      obj.branch_city = value;
    } else if (field === "user_password") {
      obj.branch_city = value;
    } else if (field === "user_role") {
      obj.branch_city = value;
    }

    setInitialValues(obj);
  };

  const fetchData = () => {
    fetch(URL + "api/Users", {
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
            heading: "User Name",
            className: "",
            style: {},
          },
          {
            heading: "Email",
            className: "",
            style: {},
          },
          {
            heading: "Role",
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
              name: "user_name",
              value: value.userName,
              className: "",
              style: {},
            },
            {
              name: "user_email",
              value: value.email,
              className: "",
              style: {},
            },
            {
              name: "user_role",
              value: value.roleName,
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
  const fetchCityNames =async () => {
  await   fetch(URL + "api/Roles", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + JSON.parse(accessToken).access_token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        var arr = [];
        arr.push({ label: "--- Select Role ---", value: "" });
        json.map((item) => {
          arr.push({ label: item.Name, value: item.Id });
        });

        var arrFields = formFields;
        arrFields[3].defaultValue = arr[0];
        arrFields[3].options = arr;
        setFormFields(arrFields); 
        setRoleOptions( arr.slice(1)) 
      });
  };
  //     .then((json) => {
  //       var arr = [];
  //       // arr.push({ label: "--- Select Role ---", value: "" });
  //       json.map((item) => {
  //         arr.push({ label: item.Name, value: item.Id });
  //       }); 
  //     setRoleOptions(arr)
  //     });
  // };
  const fetchDataForEdit = (UserId) => { 
    setUpdateMode(false);  
    fetch(URL + "api/UserRoles/" + UserId, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + JSON.parse(accessToken).access_token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
const roleId = json[0].RoleId;
        const fetchingRoleLabel= formFields[3].options.filter((EachRoleValue)=>{
            return EachRoleValue.value===roleId
        })
        setRoleValue(fetchingRoleLabel[0])
        console.log(fetchingRoleLabel , "----------");

});


    handleShow()
  };
  const formSubmit = (data) => {
    fetch(
      URL +
      (updateMode
        ? "api/BankNames/PutData?id=" + initialValues.bank_id
        : "api/Users"),
      {
        method: updateMode ? "PUT" : "POST",
        headers: {
          Authorization: "Bearer " + JSON.parse(accessToken).access_token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: data.user_name,
          password: data.user_password,
          email: data.user_email,
        }),
      }
    ).then((response) => {
      response.json().then((json) => {
        console.log(json.Id);

        // calling another api to set role against this user id
        const requestOptionsForRole = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            UserId: json.Id,
            RoleId: data.user_role,
          }),
        };
        fetch(URL + "/api/UserRoles", requestOptionsForRole)
          .then((response) => {
            if (response.status === 200) {
              toast.success(
                "User has been " +
                (updateMode ? "Updated" : "Added" + " successfully!")
              );
              clearFields();
              fetchCityNames();
              fetchData();
            } else {
              toast.error(json.Message);
            }
            response.json();
          })

          .catch((err) => {
            console.log("err", err);
          });
      });
      //   }
    });
  };

  const deleteBankName = (bank_id) => {
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
        fetch(URL + "api/BankNames/DeleteData?id=" + bank_id, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + JSON.parse(accessToken).access_token,
          },
        }).then((response) => {
          if (response.status === 200) {
            toast.success("City Name has been Deleted successfully!");
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
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Update User Role</Modal.Title>
          <i onClick={handleClose} className="fa fa-close"></i>
        </Modal.Header>
        <Modal.Body>
          <div className="field item form-group">
            <label className="col-form-label col-md-4 col-sm-4  label-align">
              Type Role Name<span className="required">*</span>
            </label>
            <div className="col-md-8 col-sm-8">



              <Select 
                className="basic-single"
                classNamePrefix="select"
                 value={roleValue}
                onChange={(e) => {
                 setRoleValue(e)
                }
                }
                options={roleOptions}

                isSearchable={true}
                name="color"
                styles={customStyles}
              />

                

            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            className="btn-sm px-3 ModalButtonPositionAdjectment"
            onClick={() => {
              console.log("update");
            }}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>


      <PageTemplate
        pagePermission={rolePermissionTable}
        moduleName="Manage User"
        formTitle="Add/Edit User Name"
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
      /></>
  );
};

export default AddUser;
