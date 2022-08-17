import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import ReactToPrint from "react-to-print";
import { customStyles } from "../../../../Components/reactCustomSelectStyle";
import axios from 'axios'
import { endPoint } from "../../../../config/Config.js";
import { preventLowerDate } from "../../../../config/preventMinus.js";
import CustomInnerHeader from '../../../../Components/CustomInnerHeader'
import TrialSheetReciept from "./TrialSheetReciept.js";
const TrialSheet = () => {

    const componentRef = useRef();
    const showNavMenu = useSelector((state) => state.NavState);
    var day = new Date().toLocaleDateString(undefined, { day: "2-digit" });
    var month = new Date().toLocaleDateString(undefined, { month: "2-digit" });
    var year = new Date().toLocaleDateString(undefined, { year: "numeric" });
    const dateToday = `${year}-${month}-${day}`;
    const [dateFrom, setdateFrom] = useState(dateToday);
    const [dateTo, setdateTo] = useState(dateToday);
    const [isLoading, setIsLoading] = useState(true)
    const [validationState, setValidationState] = useState(true)
    const [reportData, setReportData] = useState([])

    const fetchTrialBalanceReport = () => {
        var config = {
            method: 'get',
            url: `${endPoint}api/trialBalace/GetData?dateFrom=${dateFrom}T00:00:00&dateTo=${dateTo}T00:00:00`,
            headers: {
                'Authorization': `bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
            }
        };

        axios(config)
            .then(function (response) {
                console.log(response.data);
                if (response.status === 200) {
                    setIsLoading(true)
                    const categories_all_data = response.data.categories_all;
                    const categories_all_data_copy = [];
                    let refactored_data = []

                    // const filtralized_data = categories_all_data.filter((each_item1) => {
                    //     return each_item1.parent_id === 0;


                    // })
                    // filtralized_data.map((e, index) => {
                    //     // console.log(e);
                    //     // console.log(e.category_id);
                    //     const catagory1 = categories_all_data.filter((each_item1) => {
                    //         return each_item1.parent_id == e.category_id;


                    //     })
                    //     catagory1.map((e, i) => {
                    //         //     // console.log(e);
                    //         //     // console.log(e.category_id);
                    //         const catagory2 = categories_all_data.filter((each_item1) => {
                    //             return each_item1.parent_id == e.category_id;

                    //         })
                    //     })
                    //     //     categories_all_data_copy[i]["list_of_catagories"]=catagory2;


                    //     // // console.log("Catagories  2------");

                    //     // // console.log(catagory2, "------");

                    //     // })
                    //     e["list_of_catagories"] = catagory1;
                    //     categories_all_data_copy.push(e);


                    //     // console.log("Catagories------");

                    //     // console.log(catagory1, "------");

                    // })
                    // categories_all_data_copy[index]["list_of_catagories"]=catagory1;

                    // const filtralized_data = categories_all_data.map((each_item1) => {
                    let filtralized_data = [];
                    for (let index = 0; index < categories_all_data.length; index++) {



                        let top_level_1 = ""
                        if (categories_all_data[index].level === 1 && categories_all_data[index].parent_id === 0) {

                            // child_2 = categories_all_data.filter((each_item2) => {
                            //     let top_level_2 = ""
                            //     let child_3;
                            //     if (each_item2.level === 2 && each_item2.parent_id === each_item1.category_id) {
                            //         top_level_2 = each_item2;
                            //         child_3 = categories_all_data.filter((each_item3) => {
                            //             let top_level_3 = ""
                            //             let child_4
                            //             if (each_item3.level === 3 && each_item3.parent_id === each_item2.category_id) {
                            //                 top_level_3 = each_item3;
                            //                 child_4 = categories_all_data.filter((each_item4) => {

                            //                     let top_level_4 = ""
                            //                     if (each_item4.level === 4 && each_item4.parent_id === each_item3.category_id) {
                            //                         top_level_4 = each_item4;
                            //                         return { category_nested: top_level_4 }
                            //                     }
                            //                 })
                            //                 return { category_nested: child_4, ...top_level_3, }
                            //             }
                            //         })

                            //         return { category_nested: child_3, ...top_level_2 }
                            //     }

                            // })

                            let filtralized_data_2 = [];
                            for (let index2 = 0; index2 < categories_all_data.length; index2++) {
                                if (categories_all_data[index2].level === 2 && categories_all_data[index2].parent_id === categories_all_data[index].category_id) {

                                    let filtralized_data_3 = [];
                                    let top_level_2;
                                    for (let index3 = 0; index3 < categories_all_data.length; index3++) {
                                        let filtralized_data_4 = [];
                                        if (categories_all_data[index3].level === 3 && categories_all_data[index3].parent_id === categories_all_data[index2].category_id) {

                                            let filtralized_data_5 = [];
                                            let top_level_3;
                                            for (let index4 = 0; index4 < categories_all_data.length; index4++) {
                                                if (categories_all_data[index4].level === 4 && categories_all_data[index4].parent_id === categories_all_data[index3].category_id) {
                                                    top_level_3 = { ...categories_all_data[index4] }
                                                    filtralized_data_5.push(top_level_3)
                                                }
                                            }
                                            top_level_1 = filtralized_data_5  //this was returning a array wich make array in array so i useed its first index bcz that only have value
                                            filtralized_data_4.push(top_level_1)
                                            top_level_2 = { category_nestedll: filtralized_data_4[0], ...categories_all_data[index3] }
                                            filtralized_data_3.push(top_level_2)
                                            // --------
                                        }
                                    }


                                    top_level_1 = { category_nested: filtralized_data_3, ...categories_all_data[index2] }
                                    filtralized_data_2.push(top_level_1)
                                }
                            }
                            top_level_1 = { category_nested: filtralized_data_2, ...categories_all_data[index] }
                            filtralized_data.push(top_level_1)

                        }
                    }
                    console.log(filtralized_data, "------nested child")
                }
            })
            .catch(function (error) {
                console.log(error);
            });



    }


    return (
        <>
            <div
                className={`container-fluid page-title-bar ${showNavMenu == false ? "right_col-margin-remove" : ""
                    }   `}
            >
                <CustomInnerHeader moduleName="Trial Balance" isShowSelector={true} />

            </div>
            <div
                className={`right_col  h-10 heightFixForFAult  ${showNavMenu == false ? "right_col-margin-remove" : " "
                    } `}
                role="main"
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
                                        <label className="col-form-label col-md-3 col-sm-36 label-align"> From Date <span className="required">*</span></label>
                                        <div className="col-md-8 col-sm-8">
                                            <input
                                                className="form-control"
                                                type="date"
                                                value={dateFrom}
                                                min="2022-07-27"
                                                onKeyPress={async (e) => await preventLowerDate(e)} //not working yet
                                                onChange={(e) => {
                                                    setdateFrom(e.target.value);
                                                }}
                                            />

                                            {validationState === false && dateFrom === "" && <span className="text-danger">First Select this </span>}

                                            {/* // its show fiscal year initial value */}
                                        </div>
                                    </div>
                                    <div className="field item form-group col-md-6 col-sm-6">
                                        <label className="col-form-label col-md-3 col-sm-3 label-align"> To Date <span className="required">*</span></label>
                                        <div className="col-md-8 col-sm-8">
                                            <input
                                                className="form-control w-100"
                                                type="date"
                                                value={dateTo}
                                                onChange={(e) => {
                                                    setdateTo(e.target.value);
                                                }}
                                            />
                                            {validationState === false && dateTo === "" && <span className="text-danger">First Select this </span>}

                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="col-md-12 text-right x_footer">

                                <button className="btn btn-primary" type="submit" onClick={() => { fetchTrialBalanceReport() }} >
                                    Show Report
                                </button>



                            </div>

                        </div>


                        {!isLoading &&
                            <>
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
                                                            <li>
                                                                <ReactToPrint
                                                                    trigger={() => {
                                                                        return (
                                                                            <button className="btn btn-sm btn-success borderRadiusRound">
                                                                                <i className="fa fa-print"></i>
                                                                            </button>
                                                                        );
                                                                    }}
                                                                    content={() => componentRef.current}
                                                                    documentTitle="new docs"
                                                                    pageStyle="print"
                                                                />
                                                            </li>
                                                            <li>
                                                                <button
                                                                    className="btn btn-sm btn-primary borderRadiusRound"
                                                                    onClick={() => console.log("print")}
                                                                >
                                                                    <i className="fa fa-file-pdf-o" aria-hidden="true"></i>
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>

                                            </div>
                                        </span>


                                    </div>
                                    <div className="clearfix" />
                                    <TrialSheetReciept ref={componentRef}
                                        dateFrom={dateFrom} dateTo={dateTo}
                                        reportData={reportData}
                                    />

                                </div>     </>
                        }




                    </div>
                    <div className="col-md-8 px-0">

                    </div>
                </div>
            </div>
        </>
    );
};

export default TrialSheet;