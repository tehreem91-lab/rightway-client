import React from "react";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const PLStatementReciept = React.forwardRef(({ getPayable, getReceivable, setToggle }, ref) => {
    return (
        <div>
            <div className="x_content px-0  mb-3">
                <Tabs style={{backgroundColor: 'white'}}
                    defaultActiveKey="profile"
                    id="justify-tab-example"
                    className="mb-3"
                    justify
                >
                    {" "}

                  
                    <Tab eventKey="profile" title="Receivable"
                    onChange={()=>setToggle(true)}
                    >
                        <div ref={ref} style={{ overflow: 'scroll' ,height: '400px'}}>
                        <div className="displayPropertyForPrint">
                        <h2 className="text-dark text-center font-weight-bold ">
                        Payable Receivable Report
                        </h2>
                          </div>
                            <div  className="row mx-3  reportTableHead bottom-border-1 ">
                                <div className="  col-md-2   col-1    font-size-12  right-border-1  text-center  my-1">
                                    Sr.No
                                </div>
                                <div className="  col-md-5   col-6    font-size-12  right-border-1  text-center  my-1">
                                    Account Title
                                </div>
                                <div className="  col-md-3   col-3    font-size-12  right-border-1  text-center  my-1">
                                    Account Code
                                </div>
                                <div className="  col-md-2   col-2   right-border-2  font-size-12   right-border-1  text-center  my-1">
                                    Amount
                                </div>
                                {/* ---------- */}
                            </div>
                            <div  className="row mx-3  reportTableHead bottom-border-1 displayPropertyForPrint">
                                <div className="  col-md-12   col-12    font-size-12  right-border-1  text-center  my-1">
                                    Receivable Amount
                                </div>

                            </div>
                            {getReceivable.length === 0 ? (
                                <div className="row mx-3  reportTableBody bottom-border-2">
                                  <div className=" col-md-12   col-12   px-0 right-border-1 h-100 text-center font-size-12 right-border-2 py-1 h-100 left-border-2 d-flex justify-content-center align-items-center">
                                    No Data Available
                                  </div>
                                </div>
                              ) : (<>
                                {getReceivable.map((each_acc, index) => {
                                    return <>
                                        <div className="row mx-3  reportTableBody" key={index}>
                                            <div className="col-md-2   col-1   bottom-border-2   right-border-2  left-border-2  text-center    ">
                                                {index + 1}  </div>
                                            <div className="col-md-5   col-6   bottom-border-2   right-border-2  text-left    ">
                                                {each_acc.account_name} </div>
                                            <div className="col-md-3   col-3   bottom-border-2   right-border-2  text-center    ">
                                                {each_acc.account_code} </div>
                                            <div className="col-md-2   col-2   bottom-border-2   right-border-2  text-right    ">
                                                {(each_acc.balance * -1).toFixed(2)}  </div>
                                        </div>
                                    </>
                                })}
                                </>
                                )}
                         
                            <div className="row mx-3  reportTableHead bottom-border-1 displayPropertyForPrint">
                                <div className="  col-md-12   col-12    font-size-12  right-border-1  text-center  my-1">
                                    Payable Amount
                                </div>

                            </div>
                            
                            {getPayable.map((each_acc, index) => {
                                return <>
                                    <div className="row mx-3  reportTableBody displayPropertyForPrint" key={index} >
                                        <div className="col-md-1   col-1   bottom-border-2   right-border-2  left-border-2  text-center    ">
                                            {index + 1}  </div>
                                        <div className="col-md-6   col-6   bottom-border-2   right-border-2  text-left    ">
                                            {each_acc.account_name} </div>
                                        <div className="col-md-3   col-3   bottom-border-2   right-border-2  2  text-center       ">
                                            {each_acc.account_code} </div>
                                        <div className="col-md-2   col-2   bottom-border-2   right-border-2  text-right    ">
                                            {(each_acc.balance).toFixed(2)}  </div>
                                    </div>
                                </>
                            })}

                        </div>
                    </Tab>
                    <Tab eventKey="home" title="Payable"
                    onChange={()=>setToggle(false)}
                    >
                        <div id="Table-header" className="row mx-3  reportTableHead bottom-border-1 ">
                            <div className="  col-md-1   col-3    font-size-12  right-border-1  text-center  my-1">
                                Sr.No
                            </div>
                            <div className="  col-md-6   col-3    font-size-12  right-border-1  text-center  my-1">
                                Account Title
                            </div>
                            <div className="  col-md-3   col-2    font-size-12  right-border-1  text-center  my-1">
                                Account Code
                            </div>
                            <div className="  col-md-2   col-2   right-border-2  font-size-12   right-border-1  text-center  my-1">
                                Amount
                            </div>
                            {/* ---------- */}
                        </div>
                        {getPayable.length === 0 ? (
                            <div className="row mx-3  reportTableBody bottom-border-2">
                            <div className=" col-md-12   col-12   px-0 right-border-1 h-100 text-center font-size-12 right-border-2 py-1 h-100 left-border-2 d-flex justify-content-center align-items-center">
                              No Data Available
                            </div>
                          </div>
                          ) : (<>
                            {getPayable.map((each_acc, index) => {
                                return <>
                                    <div className="row mx-3  reportTableBody" key={index} >
                                        <div className="col-md-1   col-3   bottom-border-2   right-border-2  left-border-2  text-center    ">
                                            {index + 1}  </div>
                                        <div className="col-md-6   col-3   bottom-border-2   right-border-2  text-left    ">
                                            {each_acc.account_name} </div>
                                        <div className="col-md-3   col-3   bottom-border-2   right-border-2 2  text-center       ">
                                            {each_acc.account_code} </div>
                                        <div className="col-md-2   col-3   bottom-border-2   right-border-2  text-right    ">
                                            {(each_acc.balance).toFixed(2)}  </div>
                                    </div>
                                </>
                            })}
                            
                            </>)}
                        
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
}
);

export default PLStatementReciept;
