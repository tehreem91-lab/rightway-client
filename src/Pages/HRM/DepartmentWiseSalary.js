import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import Select from "react-select";
import ReactToPrint from 'react-to-print';
import  {CSVLink}  from "react-csv";
 import jsPDF from "jspdf";
import CustomInnerHeader from '../../Components/CustomInnerHeader';
import html2canvas from "html2canvas";

const DepartmentWiseSalary = () => {

    let componentRef = useRef();

    var month = new Date().toLocaleDateString(undefined, { month: "2-digit" });
    var year = new Date().toLocaleDateString(undefined, { year: "numeric" });
    const dateToday = `${year}-${month}`;
  
  
  
    const showNavMenu = useSelector((state) => state.NavState);
  
    const [validationState, setValidationState] = useState(true);
    const [dateFrom, setdateFrom] = useState(dateToday);
    const [departmentvalue, setDepartmentvalue] = useState("");
    const [isloadding, setIsloading] = useState(true);
    const [departmentoption, setDepartmentoption] = useState([]);
    const [isloader, setIsloader] = useState(false)
    const [department_salary , setDepartment_salary] = useState([])
    const [department_salaryCSV , setDepartment_salaryCSV] = useState([])

    const downloadPdf = async () => {
      var data = document.getElementById("table");
      //$("pdfOpenHide").attr("hidden", true);
      // To disable the scroll
      document.getElementById("table").style.overflow = "inherit";
      document.getElementById("table").style.maxHeight = "inherit";
  
      await html2canvas(data).then((canvas) => {
        const contentDataURL = canvas.toDataURL("image/png", 1.0);
        // enabling the scroll
        //document.getElementById("report").style.overflow = "scroll";
        //document.getElementById("report").style.maxHeight = "150px";
  
        let pdf = new jsPDF("l", "mm", "a4"); // A4 size page of PDF
  
        let imgWidth = 300;
        let pageHeight = pdf.internal.pageSize.height;
        let imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
  
        pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
  
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        window.open(
          pdf.output("bloburl", { filename: "new-file.pdf" }),
          "_blank"
        );
      });
    };

    const Selector_Option = () => {
  
        var axios = require('axios');
  
        var config = {
            method: 'get',
            url: 'http://rightway-api.genial365.com/api/ChartOfAccounts/GetSalaryDepartments',
            headers: {
              'Authorization': 'bearer 7w0PZQkvLOKOdcgw-rPUhjmXi4hklOSKslVKVzQMiDBmtPEcCFHWCYQYji-i37Y3sRMcv3jmAcZiLrer5giGe07bj0C6KOKfaetCES_IdJH_EytRl-YphGc-qAuWm53D-a4-J4biNQbB5e1Aj_yoZWQBl_o7SyFtP02I13-SfXZbESpG-2m6AXJHtzk35Ow0wRl_9_13SiWH0Pe97_rmadYEVNcvHjD27v3fkWpkDcD_pTKN_RHxKsSQrxHPm1XI-_yoSwsbfYD0RNOEKLS3RjfzlWts7EbPkmQZCbBm9IgPjoCwTcPRaMzB-cnD-FKGFuHLZkiT2tmjHIYoI8ZRwVkLWNZGdKPlvjQ3uu9KPcywOKFc6AO8_iPpfBMbf0FSBHbPty_lEjKA0NOLPQ_bZD2q1192qc8cUAUXXdpkugHBIuB5gPeZ2HFl-i82Og3-Autmp5cFWkiZSktF9S1xfVKd2fgL_ySFrOIRlNqcLvFGntpa6SLsDvD4cq9hX43bz7ojMIEAoM6qeVjF_PZJnw'
            },
        };
  
        axios(config)
            .then(function (response) {
                setDepartmentoption(
                    response.data.map((item) => {
                        return {
  
                            value: item.salary_value,
                            label: item.salary_label
  
                        }
  
                    })
  
  
                )
  
            })
           
  }
  
  
  
    useEffect(() => {
        Selector_Option();
    }, []);
  
    const headers = [
        { label: "Employee Name", key: "employee_name" },
        { label: "Employee Code", key: "employee_code" },
        { label: "Salary Type", key: "salary_type" },
        { label: "Designation", key: "designationName" },
        { label: "Over Time", key: "over_time" },
        { label: "Working hour", key: "total_working_hour" },
        { label: "Total Deduction", key: "total_deduction" },
        { label: "Loan Deduction", key: "loan_deduction" },
        { label: "Pm Salary", key: "pm_salary" },
        { label: "Net Salary", key: "net_salary" },
      ];
    
    const csvReport = {
        filename: "DepartmentSalaryReport.csv",
        headers: headers,
        data: department_salaryCSV
      };
  
  
  
    const Fetch_salary_department = ()=>
    {
      var axios = require('axios');
      var data = '';
      if (departmentvalue === "" || dateFrom === "") {
          setValidationState(false);
      }else{
          var config = {
              method: 'get',
              url: `http://rightway-api.genial365.com/api/Attendence/GetDepartmentWiseSalaryReport?first_date_month=${dateFrom}&sal_dept_id=${departmentvalue.value}`,
              headers: { 
                'Authorization': 'bearer 7w0PZQkvLOKOdcgw-rPUhjmXi4hklOSKslVKVzQMiDBmtPEcCFHWCYQYji-i37Y3sRMcv3jmAcZiLrer5giGe07bj0C6KOKfaetCES_IdJH_EytRl-YphGc-qAuWm53D-a4-J4biNQbB5e1Aj_yoZWQBl_o7SyFtP02I13-SfXZbESpG-2m6AXJHtzk35Ow0wRl_9_13SiWH0Pe97_rmadYEVNcvHjD27v3fkWpkDcD_pTKN_RHxKsSQrxHPm1XI-_yoSwsbfYD0RNOEKLS3RjfzlWts7EbPkmQZCbBm9IgPjoCwTcPRaMzB-cnD-FKGFuHLZkiT2tmjHIYoI8ZRwVkLWNZGdKPlvjQ3uu9KPcywOKFc6AO8_iPpfBMbf0FSBHbPty_lEjKA0NOLPQ_bZD2q1192qc8cUAUXXdpkugHBIuB5gPeZ2HFl-i82Og3-Autmp5cFWkiZSktF9S1xfVKd2fgL_ySFrOIRlNqcLvFGntpa6SLsDvD4cq9hX43bz7ojMIEAoM6qeVjF_PZJnw'
              },
              data : data
            };
  
      }
       axios(config)
    .then(function (response) {
      
    setDepartment_salary(response.data)
    setDepartment_salaryCSV(response.data.map((val) =>{
      
      return{
          
        employee_name : val.employee_name,
        employee_code: val.employee_code,
        salary_type: val.salary_type,
        designationName: val.designationName,
        over_time: val.over_time,
        total_working_hour:val.total_working_hour,
        total_deduction: val.total_deduction,
        pm_salary: val.pm_salary,
        loan_deduction:val.loan_deduction,
        net_salary: val.net_salary
  
  
      }
  
    }))
    setIsloading(false)
    
  })
  .catch(function (error) {
    setIsloading(true)
    setDepartment_salary({})
  });
  
    }
  
    // const PDF = ((e) => {
  
    //   var pdfsize = ''
    //   var pdf = new jsPDF('1','pt', pdfsize)
  
    //   pdf.autoTable({
    //       html:'#table',
    //       stylesY : '60',
    //       styles:{
    //           fontsize :40,
    //           cellwidth :'wrap'
    //       },
    //   })
    //   pdf.save("output.pdf")
  
    // })

    return (
        <>
      

        
             
            
              
               <div
                 className={`container-fluid page-title-bar ${showNavMenu === false ? "right_col-margin-remove" : ""
                     }   `}
             >
             <CustomInnerHeader moduleName='Department Salary Management' isShowSelector={true} />
                 
             </div>
   
             <div
                 role="main"
                 className={`right_col  h-100  ${showNavMenu === false ? "right_col-margin-remove" : " "
                     } `}
             >
                 <div className="row">
                     <div className="col-md-12">
                         <div className="x_panel  px-0 ">
                             <div className="x_content my-3">
                                 <span className="section  px-2 ">
                                     <i className="fa fa-filter pl-2"></i>&nbsp;Report Filter
                                 </span>
                                 <div className="row">
                                     <div className="field item form-group col-md-6 col-sm-6">
                                         <label className="col-form-label col-md-3 col-sm-36 label-align">
                                             {" "}
                                             From Date <span className="required">*</span>
                                         </label>
                                         <div className="col-md-8 col-sm-8">
                                             <input
                                                 className="form-control"
                                                 type="month"
                                                 value={dateFrom}
                                                 onChange={(e) => {
                                                     setdateFrom(e.target.value);
                                                 }}
                                             />
   
                                             {validationState === false && dateFrom === "" && (
                                                 <span className="text-danger">First Select this </span>
                                             )}
   
                                             {/* // its show fiscal year initial value */}
                                         </div>
                                     </div>
                                     <div className="field item form-group col-md-6 col-sm-6">
                                     <label className="col-form-label col-md-3 col-sm-3 label-align">
                                         {" "}
                                         Select Department <span className="required">*</span>
                                     </label>
                                     <div className="col-md-8 col-sm-8">
                                         <Select
                                             isSearchable={true}
                                             options={departmentoption}
                                             value={departmentvalue}
                                             styles={{ minHeight: "29px", height: "29px",}}
                                             onChange={(e) => {
                                                 setDepartmentvalue(e);
                                             }}
                                         />
                                         {validationState === false && departmentvalue === "" && (
                                             <span className="text-danger">First Select this </span>
                                         )}
                                     </div>
                                 </div>
                                 </div>
                                 
                             </div>
   
                             <div className="col-md-12 text-right x_footer">
                                 <button
                                     className="btn btn-primary"
                                     type="submit"
                                     onClick={() => {
                                       Fetch_salary_department();
                                     }}
                                 >
                                     Show Report
                                 </button>
   
                             </div>
                         </div>
   
                         {!isloadding && (
                             <>
   
                                 <div className="x_panel px-0">
                                     <div className="x_content ">
                                         <span className="section mb-0 pb-1">
                                             <div className="row pl-2 ">
                                                 <div className="col-5 ">
                                                     <i className="fa fa-list"></i>&nbsp;Report Data
                                                 </div>
                                                 <div className="col-7 text-right px-0">
                                                 <div className="col-md-5"></div>
                                                 <div className="col-md-4 text-left"></div>
                                                 <div className="col-md-3 pr-4">
                                                 <ul className="mr-3 nav navbar-right panel_toolbox d-flex justify-content-end">
                                                 
                                                     <div className="col-md-4">
                                                     <ReactToPrint
                                                     trigger={() =>  
                                                     <button className="btn btn-sm btn-primary borderRadiusRound">
                                                     <i className="fa fa-print"></i>
                                                     </button>}
                                                     content={() => componentRef.current}
                                                   />
                                                    
                                                    </div>
                                                    <div className="col-md-4">
                                                    <button
                                                       className="btn btn-sm btn-warning borderRadiusRound"
                                                       onClick={downloadPdf}
                                                       type="button"
                                                       >
                                                       <i
                                                             className="fa fa-file-pdf-o"
                                                             aria-hidden="true"
                                                              ></i>
                                                        </button>
                                                    </div>
                                                             <div className="col-md-4">
                                                             <CSVLink {...csvReport}>
                                                             <button className="btn btn-sm btn-success borderRadiusRound ms-4" >
                                                                 <i
                                                                     className="fa fa-file-pdf-o "
                                                                     aria-hidden="true"
                                                                  ></i>
                                                             </button>
                                                             </CSVLink>
                                                         </div>
                                                            
                                                 </ul>
                                                 
                                                 
                                                 </div>
                                                 </div>
                                                  </div>
                                         </span>
                                     </div>
                                    <div className="table_section p-5 table-responsive border-1 x_content mb-3" id ='table'  ref={componentRef}  >
                                    <div className="displayPropertyForPrint">
                                 <h2 className="text-dark text-center font-weight-bold  ">
                                    Department Salary Report
                                  </h2>
                                <div className="row pb-2">
                          <div className="col-md-6 col-6 text-dark text-center ">
                   {" "}
                   Date From:{" "}
                   <strong className="text-dark  font-weight-bold ">
                     {" "}
                     {dateFrom}
                   </strong>{" "}
                 </div>
                 <div className="col-md-6 col-6 text-dark  text-center">
                   {" "}
                   Department :{" "}
                   <strong className="text-dark  font-weight-bold ">
                     {" "}
                     {departmentvalue.label}
                   </strong>{" "}
                 </div>
               </div>
             </div>
               
             <div className="row mx-3  reportTableHead bottom-border-1 ">
             <div className='col-md-6 col-6 font-size-12      text-center  my-1 px-0'>
             <div className="col-md-3   col-3   font-size-12   right-border-1  text-center  p-1  px-0">
             Employee_name
             </div>
             <div className="col-md-3 col-3   font-size-12   right-border-1  text-center p-1 px-0 ">
             Employee_code
             </div>
            
          <div className="col-md-2 col-2   font-size-12   right-border-1  text-center p-1 px-0 ">
          Salary_type
        </div>
          <div className="col-md-2   col-2   font-size-12   right-border-1  text-center p-1  px-0">
          Designation
          </div>
          <div className="col-md-2   col-2   font-size-12   right-border-1  text-center p-1  px-0">
          Over_time
          </div>
          </div>
          <div className='col-md-6 col-6 font-size-12      text-center  my-1 px-0'>
          <div className="col-md-2 col-2   font-size-12   right-border-1  text-center  p-1 px-0 ">
          Working_hour
          </div>
          <div className="col-md-3 col-3   font-size-12   right-border-1  text-center  px-0 p-1 ">
          Total_deduction
        </div>
        <div className="col-md-2  col-2   font-size-12   right-border-1  text-center   px-0 p-1">
       Pm_salary
       </div>
       <div className="col-md-3 col-3   font-size-12   right-border-1  text-center  px-0 p-1 ">
       loan_deduction
       </div>
       <div className="col-md-2   col-2   font-size-12     text-center   px-0 p-1">
       Net_salary
       </div>
       </div>
       </div>
   {/*table body*/}
   {
     <>
     {department_salary.length === 0 ? (
   
     
       <div className="row mx-3  reportTableBody bottom-border-2">
                       <div className=" col-md-12   col-12   px-0 right-border-1 h-100 text-center font-size-12 right-border-2 py-1 h-100 left-border-2 d-flex justify-content-center align-items-center">
                         No Data Available
                       </div>
                     </div>
       
   ):(
     <>
     { department_salary.map((item)=>{
     return(
         <>
         <div className="row mx-3  reportTableBody bottom-border-2 ">
         <div className='col-md-6 col-6 font-size-12      left-border-2 p-0 m-0   text-center px-0'>
         <div className="col-md-3   col-3  right-border-2   py-1 px-0">
         {item.employee_name}
         </div>
         <div className="col-md-3 col-3    font-size-12 right-border-2    py-1 px-0 ">
         {item.employee_code}
         </div>
      <div className="col-md-2 col-2   font-size-12  right-border-2   py-1 px-0 ">
      {item.salary_type}
     </div>
      <div className="col-md-2   col-2   font-size-12  right-border-2   py-1 px-0">
      {item.designationName}
      </div>
      <div className="col-md-2   col-2   font-size-12  right-border-2  py-1 px-0">
      {item.over_time}
      </div>
      </div>
      <div className='col-md-6 col-6 font-size-12     p-0 m-0 right-border-2  text-center px-0'>
      <div className="col-md-2 col-2   font-size-12  right-border-2    p-1 px-0 ">
      {item.total_working_hour}
      </div>
      <div className="col-md-3 col-3   font-size-12  right-border-2    px-0 p-1 ">
      {item.total_deduction}
     </div>
     <div className="col-md-2  col-2   font-size-12  right-border-2   px-0 p-1">
     {item.pm_salary}
     </div>
     <div className="col-md-3 col-3   font-size-12  right-border-2    px-0 p-1 ">
     {item.loan_deduction}
     </div>
     <div className="col-md-2   col-2   font-size-12     px-0 p-1">
     {item.net_salary}
     </div>
     </div>
     </div>
    </>
       )
     
     
     })}
     </>
     
     )}
     
     </>
   }
   </div>
   </div>
   </>
   )}
    </div>
   </div>
   </div>
       
               
            
            
        </>
    );
}

export default DepartmentWiseSalary;
