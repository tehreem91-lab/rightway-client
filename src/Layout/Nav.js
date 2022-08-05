import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setNavMd } from "../store/actions/NavState";

const Nav = ({ navigationResult, isLogin }) => {
  const [multiLevelDropDown, setMultiLevelDropSown] = useState(false)
  const showNavMenu = useSelector((state) => state.NavState);
  // const [currentBlock, setCurrentBlock] = useState(1);
  const [currentBlock, setCurrentBlock] = useState("");
  const [currentPage, setCurrentPage] = useState("");
  const showNavResult = useSelector((state) => state.NavReducer.data);
  const dispatch = useDispatch();
  function SetCurrentModules(modules, page) {
    setCurrentBlock(modules)
    setCurrentPage(page)
  } 

  useEffect(() => {
   console.log( showNavResult);

  }, [])
  
  return (
    <>
      {isLogin ? (
        <>
          <>
            {" "}
            {showNavMenu == true ? (
              <>
                <div className="col-md-3 left_col">
                  <div className="left_col scroll-view">
                    {/* Logo */}
                    <div className="navbar nav_title" style={{ border: 0 }}>
                      <a href="#" className="site_title">
                        <img src="images/logo.svg" className="md-logo" alt="true" />
                        <img src="images/logo_icon.svg" className="sm-logo" alt="true" />
                      </a>
                    </div>
                    <div className="clearfix" />

                    {/* Sidebar Menu */}
                    <div className="main_menu_side hidden-print main_menu sidebar-menu">
                      <div className="menu_section">
                        {/*<h3>General</h3>*/}
                        <ul className="nav side-menu">
                          {showNavResult.navigationResult.map(
                            (module, index) => {
                              return (
                                <li key={index} 
                                  onClick={() => setCurrentBlock(module.module_name)} className={(currentBlock === module.module_name ? "active" : "")}
                                >
                                  <a  onClick={() => setCurrentBlock(module.module_name)}  >


                                    <i className={`${module.module_icon}`} /> 
                                    {module.module_name}
                                    <span className="fa fa-chevron-down" />
                                  </a>
                                  <ul
                                    className={`nav child_menu ${currentBlock === module.module_name
                                      ? "d-block"
                                      : " d-none"
                                      }`}
                                  >
                                    {module.pages.map((page, i) => {
                                     return (

                                      <React.Fragment key={i}>
                                    {
                                      page.viewPermission==="true"? <li key={i} onClick={() => setCurrentPage(page.pageURL)} className={(currentPage === page.pageURL ? "current-page" : "")}>
                                      <NavLink to={page.pageURL}  >
                                        {page.pageName}
                                      </NavLink>
                                      {
                                        (currentBlock === "" && currentPage === "" && window.location.href.split("/")[window.location.href.split("/").length - 1] === page.pageURL) &&
                                        SetCurrentModules(module.module_name, page.pageURL)
                                      }
                                    </li>:<></>
                                    }
                                     </React.Fragment>
                                    );
                                  })}


                                  </ul>
                                </li>
                              );
                            }
                          )}
                        </ul>
                      </div>
                    </div>
                    {/* /sidebar menu */}
                    {/* /menu footer buttons */}
                    <div className="sidebar-footer hidden-small">

                      <NavLink to="UserProfile" data-toggle="tooltip"
                        data-placement="top"
                        title="FullScreen"
                      > <span
                          className="glyphicon glyphicon-cog"
                          aria-hidden="true"
                        />
                      </NavLink>

                      <NavLink to="RoleAccess" data-toggle="tooltip"
                        data-placement="top"
                        title="FullScreen"
                      > <span
                          className="glyphicon glyphicon-fullscreen"
                          aria-hidden="true"
                        /> </NavLink>

                      <NavLink to="EmployeesList" data-toggle="tooltip"
                        data-placement="top"
                        title="Lock"
                      >  <span
                          className="glyphicon glyphicon-user"
                          aria-hidden="true"
                        /> </NavLink>
                      <a
                        onClick={() => dispatch(setNavMd)}
                      >
                        <span
                          className="glyphicon glyphicon-off"
                          aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </>
        </>
      ) : (
        <>not load yet</>
      )}
    </>
  );
};

export default Nav;
