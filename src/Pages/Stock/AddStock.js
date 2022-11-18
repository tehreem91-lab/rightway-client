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
     const [imgsrc, setImgsrc] = useState('')
     const [imgPreview, setimgPreview] = useState(false)
     const [imguploader, setimguploader] = useState(false)
     const [Stockdata, setStockdata] = useState([]);
     const [isLoading, setisLoading] = useState(true);

     const [FilterStockData, setFilterStockData] = useState([]);

const searchItem = (e) => {

    var allData = FilterStockData;
    setStockdata(FilterStockData);
    var filteredData = allData.filter((obj) => {
        var data = Object.keys(obj.stock_account)
            .filter((key) => obj.stock_account[key].toString().toLowerCase().includes(e))
            .reduce((cur, key) => {
                return Object.assign(cur, { [key]: obj.stock_account[key] });
            }, {});
        if (Object.keys(data).length !== 0) {
            return obj;
        }
    });
    setStockdata(filteredData);
};
     
     
     
     
     const Get_Stockaccount = () =>{
     var axios = require('axios');
     var data = '';
     
     var config = {
       method: 'get',
       url: 'http://rightway-api.genial365.com/api/Stock/GetStock',
       headers: {
         Authorization: `bearer ${
           JSON.parse(localStorage.getItem("access_token")).access_token
         }`,
       },
       data : data
     };
     
     axios(config)
     .then(function (response) {
       setStockdata(response.data)
       setFilterStockData(response.data)
       setisLoading(false)
       
     })
     .catch(function (error) {
     });
     
     }
     
    //  const Navigation_id =(key)=>{
     
    //  navigation('/StockAccountAccess',{state:{id:key} })
     
    //  }

 

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
     Get_Stockaccount()
     setupdate(false)
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
     setImageEntity([])
     Get_Stockaccount()
     setimgPreview(false)
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
  setimguploader(true)
  const options = {
      onUploadProgerss: (progressEvent) => {
          const { loaded, total } = progressEvent;
          let percentage = Math.floor((loaded * 100) / total)
          console.log(`${loaded}bytes of ${total}bytes | ${percentage}%`);
      }
  }
  let data = new FormData();
  data.append("UploadedImage", selectedimage);
  await axios.post(`http://rightway-api.genial365.com/api/FileUpload?file_name=${selectedimage.name}`,  data, options).then(res => {
    setImageEntity([...imageEntity, res.data])
      if (res.status === 200) {
         setimgPreview(true)
         setimguploader(false)
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

    const cancel = ()=>{
      setAccountvalue("") 
      setStockValue("")
      setConsumptionValue("")
       setUnit("")
       setDescription("")
       setOpening_quantity("")
       setQuantity_grams("")
       setpackets_detail([ {packet_name: "", pair_base_unit: ""}])
       setFileEntity([])
       Get_Stockaccount()
     setImageEntity([])
     setimgPreview(false)


    }


    useEffect(() => {
        
        GetStock_type()
        Get_Consumption()
        Get_Unit("http://rightway-api.genial365.com/api/StockUnits/GetData")
        // if (location?.state?.id) {
        //           FetchDataforEdit(location.state.id)
        // }
     
        Get_Stockaccount()

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
    styles={customStyles}
    isDisabled={(location?.state?.id) ? true : false}
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
    styles={customStyles}
    isDisabled={(location?.state?.id) ? true : false}
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
    styles={customStyles}
    onChange={(e)=>{setAccountvalue(e.target.value)}}
    />
    {!isValidateAllStates && (accountvalue === "" ) && <span className="text-danger">First Select this </span>}
    </div>
  
    </div>
    <div className="col-md-6 col-sm-6">
    <label className="col-form-label col-md-4 col-sm-4 label-align"> Quantity in grams <span className="required">*</span></label>
    <div className='col-md-8'>
    <input
    type="number"
    min="0"
    className="form-control"
    value={quantity_grams}
    styles={customStyles}
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
    styles={customStyles}
    onChange={(e)=>{setUnit(e)}}
    />
    {!isValidateAllStates && (unit === "" ) && <span className="text-danger">First Select this </span>} 
    </div>
  
    </div>
    <div className="col-md-6 col-sm-6">
    <label className="col-form-label col-md-4 col-sm-4 label-align"> Opening Quantity <span className="required">*</span></label>
    <div className='col-md-8'>
    <input
    type='number'
    min="0"
    className="form-control"
    value={Opening_quantity}
    styles={customStyles}
    onChange={(e)=>{setOpening_quantity(e.target.value)}}
    />
    {!isValidateAllStates && (Opening_quantity === "" ) && <span className="text-danger">First Select this </span>} 
    </div>
  
    </div>
     </div>

     <div className="row px-4 mt-2">
     <div className="col-md-6 col-sm-6">
    <label className="col-form-label col-md-3 col-sm-3 label-align">  Attachments </label>
    <div className='col-md-7'>
    <input 
    ref={ref}
    type="file"
    className="form-control form-control-sm customStyleForInput"
    data-validate-length-range={6}
    data-validate-words={2}
    styles={customStyles}
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
    <div className='col-md-7'>
    <input  
    type="file"
    className="form-control form-control-sm customStyleForInput"
    data-validate-length-range={6}
    data-validate-words={2}
    name="name"
    accept="image/*"
    ref={inputRef}
    styles={customStyles}
    onChange={(e)=>
     
      {
       
        setImgsrc(URL.createObjectURL(e.target.files[0]));
        setSelectedImage(e.target.files[0]);

      }
  
  } 
   
    />
   
    <div >
   
    </div>
    </div>
    <div className="col-md-1  " style={{ paddingTop: "1.5px" }}>
    
    {
      imguploader ? <div className="spinner-border  text-customOrange " role="status">
          <span className="sr-only">Loading...</span>
      </div> : <button
          disabled={inputRef?.current?.value === "" ? true : false}
          className="btn btn-sm btn-outline-success " onClick={() => UploadImage()} type="button"><i className="fa fa-upload"></i></button>
  }
  </div>
  <div className="col-md-2  " style={{ paddingTop: "1.5px" }}>
    
  {(imgPreview) ? (
    
    <img className="my-0" width="50" height="35"src={imgsrc} />
  
  
    
    ) : null}
  </div>
    
  
    </div>
    </div>

    {/*attachments*/}

    <div className="row px-4 mt-2">
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
    <div className="col-md-6 col-sm-6">
     <div className='col-md-4'></div>
     <div className='col-md-6'>
     
     </div>
   </div>
   
   </div>

   
     <span className="section mt-4">
     <div className="row px-2  ">
         <div className="col-8 ">
         <i className="fa fa-edit"></i>&nbsp;Add Stock Packets
         </div>
     </div>
 </span>
 <div className='row'>
 <div className="col-md-12 ">
 <table className="table table-striped jambo_table bulk_action ">
       <thead >
         <tr className="headings reportTableHead">
           <th className="column-title   ">Packet Name</th>
           <th className="column-title   ">Pair Base unit</th>
           <th className="column-title   ">&nbsp;</th>
         
         </tr>
       </thead>
<tbody>
{packets_detail.map((element,index)=>{

  return(

     <>
<tr>
<td>
<input
type="text"
className="form-control"
name='packet_name'

value={element.packet_name} onChange={e => handleChange(index, e)}
/>
{!isValidateAllStates && ( element.packet_name === "" ) && <span className="text-danger">First Select this </span>} 

</td>
<td>
<input
 type="number"
 className="form-control"
 name='pair_base_unit'
 min="0"
 value={element.pair_base_unit} onChange={e => handleChange(index, e)}
 />
 {!isValidateAllStates && ( element.pair_base_unit === "" ) && <span className="text-danger">First Select this </span>} 

</td>
<td>
<i class="fa fa-times pt-2 text-danger" aria-hidden="true" onClick={() => removeFormFields(index)}></i> 
</td>
</tr>
 </>
  )


 })}


</tbody>

       </table>
       </div>
 </div>
<div className="row px-2 ">
 <div className="col-md-12 d-flex justify-content-between x_footer mt-4"> 
 <button className='btn  ms-4 text-white text-right' style={{backgroundColor:"#f79c74"}} onClick={() => addFormFields()}> Add Line </button>

 {update ?

(
  <>
  <div>
  <button className='btn  ms-4 text-white text-right bg-customBlue '  onClick={() =>cancel()}> Cancel </button>
  <button className='btn  ms-4 text-white text-right ' style={{backgroundColor:"#f79c74"}}  
onClick={() =>{UpdateStock(stockid)
  // navigation(-1)

} }> Update </button>
  </div>
  </>

):

(
<>
<div>
<button className='btn  ms-4 text-white text-right bg-customBlue '  onClick={() =>cancel()}> Cancel </button>

<button className='btn  ms-4 text-white text-right ' style={{backgroundColor:"#f79c74"}}  onClick={() =>UploadStock()}> Submit </button>
</div>

</>

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
   <div className="x_panel  ">
                        <div className="x_content">
                            <span className="section pl-3">
                                <div className="row   pt-3">
                                    <div className="col-6">
                                        <i className='fa fa-list'></i>&nbsp;Listing
                                    </div>
                                    <div className="col-md-6 ">
                                    <div className='col-md-6 text-right'>
                                    
                                    </div>
                                    <div className='col-md-6 text-right'>
                                    <input
                                    className="form-control"
                                    type="text"
                                    placeholder='Search ...'
                                    onChange={(e) => searchItem(e.target.value)}
                                    />
                                    </div>
                                     
                                      
                                  
                                    </div>
                                </div>
                            </span>
                            <div className="table-responsive px-3 pb-2" style={{ overflow: 'scroll' ,height: '400px'}} >
                                <table className="table table-striped jambo_table bulk_action"  >
                                    <thead  style={{position: 'sticky', top: '0',zIndex: '1'}}>
                                        <tr className="headings reportTableHead">
                                        <th className="column-title  right-border-1 text-center" width="10%"> Sr. </th>
                                            <th className="column-title  right-border-1 text-center" width="20%"> Name </th>
                                            <th className="column-title  right-border-1 text-center" width="20%">Code</th>
                                            <th className="column-title  right-border-1 text-center" width="10%">Unit</th>
                                            <th className="column-title text-center" width="10%">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {Stockdata.map((item,index)=>{
    
                                        return(
    
                                            <>
                                            <tr className="even pointer"  >
                                            <td >{index+1}</td>
                                            <td className="">{item.stock_account.stock_account_label}</td>
                                            <td className="">{item.stock_account.stock_account_code} </td>
                                            <td className="text-center">{item.stock_account.stock_unit_name} </td>
                                            <td
                                                className="a-right a-right     text-center"
                                            >
                                                <i
                                                    className="fa fa-edit pl-3"
                                                    // data-toggle="modal" data-target=".bd-example-modal-xl"
                                                    onClick={()=>FetchDataforEdit(item.stock_info_id)}
                                                    
                                                ></i>
                                                <i
                                                    className="fa fa-trash-o pl-3"
                                                ></i>
                                            </td>
                                        </tr>
                                            
                                            
                                            </>
                                        )
    
    
                                    })}
                                       
                                       
                                    </tbody>
                                </table>
                             </div>
                           
                          
                        </div>
                         </div>
   </div>
        </>
    );
}

export default AddStock;
