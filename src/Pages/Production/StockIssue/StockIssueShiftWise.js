import React,{useState, useEffect, useRef} from 'react';
import CustomInnerHeader from '../../../Components/CustomInnerHeader';
import { useSelector } from "react-redux";
import Select from "react-select";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { toast } from "react-toastify";
import axios from 'axios';
import { endPoint } from '../../../config/Config';
// import Moment from 'react-moment';
import { customStyles } from '../../../Components/reactCustomSelectStyle';
const StockIssueShiftWise = () => {
  const ref = useRef(null);
  const reset = () => {
  ref.current.value = "";
};
    const showNavMenu = useSelector((state) => state.NavState);
    var day = new Date().toLocaleDateString(undefined, { day: "2-digit" })
var month = new Date().toLocaleDateString(undefined, { month: "2-digit" })
var year = new Date().toLocaleDateString(undefined, { year: "numeric" })
var hours = new Date().getHours(undefined, { hours: "2-digit" })
var minuts = new Date().getMinutes(undefined, { minuts: "2-digit" })


 
  //  const  time = today.getHours() + ':' + today.getMinutes() ;
const dateToday = `${year}-${month}-${day}T${hours}:${minuts}`
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = (id) => {setShow1(true)
        setstockissueid(id)
    };
    const [IsValidation, setIsValidation] = useState(true);
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [IsUpload, setIsUpload] = useState(false)
    const [ShiftSelector, setShiftSelector] = useState("");
    const [shiftvalue, setshiftvalue] = useState("")
const [JobOption, setJobOption] = useState([]);
const [jobvalue, setjobvalue] = useState("");
const [isloading, setisloading] = useState(true);
const [stockdata, setstockdata] = useState([]);
const [Jobdata, setJobdata] = useState([]);
const [number, setnumber] = useState("");
const [Stock_issue_date, setStock_issue_date] = useState(dateToday.slice(0,10) );
const [shift_start_date, setShift_start_date] = useState(dateToday );
const [shift_end_date, setshift_end_date] = useState(dateToday );
const [total_hours, setTotalhours] = useState("")
const [aftersubmit, setaftersubmit] = useState(true)
const [updateId, setupdateId] = useState("")
const [updatemode, setupdatemode] = useState(true)
const [fileEntity, setFileEntity] = useState([]);
const [selectedFile, setSelectedFile] = useState("")
const [itemOption, setitemOption] = useState([])
const [stockissueId,setstockissueid] = useState("")
const [field, setfield] = useState(true)

const [formDate, setformDate] = useState(dateToday.slice(0,10) );
const [issueto, setissueto] = useState("")
const [remarks, setRemarks] = useState("")
const [quantity, setquantity] = useState(0)
const [issueOption, setissueOption] = useState([])

const [job_shift_entries, setjob_shift_entries] = useState([{ item_chart_id:0, quantity_credit: 0, credit: 0,average_rate: 0,stock_type:""}])

// All selectors 

const Get_Job_Selector = () =>{
    var axios = require('axios');
    var data = '';
    
    var config = {
      method: 'get',
      url: 'http://rightway-api.genial365.com/api/IssueStock/GetProcessJob',
      headers: {
        Authorization: `bearer ${
          JSON.parse(localStorage.getItem("access_token")).access_token
        }`,
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
       console.log(response.data)
       
      setJobOption(
         response.data.map((item)=>{
            return{
                value:item.job_id,
                label:item.job_number
              
            }

            
         })
      
    )
    
    
    })
    .catch(function (error) {
      console.log(error);
    
    });
    }

    const Get_Shift_Selector = ()=>{
      var axios = require('axios');
      var config = {
        method: 'get',
        url: 'http://rightway-api.genial365.com/api/Shifts/GetData',
        headers: {
          Authorization: `bearer ${
            JSON.parse(localStorage.getItem("access_token")).access_token
          }`,
        },
      };
      
      axios(config)
      .then(function (response) {
      
        setShiftSelector(
           response.data.map((item)=>{
              return{
                  value:item.shift_id,
                  label:item.shift_name
              }
  
              
           })
        
      )
    
      })
      .catch(function (error) {
        console.log(error);
      
      });

    }
    const Issue_To_Selector = ()=>{
      var axios = require('axios');
      var config = {
        method: 'get',
        url: 'http://rightway-api.genial365.com/api/EmployeeDetails/GetActiveEmployee',
        headers: {
          Authorization: `bearer ${
            JSON.parse(localStorage.getItem("access_token")).access_token
          }`,
        },
      };
      
      axios(config)
      .then(function (response) {
      
        setissueOption(
           response.data.map((item)=>{
              return{
                  value:item.value,
                  label:item.label
              }
  
              
           })
        
      )
    
      })
      .catch(function (error) {
        console.log(error);
      
      });

    }

    const GetRequioredItems = (e) =>{
         
      var axios = require('axios');
      var config = {
        method: 'get',
        url: `http://rightway-api.genial365.com/api/IssueStock/GetRequioredItems?job_id=${e.value}`,
        headers: {
          Authorization: `bearer ${
            JSON.parse(localStorage.getItem("access_token")).access_token
          }`,
        },
      };
      
      axios(config)
      .then(function (response) {
      
        // setjob_shift_entries(response.data)
        // job_shift_entries.item_chart_id(response.data.item_chart_id)
        setjob_shift_entries(response.data.map((item)=>{
          return{
            item_chart_id:item.item_chart_id,
            quantity_credit:item.item_quantity,
            credit:0,
            average_rate: 0,
            stock_type:""
          }
    
          
       })
     ) 
 })
      .catch(function (error) {
      
      });


    }
    
   const GetItems = () =>{

    var axios = require('axios');
      var config = {
        method: 'get',
        url: 'http://rightway-api.genial365.com/api/IssueStock/GetItems',
        headers: {
          Authorization: `bearer ${
            JSON.parse(localStorage.getItem("access_token")).access_token
          }`,
        },
      };
      
      axios(config)
      .then(function (response) {
      
        setitemOption(
           response.data.map((item)=>{
              return{
                  value:item.stock_account.item_chart_id,
                  label:item.stock_account.item_name
              }
  
              
           }))
           console.log(itemOption)
   
      })
      .catch(function (error) {
      
      });

   }
    // Extract All Data 
    const Get_Job_data =(e)=>{
        var axios = require('axios');
        var data = '';
        
        var config = {
          method: 'get',
          url: `http://rightway-api.genial365.com/api/IssueStock/GetProcessJobById?process_job_id=${e.value}`,
          headers: {
            Authorization: `bearer ${
              JSON.parse(localStorage.getItem("access_token")).access_token
            }`,
          },
          data : data
        };
        
        axios(config)
        .then(function (response) {
          setJobdata([response.data])
          setisloading(false)
          
        })
        .catch(function (error) {
          console.log(error);
        });
        
            }
        
            const Shift_Number = ()=> {
         var axios = require('axios');
        var data = '';
        
        var config = {
          method: 'get',
          url: 'http://rightway-api.genial365.com/api/IssueStock/GetShiftNumber',
          headers: {
            Authorization: `bearer ${
              JSON.parse(localStorage.getItem("access_token")).access_token
            }`,
          },
          data : data
        };
        
        axios(config)
        .then(function (response) {
          setnumber(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
            }

            const Stock_Data = (e)=>
             {
              var axios = require('axios');
              var data = '';
              
              var config = {
                method: 'get',
                url:(aftersubmit ? `http://rightway-api.genial365.com/api/IssueStock/GetJobStockIssueDetails?job_id=${e.value}`:
                `http://rightway-api.genial365.com/api/IssueStock/GetJobStockIssueDetails?job_id=${jobvalue.value}`),
                headers: {
                  Authorization: `bearer ${
                    JSON.parse(localStorage.getItem("access_token")).access_token
                  }`,
                },
                data : data
              };
              
              axios(config)
              .then(function (response) {
                console.log(JSON.stringify(response.data));
               setstockdata(response.data.job_stock_shift_entries)
             
              })
              
              .catch(function (error) {
                console.log(error);
              });
              
             } 


            //  Submit Both form Recordes

            const Create = (id) =>{
                var axios = require('axios');
                if(shiftvalue === "" || total_hours === ""  )
                {setIsValidation(false)}
                else{
                var data = JSON.stringify({
                  "shift_id":shiftvalue.value,
                  "stock_issue_date":Stock_issue_date,
                  "shift_start_date":shift_start_date ,
                  "shift_close_date": shift_end_date,
                  "total_hour": total_hours
                });
                
                var config = {
                  method: updatemode ?"post": "put",
                  url:(updatemode ? `http://rightway-api.genial365.com/api/IssueStock/PostShift?job_id=${jobvalue.value}`:
                  `http://rightway-api.genial365.com/api/IssueStock/PutShift?job_stock_shift_issues_id=${id}`
                  ),
                  headers: {
                    Authorization: `bearer ${
                      JSON.parse(localStorage.getItem("access_token")).access_token
                    }`,
                    'Content-Type': 'application/json'
                  },
                  data : data
                };
              }
                axios(config)
                .then(function (response) {
                  console.log(JSON.stringify(response.data));
                  Stock_Data(jobvalue)
                 
                  setshiftvalue("")
                  setTotalhours("")
                  toast.success("Your response has been" + (updatemode ? "Added" : "Updated")  )
                  setIsValidation(true)
                  handleClose()
                  
                
                
                })
                .catch(function (error) {
                  console.log(error);
                });
                
                
                    }
            
          
            //  Delete Record

            const Delete = (id)=>
            {
              var axios = require('axios');
         var data = '';

         var config = {
         method: 'delete',
         url: `http://rightway-api.genial365.com/api/IssueStock/DeleteShift?job_stock_shift_issues_id=${id}`,
         headers: {
          Authorization: `bearer ${
            JSON.parse(localStorage.getItem("access_token")).access_token
          }`,
        },
       data : data
           };

              axios(config)
            .then(function (response) {
           Stock_Data(jobvalue)
           setaftersubmit(false)
           toast.success(response.data)
          
             })
                  .catch(function (error) {
                     console.log(error);
                    });

            }

            // fetch data for edit
            const Fetch_data_id  = (id)=>{
              var axios = require('axios');
              var data = '';
              
              var config = {
                method: 'get',
                url: `http://rightway-api.genial365.com/api/IssueStock/GetShiftById?job_stock_shift_issues_id=${id}`,
                headers: {
                  Authorization: `bearer ${
                    JSON.parse(localStorage.getItem("access_token")).access_token
                  }`,
                },
                data : data
              };
              
              axios(config)
              .then(function (response) {
                console.log(JSON.stringify(response.data));
                setShift_start_date(response.data.shift_start_date)
                setshift_end_date(response.data.shift_close_date)
                setStock_issue_date(response.data.stock_issue_date.slice(0,10))
                setnumber(response.data.shift_number)
                setTotalhours(response.data.shift_hour)
                const Shift ={

                  label: response.data.shift_info.shift_name,
                  value: response.data.shift_info.shift_id,
                }
                setshiftvalue(Shift)
                setupdateId(response.data.job_stock_shift_issues_id)

              }
             
              )
              .catch(function (error) {
                console.log(error);
              });
              
            }
// Post Issue Stock
 const POST_ISSUE_STOCK =(id) =>{
var axios = require('axios');
if(issueto === ""  )
  {
    setIsValidation(false)
  }
  else{
var data = JSON.stringify({
  "date": formDate,
  "issue_to": issueto.value,
  "remarks": remarks,
  "attachments": fileEntity.join(",").toString(),
  "quantity":quantity ,
  "job_shift_entries":job_shift_entries 
});
var config = {
  method: 'POST',
  url: `http://rightway-api.genial365.com/api/IssueStock/PostStockIssue?job_id=${jobvalue.value}&job_stock_shift_issues_entries_id=${id}`,
  headers: {
    Authorization: `bearer ${
      JSON.parse(localStorage.getItem("access_token")).access_token
    }`,
    'Content-Type': 'application/json'
  },
  data : data
};
}

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
    console.log(data)
   setissueto("")
   setRemarks("")
  setFileEntity([])
  setquantity(0)

  setjob_shift_entries([{
    item_chart_id:0, quantity_credit: 0, credit: 0,average_rate: 0,stock_type:""
  }])
  setIsValidation(true)
})
.catch(function (error) {
  console.log(error);
  console.log(data)
});

            }
               
            let removeFormFields = (i) => {
              let newFormValues = [...job_shift_entries];
      
               // at position i remove 1 element 
              newFormValues.splice(i, 1);
             setjob_shift_entries(newFormValues)
          }

          const AttachmentFileHandler = (event) => {
            setSelectedFile(event.target.files[0]);
            setIsUpload(false)
          };
          const UploadFile = async (e) => {
          setIsUpload(true)
            const options = {
                onUploadProgerss: (progressEvent) => {
                    const { loaded, total } = progressEvent;
                    let percentage = Math.floor((loaded * 100) / total)
                    console.log(`${loaded}bytes of ${total}bytes | ${percentage}%`);
                }
            }
            let data = new FormData();
            data.append("UploadedImage", selectedFile);
            await axios.post(`${endPoint}/api/FileUpload?file_name=${selectedFile.name}`, data, options).then(res => {
                setFileEntity([...fileEntity, res.data])
                if (res.status === 200) {
                    setIsUpload(false)
                    reset()
                }
            })
        }
        let removeAttchments = (i) => {
          let newAttachValues = [...fileEntity];
          // at position i remove 1 element
          newAttachValues.splice(i, 1); 
          setFileEntity(newAttachValues)
      }
      let handleChange = (i, e) => {
        const {name, value } = e.target;
        const list = [...job_shift_entries];
        list[i][name] = value;
        setjob_shift_entries(list);
          }
useEffect(() => {
 
    Get_Job_Selector()
     Get_Shift_Selector()
    Shift_Number()
    Issue_To_Selector()
  
    GetItems()
 }, []);
 
    return (
        <>
        <div
        className={`container-fluid page-title-bar ${showNavMenu === false ? "right_col-margin-remove" : ""
            }   `}
    >
    <CustomInnerHeader moduleName="Stock Issue Shift Wise" isShowSelector={true} />
       </div>

      <div className={`right_col  h-10 heightFixForFAult  ${showNavMenu === false ? "right_col-margin-remove" : " "
           } `}
       role="main"
   >
   <div className="row">
   <div className="col-md-12 ">
   <div className="x_panel px-0">
    <div className="x_content  p-2 ">
    <span className="section">
        {/*1st row*/}
    <div className="row px-2  ">
        <div className="col-8 ">
        <i className="fa fa-filter pl-2"></i>&nbsp;Stock Issue Shift Wise Report
        </div>
    </div>
    </span>
     {/*2nd row*/}
     <div className="row px-2">
     <div className='field item form-group col-md-6 p-2'>
     <label className="col-form-label col-md-3 col-sm-36 label-align">
     {" "}
     Select Job: <span className="required">*</span>
     </label>
   
     <div className="col-md-8 col-sm-8">
    <Select
     isSearchable={true}
     options={JobOption}
     onChange={(e)=>{
       
        setjobvalue(e)  
        Get_Job_data(e); 
        Stock_Data(e) ; 
        GetRequioredItems(e)
    
    }}
     />
    </div>
    
    </div>
    
     <div className='col-md-5'>
     {!isloading && (
        <>
       
    
     
          {Jobdata.map((item)=>{
            return(
          <>
          <div className="col-md-10 ">
          <div className='row bg-customBlue text-white bottom-border-1  '>
          <div className="col-md-12 font-size-12   my-2 text-center ">Proccess Job Details</div> 
          </div>
          <div className='row  text-dark  bottom-border-1 ' style={{ backgroundColor: "#f7ab8b" }}   >
          <div className="col-md-6  font-size-12 p-2  right-border-1 " > Job starting Date </div> 
          <div className='col-md-6 font-size-12    text-right '>
          {`${item.job_starting_date.slice(
            8,
            10
          )}-${item.job_starting_date.slice(
            5,
            7
          )}-${item.job_starting_date.slice(0, 4)}`}
          
          </div>
          </div>
          <div className='row  text-dark  bottom-border-1 ' style={{ backgroundColor: "#f7ab8b" }}>
          <div className="col-md-6 font-size-12  p-2  right-border-1">Job Ending Date</div> 
          <div className='col-md-6 font-size-12   my-2 text-right'>
          {`${item.job_ending_date.slice(
            8,
            10
          )}-${item.job_ending_date.slice(
            5,
            7
          )}-${item.job_ending_date.slice(0, 4)}`}
          
          </div>
          </div>
          <div className='row  text-dark  bottom-border-1 ' style={{ backgroundColor: "#f7ab8b" }}>
          <div className="col-md-6 font-size-12  p-2 right-border-1 ">Job Customer Name</div> 
          <div className='col-md-6 font-size-12   my-2 text-right'>{item.account_name}</div>
          </div>
          <div className='row  text-dark  bottom-border-1 ' style={{ backgroundColor: "#f7ab8b" }}>
          <div className="col-md-6 font-size-12 p-2 right-border-1 ">Product Name</div> 
          <div className='col-md-6 font-size-12   my-2 text-right'>{item.product_name}</div>
          </div>
          <div className='row  text-dark  bottom-border-1 ' style={{ backgroundColor: "#f7ab8b" }}>
          <div className="col-md-6 font-size-12 p-2 right-border-1 ">Incharge Name</div> 
          <div className='col-md-6 font-size-12   my-2 text-right'>{item.incharge_name}</div>
          </div>
          <div className='row  text-dark  bottom-border-1 ' style={{ backgroundColor: "#f7ab8b" }}>
          <div className="col-md-6 font-size-12  p-2 right-border-1 ">Stock Unit</div> 
          <div className='col-md-6 font-size-12   my-2 text-right'>{item.stock_unit}</div>
          </div>
          <div className='row  text-dark' style={{ backgroundColor: "#f7ab8b" }}>
          <div className="col-md-6 font-size-12   p-2  right-border-1 ">Job Status</div> 
          <div className='col-md-6 font-size-12   my-2  text-right'>{item.job_status}</div>
          </div>
          
         
         
          
          </div>
              
              </>
            )
          })}
         
         
          
        
        
        </>
     ) }
</div>
     </div>
 </div>
  </div>
    </div>
    </div>


   
    {!isloading && (
      <>
      <div className="x_panel  ">
      <div className="x_content">
      <span className="section pl-3">
      <div className="row   pt-3">
       <div className="col-3">
      <i className='fa fa-list'></i>&nbsp;Listing
      </div>
     <div className="col-9 text-right ">
      </div>
      </div>
      
  </span>
  <div className="table-responsive px-3 pb-2">
  <table className="table table-striped jambo_table bulk_action">
      <thead>
          <tr className="headings">
              <th className="column-title  right-border-1 text-center">Shift Start Date </th>
              <th className="column-title  right-border-1 text-center">Shift Start Time </th>
              <th className="column-title  right-border-1 text-center">Shift End Date </th>
              <th className="column-title  right-border-1 text-center">Shift End Time </th>
              <th className="column-title  right-border-1 text-center">Shift Number  </th>
              <th className="column-title  right-border-1 text-center">Shift Name</th>
              <th className="column-title  right-border-1 text-center">Shift hour </th>
              <th className="column-title  right-border-1 text-center">Stock Issue date </th>
              <th className="column-title  right-border-1 text-center">Status</th>
              <th className="column-title  right-border-1 text-center">Issue Stock</th>
              <th className="column-title  right-border-1 text-center">Action</th>
             
          </tr>
      </thead>
      <tbody>
     {stockdata.map((item)=>{
         return(
             
             <tr>
             <td className='a-right a-right     text-center'>
             {`${item.shift_close_date.slice(
              8,
              10
            )}-${item.shift_close_date.slice(
              5,
              7
            )}-${item.shift_close_date.slice(0, 4)}`}
             </td>
             <td className='a-right a-right  text-center'> {item.shift_start_date.slice(11)}</td>

             <td className='a-right a-right  text-center'>
             {`${item.shift_close_date.slice(
              8,
              10
            )}-${item.shift_close_date.slice(
              5,
              7
            )}-${item.shift_close_date.slice(0, 4)}`}
             
             </td>
             <td className='a-right a-right     text-center'>{item.shift_close_date.slice(11)}</td>
             <td className='a-right a-right     text-center'>{item.shift_number}</td>
             <td  className='a-right a-right    text-center' >{item.shift_name}</td>
             <td className='a-right a-right     text-center'>{item.shift_hour}</td>
             <td className='a-right a-right     text-center'>
             {`${item.stock_issue_date.slice(
              8,
              10
            )}-${item.stock_issue_date.slice(
              5,
              7
            )}-${item.stock_issue_date.slice(0, 4)}`}
             
             </td>
             <td className='a-right a-right     text-center'>{item.status}</td>
             <td className='a-right a-right     text-center'>
             <button
             className="btn btn-primary"
             type="submit"
             onClick={() => {handleShow1 (item.job_issue_shift_id)
            }}
         >
             Issue stock
         </button>
         
             
             </td>
             <td className="a-right a-right text-center" >
             <i className="fa fa-edit pl-3" onClick={()=>{
            setupdatemode(false)
            Fetch_data_id(item.job_issue_shift_id)
            handleShow()
            
            }} ></i>
             <i className="fa fa-trash-o pl-3"
             onClick ={()=>Delete(item.job_issue_shift_id)}
             ></i>
         </td>
             </tr>
             


         )
     })

     }
     
       


      </tbody>
  </table>
  <div className="row ">
       <div className="col-3">
       <button
          className="btn btn-primary"
          type="submit"
          onClick={()=>{
            setupdatemode(true)
            handleShow()
           
           
          }
           }
      >
      Create Shift
      </button>
      </div>
     <div className="col-9 text-right ">
      </div>
      </div>

</div>
</div>
</div>
      
      </>
         ) }
       
       
       
        <Modal 
        show={show} 
        onHide={handleClose}
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg "
      
        >
        <Modal.Header >
       <Modal.Title>Creating Shift</Modal.Title>
        <i class="fa fa-times pt-2 text-dark font-size-18" style={{fontSize: 14,}} aria-hidden="true" onClick={handleClose} ></i>
      </Modal.Header>
      <Modal.Body>
      <Form>
      <div className="row">
      <div className = "col-md-6">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Shift Number</Form.Label>
            <Form.Control
              type="text"
              value ={number}
              readOnly
              autoFocus
            />
          </Form.Group>
          </div>
          <div className = "col-md-6">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Select Shift</Form.Label>
            <Select
            isSearchable={true}
            options={ShiftSelector}
            value={shiftvalue}
            onChange={(e)=>setshiftvalue(e)}
           />
           {!IsValidation && (shiftvalue === "" ) && <span className="text-danger">First Select this </span>} 
          </Form.Group>
          </div>
          </div>
          <div className="row">
          <div className = "col-md-6">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Shift Start date</Form.Label>
          <Form.Control
            type="datetime-local"
            autoFocus
            value={shift_start_date}
              onChange={(e)=>{
                
                setShift_start_date(e.target.value)
                
           
  function diff_hours(dt2, dt1) 
 {

  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= (60 * 60);
  return Math.abs(Math.round(diff));
  
 }
 let dt1 = new Date (shift_start_date.slice(0,10)); 
 let dt2 = new Date (shift_end_date.slice(0,10));     

 let hours = diff_hours(dt1, dt2)
                  //  let dt1 = new Date (shift_start_date.slice(0,10)); 
                  //  let dt2 = new Date (shift_end_date.slice(0,10));
                  //  let hours = Math.abs(dt2 - dt1) / 36e5;
                  //  console.log(hours);
                   setTotalhours(hours)
                
               
              }}
          />
          {!IsValidation && (shift_start_date > shift_end_date ) && <span className="text-danger"  >Start time should be less then End time  </span>} 
        </Form.Group>
          
          </div>
          <div className = "col-md-6">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Shift End date</Form.Label>
          <Form.Control
            type="datetime-local"
            autoFocus
            value={shift_end_date }
              onChange={(e)=>
                {
                  
                  setshift_end_date(e.target.value)
                  function diff_hours(dt2, dt1) 
                  {
                 
                   var diff =(dt2.getTime() - dt1.getTime()) / 1000;
                   diff /= (60 * 60);
                   return Math.abs(Math.round(diff));
                   
                  }
                  let dt1 = new Date (shift_start_date); 
                  let dt2 = new Date (shift_end_date);     
                 
                  let hours = diff_hours(dt1, dt2)
                  setTotalhours(hours)

                  // let dt1 = new Date (shift_start_date.slice(0,10)); 
                  //  let dt2 = new Date (shift_end_date.slice(0,10));
                  //  let hours = Math.abs(dt2 - dt1) / 36e5;
                  //  console.log(hours);
                 
                }
               
              
              
              }
          />
          {!IsValidation && (shift_start_date === shift_end_date  ) && <span className="text-danger"  >End time should be greater then Start time  </span>} 
        </Form.Group>
           </div>
           </div>
           <div className='col-md-6 '>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>stock issue date:</Form.Label>
            <Form.Control
              type="date"
              autoFocus
              value={Stock_issue_date}
              onChange={(e)=>setStock_issue_date(e.target.value)}
            />
          </Form.Group>
          </div>
          <div className='col-md-6'>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Total hours</Form.Label>
            <input
             type="number"
             min="0"
             className='form-control'
             value={total_hours}  
             onChange={(e)=>setTotalhours(e.target.value)}         
           />
          </Form.Group>
          </div>

          
        </Form>
      
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {updatemode?   <Button variant="primary" onClick={(e)=>
         { 
          Create(e)}}>
        Submit
      </Button>:  
      <Button variant="primary" onClick={()=>{
        Create(updateId)}
      }>
      Update
    </Button> }
      
      </Modal.Footer>
    </Modal>
{/*Post issue Stock*/}
    <Modal 
    show={show1} 
    onHide={handleClose1}
    size="lg"
    aria-labelledby="example-modal-sizes-title-lg "
    >
        <Modal.Header >
          <Modal.Title>Issue Stock</Modal.Title>
          <i class="fa fa-times pt-2 text-dark font-size-18" aria-hidden="true" style={{fontSize: 14,}} onClick={handleClose1} ></i>
        </Modal.Header>
        <Modal.Body>
        <Form>
        <div className="row">
        <div className="col-md-6">
        <Form.Group 
        controlId="exampleForm.ControlInput1"
        >
            <Form.Label>Select Date</Form.Label>
            <Form.Control
            type="date"
            autoFocus
            value={formDate}
            onChange={(e)=>setformDate(e.target.value)}
          />
          </Form.Group>
            </div>
            <div className="col-md-6">
            <Form.Group
              controlId="exampleForm.ControlTextarea1"
            >
            <Form.Label>Issue To:</Form.Label>
            <Select
            isSearchable={true}
            options={issueOption}
            value={issueto}
              onChange={(e)=>{setissueto(e)}}
           />
           {!IsValidation && (issueto.label === "" ) && <span className="text-danger">First Select this </span>} 
            </Form.Group>
            </div>
            </div>
            <div className="row">
            <div className="col-md-6">
           <Form.Group  controlId="exampleForm.ControlInput1">
            <Form.Label className='mt-1' >Quantity:</Form.Label>
            <Form.Control
              type="number"
              min="0"
              name="quantity"
              value={quantity}
              onChange={(e)=>setquantity(e.target.value)}
            />
            {!IsValidation && (quantity === "") && <span className="text-danger">First Select this </span>} 
          </Form.Group>
            </div>
            <div className="col-md-4">
            <Form.Group
            
              controlId="exampleForm.ControlInput1"
        >
            <Form.Label  className='mt-1' >Select Attachments:</Form.Label>
            <Form.Control
              type="file"
              ref={ref}
              onChange={(e) => {
                AttachmentFileHandler(e)
              }}
            />
          </Form.Group>
            </div>
            <div className="col-md-2 mt-2">
            <Form.Group
            
              controlId="exampleForm.ControlInput1"
        >
        {
          IsUpload ? <div className="spinner-border my-2 text-customOrange my-4" role="status">
              <span className="sr-only">Loading...</span>
          </div> : <button
              disabled={ref?.current?.value === "" ? true : false}
              className="btn btn-sm btn-outline-success my-4" onClick={() => UploadFile()} type="button"><i className="fa fa-upload"></i></button>
      }
          </Form.Group>
            </div>
           
            </div>
            <div className="row">
            <div className="col-md-6">
            <Form.Group
              controlId="exampleForm.ControlTextarea1"
            >
            <Form.Label>Remarks:</Form.Label>
            <textarea
            className="form-control"
            value={remarks}
            onChange={(e)=>setRemarks(e.target.value)}
            />
            </Form.Group>
            </div>
            {fileEntity.length !== 0 && 
              <div className="field item form-group col-md-6 col-sm-6 mt-2">
            <label className="col-form-label col-md-3 col-sm-3 label-align">Attachments</label>
            <div className="col-md-8 col-sm-8 ">
             {fileEntity.map((each_file, index) => {
                    return <button className="btn btn-sm  bg-info  text-light"
                    >
                    <a href={`${endPoint + each_file}`} target="_blank" rel="noopener noreferrer" className='text-light'>
                    {((each_file.split("_"))[0]).slice(15)} {index + 1}</a>
                <i className="fa fa-times   text-light ml-1 " aria-hidden="true"
                    onClick={()=>removeAttchments(index)}
                ></i>
                    </button>
                })
        
              }
            
            </div>
        </div>}
        </div>
            <div className="col-md-12 mt-3">
            <table className="table table-striped jambo_table bulk_action ">
                  <thead >
                    <tr className="headings">
                      <th className="column-title   text-center" width="18%">Item</th>
                      <th className="column-title   text-center" width="15%">Quantity</th>
                      <th className="column-title   text-center" width="16%">Amount</th>
                      <th className="column-title   text-center" width="13%">Average Rate</th>
                      <th className="column-title   text-center" width="18%">Stock Type</th>
                      <th className="column-title   text-center" width="2%">&nbsp;</th>
                    </tr>
                  </thead>

                  <tbody>
                  {job_shift_entries.map((element,index)=>{
                    return(
                      <>
                      <tr>
                  <td>
                  <Select
                    isSearchable={true}
                    styles={customStyles}
                    options={itemOption}
                    value={itemOption.find(e => e.value === job_shift_entries[index].item_chart_id) || ''}
                   onChange={((e) => {

                                            const list = [...job_shift_entries];
                                            list[index].item_chart_id = e.value;
                                            setjob_shift_entries(list);
                                        })

                                        }
                         />
                         {!IsValidation && (job_shift_entries[index].item_chart_id === "" ) && <span className="text-danger">First Select this </span>} 
                  </td>
                  <td>
                  <input
                    type='number'
                    min="0"
                    className="form-control"
                    name='quantity_credit'
                    value={element.quantity_credit}
                    onChange={e => handleChange(index, e)}

                   />
                   {!IsValidation && (element.quantity_credit === "" ) && <span className="text-danger">First Select this </span>} 
                  </td>
                  <td>
                  <input
                  type='number'
                  min="0"
                   className="form-control"
                   name='credit'
                   value={element.credit}
                   onChange={e => handleChange(index, e)}
                  />
                  {!IsValidation && (element.credit === "" ) && <span className="text-danger">First Select this </span>} 
                  </td>
                  <td>
                  <input
                  type='number'
                  min="0"
                   className="form-control"
                   name='average_rate'
                   value={element.average_rate}
                   onChange={e => handleChange(index, e)}
                   />
                   {!IsValidation && (element.average_rate === "" ) && <span className="text-danger">First Select this </span>} 
                  </td>
                  <td className='text-center'>
                  <tr>
                  <input type="radio" 
                  name ={index}
                  // name="stocktype" 
                  value = "Purchase"
                    onChange={e => handleChange(index, e)}
                 
                    />  Purchase 
                    <input type="radio" 
                    name ={index}
                    // name="stocktype" 
                    value = " CMT"
                    onChange={e => handleChange(index, e)}/>  CMT
                    </tr>
                  </td>
                  <td>
                  <i class="fa fa-times pt-2 text-danger font-size-18" aria-hidden="true" onClick={()=>removeFormFields(index)}  ></i>
                  </td>
                  
                  </tr>
                      </>
                    )
                  })}
                 
                  </tbody>
                  </table>
                  </div>
                  <div className="col-md-12">
                  <button className='btn  ms-4 text-white text-right' style={{backgroundColor:"#f79c74"}} onClick={(e)=> {setjob_shift_entries([...job_shift_entries, {
                    item_chart_id:0, quantity_credit: 0, credit: 0,average_rate: 0,stock_type:""

                  }])
                  e.preventDefault()
                }}> Add more </button>
                  </div>
                  </Form>

          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{POST_ISSUE_STOCK(stockissueId)
          setIsValidation(true)
          }}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

   
        
    </div>
    </>

    );
}

export default StockIssueShiftWise;
