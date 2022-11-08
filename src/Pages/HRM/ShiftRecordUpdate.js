import React, { useState, useEffect } from 'react'
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Loader from '../../Layout/Loader/Loader';
import CustomInnerHeader from '../../Components/CustomInnerHeader';

const ShiftRecordUpdate = () => {
    const [isLoading, setIsLoading] = useState(true)
    var day = new Date().toLocaleDateString(undefined, { day: "2-digit" });
    var month = new Date().toLocaleDateString(undefined, { month: "2-digit" });
    var year = new Date().toLocaleDateString(undefined, { year: "numeric" });
    const dateToday = `${year}-${month}-${day}`
    const [List, setList] = useState()
    const [date, setdate] = useState({ dateTo: dateToday, dateFrom: dateToday })
    const [shift_records_entries, set_shift_records] = useState([])
    const showNavMenu = useSelector((state) => state.NavState);
    //PUT
    const updateData = async () => {
        var config = {
            method: 'PUT',
            url: `http://rightway-api.genial365.com/api/EmployeeShiftsRecord/UpdateData?date_from=${date.dateFrom}&date_to=${date.dateTo}`,
            headers: {
                'Authorization': `bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
                'content-Type': 'application/json'
            },
            data: JSON.stringify({ shift_records_entries })

        };
        var axios = require('axios');
        await axios(config)
            .then(function (response) {
              
                toast.success(
                    "Shift has been " +
                    ("Updated" + " successfully!")
                );
                fetchAllData();
            })
            .catch(function (error) {
             
            });

    };
    //GET
    const fetchAllData = async () => {
        var axios = require('axios');
        var config = {
            method: 'GET',
            url: `http://rightway-api.genial365.com/api/EmployeeShiftsRecord/GetData?date_from=09-01-2020`,
            headers: {
                'Authorization': `bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`
            }
        };

        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setIsLoading(false);
                   
                    setList(response.data);


                }

            })
            .catch(function (error) {

            });

    };
    //Radio button onChange
    const editData = (empId, e) => {



        set_shift_records([...shift_records_entries, { shift_id: Number(e.target.value), employee_id: empId }]);

    }

    useEffect(() => {
        fetchAllData();


    }, [])





    return (


        <>
            {isLoading ? (
                <Loader />
            ) : (<>
                <div className={`container-fluid page-title-bar ${showNavMenu == false ? "right_col-margin-remove" : ""}   `} >
                    <CustomInnerHeader moduleName={"HR Management"} isShowSelector={true} />
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
                                            value={date.dateFrom}


                                            onChange={((e) => {
                                                setdate(
                                                    {
                                                        ...date,
                                                        dateFrom: e.target.value
                                                    }
                                                )
                                            })} />
                                    </div>
                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Date to<span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">

                                        <input
                                            type="date"
                                            data-validate-length-range={6}
                                            data-validate-words={2}
                                            className="form-control" value={date.dateTo} onChange={((e) => {
                                                setdate(
                                                    {
                                                        ...date,
                                                        dateTo: e.target.value
                                                    }
                                                )
                                            })}
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="col-md-12 text-right x_footer">
                            <button className="btn btn-primary" type="submit" onClick={() => { updateData(); }} >
                                Update
                            </button>
                        </div>
                    </div>
                    <div className="x_panel  ">
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
                            <div className="table-responsive px-3 pb-2">
                                <table className="table table-striped jambo_table bulk_action">
                                    <thead>
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
                                                    <td className=" ">{(item.shift_name == 'A Shift') ? <><input type="radio" name={id + 1} defaultChecked value="1" onChange={(e) => editData(item.employee_id, e)} /></> : <input type="radio" name={id + 1} value="1" onChange={(e) => editData(item.employee_id, e)} />}</td>
                                                    <td className=" ">{(item.shift_name == 'B Shift') ? <><input type="radio" name={id + 1} defaultChecked value="2" onChange={(e) => editData(item.employee_id, e)} /></> : <input type="radio" name={id + 1} value="2" onChange={(e) => editData(item.employee_id, e)} />}</td>
                                                    <td className=" ">{(item.shift_name == 'C Shift') ? <><input type="radio" name={id + 1} defaultChecked value="3" onChange={(e) => editData(item.employee_id, e)} /></> : <input type="radio" name={id + 1} value="3" onChange={(e) => editData(item.employee_id, e)} />}</td>
                                                    <td className=" ">{(item.shift_name == 'General Shift') ? <><input type="radio" name={id + 1} defaultChecked value="4" onChange={(e) => editData(item.employee_id, e)} /></> : <input type="radio" name={id + 1} value="4" onChange={(e) => editData(item.employee_id, e)} />}</td>
                                                </tr>

                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </>)}
        </>
    );
};

export default ShiftRecordUpdate