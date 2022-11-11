import React from "react";
import { useNavigate } from "react-router-dom";

const TransReportGlobalCompReciept = React.forwardRef(
  ({ LadgerData, dateFrom, dateTo }, ref) => {
    const navigate = useNavigate();
    let curent_balance = LadgerData;
   
    return (
      <div>
        <div id="report" className="x_content mb-3" ref={ref} >
          <div className="displayPropertyForPrint">
            <h2 className="text-dark text-center font-weight-bold  ">
              Transaction Report
            </h2>
            <div className="row pb-2">
              <div className="col-md-6 col-6 text-dark text-center ">
                {" "}
                From Date :{" "}
                <strong className="text-dark  font-weight-bold ">
                  {" "}
                  {dateFrom}
                </strong>{" "}
              </div>
              <div className="col-md-6 col-6 text-dark  text-center">
                {" "}
                To Date :{" "}
                <strong className="text-dark  font-weight-bold ">
                  {" "}
                  {dateTo}
                </strong>{" "}
              </div>
            </div>
          </div>

          <div>
            <div className="row mx-3  reportTableHead bottom-border-1 "  >
              <div className=" col-md-2 col-2  font-size-12   right-border-1  text-center  left-border-2 py-1">
                Date
              </div>
              <div className="col-md-2  col-2   font-size-12   right-border-1  text-center  px-1 py-1">
                Voucher Inv
              </div>
              <div className="col-md-2  col-2   font-size-12   right-border-1  text-center   px-1 py-1">
                Account Name
              </div>
              <div className="col-md-2  col-2   font-size-12   right-border-1  text-center   px-1 py-1">
                Account Code
              </div>
             
              <div className="  col-md-2   col-2    font-size-12  right-border-1  text-center   py-1">
                Debit
              </div>
              <div className="  col-md-2  col-2  right-border-2 py-1  font-size-12   text-center py-1 ">
                Credit
              </div>

              {/* ---------- */}
            </div>
          </div>

          {LadgerData.length === 0 ? (
            <div className="row mx-3  reportTableBody bottom-border-2">
              <div className=" col-md-12   col-12   px-0 right-border-1 h-100 text-center font-size-12 right-border-2 py-1 h-100 left-border-2 d-flex justify-content-center align-items-center">
                No Data Available
              </div>
            </div>
          ) : (
            <>
              {LadgerData.map((eachLadgerItem, index) => {
                curent_balance =
                  curent_balance -
                  Number(eachLadgerItem.credit) +
                  Number(eachLadgerItem.debit);
                return (
                  <div key={index}>
                    <div className="row mx-3  reportTableBody bottom-border-2">
                      <div className="col-md-2  col-2  left-border-2  right-border-2 py-1 text-center">
                        {`${eachLadgerItem.voucher_date.slice(
                          8,
                          10
                        )}-${eachLadgerItem.voucher_date.slice(
                          5,
                          7
                        )}-${eachLadgerItem.voucher_date.slice(0, 4)}`}
                      </div>
                      <div className="col-md-2  col-2    right-border-2 py-1 text-center">
                        {eachLadgerItem.voucher_inv}
                      </div>
                      <div className="col-md-2  col-2    right-border-2 py-1 text-center">
                        {eachLadgerItem.account_name}
                      </div>
                      <div className="col-md-2  col-2    right-border-2 py-1 text-center">
                        {eachLadgerItem.account_code}
                      </div>
                      <div className="col-md-2 col-2   font-size-12 py-1 right-border-2  text-center">
                        {eachLadgerItem.debit.toFixed(2)}
                      </div>
                      <div className="col-md-2 col-2  right-border-2 py-1 font-size-12  text-center">
                        {eachLadgerItem.credit.toFixed(2)}
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="row mx-3  reportTableBody">
                <div className="col-md-10   col-10   bottom-border-2 font-size-12  py-1 text-center  py-1  right-border-2 left-border-2   d-flex justify-content-end align-items-center ">
                  <strong> Grand Total </strong>
                </div>
                <div className="col-md-1  col-1     bottom-border-2  font-size-12 py-1 text-center  py-1  right-border-2   d-flex justify-content-end align-items-center ">
                  {Math.abs(
                    LadgerData.map((e) => e.debit)
                      .reduce((a, b) => a + b, 0)
                      .toFixed(2)
                  ).toFixed(2)}
                </div>
                <div className="col-md-1  col-1     bottom-border-2  font-size-12 py-1 text-center  py-1  right-border-2   d-flex justify-content-end align-items-center ">
                  {Math.abs(
                    LadgerData.map((e) => e.credit).reduce((a, b) => a + b, 0)
                  ).toFixed(2)}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
);

export default TransReportGlobalCompReciept;
