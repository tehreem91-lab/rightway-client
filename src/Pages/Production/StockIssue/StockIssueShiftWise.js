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
const dateToday = `${year}-${month}-${day}`

const [date, setDate] = useState(dateToday );
 
   
    const [IsValidation, setIsValidation] = useState(true);
  const [Item_name, setItem_name] = useState("");
  const [stockUnit, setstockUnit] = useState("");
  const [quantity, setquantity] = useState(1);
  const [remarks, setremarks] = useState("");
  const [weightPrice, setweightPrice] = useState("");

  const [totalweight, settotalweight] = useState("");
 
    const [ShiftSelector, setShiftSelector] = useState("");
    const [shiftvalue, setshiftvalue] = useState("")

const [isloading, setisloading] = useState(false);
const [stockissuedata, setstockissuedata] = useState([]);
const [selectItem, setselectItem] = useState([]);

const [stockEntries, setstockEntries] = useState([{
  item_id:0,
   stock_unit_name: "",
    product_quantity: 0,
    remarks: "",
    weight_per_piece:0,
     tatal_weight: 0
}])

const [fileEntity, setFileEntity] = useState([]);
const [selectedFile, setSelectedFile] = useState("")
const [isLoader, setisLoader] = useState(true)



// All selectors 



    const Get_Shift_Selector = ()=>{
      var axios = require('axios');
      var config = {
        method: 'get',
        url: 'http://rightway-api.genial365.com/api/IssueStock/GetShiftSelectorOptions',
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
   
      const Get_Stock_Issue = (e) =>
      {
        var axios = require('axios');
       var data = '';
            setisLoader(false)
      var config = {
       method: 'get',
       url: `http://rightway-api.genial365.com/api/IssueStock/GetIssueStockRecord?date=${date}&shift_id=${e}
       
       `,
      headers: { 
    'Authorization': 'Bearer  2hHBT_I2CLG9nOBZgcwJzNQzUQsvTKqWOle1WXo-QP8_2BTDFZ-Xxw_ZpMOgVWGkiv2o9mXC4yB_hfp3Hy2eHWEVDhk5mU95kggJAJy_b5AClU_UAYFgAg0c5GNAueD4YKJNjU6J42hAai8iEG345JcCPDA-qY5v4zFQlrxxmZJy5yp_-J5Dh0KUNnTrW3FVM8GCylwFwlPF1M-L4jYW8O82r8kinVyE-SnQlfWlwwvGNcfmr0kz_arhP0smGrgnC_OTioYyIWA4nQYFT2eBidlCOVKlfkYxEPJqBsYtGaM5dLTnBB_zmmAyYNa-7UGk1RGw9x_UIJfl0PhXvudxKf4SM88fnrlbvIQ1nreh2CxbZnot-Qqmf0Uit_tEI-x3HKMZrPoF_asaS60PgTbmxW8E5KfNrttzFPw_-3N35x1P_Yb2NuhmGTMl-ZefiTbpyhrCgISLIO5-S4EwlistuqbKbucuWrdHk16oPs6N0XOTS7BqRUeVuRotvPuSOhy28VxL1_CPnoDV8Cp0Jtzzew'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));

  setstockissuedata([response.data])
  setisLoader(true)
  setstockEntries(response.data[0].stock_entries)
  setItem_name(response.data[0].stock_entries.map((item)=>{
    return {

      value:item.item_id,
      label:item.item_name
    }

  })
    
    )
    setquantity(response.data[0].stock_entries[0].product_quantity)
             
})
.catch(function (error) {
  console.log(error);
});



      }
    
    // Extract All Data 
    // const Get_Job_data =(e)=>{
    //     var axios = require('axios');
    //     var data = '';
        
    //     var config = {
    //       method: 'get',
    //       url: `http://rightway-api.genial365.com/api/IssueStock/GetProcessJobById?process_job_id=${e.value}`,
    //       headers: {
    //         Authorization: `bearer ${
    //           JSON.parse(localStorage.getItem("access_token")).access_token
    //         }`,
    //       },
    //       data : data
    //     };
        
    //     axios(config)
    //     .then(function (response) {
    //       setJobdata([response.data])
    //       setisloading(false)
          
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
        
    //         }
        
    //         const Shift_Number = ()=> {
    //      var axios = require('axios');
    //     var data = '';
        
    //     var config = {
    //       method: 'get',
    //       url: 'http://rightway-api.genial365.com/api/IssueStock/GetShiftNumber',
    //       headers: {
    //         Authorization: `bearer ${
    //           JSON.parse(localStorage.getItem("access_token")).access_token
    //         }`,
    //       },
    //       data : data
    //     };
        
    //     axios(config)
    //     .then(function (response) {
    //       setnumber(response.data)
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    //         }

    //         const Stock_Data = (e)=>
    //          {
    //           var axios = require('axios');
    //           var data = '';
              
    //           var config = {
    //             method: 'get',
    //             url:(aftersubmit ? `http://rightway-api.genial365.com/api/IssueStock/GetJobStockIssueDetails?job_id=${e.value}`:
    //             `http://rightway-api.genial365.com/api/IssueStock/GetJobStockIssueDetails?job_id=${jobvalue.value}`),
    //             headers: {
    //               Authorization: `bearer ${
    //                 JSON.parse(localStorage.getItem("access_token")).access_token
    //               }`,
    //             },
    //             data : data
    //           };
              
    //           axios(config)
    //           .then(function (response) {
    //             console.log(JSON.stringify(response.data));
    //            setstockdata(response.data.job_stock_shift_entries)
             
    //           })
              
    //           .catch(function (error) {
    //             console.log(error);
    //           });
              
    //          } 


            //  Submit Both form Recordes

           
            
          
            //  Delete Record

