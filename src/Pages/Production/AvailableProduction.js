import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from '../../Layout/Loader/Loader';
import CustomInnerHeader from '../../Components/CustomInnerHeader';
const AvailableProduction = () => {
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate();
    const showNavMenu = useSelector((state) => state.NavState);
    const [Prodata, setProdata] = useState([]);
    const Editform = (Recid) => {
        navigate('/CreateProduct', { state: { id: Recid, flag: true } })
    }
    const tabledata = () => {
        var axios = require('axios');

        var config = {
            method: 'get',
            url: "http://rightway-api.genial365.com/api/Product/GetProduct",
            headers: {
                'Authorization': `bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`
            }
        };

        axios(config)
            .then(function (response) {
                setIsLoading(false)
               
                setProdata(response.data)
            })
            .catch(function (error) {
               
            })
    }
    useEffect(() => {


        tabledata()

    }, [])

    return (
        <>
            {isLoading ? (
                <Loader style={{ margin: "0px !important" }} />
            ) : (<> <div className={`container-fluid page-title-bar ${showNavMenu == false ? "right_col-margin-remove" : ""}   `} >
            <CustomInnerHeader moduleName={"Production Table"} isShowSelector={true}/>
            </div>
                <div role="main" className={`right_col  h-100  ${showNavMenu === false ?
                    "right_col-margin-remove" : " "} `}>

                    <div className="x_panel  ">
                        <div className="x_content">
                            <span className="section pl-3">
                                <div className="row   pt-3">
                                    <div className="col-3">
                                        <i className='fa fa-list'></i>&nbsp;Product
                                    </div>
                                    <div className="col-9 text-right ">
                                    </div>
                                </div>
                            </span>
                            <div className="table-responsive px-3 pb-2" style={{ height: '400px' }}>
                                <table className="table table-striped jambo_table bulk_action ">
                                    <thead  style={{position: 'sticky', top: '0',zIndex: '1'}}>
                                        <tr className="headings">
                                            <th className="column-title  right-border-1 text-center" width="10%"> Sr. </th>


                                            <th className="column-title   right-border-1 text-center" >
                                                Name
                                            </th>

                                            <th className="column-title   right-border-1 text-center" >
                                                Code
                                            </th>
                                            <th className="column-title   right-border-1 text-center" >
                                                Barcode
                                            </th>
                                            {/* <th className="column-title   right-border-1 text-center" >
                                            Unit
                                        </th> */}
                                            <th className="column-title   right-border-1 text-center" >
                                                Edit/Delete
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {Prodata?.map((data, id) => (
                                            <tr key={id} className="even pointer text-center">
                                                <td>{id + 1}</td>
                                                <td className=" ">{data.product_account.product_account_label}</td>
                                                <td className=" ">{data.product_account.product_account_code}</td>
                                                <td className=" ">{data.product_bare_code}</td>
                                                {/* <td className=" ">{data.product_account.product_unit_id}</td> */}
                                                <td >
                                                    {/* Delete button */}

                                                    <i className="fa fa-trash-o btn " style={{ color: 'red' }}>
                                                    </i>
                                                    <i className="fa fa-edit" style={{ color: 'blue' }} variant="primary" onClick={() => Editform(data.product_id)} ></i>
                                                </td>
                                            </tr>))}







                                    </tbody>
                                </table>


                            </div>
                        </div>
                    </div>

                </div></>)}
        </>
    )
}

export default AvailableProduction