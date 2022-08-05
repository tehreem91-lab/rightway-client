import Loader from "../Layout/Loader/Loader";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import CustomForm from "./CustomForm";
import FilterForm from "./FilterForm";
import CustomListing from "./CustomListing";
import { customStyles } from "./reactCustomSelectStyle";
import Select from "react-select";
function PageTemplate(props) {
  const showNavResult = useSelector((state) => state.NavReducer.data);
  // Nav Toggle State
  const showNavMenu = useSelector((state) => state.NavState);
  const [displayUserRegBox, setdisplayUserRegBox] = useState(true);
  const [selectedBranchValue, setSelectedBranchValue] = useState(localStorage.getItem("selectedBranch_idValue"))
  const [selectedBranchLabel, setSelectedBranchLabel] = useState(localStorage.getItem("selectedBranch_idLabel"))
//   const selectedBranchValue = (localStorage.getItem("selectedBranch_idValue"))
//   const selectedBranchLabel = (localStorage.getItem("selectedBranch_idLabel"))
  return (
    <>

      {props.isLoading ? (
        <Loader />
      ) : (
        <>
          <div
            className={`container-fluid page-title-bar ${
              showNavMenu == false ? "right_col-margin-remove" : ""
            }   `}
          >
            <div className="row">
              <div className={`col-md-${showNavMenu == false ? "9" : "7"} `}>
                <span>&nbsp;{props.moduleName} </span>
              </div>
              <div className="col-md-3  ">
                {" "}
                <span>
                  <Select
                    isSearchable={true}
                    value={{value:selectedBranchValue , label:selectedBranchLabel}}
                    onChange={async (e) => {
                        localStorage.setItem("selectedBranch_idValue",e.value );
                        localStorage.setItem("selectedBranch_idLabel", e.label);
                        setSelectedBranchValue(e.value) 
                        setSelectedBranchLabel(e.label)
                    }}
                    styles={customStyles}
                    options={showNavResult.assignBranches}
                  />
                </span>
              </div>
            </div>
          </div>
          <div
            className={`right_col  h-100 ${
              showNavMenu == false ? "right_col-margin-remove" : "lorem "
            }   `}
            role="main"
          >
            {displayUserRegBox && props.pagePermission.Add === "true" && (
              <CustomForm
                formTitle={props.formTitle}
                formFields={props.formFields}
                initialValues={props.initialValues}
                files={props.files}
                DisplayingErrorMessagesSchema={
                  props.DisplayingErrorMessagesSchema
                }
                updateMode={props.updateMode}
                formSubmit={props.formSubmit}
                fetchData={props.fetchData}
                clearFields={props.clearFields}
                showButtons={props.showButtons}
                changeFieldValue={props.changeFieldValue}
              />
            )}
            {props.addFilters && (
              <FilterForm
                filterFields={props.filterFields}
                filterFormSubmit={props.filterFormSubmit}
                clearFilterFields={props.clearFilterFields}
                showFilterButtons={props.showFilterButtons}
                changeFilterFieldValue={props.changeFilterFieldValue}
              />
            )}
            {props.listing.map((value, index) => {
              return (
                <CustomListing
                  key={index}
                  listing={value}
                  totalListing={props.listing}
                  pagePermission={props.pagePermission}
                />
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
export default PageTemplate;