// Post Issue Stock
//  const POST_ISSUE_STOCK =(id) =>{
// var axios = require('axios');
// if(issueto === ""  )
//   {
//     setIsValidation(false)
//   }
//   else{
// var data = JSON.stringify({
//   "date": formDate,
//   "issue_to": issueto.value,
//   "remarks": remarks,
//   "attachments": fileEntity.join(",").toString(),
//   "quantity":quantity ,
//   "job_shift_entries":job_shift_entries 
// });
// var config = {
//   method: 'POST',
//   url: `http://rightway-api.genial365.com/api/IssueStock/PostStockIssue?job_id=${jobvalue.value}&job_stock_shift_issues_entries_id=${id}`,
//   headers: {
//     Authorization: `bearer ${
//       JSON.parse(localStorage.getItem("access_token")).access_token
//     }`,
//     'Content-Type': 'application/json'
//   },
//   data : data
// };
// }

// axios(config)
// .then(function (response) {
//   console.log(JSON.stringify(response.data));
//     console.log(data)
//    setissueto("")
//    setRemarks("")
//   setFileEntity([])
//   setquantity(0)

//   setjob_shift_entries([{
//     item_chart_id:0, quantity_credit: 0, credit: 0,average_rate: 0,stock_type:""
//   }])
//   setIsValidation(true)
// })
// .catch(function (error) {
//   console.log(error);
//   console.log(data)
// });

