import React from "react";  
const GeneralLadgerReciept = React.forwardRef(
    ({ LadgerData, grandTotal, dateFrom, dateTo, employeeNameForPrint }, ref) => {

        return (



            <div>
                <div className="x_content mb-3" ref={ref}> {/*displayPropertyForPrint */}
                    <div className="displayPropertyForPrint d-none">

                        <h2 className="text-dark text-center font-weight-bold  ">Ladger Report</h2>
                        <div className="row pb-2">
                            <div className="col-md-4 col-4 pl-5 text-dark  text-center"> Employee Name : <strong className=" text-dark  font-weight-bold "> {employeeNameForPrint}</strong></div>
                            <div className="col-md-4 col-4 text-dark text-center ">  Date From: <strong className="text-dark  font-weight-bold ">  {dateFrom}</strong> </div>
                            <div className="col-md-4 col-4 text-dark  text-center">  Date To :  <strong className="text-dark  font-weight-bold "> {dateTo}</strong> </div>
                        </div>
                    </div>

                    <div className="row mx-3  reportTableHead bottom-border-1 ">
                        <div className="col-md-3   col-3   font-size-12      text-center  my-1 px-0">
                            <div className="col-md-5   col-5   font-size-12   right-border-1  text-center   px-0">
                                Date
                            </div>
                            <div className="col-md-7 col-7   font-size-12   right-border-1  text-center  px-0 ">
                                Voucher Inv
                            </div>
                        </div>

                        <div className="  col-md-3   col-3    font-size-12  right-border-1  text-center  my-1">
                            Description
                        </div>
                        <div className="  col-md-2   col-2    font-size-12  right-border-1  text-center  my-1">
                            Debit
                        </div>
                        <div className="  col-md-2  col-2    font-size-12   right-border-1  text-center  my-1">
                            Credit
                        </div>
                        <div className="  col-md-2   col-2   right-border-2  font-size-12   right-border-1  text-center  my-1">
                            Balance
                        </div>
                        {/* ---------- */}
                    </div>

                    <div className="row mx-3  reportTableBody">
                        <div className="  col-md-12   col-12  bottom-border-2  font-size-12 py-1  py-1  right-border-2 left-border-2  d-flex   ">
                            <strong>     Opening Balance at &nbsp;
                                <u className="text-customOrange">
                                    {`${dateFrom.slice(8, 10)}-${dateFrom.slice(5, 7)}-${dateFrom.slice(0, 4)}`}
                                </u>
                                &nbsp; is { } : &nbsp;
                                <strong className="text-customBlue">
                                    {LadgerData.openingBalance > 0 ? (
                                        <> {LadgerData.openingBalance} Dr</>
                                    ) : (
                                        <>{Math.abs(LadgerData.openingBalance)} Cr</>
                                    )}
                                </strong></strong>
                        </div>
                    </div>

                    <div className="row mx-3  reportTableBody bottom-border-2">
                        <div className=" col-md-12   col-12   px-0 right-border-1 h-100 text-center font-size-12 right-border-2 py-1 h-100 left-border-2 d-flex justify-content-center align-items-center">
                            No Data Available
                        </div>
                    </div>

                    <div  >
                        <div className="row mx-3  reportTableBody bottom-border-2">
                            <div className="col-md-3 col-3   col-3   left-border-2 p-0 m-0 right-border-2  text-center px-0">
                                <div className="col-md-5 col-5 py-1 px-0">sdf
                                    {/* {`${eachLadgerItem.date.slice(
                            8,
                            10
                          )}-${eachLadgerItem.date.slice(
                            5,
                            7
                          )}-${eachLadgerItem.date.slice(0, 4)}`} */}
                                </div>
                                <div className="col-md-7 col-7  left-border-2   py-1 px-0 ">
                                    sdf
                                </div>
                            </div>
                            <div className="col-md-3   col-3    right-border-2 py-1 text-left">
                                {/* {eachLadgerItem.description} */}
                            </div>
                            <div className="col-md-2 col-2 col-xl-2  right-border-2 py-1 text-right pr-2">
                                234

                            </div>
                            <div className="col-md-2   col-2 col-xl-2  right-border-2 py-1 text-right pr-2">
                                345
                            </div>
                            <div className="col-md-2  col-2 col-xl-2  py-  right-border-2   ">
                                {/* {} */}
                                dr

                                {/* {eachLadgerItem.debit - eachLadgerItem.credit > 0 ? (
                          <>
                            <div className="col-md-8 col-8 px-0 right-border-2  py-1   text-right pr-2">
                              {Math.abs((LadgerData.arrayForCurrentBalance[index]).toFixed(2))}
                            </div>
                            <div className="col-md-4 col-4 px-0 text-center"> Dr</div>

                          </>
                        ) : (
                          <>
                            <div className="col-md-8 col-8 px-0 right-border-2 py-1   text-right pr-2">   {Math.abs((LadgerData.arrayForCurrentBalance[index]).toFixed(2))}</div>
                            <div className="col-md-4 px-0 col-4 text-center">     Cr</div>

                          </> */}
                                {/* )} */}
                            </div>
                        </div>
                    </div>
                    <div className="row mx-3  reportTableBody">
                        <div className="  col-md-3   col-3   bottom-border-2  font-size-12 py-1 text-center  py-1  right-border-2 left-border-2  d-flex justify-content-center align-items-center">
                            {" "}
                        </div>

                        <div className="col-md-3   col-3   bottom-border-2 font-size-12  py-1         right-border-2  text-center py-1   d-flex justify-content-center align-items-center ">
                            <strong> Grand Total{" "}</strong>
                        </div>
                        <div className="col-md-2  col-2     bottom-border-2  font-size-12 py-1 text-center  py-1  right-border-2   d-flex justify-content-end align-items-center ">
                            {/* <strong> {numberWithCommas((grandTotal.grandTotalDebit).toFixed(2))}</strong> */}234234
                        </div>
                        <div className="col-md-2     col-2     bottom-border-2  font-size-12 py-1 text-center  py-1  right-border-2   d-flex justify-content-end align-items-center ">
                            {/* <strong>{(grandTotal.grandTotalCredit).toFixed(2)}</strong> */}36536
                        </div>
                        <div className="col-md-2   col-2    bottom-border-2  font-size-12 py-1 text-center  py-1  right-border-2   d-flex justify-content-center align-items-center ">
                            --
                        </div>
                    </div>
                    <div className="row mx-3  reportTableBody">
                        <div className="  col-md-12  col-12   bottom-border-2  font-size-12 py-1  py-1  right-border-2 left-border-2  d-flex   ">
                            <strong>     Closing Balance at &nbsp;
                                {/* {LadgerData.ladgerData[LadgerData.ladgerData.length -1].date} */}
                                <u className="text-customOrange">
                                    {/* {`${LadgerData.ladgerData[
                                                LadgerData.ladgerData.length - 1
                                            ].date.slice(8, 10)}-${LadgerData.ladgerData[
                                                LadgerData.ladgerData.length - 1
                                            ].date.slice(5, 7)}-${LadgerData.ladgerData[
                                                LadgerData.ladgerData.length - 1
                                            ].date.slice(0, 4)}`} */}
                                    23/3/2002
                                </u>
                                &nbsp; is { } : &nbsp;
                                <strong className="text-customBlue">
                                    {/* {LadgerData.closingBalance > 0 ? (
                                                <> {(LadgerData.closingBalance).toFixed(2)} Dr</>
                                            ) : (
                                                <>{Math.abs((LadgerData.closingBalance).toFixed(2))} Cr</>
                                            )} */}
                                    23,000 RS
                                </strong></strong>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
);

export default GeneralLadgerReciept;