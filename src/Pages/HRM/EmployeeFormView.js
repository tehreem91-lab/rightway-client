import Select from 'react-select'
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../../Layout/Loader/Loader.js";
import { customStyles } from '../../Components/reactCustomSelectStyle';
import Creatable from "react-select/creatable";

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";

const EmployeeFormView = (props) => {
    console.log(props.selectEmployee, "______");
    const showNavMenu = useSelector((state) => state.NavState);
    const [isLoading, setisLoading] = useState(false);
    //const [reRender, setReRender] = useState(false)
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



    const [benefitInputs, setbenefitInputs] = useState([{
        value: "",
        label: "",
        amount: ""
    }]);

    // room handle input change
    const handleRoomChange = (option, index, name) => {
        const value = option.value;
        console.log(value);
        //alert(`handleRoomChange: [${index}][${name}] ${value}`);
        const list = [...benefitInputs];
        list[index][name] = value;
        setbenefitInputs(list);
    };

    //room handle click event of the Remove button
    const handleRemoveClickRoom = (index) => {
        const list = [...benefitInputs];
        list.splice(index, 1);
        setbenefitInputs(list);
    };

    //room handle click event of the Add button
    const handleAddClickRoom = () => {
        setbenefitInputs([...benefitInputs, { value: "", label: "", amount: "" }]);
    };

    useEffect(() => {
        props.setBenefitsRecordsValue(props.selectEmployee.benefits.map((eachBen) => {
            return {
                label: eachBen.benefit_title,
                value: eachBen.benefit_id,
                amount: eachBen.benefit_amount,
            }
        }))
    }, [])

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









                            <div className="card" style={{ marginTop: "25px " }}> <h5 className="card-header"> Personal Information</h5>
                                <div className="row" style={{ marginTop: "6px " }}>
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
                                <div className="row" >
                                    <div className="field item form-group col-md-6 col-sm-6">
                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Name  </label>
                                        <div className="col-md-8 col-sm-8">
                                            <input
                                                name="name"
                                                disabled
                                                className='form-control'
                                                placeholder="ex. Ali A.Khan"
                                                //className={`${props.isEmplEditModeOn ? (emplEditValidator.empName ? "form-control" : "form-control requiredValidateInput") : "form-control form-control-remove"}`}
                                                value={props.selectEmployee.employee_name}

                                            />
                                        </div>
                                    </div>
                                    <div className="field item form-group col-md-6 col-sm-6">
                                        <label className="col-form-label col-md-3 col-sm-3 label-align pl-0">Surname  </label>
                                        <div className="col-md-8 col-sm-8">
                                            <input
                                                name="name"
                                                className='form-control'
                                                placeholder="ex. Abdul Khan"
                                                //className={`${props.isEmplEditModeOn ? (emplEditValidator.empName ? "form-control" : "form-control requiredValidateInput") : "form-control form-control-remove"}`}
                                                value={props.selectEmployee.sur_name}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="field item form-group col-md-6 col-sm-6">
                                        <label className="col-form-label col-md-3 col-sm-3 label-align pl-0">Phone  </label>
                                        <div className="col-md-8 col-sm-8">
                                            <input
                                                name="name"
                                                className='form-control'
                                                type="number"
                                                placeholder=""
                                                //className={`${props.isEmplEditModeOn ? (emplEditValidator.empName ? "form-control" : "form-control requiredValidateInput") : "form-control form-control-remove"}`}
                                                value={props.selectEmployee.cell}
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
                                                placeholder="without Dashes Ex, 3310567889234"
                                                onInput={(er) =>
                                                    (er.target.value = er.target.value.slice(0, 13))
                                                }
                                                //className={`${props.isEmplEditModeOn ? (emplEditValidator.cnicNum ? "form-control" : "form-control requiredValidateInput") : "form-control form-control-remove"}`}

                                                value={props.selectEmployee.cnic}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="field item form-group col-md-6 col-sm-6">
                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Address  </label>
                                        <div className="col-md-8 col-sm-8">
                                            <input
                                                name="name"
                                                className='form-control'
                                                placeholder=""
                                                //className={`${props.isEmplEditModeOn ? (emplEditValidator.empName ? "form-control" : "form-control requiredValidateInput") : "form-control form-control-remove"}`}
                                                value={props.selectEmployee.address}
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
                                                value={props.selectEmployee.department?.department_name}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>






                            <div className="card" style={{ marginTop: "25px " }}> <h5 className="card-header"> Salary Information</h5>
                                <div className="row" style={{ marginTop: "6px " }}>
                                    <div className="field item form-group col-md-6 col-sm-6">
                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Salary Type  </label>
                                        <div className="col-md-8 col-sm-8">
                                            <input
                                                className='form-control'
                                                value={props.selectEmployee.salary_type}
                                                styles={customStyles}
                                                disabled
                                            />

                                        </div>
                                    </div>
                                    <div className="field item form-group col-md-6 col-sm-6">
                                        <label className="col-form-label col-md-3 col-sm-3 label-align pl-0">Salary Amount  </label>
                                        <div className="col-md-8 col-sm-8">
                                            <input
                                                name="name"
                                                className='form-control'
                                                type="number"
                                                placeholder=""
                                                //className={`${props.isEmplEditModeOn ? (emplEditValidator.empName ? "form-control" : "form-control requiredValidateInput") : "form-control form-control-remove"}`}
                                                value={props.selectEmployee.salary}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                </div>





                                {
                                    <>{benefitInputs.map((eachAcc, index) => {
                                        return <div className="row" key={index}>
                                            <div className="field item form-group col-md-6 col-sm-6">
                                                <label className="col-form-label col-md-3 col-sm-3 label-align">Benefit</label>
                                                <div className="col-md-8 col-sm-8">



                                                    {props.benefitsRecordsValue.map(((eachBenValue, index) => {
                                                        return <Select
                                                            isSearchable={true}
                                                            name="Benefit amount"
                                                            placeholder=""
                                                            value={props.benefitsRecordsValue[index]}
                                                            disabled
                                                            key={index}
                                                            // onChange={(e) => {
                                                            //     const objectData = props.benefitsRecordsValue;
                                                            //     objectData[index] = {
                                                            //         ...e,
                                                            //         amount: objectData[index].amount


                                                            //     }
                                                            //     props.setBenefitsRecordsValue(objectData)
                                                            //     //setReRender(!reRender)

                                                            // }}
                                                            styles={customStyles}
                                                            options={props.benefit}

                                                        />
                                                    }))



                                                    }



                                                </div>

                                                {/* {props.benefit?.length > props.benefitsRecordsValue?.length && 
                                            <div className="col-md-1 col-sm-1  " style={{ marginLeft: "-12px", marginTop: "5px" }}>
                                                <i className="fa fa-plus-circle text-customBlue"
                                                    onClick={() => {
                                                        props.setBenefitsRecordsValue([...props.benefitsRecordsValue, {
                                                            label: "",
                                                            value: "",
                                                            amount: ""
                                                        }])

                                                    }}
                                                ></i>
                                            </div>} */}


                                            </div>


                                            {/* // setBenefitsRecordsValue,benefitsRecordsValue */}
                                            <div className="field item form-group col-md-6 col-sm-6">
                                                <label className="col-form-label col-md-3 col-sm-3 label-align">Benefit Amount</label>
                                                <div className="col-md-8 col-sm-8">

                                                    {props.benefitsRecordsValue.map(((eachBenValue, index) => {
                                                        return <input
                                                            className="form-control"
                                                            name="Benefit amount"
                                                            placeholder=""
                                                            value={props.benefitsRecordsValue[index].amount}
                                                            type="number"
                                                            key={index}
                                                            disabled
                                                        // onChange={(e) => {
                                                        //     const objectData = props.benefitsRecordsValue;
                                                        //     objectData[index] = {
                                                        //         ...objectData[index],
                                                        //         amount: e.target.value
                                                        //     }
                                                        //     props.setBenefitsRecordsValue(objectData)
                                                        //     //setReRender(!reRender)


                                                        // }}
                                                        />

                                                    }))



                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    })
                                    }</>
                                }
                            </div>






                            <div className="card" style={{ marginTop: "25px " }}> <h5 className="card-header"> Referral Information</h5>
                                <div className="row" style={{ marginTop: "6px " }}>
                                    <div className="field item form-group col-md-6 col-sm-6">
                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Reference Name  </label>
                                        <div className="col-md-8 col-sm-8">
                                            <input
                                                name="name"
                                                className='form-control'
                                                placeholder=""
                                                //className={`${props.isEmplEditModeOn ? (emplEditValidator.empName ? "form-control" : "form-control requiredValidateInput") : "form-control form-control-remove"}`}
                                                value={props.selectEmployee.reference_name}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    {/* <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align pl-0">Reference Surname  </label>
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
                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Reference CNIC  </label>
                                        <div className="col-md-8 col-sm-8">
                                            <input
                                                name="name"
                                                className='form-control'
                                                type="number"
                                                placeholder=""
                                                //className={`${props.isEmplEditModeOn ? (emplEditValidator.empName ? "form-control" : "form-control requiredValidateInput") : "form-control form-control-remove"}`}
                                                value={props.selectEmployee.reference_cnic}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="field item form-group col-md-6 col-sm-6">
                                        <label className="col-form-label col-md-3 col-sm-3 label-align pl-0">Reference Phone  </label>
                                        <div className="col-md-8 col-sm-8">
                                            <input
                                                name="name"
                                                className='form-control'
                                                type="number"
                                                placeholder=""
                                                //className={`${props.isEmplEditModeOn ? (emplEditValidator.empName ? "form-control" : "form-control requiredValidateInput") : "form-control form-control-remove"}`}
                                                value={props.selectEmployee.reference_cell}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="card" style={{ marginTop: "25px " }}> <h5 className="card-header"> Other Information</h5>
                                <div className="row" style={{ marginTop: "6px " }}>
                                    <div className="field item form-group col-md-6 col-sm-6">
                                        <label className="col-form-label col-md-3 col-sm-3 label-align pl-0">Allowed Holidays  </label>
                                        <div className="col-md-8 col-sm-8">
                                            <input
                                                name="name"
                                                className='form-control'
                                                type="number"
                                                placeholder=""
                                                //className={`${props.isEmplEditModeOn ? (emplEditValidator.empName ? "form-control" : "form-control requiredValidateInput") : "form-control form-control-remove"}`}
                                                value={props.selectEmployee.allowed_holidays}
                                                disabled
                                            />
                                        </div>
                                    </div>

                                    <div className="field item form-group col-md-6 col-sm-6">
                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Assigned Holidays </label>
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
                                                disabled
                                            />
                                        </div>
                                    </div>
                                </div>






                                <div className="row">
                                    <div className="field item form-group col-md-6 col-sm-6">
                                        <label className="col-form-label col-md-3 col-sm-3 label-align pl-0">Is overtime allowed</label>
                                        <div className="custom-control custom-checkbox  ml-3">
                                            <input required type="checkbox" className="custom-control-input" id="customCheck1"

                                                defaultChecked={props.selectEmployee.is_overtime_allow === 0 ? false : true}
                                                disabled />
                                            <label className="custom-control-label" htmlFor="customCheck1"></label>
                                        </div>
                                    </div>


                                    <div className="field item form-group col-md-6 col-sm-6">
                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Overtime </label>
                                        <div className="col-md-8 col-sm-8">
                                            <input
                                                name="name"
                                                className='form-control'
                                                placeholder=""
                                                //className={`${props.isEmplEditModeOn ? (emplEditValidator.empName ? "form-control" : "form-control requiredValidateInput") : "form-control form-control-remove"}`}
                                                value={props.selectEmployee.over_time}
                                                disabled
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
                                                disabled
                                            />
                                        </div>
                                    </div>

                                    <div className="field item form-group col-md-6 col-sm-6">
                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Designation  </label>
                                        <div className="col-md-8 col-sm-8">
                                            <input
                                                isClearable={false}
                                                className='form-control'
                                                options={props.designation}
                                                value={props.selectEmployee.designtion?.designationName}
                                                styles={customStyles}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                </div>







                                <div className="row">

                                    <div className="field item form-group col-md-6 col-sm-6">
                                        <label className="col-form-label col-md-3 col-sm-3 label-align pl-0">Status  </label>
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
                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Shift </label>
                                        <div className="col-md-8 col-sm-8">

                                            <input
                                                isClearable={false}
                                                className='form-control'
                                                options={props.designation}
                                                value={props.selectEmployee.shift?.shift_name}
                                                styles={customStyles}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>






                            <div className="card" style={{ marginTop: "25px " }}> <h5 className="card-header"> Uploaded Files</h5>
                                <div className="row" style={{ marginTop: "6px " }}>
                                    <div className="field item form-group col-md-6 col-sm-6 w-50 p-3">
                                        <label htmlFor="exampleFormControlFile1" className="col-form-label col-md-3 col-sm-3 label-align"> Profile Pic</label>


                                        <div>
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

                                        </div>


                                    </div>


                                </div>

                                <div className="row">

                                    <div className="field item form-group col-md-6 col-sm-6 ">
                                        <label htmlFor="exampleFormControlFile1" className="col-form-label col-md-3 col-sm-3 label-align"> CNIC Front</label>


                                        <div>
                                            {props.selectEmployee.cnic_front === undefined ||
                                                props.selectEmployee.cnic_front === "" ||
                                                props.selectEmployee.cnic_front === null ? (
                                                <></>
                                            ) : (
                                                <>
                                                    <img
                                                        src={`${URL}${props.selectEmployee.cnic_front.slice(1, -1)}`}
                                                        alt="not found"
                                                        width="280"
                                                        height="140"
                                                        style={{ borderRadius: "7px" }}
                                                    />
                                                </>
                                            )}

                                        </div>


                                    </div>



                                    <div className="field item form-group col-md-6 col-sm-6">
                                        <label htmlFor="exampleFormControlFile1" className="col-form-label col-md-3 col-sm-3 label-align"> CNIC Back</label>


                                        <div >
                                            {props.selectEmployee.cnic_back === undefined ||
                                                props.selectEmployee.cnic_back === "" ||
                                                props.selectEmployee.cnic_back === null ? (
                                                <></>
                                            ) : (
                                                <>
                                                    <img
                                                        src={`${URL}${props.selectEmployee.cnic_back.slice(1, -1)}`}
                                                        alt="not found"
                                                        width="280"
                                                        height="140"
                                                        style={{ borderRadius: "7px" }}
                                                    />
                                                </>
                                            )}

                                        </div>


                                    </div>
                                </div>

                                <div className="row ">
                                    <div className="field item form-group col-md-6 col-sm-6 w-50 p-3">
                                        <label className="col-form-label col-md-3 col-sm-3 label-align px-0"> Attachment</label>
                                        <div className="col-md-8 col-sm-8 ">
                                            <div className="row">
                                                <div className="col-md-10 ">
                                                    <input
                                                        ref={props.ref}
                                                        type="file"
                                                        className="form-control form-control-sm customStyleForInput"
                                                        data-validate-length-range={6}
                                                        data-validate-words={2}
                                                        name="name"
                                                        onChange={(e) => {
                                                            props.setSelectedAttachmentName((e.target.files[0].name.split("."))[0])
                                                            props.setSelectedAttachmentFile(e.target.files[0])
                                                        }}
                                                    /></div>
                                                <div className="col-md-1  " style={{ paddingTop: "1.5px" }}>
                                                    {
                                                        props.isFileUploadingModeOn ? <div className="spinner-border my-2 text-customOrange" role="status">
                                                            <span className="sr-only">Loading...</span>
                                                        </div> : <button
                                                            disabled={props.ref?.current?.value === "" ? true : false}
                                                            className="btn btn-sm btn-outline-success" onClick={() => props.UploadFile()} type="button"><i className="fa fa-upload"></i></button>
                                                    }
                                                </div>
                                            </div>
                                        </div>


                                        {props.fileEntity.length !== 0 && <div className="field item form-group col-md-8 col-sm-8">
                                            <label className="col-form-label col-md-3 col-sm-3 label-align">Attachments</label>
                                            <div className="col-md-12 col-sm-12 ">
                                                {
                                                    props.fileEntity.map((each_attachment, index) => {
                                                        return <button className="btn btn-sm  bg-customBlue  text-light">
                                                            <a href={`${props.endPoint + each_attachment}`} target="_blank" rel="noopener noreferrer" className='text-light'>
                                                                {((each_attachment.split("_"))[0]).slice(15)} {index + 1}</a>
                                                            <i className="fa fa-times   text-light ml-1 " aria-hidden="true"
                                                                onClick={() => {
                                                                    let arr_data = props.fileEntity.filter((each_image) => {
                                                                        return (props.fileEntity.indexOf(each_image) !== index);
                                                                    });
                                                                    props.setFileEntity(arr_data)
                                                                    //setReRender(!reRender)
                                                                }}
                                                            ></i>
                                                        </button>
                                                    })
                                                }
                                            </div>
                                        </div>}
                                    </div>
                                </div>






                            </div>
                        </div>
                    </div>
                </>
            )}


        </>
    );
};

export default EmployeeFormView;