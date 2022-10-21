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
    const fetchData = () => {
        var axios = require('axios');

        var config = {
            method: 'get',
            url: "http://rightway-api.genial365.com/api/Product/GetProduct",
            headers: {
                'Authorization': 'Bearer wMxdleUk-ZhHC2QAxte0dLEyHUnUGoKHNOdRalFYVYvLlWTMMgGNYyJEpa3WiyVdOipdhCUHc6-7U_07tsd8RPYMfcMU3DgAMeYVtiJSkI9LMJlq-mT0lwg94tYRhdnX9Dd1ui_uN0iyglhAz4CTygiHcrQKH0lzEhPZCRGO4qSpJjVuhYmZbnV_jLiP6q3WzbWL_uB9AvLSiKDmNysYVKMTw-sM0SzaTZ0QsQchpw6EigJ4Aat5mqHOV8KyuueTBZTVWOpYBR6r7ul1RK0IBfc2g8TpXIr4EbyyddKEFC8eprWIzNMOA8s-7TQoGUUZk3qQCGG8UgHzyX_mjzr6KD14CXVgS7T_gbUi9ELHIoYfgccorQbUN9v5ann4kQXpwYWjRsRkQnnrQk6uJrwRYe_rTBo374jtmW5opg77FgBRVTbXeUCaaNTdLFKs4grYCNzCk43tCUhV6-q7uUkgxU-BqpQcPrrJTHrruJMOgufR9KTfPrvUPlMC984k7LovM8pHTs-Dy9MwptZPQopGig'
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


        fetchData()

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
                                    <thead>
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