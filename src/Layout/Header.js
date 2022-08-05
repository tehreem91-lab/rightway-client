import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";


// import { setNavSm, setNavMd } from "../actions/NavState";
import { setNavSm, setNavMd } from "../store/actions/NavState";
const Header = ({ roleName  , setisLogin }) => {
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

  useEffect(() => {
    setScreenWidth(width);
    
  }, []);

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
                <li
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
                    <a className="dropdown-item"  onClick={()=>{
                      localStorage.clear()
                      setisLogin(false)}}>
                      <i className="fa fa-sign-out pull-right" /> Log Out
                    </a>
                  </div>
                </li>
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
