import React, { useState } from "react";
import { useSelector } from "react-redux";
import { customStyles } from "./reactCustomSelectStyle";
import Select from "react-select";
import { endPoint } from "../config/Config";
import { toast } from "react-toastify";

const CustomInnerHeader = (props) => {
  const showNavResult = useSelector((state) => state.NavReducer.data);
  // Nav Toggle State
  const showNavMenu = useSelector((state) => state.NavState);

  const [selectedBranchValue, setSelectedBranchValue] = useState(
    localStorage.getItem("selectedBranch_idValue")
  );
  const [selectedBranchLabel, setSelectedBranchLabel] = useState(
    localStorage.getItem("selectedBranch_idLabel")
  );

  let user_id = localStorage.getItem("user_id").slice(1, -1);
  let fiscal_year = localStorage.getItem("selectedFiscalYear_value");

  return (
    <>
      <div className="row">
        <div className={`col-md-${showNavMenu === false ? "9" : "7"} `}>
          <span>&nbsp;{props.moduleName} </span>
        </div>
        <div className="col-md-3">
          {" "}
          {props.isShowSelector && (
            <span>
              <Select
                isSearchable={true}
                value={{
                  value: selectedBranchValue,
                  label: selectedBranchLabel,
                }}
                onChange={async (e) => {
                  console.log(user_id);
                  localStorage.setItem("selectedBranch_idValue", e.value);
                  localStorage.setItem("selectedBranch_idLabel", e.label);
                  setSelectedBranchValue(e.value);
                  setSelectedBranchLabel(e.label);

                  var axios = require("axios");
                  var data = JSON.stringify({
                    user_prefered_branch: e.value,
                    user_prefered_fiscal_year: fiscal_year,
                  });

                  var config = {
                    method: "put",
                    url: `${endPoint}api/UserInfo/UpdateData?user_id=${user_id}`,
                    headers: {
                      Authorization: `Bearer ${
                        JSON.parse(localStorage.getItem("access_token"))
                          .access_token
                      }`,
                      "Content-Type": "application/json",
                    },
                    data: data,
                  };

                  axios(config)
                    .then(function (response) {
                     
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                }}
                styles={customStyles}
                options={showNavResult.assignBranches}
              />
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomInnerHeader;