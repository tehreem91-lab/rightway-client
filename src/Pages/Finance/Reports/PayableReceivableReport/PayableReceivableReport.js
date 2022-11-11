import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux';
import ReactToPrint from 'react-to-print';
import { endPoint } from '../../../../config/Config.js';
import PayableReceivableReciept from './PayableReceivableReciept.js'
import CustomInnerHeader from '../../../../Components/CustomInnerHeader'
import Loader from '../../../../Layout/Loader/Loader'
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { CSVLink } from "react-csv";


const PayableReceivableReport = () => {
    const [isLoading, setIsLoading] = useState(true)

    const showNavMenu = useSelector((state) => state.NavState);

    const componentRef = useRef();
    const [getPayable, setGetPayable] = useState([])
    const [getReceivable, setGetReceivable] = useState([])
    const [toggle, setToggle] = useState(true)
   
    
      ////////////////////////////For Downloading PDF Files////////////////////////////
      const downloadPdf = async () => {
        var data = document.getElementById("report");
        //$("pdfOpenHide").attr("hidden", true);
        // To disable the scroll
        document.getElementById("report").style.overflow = "inherit";
        document.getElementById("report").style.maxHeight = "inherit";
    
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

    const fetchData = () => {
        var axios = require('axios');

        var config = {
            method: 'get',
            url: `${endPoint}api/RecPayReport/GetReport`,
            headers: {
                'Authorization': `bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
            }
        };

        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setGetPayable(response.data.payable_amount)
                    setGetReceivable(response.data.receiveable_amount)
                    setIsLoading(false)

                }
                setGetPayable(
                    response.data.payable_amount.map((item) => {
                      return {
                        account_name: item.account_name,
                        account_code: item.account_code,
                        balance: item.balance,
                       
                      };
                    })
                  );
                  setGetReceivable(
                    response.data.payable_amount.map((item) => {
                      return {
                        account_name: item.account_name,
                        account_code: item.account_code,
                        balance: item.balance,
                       
                      };
                    })
                  );
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    const headers = [
        { label: "Account Title", key: "account_name" },
        { label: "Account Code", key: "account_code" },
        { label: "Amount", key: "balance" },
   
      ];
    
      const csvReport = {
        filename: "payable.csv",
        headers: headers,
        data: getPayable,
      };
      const csVReport = {
        filename: "Receivable.csv",
        headers: headers,
        data: getReceivable,
      };
   
    
    useEffect(() => {
        fetchData()

    }, [])



    return (
        <>



            {isLoading ? (
             <Loader/>
            ) : (
                <>
                    <div
                        className={`container-fluid right_col  page-title-bar ${showNavMenu == false ? "right_col-margin-remove" : ""
                            }   `}
                    >
                    <CustomInnerHeader moduleName="Payable Receivable Report" isShowSelector={true} />
                    </div>
                    <div
                        className={`right_col  h-10 heightFixForFAult  ${showNavMenu == false ? "right_col-margin-remove" : " "
                            } `}
                        role="main"
                    >

                        <div className="row">
                            <div className="col-md-12">
                                <div className="x_panel px-0">
                                    <div className="x_content ">
                                        <span className="section mb-0 pb-1">
                                            <div className="row pl-2 ">
                                                <div className="col-5 ">
                                                    <i className='fa fa-list'></i>&nbsp;Report Data
                                                </div>
                                                <div className="col-7 text-right px-0 ">
                                                    <div className="col-md-5"> </div>
                                                    <div className="col-md-4  text-left "> </div>
                                                    <div className="col-md-3 pr-4">
                                                    <ul className="mr-3 nav navbar-right panel_toolbox d-flex justify-content-end">
                                                    <div className="form-group col-4">
                                                    <ReactToPrint
                                                    trigger={() =>  
                                                    <button className="btn btn-sm text-white borderRadiusRound"  style={{ backgroundColor: "#003A4D" }}>
                                                    <i className="fa fa-print"></i>
                                                    </button>}
                                                    content={() => componentRef.current}
                                                    documentTitle='new docs'
                                                  />
                                                    </div>
                                                    <div className="form-group col-4">
                                                      <button className="btn btn-sm text-white  borderRadiusRound"
                                                      onClick={downloadPdf}
                                                      type="button"
                                                      style={{ backgroundColor: "#003A4D" }}>
                                                        <i
                                                          className="fa fa-file-pdf-o"
                                                          aria-hidden="true"
                                                        ></i>
                                                      </button>
                                                  </div>
                                                  
                                                    <div className="form-group col-4">
                                                    {toggle?(
                                                        <>
                                                        <CSVLink {...csVReport}>
                                                        <button className="btn btn-sm text-white borderRadiusRound"  style={{ backgroundColor: "#003A4D" }}>
                                                          <i
                                                            className="fa fa-file-excel-o"
                                                            aria-hidden="true"
                                                          ></i>
                                                        </button>
                                                      </CSVLink>
                                                        </>
                                                    ):(
                                                        <>
                                                        <CSVLink {...csvReport}>
                                                        <button className="btn btn-sm text-white borderRadiusRound"  style={{ backgroundColor: "#003A4D" }}>
                                                          <i
                                                            className="fa fa-file-excel-o"
                                                            aria-hidden="true"
                                                          ></i>
                                                        </button>
                                                      </CSVLink>
                                                        </>
                                                    )}
                                                     
                                                    </div>
                                                  </ul>
                                                    </div>
                                                </div>

                                            </div>
                                        </span>


                                    </div>
                                    <div className="clearfix" />
                                    <PayableReceivableReciept ref={componentRef} getPayable={getPayable} getReceivable={getReceivable}
                                    toogle={setToggle} />

                                </div>




                            </div>
                            <div className="col-md-8 px-0">

                            </div>
                        </div>
                    </div>
                </>
            )}

        </>
    )
}

export default PayableReceivableReport