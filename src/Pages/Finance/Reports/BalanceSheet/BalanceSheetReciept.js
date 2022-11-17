import React from "react";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const BalanceSheetReciept = React.forwardRef(
    (
        { dateFrom, dateTo, reportDataAssets, reportDataLiabilities, levelValue },
        ref
    ) => {
        return (
            <div>
                <div className="x_content px-0  mb-3" >
                    <Tabs style={{backgroundColor:'white'}}
                        defaultActiveKey="profile"
                        id="justify-tab-example"
                        className="mb-3"
                        justify
                    >
                        {" "}
                        <Tab eventKey="profile" title="Assets" disabled>
                            <div className="row" ref={ref} >
                                <div className="col-md-6 px-0">
                                    <div className="div_to_print_income">
                                    <div className="displayPropertyForPrint">
                                    <h2 className="text-dark text-center font-weight-bold  ">
                                       Balance Sheet Reciept
                                    </h2>
                                    <div className="row pb-2">
                                        <div className="col-md-4 col-4 text-dark text-center ">
                                            {" "}
                                            Date To:{" "}
                                            <strong className="text-dark  font-weight-bold ">
                                                {" "}
                                                {dateTo}
                                            </strong>{" "}
                                        </div>
                                        
                                    </div>
                                </div>

                                        <div className="row mx-3   bottom-border-1 bg-customBlue text-light">
                                            <div className="  col-md-6   col-4    font-size-12    text-left  my-1">
                                                <b> Account Title</b>
                                            </div>
                                            <div className="  col-md-6  col-8    font-size-12     text-center  my-1">
                                                <div className="row">
                                                    <div className="col-md-4"></div>
                                                    <div className="col-md-4"></div>
                                                    <div className="col-md-4">
                                                        <div className="col-md-12  text-right">Amount</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" ">
                                            {reportDataAssets.map((each_level_1) => {
                                                return (
                                                    <>
                                                        <div
                                                            className={`row mx-3 ${levelValue.value >= 1 ? "" : "d-none"
                                                                }  bottom-border-1  text-dark  `}
                                                            style={{ backgroundColor: "#fd8b5a" }}
                                                        >
                                                            <div className="  col-md-6   col-4    font-size-12 pl-1   text-left  ">
                                                                {each_level_1.category_name}
                                                            </div>
                                                            <div className="  col-md-6  col-8    font-size-12     text-center  my-1">
                                                                <div className="row">
                                                                    <div className="col-md-6"></div>

                                                                    <div className="col-md-6">
                                                                        <div className="col-md-12  text-right">
                                                                            {(Number(each_level_1.calculated_credit)).toFixed(2)}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {each_level_1.children.map((each_level_2) => {
                                                            return (
                                                                <>
                                                                    <div
                                                                        className={`row mx-3 ${levelValue.value >= 2 ? "" : "d-none"
                                                                            }  bottom-border-1  text-dark`}
                                                                        style={{ backgroundColor: "#f7ab8b" }}
                                                                    >
                                                                        <div className="  col-md-6   col-4    font-size-12  pl-2   text-left  my-1">
                                                                            {each_level_2.category_name}
                                                                        </div>
                                                                        <div className="  col-md-6  col-8    font-size-12     text-center  my-1">
                                                                            <div className="row">
                                                                                <div className="col-md-6"></div>
                                                                                <div className="col-md-6">
                                                                                    <div className="col-md-12  text-right">
                                                                                        {(Number(each_level_2.calculated_credit)).toFixed(2)}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {each_level_2.children.map((each_level_3) => {
                                                                        return (
                                                                            <>
                                                                                <div
                                                                                    className={`row mx-3 ${levelValue.value >= 3
                                                                                        ? ""
                                                                                        : "d-none"
                                                                                        }  bottom-border-1  text-dark`}
                                                                                    style={{ backgroundColor: "#ffbca0" }}
                                                                                >
                                                                                    <div className="  col-md-6   col-4    font-size-12   pl-3  text-left  my-1">
                                                                                        {each_level_3.category_name}
                                                                                    </div>
                                                                                    <div className="  col-md-6  col-8    font-size-12     text-center  my-1">
                                                                                        <div className="row">
                                                                                            <div className="col-md-6"></div>
                                                                                            <div className="col-md-6">
                                                                                                <div className="col-md-12  text-right">
                                                                                                    {(Number(each_level_3.calculated_credit)).toFixed(2)}
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                {each_level_3.children.map(
                                                                                    (each_level_4) => {
                                                                                        return (
                                                                                            <>
                                                                                                <div
                                                                                                    className={`row mx-3 ${levelValue.value >= 4
                                                                                                        ? ""
                                                                                                        : "d-none"
                                                                                                        }  bottom-border-1  text-dark`}
                                                                                                    style={{
                                                                                                        backgroundColor: "#ffcbb5",
                                                                                                    }}
                                                                                                >
                                                                                                    <div className="  col-md-6   col-4    font-size-12   pl-4  text-left  my-1">
                                                                                                        {each_level_4.category_name}
                                                                                                    </div>
                                                                                                    <div className="  col-md-6  col-8    font-size-12     text-center  my-1">
                                                                                                        <div className="row">
                                                                                                            <div className="col-md-6"></div>
                                                                                                            <div className="col-md-6">
                                                                                                                <div className="col-md-12  text-right">
                                                                                                                    {(Number(each_level_4.calculated_credit)).toFixed(2)}
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                                {each_level_4.children.map(
                                                                                                    (each_level_5) => {
                                                                                                        return (
                                                                                                            <>
                                                                                                                <div
                                                                                                                    className={`row mx-3 ${levelValue.value ===
                                                                                                                        5
                                                                                                                        ? ""
                                                                                                                        : "d-none"
                                                                                                                        }  bottom-border-1  text-dark`}
                                                                                                                    style={{ backgroundColor: "#ffe4d9", }}
                                                                                                                >
                                                                                                                    <div className="  col-md-6   col-4   pl-5  font-size-12    text-left  my-1">
                                                                                                                        {
                                                                                                                            each_level_5.account_name
                                                                                                                        }
                                                                                                                    </div>
                                                                                                                    <div className="  col-md-6  col-8    font-size-12     text-center  my-1">
                                                                                                                        <div className="row">
                                                                                                                            <div className="col-md-4"></div>
                                                                                                                            <div className="col-md-4"></div>
                                                                                                                            <div className="col-md-4">
                                                                                                                                <div className="col-md-12  text-right">
                                                                                                                                    {(Number(each_level_5.current_credit)).toFixed(2)}   </div>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </>
                                                                                                        );
                                                                                                    }
                                                                                                )}
                                                                                            </>
                                                                                        );
                                                                                    }
                                                                                )}
                                                                            </>
                                                                        );
                                                                    })}

                                                                </>
                                                            );
                                                        })}
                                                        <div className="row mx-3   bottom-border-1 bg-customBlue text-light">
                                                            <div className="  col-md-6   col-4    font-size-12    text-left  my-1">
                                                                <b> Total</b>
                                                            </div>
                                                            <div className="  col-md-6  col-8    font-size-12     text-center  my-1">
                                                                <div className="row">
                                                                    <div className="col-md-4"></div>
                                                                    <div className="col-md-4"></div>
                                                                    <div className="col-md-4">
                                                                        <div className="col-md-12  text-right">  {(Number(each_level_1.calculated_credit)).toFixed(2)}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                );
                                            })}
                                        </div>


                                    </div>
                                </div>
                                <div className="col-md-6 px-0">
                                    <div className="div_to_print_income">
                                        <div className="displayPropertyForPrint d-none">
                                            <h2 className="text-dark text-center font-weight-bold  ">
                                                Ladger Report
                                            </h2>
                                            <div className="row pb-2">
                                                <div className="col-md-4 col-4 text-dark text-center ">
                                                    {" "}
                                                    Date From:{" "}
                                                    <strong className="text-dark  font-weight-bold ">
                                                        {" "}
                                                        {dateFrom}
                                                    </strong>{" "}
                                                </div>
                                                <div className="col-md-4 col-4 text-dark  text-center">
                                                    {" "}
                                                    Date To :{" "}
                                                    <strong className="text-dark  font-weight-bold ">
                                                        {" "}
                                                        {dateTo}
                                                    </strong>{" "}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mx-3   bottom-border-1 bg-customBlue text-light">
                                            <div className="  col-md-6   col-4    font-size-12    text-left  my-1">
                                                <b> Account Title</b>
                                            </div>
                                            <div className="  col-md-6  col-8    font-size-12     text-center  my-1">
                                                <div className="row">
                                                    <div className="col-md-4"></div>
                                                    <div className="col-md-4"></div>
                                                    <div className="col-md-4">
                                                        <div className="col-md-12  text-right">Amount</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {reportDataLiabilities.map((each_level_1) => {
                                            return (
                                                <>
                                                    <div
                                                        className={`row mx-3 ${levelValue.value >= 1 ? "" : "d-none"
                                                            }  bottom-border-1  text-dark`}
                                                        style={{ backgroundColor: "#fd8b5a" }}
                                                    >
                                                        <div className="  col-md-6   col-4    font-size-12 pl-1   text-left  my-1">
                                                            {each_level_1.category_name}
                                                        </div>
                                                        <div className="  col-md-6  col-8    font-size-12     text-center  my-1">
                                                            <div className="row">
                                                                <div className="col-md-6"></div>
                                                                <div className="col-md-6">
                                                                    <div className="col-md-12  text-right">
                                                                        {(Number(each_level_1.calculated_debit)).toFixed(2)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {each_level_1.children.map((each_level_2) => {
                                                        return (
                                                            <>
                                                                <div
                                                                    className={`row mx-3 ${levelValue.value >= 2 ? "" : "d-none"
                                                                        }  bottom-border-1  text-dark`}
                                                                    style={{ backgroundColor: "#f7ab8b" }}
                                                                >
                                                                    <div className="  col-md-6   col-4    font-size-12  pl-2   text-left  my-1">
                                                                        {each_level_2.category_name}
                                                                    </div>
                                                                    <div className="  col-md-6  col-8    font-size-12     text-center  my-1">
                                                                        <div className="row">
                                                                            <div className="col-md-6"></div>
                                                                            <div className="col-md-6">
                                                                                <div className="col-md-12  text-right">
                                                                                    {(Number(each_level_2.calculated_debit)).toFixed(2)}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {each_level_2.children.map((each_level_3) => {
                                                                    return (
                                                                        <>
                                                                            <div
                                                                                className={`row mx-3 ${levelValue.value >= 3 ? "" : "d-none"
                                                                                    }  bottom-border-1  text-dark`}
                                                                                style={{ backgroundColor: "#ffbca0" }}
                                                                            >
                                                                                <div className="  col-md-6   col-4    font-size-12   pl-3  text-left  my-1">
                                                                                    {each_level_3.category_name}
                                                                                </div>
                                                                                <div className="  col-md-6  col-8    font-size-12     text-center  my-1">
                                                                                    <div className="row">
                                                                                        <div className="col-md-6"></div>
                                                                                        <div className="col-md-6">
                                                                                            <div className="col-md-12  text-right">
                                                                                                {(Number(each_level_3.calculated_debit)).toFixed(2)}
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            {each_level_3.children.map(
                                                                                (each_level_4) => {
                                                                                    return (
                                                                                        <>
                                                                                            <div
                                                                                                className={`row mx-3 ${levelValue.value >= 4
                                                                                                    ? ""
                                                                                                    : "d-none"
                                                                                                    }  bottom-border-1  text-dark`}
                                                                                                style={{
                                                                                                    backgroundColor: "#ffcbb5",
                                                                                                }}
                                                                                            >
                                                                                                <div className="  col-md-6   col-4    font-size-12   pl-4  text-left  my-1">
                                                                                                    {each_level_4.category_name}
                                                                                                </div>
                                                                                                <div className="  col-md-6  col-8    font-size-12     text-center  my-1">
                                                                                                    <div className="row">
                                                                                                        <div className="col-md-6"></div>
                                                                                                        <div className="col-md-6">
                                                                                                            <div className="col-md-12  text-right">
                                                                                                                {(Number(each_level_4.calculated_debit)).toFixed(2)}
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            {each_level_4.children.map(
                                                                                                (each_level_5) => {
                                                                                                    return (
                                                                                                        <>
                                                                                                            <div
                                                                                                                className={`row mx-3 ${levelValue.value === 5
                                                                                                                    ? ""
                                                                                                                    : "d-none"
                                                                                                                    }  bottom-border-1  text-dark`}
                                                                                                                style={{
                                                                                                                    backgroundColor:
                                                                                                                        "#ffe4d9",
                                                                                                                }}
                                                                                                            >
                                                                                                                <div className="  col-md-6   col-4   pl-5  font-size-12    text-left  my-1">
                                                                                                                    {
                                                                                                                        each_level_5.account_name
                                                                                                                    }
                                                                                                                </div>
                                                                                                                <div className="  col-md-6  col-8    font-size-12     text-center  my-1">
                                                                                                                    <div className="row">
                                                                                                                        <div className="col-md-6"></div>
                                                                                                                        <div className="col-md-6">
                                                                                                                            <div className="col-md-12  text-right">
                                                                                                                                {(Number(each_level_5.current_debit)).toFixed(2)}
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>

                                                                                                                    <div className="row">
                                                                                                                        <div className="col-md-4">
                                                                                                                            <div className="col-md-6  text-right"></div>
                                                                                                                            <div className="col-md-6 px-0 text-left"></div>
                                                                                                                        </div>
                                                                                                                        <div className="col-md-4">
                                                                                                                            {/* <div className="col-md-6  text-right"> {each_level_5.closing_balance.total_debit}</div>
                                                                                                <div className="col-md-6 px-0 text-left"> {each_level_5.closing_balance.total_credit}</div> */}
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </>
                                                                                                    );
                                                                                                }
                                                                                            )}
                                                                                        </>
                                                                                    );
                                                                                }
                                                                            )}
                                                                        </>
                                                                    );
                                                                })}
                                                            </>
                                                        );
                                                    })}



                                                    <div className="row mx-3   bottom-border-1 bg-customBlue text-light">
                                                        <div className="  col-md-6   col-4    font-size-12    text-left  my-1">
                                                            <b> Total</b>
                                                        </div>
                                                        <div className="  col-md-6  col-8    font-size-12     text-center  my-1">
                                                            <div className="row">
                                                                <div className="col-md-4"></div>
                                                                <div className="col-md-4"></div>
                                                                <div className="col-md-4">
                                                                    <div className="col-md-12  text-right">{(Number(each_level_1.calculated_debit)).toFixed(2)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            );
                                        })}


                                    </div>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="home" title="Liabilities" disabled></Tab>
                    </Tabs>
                </div>
            </div>
        );
    }
);

export default BalanceSheetReciept;
