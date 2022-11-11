import React, { useState } from 'react'
import { useSelector } from "react-redux";
import CustomInnerHeader from '../../Components/CustomInnerHeader';
import Loader from '../../Layout/Loader/Loader';

const ShiftManagement = () => {
    const [isLoading, setIsLoading] = useState(false)

    var day = new Date().toLocaleDateString(undefined, { day: "2-digit" });
    var month = new Date().toLocaleDateString(undefined, { month: "2-digit" });
    var year = new Date().toLocaleDateString(undefined, { year: "numeric" });
    const dateToday = `${year}-${month}-${day}`
    const [List, setList] = useState()
    const [date, setdate] = useState(dateToday)
    const [showTable, setshowTable] = useState(false)

    const showNavMenu = useSelector((state) => state.NavState);
    //GET
    const fetchAllData = async () => {
        setIsLoading(true);
        var axios = require('axios');
        var config = {
            method: 'get',
            url: `http://rightway-api.genial365.com/api/EmployeeShiftsRecord/GetData?date_from=${date}`,
            headers: {
                'Authorization': `bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`
            }
        };
        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setIsLoading(false)
                    setList((response.data));

                }
            })
            .catch(function (error) {


            });
    };
    return (
        <>



            <div className={`container-fluid page-title-bar ${showNavMenu == false ? "right_col-margin-remove" : ""}   `} >
                <CustomInnerHeader moduleName={"Shift Management"} isShowSelector={true} />
            </div>

            <div role="main" className={`right_col  h-100  ${showNavMenu === false ?
                "right_col-margin-remove" : " "} `}>
                <div className="x_panel">
                    <div className="x_content my-3">
                        <span className="section pl-4">
                            <i className="fa fa-list"></i>&nbsp;Shift Details
                        </span>
                        <div className="row">
                            <div className="field item form-group col-md-6 col-sm-6">

                                <label className="col-form-label col-md-3 col-sm-3 label-align">Date from<span className="required">*</span></label>
                                <div className="col-md-8 col-sm-8">

                                    <input
                                        type="date"
                                        className="form-control"
                                        data-validate-length-range={6}
                                        data-validate-words={2}
                                        value={date}
                                        onChange={(e) => setdate(e.target.value)} />
                                </div>

                            </div>
                            <div className="col-md-6 text-right ">
                        <button className="btn btn-primary" type="submit" onClick={() => { fetchAllData(); setshowTable(true) }}  >
                            Submit
                            {isLoading && 
                  (
                   <i class="fa fa-circle-o-notch fa-spin mx-1"></i>
                  )
               }
                        </button>
                    </div>
                        </div>

                    </div>

                      </div>
                {showTable ? (<div className="x_panel  ">
                    <div className="x_content">
                        <span className="section pl-3">
                            <div className="row   pt-3">
                                <div className="col-3">
                                    <i className='fa fa-list'></i>&nbsp;Listing
                                </div>
                                <div className="col-9 text-right ">
                                </div>
                            </div>
                        </span>
                        <div className="table-responsive px-3 pb-2" style={{ overflow: 'scroll', height: '400px',  }}>
                            <table    className="table table-striped jambo_table bulk_action">
                                <thead style={{position: 'sticky', top: '0',zIndex: '1'}} >
                                    <tr className="headings">
                                        <th className="column-title  right-border-1 text-center" width="10%"> Sr. </th>


                                        <th className="column-title   right-border-1 text-center" >
                                            EMP Name
                                        </th>

                                        <th className="column-title   right-border-1 text-center" >
                                            A Shift
                                        </th>
                                        <th className="column-title   right-border-1 text-center" >
                                            B Shift
                                        </th>
                                        <th className="column-title   right-border-1 text-center" >
                                            C Shift
                                        </th>
                                        <th className="column-title   right-border-1 text-center" >
                                            General Shift
                                        </th>

                                    </tr>
                                </thead>

                                <tbody>

                                    {List?.map((item, id) => {
                                        return (

                                            <tr key={id} className="even pointer text-center" >
                                                <td className=" ">{id + 1}</td>

                                                <td className=" ">{item.employee_name}</td>
                                                <td className=" ">{(item.shift_name == 'A Shift') ? <><input type="radio" checked /></> : <input type="radio" disabled />}</td>
                                                <td className=" ">{(item.shift_name == 'B Shift') ? <><input type="radio" checked /></> : <input type="radio" disabled />}</td>
                                                <td className=" ">{(item.shift_name == 'C Shift') ? <><input type="radio" checked /></> : <input type="radio" disabled />}</td>
                                                <td className=" ">{(item.shift_name == 'General Shift') ? <><input type="radio" checked /></> : <input type="radio" disabled />}</td>

                                            </tr>

                                        )
                                    })}
                                </tbody>
                            </table>
                            {List?.length == 0 && <div className="row mx-1 row-1  reportTableBody " style={{ cursor: "pointer" }}>
                                <div className="col-md-12  col-12  font-size-12 bold-6 m-0  py-1 pt-1   text-center ">
                                    <span className='text-center'> No Data Available</span>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>) : null}
            </div>

        </>
    );
};

export default ShiftManagement