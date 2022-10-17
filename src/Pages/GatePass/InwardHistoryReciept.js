import React, { useEffect, useState } from 'react'
import { endPoint } from '../../config/Config';
import numberToEnglish from '../../config/numberToWordConverter';


const InwardHistoryReciept = React.forwardRef(({ selectedVoucher, showAttachment }, ref) => {
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
                                    selectedVoucher.attachments !== "" ? selectedVoucher.attachments.split(',').map((each_file) => {
                                        return <button className="btn btn-sm  bg-customBlue  text-light">
                                            <a href={`${endPoint + each_file}`} target="_blank" rel="noopener noreferrer" className='text-light'>

                                                {((each_file.split("_"))[0]).slice(15)}


                                            </a>

                                        </button>
                                    }) : "No Attachment Available "
                                }
                            </div>
                        </div>
                    }
                </>
            }



            <div className="x_content my-3" ref={ref}>
                <h2 className="text-dark text-center font-weight-bold displayPropertyForPrint d-none">Voucher Report </h2>

                <div className="row  mx-3 ">
                    <div className="col-md-3">
                        <div className="row">
                            <div className="bold-5   text-dark ">   Voucher No: </div>
                            <div className="col-md-7  bold-6  text-dark "> {selectedVoucher?.voucher_inv} </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="row">
                            <div className="  bold-5  text-dark ">Date:</div>
                            <div className="col-md-7  bold-6  text-dark "> {selectedVoucher?.voucher_date.slice(0, 10)} </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="row">
                            <div className="  bold-5  text-dark ">Created By:</div>
                            <div className="col-md-7  bold-6  text-dark "> {selectedVoucher?.created_by.slice(0, 10)}</div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="row">
                            <div className="  bold-5  text-dark ">Created Date:</div>
                            <div className="col-md-7  bold-6  text-dark "> {selectedVoucher?.created_date.slice(0, 10)}</div>
                        </div>
                    </div>
                </div>
                <div className="row  mx-3 ">
                    <div className="col-md-3">
                        <div className="row">
                            <div className="bold-5   text-dark ">   Party Name: </div>
                            <div className="col-md-7  bold-6  text-dark "> {selectedVoucher?.party_name} </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="row">
                            <div className="  bold-5  text-dark ">Party Code:</div>
                            <div className="col-md-7  bold-6  text-dark "> {selectedVoucher?.party_code} </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="row">
                            <div className="  bold-5  text-dark ">Party Cell:</div>
                            <div className="col-md-7  bold-6  text-dark "> {selectedVoucher?.party_cell}</div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="row">
                            <div className="  bold-5  text-dark ">Bilty No:</div>
                            <div className="col-md-7  bold-6  text-dark "> {selectedVoucher?.bilty_no}</div>
                        </div>
                    </div>
                </div>
                <div className="row  mx-3 ">
                    <div className="col-md-3">
                        <div className="row">
                            <div className="bold-5   text-dark ">   Driver Name: </div>
                            <div className="col-md-7  bold-6  text-dark "> {selectedVoucher?.driver} </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="row">
                            <div className="  bold-5  text-dark ">Driver Cell:</div>
                            <div className="col-md-7  bold-6  text-dark "> {selectedVoucher?.driver_cell} </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="row">
                            <div className="  bold-5  text-dark ">Vehicle No:</div>
                            <div className="col-md-7  bold-6  text-dark "> {selectedVoucher?.vehicle_number}</div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="row">
                            <div className="  bold-5  text-dark ">Vehicle Rent:</div>
                            <div className="col-md-7  bold-6  text-dark "> {selectedVoucher?.rent_amount}</div>
                        </div>
                    </div>
                </div>
                <div className="row  mx-3 ">
                    <div className="col-md-3">
                        <div className="row">
                            <div className="  bold-5  text-dark ">Rent Type:</div>
                            <div className="col-md-7  bold-6  text-dark "> {selectedVoucher?.rent_type}</div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="row">
                            <div className=" bold-5  text-dark  "> Description: </div>
                            <div className="col-md-7  bold-6   text-dark " style={{ marginLeft: "" }}>{selectedVoucher.description} </div>
                        </div>
                    </div>

                </div>

                <div className="row mx-3  reportTableHead mt-2">

                    <div className="col-md-2 font-size-12  text-center  my-1 ">
                        Product Commodity
                    </div>
                    <div className="col-md-2 font-size-12  text-center  my-1 ">
                        Unit
                    </div>
                    <div className="col-md-5 font-size-12  text-center  my-1 ">
                        Piece Weight
                    </div>
                    <div className="col-md-3 font-size-12  text-center  my-1 ">
                        <div className="col-md-6 text-center ">
                            Pieces
                        </div>
                        <div className="col-md-6  text-center">
                            Total Weight
                        </div>
                    </div>

                </div>
                {
                    selectedVoucher.stock_entries.map((each_entry, index) => {
                        return <React.Fragment key={index}>
                            <div className="row mx-3  reportTableBody bottom-border-2">

                                {/* <div className="col-md-2    font-size-12 bold-6   py-1 pt-1 right-border-2 left-border-2   d-flex justify-content-start align-items-center ">
                                    {each_entry.acount_name}
                                </div> */}
                                <div className="col-md-2    font-size-12    py-1  right-border-2 pt-1  d-flex justify-content-center align-items-center ">
                                    {each_entry.acount_name}{each_entry.account_code}
                                </div>
                                <div className="col-md-2    font-size-12    py-1  right-border-2 pt-1  d-flex justify-content-center align-items-center ">
                                    {each_entry.stock_unit_name}
                                </div>
                                <div className="col-md-5    font-size-12  text-left  py-1 pt-1 right-border-2   d-flex justify-content-start align-items-center ">
                                    {each_entry.weight_per_piece.toFixed(2)}
                                </div>
                                <div className="col-md-3    font-size-12  text-right  py-1  right-border-2   d-flex justify-content-center align-items-center ">
                                    <div className="col-md-6 p-0  right-border-2 pr-2 pt-1" >{each_entry.total_stock_piece}</div>
                                    <div className="col-md-6 p-0 pt-1">{each_entry.total_weight.toFixed(2)}</div>
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
                        <div className="col-md-6 p-0  right-border-2 pr-2 pt-1" >{(selectedVoucher.stock_entries.map((e) => e.total_stock_piece).reduce((a, b) => a + b, 0))}</div>
                        <div className="col-md-6 p-0 pt-1">{(selectedVoucher.stock_entries.map((e) => e.total_weight).reduce((a, b) => a + b, 0)).toFixed(2)}</div>
                    </div>
                </div>
                <div className="row mx-3 mt-2">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-3 bold-5    text-dark   "> Weight In Words: </div>
                            <div className="col-md-9 bottom-border-2 bold-6 text-dark" style={{ marginLeft: "-35px" }}>

                                {(numberToEnglish(selectedVoucher.stock_entries.map((e) => e.total_weight).reduce((a, b) => a + b, 0))).toUpperCase() + " KILOGRAMS"}


                            </div>
                        </div>
                    </div >

                </div >



            </div >
        </div >
    );
});
export default InwardHistoryReciept