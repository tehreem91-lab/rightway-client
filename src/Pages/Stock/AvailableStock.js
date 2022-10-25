import React,{useEffect, useState} from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import Loader from '../../Layout/Loader/Loader';
import CustomInnerHeader from '../../Components/CustomInnerHeader';
const AvailableStock = () => {
    const showNavMenu = useSelector((state) => state.NavState);
const navigation = useNavigate();
const [Stockdata, setStockdata] = useState([]);
const [isLoading, setisLoading] = useState(true);




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
  setisLoading(false)
  
})
.catch(function (error) {
});

}

const Navigation_id =(key)=>{

navigation('/StockAccountAccess',{state:{id:key} })

}



useEffect(() => {
   Get_Stockaccount()
}, []);

    return (

        <>
        {isLoading?(
            <Loader/>
        ):(
            <>
            <div
            className={`right_col container-fluid  page-title-bar ${showNavMenu === false ? "right_col-margin-remove" : ""
                }   `}
        >
        <CustomInnerHeader moduleName="Stock Managment" isShowSelector={true} />
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
                            <div className="table-responsive px-3 pb-2" style={{ overflow: 'scroll' ,height: '400px'}}>
                                <table className="table table-striped jambo_table bulk_action"  >
                                    <thead>
                                        <tr className="headings">
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
                                                    onClick={()=>Navigation_id(item.stock_info_id)}
                                                    
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

export default AvailableStock;

