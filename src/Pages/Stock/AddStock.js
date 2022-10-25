import React,{useState, useEffect,useRef} from 'react';
import { useSelector } from "react-redux";
import Select from "react-select";
import axios from 'axios';
import { endPoint } from '../../config/Config';
import { useLocation } from 'react-router-dom';
import { toast } from "react-toastify";
import CustomInnerHeader from '../../Components/CustomInnerHeader';
import { customStyles } from '../../Components/reactCustomSelectStyle';
import { useNavigate } from "react-router-dom"

const AddStock = () => {
  const inputRef = useRef(null);
  const ref = useRef(null);
  const location = useLocation();
  const navigation = useNavigate();

  const [isValidateAllStates, setIsValidateAllStates] = useState(true)
    const [stockvalue, setStockValue] = useState("");
    const [accountvalue, setAccountvalue] = useState("");
    const [consumptionvalue, setConsumptionValue] = useState("");
    const [unit, setUnit] = useState("");
    const [quantity_grams, setQuantity_grams] = useState("");
     const [Opening_quantity, setOpening_quantity] = useState("");
    const [Description, setDescription] = useState("");
    const [stockoption , setStockoption] = useState([])
    const [consumptionoption , setConsumptionOption] = useState([])
    const [unitoption , setUnitOption] = useState([])
    const [isupload,setIsUpload] = useState(false);
    const [fileEntity, setFileEntity] = useState([]);
    const [Fname, setFilename] = useState("")
    const [imagefilename, setImageFilename] = useState("")
    const [selectedFile, setSelectedFile] = useState("")
     const [packets_detail, setpackets_detail] = useState([{ packet_name: "", pair_base_unit: ""}])
     const [fetchdata, setFetchdata] = useState([]);
     const [stockid , setStockId] = useState("")
     const [selectedimage, setSelectedImage] = useState("");
     const [update, setupdate] = useState(false);
     const [imageEntity, setImageEntity] = useState([]);

 

  //  get data by Id
  const FetchDataforEdit = (id) => { 
   
   
  var axios = require('axios');
  var data = '';
  
  var config = {
    method: 'get',
    url: `http://rightway-api.genial365.com/api/Stock/GetStockById?stock_info_id=${id}`,
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem("access_token")).access_token
      }`,
    },
    data : data
  };
  
  axios(config)
  .then(function (response) {
   
    setupdate(true)

    setFetchdata(response.data)
   
    const id = (response.data.stock_account.stock_account_value)
     setStockId(id)

   setDescription(response.data.descriptoion)
    setAccountvalue(response.data.stock_account.stock_account_label)
    setOpening_quantity(response.data.entries.opening_quantity)
    setQuantity_grams(response.data.quantity_in_grams)
    setpackets_detail(response.data.packets_details)
   
   const stockdata = {
                     
      label: response.data.stock_type.stock_type_label,
      value: response.data.stock_type.stock_type_value,
      code: response.data.stock_type.stock_type_code



}





const Consumption = {
                     
  label: response.data.consumption_account.account_label,
  value: response.data.consumption_account.account_value,
   code : response.data.stock_type.stock_type_code
}

const Unit ={

  label: response.data.stock_account.stock_unit_name,
}
setStockValue(stockdata)
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



  })

   }

  //  Update data by Id 

 const UpdateStock = (id) =>{

  var axios = require('axios');
  var data = JSON.stringify({
    "stock_type_id": stockvalue.value,
    "item_name": accountvalue,
    "stock_consumption_id": consumptionvalue.value,
    "stock_unit_id": unit.value,
    "quantity_in_grams": quantity_grams,
    "entries": Opening_quantity  ,
    "descriptions": Description,
    "image": imageEntity.toString(),
    "attachemnts_paths":fileEntity.join(",").toString(),
    "packets_details": packets_detail
  });
  var config = {
    method: 'put',
    url: `http://rightway-api.genial365.com/api/Stock/PutData?stock_id=${id}`,
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem("access_token")).access_token
      }`,
      'Content-Type': 'application/json'
    },
   
    data : data
  };
  
  axios(config)
  .then(function (response) {
    setIsValidateAllStates(true)
  
    setAccountvalue("") 
    setStockValue("")
    setConsumptionValue("")
     setUnit("")
     setDescription("")
     setOpening_quantity("")
     setQuantity_grams("")
     setpackets_detail([ {packet_name: "", pair_base_unit: ""}])
     setFileEntity([])
   
   
     toast.success("Your response has been Updated successfully")
  })
  .catch(function (error) {
    toast.error("stock unit Entry Is missig")
  
  });


 } 

// upload Stock data 

const UploadStock = ()=>{
 
  var axios = require('axios');
  if(accountvalue === "" || stockvalue === "" || consumptionvalue ===  ""  || unit === "" || quantity_grams === "" ||
  Opening_quantity === "" || packets_detail === ""  )
  {
    setIsValidateAllStates(false)
  }else{
  var data = JSON.stringify({

    "stock_type_id": stockvalue.value,
    "item_name": accountvalue,
    "stock_consumption_id": consumptionvalue.value,
    "stock_unit_id": unit.value,
    "quantity_in_grams": quantity_grams,
    "opening_quantity":Opening_quantity ,
    "descriptions": Description,
    "image": imageEntity.toString(),
    "attachemnts_paths":fileEntity.join(",").toString(),
    "packets_details": packets_detail
      
    
  });
  var config = {
    method: 'post',
    url: 'http://rightway-api.genial365.com/api/Stock/AddStock',
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
    setAccountvalue("") 
    setStockValue("")
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

// Reset files
const reset = () => {
  ref.current.value = "";
};
const reset2 = () => {
  inputRef.current.value = "";
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

const UploadImage = async () => {
  let data = new FormData();
  data.append("UploadedImage", selectedimage);
  await axios.post(`http://rightway-api.genial365.com/api/FileUpload?file_name=${selectedimage.name}`, data).then(res => {
    setImageEntity([...imageEntity, res.data])
      if (res.status === 200) {
          setIsUpload(false);
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
    setIsUpload(false)
	};

    const showNavMenu = useSelector((state) => state.NavState);
