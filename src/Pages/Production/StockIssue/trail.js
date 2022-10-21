import React, { useState, useEffect } from 'react';
import CustomInnerHeader from '../../../Components/CustomInnerHeader';
import { useSelector } from "react-redux";
import Select from "react-select";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
const StockIssueShiftWise = () => {
    const showNavMenu = useSelector((state) => state.NavState);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
const [JobValue, setJobValue] = useState("");
const [JobOption, setJobOption] = useState([]);
const [isloading, setisloading] = useState(true);
const [stockdata, setstockdata] = useState([]);
const [number, setnumber] = useState("");
const [ShiftName, setShiftName] = useState("");
const [shift_start_time, setShift_start_time] = useState("");
const [shift_end_time, setshift_end_time] = useState("");
const [pagename, setPageName] = useState("")

// const [initialize , setInitialize] = useState({

//     shift_name: "",
//     shift_start_time:"",
//     shift_end_time:"",
//     page_name:""

// })
    // Get job selector
    const Get_Job_Selector = () =>{
        var axios = require('axios');
        var data = '';
        
        var config = {
          method: 'get',
          url: 'http://rightway-api.genial365.com/api/IssueStock/GetProcessJob',
          headers: { 
            'Authorization': 'Bearer 7w0PZQkvLOKOdcgw-rPUhjmXi4hklOSKslVKVzQMiDBmtPEcCFHWCYQYji-i37Y3sRMcv3jmAcZiLrer5giGe07bj0C6KOKfaetCES_IdJH_EytRl-YphGc-qAuWm53D-a4-J4biNQbB5e1Aj_yoZWQBl_o7SyFtP02I13-SfXZbESpG-2m6AXJHtzk35Ow0wRl_9_13SiWH0Pe97_rmadYEVNcvHjD27v3fkWpkDcD_pTKN_RHxKsSQrxHPm1XI-_yoSwsbfYD0RNOEKLS3RjfzlWts7EbPkmQZCbBm9IgPjoCwTcPRaMzB-cnD-FKGFuHLZkiT2tmjHIYoI8ZRwVkLWNZGdKPlvjQ3uu9KPcywOKFc6AO8_iPpfBMbf0FSBHbPty_lEjKA0NOLPQ_bZD2q1192qc8cUAUXXdpkugHBIuB5gPeZ2HFl-i82Og3-Autmp5cFWkiZSktF9S1xfVKd2fgL_ySFrOIRlNqcLvFGntpa6SLsDvD4cq9hX43bz7ojMIEAoM6qeVjF_PZJnw'
          },
          data : data
        };
        
        axios(config)
        .then(function (response) {
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
    const Get_Stock = ()=>{
var axios = require('axios');
var data = '';

var config = {
  method: 'get',
  url: `http://rightway-api.genial365.com/api/IssueStock/GetProcessJobById?process_job_id=${JobValue.value}`,
  headers: { 
    'Authorization': 'Bearer 7w0PZQkvLOKOdcgw-rPUhjmXi4hklOSKslVKVzQMiDBmtPEcCFHWCYQYji-i37Y3sRMcv3jmAcZiLrer5giGe07bj0C6KOKfaetCES_IdJH_EytRl-YphGc-qAuWm53D-a4-J4biNQbB5e1Aj_yoZWQBl_o7SyFtP02I13-SfXZbESpG-2m6AXJHtzk35Ow0wRl_9_13SiWH0Pe97_rmadYEVNcvHjD27v3fkWpkDcD_pTKN_RHxKsSQrxHPm1XI-_yoSwsbfYD0RNOEKLS3RjfzlWts7EbPkmQZCbBm9IgPjoCwTcPRaMzB-cnD-FKGFuHLZkiT2tmjHIYoI8ZRwVkLWNZGdKPlvjQ3uu9KPcywOKFc6AO8_iPpfBMbf0FSBHbPty_lEjKA0NOLPQ_bZD2q1192qc8cUAUXXdpkugHBIuB5gPeZ2HFl-i82Og3-Autmp5cFWkiZSktF9S1xfVKd2fgL_ySFrOIRlNqcLvFGntpa6SLsDvD4cq9hX43bz7ojMIEAoM6qeVjF_PZJnw'
  },
  data : data
};

axios(config)
.then(function (response) {
  setstockdata([response.data])
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
    'Authorization': 'Bearer 7w0PZQkvLOKOdcgw-rPUhjmXi4hklOSKslVKVzQMiDBmtPEcCFHWCYQYji-i37Y3sRMcv3jmAcZiLrer5giGe07bj0C6KOKfaetCES_IdJH_EytRl-YphGc-qAuWm53D-a4-J4biNQbB5e1Aj_yoZWQBl_o7SyFtP02I13-SfXZbESpG-2m6AXJHtzk35Ow0wRl_9_13SiWH0Pe97_rmadYEVNcvHjD27v3fkWpkDcD_pTKN_RHxKsSQrxHPm1XI-_yoSwsbfYD0RNOEKLS3RjfzlWts7EbPkmQZCbBm9IgPjoCwTcPRaMzB-cnD-FKGFuHLZkiT2tmjHIYoI8ZRwVkLWNZGdKPlvjQ3uu9KPcywOKFc6AO8_iPpfBMbf0FSBHbPty_lEjKA0NOLPQ_bZD2q1192qc8cUAUXXdpkugHBIuB5gPeZ2HFl-i82Og3-Autmp5cFWkiZSktF9S1xfVKd2fgL_ySFrOIRlNqcLvFGntpa6SLsDvD4cq9hX43bz7ojMIEAoM6qeVjF_PZJnw'
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

    // Post Creating shift
const Create = () =>{
var axios = require('axios');
var data = JSON.stringify({
  "shift_name": ShiftName,
  "shift_start_time": shift_start_time,
  "shift_end_time": shift_end_time,
  "page_name": pagename
});

var config = {
  method: 'post',
  url: 'http://rightway-api.genial365.com/api/Shifts/PostData',
  headers: { 
    'Authorization': 'Bearer 7w0PZQkvLOKOdcgw-rPUhjmXi4hklOSKslVKVzQMiDBmtPEcCFHWCYQYji-i37Y3sRMcv3jmAcZiLrer5giGe07bj0C6KOKfaetCES_IdJH_EytRl-YphGc-qAuWm53D-a4-J4biNQbB5e1Aj_yoZWQBl_o7SyFtP02I13-SfXZbESpG-2m6AXJHtzk35Ow0wRl_9_13SiWH0Pe97_rmadYEVNcvHjD27v3fkWpkDcD_pTKN_RHxKsSQrxHPm1XI-_yoSwsbfYD0RNOEKLS3RjfzlWts7EbPkmQZCbBm9IgPjoCwTcPRaMzB-cnD-FKGFuHLZkiT2tmjHIYoI8ZRwVkLWNZGdKPlvjQ3uu9KPcywOKFc6AO8_iPpfBMbf0FSBHbPty_lEjKA0NOLPQ_bZD2q1192qc8cUAUXXdpkugHBIuB5gPeZ2HFl-i82Og3-Autmp5cFWkiZSktF9S1xfVKd2fgL_ySFrOIRlNqcLvFGntpa6SLsDvD4cq9hX43bz7ojMIEAoM6qeVjF_PZJnw', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
  toast.success(response.data)
  setShiftName("")
  setShift_start_time("")
  setshift_end_time("")
  setPageName("")
  handleClose()
})
.catch(function (error) {
  console.log(error);
});

    }

    useEffect(() => {
       Get_Job_Selector()
       Shift_Number()
    }, []);
    
    return (
        <>
        <div
        className={`container-fluid page-title-bar ${showNavMenu === false ? "right_col-margin-remove" : ""
            }   `}
    >
    <CustomInnerHeader moduleName="Stock Issue Shift Wise" isShowSelector={true} />
       </div>

       <div
       className={`right_col  h-10 heightFixForFAult  ${showNavMenu === false ? "right_col-margin-remove" : " "
           } `}
       role="main"
   >
   
   <div className="row">
   <div className="col-md-12 p-2">
   <div className="x_panel px-0">

    <div className="x_content  p-4  ">
   <span className="section">
       <div className="row px-2  ">
           <div className="col-8 ">
            &nbsp;Stock Issue Shift Wise
           </div>
       </div>
   </span>
   <div className="row px-2">
   
   
   </div>
 <div className="form-group">
 <div className="field item form-group col-md-6 col-sm-6">
 <label className="col-form-label col-md-3 col-sm-36 label-align">
     {" "}
     Select Job: <span className="required">*</span>
 </label>
 <div className="col-md-8 col-sm-8">
 <Select
 isSearchable={true}
 options={JobOption}
 value={JobValue}
 onChange={(e)=>setJobValue(e)}
 />
 </div>
</div>
<div classNmae= "row px-2 ">
 
<div className="col-md-12">
<button
    className="btn btn-primary mx-4 my-4"
    type="submit"
    onClick={() => {
      Get_Stock();
    
    }}
>
    Show Report
</button>

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
                     <th className="column-title  right-border-1 text-center" width="10%"> Sr. </th>
                     <th className="column-title  right-border-1 text-center">Job Starting Date </th>
                     <th className="column-title  right-border-1 text-center">Job Ending Date </th>
                     <th className="column-title  right-border-1 text-center">Job Customer Name </th>
                     <th className="column-title  right-border-1 text-center">Job Product Name  </th>
                     <th className="column-title  right-border-1 text-center">Incharge Name </th>
                     <th className="column-title  right-border-1 text-center">Stock Unit </th>
                     <th className="column-title  right-border-1 text-center">Job Status </th>
                    
                 </tr>
             </thead>
             <tbody>
            <tr>
            {stockdata.map((item,index)=>{
                return(
                    <>
                    <td className=' a-right a-right     text-center'>{index+1}</td>
                    <td className='a-right a-right     text-center' >{item.job_starting_date}</td>
                    <td className='a-right a-right     text-center'>{item.job_ending_date}</td>
                    <td className='a-right a-right     text-center'>{item.account_name}</td>
                    <td  className='a-right a-right     text-center' >{item.product_name}</td>
                    <td className='a-right a-right     text-center'>{item.incharge_name}</td>
                    <td className='a-right a-right     text-center'>{item.stock_unit}</td>
                    <td className='a-right a-right     text-center'>{item.job_status}</td>
                    </>


                )
            })

            }
            
            </tr>
              


             </tbody>
         </table>
     </div>
   
 </div>
   <div className="col-md-12 text-left ">
     <button
         className="btn btn-primary"
         type="submit"
         onClick={handleShow}
     >
         Create Shift
     </button>
    
    </div>

</div>
<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Creating Shift</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
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
              <Form.Label>Shift Name</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                // value={initialize.shift_name}
                // onChange={(e)=>setInitialize({...initialize,shift_name:e.target.value})}
                value={ShiftName}
                onChange={(e)=>setShiftName(e.target.value)}
              />
            </Form.Group>
            </div>
            <div className = "col-md-6">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Shift Start time</Form.Label>
            <Form.Control
              type="time"
              autoFocus
              value={shift_start_time}
                onChange={(e)=>setShift_start_time(e.target.value)}
            />
          </Form.Group>
            
            </div>
            <div className = "col-md-6">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Shift End time</Form.Label>
            <Form.Control
              type="time"
              autoFocus
              value={shift_end_time}
                onChange={(e)=>setshift_end_time(e.target.value)}
            />
          </Form.Group>
             </div>
             <div className='col-md-12'>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Page Name</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={pagename}
                onChange={(e)=>setPageName(e.target.value)}
              />
            </Form.Group>
            </div>
          </Form>
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={Create}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    
    
    </>)}
 




   </div>
   </div>
        </>
    );
}

export default StockIssueShiftWise;
