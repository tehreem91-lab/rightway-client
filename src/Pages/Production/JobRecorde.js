import React, { useState, useRef } from 'react'
import { useSelector } from "react-redux";
import Select from 'react-select'
import ReactToPrint from "react-to-print";
import { useNavigate } from "react-router-dom";
import Loader from '../../Layout/Loader/Loader';
import CustomInnerHeader from '../../Components/CustomInnerHeader';
const JobRecord = () => {
  const [showTable, setshowTable] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();
  var day = new Date().toLocaleDateString(undefined, { day: "2-digit" });
  var month = new Date().toLocaleDateString(undefined, { month: "2-digit" });
  var year = new Date().toLocaleDateString(undefined, { year: "numeric" });
  const dateToday = `${year}-${month}-${day}`
  const componentRef = useRef();
  const [data, setdata] = useState({ dateTo: dateToday, dateFrom: dateToday, Status: '' })
  const [isValidateAllStates, setIsValidateAllStates] = useState(true)
  const [ApiRes, setApiRes] = useState()
  const showNavMenu = useSelector((state) => state.NavState);
  const Editform = (Recid) => {

    navigate('/CreateJobAccess', { state: { id: Recid, flag: true } })
  }
  const Report = () => {
    let isValidationOk = true;
    //Status Validation

    if (data.Status == "") {
      isValidationOk = false
    }
    setIsValidateAllStates(isValidationOk)
    var axios = require('axios');
    if (isValidationOk === true) {
      // setshowTable(true)
      setIsLoading(true)
      var config = {

        method: 'get',
        url: `http://rightway-api.genial365.com/api/Jobs/GetJobRecord?dateFrom=${data.dateFrom}&dateTo=${data.dateTo}&job_status=${data.Status}`,
        headers: {
          'Authorization': 'Bearer  wMxdleUk-ZhHC2QAxte0dLEyHUnUGoKHNOdRalFYVYvLlWTMMgGNYyJEpa3WiyVdOipdhCUHc6-7U_07tsd8RPYMfcMU3DgAMeYVtiJSkI9LMJlq-mT0lwg94tYRhdnX9Dd1ui_uN0iyglhAz4CTygiHcrQKH0lzEhPZCRGO4qSpJjVuhYmZbnV_jLiP6q3WzbWL_uB9AvLSiKDmNysYVKMTw-sM0SzaTZ0QsQchpw6EigJ4Aat5mqHOV8KyuueTBZTVWOpYBR6r7ul1RK0IBfc2g8TpXIr4EbyyddKEFC8eprWIzNMOA8s-7TQoGUUZk3qQCGG8UgHzyX_mjzr6KD14CXVgS7T_gbUi9ELHIoYfgccorQbUN9v5ann4kQXpwYWjRsRkQnnrQk6uJrwRYe_rTBo374jtmW5opg77FgBRVTbXeUCaaNTdLFKs4grYCNzCk43tCUhV6-q7uUkgxU-BqpQcPrrJTHrruJMOgufR9KTfPrvUPlMC984k7LovM8pHTs-Dy9MwptZPQopGig'
        }
      };

      axios(config)
        .then(function (response) {
          setIsLoading(false)
        
          setApiRes(response.data);
        })
        .catch(function (error) {
         
        });
    }

  }
  return (

    <>

      {isLoading ? (
        <Loader />
      ) : (<> <div className={`container-fluid page-title-bar ${showNavMenu == false ? "right_col-margin-remove" : ""}   `} >
      <CustomInnerHeader moduleName={"Job Record"} isShowSelector={true}/>
      </div>
        <div role="main" className={`right_col  h-100  ${showNavMenu === false ?
          "right_col-margin-remove" : " "} `}>
          <div className="x_panel  ">
            <div className="x_content mt-3">
              <div className="row">
                <div className="field item form-group col-md-3 col-sm-6">
                  <label className="col-form-label col-md-5 col-sm-4 label-align">Date From<span className="required">*</span></label>
                  <div className="col-md-7 col-sm-6">
                    <input
                      type="date"
                      className="form-control"
                      value={data.dateFrom}
                      onChange={(e) => { setdata({ ...data, dateFrom: e.target.value }) }}
                    />

                  </div>


                </div>
                <div className="field item form-group col-md-3 col-sm-6">
                  <label className="col-form-label col-md-4 col-sm-4 label-align">Date To<span className="required">*</span></label>
                  <div className="col-md-7 col-sm-6">
                    <input type="date" className="form-control"
                      value={data.dateTo}
                      onChange={(e) => { setdata({ ...data, dateTo: e.target.value }) }}
                    />
                  </div>
                </div>
                <div className="field form-group col-md-3 col-sm-6">
                  <label className="col-form-label col-md-4 col-sm-4 label-align">Status<span className="required">*</span></label>
                  <div className="col-md-7 col-sm-6">
                    <Select
                      options={[{ label: "All", value: "All" }, { label: "Created", value: "Created" }, { label: "Process", value: "Process" }, { label: "Pending", value: "Pending" }, { label: "Cancel", value: "Cancel" }]}

                      onChange={(e) => { setdata({ ...data, Status: e.value }) }}
                    />
                    {!isValidateAllStates && (data.Status == "") && <span className="text-danger">First Select this </span>}
                  </div>

                </div>
                <div className="field form-group col-md-3 col-sm-6">
                  <div className="col-md-12 text-left ">
                    <button className="btn bg-customBlue text-light" type="submit" onClick={Report}>Run Report</button>
                  </div>
                </div>
                <div className="field form-group col-md-3 col-sm-6 col-md-offset-0 ml-auto text-right">
                  <ReactToPrint
                    trigger={() => {
                      return (

                        <button className="btn bg-customBlue text-light" type="submit" >Print / Export</button>

                      );
                    }}
                    content={() => componentRef.current}
                    documentTitle="new docs"
                    pageStyle="print"
                  />

                </div>

              </div>

              <div className="row right_col-margin-remove" style={{ margin: "0px !important" }}  >
                <div className="field item form-group col-md-12 col-sm-12" ref={componentRef} style={{ overflow: 'scroll', height: '400px' }}   >

                {/* {showTable?  */}
                 <table className="table table-striped"   >
                    <thead className="bg-customBlue text-light">
                      <tr >
                        <th scope="col">SR.</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Job Start date</th>
                        <th scope="col">Job End Date</th>
                        <th scope="col">Production Quantity</th>
                        <th scope="col">Assigned Person</th>
                        <th scope="col">Description</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>



                      </tr>
                    </thead>

                    <tbody>
                      {ApiRes?.map((item, id) => (<tr key={id}>

                        <td>{id + 1}</td>
                        <td>{item.product_info[0]?.product_name}</td>
                        <td>{item.job_starting_date}</td>
                        <td>{item.job_ending_date}</td>
                        <td>{item.product_quantity}</td>
                        <td>{item.job_incharge}</td>
                        <td>{item.job_description}</td>
                        <td>{item.job_status}</td>

                        <td>
                          {/* Delete button */}

                          <i className="fa fa-trash-o btn " style={{ color: 'red' }}>
                          </i>
                          <i className="fa fa-edit" style={{ color: 'blue' }} variant="primary"
                            onClick={() => Editform(item.job_id)}

                          ></i>
                        </td>

                      </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* :<>jnj</>} */}

                </div>
              </div>
            </div>
          </div>
        </div></>)}
    </>
  )
}

export default JobRecord
