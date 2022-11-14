import Loader from "../Layout/Loader/Loader";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import CustomForm from "./CustomForm";
import FilterForm from "./FilterForm";
import CustomInnerHeader from "./CustomInnerHeader";
import CustomListing from "./CustomListing"; 
function PageTemplate(props) {  
  const showNavMenu = useSelector((state) => state.NavState);
  const [displayUserRegBox, setdisplayUserRegBox] = useState(true);
  
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
            <CustomInnerHeader moduleName={props.moduleName} isShowSelector={props.isShowSelector}/>
          
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