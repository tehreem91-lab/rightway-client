import React from "react";
import { useSelector } from "react-redux"; 



const Department = () => {
    const showNavMenu = useSelector((state) => state.NavState); 
    return (
        <>
             
            <div
                className={`container-fluid page-title-bar ${showNavMenu == false ? "right_col-margin-remove" : ""
                    }   `}
            >                <span>&nbsp; Department  Management</span>
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
                                    <input
                                        className="form-control"
                                        data-validate-length-range={6}
                                        data-validate-words={2}
                                        name="name"
                                        placeholder="i-e. Yellow..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12 text-right x_footer">
                    <button className="btn btn-primary" type="submit"  >
                           Submit
                            </button>
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
                                        <th className="column-title  right-border-1 text-center">Color Title</th>
                                        <th className="column-title text-center" width="10%">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="even pointer"  >
                                        <td className=" ">1</td>
                                        <td className=" ">One </td>
                                        <td
                                            className="a-right a-right     text-center"
                                        >
                                            <i
                                                className="fa fa-edit pl-3"
                                            ></i>
                                            <i
                                                className="fa fa-trash-o pl-3"
                                            ></i>
                                        </td>
                                    </tr>
                                    <tr className="even pointer"  >
                                        <td className=" ">1</td>
                                        <td className=" ">One </td>
                                        <td
                                            className="a-right a-right     text-center"
                                        >
                                            <i
                                                className="fa fa-edit pl-3"
                                                
                                            ></i>
                                            <i
                                                className="fa fa-trash-o pl-3"
                                            ></i>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Department;
