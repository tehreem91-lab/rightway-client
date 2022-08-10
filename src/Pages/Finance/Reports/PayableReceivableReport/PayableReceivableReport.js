import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const PayableReceivableReport = () => {
    const [isLoading, setIsLoading] = useState(false)

    const showNavMenu = useSelector((state) => state.NavState);
    return (
        <>

            <>
                <div
                    className={`container-fluid page-title-bar ${showNavMenu == false ? "right_col-margin-remove" : ""
                        }   `}
                >
                    <span>&nbsp; Branches Management</span>
                </div>
                {isLoading ? (
                    <>loading</>
                ) : (
                    <>
                        {" "}
                        <div
                            role="main"
                            className={`right_col  h-100  ${showNavMenu === false ? "right_col-margin-remove" : " "
                                } `}
                        >


                            <div className="x_panel  ">
                                <div className="x_content">
                                    <span className="section pl-3">
                                        <div className="row   pt-3">
                                            <div className="col-3">
                                                <i className="fa fa-list"></i>&nbsp;Listing
                                            </div>
                                            <div className="col-9 text-right "></div>
                                        </div>
                                    </span>

                                    <div className="table-responsive px-3 pb-2">
                                        <table className="table table-striped jambo_table bulk_action">
                                            <thead>
                                                <tr className="headings">
                                                    <th
                                                        className="column-title  right-border-1 text-center"
                                                        width="10%"
                                                    >
                                                        Sr.
                                                    </th>
                                                    <th className="column-title  right-border-1 text-center">
                                                        User
                                                    </th>
                                                    <th className="column-title  right-border-1 text-center">
                                                        Assign Branches
                                                    </th>
                                                    <th className="column-title text-center" width="10%">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody>

                                                <tr className="even pointer" >
                                                    <td className=" ">1</td>
                                                    <td className=" ">asd</td>
                                                    <td className=" ">
                                                        we
                                                    </td>
                                                    <td className="a-right a-right     text-center">
                                                        asd
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </>

        </>
    )
}

export default PayableReceivableReport