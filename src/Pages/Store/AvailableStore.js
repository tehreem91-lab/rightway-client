import React,{useEffect, useState} from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import Loader from '../../Layout/Loader/Loader';
import CustomInnerHeader from '../../Components/CustomInnerHeader';

const AvailableStore = () => {

    const showNavMenu = useSelector((state) => state.NavState);
    const navigation = useNavigate();
    const [StoreData, setStoreData] = useState([]);
    const [isLoading, setisLoading] = useState(true);
const [FilterStoreData, setFilterStoreData] = useState([]);
const [reRender, setreRender] = useState(true);
const searchItem = (e) => {
        
    var allData = FilterStoreData;
    
    setStoreData(FilterStoreData);
    var filteredData = allData.filter((obj) => {
        var data = Object.keys(obj)
            .filter((key) => obj[key]?.toString()?.toLowerCase()?.includes(e))
            .reduce((cur, key) => {
                return Object.assign(cur, { [key]: obj[key] });
            }, {});
        if (Object.keys(data).length !== 0) {
            return obj;
        }
    });
    setStoreData(filteredData);
};

  
    
    
    const Get_StoreAccount = () =>{
    var axios = require('axios');
    var data = '';
    
    var config = {
      method: 'get',
      url: 'http://rightway-api.genial365.com/api/Store/GetStore',
      headers: {
        Authorization: `bearer ${
          JSON.parse(localStorage.getItem("access_token")).access_token
        }`,
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      setStoreData(response.data)
      setFilterStoreData(response.data)
      
      console.log(FilterStoreData)
      setisLoading(false)
      
    })
   
    
    }
    
    const Navigation_id =(key)=>{
    
    navigation('/AddStoreAccess',{state:{id:key} })
    
    }
    
    
    
    useEffect(() => {
       Get_StoreAccount()
    }, []);


    return (

        <>

        {isLoading? (
            <Loader/>
        ):(
          <>
          <div
          className={`container-fluid right_col  page-title-bar ${showNavMenu === false ? "right_col-margin-remove" : ""
              }   `}
      >
      <CustomInnerHeader moduleName="Store Management" isShowSelector={true} />
         </div>
         
         <div
         className={`right_col  h-10 heightFixForFAult  ${showNavMenu === false ? "right_col-margin-remove" : " "
             } `}
         role="main"
     >
     
     <div className="x_panel  ">
                      <div className="x_content">
                          <span className="section pl-3">
                              <div className="row   pt-3">
                                  <div className="col-6">
                                      <i className='fa fa-list'></i>&nbsp;Listing
                                  </div>
                                  <div className="col-6 ">
                                  <div className='col-md-6 text-right'>
                                  <label>search:</label>
                                  </div>
                                  <div className='col-md-6 text-right'>
                                  <input
                                  className="form-control"
                                  type="text"
                                  placeholder='seach ...'
                                  onChange={(e) => searchItem(e.target.value)}
                                  />
                                  </div>
                                   
                                    
                                
                                  </div>
                              </div>
                          </span>
                          <div className="table-responsive px-3 pb-2" style={{ overflow: 'scroll' ,height: '400px'}}>
                              <table className="table table-striped jambo_table bulk_action">
                                  <thead   style={{position: 'sticky', top: '0',zIndex: '1'}}>
                                      <tr className="headings reportTableHead">
                                      <th className="column-title  right-border-1 text-center" width="10%"> Sr. </th>
                                          <th className="column-title  right-border-1 text-center" width="14%"> Name </th>
                                          <th className="column-title  right-border-1 text-center" width="24%">Code</th>
                                          <th className="column-title  right-border-1 text-center" width="10%">Unit</th>
                                          <th className="column-title text-center" width="10%">
                                              Action
                                          </th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                  {StoreData.map((item,index)=>{
  
                                      return(
  
                                          <>
                                          <tr className="even pointer"  >
                                          <td className="">{index+1}</td>
                                          <td className="">{item.store_account.store_account_label}</td>
                                          <td className="">{item.store_account.store_account_code} </td>
                                          <td className="text-center">{item.store_account.store_unit_name} </td>
                                          <td
                                              className="a-right a-right     text-center"
                                          >
                                              <i
                                                  className="fa fa-edit pl-3"
                                                  // data-toggle="modal" data-target=".bd-example-modal-xl"
                                                  onClick={()=>Navigation_id(item.store_info_id)}
                                                  
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
        )}
      
            
        </>
    );
}

export default AvailableStore;

