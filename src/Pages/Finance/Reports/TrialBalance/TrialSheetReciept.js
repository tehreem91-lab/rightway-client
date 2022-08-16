import React from "react";
const TrialSheetReciept = React.forwardRef(
    ({ dateFrom, dateTo, reportData }, ref) => {

        return (


            <div>
                <div className="x_content px-0  mb-3" ref={ref}>
                    <div className="displayPropertyForPrint d-none">

                        <h2 className="text-dark text-center font-weight-bold  ">Ladger Report</h2>
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
                                    <div className="col-md-6 px-0 text-left">Debit <i class="fa fa-arrow-down text-danger" aria-hidden="true"></i></div>
                                    <div className="col-md-6  text-right">Credit <i class="fa fa-arrow-up text-success" aria-hidden="true"></i></div>
                                </div>
                                <div className="col-md-4">
                                    <div className="col-md-6 px-0 text-left">Debit  <i class="fa fa-arrow-down text-danger" aria-hidden="true"></i></div>
                                    <div className="col-md-6  text-right">Credit <i class="fa fa-arrow-up text-success" aria-hidden="true"></i></div>
                                </div>
                                <div className="col-md-4">
                                    <div className="col-md-6 px-0 text-left">Debit  <i class="fa fa-arrow-down text-danger" aria-hidden="true"></i></div>
                                    <div className="col-md-6  text-right">Credit <i class="fa fa-arrow-up text-success" aria-hidden="true"></i></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        reportData.map((each_level_1) => {
                            return <>
                                <div className="row mx-3   bottom-border-1   text-dark" style={{ backgroundColor: "#fd8b5a" }} >
                                    <div className="  col-md-4   col-4    font-size-12 pl-1   text-left  my-1">
                                        {each_level_1.name}
                                    </div>
                                    <div className="  col-md-8  col-8    font-size-12     text-center  my-1">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="col-md-6 px-0 text-left">Debit</div>
                                                <div className="col-md-6  text-right">Credit</div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="col-md-6 px-0 text-left">Debit</div>
                                                <div className="col-md-6  text-right">Credit</div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="col-md-6 px-0 text-left">Debit</div>
                                                <div className="col-md-6  text-right">Credit</div>
                                            </div>
                                        </div>
                                    </div>


                                </div>

                                {
                                    each_level_1.children.map((each_level_2) => {
                                        return <>
                                            <div className="row mx-3   bottom-border-1  text-dark" style={{ backgroundColor: "#f7ab8b" }}>
                                                <div className="  col-md-4   col-4    font-size-12  pl-2   text-left  my-1">
                                                    {each_level_2.name}
                                                </div>
                                                <div className="  col-md-8  col-8    font-size-12     text-center  my-1">
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <div className="col-md-6 px-0 text-left">Debit</div>
                                                            <div className="col-md-6  text-right">Credit</div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="col-md-6 px-0 text-left">Debit</div>
                                                            <div className="col-md-6  text-right">Credit</div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="col-md-6 px-0 text-left">Debit</div>
                                                            <div className="col-md-6  text-right">Credit</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                each_level_2.children.map((each_level_3) => {
                                                    return <>
                                                        <div className="row mx-3   bottom-border-1  text-dark" style={{ backgroundColor: "#ffbca0" }}>
                                                            <div className="  col-md-4   col-4    font-size-12   pl-3  text-left  my-1">
                                                                {each_level_3.name}
                                                            </div>
                                                            <div className="  col-md-8  col-8    font-size-12     text-center  my-1">
                                                                <div className="row">
                                                                    <div className="col-md-4">
                                                                        <div className="col-md-6 px-0 text-left">Debit</div>
                                                                        <div className="col-md-6  text-right">Credit</div>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <div className="col-md-6 px-0 text-left">Debit</div>
                                                                        <div className="col-md-6  text-right">Credit</div>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <div className="col-md-6 px-0 text-left">Debit</div>
                                                                        <div className="col-md-6  text-right">Credit</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {
                                                            each_level_3.children.map((each_level_4) => {
                                                                return <>
                                                                    <div className="row mx-3   bottom-border-1  text-dark" style={{ backgroundColor: "#ffcbb5" }}>
                                                                        <div className="  col-md-4   col-4    font-size-12   pl-4  text-left  my-1">
                                                                            {each_level_4.name}
                                                                        </div>
                                                                        <div className="  col-md-8  col-8    font-size-12     text-center  my-1">
                                                                            <div className="row">
                                                                                <div className="col-md-4">
                                                                                    <div className="col-md-6 px-0 text-left">Debit</div>
                                                                                    <div className="col-md-6  text-right">Credit</div>
                                                                                </div>
                                                                                <div className="col-md-4">
                                                                                    <div className="col-md-6 px-0 text-left">Debit</div>
                                                                                    <div className="col-md-6  text-right">Credit</div>
                                                                                </div>
                                                                                <div className="col-md-4">
                                                                                    <div className="col-md-6 px-0 text-left">Debit</div>
                                                                                    <div className="col-md-6  text-right">Credit</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {
                                                                        each_level_4.children.map((each_level_5) => {
                                                                            return <>
                                                                                <div className="row mx-3   bottom-border-1  text-dark" style={{ backgroundColor: "#ffe4d9" }}>
                                                                                    <div className="  col-md-4   col-4   pl-5  font-size-12    text-left  my-1">
                                                                                        {each_level_5.name}
                                                                                    </div>
                                                                                    <div className="  col-md-8  col-8    font-size-12     text-center  my-1">
                                                                                        <div className="row">
                                                                                            <div className="col-md-4">
                                                                                                <div className="col-md-6 px-0 text-left">  {each_level_5.opening_balance.opening_balance1}</div>
                                                                                                <div className="col-md-6  text-right">  {each_level_5.opening_balance.opening_balance1}</div>
                                                                                            </div>
                                                                                            <div className="col-md-4">
                                                                                                <div className="col-md-6  text-right">{each_level_5.current_balance.total_debit}</div>
                                                                                                <div className="col-md-6 px-0 text-left">{each_level_5.current_balance.total_credit}</div>
                                                                                            </div>
                                                                                            <div className="col-md-4">
                                                                                                <div className="col-md-6  text-right"> {each_level_5.closing_balance.total_debit}</div>
                                                                                                <div className="col-md-6 px-0 text-left"> {each_level_5.closing_balance.total_credit}</div>
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
                </div>

            </div>
        );
    }
);

export default TrialSheetReciept;