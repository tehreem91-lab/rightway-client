import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux';
import ReactToPrint from 'react-to-print';
import { endPoint } from '../../../../config/Config.js';
import PayableReceivableReciept from './PayableReceivableReciept.js'
import CustomInnerHeader from '../../../../Components/CustomInnerHeader'
import Loader from '../../../../Layout/Loader/Loader'
const PayableReceivableReport = () => {
    const [isLoading, setIsLoading] = useState(true)

    const showNavMenu = useSelector((state) => state.NavState);

    const componentRef = useRef();
    const [getPayable, setGetPayable] = useState([])
    const [getReceivable, setGetReceivable] = useState([])

    const fetchData = () => {
        var axios = require('axios');

        var config = {
            method: 'get',
            url: `${endPoint}api/RecPayReport/GetReport`,
            headers: {
                'Authorization': `bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
            }
        };

        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setGetPayable(response.data.payable_amount)
                    setGetReceivable(response.data.receiveable_amount)
                    setIsLoading(false)

                }
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    useEffect(() => {
        fetchData()

    }, [])



    return (
        <>



            {isLoading ? (
             <Loader/>
            ) : (
                <>
                    <div
                        className={`container-fluid page-title-bar ${showNavMenu == false ? "right_col-margin-remove" : ""
                            }   `}
                    >
                        <CustomInnerHeader moduleName="Payable Receivable Report" isShowSelector={false} />
                    </div>
                    <div
                        className={`right_col  h-10 heightFixForFAult  ${showNavMenu == false ? "right_col-margin-remove" : " "
                            } `}
                        role="main"
                    >

                        <div className="row">
                            <div className="col-md-12">
                                <div className="x_panel px-0">
                                    <div className="x_content ">
                                        <span className="section mb-0 pb-1">
                                            <div className="row pl-2 ">
                                                <div className="col-5 ">
                                                    <i className='fa fa-list'></i>&nbsp;Report Data
                                                </div>
                                                <div className="col-7 text-right px-0 ">
                                                    <div className="col-md-5"> </div>
                                                    <div className="col-md-4  text-left "> </div>
                                                    <div className="col-md-3 pr-4">
                                                        <ul className="mr-3 nav navbar-right panel_toolbox d-flex justify-content-end">
                                                            <li>
                                                                <ReactToPrint
                                                                    trigger={() => {
                                                                        return (
                                                                            <button className="btn btn-sm btn-success borderRadiusRound">
                                                                                <i className="fa fa-print"></i>
                                                                            </button>
                                                                        );
                                                                    }}
                                                                    content={() => componentRef.current}
                                                                    documentTitle="new docs"
                                                                    pageStyle="print"
                                                                />
                                                            </li>
                                                            <li>
                                                                <button
                                                                    className="btn btn-sm btn-primary borderRadiusRound"
                                                                    onClick={() => console.log("print")}
                                                                >
                                                                    <i className="fa fa-file-pdf-o" aria-hidden="true"></i>
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>

                                            </div>
                                        </span>


                                    </div>
                                    <div className="clearfix" />
                                    <PayableReceivableReciept ref={componentRef} getPayable={getPayable} getReceivable={getReceivable} />

                                </div>




                            </div>
                            <div className="col-md-8 px-0">

                            </div>
                        </div>
                    </div>
                </>
            )}

        </>
    )
}

export default PayableReceivableReport