import Select from 'react-select'
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../../Layout/Loader/Loader.js";
import { customStyles } from '../../Components/reactCustomSelectStyle';
import Creatable from "react-select/creatable";


const EmployeeForm = (props) => {

    // useEffect(() => {
    //     console.log("df",);
    //     props.setFileEntity(props.selectEmployee.attachments.split(","))


    // }, [props.fileEntity])


    const showNavMenu = useSelector((state) => state.NavState);
    const [isLoading, setisLoading] = useState(false);

    const URL = localStorage.getItem("authUser");
    const optionsST = [
        { value: 'Salary', label: 'Salary' },
        { value: 'Wages', label: 'Wages' }
    ]
    const [reRender, setReRender] = useState(false)
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
        { value: '0', label: 'Left' },
        { value: '1', label: 'Active' }
    ]


    const emplEditValidatorInitialState = {
        employee_code: true,
        employee_name: true,
        sur_name: true,
        cell: true,
        cnic: true,
        profile_image: true,
        cnic_front: true,
        cnic_back: true,
        attachments: true,
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
        expense_department_id: true,
        salary_department_id: true,
        advance_department_id: true,
        loan_department_id: true,
        benefits: true


    }
    const [emplEditValidator, setEmplEditValidator] = useState(emplEditValidatorInitialState)
    const [isFilled, setIsFilled] = useState(true)
    const [isValidateValue, setIsValidateValue] = useState(true)

    const initializeBenefits = () => {
        const value = props.selectEmployee.benefits.map((eachBen) => {
            return {
                label: eachBen.benefit_title,
                value: eachBen.benefit_id,
                amount: eachBen.benefit_amount,
            }
        })

        if (value?.length > 0) {
            return value
        } else {
            return [
                {
                    label: "",
                    value: "",
                    amount: "",
                }
            ]
        }
    }

    const updateFunct = (e) => {

        e.preventDefault();

        let is_form_validated = true;
        if (Number(props.selectEmployee.employee_name) === 0 || Number(props.selectEmployee.sur_name) === 0 || Number(props.selectEmployee.cell) === 0 || Number(props.selectEmployee.cnic) === 0 || Number(props.selectEmployee.address) === 0
            || Number(props.selectEmployee.salary_type) === 0 || Number(props.selectEmployee.salary_department) === 0 || Number(props.selectEmployee.advance_department) === 0 || Number(props.selectEmployee.salary) === 0 || Number(props.selectEmployee.expense_department) === 0
            || Number(props.selectEmployee.loan_department) === 0 || Number(props.selectEmployee.designtion) === 0 || Number(props.selectEmployee.status) === null || Number(props.selectEmployee.shift) === 0 || Number(props.selectEmployee.profile_image) === 0 || Number(props.selectEmployee.cnic_front) === 0 || Number(props.selectEmployee.cnic_back) === 0 || Number(props.selectEmployee.profile_image) === 0) {
            setIsValidateValue(false);
            is_form_validated = false;
        }

        props.benefit?.length !== 0 && props.benefitsRecordsValue.forEach(element => {
            if (Number(element.amount) === 0 || Number(element.label) === 0) {
                setIsValidateValue(false)
                is_form_validated = false;
            }
        });


        if (is_form_validated === true) {
            props.updateEmployeeClouds();
            props.fetchAllData();
        }

        // if (props.selectEmployee.employee_name === "" || props.selectEmployee.employee_name === undefined || props.selectEmployee.employee_name === null || props.selectEmployee.employee_name === " ") { setEmplEditValidator({ ...emplEditValidator, employee_name: false }) }

        // else if (props.selectEmployee.sur_name === "" || props.selectEmployee.sur_name === undefined || props.selectEmployee.sur_name === null || props.selectEmployee.sur_name === " ") { setEmplEditValidator({ ...emplEditValidator, sur_name: false }) }

        // else if (props.selectEmployee.cell === "" || props.selectEmployee.cell === undefined || props.selectEmployee.cell === null || props.selectEmployee.cell === " ") { setEmplEditValidator({ ...emplEditValidator, cell: false }) }

        // else if (props.selectEmployee.cnic === "" || props.selectEmployee.cnic === undefined || props.selectEmployee.cnic === null || props.selectEmployee.cnic === " ") { setEmplEditValidator({ ...emplEditValidator, cnic: false }) }

        // else if (props.selectEmployee.profile_image === "" || props.selectEmployee.profile_image === undefined || props.selectEmployee.profile_image === null || props.selectEmployee.profile_image === " ") { setEmplEditValidator({ ...emplEditValidator, profile_image: false }) }

        // else if (props.selectEmployee.cnic_front === "" || props.selectEmployee.cnic_front === undefined || props.selectEmployee.cnic_front === null || props.selectEmployee.cnic_front === " ") { setEmplEditValidator({ ...emplEditValidator, cnic_front: false }) }

        // else if (props.selectEmployee.cnic_back === "" || props.selectEmployee.cnic_back === undefined || props.selectEmployee.cnic_back === null || props.selectEmployee.cnic_back === " ") { setEmplEditValidator({ ...emplEditValidator, cnic_back: false }) }

        // else if (props.selectEmployee.address === "" || props.selectEmployee.address === undefined || props.selectEmployee.address === null || props.selectEmployee.address === " ") { setEmplEditValidator({ ...emplEditValidator, address: false }) }

        // else if (props.selectEmployee.salary_type === "" || props.selectEmployee.salary_type === undefined || props.selectEmployee.salary_type === null || props.selectEmployee.salary_type === " ") { setEmplEditValidator({ ...emplEditValidator, salary_type: false }) }

        // else if (props.selectEmployee.salary === "" || props.selectEmployee.salary === undefined || props.selectEmployee.salary === null || props.selectEmployee.salary === " ") { setEmplEditValidator({ ...emplEditValidator, salary: false }) }

        // else if (props.selectEmployee.shift_id === "" || props.selectEmployee.shift_id === undefined || props.selectEmployee.shift_id === null || props.selectEmployee.shift_id === " ") { setEmplEditValidator({ ...emplEditValidator, shift_id: false }) }

        // else if (props.selectEmployee.designation_id === "" || props.selectEmployee.designation_id === undefined || props.selectEmployee.designation_id === null || props.selectEmployee.designation_id === " ") { setEmplEditValidator({ ...emplEditValidator, designation_id: false }) }

        // else if (props.selectEmployee.status === "" || props.selectEmployee.status === undefined || props.selectEmployee.status === null || props.selectEmployee.status === " ") { setEmplEditValidator({ ...emplEditValidator, status: false }) }

        // else if (props.selectEmployee.expense_department_id === "" || props.selectEmployee.expense_department_id === undefined || props.selectEmployee.expense_department_id === null || props.selectEmployee.expense_department_id === " ") { setEmplEditValidator({ ...emplEditValidator, expense_department_id: false }) }

        // else if (props.selectEmployee.salary_department_id === "" || props.selectEmployee.salary_department_id === undefined || props.selectEmployee.salary_department_id === null || props.selectEmployee.salary_department_id === " ") { setEmplEditValidator({ ...emplEditValidator, salary_department_id: false }) }

        // else if (props.selectEmployee.advance_department_id === "" || props.selectEmployee.advance_department_id === undefined || props.selectEmployee.advance_department_id === null || props.selectEmployee.advance_department_id === " ") { setEmplEditValidator({ ...emplEditValidator, advance_department_id: false }) }

        // else if (props.selectEmployee.loan_department_id === "" || props.selectEmployee.loan_department_id === undefined || props.selectEmployee.loan_department_id === null || props.selectEmployee.loan_department_id === " ") { setEmplEditValidator({ ...emplEditValidator, loan_department_id: false }) }


        // else {

        //     props.updateEmployeeClouds();

        //     setEmplEditValidator(emplEditValidatorInitialState);
        // }


    }




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
        props.setBenefitsRecordsValue(
            initializeBenefits())
    }, [])


    return (

        <>

            {isLoading ? (
                <>
                    <Loader />
                </>
            ) : (
                <>

                    <form id="form">
                        <div className="card" style={{ marginTop: "25px " }}> <h5 className="card-header"> Personal Information</h5>
                            <div className="row" style={{ marginTop: "6px " }}>
                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align"> Employee Code </label>
                                    <div className="col-md-8 col-sm-8">
                                        <input required
                                            name="name"
                                            className='form-control'
                                            //value={props.selectEmployee.employee_code}
                                            //value={props.empCode.slice(1, 7)}
                                            value={(props.selectEmployee.employee_code ? (props.selectEmployee.employee_code) : (props.empCode.slice(1, 6)))}
                                            disabled
                                        />



                                    </div>
                                </div>
                            </div>
                            <div className="row" >
                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Name <span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <input required
                                            name="name"
                                            //className='form-control'
                                            placeholder="ex. Ali A.Khan"
                                            className={(emplEditValidator.employee_name ? "form-control" : "form-control requiredValidateInput")}
                                            value={props.selectEmployee.employee_name}
                                            disabled={!props.isEmplEditModeOn}
                                            onChange={(e) => {
                                                setEmplEditValidator(emplEditValidatorInitialState)
                                                props.setEmployeeToUpdate({
                                                    ...props.selectEmployee,
                                                    employee_name: e.target.value
                                                });
                                            }}
                                        />
                                        {/* {(isFilled && (props.selectEmployee.employee_name === "" || props.selectEmployee.employee_name === undefined) ? <span className="text-danger">*Required Field</span > : "")}
                                        {isValidateValue === false && Number(accountOptionValue) === 0 && <span className="text-danger">First Select this </span>} */}
                                        {isValidateValue === false && Number(props.selectEmployee.employee_name) === 0 && <span className="text-danger">First Select this </span>}

                                    </div>
                                </div>
                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align pl-0">Surname <span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <input required
                                            name="name"
                                            //className='form-control'
                                            placeholder="ex. Abdul Khan"
                                            className={(emplEditValidator.sur_name ? "form-control" : "form-control requiredValidateInput")}
                                            value={props.selectEmployee.sur_name}
                                            disabled={!props.isEmplEditModeOn}
                                            onChange={(e) => {
                                                setEmplEditValidator(emplEditValidatorInitialState)
                                                props.setEmployeeToUpdate({
                                                    ...props.selectEmployee,
                                                    sur_name: e.target.value,
                                                });
                                            }}
                                        />
                                        {/* {(isFilled && (props.selectEmployee.sur_name === "" || props.selectEmployee.sur_name === undefined) ? <span className="text-danger">*Required Field</span > : "")} */}
                                        {isValidateValue === false && Number(props.selectEmployee.sur_name) === 0 && <span className="text-danger">First Select this </span>}

                                    </div>
                                </div>
                            </div>


                            <div className="row">
                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align pl-0">Phone <span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <input required
                                            name="name" min="0"
                                            //className='form-control'
                                            type="number"
                                            placeholder=""
                                            className={(emplEditValidator.cell ? "form-control" : "form-control requiredValidateInput")}
                                            value={props.selectEmployee.cell}
                                            disabled={!props.isEmplEditModeOn}
                                            onInput={(er) => (er.target.value = er.target.value.slice(0, 11))}
                                            onChange={(e) => {
                                                setEmplEditValidator(emplEditValidatorInitialState)
                                                props.setEmployeeToUpdate({
                                                    ...props.selectEmployee,
                                                    cell: e.target.value,
                                                });
                                            }}
                                        />
                                        {/* {(isFilled && (props.selectEmployee.cell === "" || props.selectEmployee.cell === undefined) ? <span className="text-danger">*Required Field</span > : "")} */}
                                        {isValidateValue === false && Number(props.selectEmployee.cell) === 0 && <span className="text-danger">First Select this </span>}

                                    </div>
                                </div>
                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align">CNIC
                                        <span className="required">*</span>
                                    </label>
                                    <div className="col-md-8 col-sm-8">
                                        <input required
                                            name="name" min="0"
                                            //className='form-control'
                                            type="number"
                                            placeholder="without Dashes Ex, 3310567889234"
                                            onInput={(er) =>
                                                (er.target.value = er.target.value.slice(0, 13))
                                            }
                                            className={(emplEditValidator.cnic ? "form-control" : "form-control requiredValidateInput")}
                                            value={props.selectEmployee.cnic}
                                            onChange={(e) => {
                                                setEmplEditValidator(emplEditValidatorInitialState)
                                                props.setEmployeeToUpdate({
                                                    ...props.selectEmployee,
                                                    cnic: e.target.value,
                                                });
                                            }}
                                            disabled={!props.isEmplEditModeOn}
                                        />
                                        {/* {(isFilled && (props.selectEmployee.cnic === "" || props.selectEmployee.cnic === undefined) ? <span className="text-danger">*Required Field</span > : "")} */}
                                        {isValidateValue === false && Number(props.selectEmployee.cnic) === 0 && <span className="text-danger">First Select this </span>}

                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Address <span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <input required
                                            name="name"
                                            className='form-control'
                                            placeholder=""
                                            //className={(emplEditValidator.address ? "form-control" : "form-control requiredValidateInput")}
                                            value={props.selectEmployee.address}
                                            disabled={!props.isEmplEditModeOn}
                                            onChange={(e) => {
                                                setEmplEditValidator(emplEditValidatorInitialState)
                                                props.setEmployeeToUpdate({
                                                    ...props.selectEmployee,
                                                    address: e.target.value,
                                                });
                                            }}
                                        />
                                        {/* {(isFilled && (props.selectEmployee.address === "" || props.selectEmployee.address === undefined) ? <span className="text-danger">*Required Field</span > : "")} */}
                                        {isValidateValue === false && Number(props.selectEmployee.address) === 0 && <span className="text-danger">First Select this </span>}


                                    </div>
                                </div>
                                {/* <div className="field item form-group col-md-6 col-sm-6">
                                            <label className="col-form-label col-md-3 col-sm-3 label-align pl-0">Department<span className="required">*</span></label>
                                            <div className="col-md-8 col-sm-8">
                                                <Creatable required
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
                                        </div> */}
                            </div>
                        </div>






                        <div className="card" style={{ marginTop: "25px " }}> <h5 className="card-header"> Salary Information</h5>
                            <div className="row" style={{ marginTop: "6px " }}>

                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Salary Type <span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <Select
                                            options={optionsST}
                                            value={optionsST.find(e => e.value == props.selectEmployee.salary_type)}
                                            //className={(emplEditValidator.salary_type ? "form-control" : "form-control requiredValidateInput")}
                                            styles={customStyles}
                                            onChange={(value) => {
                                                setEmplEditValidator(emplEditValidatorInitialState)

                                                props.setEmployeeToUpdate({
                                                    ...props.selectEmployee,
                                                    salary_type: value.value,
                                                });
                                            }}
                                        />
                                        {(isFilled && (props.selectEmployee.salary_type === "" || props.selectEmployee.salary_type === undefined) ? <span className="text-danger">*Required Field</span > : "")}
                                        {isValidateValue === false && Number(props.selectEmployee.salary_type) == 0 && <span className="text-danger">First Select this </span>}
                                        {/* {isValidateValue === false && props.selectEmployee.salary_type === 0 && <span className="text-danger">First Select this </span>} */}


                                    </div>
                                </div>

                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Salary Dept<span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <Creatable

                                            isClearable={false}
                                            options={props.salaryDep}
                                            value={{ label: props.selectEmployee.salary_department?.salary_label, value: props.selectEmployee.salary_department?.salary_value }}
                                            styles={customStyles}
                                            onChange={(value) => {

                                                setEmplEditValidator(emplEditValidatorInitialState)
                                                props.setSalaryDepValue(value.salary_value)
                                                props.setEmployeeToUpdate({
                                                    ...props.selectEmployee,
                                                    salary_department: {
                                                        salary_value: value.value,
                                                        salary_label: value.label
                                                    },
                                                });
                                            }}
                                        />
                                        {isValidateValue === false && props.selectEmployee.salary_department === undefined && <span className="text-danger">First Select this </span>}

                                    </div>
                                </div>


                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align pl-0">Advance %</label>
                                    <div className="col-md-8 col-sm-8">
                                        <input required
                                            name="name" min="0"
                                            className='form-control'
                                            type="number"
                                            placeholder=""
                                            onInput={(er) => (er.target.value = er.target.value.slice(0, 2))}
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
                                        {isValidateValue === false && Number(props.selectEmployee.advance_percentage) === 0 && <span className="text-danger">First Select this </span>}

                                    </div>
                                </div>





                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Advance Dept<span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <Creatable

                                            isClearable={false}
                                            options={props.advanceDep}
                                            value={{ label: props.selectEmployee.advance_department?.advance_label, value: props.selectEmployee.advance_department?.advance_value }}
                                            styles={customStyles}
                                            onChange={(value) => {

                                                setEmplEditValidator(emplEditValidatorInitialState)
                                                props.setAdvanceDepValue(value.advance_value)
                                                props.setEmployeeToUpdate({
                                                    ...props.selectEmployee,
                                                    advance_department: {
                                                        advance_value: value.value,
                                                        advance_label: value.label
                                                    },
                                                });
                                            }}
                                        />
                                        {isValidateValue === false && props.selectEmployee.advance_department === undefined && <span className="text-danger">First Select this </span>}


                                    </div>
                                </div>



                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align pl-0">Salary Amount <span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <input required
                                            name="name" min="0"
                                            //className='form-control'
                                            type="number"
                                            placeholder=""
                                            onInput={(er) => (er.target.value = er.target.value.slice(0, 7))}
                                            className={(emplEditValidator.salary ? "form-control" : "form-control requiredValidateInput")}

                                            value={props.selectEmployee.salary}
                                            disabled={!props.isEmplEditModeOn}
                                            onChange={(e) => {
                                                setEmplEditValidator(emplEditValidatorInitialState)
                                                props.setEmployeeToUpdate({
                                                    ...props.selectEmployee,
                                                    salary: e.target.value,
                                                });
                                            }}
                                        />
                                        {isValidateValue === false && Number(props.selectEmployee.salary) === 0 && <span className="text-danger">First Select this </span>}


                                    </div>
                                </div>
                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Expense Dept<span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <Creatable

                                            isClearable={false}
                                            options={props.expenseDep}
                                            value={{ label: props.selectEmployee.expense_department?.expense_label, value: props.selectEmployee.expense_department?.expense_value }}
                                            styles={customStyles}
                                            onChange={(value) => {
                                                setEmplEditValidator(emplEditValidatorInitialState)

                                                props.setExpenseDepValue(value.expense_value)
                                                props.setEmployeeToUpdate({
                                                    ...props.selectEmployee,
                                                    expense_department: {
                                                        expense_value: value.value,
                                                        expense_label: value.label
                                                    },
                                                });
                                            }}
                                        />
                                        {isValidateValue === false && props.selectEmployee.expense_department === undefined && <span className="text-danger">First Select this </span>}


                                    </div>
                                </div>

                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Loan Dept<span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <Creatable

                                            isClearable={false}
                                            options={props.loanDep}
                                            value={{ label: props.selectEmployee.loan_department?.loan_label, value: props.selectEmployee.loan_department?.loan_value }}
                                            styles={customStyles}
                                            onChange={(value) => {

                                                setEmplEditValidator(emplEditValidatorInitialState)
                                                props.setLoanDepValue(value.loan_value)
                                                props.setEmployeeToUpdate({
                                                    ...props.selectEmployee,
                                                    loan_department: {
                                                        loan_value: value.value,
                                                        loan_label: value.label
                                                    },
                                                });
                                            }}
                                        />
                                        {isValidateValue === false && props.selectEmployee.loan_department === undefined && <span className="text-danger">First Select this </span>}


                                    </div>
                                </div>
                            </div>









                            {
                                <>{benefitInputs.map((eachAcc, index) => {
                                    return <div className="row" key={index}>
                                        <div className="field item form-group col-md-6 col-sm-6">
                                            <label className="col-form-label col-md-3 col-sm-3 label-align">Benefit</label>
                                            <div className="col-md-8 col-sm-8" >



                                                {props.benefitsRecordsValue.map(((eachBenValue, index) => {
                                                    return <>
                                                        <Select
                                                            className="col-md-11 col-sm-11"
                                                            key={index}
                                                            value={props.benefitsRecordsValue[index]}
                                                            isSearchable={true}
                                                            onChange={(e) => {
                                                                const objectData = props.benefitsRecordsValue;
                                                                objectData[index] = {
                                                                    ...e,
                                                                    amount: objectData[index].amount


                                                                }
                                                                props.setBenefitsRecordsValue(objectData)
                                                                setReRender(!reRender)

                                                            }}
                                                            styles={customStyles}
                                                            options={props.benefit}

                                                        />
                                                        {
                                                            (props.benefitsRecordsValue?.length > 1 && index > 0) &&
                                                            <div className="col-md-1 col-sm-1  " style={{ marginLeft: "-12px", marginTop: "5px" }}>
                                                                <i className="fa fa-trash text-customRed"
                                                                    id={`${index}-Delete`}
                                                                    onClick={(index) => {
                                                                        let list = [...props.benefitsRecordsValue];
                                                                        const i = parseInt(index.target.id.split('-')[0])
                                                                        list = list.filter((value) => {
                                                                            return list.indexOf(value) != i
                                                                        })
                                                                        props.setBenefitsRecordsValue(list);
                                                                    }}
                                                                ></i>
                                                            </div>
                                                        }
                                                    </> 
                                                }))}<br/><br/>
                                                {isValidateValue === false && props.benefitsRecordsValue[index]?.label === undefined && <span className="text-danger">First Select this </span>}


                                            </div>
                                            {(props.benefit?.length - 1) > (props.benefitsRecordsValue?.length - 1) &&
                                                <div className="col-md-1 col-sm-1  " style={{ marginLeft: "-12px", marginTop: "5px" }}>
                                                    <i className="fa fa-plus-circle text-customBlue"
                                                        onClick={() => {
                                                            props.setBenefitsRecordsValue([...props.benefitsRecordsValue, {
                                                                label: "",
                                                                value: "",
                                                                amount: ""
                                                            }])

                                                        }}
                                                    ></i></div>}




                                        </div>


                                        {/* // setBenefitsRecordsValue,benefitsRecordsValue */}
                                        <div className="field item form-group col-md-6 col-sm-6">
                                            <label className="col-form-label col-md-3 col-sm-3 label-align">Benefit Amount </label>
                                            <div className="col-md-8 col-sm-8">

                                                {props.benefitsRecordsValue.map(((eachBenValue, index) => {
                                                    return <input
                                                        className="form-control"
                                                        name="Benefit amount" min="0"
                                                        placeholder=""
                                                        value={props.benefitsRecordsValue[index].amount}
                                                        type="number"
                                                        key={index}
                                                        onInput={(er) => (er.target.value = er.target.value.slice(0, 6))}
                                                        onChange={(e) => {
                                                            const objectData = props.benefitsRecordsValue;
                                                            objectData[index] = {
                                                                ...objectData[index],
                                                                amount: e.target.value
                                                            }
                                                            props.setBenefitsRecordsValue(objectData)
                                                            setReRender(!reRender)
                                                        }} />
                                                }))}

                                                {isValidateValue === false && ((props.benefitsRecordsValue[index]?.amount == undefined ) || (props.benefitsRecordsValue[index]?.amount =='0' )|| (props.benefitsRecordsValue[index]?.amount =='' ))&& <span className="text-danger">Must enter benefit amount </span>}
                                          
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
                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Reference Name </label>
                                    <div className="col-md-8 col-sm-8">
                                        <input required
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
                                                {isValidateValue === false && (Number(props?.selectEmployee?.reference_name) === 0  )&& <span className="text-danger">First Select this </span>}
                                       {console.log(props?.selectEmployee)}
                                    </div>
                                </div>
                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align pl-0">Reference Phone </label>
                                    <div className="col-md-8 col-sm-8">
                                        <input required
                                            name="name" min="0"
                                            className='form-control'
                                            type="number"
                                            placeholder=""
                                            onInput={(er) => (er.target.value = er.target.value.slice(0, 11))}

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
                                                {isValidateValue === false && (Number(props?.selectEmployee?.reference_cell) === 0 )&& <span className="text-danger">First Select this </span>}

                                    </div>
                                </div>
                            </div>




                            <div className="row">
                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Reference CNIC </label>
                                    <div className="col-md-8 col-sm-8">

                                        <input required
                                            name="name" min="0"
                                            className='form-control'
                                            type="number"
                                            placeholder="without Dashes Ex, 3310567889234"
                                            onInput={(er) =>
                                                (er.target.value = er.target.value.slice(0, 13))
                                            }
                                            //className={`${props.isEmplEditModeOn ? (emplEditValidator.cnicNum ? "form-control" : "form-control requiredValidateInput") : "form-control form-control-remove"}`}

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
                                                {isValidateValue === false && (Number(props?.selectEmployee?.reference_cnic) === 0)&& <span className="text-danger">First Select this </span>}

                                    </div>
                                </div>

                            </div>
                        </div>


                        <div className="card" style={{ marginTop: "25px " }}> <h5 className="card-header"> Other Information</h5>
                            <div className="row" style={{ marginTop: "6px " }}>
                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align pl-0">Allowed Holidays</label>
                                    <div className="col-md-8 col-sm-8">
                                        <input required
                                            name="name"
                                            className='form-control'
                                            type="number"
                                            placeholder=""
                                            onInput={(er) => (er.target.value = er.target.value.slice(0, 3))}
                                            min="0"


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
                                                {isValidateValue === false && (Number(props?.selectEmployee?.allowed_holidays) === 0 )&& <span className="text-danger">First Select this </span>}

                                    </div>
                                </div>

                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Assign Holidays</label>
                                    <div className="col-md-8 col-sm-8">
                                        <Select
                                            options={optionsAH}
                                            value={optionsAH.find(e => Number(e.value) == props.selectEmployee.holiday_assigned)}
                                            styles={customStyles}
                                            onChange={(value) => {
                                                //setEmplEditValidator(emplEditValidatorInitialState)
                                                props.setEmployeeToUpdate({
                                                    ...props.selectEmployee,
                                                    holiday_assigned: value.value,
                                                });
                                            }}
                                        />
                                                {isValidateValue === false && (Number(props?.selectEmployee?.holiday_assigned) ===  0)&& <span className="text-danger">First Select this </span>}
                                 {console.log(props?.EmployeeToUpdate)}
                                    </div>
                                </div>
                            </div>





                            <div className="row">

                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Designation <span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <Creatable
                                            isClearable={false}

                                            options={props.designation}
                                            value={{ label: props.selectEmployee.designtion?.designationName, value: props.selectEmployee.designtion?.designation_id }}
                                            styles={customStyles}
                                            onChange={(value) => {

                                                setEmplEditValidator(emplEditValidatorInitialState)
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
                                        {isValidateValue === false && props.selectEmployee?.designtion?.designation_id === undefined && <span className="text-danger">First Select this </span>}


                                    </div>
                                </div>

                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align pl-0">Status <span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <Select
                                            options={optionsStatus}
                                            value={optionsStatus.find(e => Number(e.value) == props.selectEmployee.status)}
                                            styles={customStyles}
                                            onChange={(value) => {
                                                setEmplEditValidator(emplEditValidatorInitialState)
                                                props.setEmployeeToUpdate({
                                                    ...props.selectEmployee,
                                                    status: value.value,
                                                });
                                            }}
                                        />
                                        {isValidateValue === false && Number(props.selectEmployee.status) === null && <span className="text-danger">First Select this </span>}


                                    </div>
                                </div>
                            </div>







                            <div className="row">



                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Shift<span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <Creatable

                                            isClearable={false}
                                            options={props.shift}
                                            value={{ label: props.selectEmployee.shift?.shift_name, value: props.selectEmployee.shift?.shift_id }}
                                            styles={customStyles}
                                            onChange={(value) => {

                                                setEmplEditValidator(emplEditValidatorInitialState)
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
                                        {isValidateValue === false && props.selectEmployee?.shift?.shift_id === undefined && <span className="text-danger">First Select this </span>}


                                    </div>
                                </div>
                            </div>





                            <div className="row">
                                <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align pl-0">Is overtime allowed</label>
                                    <div className="custom-control custom-checkbox  ml-3">
                                        <input required type="checkbox" className="custom-control-input" id="customCheck1"

                                            defaultChecked={props.selectEmployee.is_overtime_allow === 0 ? false : true}
                                            disabled={!props.isEmplEditModeOn}
                                            onChange={(e) => {
                                                let isChecked = e.target.checked;
                                                props.setEmployeeToUpdate({
                                                    ...props.selectEmployee,
                                                    is_overtime_allow: isChecked ? 1 : 0,
                                                });
                                            }}
                                        />
                                        <label className="custom-control-label" htmlFor="customCheck1"></label>
                                    </div>
                                </div>


                                {/* <div className="field item form-group col-md-6 col-sm-6">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Overtime</label>
                                    <div className="col-md-8 col-sm-8">
                                        <input required
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
                                </div> */}


                            </div>
                        </div>


                        <div className="card" style={{ marginTop: "25px " }}> <h5 className="card-header"> Upload Files</h5>
                            <div className="row" style={{ marginTop: "6px " }}>



                            </div>

                            <div className="row">
                                <div className="field item form-group col-md-6 col-sm-6 w-50 p-3">
                                    <label htmlFor="exampleFormControlFile1" className="col-form-label col-md-3 col-sm-3 label-align">Profile Pic<span className="required">*</span></label>


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
                                        {/* <div className="row my-1">
                                            <div className=" ">

                                                <>
                                                    <div className="col-md-12 ">
                                                        <input
                                                            //ref={props.ref}
                                                            type="file"
                                                            className="form-control form-control-sm customStyleForInput"
                                                            data-validate-length-range={6}
                                                            data-validate-words={2}
                                                            name="name"
                                                            onChange={props.fileHandle1ForUpdate}
                                                        />
                                                        {isValidateValue === false && Number(props.selectEmployee.profile_image) === 0 && <span className="text-danger">First Select this </span>}

                                                    </div>
                                                </>
                                            </div>
                                        </div> */}
                                        <div className="row" style={{ paddingTop: "8px" }}>
                                            <div className="col-md-10 ">
                                                <input
                                                    // ref={props.ref}
                                                    type="file"
                                                    className="form-control form-control-sm customStyleForInput"
                                                    data-validate-length-range={6}
                                                    data-validate-words={2}
                                                    name="name"
                                                    onChange={(e) => {
                                                        props.setPicture(e.target.files[0])
                                                        props.setPictureName((e.target.files[0].name.split("."))[0])
                                                    }}
                                                />
                                            </div>
                                            <div className="col-md-1  " style={{ paddingTop: "1.5px" }}>
                                                {
                                                    // props.isFileUploadingModeOn ?
                                                    //     <div className="spinner-border my-2 text-customOrange" role="status"> <span className="sr-only">Loading...</span> </div> :
                                                    <button className="btn btn-sm btn-outline-success" onClick={props.fileHandle1ForUpdate} type="button">
                                                        <i className="fa fa-upload"></i></button>
                                                }
                                            </div>
                                            {isValidateValue === false && Number(props.selectEmployee.profile_image) === 0 && <span className="text-danger">First Select this </span>}
                                        </div>
                                    </div>


                                </div>
                           
                                <div className="field item form-group col-md-6 col-sm-6 w-50 p-3">
                                    <label htmlFor="exampleFormControlFile1" className="col-form-label col-md-3 col-sm-3 label-align">CNIC Front<span className="required">*</span></label>


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
                                        {/* <div className="row my-1">
                                            <div className=" ">

                                                <>  <div className="col-md-12 ">
                                                    <input
                                                        //ref={props.ref}
                                                        type="file"
                                                        className="form-control form-control-sm customStyleForInput"
                                                        data-validate-length-range={6}
                                                        data-validate-words={2}
                                                        name="name"
                                                        onChange={props.fileHandle2ForUpdate}
                                                    />
                                                    {isValidateValue === false && Number(props.selectEmployee.cnic_front) === 0 && <span className="text-danger">First Select this </span>}

                                                </div>
                                                </> </div>
                                        </div> */}
                                        <div className="row" style={{ paddingTop: "8px" }}>
                                            <div className="col-md-10 ">
                                                <input
                                                    ref={props.ref}
                                                    type="file"
                                                    className="form-control form-control-sm customStyleForInput"
                                                    data-validate-length-range={6}
                                                    data-validate-words={2}
                                                    name="name"
                                                    onChange={(e) => {
                                                        props.setPicture(e.target.files[0])
                                                        props.setPictureName((e.target.files[0].name.split("."))[0])
                                                    }}
                                                />
                                            </div>
                                            <div className="col-md-1  " style={{ paddingTop: "1.5px" }}>
                                                {
                                                    // props.isFileUploadingModeOn ?
                                                    //     <div className="spinner-border my-2 text-customOrange" role="status"> <span className="sr-only">Loading...</span> </div> :
                                                    <button className="btn btn-sm btn-outline-success" onClick={props.fileHandle2ForUpdate} type="button">
                                                        <i className="fa fa-upload"></i></button>
                                                }
                                            </div>
                                            {isValidateValue === false && Number(props.selectEmployee.cnic_front) === 0 && <span className="text-danger">First Select this </span>}
                                        </div>
                                    </div>


                                </div>
                            </div>

                            <div className="row">
                                <div className="field item form-group col-md-6 col-sm-6 w-50 p-3">
                                    <label htmlFor="exampleFormControlFile1" className="col-form-label col-md-3 col-sm-3 label-align">CNIC Back <span className="required">*</span></label>


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
                                        {/* <div className="row my-1">

                                            <div className="">
                                                <div className="col-md-12 ">
                                                    <input
                                                        //ref={props.ref}
                                                        type="file"
                                                        className="form-control form-control-sm customStyleForInput"
                                                        data-validate-length-range={6}
                                                        data-validate-words={2}
                                                        name="name"
                                                        onChange={props.fileHandle3ForUpdate}
                                                    />
                                                    {isValidateValue === false && Number(props.selectEmployee.cnic_back) === 0 && <span className="text-danger">First Select this </span>}

                                                </div>


                                            </div>
                                        </div> */}

                                        <div className="row" style={{ paddingTop: "8px" }}>
                                            <div className="col-md-10 ">
                                                <input
                                                    ref={props.ref}
                                                    type="file"
                                                    className="form-control form-control-sm customStyleForInput"
                                                    data-validate-length-range={6}
                                                    data-validate-words={2}
                                                    name="name"
                                                    onChange={(e) => {
                                                        props.setPicture(e.target.files[0])
                                                        props.setPictureName((e.target.files[0].name.split("."))[0])
                                                    }}
                                                />
                                            </div>
                                            <div className="col-md-1  " style={{ paddingTop: "1.5px" }}>
                                                {
                                                    // props.isFileUploadingModeOn ?
                                                    //     <div className="spinner-border my-2 text-customOrange" role="status"> <span className="sr-only">Loading...</span> </div> :
                                                    <button className="btn btn-sm btn-outline-success" onClick={props.fileHandle3ForUpdate} type="button">
                                                        <i className="fa fa-upload"></i></button>
                                                }
                                            </div>
                                            {isValidateValue === false && Number(props.selectEmployee.cnic_back) === 0 && <span className="text-danger">First Select this </span>}
                                        </div>
                                    </div>


                                </div>
                            
                                <div className="field item form-group col-md-6 col-sm-6 w-50 p-3">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Select Attachment</label>
                                    <div className=" ">
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
                                                />
                                            </div>
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



                                </div>
                                {props.fileEntity.length !== 0 && <div className="field item form-group col-md-6 col-sm-6 w-50 p-3">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Attachments</label>
                                    <div className="col-md-12 col-sm-12 ">
                                        {
                                            props.fileEntity.map((each_attachment, index) => {
                                                return <button className="btn btn-sm  bg-customBlue  text-light">
                                                    <a href={`${props.endPoint + each_attachment}`} target="_blank" className='text-light'>
                                                        {((each_attachment.split("_"))[0]).slice(15)} {index + 1}</a>
                                                    <i className="fa fa-times   text-light ml-1 " aria-hidden="true"
                                                        onClick={() => {
                                                            let arr_data = props.fileEntity.filter((each_image) => {
                                                                return (props.fileEntity.indexOf(each_image) !== index);
                                                            });
                                                            props.setFileEntity(arr_data)
                                                            console.log(arr_data, "array ka data");
                                                            setReRender(!reRender)
                                                        }}
                                                    ></i>
                                                </button>
                                            })
                                        }
                                    </div>
                                </div>}
                            </div>
                        </div>







                        <>
                            {" "}
                            {props.isEmplEditModeOn ? (
                                <div className="form-group mt-2 field item  col-md-12 col-sm-12">
                                    <div className="col-md-12 col-sm-12 offset-md-10 pb-2 " style={{ marginTop: "28px " }}>

                                        {
                                            !props.disableSubmitForUpdatePhoto ?
                                                <>  <button id="button-submit-form" type="submit"

                                                    className="btn btn-primary btn-sm px-4  mt-3"
                                                    onClick={(e) => {
                                                        updateFunct(e)
                                                    }}


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

                        {/* <button id="button-submit-form" type="submit">
                                Submit Form
                            </button> */}
                    </form>

                </>
            )
            }

        </>
    );
};

export default EmployeeForm;