import PageTemplate from "../../Components/PageTemplate";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import DataTable from "../../DataTable/DataTable";
function TestDataTable({ pagePermission }) {
    const showNavMenu = useSelector((state) => state.NavState);
    const rolePermissionTable = {
        Add: pagePermission.AddPermission,
        Delete: pagePermission.DelPermission,
        Edit: pagePermission.EditPermission,
    }
    const columns = [
        { title: "id", field: "id", hidden: true, },
        { title: "Athlete", field: "athlete", width: "25%" },
        { title: "Age", field: "age", width: "8%" },
        { title: "Country", field: "country", width: "13%" },
        { title: "Year", field: "year", width: "8%" },
        { title: "Date", field: 'date', width: "8%" },
        { title: "Sport", field: 'sport', width: "8%" },
        { title: "Gold", field: 'gold', width: "8%" },
        { title: "Silver", field: 'silver', width: "8%" },
        { title: "Bronze", field: 'bronze', width: "7%" },
        { title: "Total", field: 'total', width: "7%" },
    ]



    let pageTitle = "Player List"
    let endPoint = 'https://json-server-frie.herokuapp.com/olympic?'
    return (
        <>
            <div
                className={`right_col  h-100  ${showNavMenu == false ? "right_col-margin-remove" : " "
                    } `}
                role="main"
            >
                <div className="x_panel pt-0">
                    <div className="x_content">
                        <div className="table-responsive">
                            <DataTable columns={columns} pageTitle={pageTitle} endPoint={endPoint} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TestDataTable;