// get method of stock type
const GetStock_type = ()=>

{
    var axios = require('axios');
    var data = '';
    
    var config = {
      method: 'get',
      url: 'http://rightway-api.genial365.com/api/Stock/GetStockAccount',
       headers: {
    Authorization: `bearer ${
      JSON.parse(localStorage.getItem("access_token")).access_token
    }`,
  },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      setStockoption(
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
  url: 'http://rightway-api.genial365.com/api/Stock/GetStockConsumtionAccount',
  headers: {
    Authorization: `bearer ${
      JSON.parse(localStorage.getItem("access_token")).access_token
    }`,
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
    Authorization: `bearer ${
      JSON.parse(localStorage.getItem("access_token")).access_token
    }`,
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
.catch(function (error) {
});

    }


    useEffect(() => {
        
        GetStock_type()
        Get_Consumption()
        Get_Unit("http://rightway-api.genial365.com/api/StockUnits/GetData")
        if (location?.state?.id) {
                  FetchDataforEdit(location.state.id)
        }
     
       

    }, []);





    return (
        <>
        <div
        className={` container-fluid right_col  page-title-bar ${showNavMenu === false ? "right_col-margin-remove" : ""
            }   `}
    >
    <CustomInnerHeader moduleName="Stock Management" isShowSelector={true} />
       </div>
       <div
       className={`right_col  h-10 heightFixForFAult  ${showNavMenu === false ? "right_col-margin-remove" : " "
           } `}
       role="main"
   >
   
    <div className="row">
    <div className="col-md-12">
    <div className="x_panel px-0">

     <div className="x_content  p-4  ">
    <span className="section">
        <div className="row px-2  ">
            <div className="col-8 ">
            <i className="fa fa-edit"></i>&nbsp;Add Stock Account
            </div>
        </div>
    </span>
  <div className="form-group">
  {/*row...1*/}
  <div className="row px-4">
    <div className="col-md-6 col-sm-6">
    <label className="col-form-label col-md-3 col-sm-3 label-align"> Stock Type <span className="required">*</span></label>
    <div className='col-md-8'>
    <Select
    isSearchable={true}
    options={stockoption}
    value={stockvalue}
    style={customStyles}
    isDisabled={(location?.state?.id) ? true : false}
    styles={{ minHeight: "29px", height: "29px",}}
    onChange={(e)=>{setStockValue(e)}} 
  
    />
    {!isValidateAllStates && (stockvalue === "" ) && <span className="text-danger">First Select this </span>}  

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
    isDisabled={(location?.state?.id) ? true : false}
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
    {
      isupload ? <div className="spinner-border  text-customOrange " role="status">
          <span className="sr-only">Loading...</span>
      </div> : <button
          disabled={ref?.current?.value === "" ? true : false}
          className="btn btn-sm btn-outline-success " onClick={() => UploadFile()} type="button"><i className="fa fa-upload"></i></button>
  }
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
   
     className="btn btn-sm btn-outline-success" 
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
   


    {fileEntity.length !== 0 && 
      <div className="field item form-group col-md-6 col-sm-6 ">
    <label className="col-form-label col-md-3 col-sm-3 label-align">Attachments</label>
    <div className="col-md-8 col-sm-8  ">
     {fileEntity.map((each_file, index) => {
            return <button className="btn btn-sm  bg-info  text-light"
            >
            <a href={`${endPoint + each_file}`} target="_blank" rel="noopener noreferrer" className='text-light'>
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
 {!isValidateAllStates && ( element.packet_name === "" ) && <span className="text-danger">First Select this </span>} 
 
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
 {!isValidateAllStates && ( element.pair_base_unit === "" ) && <span className="text-danger">First Select this </span>} 
 </div>
 <div className="col-md-3 col-sm-3">

          <i class="fa fa-times pt-2 text-danger" aria-hidden="true" onClick={() => removeFormFields(index)}></i> 
      
   
 
 </div>


 </div> 

 
     
     
     
     </>
  )


 })}


</div>


    <div className="row px-2 ">
 <div className="col-md-12 d-flex justify-content-between x_footer mt-4"> 
 <button className='btn  ms-4 text-white text-right' style={{backgroundColor:"#f79c74"}} onClick={() => addFormFields()}> Add more </button>
 {update ?

(
<button className='btn  ms-4 text-white text-right ' style={{backgroundColor:"#f79c74"}}  
onClick={() =>{UpdateStock(stockid)
  navigation(-1)

} }> Update </button>
):

(
<button className='btn  ms-4 text-white text-right ' style={{backgroundColor:"#f79c74"}}  onClick={() =>UploadStock()}> Submit </button>

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

export default AddStock;
