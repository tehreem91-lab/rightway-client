import React  , {useState , useEffect}from 'react'
import PageTemplate from "../../Components/PageTemplate"; 
import * as Yup from "yup";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const AddRole = ({pagePermission}) => {
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
      role_id: 0,
      role_name: "", 
    });
    
  
    const [formFields, setFormFields] = useState([
      {
        label: "Role Title",
        name: "role_name",
        type: "text",
        placeholder: "Enter Role Title",
        required: true,
        disabled: false,
        hidden: false,
      }, 
    ]);
  
    const DisplayingErrorMessagesSchema = Yup.object().shape({
      role_name: Yup.string().required("Add Role Name First"), 
    });

    useEffect(() => {
        fetchData(); 
      }, []);


      const clearFields = () => {
        console.log("clear fileds");
        
        let arrFields = formFields;
        arrFields.forEach((element) => {
          element.disabled = false;
        });
        
        setInitialValues({
          role_id: 0,
          role_name: "", 
        });
        setUpdateMode(false);
      };
    
      const changeFieldValue = (field, value) => {
        var obj = initialValues;
        if (field === "role_name") {
          obj.bank_name = value;
        } 
    
        setInitialValues(obj);
      };
    
      const fetchData = () => {
        fetch(URL + "api/Roles", {
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
                heading: "Role Name",
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
                  name: "role_name",
                  value: value.Name,
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
                  entity_id: value.Id,
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
     
      const fetchDataForEdit = (role_id) => {
        setUpdateMode(false)
        console.log(role_id , "roleId");
        ;
        fetch(URL + "api/Roles/" + role_id, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + JSON.parse(accessToken).access_token,
          },
        })
          .then((response) => response.json())
          .then((json) => {
            console.log(json);
            
            if (json.Name === null) {
              json.Name = "";
            }
     
            let arrFields = formFields;
            arrFields.forEach((element) => {
              element.disabled = false;
            });
         
            let obj = initialValues;
            obj.role_id = json.Id;
            obj.role_name = json.Name; 
            setFormFields(arrFields);
    
            setInitialValues(obj);
            setUpdateMode(true);
          });
      };
      const formSubmit = (data) => {
        // `api/Roles/${currentEditUser.id}?roleName=${currentEditUser.name}'`
        fetch(
          URL +
            (updateMode
              ?`api/Roles/${initialValues.role_id}?roleName=${data.role_name}&page_name="Manage Role"`
              : `api/Roles?InputPageName=${data.role_name}&page_name="Manage Role"`),
          {
            method: updateMode ? "PUT" : "POST",
            headers: {
              Authorization: "Bearer " + JSON.parse(accessToken).access_token,
              "Content-Type": "application/json",
            }, 
          }
        ).then((response) => {
            console.log("response " , response);
            
          if (response.status === 204 ||response.status === 200 ) {
            toast.success(
              "Role has been " +
                (updateMode ? "Updated" : "Added" + " successfully!")
            );
            fetchData();
            clearFields();

          } else {
            response.json().then((json) => {
              toast.error(json.Message);
            });
          }
        });
      };
    
      const deleteBankName = (role_id) => {
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
            fetch(URL + `api/Roles/${role_id}?page_name="Manage Role"`, {
              method: "DELETE",
              headers: {
                Authorization: "Bearer " + JSON.parse(accessToken).access_token,
              },
            }).then((response) => {
              if (response.status === 200) {
                toast.success("Role has been Deleted successfully!");
                clearFields();
                fetchData();
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
 <PageTemplate
      pagePermission={rolePermissionTable}
      moduleName="Add Role"
      formTitle="Add/Edit Role"
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
    </>
  )
}

export default AddRole