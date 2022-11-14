import React  , {useState , useEffect}from 'react'
import PageTemplate from "../../Components/PageTemplate"; 
import * as Yup from "yup";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const AddModules = ({pagePermission}) => {
    const accessToken= localStorage.getItem("access_token");
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
      module_id: 0,
      module_name: "", 
      module_icon:""
    });
    
  
    const [formFields, setFormFields] = useState([
      {
        label: "Module Title",
        name: "module_name",
        type: "text",
        placeholder: "Enter Module Title",
        required: true,
        disabled: false,
        hidden: false,
      }, 
      {
        label: "Module Icon",
        name: "module_icon",
        type: "text",
        placeholder: "Enter Module Icon",
        required: true,
        disabled: false,
        hidden: false,
      }, 
    ]);
  
    const DisplayingErrorMessagesSchema = Yup.object().shape({
      module_name: Yup.string().required("Add Module Name First"), 
      module_icon: Yup.string().required("Add Module Icon First"), 
    });

    useEffect(() => {
        fetchData(); 
      }, []);


      const clearFields = () => { 
        
        let arrFields = formFields;
        arrFields.forEach((element) => {
          element.disabled = false;
        });
        
        setInitialValues({
          module_id: 0,
          module_name: "", 
          module_icon:""
        });
        setUpdateMode(false);
      };
    
      const changeFieldValue = (field , value ) => {
        var obj = initialValues;
        if (field === "module_name") {
          obj.module_name = value;
          
        } else if (field === "module_icon") {
            obj.module_icon = value;
          }
        setInitialValues(obj);
      };
    
      const fetchData = () => {
        fetch(URL + "api/Modules", {
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
                heading: "Module Name",
                className: "",
                style: {},
              }, 
              {
                heading: "Module Icon",
                className: "",
                style: {},
              }, 
              {
                heading: "Actions",
                className: "text-right",
                style: {},
              },
            ];
    
            var tbodyData  = [];
            json.map((value, index ) => {
              tbodyData.push([
                {
                  name: "sr_no",
                  value: index + 1,
                  className: "",
                  style: {},
                },
                {
                  name: "module_name",
                  value: value.module_name,
                  className: "",
                  style: {},
                },
                {
                  name: "module_icon",
                  value: value.module_icon,
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
                      clickFunction: deleteModule,
                    },
                  ],
                  className: "text-right",
                  style: {
                    width: "20%",
                  },
                  entity_id: value.module_id,
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
     

     

      const fetchDataForEdit = (module_id ) => {
        setUpdateMode(false) 
        ;
        fetch(URL + "api/Modules/" + module_id, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + JSON.parse(accessToken).access_token,
          },
        })
          .then((response) => response.json())
          .then((json) => {
            console.log(json);
            
            if (json.module_name === null) {
              json.module_name = "";
            }
     
            let arrFields = formFields;
            arrFields.forEach((element ) => {
              element.disabled = false;
            });
         
            let obj = initialValues;
            obj.module_id = json.module_id;
            obj.module_name = json.module_name; 
            obj.module_icon=json.module_icon;
            setFormFields(arrFields);
    
            setInitialValues(obj);
            setUpdateMode(true);
          });
      };
      const formSubmit = (data ) => { 
        fetch(
          URL +
            (updateMode
              ?`/api/Modules?page_name="Manage Modules"`
              : `/api/Modules?page_name="Manage Modules"`),
          {
            method: updateMode ? "PUT" : "POST",
            headers: {
              Authorization: "Bearer " + JSON.parse(accessToken).access_token,
              "Content-Type": "application/json",
            
            },
            body: JSON.stringify({
                module_id:data.module_id,
                module_name: data.module_name,
                module_icon: data.module_icon,
                module_order:0
              }), 
          }
        ).then((response) => {
            console.log("response " , response);
            
          if (response.status === 201 ||response.status === 200 ||response.status ===  204) {
            toast.success(
              "Module has been " +
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
    
      const deleteModule = (module_id ) => {
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
            fetch(URL + `api/Modules/${module_id}?page_name="Manage Modules"`, {
              method: "DELETE",
              headers: {
                Authorization: "Bearer " + JSON.parse(accessToken).access_token,
              },
            }).then((response) => {
              if (response.status === 200) {
                toast.success("City Name has been Deleted successfully!");
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
      moduleName="Add Module"
      formTitle="Add/Edit Modules"
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

export default AddModules