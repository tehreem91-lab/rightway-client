import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select'
import EmployeeForm from './EmployeeForm';
import { useSelector } from "react-redux";
import Loader from "../../Layout/Loader/Loader.js";
import { customStyles } from '../../Components/reactCustomSelectStyle';
import { endPoint } from "../../config/Config.js";
import { toast } from "react-toastify";
import axios from "axios";

import { Button, Modal } from 'react-bootstrap';
import EmployeeFormView from './EmployeeFormView';

function AddEmployee() {
    const showNavMenu = useSelector((state) => state.NavState);
    const [isLoading, setisLoading] = useState(true);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [lgShow, setLgShow] = useState(false);


    const [ListOfEmployee, setListOfEmployee] = useState([]);
    const [employeeToUpdate, setEmployeeToUpdate] = useState({});
    const [allEmpListConst, setAllEmpListConst] = useState([]);
    const [employeeStatusState, setEmployeeStatusState] = useState([]);
    const [isEmplEditModeOn, setIsEmplEditModeOn] = useState(false);
    const [addNewEmployee, setAddNewEmployee] = useState([]);
    const [disableSubmitForUpdatePhoto, setdisableSubmitForUpdatePhoto] = useState(false);

    const [designationValue, setDesignationValue] = useState("CODER");
    const [departmentValue, setDepartmentValue] = useState("CODER");
    const [shiftValue, setShiftValue] = useState("");
    const [benefitValue, setBenefitValue] = useState("CODER");
    const [designation, setDesignation] = useState([]);
    const [department, setDepartment] = useState([]);
    const [shift, setShift] = useState([]);
    const [benefit, setBenefit] = useState([]);


    const [selectedValue, setSelectedValue] = useState("");
    const [inputOptions, setInputOptions] = useState("");

    const [selectedAttachmentFile, setSelectedAttachmentFile] = useState("")
    const [selectedAttachmentName, setSelectedAttachmentName] = useState("")
    const [isFileUploadingModeOn, setIsFileUploadingModeOn] = useState(false)
    const [fileEntity, setFileEntity] = useState([]);
    const ref = useRef();
    const reset = () => {
        ref.current.value = "";
    };

    const URL = localStorage.getItem("authUser");

    const fileHandle1 = (e) => {
        console.log("FGFGFG");
        setdisableSubmitForUpdatePhoto(true);
        var myHeaders = new Headers();
        myHeaders.append("contentType", "false");
        myHeaders.append("processData", "false");
        var formdata = new FormData();
        formdata.append("UploadedImage", e.target.files[0]);
        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
            redirect: "follow",
        };
        //   ///api/Employees/attach-files
        fetch(URL + "api/FileUpload?file_name=" + e.target.files[0].name, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                setAddNewEmployee({ ...addNewEmployee, profile_image: result });
                // setAddNewEmployee({ ...addNewEmployee, employeePic2: result });
                setdisableSubmitForUpdatePhoto(false);
            })
            .catch((error) => console.log("error", error));
    };
    const fileHandle1ForUpdate = (e) => {
        setdisableSubmitForUpdatePhoto(true);
        var myHeaders = new Headers();
        myHeaders.append("contentType", "false");
        myHeaders.append("processData", "false");
        var formdata = new FormData();
        formdata.append("UploadedImage", e.target.files[0]);
        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
            redirect: "follow",
        };
        //   ///api/Employees/attach-files
        fetch(URL + "api/FileUpload?file_name=" + e.target.files[0].name, requestOptions)
            .then((response) => response.text())
            .then((result) => {

                setdisableSubmitForUpdatePhoto(false);
                setEmployeeToUpdate({ ...employeeToUpdate, profile_image: result });
            })
            .catch((error) => console.log("error", error));
    };

    const fileHandle2ForUpdate = (e) => {
        setdisableSubmitForUpdatePhoto(true);
        var myHeaders = new Headers();
        myHeaders.append("contentType", "false");
        myHeaders.append("processData", "false");
        var formdata = new FormData();
        formdata.append("UploadedImage", e.target.files[0]);
        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
            redirect: "follow",
        };
        //   ///api/Employees/attach-files
        fetch(URL + "api/FileUpload?file_name=" + e.target.files[0].name, requestOptions)
            .then((response) => response.text())
            .then((result) => {

                setdisableSubmitForUpdatePhoto(false);
                setEmployeeToUpdate({ ...employeeToUpdate, cnic_front: result });
            })
            .catch((error) => console.log("error", error));
    };

    const fileHandle3ForUpdate = (e) => {
        setdisableSubmitForUpdatePhoto(true);
        var myHeaders = new Headers();
        myHeaders.append("contentType", "false");
        myHeaders.append("processData", "false");
        var formdata = new FormData();
        formdata.append("UploadedImage", e.target.files[0]);
        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
            redirect: "follow",
        };
        //   ///api/Employees/attach-files
        fetch(URL + "api/FileUpload?file_name=" + e.target.files[0].name, requestOptions)
            .then((response) => response.text())
            .then((result) => {

                setdisableSubmitForUpdatePhoto(false);
                setEmployeeToUpdate({ ...employeeToUpdate, cnic_back: result });
            })
            .catch((error) => console.log("error", error));
    };

    const UploadFile = async (e) => {
        setIsFileUploadingModeOn(true)
        const options = {
            onUploadProgerss: (progressEvent) => {
                const { loaded, total } = progressEvent;
                let percentage = Math.floor((loaded * 100) / total)
                console.log(`${loaded}bytes of ${total}bytes | ${percentage}%`);
            }
        }
        let data = new FormData();
        data.append("UploadedImage", selectedAttachmentFile);
        await axios.post(`${endPoint}/api/FileUpload?file_name=${selectedAttachmentName}`, data, options).then(res => {
            setFileEntity([...fileEntity, res.data])
            if (res.status === 200) {
                setIsFileUploadingModeOn(false)
                reset()
            }
        })
    }

    const fetchAllData = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(URL + "api/EmployeeDetails/GetData", requestOptions)
            .then((response) => {
                response.json().then((data) => {
                    setListOfEmployee(data);
                    setAllEmpListConst(data);
                    setEmployeeStatusState(data)

                    // ----- Setting Designation List ------
                    fetch(URL + "api/EmployeeDesignations/GetData", {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
                        },
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            var arr = [];
                            data.map((item) => {
                                arr.push({
                                    label: item.designationName,
                                    value: item.designation_id,
                                });
                            });

                            setDesignation(arr);
                        });
                    // ----- Setting Designation List ------


                    // ----- Setting Department List ------
                    fetch(URL + "api/Departments", {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
                        },
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            var arr = [];
                            data.map((item) => {
                                arr.push({
                                    label: item.department_name,
                                    value: item.department_id,
                                });
                            });

                            setDepartment(arr);
                        });
                    // ----- Setting Department List ------

                    // ----- Setting Shift List ------
                    fetch(URL + "api/Shifts/GetData", {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
                        },
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            var arr = [];
                            data.map((item) => {
                                arr.push({
                                    label: item.shift_name,
                                    value: item.shift_id,
                                });
                            });

                            setShift(arr);
                        });
                    // ----- Setting Shift List ------

                    // ----- Setting Benefit List ------
                    fetch(URL + "api/Benefits", {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
                        },
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            var arr = [];
                            data.map((item) => {
                                arr.push({
                                    label: item.benefit_title,
                                    value: item.benefit_id,
                                });
                            });

                            setBenefit(arr);
                        });
                    // ----- Setting Benefit List ------

                    setisLoading(false);
                });
            })
            .catch((error) => console.log("error", error));
    };

    const updateEmployeeClouds = (e) => {

        console.log(employeeToUpdate, "ooooooooooooo");

        var ben = JSON.stringify({

            "benefit_id": employeeToUpdate.benefits?.benefit_id,
            "amount": employeeToUpdate.benefits?.amount


        });

        var raw

        raw = JSON.stringify({
            "employee_name": employeeToUpdate.employee_name,
            "sur_name": employeeToUpdate.sur_name,
            "cell": employeeToUpdate.cell,
            "cnic": employeeToUpdate.cnic,
            "profile_image": employeeToUpdate.profile_image,
            "cnic_front": employeeToUpdate.cnic_front,
            "cnic_back": employeeToUpdate.cnic_back,
            "attachments": employeeToUpdate.attachments,
            "address": employeeToUpdate.address,
            "department_id": employeeToUpdate.department?.department_id,
            "reference_name": employeeToUpdate.reference_name,
            "reference_cell": employeeToUpdate.reference_cell,
            "reference_cnic": employeeToUpdate.reference_cnic,
            "salary_type": employeeToUpdate.salary_type,
            "salary": employeeToUpdate.salary,
            "is_overtime_allow": employeeToUpdate.is_overtime_allow,
            "over_time": employeeToUpdate.over_time,
            "designation_id": employeeToUpdate.designtion?.designation_id,
            "advance_percentage": employeeToUpdate.advance_percentage,
            "allowed_holidays": employeeToUpdate.allowed_holidays,
            "holiday_assigned": employeeToUpdate.holiday_assigned,
            "shift_id": employeeToUpdate.shift?.shift_id,
            "status": employeeToUpdate.status,
            "benefits": [
                {
                    "benefit_id": employeeToUpdate.benefits?.benefit_id,
                    "benefit_title": employeeToUpdate.benefits?.benefit_title,
                    "benefit_amount": employeeToUpdate.benefits?.benefit_amount
                }
            ]
            // "benefits": employeeToUpdate.map((eachBenefit) => {
            //     return {
            //         "benefit_id": eachBenefit.value,
            //         "benefit_title": eachBenefit.label,
            //         "benefit_amount": eachBenefit.amount
            //     }
            // }),

        });

        console.log(raw, "benfits");

        var myHeaders = new Headers();
        myHeaders.append(
            "Authorization", `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`);
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch(`${endPoint}api/EmployeeDetails/PutEmployeeData?emp_id=` + employeeToUpdate.employee_id, requestOptions)
            .then((response) => {
                if (response.status === 200) {
                    const filterdEmp = employeeStatusState.filter((emp) => {
                        return emp.employee_id !== employeeToUpdate.employee_id;
                    });
                    const unSorted = [...filterdEmp, {
                        "employee_name": employeeToUpdate.employee_name,
                        "sur_name": employeeToUpdate.sur_name,
                        "cell": employeeToUpdate.cell,
                        "cnic": employeeToUpdate.cnic,
                        "profile_image": employeeToUpdate.profile_image,
                        "cnic_front": employeeToUpdate.cnic_front,
                        "cnic_back": employeeToUpdate.cnic_back,
                        "attachments": employeeToUpdate.attachments,
                        "address": employeeToUpdate.address,
                        "department_id": employeeToUpdate.departmentUpdate.value,
                        "reference_name": employeeToUpdate.reference_name,
                        "reference_cell": employeeToUpdate.reference_cell,
                        "reference_cnic": employeeToUpdate.reference_cnic,
                        "salary_type": employeeToUpdate.salary_type,
                        "salary": employeeToUpdate.salary,
                        "is_overtime_allow": employeeToUpdate.is_overtime_allow,
                        "over_time": employeeToUpdate.over_time,
                        "designation_id": employeeToUpdate.designationUpdate.value,
                        "advance_percentage": employeeToUpdate.advance_percentage,
                        "allowed_holidays": employeeToUpdate.allowed_holidays,
                        "holiday_assigned": employeeToUpdate.holiday_assigned,
                        "shift_id": employeeToUpdate.shiftUpdate.value,
                        "status": employeeToUpdate.status,
                        "benefits": [
                            {
                                "benefit_id": employeeToUpdate.benefits.benefit_id,
                                "amount": employeeToUpdate.benefits.amount
                            },
                            {
                                "benefit_id": employeeToUpdate.benefits.benefit_id,
                                "amount": employeeToUpdate.benefits.amount
                            },
                            {
                                "benefit_id": employeeToUpdate.benefits.benefit_id,
                                "amount": employeeToUpdate.benefits.amount
                            }
                        ]
                    }]


                    var sortedEmpConst = unSorted.sort(
                        (a, b) => a.name.localeCompare(b.name)
                    );
                    setListOfEmployee(sortedEmpConst)
                    setEmployeeStatusState(sortedEmpConst)
                    setAllEmpListConst(sortedEmpConst)
                    //setStatusFilterValue(statusFilterOptions[0])
                    toast.success(
                        "Employee updated successfully")
                } else {
                    toast.error(
                        "Something went wrong")
                }




                return response.text();
            })
            .then((result) => setShow(false))
            .catch((error) => {
                toast.success(
                    // "Something went wrong")
                    "Employee updated successfully")
                console.log("error", error)
            });
        setIsEmplEditModeOn(false)
    };

    const handleChange = (value) => {
        setDesignationValue(value.value);
        setDepartmentValue(value.value);
        setShiftValue(value.value);
        setBenefitValue(value.value);
    };

    useEffect(() => {
        fetchAllData();
    }, []);

    return (
        <>
            {isLoading ? (
                <>
                    {" "}
                    <Loader />{" "}
                </>
            ) : (
                <>
                    <div
                        className={`container-fluid page-title-bar ${showNavMenu == false ? "right_col-margin-remove" : ""
                            }   `}
                    >
                        <span>&nbsp;Employee Management</span>
                    </div>
                    <div
                        role="main"
                        className={`right_col  h-100  ${showNavMenu === false ? "right_col-margin-remove" : " "
                            } `}
                    >

                        <Modal
                            dialogClassName="modal-100w"
                            size="xl"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                            show={show} onHide={handleClose}>

                            <Modal.Header closeButton>
                                <Modal.Title>
                                    <i className="fa fa-edit"></i>&nbsp;Edit Employee
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <EmployeeForm
                                    show={show}
                                    employeeToUpdate={employeeToUpdate}
                                    onHide={() => {
                                        setIsEmplEditModeOn(false)
                                        setShow(false)
                                    }}

                                    isEmplEditModeOn={isEmplEditModeOn}
                                    setIsEmplEditModeOn={setIsEmplEditModeOn}
                                    selectEmployee={employeeToUpdate}
                                    setEmployeeToUpdate={setEmployeeToUpdate}
                                    //designation={designation} jobStatus={jobStatus} recruitmentType={recruitmentType}
                                    ListOfEmployee={ListOfEmployee} setListOfEmployee={setListOfEmployee}
                                    updateEmployeeClouds={updateEmployeeClouds}
                                    handleChange={handleChange}

                                    setDesignationValue={setDesignationValue}
                                    setDepartmentValue={setDepartmentValue}
                                    setShiftValue={setShiftValue}
                                    setBenefitValue={setBenefitValue}
                                    designationValue={designationValue}
                                    departmentValue={departmentValue}
                                    shiftValue={shiftValue}
                                    benefitValue={benefitValue}
                                    designation={designation}
                                    department={department}
                                    shift={shift}
                                    benefit={benefit}
                                    fileHandle1={fileHandle1}

                                    fileHandle1ForUpdate={fileHandle1ForUpdate}
                                    fileHandle2ForUpdate={fileHandle2ForUpdate}
                                    fileHandle3ForUpdate={fileHandle3ForUpdate}
                                    UploadFile={UploadFile}
                                    ref={ref}
                                    setSelectedAttachmentFile={setSelectedAttachmentFile}
                                    setSelectedAttachmentName={setSelectedAttachmentName}
                                    isFileUploadingModeOn={isFileUploadingModeOn}
                                    setFileEntity={setFileEntity}
                                    fileEntity={fileEntity}
                                    endPoint={endPoint}
                                />
                            </Modal.Body>
                            {/* <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={handleClose}>
                                    Save Changes
                                </Button>
                            </Modal.Footer> */}
                        </Modal>





                        <Modal
                            dialogClassName="modal-100w"
                            size="xl"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                            show={lgShow}
                            onHide={() => setLgShow(false)}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title id="example-modal-sizes-title-lg">
                                    View Employee Information
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <EmployeeFormView
                                    show={lgShow}
                                    employeeToUpdate={employeeToUpdate}
                                    onHide={() => {
                                        setIsEmplEditModeOn(false)
                                        setShow(false)
                                    }}

                                    isEmplEditModeOn={isEmplEditModeOn}
                                    setIsEmplEditModeOn={setIsEmplEditModeOn}
                                    selectEmployee={employeeToUpdate}
                                    setEmployeeToUpdate={setEmployeeToUpdate}
                                    //designation={designation} jobStatus={jobStatus} recruitmentType={recruitmentType}
                                    ListOfEmployee={ListOfEmployee} setListOfEmployee={setListOfEmployee}
                                    updateEmployeeClouds={updateEmployeeClouds}
                                    handleChange={handleChange}

                                    setDesignationValue={setDesignationValue}
                                    setDepartmentValue={setDepartmentValue}
                                    setShiftValue={setShiftValue}
                                    setBenefitValue={setBenefitValue}
                                    designationValue={designationValue}
                                    departmentValue={departmentValue}
                                    shiftValue={shiftValue}
                                    benefitValue={benefitValue}
                                    designation={designation}
                                    department={department}
                                    shift={shift}
                                    benefit={benefit}
                                    fileHandle1={fileHandle1}

                                    fileHandle1ForUpdate={fileHandle1ForUpdate}
                                    fileHandle2ForUpdate={fileHandle2ForUpdate}
                                    fileHandle3ForUpdate={fileHandle3ForUpdate}
                                    UploadFile={UploadFile}
                                    ref={ref}
                                    setSelectedAttachmentFile={setSelectedAttachmentFile}
                                    setSelectedAttachmentName={setSelectedAttachmentName}
                                    isFileUploadingModeOn={isFileUploadingModeOn}
                                    setFileEntity={setFileEntity}
                                    fileEntity={fileEntity}
                                    endPoint={endPoint}
                                />
                            </Modal.Body>
                        </Modal>






                        {/* /////////////////////////////////TABLE DATA///////////////////////////////////// */}

                        <div className="x_panel  ">
                            <div className="x_content ">
                                <span className="section">
                                    <div className="row px-2  pt-3">
                                        <div className="col-5 ">
                                            <i className='fa fa-list'></i>&nbsp;Listing
                                        </div>
                                        {/* <div className="col-7 text-right px-0 ">
                                            <div className="col-md-5"> <input
                                                type="text"
                                                placeholder="Search Filter"
                                                className="form-control height-button   "
                                            // onChange={(e) => searchItem((e.target.value).toLowerCase())}
                                            /></div>
                                            <div className="col-md-4  text-left ">
                                                <Select
                                                    className="basic-single"
                                                    classNamePrefix="select"
                                                    defaultValue={"Active"}
                                                    // value={statusFilterValue}
                                                    // onChange={(value) => {
                                                    //     setStatusFilterValue(value)
                                                    //     updateEmployeeStatusBase(value)
                                                    // }}
                                                    // isSearchable={true}
                                                    // name="color"
                                                    // options={statusFilterOptions}
                                                    styles={customStyles}
                                                /></div>
                                            <div className="col-md-3 pr-4">
                                                <Button variant="primary" onClick={handleShow}>
                                                    Add New <i className="ml-2 fa fa-plus-square"></i>
                                                </Button>
                                            </div>
                                        </div> */}




                                    </div>
                                </span>

                                <div className="table-responsive px-3 pb-2">
                                    <table className="table table-striped jambo_table bulk_action">
                                        <thead>
                                            <tr className="headings  ">
                                                <th className="column-title fontWeight300   right-border-1 text-center" width="7%"> Emp.Code</th>
                                                <th className="column-title fontWeight300   right-border-1 text-center" width="12%">Emp.Name</th>
                                                <th className="column-title fontWeight300   right-border-1 text-center" width="8%">Surname</th>
                                                <th className="column-title fontWeight300   right-border-1 text-center" width="12%">Cell</th>
                                                <th className="column-title fontWeight300   right-border-1 text-center" width="12%">CNIC</th>
                                                {/* <th className="column-title fontWeight300   right-border-1 text-center" width="12%">CNIC img</th>
                                                <th className="column-title fontWeight300   right-border-1 text-center" width="12%">Profile Img</th>
                                                <th className="column-title fontWeight300   right-border-1 text-center" width="12%">Address</th> */}
                                                <th className="column-title fontWeight300   right-border-1 text-center" width="12%">Department</th>
                                                {/* <th className="column-title fontWeight300   right-border-1 text-center" width="12%">Ref Name</th>
                                                <th className="column-title fontWeight300   right-border-1 text-center" width="12%">Ref Cell</th>
                                                <th className="column-title fontWeight300   right-border-1 text-center" width="12%">Ref CNIC</th>
                                                <th className="column-title fontWeight300   right-border-1 text-center" width="12%">Salary Type</th>
                                                <th className="column-title fontWeight300   right-border-1 text-center" width="12%">Salary</th>
                                                <th className="column-title fontWeight300   right-border-1 text-center" width="12%">Overtime Allowed</th>
                                                <th className="column-title fontWeight300   right-border-1 text-center" width="12%">Overtime</th> */}
                                                <th className="column-title fontWeight300   right-border-1 text-center" width="5%">Designation</th>
                                                {/* <th className="column-title fontWeight300   right-border-1 text-center" width="12%">Advance %</th>
                                                <th className="column-title fontWeight300   right-border-1 text-center" width="9%">Allowed Holidays</th>
                                                <th className="column-title fontWeight300   right-border-1 text-center" width="5%">Assigned Holidays</th>
                                                <th className="column-title fontWeight300   right-border-1 text-center" width="12%">Shift</th> */}
                                                <th className="column-title fontWeight300   right-border-1 text-center" width="4%">Status</th>
                                                {/* <th className="column-title fontWeight300   right-border-1 text-center" width="5%">Benefits</th> */}
                                                <th className="column-title fontWeight300   right-border-1 text-center" width="12%">Action</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {ListOfEmployee.map((item, index) => {
                                                return (
                                                    <tr className="even pointer" key={item.employee_code}>
                                                        <td className=" ">{item.employee_code}</td>
                                                        <td className=" ">{item.employee_name}</td>
                                                        <td className=" ">{item.sur_name}</td>
                                                        <td className=" ">{item.cell}</td>
                                                        <td className=" text-right">{item.cnic}</td>
                                                        {/* <td className="text-left  ">{item.cnic_image}</td>
                                                        <td className=" text-left ">{item.profile_image}</td>
                                                        <td className="text-left "> {item.address}</td> */}
                                                        <td className=" text-right">{item.department?.department_name}</td>
                                                        {/* <td className="text-left  ">{item.reference_name}</td>
                                                        <td className=" text-left ">{item.reference_cell}</td>
                                                        <td className="text-left "> {item.reference_cnic}</td>
                                                        <td className="text-left "> {item.salary_type}</td>
                                                        <td className="text-right ">{item.salary !== null && item.salary.toFixed(2)} </td>
                                                        <td className=" text-right">{item.is_overtime_allow}</td>
                                                        <td className="text-left "> {item.over_time}</td> */}
                                                        <td className="text-left "> {item.designtion?.designationName}</td>
                                                        {/* <td className="text-left "> {item.advance_percentage}</td>
                                                        <td className="text-left "> {item.allowed_holidays}</td>
                                                        <td className="text-left "> {item.holiday_assigned}</td>
                                                        <td className="text-left "> {item.shift?.shift_name}</td> */}
                                                        <td className="text-left "> {item.status}</td>
                                                        {/* <td className="text-left "> {item.benefits.benefit_title}</td> */}
                                                        <td className=" text-center   ">
                                                            <i className="fa fa-edit mr-2" onClick={() => {
                                                                setEmployeeToUpdate({
                                                                    ...item,
                                                                    designationUpdate: { value: item.designation_id, label: item.designationName },
                                                                    departmentUpdate: { value: item.department_id, label: item.department_name },
                                                                    shiftUpdate: { value: item.shift_id, label: item.shift_name }
                                                                });
                                                                setIsEmplEditModeOn(true)
                                                                setShow(true)

                                                            }}></i>
                                                            <i className="fa fa-eye mr-2" onClick={() => {
                                                                setLgShow(true)
                                                            }}></i>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
export default AddEmployee;
