
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../../Layout/Loader/Loader.js";
import Select from "react-select";
import axios from "axios";
import { customStyles } from "../../Components/reactCustomSelectStyle.jsx";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const EmployeeProfile = () => {
    const showNavMenu = useSelector((state) => state.NavState);
    const [isLoading, setisLoading] = useState(true);

    const [ListOfEmployee, setListOfEmployee] = useState([]);
    const [designation, setDesignation] = useState([]);
    const [inputOptions, setInputOptions] = useState("");

    const [date, setdate] = useState("2020-09-01");
    const [selectedValue, setSelectedValue] = useState("");

    const URL = localStorage.getItem("authUser");

    const handleChange = (value) => {
        setSelectedValue(value);
        fetchAllData(value);
    };
    const handleChangeDate = (value) => {
        setdate(value);
        fetchAllData(value);
    };

    const fetchData = async () => {
        var config = {
            method: "get",
            url: `${URL}api/EmployeeDetails/GetActiveEmployee`,
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token
                    }`,
            },
        };
        await axios(config)
            .then(function (response) {
                setInputOptions([
                    { label: "All", value: 0 },
                    ...response.data,
                ]);
                setisLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    // const fetchAllData = () => {
    //     var axios = require('axios');


    //     var config = {
    //         method: 'get',
    //         //url: 'http://rightway-api.genial365.com/api/EmployeeDetails/GetEmployeeProfile?emp_id=2&dep_id=1&month_first_date=09-09-2020',
    //         url: `${URL}api/EmployeeDetails/GetEmployeeProfile?emp_id=${e.value}&dep_id=1&month_first_date=09-09-2020`,
    //         headers: {
    //             Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
    //         },

    //     };

    //     axios(config)
    //         .then(function (response) {
    //             setListOfEmployee((response.data));
    //             setisLoading(false);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // };

    const fetchAllData = async (e) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://rightway-api.genial365.com/api/EmployeeDetails/GetEmployeeProfile?emp_id=2&dep_id=1&month_first_date=09-09-2020", requestOptions)
            //fetch(`${URL}api/EmployeeDetails/GetEmployeeProfile?emp_id=${e.value}&dep_id=1&month_first_date=09-09-2020`, requestOptions)
            .then((response) => {
                response.json()
                    .then((result) => { setListOfEmployee(result); setisLoading(false); });
            })
            .catch(error => console.log('error', error));
    };

    // fetch(URL + "api/EmployeeDetails/GetEmployeeProfile?emp_id=2&dep_id=1&month_first_date=09-09-2020", requestOptions)
    //         .then((response) => {response.json()
    //         .then((result) => {setListOfEmployee(result);setisLoading(false); }); })
    //         .catch((error) => console.log("error", error));



    useEffect(() => {
        fetchData();
        fetchAllData();
    }, []);

    return (

        <>

            {isLoading ? (
                <>
                    <Loader />
                </>
            ) : (
                <>

                    <div
                        className={`container-fluid page-title-bar ${showNavMenu == false ? "right_col-margin-remove" : ""
                            }   `}
                    >
                        <span>&nbsp;Employee Profile</span>
                    </div>
                    <div
                        role="main"
                        className={`right_col  h-100  ${showNavMenu === false ? "right_col-margin-remove" : " "
                            } `}
                    >


                        <div className="x_panel ">
                            <div className="x_content mt-3">


                                <div className="row">
                                    <div className="field item form-group col-md-12 col-sm-12">
                                        <label className="col-form-label col-md-2 col-sm-2 label-align">
                                            Select Employee <span className="required">*</span>
                                        </label>
                                        <div className="col-md-3 col-sm-3">
                                            <div>
                                                <Select
                                                    placeholder={"All"}
                                                    getOptionLabel={(e) => e.label}
                                                    getOptionValue={(e) => e.value}
                                                    value={selectedValue}
                                                    options={inputOptions}
                                                    onChange={handleChange}
                                                    styles={customStyles}
                                                />
                                            </div>
                                        </div>

                                        <label className="col-form-label col-md-2 col-sm-2 label-align">
                                            Select Date <span className="required">*</span>
                                        </label>
                                        <div className="col-md-3 col-sm-3">
                                            <div>
                                                <input
                                                    onChange={handleChangeDate}
                                                    placeholder="All Dates"
                                                    styles={customStyles}
                                                    className="form-control"
                                                    type="date"
                                                    value={date}
                                                //min="2022-09-09"
                                                // onChange={(e) => {
                                                //     setdate(e.target.value);
                                                //     fetchAllData();
                                                // }}
                                                />
                                            </div>
                                        </div>


                                        {/* <div className="col-md-2 col-sm-2" align="right">
                                            {visableDiv === "true" && (
                                                <button
                                                    className="btn btn-dark fa fa-edit pl-3"
                                                    type="button"
                                                    onClick={(e) => {
                                                        setDivToVisable("false");
                                                        <input disabled="false" />;
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                            )}

                                            {visableDiv === "false" && (
                                                <button
                                                    className="btn btn-primary fa fa-save pl-3"
                                                    type="submit"
                                                    onClick={() => {
                                                        editBalance();
                                                        setDivToVisable("true");
                                                    }}
                                                >
                                                    Update
                                                </button>
                                            )}
                                        </div> */}


                                    </div>
                                </div>






                                <div className="card" style={{ marginTop: "25px " }} href="lalala"> <h5 className="card-header"> Personal Information</h5>
                                    <div className="row" style={{ marginTop: "6px " }}>
                                        <div className="field item form-group col-md-6 col-sm-6">
                                            <label className="col-form-label col-md-3 col-sm-3 label-align"> Employee Code </label>
                                            <div className="col-md-8 col-sm-8">
                                                <input
                                                    name="name"
                                                    className='form-control'
                                                    value={ListOfEmployee.employee_detail.employee_code}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row" >
                                        <div className="field item form-group col-md-6 col-sm-6">
                                            <label className="col-form-label col-md-3 col-sm-3 label-align">Name</label>{
                                            }
                                            <div className="col-md-8 col-sm-8">
                                                <input
                                                    name="name"
                                                    disabled
                                                    className='form-control'
                                                    value={ListOfEmployee?.employee_detail.employee_name}

                                                />
                                            </div>
                                        </div>

                                        <div className="field item form-group col-md-6 col-sm-6">
                                            <label className="col-form-label col-md-3 col-sm-3 label-align pl-0">Surname  </label>
                                            <div className="col-md-8 col-sm-8">
                                                <input
                                                    name="name"
                                                    className='form-control'
                                                    disabled
                                                    value={ListOfEmployee?.employee_detail.sur_name}
                                                />
                                            </div>
                                        </div>


                                        <div className="field item form-group col-md-6 col-sm-6">
                                            <label className="col-form-label col-md-3 col-sm-3 label-align">Address  </label>
                                            <div className="col-md-8 col-sm-8">
                                                <input
                                                    name="name"
                                                    className='form-control'
                                                    value={ListOfEmployee?.employee_detail.address}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div className="field item form-group col-md-6 col-sm-6">
                                            <label className="col-form-label col-md-3 col-sm-3 label-align pl-0">Department </label>
                                            <div className="col-md-8 col-sm-8">

                                                <input
                                                    name="name"
                                                    className='form-control'
                                                    placeholder=""
                                                    value={ListOfEmployee?.employee_detail.designation_id}
                                                    disabled
                                                />
                                            </div>
                                        </div>


                                        <div className="field item form-group col-md-6 col-sm-6">
                                            <label className="col-form-label col-md-3 col-sm-3 label-align pl-0">Phone  </label>
                                            <div className="col-md-8 col-sm-8">
                                                <input
                                                    name="name"
                                                    className='form-control'
                                                    type="number"
                                                    placeholder=""
                                                    value={ListOfEmployee?.employee_detail.cell}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div className="field item form-group col-md-6 col-sm-6">
                                            <label className="col-form-label col-md-3 col-sm-3 label-align">CNIC
                                            </label>
                                            <div className="col-md-8 col-sm-8">
                                                <input
                                                    name="name"
                                                    className='form-control'
                                                    type="number"
                                                    value={ListOfEmployee?.employee_detail.cnic}
                                                    disabled
                                                />
                                            </div>
                                        </div>

                                    </div>



                                </div>


                                <div style={{ marginTop: "25px " }}>
                                    <Tabs
                                        defaultActiveKey="profile"
                                        id="uncontrolled-tab-example"
                                        className="mb-3"
                                    >

                                        <Tab eventKey="profile" title="Employee Profile">
                                            <div className="card" style={{ marginTop: "25px " }}> <h5 className="card-header"> Employee Profile</h5>

                                                <div className="row" style={{ marginTop: "6px " }}>
                                                    <div className="field item form-group col-md-6 col-sm-6">
                                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Total Presents</label>
                                                        <div className="col-md-8 col-sm-8">
                                                            <input
                                                                disabled
                                                                className='form-control'
                                                                //type="number"
                                                                value={ListOfEmployee?.emp_profile.total_persents}
                                                            />
                                                        </div>
                                                    </div>



                                                    <div className="field item form-group col-md-6 col-sm-6">
                                                        <label className="col-form-label col-md-3 col-sm-3 label-align pl-0">Total Absents </label>
                                                        <div className="col-md-8 col-sm-8">
                                                            <input
                                                                disabled
                                                                className='form-control'
                                                                //type="number"
                                                                value={ListOfEmployee?.emp_profile.total_absents}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="field item form-group col-md-6 col-sm-6">
                                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Total Holidays
                                                        </label>
                                                        <div className="col-md-8 col-sm-8">
                                                            <input
                                                                disabled
                                                                className='form-control'
                                                                //type="number"
                                                                value={ListOfEmployee?.emp_profile.total_holidays}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="field item form-group col-md-6 col-sm-6">
                                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Loan Status
                                                        </label>
                                                        <div className="col-md-8 col-sm-8">
                                                            <input
                                                                disabled
                                                                className='form-control'
                                                                // type="number"
                                                                value={ListOfEmployee?.emp_profile.loan_status}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="field item form-group col-md-6 col-sm-6">
                                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Loan Remaining Amount
                                                        </label>
                                                        <div className="col-md-8 col-sm-8">
                                                            <input
                                                                disabled
                                                                className='form-control'
                                                                //type="number"
                                                                value={ListOfEmployee?.emp_profile.loan_remaining_amount}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="field item form-group col-md-6 col-sm-6">
                                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Net Salary
                                                        </label>
                                                        <div className="col-md-8 col-sm-8">
                                                            <input
                                                                disabled
                                                                className='form-control'
                                                                //type="number"
                                                                value={ListOfEmployee?.emp_profile.net_salary}
                                                            />
                                                        </div>
                                                    </div>

                                                </div>



                                            </div>
                                        </Tab>
                                        <Tab eventKey="salary" title="Salary Info" >
                                            <div className="card" style={{ marginTop: "25px " }}> <h5 className="card-header"> Salary Information</h5>

                                                <div className="row" style={{ marginTop: "6px " }}>
                                                    <div className="field item form-group col-md-6 col-sm-6">
                                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Salary Type</label>
                                                        <div className="col-md-8 col-sm-8">
                                                            <input
                                                                disabled
                                                                className='form-control'
                                                                //type="number"
                                                                value={ListOfEmployee?.employee_detail.salary_type}
                                                            />
                                                        </div>
                                                    </div>



                                                    <div className="field item form-group col-md-6 col-sm-6">
                                                        <label className="col-form-label col-md-3 col-sm-3 label-align pl-0">Salary Amount </label>
                                                        <div className="col-md-8 col-sm-8">
                                                            <input
                                                                disabled
                                                                className='form-control'
                                                                type="number"
                                                                value={ListOfEmployee?.employee_detail.salary}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="field item form-group col-md-6 col-sm-6">
                                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Advance Dep ID
                                                        </label>
                                                        <div className="col-md-8 col-sm-8">
                                                            <input
                                                                disabled
                                                                className='form-control'
                                                                type="number"
                                                                value={ListOfEmployee?.employee_detail.advance_department_id}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="field item form-group col-md-6 col-sm-6">
                                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Advance %
                                                        </label>
                                                        <div className="col-md-8 col-sm-8">
                                                            <input
                                                                disabled
                                                                className='form-control'
                                                                type="number"
                                                                value={ListOfEmployee?.employee_detail.advance_percentage}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="field item form-group col-md-6 col-sm-6">
                                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Salary Dep ID
                                                        </label>
                                                        <div className="col-md-8 col-sm-8">
                                                            <input
                                                                disabled
                                                                className='form-control'
                                                                type="number"
                                                                value={ListOfEmployee?.employee_detail.salary_department_id}
                                                            />
                                                        </div>
                                                    </div>

                                                </div>



                                            </div>
                                        </Tab>

                                        <Tab eventKey="others" title="Other Info">
                                            <div className="card" style={{ marginTop: "25px " }}> <h5 className="card-header"> Referral Information</h5>

                                                <div className="row" style={{ marginTop: "6px " }}>
                                                    <div className="field item form-group col-md-6 col-sm-6">
                                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Referral Name</label>
                                                        <div className="col-md-8 col-sm-8">
                                                            <input
                                                                name="name"
                                                                disabled
                                                                className='form-control'
                                                                value={ListOfEmployee?.employee_detail.reference_name}
                                                            />
                                                        </div>
                                                    </div>



                                                    <div className="field item form-group col-md-6 col-sm-6">
                                                        <label className="col-form-label col-md-3 col-sm-3 label-align pl-0">Referral Phone  </label>
                                                        <div className="col-md-8 col-sm-8">
                                                            <input
                                                                name="name"
                                                                className='form-control'
                                                                type="number"
                                                                value={ListOfEmployee?.employee_detail.reference_cell}
                                                                disabled
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="field item form-group col-md-6 col-sm-6">
                                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Referral CNIC
                                                        </label>
                                                        <div className="col-md-8 col-sm-8">
                                                            <input
                                                                name="name"
                                                                className='form-control'
                                                                type="number"
                                                                value={ListOfEmployee?.employee_detail.reference_cnic}
                                                                disabled
                                                            />
                                                        </div>
                                                    </div>

                                                </div>



                                            </div>


                                            <div className="card" style={{ marginTop: "25px " }}> <h5 className="card-header"> Other Information</h5>

                                                <div className="row" style={{ marginTop: "6px " }}>




                                                    <div className="field item form-group col-md-6 col-sm-6">
                                                        <label className="col-form-label col-md-3 col-sm-3 label-align pl-0">Allowed Holidays </label>
                                                        <div className="col-md-8 col-sm-8">
                                                            <input
                                                                disabled
                                                                className='form-control'
                                                                type="number"
                                                                value={ListOfEmployee?.employee_detail.allowed_holidays}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="field item form-group col-md-6 col-sm-6">
                                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Holidays Assigned
                                                        </label>
                                                        <div className="col-md-8 col-sm-8">
                                                            <input
                                                                disabled
                                                                className='form-control'
                                                                type="number"
                                                                value={ListOfEmployee?.employee_detail.holiday_assigned}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="field item form-group col-md-6 col-sm-6">
                                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Status
                                                        </label>
                                                        <div className="col-md-8 col-sm-8">
                                                            <input
                                                                disabled
                                                                className='form-control'
                                                                type="number"
                                                                value={ListOfEmployee?.employee_detail.status}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="field item form-group col-md-6 col-sm-6">
                                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Shift ID
                                                        </label>
                                                        <div className="col-md-8 col-sm-8">
                                                            <input
                                                                disabled
                                                                className='form-control'
                                                                type="number"
                                                                value={ListOfEmployee?.employee_detail.shift_id}
                                                            />
                                                        </div>
                                                    </div>


                                                    <div className="field item form-group col-md-6 col-sm-6">
                                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Created By
                                                        </label>
                                                        <div className="col-md-8 col-sm-8">
                                                            <input
                                                                disabled
                                                                className='form-control'
                                                                //type="number"
                                                                value={ListOfEmployee?.employee_detail.created_by}
                                                            />
                                                        </div>
                                                    </div>


                                                    <div className="field item form-group col-md-6 col-sm-6">
                                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Modified By
                                                        </label>
                                                        <div className="col-md-8 col-sm-8">
                                                            <input
                                                                disabled
                                                                className='form-control'
                                                                //type="number"
                                                                value={ListOfEmployee?.employee_detail.modified_by}
                                                            />
                                                        </div>
                                                    </div>


                                                    <div className="field item form-group col-md-6 col-sm-6">
                                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Is Registered
                                                        </label>
                                                        <div className="col-md-8 col-sm-8">
                                                            <input
                                                                disabled
                                                                className='form-control'
                                                                type="number"
                                                                value={ListOfEmployee?.employee_detail.is_registered}
                                                            />
                                                        </div>
                                                    </div>


                                                    <div className="field item form-group col-md-6 col-sm-6">
                                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Modified Date
                                                        </label>
                                                        <div className="col-md-8 col-sm-8">
                                                            <input
                                                                disabled
                                                                className='form-control'
                                                                //type="date"
                                                                value={ListOfEmployee?.employee_detail.modified_date.slice(0, 10)}
                                                            />
                                                        </div>
                                                    </div>

                                                </div>



                                            </div>



                                            <div className="card" style={{ marginTop: "25px " }}> <h5 className="card-header"> Attachments</h5>

                                                <div className="row" style={{ marginTop: "6px " }}>
                                                    <div className="field item form-group col-md-6 col-sm-6">
                                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Profile Image</label>
                                                        <div className="col-md-8 col-sm-8">
                                                            {/* <input
                name="name"
                disabled
                className='form-control'
                value={ListOfEmployee?.employee_detail.profile_image.slice(1, -1)}
            /> */}
                                                            <img
                                                                src={`http://rightway-api.genial365.com${ListOfEmployee?.employee_detail.profile_image.slice(1, -1)}`}
                                                                alt="not found"
                                                                width="140"
                                                                height="140"
                                                                style={{ borderRadius: "7px" }}
                                                            />
                                                        </div>
                                                    </div>



                                                    <div className="field item form-group col-md-6 col-sm-6">
                                                        <label className="col-form-label col-md-3 col-sm-3 label-align pl-0">CNIC Front </label>
                                                        <div className="col-md-8 col-sm-8">
                                                            <img
                                                                src={`http://rightway-api.genial365.com${ListOfEmployee?.employee_detail.cnic_front.slice(1, -1)}`}
                                                                alt="not found"
                                                                width="280"
                                                                height="140"
                                                                style={{ borderRadius: "7px" }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="field item form-group col-md-6 col-sm-6" style={{ marginTop: "6px " }}>
                                                        <label className="col-form-label col-md-3 col-sm-3 label-align">CNIC Back
                                                        </label>
                                                        <div className="col-md-8 col-sm-8">
                                                            <img
                                                                src={`http://rightway-api.genial365.com${ListOfEmployee?.employee_detail.cnic_back.slice(1, -1)}`}
                                                                alt="not found"
                                                                width="280"
                                                                height="140"
                                                                style={{ borderRadius: "7px" }}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="field item form-group col-md-6 col-sm-6" style={{ marginTop: "6px " }}>
                                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Other Attachments
                                                        </label>
                                                        <div className="col-md-8 col-sm-8">
                                                            <img
                                                                src={`http://rightway-api.genial365.com${ListOfEmployee?.employee_detail.attachments.slice(1, -1)}`}
                                                                alt="not found"
                                                                width="280"
                                                                height="140"
                                                                style={{ borderRadius: "7px" }}
                                                            />
                                                        </div>
                                                    </div>

                                                </div>



                                            </div>
                                        </Tab>
                                    </Tabs>

                                </div>




                            </div>
                        </div>
                    </div>
                </>
            )}


        </>
    );
};

export default EmployeeProfile;