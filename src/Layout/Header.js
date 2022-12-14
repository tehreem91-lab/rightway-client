import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Select from 'react-select'
import { customStyles } from "../Components/reactCustomSelectStyle";
import { endPoint } from "../config/Config"; 
// import { setNavSm, setNavMd } from "../actions/NavState";
import { setNavSm, setNavMd } from "../store/actions/NavState";
const Header = ({ roleName, setisLogin }) => {
  const [selectedFiscalYear, setSelectedFiscalYear] = useState(
    localStorage.getItem("selectedFiscalYear_value")
  );
  const [selectedFiscalYearLabel, setSelectedFiscalYearLabel] = useState(
    localStorage.getItem("selectedFiscalYear_label")
  );


  let user_id = localStorage.getItem("user_id").slice(1, -1);


  const branchValue = localStorage.getItem("selectedBranch_idValue")
 

  const showNavResult = useSelector((state) => state.NavReducer.data);
  const dispatch = useDispatch();
  const showNavMenu = useSelector((state) => state.NavState);
  const [ScreenWidth, setScreenWidth] = useState();
  const { innerWidth: width } = window;
  const toggleNav = () => {
    if (showNavMenu == true) {
      dispatch(setNavSm());
    } else {
      dispatch(setNavMd());
    }
  };
 

  return (
    <>
      <div
        className={`top_nav   ${showNavMenu === false ? "top_nav-margin-remove" : " "
          }  `}
      >
        <div className="nav_menu">
          <div
            className={`nav toggle  ${showNavMenu === true ? "toggle-to-Add-margin" : " "
              }  `}
          >
            <a className="menu_toggle" onClick={() => toggleNav()}>
              <i className="fa fa-bars" />
            </a>
          </div>
          <nav className="nav navbar-nav">
            <ul className=" navbar-right">
              {/* User Profile */}
              {width >= 484 ? (


                <>    <li
                  className="nav-item dropdown open"
                  style={{ paddingLeft: 15 }}
                >
                  <a
                    className="user-profile dropdown-toggle"
                    aria-haspopup="true"
                    id="navbarDropdown"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img src="images/img.jpg" alt="true" />
                    {roleName}
                  </a>
                  <div
                    className="dropdown-menu dropdown-usermenu pull-right"
                    aria-labelledby="navbarDropdown"
                  >

                    <NavLink className="text-dark" to="UserProfile">
                      <div className="seeProfileHeader">
                        Profile         </div>  </NavLink>
                    <a className="dropdown-item">
                      <span className="badge bg-red pull-right">50%</span>
                      <span>Settings</span>
                    </a>
                    <a className="dropdown-item">
                      Help
                    </a>
                    <a className="dropdown-item" onClick={() => {
                      localStorage.clear()
                      setisLogin(false)
                    }}>
                      <i className="fa fa-sign-out pull-right" /> Log Out
                    </a>
                  </div>
                </li>
                  <li
                    className="nav-item dropdown open"
                    style={{ paddingLeft: 15 }}
                  >
                    <span>
                      <Select
                        // isSearchable={true}
                        value={{
                          value: selectedFiscalYear,
                          label: selectedFiscalYearLabel,
                        }}
                        onChange={async (e) => {
                          console.log(user_id);
                          localStorage.setItem("selectedFiscalYear_value", e.value);
                          localStorage.setItem("selectedFiscalYear_label", e.label);
                          setSelectedFiscalYear(e.value);
                          setSelectedFiscalYearLabel(e.label);

                          var axios = require("axios");
                          var data = JSON.stringify({
                            user_prefered_branch: branchValue,
                            user_prefered_fiscal_year: e.value,
                          });

                          var config = {
                            method: "put",
                            url: `${endPoint}api/UserInfo/UpdateData?user_id=${user_id}`,
                            headers: {
                              Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token"))
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
                        options={showNavResult.assignFiscalYears.map((each_fiscal_year) => {
                          return {
                            value: each_fiscal_year.fiscal_year_id,
                            label: `${each_fiscal_year.start_year.slice(0, 10)}__${each_fiscal_year.end_year.slice(0, 10)}`
                          }
                        })}
                      />
                    </span>
                  </li>

                </>
              ) : (
                <></>
              )}


            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
