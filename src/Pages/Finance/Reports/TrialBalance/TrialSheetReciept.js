import React from "react";
const TrialSheetReciept = React.forwardRef(
    ({ dateFrom, dateTo, reportData, levelValue, grandsTotals }, ref) => {

        return (


            <div>
                <div className="x_content px-0  mb-3" ref={ref}>
                    <div className="displayPropertyForPrint">

                        <h2 className="text-dark text-center font-weight-bold  ">Trial Sheet Report</h2>
                        <div className="row pb-2">
                            <div className="col-md-4 col-4 text-dark text-center ">  Date From: <strong className="text-dark  font-weight-bold ">  {dateFrom}</strong> </div>
                            <div className="col-md-4 col-4 text-dark  text-center">  Date To :  <strong className="text-dark  font-weight-bold "> {dateTo}</strong> </div>
                        </div>
                    </div>

                    <div className="row mx-3   bottom-border-1 bg-customBlue text-light"  >
                        <div className="  col-md-4   col-4    font-size-12     text-center  my-1">

                        </div>
                        <div className="  col-md-8  col-8    font-size-12     text-center  my-1">
                            <div className="row">
                                <div className="col-md-4">Opening Balance</div>
                                <div className="col-md-4">Current Transaction</div>
                                <div className="col-md-4">Closing Balance</div>
                            </div>
                        </div>
                    </div>

                    <div className="row mx-3   bottom-border-1 bg-customBlue text-light"  >
                        <div className="  col-md-4   col-4    font-size-12    text-left  my-1">
                            <b>   Account Title</b>
                        </div>
                        <div className="  col-md-8  col-8    font-size-12     text-center  my-1">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="col-md-6 px-0 text-right">Debit <i className="fa fa-arrow-down text-danger" aria-hidden="true"></i></div>
                                    <div className="col-md-6  text-right">Credit <i className="fa fa-arrow-up text-success" aria-hidden="true"></i></div>
                                </div>
                                <div className="col-md-4">
                                    <div className="col-md-6 px-0 text-right">Debit  <i className="fa fa-arrow-down text-danger" aria-hidden="true"></i></div>
                                    <div className="col-md-6  text-right">Credit <i className="fa fa-arrow-up text-success" aria-hidden="true"></i></div>
                                </div>
                                <div className="col-md-4">
                                    <div className="col-md-6 px-0 text-right">Debit  <i className="fa fa-arrow-down text-danger" aria-hidden="true"></i></div>
                                    <div className="col-md-6  text-right">Credit <i className="fa fa-arrow-up text-success" aria-hidden="true"></i></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        reportData.map((each_level_1) => {
                            return <>
                                <div className={`row mx-3 ${levelValue.value >= 1 ? "" : "d-none"}  bottom-border-1  text-dark`} style={{ backgroundColor: "#fd8b5a" }} >
                                    <div className="  col-md-4   col-4    font-size-12 pl-1   text-left  my-1">
                                        {each_level_1.category_name}
                                    </div>
                                    <div className="  col-md-8  col-8    font-size-12     text-center  my-1">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="col-md-6 px-0 text-right">{each_level_1.calculated_opening_debit}<i className="fa fa-arrow-down text-danger" aria-hidden="true"></i></div>
                                                <div className="col-md-6  text-right">{each_level_1.calculated_opening_credit} <i className="fa fa-arrow-up text-success" aria-hidden="true"></i></div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="col-md-6  text-right"> {each_level_1.calculated_debit} <i className="fa fa-arrow-up text-success" aria-hidden="true"></i></div>
                                                <div className="col-md-6 px-0 text-right">{each_level_1.calculated_credit} <i className="fa fa-arrow-down text-danger" aria-hidden="true"></i></div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="col-md-6 px-0 text-right">{each_level_1.calculated_closing_balance}  <i className="fa fa-arrow-down text-danger" aria-hidden="true"></i></div>
                                                <div className="col-md-6  text-right">{each_level_1.calculated_closing_balance} <i className="fa fa-arrow-up text-success" aria-hidden="true"></i></div>
                                            </div>
                                        </div>
                                    </div>


                                </div>

                                {
                                    each_level_1.children.map((each_level_2) => {
                                        return <>
                                            <div className={`row mx-3 ${levelValue.value >= 2 ? "" : "d-none"}  bottom-border-1  text-dark`} style={{ backgroundColor: "#f7ab8b" }}>
                                                <div className="  col-md-4   col-4    font-size-12  pl-2   text-left  my-1">
                                                    {each_level_2.category_name}
                                                </div>
                                                <div className="  col-md-8  col-8    font-size-12     text-center  my-1">
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <div className="col-md-6 px-0 text-right">{each_level_2.calculated_opening_debit} <i className="fa fa-arrow-down text-danger" aria-hidden="true"></i></div>
                                                            <div className="col-md-6  text-right">{each_level_2.calculated_opening_credit} <i className="fa fa-arrow-up text-success" aria-hidden="true"></i></div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="col-md-6  text-right"> {each_level_2.calculated_debit}<i className="fa fa-arrow-up text-success" aria-hidden="true"></i></div>
                                                            <div className="col-md-6 px-0 text-right">{each_level_2.calculated_credit}  <i className="fa fa-arrow-down text-danger" aria-hidden="true"></i></div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="col-md-6 px-0 text-right">{each_level_2.calculated_closing_balance}   <i className="fa fa-arrow-down text-danger" aria-hidden="true"></i></div>
                                                            <div className="col-md-6  text-right">{each_level_2.calculated_closing_balance}  <i className="fa fa-arrow-up text-success" aria-hidden="true"></i></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {
                                                each_level_2.children.map((each_level_3) => {
                                                    return <>
                                                        <div className={`row mx-3 ${levelValue.value >= 3 ? "" : "d-none"}  bottom-border-1  text-dark`} style={{ backgroundColor: "#ffbca0" }}>
                                                            <div className="  col-md-4   col-4    font-size-12   pl-3  text-left  my-1">
                                                                {each_level_3.category_name}
                                                            </div>
                                                            <div className="  col-md-8  col-8    font-size-12     text-center  my-1">
                                                                <div className="row">
                                                                    <div className="col-md-4">
                                                                        <div className="col-md-6 px-0 text-right">{each_level_3.calculated_opening_debit}<i className="fa fa-arrow-down text-danger" aria-hidden="true"></i></div>
                                                                        <div className="col-md-6  text-right">{each_level_3.calculated_opening_credit}  <i className="fa fa-arrow-up text-success" aria-hidden="true"></i></div>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <div className="col-md-6  text-right">{each_level_3.calculated_debit}  <i className="fa fa-arrow-up text-success" aria-hidden="true"></i></div>
                                                                        <div className="col-md-6  text-right">{each_level_3.calculated_credit}  <i className="fa fa-arrow-up text-success" aria-hidden="true"></i></div>
                                                                        {/* <div className="col-md-6 px-0 text-right"> {((each_level_3.children.map((l) => { return (l.children.map((e) => { return e.current_debit }).reduce((a, b) => a + b, 0)) })).reduce((m, n) => m + n, 0)).toFixed(2)}  <i className="fa fa-arrow-down text-danger" aria-hidden="true"></i></div>
                                                                        <div className="col-md-6  text-right"> {((each_level_3.children.map((l) => { return (l.children.map((e) => { return e.current_credit }).reduce((a, b) => a + b, 0)) })).reduce((m, n) => m + n, 0)).toFixed(2)}  <i className="fa fa-arrow-up text-success" aria-hidden="true"></i></div> */}
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <div className="col-md-6 px-0 text-right">{each_level_3.calculated_closing_balance}  <i className="fa fa-arrow-down text-danger" aria-hidden="true"></i></div>
                                                                        <div className="col-md-6  text-right">{each_level_3.calculated_closing_balance} <i className="fa fa-arrow-up text-success" aria-hidden="true"></i></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {
                                                            each_level_3.children.map((each_level_4) => {
                                                                return <>
                                                                    <div className={`row mx-3 ${levelValue.value >= 4 ? "" : "d-none"}  bottom-border-1  text-dark`} style={{ backgroundColor: "#ffcbb5" }}>
                                                                        <div className="  col-md-4   col-4    font-size-12   pl-4  text-left  my-1">
                                                                            {each_level_4.category_name}
                                                                        </div>
                                                                        <div className="  col-md-8  col-8    font-size-12     text-center  my-1">
                                                                            <div className="row">
                                                                                <div className="col-md-4">
                                                                                    <div className="col-md-6 px-0 text-right">{each_level_4.calculated_opening_debit} <i className="fa fa-arrow-down text-danger" aria-hidden="true"></i></div>
                                                                                    <div className="col-md-6  text-right">{each_level_4.calculated_opening_credit}  <i className="fa fa-arrow-up text-success" aria-hidden="true"></i></div>
                                                                                </div>
                                                                                <div className="col-md-4">
                                                                                    <div className="col-md-6  text-right">{each_level_4.calculated_debit}  <i className="fa fa-arrow-up text-success" aria-hidden="true"></i></div>
                                                                                    <div className="col-md-6  text-right">{each_level_4.calculated_credit}  <i className="fa fa-arrow-up text-success" aria-hidden="true"></i></div>
                                                                                    {/* <div className="col-md-6 px-0 text-right">{(each_level_4.children.map((e) => { return e.current_debit }).reduce((a, b) => a + b, 0)).toFixed(2)}  <i className="fa fa-arrow-down text-danger" aria-hidden="true"></i></div> */}
                                                                                    {/* <div className="col-md-6  text-right">{(each_level_4.children.map((e) => { return e.current_credit }).reduce((a, b) => a + b, 0)).toFixed(2)} <i className="fa fa-arrow-up text-success" aria-hidden="true"></i></div> */}
                                                                                </div>
                                                                                <div className="col-md-4">
                                                                                    <div className="col-md-6 px-0 text-right">{each_level_4.calculated_closing_balance}  <i className="fa fa-arrow-down text-danger" aria-hidden="true"></i></div>
                                                                                    <div className="col-md-6  text-right">{each_level_4.calculated_closing_balance} <i className="fa fa-arrow-up text-success" aria-hidden="true"></i></div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {
                                                                        each_level_4.children.map((each_level_5) => {
                                                                            return <>
                                                                                <div className={`row mx-3 ${levelValue.value === 5 ? "" : "d-none"}  bottom-border-1  text-dark`} style={{ backgroundColor: "#ffe4d9" }}>
                                                                                    <div className="  col-md-4   col-4   pl-5  font-size-12    text-left  my-1">
                                                                                        {each_level_5.account_name}
                                                                                    </div>
                                                                                    <div className="  col-md-8  col-8    font-size-12     text-center  my-1">


                                                                                        <div className="row">
                                                                                            <div className="col-md-4">
                                                                                                <div className="col-md-6 px-0 text-right"> {Number(each_level_5?.opening_balance) < 0 ? Math.abs(Number(each_level_5?.opening_balance).toFixed(2)) : "0.00"} <i className="fa fa-arrow-down text-danger" aria-hidden="true"></i></div>
                                                                                                <div className="col-md-6  text-right"> {Number(each_level_5?.opening_balance) < 0 ? "0.00" : (Number(each_level_5?.opening_balance).toFixed(2))} <i className="fa fa-arrow-up text-success" aria-hidden="true"></i></div>
                                                                                            </div>
                                                                                            <div className="col-md-4">
                                                                                                <div className="col-md-6 px-0 text-right">{(Number(each_level_5.current_debit)).toFixed(2)} <i className="fa fa-arrow-down text-danger" aria-hidden="true"></i></div>
                                                                                                <div className="col-md-6  text-right">{(Number(each_level_5.current_credit)).toFixed(2)}<i className="fa fa-arrow-up text-success" aria-hidden="true"></i></div>
                                                                                            </div>
                                                                                            <div className="col-md-4">
                                                                                                <div className="col-md-6 px-0 text-right">{each_level_5.calculated_closing_balance}  <i className="fa fa-arrow-down text-danger" aria-hidden="true"></i></div>
                                                                                                <div className="col-md-6  text-right">{each_level_5.calculated_closing_balance} <i className="fa fa-arrow-up text-success" aria-hidden="true"></i></div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>




                                                                            </>
                                                                        })
                                                                    }
                                                                </>
                                                            })
                                                        }
                                                    </>
                                                })
                                            }
                                        </>
                                    })
                                }





                            </>
                        })
                    }


                    <div className="row mx-3   bottom-border-1 bg-customBlue text-light"  >
                        <div className="  col-md-4   col-4    font-size-12    text-left  my-1">
                            <b>  Grand Total</b>
                        </div>
                        <div className="  col-md-8  col-8    font-size-12     text-center  my-1">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="col-md-6  text-right">{grandsTotals.total_opening_debit} <i className="fa fa-arrow-up text-success" aria-hidden="true"></i></div>
                                    <div className="col-md-6 px-0 text-right">{(grandsTotals.total_opening_credit)} <i className="fa fa-arrow-down text-danger" aria-hidden="true"></i></div>
                                </div>
                                <div className="col-md-4">
                                    {/* here something went wrong while total debit level_1 as its show show in negaatie but its dont */}
                                    <div className="col-md-6  text-right">{grandsTotals.total_debit_level_1}  <i className="fa fa-arrow-up text-success" aria-hidden="true"></i></div>
                                    <div className="col-md-6 px-0 text-right">{grandsTotals.total_credit_level_1} <i className="fa fa-arrow-down text-danger" aria-hidden="true"></i></div>
                                </div>
                                <div className="col-md-4">
                                    <div className="col-md-6 px-0 text-right">0.00  <i className="fa fa-arrow-down text-danger" aria-hidden="true"></i></div>
                                    <div className="col-md-6  text-right">0.00 <i className="fa fa-arrow-up text-success" aria-hidden="true"></i></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
);

export default TrialSheetReciept;