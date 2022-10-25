import React from "react";
import MaterialTable, { Column } from "@material-table/core";
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import { Delete } from '@material-ui/icons';
import { Edit } from '@material-ui/icons';
import './DataTable.css'
import * as XLSX from 'xlsx'

const DataTable = ({ columns, pageTitle, endPoint }) => {
    const ExportToExcel = (cols, datas, pageTitle)=>{
        console.log("export to excel" , cols, datas, pageTitle);

        const workSheet = XLSX.utils.json_to_sheet(datas);
        const workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook , workSheet , "PalyerRecord")

        // buffer 
        let buf = XLSX.write(workBook , {bookType:"xlsx" , type:"binary"})
        XLSX.write(workBook , {bookType:"xlsx" , type:"binary"})
        XLSX.writeFile(workBook , `${pageTitle}.xlsx`)
    }
    return <>

        <MaterialTable
            components={{
                OverlayLoading: props => (<><div className="spinner-border" role="status">
                </div></>)
            }}

            title={pageTitle}
            actions={[
                {
                    icon: () => <Edit />,
                    tooltip: "Edit",
                    onClick: (event, rowData) => {
                        const rowJson = JSON.stringify(rowData);
                        console.log(`Do save operation : ${rowJson}`);
                    },
                }, {
                    icon: () => <Delete />,

                    tooltip: "Delete",
                    onClick: (event, rowData) => {
                        const rowJson = JSON.stringify(rowData);
                        console.log(`Do save operation : ${rowJson}`);
                    },
                },

            ]}
            columns={columns}


            options={{
                actionsColumnIndex: -1,
                exportMenu: [{
                    label: 'Export PDF',
                    exportFunc: (cols, datas) => ExportPdf(cols, datas, pageTitle)
                }, {
                    label: 'Export EXCEL',
                    exportFunc: (cols, datas) => ExportToExcel(cols, datas, pageTitle)
                }, {
                    label: 'Export CSV',
                    exportFunc: (cols, datas) => ExportCsv(cols, datas, pageTitle)
                }],
                headerStyle: {
                    backgroundColor: 'rgba(52, 73, 94, 0.94)',
                    color: '#FFF'
                },
                isLoading: true,
                paging: true,
                pageSize: 25,
                emptyRowsWhenPaging: false,
                pageSizeOptions: [25, 50, 75, 100 ],
            }}




            data={query =>
                new Promise((resolve, reject) => {
                    console.log("query", query);
                    let url = `${endPoint}`
                    if (query.search) {
                        url += `q=${query.search}`
                    }
                    if (query.orderBy) {
                        url += `&_sort=${query.orderBy.field}&_order=${query.orderDirection}`
                    }
                    if (query.filters.length) {
                        const filter = query.filters.map(filter => {
                            return `&${filter.column.field}${filter.operator}${filter.value}`
                        })
                        url += filter.join('')
                    }
                    url += `&_page=${query.page + 1}`
                    url += `&_limit=${query.pageSize === 5 ? 12 : query.pageSize}`
                    fetch(url).then(resp => resp.json()).then(resp => {
                        console.log(resp)
                        resolve({
                            data: resp.olympic,
                            page: query.page,
                            totalCount: 499
                        });
                    })
                })
            }

        />

    </>
};
export default DataTable;