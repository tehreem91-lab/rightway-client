import React, { useEffect, useState } from 'react'
import { endPoint } from '../../../../config/Config';
import numberToEnglish from '../../../../config/numberToWordConverter';


const VoucherReportReciept = React.forwardRef(({ selectedVoucher, showAttachment }, ref) => {
  useEffect(() => {
    // attachments_paths
    console.log();
  }, [])

  return (
    <div>

      {
        showAttachment && <>
          {
            <div className="row">
              <div className="col-md-12 px-5 bold-7 text-dark ">
                Attachments : {
                  selectedVoucher.attachments_paths !== "" ?selectedVoucher.attachments_paths.split(',').map((each_file) => {
                    return <button className="btn btn-sm  bg-customBlue  text-light">
                      <a href={`${endPoint + each_file}`} target="_blank" rel="noopener noreferrer" className='text-light'>

                        {((each_file.split("_"))[0]).slice(15)}


                      </a>

                    </button>
                  }):"No Attachment Available "
                }
              </div>
            </div>

          }
        </>
      }



      <div className="x_content my-3" ref={ref}>
        <h2 className="text-dark text-center font-weight-bold displayPropertyForPrint d-none">Voucher Report </h2>

        <div className="row  mx-3 ">
          <div className="col-md-4">
            <div className="row">
              <div className="col-md-5 bold-5   text-dark ">   Voucher No: </div>
              <div className="col-md-7  bold-6  text-dark "> {selectedVoucher.voucher_no} </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="row">
              <div className="col-md-5  bold-5  text-dark ">Date:</div>
              <div className="col-md-7  bold-6  text-dark "> {selectedVoucher.date.slice(0, 10)} </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="row">
              <div className="col-md-5  bold-5  text-dark ">Created By:</div>
              <div className="col-md-7  bold-6  text-dark "> {selectedVoucher.created_by}</div>
            </div>
          </div>
        </div>
        <div className="row mx-3">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-2 bold-5     text-dark "> Description: </div>
              <div className="col-md-9  bold-6   text-dark " style={{ marginLeft: "-18px" }}>{selectedVoucher.description} </div>
            </div>
          </div>

        </div>

        <div className="row mx-3  reportTableHead mt-2">

          <div className="col-md-2 font-size-12  text-center  my-1 ">
            Account Name
          </div>
          <div className="col-md-2 font-size-12  text-center  my-1 ">
            Account Code
          </div>
          <div className="col-md-5 font-size-12  text-center  my-1 ">
            Particulars
          </div>
          <div className="col-md-3 font-size-12  text-center  my-1 ">
            <div className="col-md-6 text-center ">
              Credit
            </div>
            <div className="col-md-6  text-center">
              Debit
            </div>
          </div>

        </div>
        {
          selectedVoucher.entries.map((each_entry, index) => {
            return <React.Fragment key={index}>
              <div className="row mx-3  reportTableBody bottom-border-2">

                <div className="col-md-2    font-size-12 bold-6   py-1 pt-1 right-border-2 left-border-2   d-flex justify-content-start align-items-center ">
                  {each_entry.acount_name.toUpperCase()}
                </div>
                <div className="col-md-2    font-size-12    py-1  right-border-2 pt-1  d-flex justify-content-center align-items-center ">
                  {each_entry.account_code}
                </div>
                <div className="col-md-5    font-size-12  text-left  py-1 pt-1 right-border-2   d-flex justify-content-start align-items-center ">
                  {each_entry.particulars.toUpperCase()}
                </div>
                <div className="col-md-3    font-size-12  text-right  py-1  right-border-2   d-flex justify-content-center align-items-center ">
                  <div className="col-md-6 p-0  right-border-2 pr-2 pt-1" >{each_entry.credit.toFixed(2)}</div>
                  <div className="col-md-6 p-0 pt-1">{each_entry.debit.toFixed(2)}</div>
                </div>
              </div>
            </React.Fragment>
          })
        }
        <div className="row mx-3  reportTableBody bottom-border-2">

          <div className="col-md-2    font-size-12 bold-6   py-1 pt-1     d-flex justify-content-start align-items-center ">

          </div>
          <div className="col-md-2    font-size-12    py-1    pt-1  d-flex justify-content-center align-items-center ">

          </div>
          <div className="col-md-5    font-size-12  text-left  py-1 pt-1     d-flex justify-content-start align-items-center ">

          </div>
          <div className="col-md-3    font-size-12  text-right  py-1    d-flex justify-content-center align-items-center ">
            <div className="col-md-6 p-0  right-border-2 pr-2 pt-1" >{(selectedVoucher.entries.map((e) => e.credit).reduce((a, b) => a + b, 0)).toFixed(2)}</div>
            <div className="col-md-6 p-0 pt-1">{(selectedVoucher.entries.map((e) => e.debit).reduce((a, b) => a + b, 0)).toFixed(2)}</div>
          </div>
        </div>
        <div className="row mx-3 mt-2">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-3 bold-5    text-dark   "> Amount In Words: </div>
              <div className="col-md-9 bottom-border-2 bold-6 text-dark" style={{ marginLeft: "-35px" }}>

                {(numberToEnglish(selectedVoucher.entries.map((e) => e.debit).reduce((a, b) => a + b, 0))).toUpperCase()}


              </div>
            </div>
          </div>

        </div>



      </div>
    </div>
  );
});
export default VoucherReportReciept