//             }
               
            let removeFormFields = (i) => {
              let newFormValues = [...stockEntries];
      
               // at position i remove 1 element 
              newFormValues.splice(i, 1);
              setstockEntries(newFormValues)
          }

          const AttachmentFileHandler = (event) => {
            setSelectedFile(event.target.files[0]);
            // setIsUpload(false)
          };
          const UploadFile = async (e) => {
          // setIsUpload(true)
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
                    // setIsUpload(false)
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
      let handleEntries = (i, e) => {
        const list = [...stockEntries];
      
        setstockEntries(list);
          }
useEffect(() => {
 
    // Get_Job_Selector()
     Get_Shift_Selector()
    //  Get_Stock_Issue()
    // Shift_Number()
    // Issue_To_Selector()
  
    // GetItems()
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
                     <div className="col-md-12">
                         <div className="x_panel  px-0 ">
                             <div className="x_content ">
                                 <span className="section  px-2 ">
                                     <i className="fa fa-edit pl-2"></i>&nbsp;Stock Issue
                                 </span>
                                 <div className="row">
                                 <div className=" col-md-12 col-sm-12">
                                         <label className="col-form-label col-md-2 col-sm-2 text-right">
                                             {" "}
                                              Date <span className="required">*</span>
                                         </label>
                                         <div className="col-md-3 col-sm-3">
                                             <input
                                                 className="form-control"
                                                 type="date"
                                                 value={date}
                                                 styles={customStyles}
                                                 onChange={(e) => {
                                                    setDate(e.target.value);
                                                 }}
                                             />
   
                                           
   
                                             {/* // its show fiscal year initial value */}
                                         </div>
                                     <label className="col-form-label col-md-2 col-sm-2 text-right ">
                                         {" "}
                                         Select Shift <span className="required">*</span>
                                     </label>
                                     <div className="col-md-3 col-sm-3">
                                         <Select
                                             isSearchable={true}
                                             placeholder={"Select Shift"}
                                             options={ShiftSelector}
                                              styles={customStyles}
                                              value={shiftvalue}
                                             onChange={(e)=>{
                                              setshiftvalue(e)
                                            }}
                                         />
                                        
                                     </div>
                                 </div>
                                 </div>
                                 <div className="col-md-12 text-right ">
                                 <button
                                 className="btn btn-primary my-2"
                                 type="submit"
                                 onClick={()=> Get_Stock_Issue(shiftvalue.value)}
                                      >
                                  Show Report
                                  {!isLoader && 
                                    (
                                     <i class="fa fa-circle-o-notch fa-spin mx-1"></i>
                                    )
                                 }
                                  </button>
                                 </div>
                               
                                 <div className="col-md-12 text-right x_footer"></div>
                                 {/*<div className="col-md-12 text-right x_footer">
                               
               
             
              </button>
              </div> */}


              {!isloading && (
                <>
              
                { stockissuedata.map((item,i)=>{
                  return(
                  
                    <>
                    <div className="row">
                    <div className="field item form-group col-md-12 col-sm-12">
                     <div className="col-md-3 col-sm-3">
                      <input
                      className="form-control"
                      value={item.job_number}
                       disabled
                      styles={customStyles}
                     
                     
                                />
                     {/* // its show fiscal year initial value */}
                        </div>
                        <div className="col-md-3 col-sm-3">
                        <input
                        className="form-control"
                        value={item.product_name}
                        styles={customStyles}
                        disabled
                       
                    />
                          
                        </div>
                        <div className="col-md-3 col-sm-3"></div>
                        <div className="col-md-3 col-sm-3 text-right">
                      
                          
                        </div>
                    </div>
                    </div>
                    <div className="col-md-12 mt-3">
                    <table className="table table-striped jambo_table bulk_action ">
                          <thead >
                            <tr className="headings">
                              <th className="column-title   text-center" width="18%">Item Name</th>
                              <th className="column-title   text-center" width="16%">Stock Unit</th>
                              <th className="column-title   text-center" width="15%">Quantity</th>
                             
                              <th className="column-title   text-center" width="13%">Remarks</th>
                              <th className="column-title   text-center" width="18%">Weight Price</th>
                              <th className="column-title   text-center" width="18%">Total Weight </th>
                              <th className="column-title   text-center" width="2%">&nbsp;</th>
                            </tr>
                          </thead>
        
                          <tbody>
                          {stockEntries?.map((data, id)=>{
                            return(
                              <>
                              <tr>
                          <td>
                          <Select
                          isSearchable={true}
                          placeholder={"Select Item"}
                           styles={customStyles}
                           value={Item_name.find(e => e.value == data.item_id) || ''}
                           onChange={(e) => { handleEntries(id, e) }}
                      />  
                     
                          </td>
                          <td>
                          <input
                          type='text'
                           className="form-control"
                           value={stockEntries.stock_unit_name}
                           disabled
                           onChange={(e) => { handleEntries(id, e) }}
                          
                        
                          />
                          
                          </td>
                          <td>
                          <input
                          type='number'
                          min="0"
                           className="form-control"
                           value={stockEntries.product_quantity}
                          onChange={(e) => {
                            const list = [...stockEntries];
                            list[id].product_quantity = e.target.value
                            setstockEntries(list);
                          }}/>
                        
                          </td>
                          <td>
                          <input
                          type='text'
                           className="form-control"
                           value={stockEntries.remarks}
                           onChange={(e) => { handleEntries(id, e) }}
                           />
                          </td>
                          <td >
                          <input
                          type='number'
                          min="0"
                           className="form-control"
                           disabled
                           value={stockEntries.weight_per_piece}
                           onChange={(e) => {
                             const list = [...stockEntries];
                             list[id].weight_per_piece = e.target.value
                             setstockEntries(list);
                           }}
                          />
                          </td>
                          <td >
                          <input
                          type='number'
                          min="0"
                           className="form-control"
                           value={stockEntries[id].tatal_weight}
                           onChange={(e) => {
                             const list = [...stockEntries];
                             list[id].tatal_weight = e.target.value
                             setstockEntries(list);
                           }}
                          />
                          </td>
                          <td>
                          <i class="fa fa-times pt-2 text-danger font-size-18" aria-hidden="true" onClick={()=>removeFormFields(i)}  ></i>
                          </td>
                         
                          
                          
                          </tr>
                          
                              </>
                            )
                          })}
                         <tr>
                         <td>
                         Total Item :
                         </td>
                         <td></td>
                         <td>Total quantity:</td>
                         <td></td>
                         <td>Total:</td>
                         <td>Total Weight:</td>
                         <td></td>
                       
                         </tr>
                          </tbody>
                          </table>
                          <button className='btn  ms-4 text-white text-right' style={{backgroundColor:"#f79c74"}}
                          onClick={(i)=> {setstockEntries([...stockEntries, {

                            item_id:0, stock_unit_name: "", product_quantity: 0,remarks: "",weight_per_piece:0
                          }])}}
                          
                          >
                          Add more
                          </button>
                          </div>
                    
                    </>
                  )
                })}
               
               
                  
    
                 
    
                </>
                )}
            </div>
         </div>
      </div>
     </div>
    </div>
    </>

    );
}

export default StockIssueShiftWise;
