import React from "react";
import { useNavigate } from "react-router-dom";
const BankBookComponentReciept = React.forwardRef(
  ({ LadgerData, dateFrom, dateTo, employeeNameForPrint,page_name }, ref) => {
    const navigate = useNavigate();
    let curent_balance = LadgerData.opening_balance.opening_balance1;
    // initially its have opeining balance data but later map function call its update by adding debit and credit

    return (
      <div>
        <div id="report" className="x_content mb-3" ref={ref}>
          <div className="displayPropertyForPrint ">
            <h2 className="text-dark text-center font-weight-bold  ">
            {page_name}
            </h2>
            <div className="row pb-2">
              <div className="col-md-4 col-4 pl-5 text-dark  text-center">
                {" "}
                Employee Name :{" "}
                <strong className=" text-dark  font-weight-bold ">
                  {" "}
                  {employeeNameForPrint}
                </strong>
              </div>
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

          {LadgerData.ladger_detail_general.length === 0 ? (
            <div className="row mx-3  reportTableBody bottom-border-2">
              <div className=" col-md-12   col-12   px-0 right-border-1 h-100 text-center font-size-12 right-border-2 py-1 h-100 left-border-2 d-flex justify-content-center align-items-center">
                No Data Available
              </div>
            </div>
          ) : (
            <>
              <div className="row mx-3  reportTableBody">
                <div className="  col-md-12   col-12  bottom-border-2  font-size-12 py-1  py-1  right-border-2 left-border-2  d-flex   ">
                  <strong>
                    {" "}
                    Opening Balance at &nbsp;
                    <u className="text-customOrange">
                      {`${dateFrom.slice(8, 10)}-${dateFrom.slice(
                        5,
                        7
                      )}-${dateFrom.slice(0, 4)}`}
                    </u>
                    &nbsp; is {} : &nbsp;
                    <strong className="text-customBlue">
                      {LadgerData.openingBalance > 0 ? (
                        <> {LadgerData.opening_balance.opening_balance1} Dr</>
                      ) : (
                        <>
                          {Math.abs(
                            LadgerData.opening_balance.opening_balance1
                          )}{" "}
                          Cr
                        </>
                      )}
                    </strong>
                  </strong>
                </div>
              </div>

              {LadgerData.ladger_detail_general.map((eachLadgerItem, index) => {
                curent_balance =
                  curent_balance -
                  Number(eachLadgerItem.credit) +
                  Number(eachLadgerItem.debit);
                return (
                  <div key={index}>
                    <div className="row mx-3  reportTableBody bottom-border-2">
                      <div className="col-md-3 col-3   col-3   left-border-2 p-0 m-0 right-border-2  text-center px-0">
                        <div className="col-md-5 col-5 py-1 px-0">
                          {`${eachLadgerItem.voucher_date.slice(
                            8,
                            10
                          )}-${eachLadgerItem.voucher_date.slice(
                            5,
                            7
                          )}-${eachLadgerItem.voucher_date.slice(0, 4)}`}
                        </div>
                        <div className="col-md-7 col-7  left-border-2   py-1 px-0 ">
                          <u
                            onClick={() => {
                              // navigate(`/${voucherTypes.find(
                              //     (o) => o.voucher_id === selectedVoucher.voucher_type_id
                              // ).multiple_router_path}`, {
                              //     state: {
                              //         data: selectedVoucher.voucher_id
                              //     }
                              //     // here im using Dynamic rout path check nd blnce that on which route we have to go
                              // });
                            }}
                          >
                            {" "}
                            {eachLadgerItem.voucher_inv}
                          </u>
                        </div>
                      </div>
                      <div className="col-md-3   col-3    right-border-2 py-1 text-left">
                        {eachLadgerItem.description}
                      </div>
                      <div className="col-md-2 col-2 col-xl-2  right-border-2 py-1 text-right pr-2">
                        {eachLadgerItem.debit.toFixed(2)}
                      </div>
                      <div className="col-md-2   col-2 col-xl-2  right-border-2 py-1 text-right pr-2">
                        {eachLadgerItem.credit.toFixed(2)}
                      </div>
                      <div className="col-md-2  col-2 col-xl-2  py-  right-border-2   ">
                        <>
                          <div className="col-md-8 col-8 px-0 right-border-2  py-1   text-right pr-2">
                            {Math.abs(Number(curent_balance)).toFixed(2)}
                          </div>
                          <div className="col-md-4 col-4 px-0 text-center">
                            {curent_balance >= 0 ? "Cr" : "Dr"}
                          </div>
                        </>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="row mx-3  reportTableBody">
                <div className="  col-md-3   col-3   bottom-border-2  font-size-12 py-1 text-center  py-1  right-border-2 left-border-2  d-flex justify-content-center align-items-center">
                  {" "}
                </div>

                <div className="col-md-3   col-3   bottom-border-2 font-size-12  py-1         right-border-2  text-center py-1   d-flex justify-content-center align-items-center ">
                  <strong> Grand Total </strong>
                </div>
                <div className="col-md-2  col-2     bottom-border-2  font-size-12 py-1 text-center  py-1  right-border-2   d-flex justify-content-end align-items-center ">
                  {/* <strong> {numberWithCommas((grandTotal.grandTotalDebit).toFixed(2))}</strong> */}
                  {Math.abs(
                    LadgerData.ladger_detail_general
                      .map((e) => e.debit)
                      .reduce((a, b) => a + b, 0)
                      .toFixed(2)
                  ).toFixed(2)}
                </div>
                <div className="col-md-2     col-2     bottom-border-2  font-size-12 py-1 text-center  py-1  right-border-2   d-flex justify-content-end align-items-center ">
                  {Math.abs(
                    LadgerData.ladger_detail_general
                      .map((e) => e.credit)
                      .reduce((a, b) => a + b, 0)
                  ).toFixed(2)}
                </div>
                <div className="col-md-2   col-2    bottom-border-2  font-size-12 py-1 text-center  py-1  right-border-2   d-flex justify-content-center align-items-center ">
                  --
                </div>
              </div>
              <div className="row mx-3  reportTableBody">
                <div className="  col-md-12  col-12   bottom-border-2  font-size-12 py-1  py-1  right-border-2 left-border-2  d-flex   ">
                  <strong>
                    {" "}
                    Closing Balance at &nbsp;
                    <u className="text-customOrange">
                    
                    {`${dateFrom.slice(8, 10)}-${dateFrom.slice(
                      5,
                      7
                    )}-${dateFrom.slice(0, 4)}`}
                    
                    </u>
                    &nbsp; is {} : &nbsp;
                    <strong className="text-customBlue">
                      {Math.abs(
                        Number(LadgerData.opening_balance.opening_balance1) -
                          Number(
                            LadgerData.ladger_detail_general
                              .map((e) => e.credit)
                              .reduce((a, b) => a + b, 0)
                          ) +
                          LadgerData.ladger_detail_general
                            .map((e) => e.debit)
                            .reduce((a, b) => a + b, 0)
                      ).toFixed(2)}{" "}
                      &nbsp;
                      {Number(LadgerData.opening_balance.opening_balance1) -
                        Number(
                          LadgerData.ladger_detail_general
                            .map((e) => e.credit)
                            .reduce((a, b) => a + b, 0)
                        ) +
                        LadgerData.ladger_detail_general
                          .map((e) => e.debit)
                          .reduce((a, b) => a + b, 0) >=
                      0
                        ? "Cr"
                        : "Dr"}
                    </strong>
                  </strong>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="x_content mb-3">
          <div className="row mx-3   ">
            <div className="  col-md-12   col-12   font-size-12 py-1  py-1   d-flex   ">
              <strong>
                {" "}
                <u className="text-customOrange"> Post Dated Check </u>{" "}
              </strong>
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
          {
            <>
              {LadgerData.ladger_detail_post_dated.length === 0 ? (
                <div className="row mx-3  reportTableBody bottom-border-2">
                  <div className=" col-md-12   col-12   px-0 right-border-1 h-100 text-center font-size-12 right-border-2 py-1 h-100 left-border-2 d-flex justify-content-center align-items-center">
                    No Data Available
                  </div>
                </div>
              ) : (
                <>
                  {" "}
                  {LadgerData.ladger_detail_post_dated.map(
                    (eachLadgerItem, index) => {
                      curent_balance =
                        curent_balance -
                        Number(eachLadgerItem.credit) +
                        Number(eachLadgerItem.debit);
                      return (
                        <div key={index}>
                          <div className="row mx-3  reportTableBody bottom-border-2">
                            <div className="col-md-3 col-3   col-3   left-border-2 p-0 m-0 right-border-2  text-center px-0">
                              <div className="col-md-5 col-5 py-1 px-0">
                                {`${eachLadgerItem.voucher_date.slice(
                                  8,
                                  10
                                )}-${eachLadgerItem.voucher_date.slice(
                                  5,
                                  7
                                )}-${eachLadgerItem.voucher_date.slice(0, 4)}`}
                              </div>
                              <div className="col-md-7 col-7  left-border-2   py-1 px-0 ">
                                {eachLadgerItem.voucher_inv}
                              </div>
                            </div>
                            <div className="col-md-3   col-3    right-border-2 py-1 text-left">
                              {eachLadgerItem.description}
                            </div>
                            <div className="col-md-2 col-2 col-xl-2  right-border-2 py-1 text-right pr-2">
                              {eachLadgerItem.debit.toFixed(2)}
                            </div>
                            <div className="col-md-2   col-2 col-xl-2  right-border-2 py-1 text-right pr-2">
                              {eachLadgerItem.credit.toFixed(2)}
                            </div>
                            <div className="col-md-2  col-2 col-xl-2  py-  right-border-2   ">
                              <>
                                <div className="col-md-8 col-8 px-0 right-border-2  py-1   text-right pr-2">
                                  {" "}
                                  {Math.abs(Number(curent_balance)).toFixed(2)}
                                </div>
                                <div className="col-md-4 col-4 px-0 text-center">
                                  {curent_balance >= 0 ? "Cr" : "Dr"}
                                </div>
                              </>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                  <div className="row mx-3  reportTableBody">
                    <div className="  col-md-3   col-3   bottom-border-2  font-size-12 py-1 text-center  py-1  right-border-2 left-border-2  d-flex justify-content-center align-items-center">
                      {" "}
                    </div>

                    <div className="col-md-3   col-3   bottom-border-2 font-size-12  py-1         right-border-2  text-center py-1   d-flex justify-content-center align-items-center ">
                      <strong> Grand Total </strong>
                    </div>
                    <div className="col-md-2  col-2     bottom-border-2  font-size-12 py-1 text-center  py-1  right-border-2   d-flex justify-content-end align-items-center ">
                      {/* <strong> {numberWithCommas((grandTotal.grandTotalDebit).toFixed(2))}</strong> */}
                      {Math.abs(
                        LadgerData.ladger_detail_post_dated
                          .map((e) => e.debit)
                          .reduce((a, b) => a + b, 0)
                          .toFixed(2)
                      ).toFixed(2)}
                    </div>
                    <div className="col-md-2     col-2     bottom-border-2  font-size-12 py-1 text-center  py-1  right-border-2   d-flex justify-content-end align-items-center ">
                      {Math.abs(
                        LadgerData.ladger_detail_post_dated
                          .map((e) => e.credit)
                          .reduce((a, b) => a + b, 0)
                      ).toFixed(2)}
                    </div>
                    <div className="col-md-2   col-2    bottom-border-2  font-size-12 py-1 text-center  py-1  right-border-2   d-flex justify-content-center align-items-center ">
                      --
                    </div>
                  </div>
                </>
              )}
            </>
          }
        </div>
      </div>
    );
  }
);

export default BankBookComponentReciept;