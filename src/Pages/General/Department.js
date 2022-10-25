import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import CustomInnerHeader from "../../Components/CustomInnerHeader";
const Department = () => {
    const [department, setDepatment] = useState({
        department_id: 0,
        department_name: ""

    })
    const [data, setData] = useState([]);
    const [update, setUpdate] = useState("");
    const [togglesubmit, setToggleSubmit] = useState(true);



    // Add Record 
    const AddData = (id) => {
        // e.preventDefault();
        var data = JSON.stringify({
            "department_name": department.department_name
        });

        var config = {

            method: "POST",
            url: 'http://rightway-api.genial365.com/api/Departments',
            headers: {
                Authorization:
                  "Bearer " +
                  JSON.parse(localStorage.getItem("access_token")).access_token,
                "Content-Type": "application/json",
              },
            data: data
        };

        axios(config)
            .then(function (response) {
                getData()
                toast.success("Department Name   Added successfully")
                setDepatment({
                    department_name: ""
                });

            })
           


    }

    // Get Record
    const getData = () => {


        var axios = require('axios');

        var config = {
            method: 'get',
            url: 'http://rightway-api.genial365.com/api/Departments',
            headers: {
                Authorization:
                  "Bearer " +
                  JSON.parse(localStorage.getItem("access_token")).access_token,
              },
        };

        axios(config)
            .then(function (response) {

                setData(response.data)
            })
          



    }

    //   Delete Record
    const Delete = (id) => {


        var axios = require('axios');

        var config = {
            method: 'DELETE',
            url: `http://rightway-api.genial365.com/api/Departments/${id}`,
            headers: {
                Authorization:
                  "Bearer " +
                  JSON.parse(localStorage.getItem("access_token")).access_token,
              },

        };

        axios(config)
            .then(function (response) {

                getData()
                toast.success("Department Name  has been deleted successfully")

            })
          





    }
    const FetchDataforEdit = (id) => { 

        var config = {
            method: 'get',
            url: `http://rightway-api.genial365.com/api/Departments/${id}`,

            headers: {
                Authorization:
                  "Bearer " +
                  JSON.parse(localStorage.getItem("access_token")).access_token,
              },
        };

        axios(config)
            .then(function (response) {
                setDepatment(response.data)
                setToggleSubmit(false);


            })
          



    }
    function Edit() {
        var data = JSON.stringify({
            "department_id": update.department_id,
            "department_name": update.department_name
        });

        var config = {
            method: 'put',
            url: `http://rightway-api.genial365.com/api/Departments/${update.department_id}`,
            headers: {
                Authorization:
                  "Bearer " +
                  JSON.parse(localStorage.getItem("access_token")).access_token,
                "Content-Type": "application/json",
              },
            data: data
        };

        axios(config)
            .then(function (response) {
                getData()
                toast.success("Department Name  has been updated  successfully")
                setDepatment({
                    department_name: ""
                });

                setToggleSubmit(true)
            })
          






    }
    const CancelEvent = () => {
        setDepatment({
            department_id: 0,
            department_name: "",
        });
        setToggleSubmit(true);
    };

    useEffect(() => {
        getData();
    }, []);







    const showNavMenu = useSelector((state) => state.NavState);
    return (
        <>

            <div
                className={`container-fluid right_col  page-title-bar ${showNavMenu === false ? "right_col-margin-remove" : ""
                    }   `}
            >    
            <CustomInnerHeader moduleName="Department Mangement" isShowSelector={true} />
          
           
            


            </div>
            <div
                role="main"
                className={`right_col  h-100  ${showNavMenu === false ? "right_col-margin-remove" : " "
                    } `}
            >
                <div className="x_panel">
                    <div className="x_content my-3">
                        <span className="section pl-4">
                            <i className="fa fa-edit"></i>&nbsp;Add Department
                        </span>
                        <div className="row">
                            <div className="field item form-group col-md-6 col-sm-6">
                                <label className="col-form-label col-md-3 col-sm-3 label-align"> Enter Department Title <span className="required">*</span></label>
                                <div className="col-md-8 col-sm-8">
                                    {togglesubmit ?
                                        <input
                                            className="form-control"
                                            data-validate-length-range={6}
                                            data-validate-words={2}
                                            name="name"
                                            value={department.department_name}
                                            placeholder="Enter Department here"
                                            onChange={(e) => setDepatment({
                                                ...department,
                                                department_name: e.target.value


                                            })}
                                        /> :
                                        <input
                                            className="form-control"
                                            data-validate-length-range={6}
                                            data-validate-words={2}
                                            name="name"
                                            value={update.department_name}
                                            placeholder="Enter Department here"
                                            onChange={(e) => setUpdate({
                                                ...update,
                                                department_name: e.target.value


                                            })}
                                        />}

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12 text-right x_footer">
                        <button className="btn text-white" type="submit" style={{ backgroundColor: "#003a4d" }} onClick={CancelEvent} >Cancel</button>
                        {togglesubmit ?

                            <button className="btn btn-primary" type="submit" onClick={AddData} > Submit</button> :

                            <button className="btn btn-primary" type="submit" onClick={() => Edit()} > Update </button>
                        }

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
                                        <th className="column-title  right-border-1 text-center">Department Name</th>
                                        <th className="column-title text-center" width="10%">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {data.map((val, ind) => {
                                        return (
                                            <>
                                                <tr className="even pointer"  >
                                                    <td className=" ">{ind + 1}</td>
                                                    <td className="text-center ">{val.department_name} </td>
                                                    <td
                                                        className="a-right a-right     text-center"
                                                    >
                                                        <i
                                                            className="fa fa-edit pl-3" onClick={() => {
                                                                FetchDataforEdit(val.department_id)
                                                                setUpdate({
                                                                    department_name: val.department_name,
                                                                    department_id: val.department_id
                                                                })
                                                            }}
                                                        ></i>
                                                        <i
                                                            className="fa fa-trash-o pl-3" onClick={() => Delete(val.department_id)}
                                                        ></i>
                                                    </td>
                                                </tr>

                                            </>


                                        )

                                    }


                                    )}


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Department;

