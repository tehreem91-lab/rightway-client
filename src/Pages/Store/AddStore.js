import React,{useState, useEffect,useRef} from 'react';
import { useSelector } from "react-redux";
import Select from "react-select";
import axios from 'axios';
import { endPoint } from '../../config/Config';
import { useLocation } from 'react-router-dom';
import CustomInnerHeader from '../../Components/CustomInnerHeader';
import { toast } from "react-toastify";
import { customStyles } from '../../Components/reactCustomSelectStyle';

const AddStore = () => {
    const showNavMenu = useSelector((state) => state.NavState);
    const [isValidateAllStates, setIsValidateAllStates] = useState(true)
    const [storevalue, setstorevalue] = useState("");
    const [accountvalue, setAccountvalue] = useState("");
    const [consumptionvalue, setConsumptionValue] = useState("");
    const [unit, setUnit] = useState("");
    const [quantity_grams, setQuantity_grams] = useState("");
     const [Opening_quantity, setOpening_quantity] = useState("");
    const [Description, setDescription] = useState("");
    const [storeoption , setstoreoption] = useState([])
    const [consumptionoption , setConsumptionOption] = useState([])
    const [unitoption , setUnitOption] = useState([])
    const [isupload,setIsUpload] = useState(true);
    const [fileEntity, setFileEntity] = useState([]);
    const [Fname, setFilename] = useState("")
    const [selectedFile, setSelectedFile] = useState("")
     const [packets_detail, setpackets_detail] = useState([{ packet_name: "", pair_base_unit: ""}])
     const [storeid , setStoreId] = useState("")
     const [selectedimage, setSelectedImage] = useState("");
     const [imageEntity, setImageEntity] = useState([]);
     const [update, setupdate] = useState(false);

     const inputRef = useRef(null);
     const ref = useRef(null);
     const location = useLocation();

    //  Upload Store data
     const UploadStore = ()=>{
 
        var axios = require('axios');
        if(accountvalue === "" || storevalue === "" || consumptionvalue ===  ""  || unit === "" || quantity_grams === "" ||
        Opening_quantity === "" || packets_detail === "" )
        {
          setIsValidateAllStates(false)
        }else{
        var data = JSON.stringify({
      
            
                "store_type_id": storevalue.value,
                "item_name": accountvalue,
                "store_consumption_id": consumptionvalue.value,
                "store_unit_id": unit.value,
                "quantity_in_grams": quantity_grams,
                "Opening_quantity": Opening_quantity  ,
                "descriptions": Description,
                "image": imageEntity.toString(),
                "attachemnts_paths": fileEntity.join(",").toString(),
                "packets_details": packets_detail
              
            
          
        });
        var config = {
          method: 'post',
          url: 'http://rightway-api.genial365.com/api/Store/AddStore',
          headers: { 
            'Authorization': 'Bearer  7w0PZQkvLOKOdcgw-rPUhjmXi4hklOSKslVKVzQMiDBmtPEcCFHWCYQYji-i37Y3sRMcv3jmAcZiLrer5giGe07bj0C6KOKfaetCES_IdJH_EytRl-YphGc-qAuWm53D-a4-J4biNQbB5e1Aj_yoZWQBl_o7SyFtP02I13-SfXZbESpG-2m6AXJHtzk35Ow0wRl_9_13SiWH0Pe97_rmadYEVNcvHjD27v3fkWpkDcD_pTKN_RHxKsSQrxHPm1XI-_yoSwsbfYD0RNOEKLS3RjfzlWts7EbPkmQZCbBm9IgPjoCwTcPRaMzB-cnD-FKGFuHLZkiT2tmjHIYoI8ZRwVkLWNZGdKPlvjQ3uu9KPcywOKFc6AO8_iPpfBMbf0FSBHbPty_lEjKA0NOLPQ_bZD2q1192qc8cUAUXXdpkugHBIuB5gPeZ2HFl-i82Og3-Autmp5cFWkiZSktF9S1xfVKd2fgL_ySFrOIRlNqcLvFGntpa6SLsDvD4cq9hX43bz7ojMIEAoM6qeVjF_PZJnw',
            'Content-Type': 'application/json'
          },
         
          data : data
        };
        }
        
        axios(config)
        .then(function (response) {
          setAccountvalue("") 
          setstorevalue("")
          setConsumptionValue("")
           setUnit("")
           setDescription("")
           setOpening_quantity("")
           setQuantity_grams("")
           setpackets_detail([ {packet_name: "", pair_base_unit: ""}])
           setFileEntity([])
           toast.success("Your response has been submitted successfully")
        })
      
        
        }

// Fetch Store Data by Id
        
        const FetchDataforEdit = (id) => { 
   
   
          var axios = require('axios');
          var data = '';
          
          var config = {
            method: 'get',
            url: `http://rightway-api.genial365.com/api/Store/GetStoreById?store_info_id=${id}`,
            headers: { 
              'Authorization': 'Bearer  7w0PZQkvLOKOdcgw-rPUhjmXi4hklOSKslVKVzQMiDBmtPEcCFHWCYQYji-i37Y3sRMcv3jmAcZiLrer5giGe07bj0C6KOKfaetCES_IdJH_EytRl-YphGc-qAuWm53D-a4-J4biNQbB5e1Aj_yoZWQBl_o7SyFtP02I13-SfXZbESpG-2m6AXJHtzk35Ow0wRl_9_13SiWH0Pe97_rmadYEVNcvHjD27v3fkWpkDcD_pTKN_RHxKsSQrxHPm1XI-_yoSwsbfYD0RNOEKLS3RjfzlWts7EbPkmQZCbBm9IgPjoCwTcPRaMzB-cnD-FKGFuHLZkiT2tmjHIYoI8ZRwVkLWNZGdKPlvjQ3uu9KPcywOKFc6AO8_iPpfBMbf0FSBHbPty_lEjKA0NOLPQ_bZD2q1192qc8cUAUXXdpkugHBIuB5gPeZ2HFl-i82Og3-Autmp5cFWkiZSktF9S1xfVKd2fgL_ySFrOIRlNqcLvFGntpa6SLsDvD4cq9hX43bz7ojMIEAoM6qeVjF_PZJnw'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            const id = (response.data.store_account.store_account_value)
             setStoreId(id)
        
           setDescription(response.data.descriptoion)
            setAccountvalue(response.data.store_account.store_account_label)
            setOpening_quantity(response.data.entries.opening_quantity)
            setQuantity_grams(response.data.quantity_in_grams)
            setpackets_detail(response.data.packets_details)
           
           const StoreData = {
                             
              label: response.data.store_type.stock_type_label,
              value: response.data.store_type.stock_type_value,
              code: response.data.store_type.stock_type_code
        
        
        
        }
        
      
        
        const Consumption = {
                             
          label: response.data.consumption_account.account_label,
          value: response.data.consumption_account.account_value,
           code : response.data.store_type.store_type_code
        
        
        
        }
        
        const Unit ={
        
          label: response.data.store_account.store_unit_name,
        }
        setstorevalue(StoreData)
        setConsumptionValue(Consumption)
        setUnit(Unit)
             

        if (response.data.attachments!== "") {
          setFileEntity(response.data.attachments.split(","));
        } 
        setSelectedFile(response.data.attachments.split(","))
       
        if (response.data.image!== "") {
          setImageEntity(response.data.image.toString());
        }
         setSelectedImage(response.data.image.toString())

        setupdate(true)
        
          })
          .catch(function (error) {
          });
           }

          //  Update Store Data by Id

           const UpdateStore = (id) =>{
          
              var axios = require('axios');
              var data = JSON.stringify({
                "store_type_id": storevalue.value,
                "item_name": accountvalue,
                "store_consumption_id": consumptionvalue.value,
                "store_unit_id": unit.value,
                "quantity_in_grams": quantity_grams,
                "entries": Opening_quantity  ,
                "descriptions": Description,
                "image": imageEntity.toString(),
                "attachemnts_paths": fileEntity.join(",").toString(),
                "packets_details": packets_detail
              });
              var config = {
                method: 'put',
                url: `http://rightway-api.genial365.com/api/Store/PutData?store_id=${id}`,
                headers: { 
                  'Authorization': 'Bearer  7w0PZQkvLOKOdcgw-rPUhjmXi4hklOSKslVKVzQMiDBmtPEcCFHWCYQYji-i37Y3sRMcv3jmAcZiLrer5giGe07bj0C6KOKfaetCES_IdJH_EytRl-YphGc-qAuWm53D-a4-J4biNQbB5e1Aj_yoZWQBl_o7SyFtP02I13-SfXZbESpG-2m6AXJHtzk35Ow0wRl_9_13SiWH0Pe97_rmadYEVNcvHjD27v3fkWpkDcD_pTKN_RHxKsSQrxHPm1XI-_yoSwsbfYD0RNOEKLS3RjfzlWts7EbPkmQZCbBm9IgPjoCwTcPRaMzB-cnD-FKGFuHLZkiT2tmjHIYoI8ZRwVkLWNZGdKPlvjQ3uu9KPcywOKFc6AO8_iPpfBMbf0FSBHbPty_lEjKA0NOLPQ_bZD2q1192qc8cUAUXXdpkugHBIuB5gPeZ2HFl-i82Og3-Autmp5cFWkiZSktF9S1xfVKd2fgL_ySFrOIRlNqcLvFGntpa6SLsDvD4cq9hX43bz7ojMIEAoM6qeVjF_PZJnw',
                  'Content-Type': 'application/json'
                },
               
                data : data
              };
              
              axios(config)
              .then(function (response) {
                setAccountvalue("") 
                setstorevalue("")
                setConsumptionValue("")
                 setUnit("")
                 setDescription("")
                 setOpening_quantity("")
                 setQuantity_grams("")
                 setpackets_detail([ {packet_name: "", pair_base_unit: ""}])
                  setFileEntity([])
                
                 toast.success("Your response has been Updated successfully")
              })
             
            
            
             } 
           const reset = () => {
              ref.current.value = "";
          };
      const reset2 = () => {
        inputRef.current.value = "";
      };
           
      
           const UploadFile = async (e) => {
            
            let data = new FormData();
            data.append("UploadedImage",selectedFile);
            await axios.post(`http://rightway-api.genial365.com/api/FileUpload?file_name=${selectedFile.name}`, data).then(res => {
                setFileEntity([...fileEntity, res.data])
      
                
                if (res.status === 200) {
                  setIsUpload(true)
                  reset()
              }
      
      
               
            })
      
         
      
        }
      
        const UploadImage = async () => {
          let data = new FormData();
          data.append("UploadedImage", selectedimage);
          await axios.post(`http://rightway-api.genial365.com/api/FileUpload?file_name=${selectedimage.name}`, data).then(res => {
            setImageEntity([...imageEntity, res.data])
              if (res.status === 200) {
                  setIsUpload(true);
                  reset2()
              }
          })
      }
      
        let handleChange = (i, e) => {
          const { name, value } = e.target;
          const list = [...packets_detail];
          list[i][name] = value;
          setpackets_detail(list);
            }
            
          let addFormFields = () => {
            setpackets_detail([...packets_detail, { packet_title: "", pair_base_unit: "" }])
            }
          
          let removeFormFields = (i) => {
              let newFormValues = [...packets_detail];
      
               // at position i remove 1 element 
              newFormValues.splice(i, 1);
              setpackets_detail(newFormValues)
          }
          let removeAttchments = (i) => {
            let newAttachValues = [...fileEntity];
            // at position i remove 1 element
            newAttachValues.splice(i, 1); 
            setFileEntity(newAttachValues)
        }
      
          const AttachmentFileHandler = (event) => {
          setSelectedFile(event.target.files[0]);
      
          };

const Getstore_type = ()=>

{
    var axios = require('axios');
    var data = '';
    
    var config = {
      method: 'get',
      url: 'http://rightway-api.genial365.com/api/Store/GetStoreAccount',
      headers: { 
        'Authorization': 'Bearer  7w0PZQkvLOKOdcgw-rPUhjmXi4hklOSKslVKVzQMiDBmtPEcCFHWCYQYji-i37Y3sRMcv3jmAcZiLrer5giGe07bj0C6KOKfaetCES_IdJH_EytRl-YphGc-qAuWm53D-a4-J4biNQbB5e1Aj_yoZWQBl_o7SyFtP02I13-SfXZbESpG-2m6AXJHtzk35Ow0wRl_9_13SiWH0Pe97_rmadYEVNcvHjD27v3fkWpkDcD_pTKN_RHxKsSQrxHPm1XI-_yoSwsbfYD0RNOEKLS3RjfzlWts7EbPkmQZCbBm9IgPjoCwTcPRaMzB-cnD-FKGFuHLZkiT2tmjHIYoI8ZRwVkLWNZGdKPlvjQ3uu9KPcywOKFc6AO8_iPpfBMbf0FSBHbPty_lEjKA0NOLPQ_bZD2q1192qc8cUAUXXdpkugHBIuB5gPeZ2HFl-i82Og3-Autmp5cFWkiZSktF9S1xfVKd2fgL_ySFrOIRlNqcLvFGntpa6SLsDvD4cq9hX43bz7ojMIEAoM6qeVjF_PZJnw'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      setstoreoption(
            response.data.map((item)=>{
              return{
                 
                value: item.stock_value,
                label: item.stock_label


              }


            })

      )
    })
    
    }

    // get method of consumption
const Get_Consumption = ()=>
    {
        var axios = require('axios');
        var data = '';

var config = {
  method: 'get',
  url: 'http://rightway-api.genial365.com/api/Store/GetStore/ConsumtionAccount',
  headers: { 
    'Authorization': 'Bearer  7w0PZQkvLOKOdcgw-rPUhjmXi4hklOSKslVKVzQMiDBmtPEcCFHWCYQYji-i37Y3sRMcv3jmAcZiLrer5giGe07bj0C6KOKfaetCES_IdJH_EytRl-YphGc-qAuWm53D-a4-J4biNQbB5e1Aj_yoZWQBl_o7SyFtP02I13-SfXZbESpG-2m6AXJHtzk35Ow0wRl_9_13SiWH0Pe97_rmadYEVNcvHjD27v3fkWpkDcD_pTKN_RHxKsSQrxHPm1XI-_yoSwsbfYD0RNOEKLS3RjfzlWts7EbPkmQZCbBm9IgPjoCwTcPRaMzB-cnD-FKGFuHLZkiT2tmjHIYoI8ZRwVkLWNZGdKPlvjQ3uu9KPcywOKFc6AO8_iPpfBMbf0FSBHbPty_lEjKA0NOLPQ_bZD2q1192qc8cUAUXXdpkugHBIuB5gPeZ2HFl-i82Og3-Autmp5cFWkiZSktF9S1xfVKd2fgL_ySFrOIRlNqcLvFGntpa6SLsDvD4cq9hX43bz7ojMIEAoM6qeVjF_PZJnw'
  },
  data : data
};

axios(config)
.then(function (response) {

  setConsumptionOption(
    response.data.map((item)=>{
     
        return{

            value : item.chart_id,
            label: item.account_name,
            code: item.account_code

        }

    })
  )
})

    }

const Get_Unit = (APIurl)=>
    {
        var axios = require('axios');

var config = {
  method: 'get',
  url: APIurl,
  headers: { 
    'Authorization': 'Bearer  7w0PZQkvLOKOdcgw-rPUhjmXi4hklOSKslVKVzQMiDBmtPEcCFHWCYQYji-i37Y3sRMcv3jmAcZiLrer5giGe07bj0C6KOKfaetCES_IdJH_EytRl-YphGc-qAuWm53D-a4-J4biNQbB5e1Aj_yoZWQBl_o7SyFtP02I13-SfXZbESpG-2m6AXJHtzk35Ow0wRl_9_13SiWH0Pe97_rmadYEVNcvHjD27v3fkWpkDcD_pTKN_RHxKsSQrxHPm1XI-_yoSwsbfYD0RNOEKLS3RjfzlWts7EbPkmQZCbBm9IgPjoCwTcPRaMzB-cnD-FKGFuHLZkiT2tmjHIYoI8ZRwVkLWNZGdKPlvjQ3uu9KPcywOKFc6AO8_iPpfBMbf0FSBHbPty_lEjKA0NOLPQ_bZD2q1192qc8cUAUXXdpkugHBIuB5gPeZ2HFl-i82Og3-Autmp5cFWkiZSktF9S1xfVKd2fgL_ySFrOIRlNqcLvFGntpa6SLsDvD4cq9hX43bz7ojMIEAoM6qeVjF_PZJnw'
  },
};

axios(config)
.then(function (response) {

  setUnitOption(
    response.data.map((item)=>{
     
        return{

            value : item.stock_unit_id,
            label: item.stock_unit_name,
            created_date: item.created_date,
            modified_date : item.modified_date

        }

    })
  )
})


    }


    useEffect(() => {
        
        Getstore_type()
        Get_Consumption()
        Get_Unit("http://rightway-api.genial365.com/api/StockUnits/GetData")
        if (location?.state?.id) {
          FetchDataforEdit(location.state.id)
        }
     
       

    }, []);

 
    return (
        <>
        <div
        className={`container-fluid page-title-bar ${showNavMenu === false ? "right_col-margin-remove" : ""
            }   `}
    >
    <CustomInnerHeader moduleName="Store Managment" isShowSelector={true} />
       </div>
       <div
       className={`right_col  h-10 heightFixForFAult  ${showNavMenu === false ? "right_col-margin-remove" : " "
           } `}
       role="main"
   >
   
    <div className="row">
    <div className="col-md-12 ">
    <div className="x_panel px-0">

     <div className="x_content  p-4  ">
    <span className="section">
        <div className="row px-2  ">
            <div className="col-8 ">
            <i className="fa fa-edit"></i>&nbsp;Add Store Account
            </div>
        </div>
    </span>
  <div className="form-group">
  {/*row...1*/}
  <div className="row px-4">
    <div className="col-md-6 col-sm-6">
    <label className="col-form-label col-md-3 col-sm-3 label-align"> Store Type <span className="required">*</span></label>
    <div className='col-md-8'>
    <Select
    isSearchable={true}
    options={storeoption}
    value={storevalue}
    style={customStyles}
    isDisabled={(location?.state?.id) ? true : false}
    styles={{ minHeight: "29px", height: "29px",}}
    onChange={(e)=>{setstorevalue(e)}} 
  
    />
    {!isValidateAllStates && (storevalue === "" ) && <span className="text-danger">First Select this </span>}  

    </div>
  
    </div>
    <div className="col-md-6 col-sm-6">
    <label className="col-form-label col-md-4 col-sm-4 label-align"> Consumption Account<span className="required">*</span></label>
    <div className='col-md-8'>
    <Select
    isSearchable={true}
    options={consumptionoption}
    value={consumptionvalue}
    style={customStyles}
    styles={{ minHeight: "29px", height: "29px",}}
    onChange={(e)=>{setConsumptionValue(e)}}
    />
    {!isValidateAllStates && (consumptionvalue ===  "") && <span className="text-danger">First Select this </span>}  
    </div>
   
    </div>
 </div>
  {/*row...2*/}
    <div className="row px-4 mt-2">
    <div className="col-md-6 col-sm-6">
    <label className="col-form-label col-md-3 col-sm-3 label-align"> Account name <span className="required">*</span></label>
    <div className='col-md-8'>
    <input
    type="text"
    className="form-control"
    value={accountvalue}
    onChange={(e)=>{setAccountvalue(e.target.value)}}
    />
    {!isValidateAllStates && (accountvalue === "" ) && <span className="text-danger">First Select this </span>}
    </div>
  
    </div>
    <div className="col-md-6 col-sm-6">
    <label className="col-form-label col-md-4 col-sm-4 label-align"> Quantity in grams <span className="required">*</span></label>
    <div className='col-md-6'>
    <input
    type="number"
    min="0"
    className="form-control"
    value={quantity_grams}
    onChange={(e)=>{setQuantity_grams(e.target.value)}}
    />
    {!isValidateAllStates && (quantity_grams === "" ) && <span className="text-danger">First Select this </span>}  
    </div>
  
    </div>
     </div>
      {/*row...3*/}
     <div className="row px-4 mt-2">
    <div className="col-md-6 col-sm-6">
    <label className="col-form-label col-md-3 col-sm-3 label-align">Unit <span className="required">*</span></label>
    <div className='col-md-8'>
    <Select
    isSearchable={true}
    options={unitoption}
    value={unit}
    onChange={(e)=>{setUnit(e)}}
    />
    {!isValidateAllStates && (unit === "" ) && <span className="text-danger">First Select this </span>} 
    </div>
  
    </div>
    <div className="col-md-6 col-sm-6">
    <label className="col-form-label col-md-4 col-sm-4 label-align"> Opening Quantity <span className="required">*</span></label>
    <div className='col-md-6'>
    <input
    type='number'
    min="0"
    className="form-control"
    value={Opening_quantity}
    onChange={(e)=>{setOpening_quantity(e.target.value)}}
    />
    {!isValidateAllStates && (Opening_quantity === "" ) && <span className="text-danger">First Select this </span>} 
    </div>
  
    </div>
     </div>

     <div className="row px-4 mt-2">
     <div className="col-md-6 col-sm-6">
    <label className="col-form-label col-md-3 col-sm-3 label-align"> Select Attactments <span className="required">*</span></label>
    <div className='col-md-8'>
    <input 
    ref={ref}
    type="file"
    className="form-control form-control-sm customStyleForInput"
    data-validate-length-range={6}
    data-validate-words={2}
    name="name"
    onChange={(e) => {
      AttachmentFileHandler(e)
      setFilename((e.target.files[0].name.split("."))[0])
    }}
    />
    </div>
    <div className="col-md-1  " style={{ paddingTop: "1.5px" }}>

    <button className="btn btn-sm btn-outline-warning" type="button" onClick={()=> UploadFile()} ><i className="fa fa-upload"></i></button>

  </div>
  
    </div>
   

    <div className="col-md-6 col-sm-6">
    <label className="col-form-label col-md-4 col-sm-4 label-align"> Select Image <span className="required">*</span></label>
    <div className='col-md-6'>
    <input  
    type="file"
    className="form-control form-control-sm customStyleForInput"
    data-validate-length-range={6}
    data-validate-words={2}
    name="name"
    accept="image/*"
    ref={inputRef}
    onChange={(e)=>
     
      {
        setSelectedImage(e.target.files[0]);

      }
  
  } 

    />
    

    </div>
    <div className="col-md-1  " style={{ paddingTop: "1.5px" }}>

    <button
   
     className="btn btn-sm btn-outline-warning" 
    type="button" onClick={()=>UploadImage()} ><i className="fa fa-upload"></i></button>

  </div>
    
  
    </div>
    </div>

    {/*attachments*/}

    <div className="row px-4 mt-2">
    <div className="col-md-6 col-sm-6">
     <label className="col-form-label col-md-3 col-sm-3 label-align">Description</label>
    <div className='col-md-8'>
    <textarea

    className="form-control"
    value={Description}
    onChange={(e)=>{setDescription(e.target.value)}}
    />
    </div>
    </div>


    {fileEntity.length !== 0 && <div className="field item form-group col-md-6 col-sm-6">
    <label className="col-form-label col-md-3 col-sm-3 label-align">Attachments</label>
    <div className="col-md-8 col-sm-8 ">
     {fileEntity.map((each_file, index) => {
            return <button className="btn btn-sm  bg-info  text-light"
            >
            <a href={`${endPoint + each_file}`} target="_blank" rel="noopener noreferrer" className='text-light
          
            '>
            {((each_file.split("_"))[0]).slice(15)} {index + 1}</a>
        <i className="fa fa-times   text-light ml-1 " aria-hidden="true"
        onClick={() => removeAttchments(index)}
        ></i>
            </button>
        })
      }
    
     
    </div>
</div>}
 
    
   
     </div>

   
     <span className="section mt-2">
     <div className="row px-2  ">
         <div className="col-8 ">
         <i className="fa fa-edit"></i>&nbsp;Add Pair Packets
         </div>
     </div>
 </span>
 <div className="row ">
 {packets_detail.map((element,index)=>{

  return(

     <>
 <div className="col-md-6 col-sm-6">
 <label className="col-form-label col-md-3 col-sm-3 label-align"> Packets Name <span className="required">*</span></label>
 <div className='col-md-8'>
 <input
 type="text"
 className="form-control"
 name='packet_name'

 value={element.packet_name} onChange={e => handleChange(index, e)}
 />
 {!isValidateAllStates && (element.packet_name === "" ) && <span className="text-danger">First Select this </span>} 
 
 </div>

 </div>
 <div className="col-md-6 col-sm-6">
 <label className="col-form-label col-md-1 col-sm-1 "> Value </label>
 <div className='col-md-6'>
 <input
 type="number"
 className="form-control"
 name='pair_base_unit'
 min="0"
 value={element.pair_base_unit} onChange={e => handleChange(index, e)}
 />
 {!isValidateAllStates && (element.pair_base_unit=== "" ) && <span className="text-danger">First Select this </span>} 
 </div>
 <div className="col-md-3 col-sm-3">

<i class="fa fa-times pt-2 text-danger" aria-hidden="true" onClick={() => removeFormFields(index)}></i> 



</div>

 </div> 

 
     
     
     
     </>
  )


 })}


</div>

    <div className="row px-2 text-right ">
   
    <div className="col-md-12 d-flex justify-content-between x_footer mt-4"> 
 <button className='btn  ms-4 text-white text-right' style={{backgroundColor:"#f79c74"}} onClick={() => addFormFields()}> Add more </button>
 {update ?

(
<button className='btn  ms-4 text-white text-right ' style={{backgroundColor:"#f79c74"}}  onClick={() =>UpdateStore(storeid) }> Update </button>
):

(
<button className='btn  ms-4 text-white text-right ' style={{backgroundColor:"#f79c74"}}  onClick={() =>UploadStore()}> Submit </button>

)

}

 </div>
    
  </div>
     
     
     
    
   
  {/* pakages */}

  

 


 
 </div>
</div>
</div>
</div>
   
   
   
   
   
   
   
   
   
   
   </div>
   </div>
            
        </>
    );
}

export default AddStore;

