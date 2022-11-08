import React, { useState, useRef } from 'react'
import { useSelector } from "react-redux";
import Select from 'react-select'
import ReactToPrint from "react-to-print";
import { useNavigate } from "react-router-dom";
import CustomInnerHeader from '../../Components/CustomInnerHeader';
import { CSVLink } from "react-csv";
const JobRecord = () => {
  const [showTable, setshowTable] = useState(false)


  const navigate = useNavigate();
  var day = new Date().toLocaleDateString(undefined, { day: "2-digit" });
  var month = new Date().toLocaleDateString(undefined, { month: "2-digit" });
  var year = new Date().toLocaleDateString(undefined, { year: "numeric" });
  const dateToday = `${year}-${month}-${day}`
  const componentRef = useRef();
  const [data, setdata] = useState({ dateTo: dateToday, dateFrom: dateToday, Status: 'all' })
  let statusSearch = [{ label: "All", value: "all" }, { label: "Created", value: "created" }, { label: "Process", value: "process" }, { label: "Pending", value: "pending" }, { label: "Cancel", value: "cancel" }];
  let status = [{ label: "Created", value: "created" }, { label: "Process", value: "process" }, { label: "Pending", value: "pending" }, { label: "Cancel", value: "cancel" }];
  
  const [isValidateAllStates, setIsValidateAllStates] = useState(true)
  const [ApiRes, setApiRes] = useState()
  const showNavMenu = useSelector((state) => state.NavState);
  const [LadgerDataCSV, setLadgerDataCSV] = useState([{}]);

  const changeStatus = (id, value) => {
  
    var axios = require('axios');

    var config = {
      method: 'put',
      url: `http://rightway-api.genial365.com/api/Jobs/PutJobStatus?job_id=${id}&job_status=${value}`,
      headers: {
        'Authorization': `bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
        'content-Type': 'application/json'
      },
    };

    axios(config)
      .then(function (response) {
   
        Report()
      })
      .catch(function (error) {
    
      });

  }
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
      setshowTable(true)
      // setshowTable(true)

      var config = {

        method: 'get',
        url: `http://rightway-api.genial365.com/api/Jobs/GetJobRecord?dateFrom=${data.dateFrom}&dateTo=${data.dateTo}&job_status=${data.Status}`,
        headers: {
          'Authorization': `bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`
        }
      };

      axios(config)
        .then(function (response) {

          setApiRes(response.data);
          setLadgerDataCSV(
            response.data.map((item, id) => {
              return {
                SR: id + 1,
                ProductName: item.product_info[0]?.product_name,
                JobStartdate: item.job_starting_date,
                JobEndDate: item.job_ending_date,
                Status: item.job_status

              };
            })
          );
        })
        .catch(function (error) {

        });
    }

  }

  const headers = [
    { label: " SR", key: "SR" },
    { label: "Product Name", key: "ProductName" },
    { label: "Job Start date", key: "JobStartdate" },
    { label: "Job End Date", key: "JobEndDate" },
    { label: "Status", key: "Status" },

  ];
  const csvReport = {
    filename: "LedgerReport.csv",
    headers: headers,
    data: LadgerDataCSV,
  };

  return (

    <>

      <div className={`container-fluid page-title-bar ${showNavMenu == false ? "right_col-margin-remove" : ""}   `} >
        <CustomInnerHeader moduleName={"Job Record"} isShowSelector={true} />
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
                    value={statusSearch.find(e => e.value == data.Status) || ''}
                    options={statusSearch}

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
            
            </div>

            {showTable &&<><div className="row">
              <div className="field form-group col-md-3 col-sm-6 col-md-offset-0 ml-auto text-right">
                <ul className="nav navbar-right panel_toolbox d-flex justify-content-end">

                  <li>
                    <ReactToPrint
                      trigger={() => {
                        return (

                          <button
                            className="btn btn-sm btn-primary my-2 pt-1 borderRadiusRound" title="Print Doc"
                          >
                            <i className="fa fa-print"></i>
                          </button>

                        );
                      }}
                      content={() => componentRef.current}
                      documentTitle="new docs"
                      pageStyle="print"
                    />
                  </li>


                  <li><CSVLink {...csvReport}>
                    <button className="btn btn-sm btn-success borderRadiusRound my-1 pt-1">
                      <i
                        className="fa fa-file-pdf-o"
                        aria-hidden="true"
                      ></i>
                    </button>
                  </CSVLink>

                  </li>

                </ul>

              </div>
</div>
              <div style={{ overflow: 'scroll', height: '400px' }} ref={componentRef}>    <div className="row row-1 mx-1  reportTableHead mt-2" >

                <div className="col-md-1 col-1 font-size-12  text-center  my-1 ">
                  SR.
                </div>
                <div className="col-md-1  col-1 font-size-12  text-center  my-1 ">
                  Product Name
                </div>
                <div className="col-md-2 col-2 font-size-12  text-center  my-1 ">
                  Job Start date
                </div>
                <div className="col-md-2 col-2 font-size-12  text-center  my-1 ">

                  Job End Date
                </div>
                <div className="col-md-1 col-1 font-size-12  text-center  my-1 ">

                  Production Quantity
                </div>
                <div className="col-md-1 col-1 font-size-12  text-center  my-1 ">
                  Assigned Person
                </div>
                <div className="col-md-1 col-1 font-size-12  text-center  my-1 ">
                  Description
                </div>
                <div className="col-md-2 col-2 font-size-12  text-center  my-1 ">
                  Status
                </div>
                <div className="col-md-1 col-1 font-size-12  text-center  my-1 ">
                  Action
                </div>
              </div>
                {
                  ApiRes?.length === 0 && <div className="row mx-1 row-1  reportTableBody bottom-border-2" style={{ cursor: "pointer" }}>
                    <div className="col-md-12  col-12  font-size-12 bold-6   py-1 pt-1   text-center ">
                      <span className='text-center'> No Data Available</span>
                    </div>
                  </div>
                }{
                  ApiRes?.map((item, id) => {
                    return <React.Fragment key={id}>
                      <div className="row mx-1 row-1  reportTableBody bottom-border-2">

                        <div className="col-md-1 text-right  col-1  font-size-12 bold-6   py-1 pt-1 right-border-2 left-border-2    ">
                          {id + 1}
                        </div>
                        <div className="col-md-1 text-left col-1  font-size-12    py-1  right-border-2 pt-1    ">
                          {item.product_info[0]?.product_name}
                        </div>
                        <div className="col-md-2  text-right col-2  font-size-12    py-1  right-border-2 pt-1    ">
                          {item.job_starting_date}</div>
                        <div className="col-md-2  col-2 text-right font-size-12    py-1  right-border-2 pt-1    ">
                          {item.job_ending_date}</div>
                        <div className="col-md-1  col-1 text-right font-size-12    py-1  right-border-2 pt-1    ">
                          {item.product_quantity.toFixed(2)}</div>
                        <div className="col-md-1 col-1 text-right  font-size-12    py-1  right-border-2 pt-1    ">
                          {item.job_incharge}</div>
                        <div className="col-md-1 col-1 text-left  font-size-12    py-1  right-border-2 pt-1    ">
                          {item.job_description}</div>
                        <div className="col-md-2 col-2 text-right  font-size-12    py-1  right-border-2 pt-1    ">
                          <Select
                            value={status.find(e => e.value == item.job_status) || ''}
                            options={status}

                            onChange={(e) => { changeStatus(item.job_id, e.value) }}
                          /></div>


                        <div className="col-md-1 col-1 text-right  font-size-12    py-1  right-border-2 pt-1    ">
                          <i className="fa fa-trash-o btn " style={{ color: 'red' }}>
                          </i>
                          <i className="fa fa-edit" style={{ color: 'blue' }} variant="primary"
                            onClick={() => Editform(item.job_id)}

                          ></i></div>
                      </div>
                    </React.Fragment>
                  })
                }</div></>}

          </div>
        </div>
      </div></>)
}


export default JobRecord

