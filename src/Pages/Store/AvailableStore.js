import React,{useEffect, useState} from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import Loader from '../../Layout/Loader/Loader';

const AvailableStore = () => {

    const showNavMenu = useSelector((state) => state.NavState);
    const navigation = useNavigate();
    const [StoreData, setStoreData] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    
    
    
    
    const Get_StoreAccount = () =>{
    var axios = require('axios');
    var data = '';
    
    var config = {
      method: 'get',
      url: 'http://rightway-api.genial365.com/api/Store/GetStore',
      headers: { 
        'Authorization': 'bearer 7w0PZQkvLOKOdcgw-rPUhjmXi4hklOSKslVKVzQMiDBmtPEcCFHWCYQYji-i37Y3sRMcv3jmAcZiLrer5giGe07bj0C6KOKfaetCES_IdJH_EytRl-YphGc-qAuWm53D-a4-J4biNQbB5e1Aj_yoZWQBl_o7SyFtP02I13-SfXZbESpG-2m6AXJHtzk35Ow0wRl_9_13SiWH0Pe97_rmadYEVNcvHjD27v3fkWpkDcD_pTKN_RHxKsSQrxHPm1XI-_yoSwsbfYD0RNOEKLS3RjfzlWts7EbPkmQZCbBm9IgPjoCwTcPRaMzB-cnD-FKGFuHLZkiT2tmjHIYoI8ZRwVkLWNZGdKPlvjQ3uu9KPcywOKFc6AO8_iPpfBMbf0FSBHbPty_lEjKA0NOLPQ_bZD2q1192qc8cUAUXXdpkugHBIuB5gPeZ2HFl-i82Og3-Autmp5cFWkiZSktF9S1xfVKd2fgL_ySFrOIRlNqcLvFGntpa6SLsDvD4cq9hX43bz7ojMIEAoM6qeVjF_PZJnw'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      setStoreData(response.data)
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
          className={`container-fluid page-title-bar ${showNavMenu === false ? "right_col-margin-remove" : ""
              }   `}
      >
          <span>&nbsp;Store Mangement</span>
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
                                          <th className="column-title  right-border-1 text-center" width="20%"> Name </th>
                                          <th className="column-title  right-border-1 text-center">Code</th>
                                          <th className="column-title  right-border-1 text-center">Unit</th>
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
                                          <td className="text-center">{index+1}</td>
                                          <td className="text-center">{item.store_account.store_account_label}</td>
                                          <td className="text-center">{item.store_account.store_account_code} </td>
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
                          {/* <Modal
                           show={show}
                           size="xl"
                           aria-labelledby="contained-modal-title-vcenter"
                           centered
                           onHide={() => setShow(false)}
                           dialogClassName="modal-100w"
                         >
                           <Modal.Header closeButton>
                             <Modal.Title id="example-custom-modal-styling-title">
                               Stock Management
                               
                             </Modal.Title>
                           </Modal.Header>
                           <Modal.Body>
                            <Stockaccount  data={fetchdata} />
                           </Modal.Body>
                                </Modal>*/}
                        
                      </div>
                      
                      
  
  
  
                  </div>
     
     
     </div>
            
            
            </>
        )}
      
            
        </>
    );
}

export default AvailableStore;

