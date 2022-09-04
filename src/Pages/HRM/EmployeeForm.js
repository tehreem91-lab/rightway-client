import Select from 'react-select'
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../../Layout/Loader/Loader.js";
import { customStyles } from '../../Components/reactCustomSelectStyle';
import Creatable from "react-select/creatable";

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";

const EmployeeForm = (props) => {
    console.log(props.selectEmployee, "______");
    const showNavMenu = useSelector((state) => state.NavState);
    const [isLoading, setisLoading] = useState(false);

    const URL = localStorage.getItem("authUser");
    const optionsST = [
        { value: 'Salary', label: 'Salary' },
        { value: 'Wages', label: 'Wages' }
    ]
    const optionsAH = [
        { value: '0', label: 'Select Day' },
        { value: '1', label: 'Monday' },
        { value: '2', label: 'Tuesday' },
        { value: '3', label: 'Wednesday' },
        { value: '4', label: 'Thursday' },
        { value: '5', label: 'Friday' },
        { value: '6', label: 'Saturday' },
        { value: '7', label: 'Sunday' }
    ]

    const optionsStatus = [
        { value: '0', label: 'Active' },
        { value: '1', label: 'Left' }
    ]


    const emplEditValidatorInitialState = {
        employee_code: true,
        employee_name: true,
        sur_name: true,
        cell: true,
        cnic: true,
        profile_image: true,
        cnic_image: true,
        address: true,
        department_id: true,
        reference_name: true,
        reference_cell: true,
        reference_cnic: true,
        salary_type: true,
        salary: true,
        is_overtime_allow: true,
        over_time: true,
        designation_id: true,
        advance_percentage: true,
        allowed_holidays: true,
        holiday_assigned: true,
        shift_id: true,
        status: true,
        benefits: true
    }
    const [emplEditValidator, setEmplEditValidator] = useState(emplEditValidatorInitialState)
    const updateFunct = (e) => {

        e.preventDefault(); props.updateEmployeeClouds();

        if (props.selectEmployee.employee_name === "" || props.selectEmployee.employee_name === undefined || props.selectEmployee.employee_name === null ||
            props.selectEmployee.employee_name === " " || props.selectEmployee.employee_name == "" || props.selectEmployee.employee_name == " ") {
            setEmplEditValidator({ ...emplEditValidator, employee_name: false })

        } else if (props.selectEmployee.cnic === "" || props.selectEmployee.cnic === undefined || props.selectEmployee.cnic === null ||
            props.selectEmployee.cnic === " " || props.selectEmployee.cnic == "" || props.selectEmployee.cnic == " ") {
            setEmplEditValidator({ ...emplEditValidator, cnic: false })


        } else if (props.selectEmployee.sur_name === "" || props.selectEmployee.sur_name === undefined || props.selectEmployee.sur_name === null ||
            props.selectEmployee.sur_name === " " || props.selectEmployee.sur_name == "" || props.selectEmployee.sur_name == " ") {
            setEmplEditValidator({ ...emplEditValidator, sur_name: false })


        } else if (props.selectEmployee.address === "" || props.selectEmployee.address === undefined || props.selectEmployee.address === null ||
            props.selectEmployee.address === " " || props.selectEmployee.address == "" || props.selectEmployee.address == " ") {
            setEmplEditValidator({ ...emplEditValidator, address: false })


        } else if (props.selectEmployee.cell === "" || props.selectEmployee.cell === undefined || props.selectEmployee.cell === null ||
            props.selectEmployee.cell === " " || props.selectEmployee.cell == "" || props.selectEmployee.cell == " ") {
            setEmplEditValidator({ ...emplEditValidator, cell: false })

            // } else if (props.selectEmployee.employeeCnicFront === "" || props.selectEmployee.employeeCnicFront === undefined || props.selectEmployee.employeeCnicFront === null ||
            //   props.selectEmployee.employeeCnicFront === " " || props.selectEmployee.employeeCnicFront == "" || props.selectEmployee.employeeCnicFront == " ") {
            //   setEmplEditValidator({ ...emplEditValidator, cnicFront: false })

            // } else if (props.selectEmployee.employeeCnicBsck === "" || props.selectEmployee.employeeCnicBsck === undefined || props.selectEmployee.employeeCnicBsck === null ||
            //   props.selectEmployee.employeeCnicBsck === " " || props.selectEmployee.employeeCnicBsck == "" || props.selectEmployee.employeeCnicBsck == " ") {
            //   setEmplEditValidator({ ...emplEditValidator, cnicBack: false })

            // } else if (props.selectEmployee.employeePic1 === "" || props.selectEmployee.employeePic1 === undefined || props.selectEmployee.employeePic1 === null ||
            //   props.selectEmployee.employeePic1 === " " || props.selectEmployee.employeePic1 == "" || props.selectEmployee.employeePic1 == " ") {
            //   setEmplEditValidator({ ...emplEditValidator, empPic1: false })

            // } else if (props.selectEmployee.employeePic2 === "" || props.selectEmployee.employeePic2 === undefined || props.selectEmployee.employeePic2 === null ||
            //   props.selectEmployee.employeePic2 === " " || props.selectEmployee.employeePic2 == "" || props.selectEmployee.employeePic2 == " ") {
            //   setEmplEditValidator({ ...emplEditValidator, empPic2: false })


        } else {






            setEmplEditValidator(emplEditValidatorInitialState);
        }


    }




    const [roomInputs, setRoomInputs] = useState([
        { boardBasic: "", roomType: "" }
    ]);

    // room handle input change
    const handleRoomChange = (option, index, name) => {
        const value = option.value;
        console.log(value);
        //alert(`handleRoomChange: [${index}][${name}] ${value}`);
        const list = [...roomInputs];
        list[index][name] = value;
        setRoomInputs(list);
    };

    //room handle click event of the Remove button
    const handleRemoveClickRoom = (index) => {
        const list = [...roomInputs];
        list.splice(index, 1);
        setRoomInputs(list);
    };

    //room handle click event of the Add button
    const handleAddClickRoom = () => {
        setRoomInputs([...roomInputs, { boardBasic: "", roomType: "" }]);
    };

    const onsubmit = (event) => {
        event.preventDefault();
        let disp = '';
        for (let di = 0; di < roomInputs.length; di++) {
            disp += ` {${roomInputs[di].boardBasic} - ${roomInputs[di].roomType}}`;
        }

        alert('room inputs: ' + disp);
        console.log(roomInputs);
    };


    return (

        <>

            {isLoading ? (
                <>
                    <Loader />
                </>
            ) : (
                <>
                    <div className="x_panel ">
                        <div className="x_content mt-3">



                            <div className="row">
                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label htmlFor="exampleFormControlFile1" className="col-form-label col-md-3 col-sm-3 label-align">Upload Profile Pic</label>


                                    <div
                                        className="col-md-6  "

                                    >
                                        {props.selectEmployee.profile_image === undefined ||
                                            props.selectEmployee.profile_image === "" ||
                                            props.selectEmployee.profile_image === null ? (
                                            <></>
                                        ) : (
                                            <>
                                                <img
                                                    src={`${URL}${props.selectEmployee.profile_image.slice(1, -1)}`}
                                                    alt="not found"
                                                    width="140"
                                                    height="140"
                                                    style={{ borderRadius: "7px" }}
                                                />
                                            </>
                                        )}
                                        <div className="row my-1">
                                            <div className="col-md-1 px-0">
                                                {" "}
                                                {props.isEmplEditModeOn ? (
                                                    <span className="required">*</span>
                                                ) : (
                                                    <></>
                                                )}{" "}
                                            </div>

                                            <div className="col-md-10 px-0">
                                                {props.isEmplEditModeOn ? (
                                                    <>
                                                        <input
                                                            className={`${props.isEmplEditModeOn ? (emplEditValidator.profile_image ? "form-control" : "form-control requiredValidateInput") : "form-control form-control-remove"}`}

                                                            id="formFileSm"
                                                            type="file"
                                                            style={{ height: "33px" }}
                                                            disabled={props.disableSubmitForUpdatePhoto ? true : false}
                                                            onChange={props.fileHandle1ForUpdate}
                                                        />{" "}
                                                    </>
                                                ) : (
                                                    <></>
                                                )}
                                            </div>
                                        </div>
                                    </div>


                                </div>

                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label htmlFor="exampleFormControlFile1" className="col-form-label col-md-3 col-sm-3 label-align">Upload CNIC</label>


                                    <div
                                        className="col-md-6  "

                                    >
                                        {props.selectEmployee.cnic_image === undefined ||
                                            props.selectEmployee.cnic_image === "" ||
                                            props.selectEmployee.cnic_image === null ? (
                                            <></>
                                        ) : (
                                            <>
                                                <img
                                                    src={`${URL}${props.selectEmployee.cnic_image.slice(1, -1)}`}
                                                    alt="not found"
                                                    width="280"
                                                    height="140"
                                                    style={{ borderRadius: "7px" }}
                                                />
                                            </>
                                        )}
                                        <div className="row my-1">
                                            <div className="col-md-1 px-0">
                                                {" "}
                                                {props.isEmplEditModeOn ? (
                                                    <span className="required">*</span>
                                                ) : (
                                                    <></>
                                                )}{" "}
                                            </div>
                                            <div className="col-md-10 px-0">
                                                {props.isEmplEditModeOn ? (
                                                    <>
                                                        <input
                                                            className={`${props.isEmplEditModeOn ? (emplEditValidator.cnic_image ? "form-control" : "form-control requiredValidateInput") : "form-control form-control-remove"}`}
                                                            // className={props.employeeListValidator.employeeCnicBsck ? "form-control " : "form-control requiredValidateInput"}
                                                            id="formFileSm"
                                                            type="file"
                                                            style={{ height: "33px" }}
                                                            disabled={props.disableSubmitForUpdatePhoto ? true : false}
                                                            onChange={props.fileHandle2ForUpdate}
                                                        />{" "}
                                                    </>
                                                ) : (
                                                    <></>
                                                )}
                                            </div>
                                        </div>
                                    </div>


                                </div>


                            </div>






                            <div className="row">
                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align"> Employee Code </label>
                                    <div className="col-md-8 col-sm-8">
                                        <input
                                            name="name"
                                            className='form-control'
                                            //className={`${props.isEmplEditModeOn ? (emplEditValidator.empName ? "form-control" : "form-control requiredValidateInput") : "form-control form-control-remove"}`}
                                            value={props.selectEmployee.employee_code}
                                            disabled
                                            onChange={(e) => {
                                                //setEmplEditValidator(emplEditValidatorInitialState)
                                                props.setEmployeeToUpdate({
                                                    ...props.selectEmployee,
                                                    employee_code: e.target.value,
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Name <span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <input
                                            name="name"
                                            className='form-control'
                                            placeholder="ex. Ali A.Khan"
                                            //className={`${props.isEmplEditModeOn ? (emplEditValidator.empName ? "form-control" : "form-control requiredValidateInput") : "form-control form-control-remove"}`}
                                            value={props.selectEmployee.employee_name}
                                            disabled={!props.isEmplEditModeOn}
                                            onChange={(e) => {
                                                //setEmplEditValidator(emplEditValidatorInitialState)
                                                props.setEmployeeToUpdate({
                                                    ...props.selectEmployee,
                                                    employee_name: e.target.value,
                                                });

                                                
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align pl-0">Surname <span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <input
                                            name="name"
                                            className='form-control'
                                            placeholder="ex. Abdul Khan"
                                            //className={`${props.isEmplEditModeOn ? (emplEditValidator.empName ? "form-control" : "form-control requiredValidateInput") : "form-control form-control-remove"}`}
                                            value={props.selectEmployee.sur_name}
                                            disabled={!props.isEmplEditModeOn}
                                            onChange={(e) => {
                                                //setEmplEditValidator(emplEditValidatorInitialState)
                                                props.setEmployeeToUpdate({
                                                    ...props.selectEmployee,
                                                    sur_name: e.target.value,
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>


                            <div className="row">
                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align pl-0">Phone <span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <input
                                            name="name"
                                            className='form-control'
                                            type="number"
                                            placeholder=""
                                            //className={`${props.isEmplEditModeOn ? (emplEditValidator.empName ? "form-control" : "form-control requiredValidateInput") : "form-control form-control-remove"}`}
                                            value={props.selectEmployee.cell}
                                            disabled={!props.isEmplEditModeOn}
                                            onChange={(e) => {
                                                //setEmplEditValidator(emplEditValidatorInitialState)
                                                props.setEmployeeToUpdate({
                                                    ...props.selectEmployee,
                                                    cell: e.target.value,
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align">CNIC{props.isEmplEditModeOn ? (
                                        <span className="required">*</span>
                                    ) : (
                                        <>
                                            <strong>:</strong>
                                        </>
                                    )}
                                    </label>
                                    <div className="col-md-8 col-sm-8">
                                        <input
                                            name="name"
                                            className='form-control'
                                            type="number"
                                            placeholder="without Dashes Ex, 3310567889234"
                                            onInput={(er) =>
                                                (er.target.value = er.target.value.slice(0, 13))
                                            }
                                            //className={`${props.isEmplEditModeOn ? (emplEditValidator.cnicNum ? "form-control" : "form-control requiredValidateInput") : "form-control form-control-remove"}`}

                                            value={props.selectEmployee.cnic}
                                            onChange={(e) => {
                                                //setEmplEditValidator(emplEditValidatorInitialState)
                                                props.setEmployeeToUpdate({
                                                    ...props.selectEmployee,
                                                    cnic: e.target.value,
                                                });
                                            }}
                                            disabled={!props.isEmplEditModeOn}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Address <span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <input
                                            name="name"
                                            className='form-control'
                                            placeholder=""
                                            //className={`${props.isEmplEditModeOn ? (emplEditValidator.empName ? "form-control" : "form-control requiredValidateInput") : "form-control form-control-remove"}`}
                                            value={props.selectEmployee.address}
                                            disabled={!props.isEmplEditModeOn}
                                            onChange={(e) => {
                                                //setEmplEditValidator(emplEditValidatorInitialState)
                                                props.setEmployeeToUpdate({
                                                    ...props.selectEmployee,
                                                    address: e.target.value,
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align pl-0">Department<span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <Creatable
                                            isClearable={false}

                                            options={props.department}
                                            value={{ label: props.selectEmployee.department?.department_name, value: props.selectEmployee.department?.department_id }}
                                            styles={customStyles}
                                            onChange={(value) => {


                                                props.setDepartmentValue(value.value)
                                                props.setEmployeeToUpdate({
                                                    ...props.selectEmployee,
                                                    department: {
                                                        department_id: value.value,
                                                        department_name: value.label
                                                    },
                                                });
                                            }}

                                        />
                                    </div>
                                </div>
                            </div>




                            <div className="row">
                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Reference Name <span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <input
                                            name="name"
                                            className='form-control'
                                            placeholder=""
                                            //className={`${props.isEmplEditModeOn ? (emplEditValidator.empName ? "form-control" : "form-control requiredValidateInput") : "form-control form-control-remove"}`}
                                            value={props.selectEmployee.reference_name}
                                            disabled={!props.isEmplEditModeOn}
                                            onChange={(e) => {
                                                //setEmplEditValidator(emplEditValidatorInitialState)
                                                props.setEmployeeToUpdate({
                                                    ...props.selectEmployee,
                                                    reference_name: e.target.value,
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                                {/* <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align pl-0">Reference Surname <span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <input
                                            className="form-control"
                                            name=""
                                        />
                                    </div>
                                </div> */}
                            </div>




                            <div className="row">
                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Reference CNIC <span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <input
                                            name="name"
                                            className='form-control'
                                            type="number"
                                            placeholder=""
                                            //className={`${props.isEmplEditModeOn ? (emplEditValidator.empName ? "form-control" : "form-control requiredValidateInput") : "form-control form-control-remove"}`}
                                            value={props.selectEmployee.reference_cnic}
                                            disabled={!props.isEmplEditModeOn}
                                            onChange={(e) => {
                                                //setEmplEditValidator(emplEditValidatorInitialState)
                                                props.setEmployeeToUpdate({
                                                    ...props.selectEmployee,
                                                    reference_cnic: e.target.value,
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align pl-0">Reference Phone <span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <input
                                            name="name"
                                            className='form-control'
                                            type="number"
                                            placeholder=""
                                            //className={`${props.isEmplEditModeOn ? (emplEditValidator.empName ? "form-control" : "form-control requiredValidateInput") : "form-control form-control-remove"}`}
                                            value={props.selectEmployee.reference_cell}
                                            disabled={!props.isEmplEditModeOn}
                                            onChange={(e) => {
                                                //setEmplEditValidator(emplEditValidatorInitialState)
                                                props.setEmployeeToUpdate({
                                                    ...props.selectEmployee,
                                                    reference_cell: e.target.value,
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>



                            <div className="row">
                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Salary Type <span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <Select
                                            options={optionsST}
                                            value={optionsST.find(e => e.value == props.selectEmployee.salary_type)}
                                            styles={customStyles}
                                            onChange={(value) => {
                                                props.setEmployeeToUpdate({
                                                    ...props.selectEmployee,
                                                    salary_type: value.value,
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align pl-0">Salary Amount <span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <input
                                            name="name"
                                            className='form-control'
                                            type="number"
                                            placeholder=""
                                            //className={`${props.isEmplEditModeOn ? (emplEditValidator.empName ? "form-control" : "form-control requiredValidateInput") : "form-control form-control-remove"}`}
                                            value={props.selectEmployee.salary}
                                            disabled={!props.isEmplEditModeOn}
                                            onChange={(e) => {
                                                //setEmplEditValidator(emplEditValidatorInitialState)
                                                props.setEmployeeToUpdate({
                                                    ...props.selectEmployee,
                                                    salary: e.target.value,
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>







                            <div className="row">

                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align pl-0">Allowed Holidays <span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <input
                                            name="name"
                                            className='form-control'
                                            type="number"
                                            placeholder=""
                                            //className={`${props.isEmplEditModeOn ? (emplEditValidator.empName ? "form-control" : "form-control requiredValidateInput") : "form-control form-control-remove"}`}
                                            value={props.selectEmployee.allowed_holidays}
                                            disabled={!props.isEmplEditModeOn}
                                            onChange={(e) => {
                                                //setEmplEditValidator(emplEditValidatorInitialState)
                                                props.setEmployeeToUpdate({
                                                    ...props.selectEmployee,
                                                    allowed_holidays: e.target.value,
                                                });
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Assigned Holidays<span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <Select
                                            options={optionsAH}
                                            value={optionsAH.find(e => Number(e.value) == props.selectEmployee.holiday_assigned)}
                                            styles={customStyles}
                                            onChange={(value) => {
                                                props.setEmployeeToUpdate({
                                                    ...props.selectEmployee,
                                                    holiday_assigned: value.value,
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>






                            <div className="row">
                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align pl-0">Is overtime allowed</label>
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="customCheck1"
                                            value={props.selectEmployee.is_overtime_allow}
                                            disabled={!props.isEmplEditModeOn}
                                            onChange={(e) => {
                                                props.setEmployeeToUpdate({
                                                    ...props.selectEmployee,
                                                    is_overtime_allow: e.target.value,
                                                });
                                            }} />
                                        <label className="custom-control-label" htmlFor="customCheck1"></label>
                                    </div>
                                </div>


                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Overtime<span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <input
                                            name="name"
                                            className='form-control'
                                            placeholder=""
                                            //className={`${props.isEmplEditModeOn ? (emplEditValidator.empName ? "form-control" : "form-control requiredValidateInput") : "form-control form-control-remove"}`}
                                            value={props.selectEmployee.over_time}
                                            disabled={!props.isEmplEditModeOn}
                                            onChange={(e) => {
                                                //setEmplEditValidator(emplEditValidatorInitialState)
                                                props.setEmployeeToUpdate({
                                                    ...props.selectEmployee,
                                                    over_time: e.target.value,
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>



                            <div className="row">

                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align pl-0">Advance Percentage</label>
                                    <div className="col-md-8 col-sm-8">
                                        <input
                                            name="name"
                                            className='form-control'
                                            type="number"
                                            placeholder=""
                                            //className={`${props.isEmplEditModeOn ? (emplEditValidator.empName ? "form-control" : "form-control requiredValidateInput") : "form-control form-control-remove"}`}
                                            value={props.selectEmployee.advance_percentage}
                                            disabled={!props.isEmplEditModeOn}
                                            onChange={(e) => {
                                                //setEmplEditValidator(emplEditValidatorInitialState)
                                                props.setEmployeeToUpdate({
                                                    ...props.selectEmployee,
                                                    advance_percentage: e.target.value,
                                                });
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Designation <span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <Creatable
                                            isClearable={false}

                                            options={props.designation}
                                            value={{ label: props.selectEmployee.designtion?.designationName, value: props.selectEmployee.designtion?.designation_id }}
                                            styles={customStyles}
                                            onChange={(value) => {


                                                props.setDesignationValue(value.value)
                                                props.setEmployeeToUpdate({
                                                    ...props.selectEmployee,
                                                    designtion: {
                                                        designation_id: value.value,
                                                        designationName: value.label
                                                    },
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>







                            <div className="row">

                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align pl-0">Status <span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <Select
                                            options={optionsStatus}
                                            value={optionsStatus.find(e => Number(e.value) == props.selectEmployee.status)}
                                            styles={customStyles}
                                            onChange={(value) => {
                                                props.setEmployeeToUpdate({
                                                    ...props.selectEmployee,
                                                    status: value.value,
                                                });
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Shift<span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <Creatable

                                            isClearable={false}
                                            options={props.shift}
                                            value={{ label: props.selectEmployee.shift?.shift_name, value: props.selectEmployee.shift?.shift_id }}
                                            styles={customStyles}
                                            onChange={(value) => {


                                                props.setShiftValue(value.value)
                                                props.setEmployeeToUpdate({
                                                    ...props.selectEmployee,
                                                    shift: {
                                                        shift_id: value.value,
                                                        shift_name: value.label
                                                    },
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>



                            {roomInputs.map((x, i) => (

                                <div className="row">
                                    <div className="field item form-group col-md-6 col-sm-6">
                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Benefit <span className="required">*</span></label>
                                        <div className="col-md-8 col-sm-8">
                                            <Creatable
                                                isClearable={false}

                                                options={props.benefit}
                                                //value={props.selectEmployee.benefits?.benefit_title}
                                                value={{ label: props.selectEmployee.benefits?.benefit_title, value: props.selectEmployee.benefits?.benefit_id }}
                                                styles={customStyles}
                                                onChange={(value) => {


                                                    props.setBenefitValue(value.value)
                                                    props.setEmployeeToUpdate({
                                                        ...props.selectEmployee,
                                                        benefits: {
                                                            benefit_id: value.value,
                                                            benefit_title: value.label
                                                        },
                                                    });
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="field item form-group col-md-5 col-sm-5">
                                        <label className="col-form-label col-md-3 col-sm-3 label-align pl-0">Amount <span className="required">*</span></label>
                                        <div className="col-md-8 col-sm-8">
                                            <input
                                                name="name"
                                                className='form-control'
                                                type="number"
                                                placeholder="Enter Benefit Amount"
                                                styles={customStyles}
                                                //className={`${props.isEmplEditModeOn ? (emplEditValidator.empName ? "form-control" : "form-control requiredValidateInput") : "form-control form-control-remove"}`}
                                                value={props.selectEmployee.benefits}
                                                disabled={!props.isEmplEditModeOn}
                                                onChange={(e) => {
                                                    //setEmplEditValidator(emplEditValidatorInitialState)
                                                    props.setEmployeeToUpdate({
                                                        ...props.selectEmployee.benefits,
                                                        amount: e.target.value,
                                                    });
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="field item form-group col-md-1 col-sm-1">

                                        <div className="col-md-8 col-sm-8">
                                            {roomInputs.length !== 1 && (
                                                <DeleteIcon
                                                    onClick={() => handleRemoveClickRoom(i)}
                                                    style={{
                                                        marginRight: "10px",
                                                        marginTop: "4px",
                                                        cursor: "pointer"
                                                    }}
                                                />
                                            )}
                                            {roomInputs.length - 1 === i && (
                                                <AddCircleOutlineIcon
                                                    onClick={handleAddClickRoom}
                                                    style={{ marginTop: "4px", cursor: "pointer" }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>

                            ))}





                            <>
                                {" "}
                                {props.isEmplEditModeOn ? (
                                    <div className="form-group mt-2 field item  col-md-12 col-sm-12">
                                        <div className="col-md-12 col-sm-12 offset-md-10 pb-2 " style={{ marginTop: "28px " }}>

                                            {
                                                !props.disableSubmitForUpdatePhoto ?
                                                    <>  <button

                                                        className="btn btn-primary btn-sm px-4  mt-3"
                                                        onClick={(e) => updateFunct(e)}
                                                    >
                                                        Submit
                                                    </button>
                                                    </> : <div className="text-center"><span className="pr-3">Uploading Image Please wait ...</span>

                                                        <div class="spinner-border spinner-border-sm pr-2" role="status">
                                                            <span class="sr-only ">Loading...</span>
                                                        </div>
                                                        <div class="spinner-grow spinner-grow-sm" role="status">
                                                            <span class="sr-only">Loading...</span>
                                                        </div>
                                                    </div>
                                            }




                                        </div>
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </>













                        </div>
                    </div>
                </>
            )}

        </>
    );
};

export default EmployeeForm;