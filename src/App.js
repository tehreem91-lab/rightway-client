// React Import
import { useEffect, useState } from "react";
//  Style Module Import
import "./App.css";
// Router Import
import { Routes, Route } from "react-router-dom";
// Notifier Import
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Component Import
import Nav from "./Layout/Nav";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import Login from "./Auth/Login";
import AddRole from "./Pages/Role/AddRole";
import AddUser from "./Pages/Role/AddUser";
import AddPages from "./Pages/Role/AddPages";
import AddModules from "./Pages/Role/AddModules";
import RolePermission from "./Pages/Role/RolePermission.js";

import { endPoint } from "./config/Config";
import Dashboard from "./Pages/Home/Dashboard.js/Dashboard";
import PrivateRoute from "./Layout/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { doGetNavigation } from "./store/actions/Navigation";
import CompanyInfo from "./Pages/General/CompanyInfo";
import CityNames from "./Pages/General/CityNames";
import Banknames from "./Pages/General/Banknames";
import AddMachines from "./Pages/General/AddMachines";
import AddShifts from "./Pages/General/AddShifts";
import EmployeeDesignations from "./Pages/General/EmployeeDesignations";
import StockUnits from "./Pages/General/StockUnits";
import CurrencyUnits from "./Pages/General/CurrencyUnits";
import Categories from "./Pages/Finance/Categories/Categories";
import DataTable from "./DataTable/DataTable";
import TestDataTable from "./Pages/Role/TestDataTable";
import BranchesPermission from "./Pages/Role/BranchesPermission";
import VoucherHistory from "./Pages/Finance/MultipleVouchers/VoucherHistory/VoucherHistory";
import AddBranches from "./Pages/Role/AddBranches";
import BankPaymentVoucher from "./Pages/Finance/MultipleVouchers/BankPaymentVoucher/BankPaymentVoucher";
import BankReceiveVoucher from "./Pages/Finance/MultipleVouchers/BankReceiveVoucher/BankReceiveVoucher";
import CashPaymentVoucher from "./Pages/Finance/MultipleVouchers/CashPaymentVoucher/CashPaymentVoucher";
import CashReceiveVoucher from "./Pages/Finance/MultipleVouchers/CashReceiveVoucher/CashReceiveVoucher";
import JournalVoucher from "./Pages/Finance/MultipleVouchers/JournalVoucher/JournalVoucher";
function App() {
  const [isLogin, setisLogin] = useState(null);
  const [showMainLoader, setShowMainLoader] = useState(true);
  const dispatch = useDispatch();
  const showNavResukt = useSelector((state) => state.NavReducer.data);

  let allPagesData = [1];
  if (showNavResukt !== undefined) {
    showNavResukt.navigationResult.map((eachModule) => {
      eachModule.pages.map((eachPage) => {
        allPagesData.push(eachPage);
      });
    });
  }

  useEffect(() => {
    localStorage.setItem("authUser", endPoint);
    var newRetrived = localStorage.getItem("access_token");
    if (newRetrived) {
      setisLogin(true);
    } else {
      setisLogin(false);
    }
    dispatch(doGetNavigation(setShowMainLoader));
  }, []);

  return (
    <>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {isLogin === null ? (
        <>
          {" "}
          <div className="lds-dual-ring-ForMain-Page "></div>
        </>
      ) : !isLogin ? (
        <>
          <Login
            setisLogin={setisLogin}
            isLogin={isLogin}
            setShowMainLoader={setShowMainLoader}
          />
        </>
      ) : (
        <>
          {showMainLoader ? (
            <>
              {" "}
              <div className="lds-dual-ring-ForMain-Page "></div>
            </>
          ) : (
            <>
              <div className="container body">
                <div className="main_container">
                  <Nav navigationResult={showNavResukt} isLogin={isLogin} />
                  <Header
                    roleName={showNavResukt.RoleName}
                    setisLogin={setisLogin}
                  />

                  <Routes>
                    {/* <Route path="RoleAccess" element={<AddRole />} />
                    <Route path="ModuleAccess" element={<AddModules />} />
                    <Route path="UserAccess" element={<AddUser />} />
                    <Route path="PagesAccess" element={<AddPages />} />
                    <Route
                      path="PermissionAccess"
                      element={<RolePermission />}
                    /> */}


                    <Route
                      path="RoleAccess"
                      element={
                        <PrivateRoute
                          pagePermission={allPagesData.find(
                            (o) => o.pageURL === "RoleAccess"
                          )}
                        >
                          <AddRole
                            pagePermission={allPagesData.find(
                              (o) => o.pageURL === "RoleAccess"
                            )}
                          />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="VoucherHistoryAccess"
                      element={
                        <PrivateRoute
                          pagePermission={allPagesData.find(
                            (o) => o.pageURL === "VoucherHistoryAccess"
                          )}
                        >
                          <VoucherHistory
                            pagePermission={allPagesData.find(
                              (o) => o.pageURL === "VoucherHistoryAccess"
                            )}
                          />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="ModuleAccess"
                      element={
                        <PrivateRoute
                          pagePermission={allPagesData.find(
                            (o) => o.pageURL === "ModuleAccess"
                          )}
                        >
                          <AddModules
                            pagePermission={allPagesData.find(
                              (o) => o.pageURL === "ModuleAccess"
                            )}
                          />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="UserAccess"
                      element={
                        <PrivateRoute
                          pagePermission={allPagesData.find(
                            (o) => o.pageURL === "UserAccess"
                          )}
                        >
                          <AddUser
                            pagePermission={allPagesData.find(
                              (o) => o.pageURL === "UserAccess"
                            )}
                          />
                        </PrivateRoute>
                      }
                    />








                    {/* --------------- */}
                    <Route
                      path="TestDataTable"
                      element={
                        <PrivateRoute
                          pagePermission={allPagesData.find(
                            (o) => o.pageURL === "TestDataTable"
                          )}
                        >
                          <TestDataTable
                            pagePermission={allPagesData.find(
                              (o) => o.pageURL === "TestDataTable"
                            )}
                          />
                        </PrivateRoute>
                      }
                    />
                    {/* --------------- */}
                    <Route
                      path="BranchesPermissionAccess"
                      element={
                        <PrivateRoute
                          pagePermission={allPagesData.find(
                            (o) => o.pageURL === "BranchesPermissionAccess"
                          )}
                        >
                          <BranchesPermission
                            pagePermission={allPagesData.find(
                              (o) => o.pageURL === "BranchesPermissionAccess"
                            )}
                          />
                        </PrivateRoute>
                      }
                    />



                    <Route
                      path="BankPaymentAccess"
                      element={
                        <PrivateRoute
                          pagePermission={allPagesData.find(
                            (o) => o.pageURL === "BankPaymentAccess"
                          )}
                        >
                          <BankPaymentVoucher
                            pagePermission={allPagesData.find(
                              (o) => o.pageURL === "BankPaymentAccess"
                            )}
                          />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="BankReceiveAccess"
                      element={
                        <PrivateRoute
                          pagePermission={allPagesData.find(
                            (o) => o.pageURL === "BankReceiveAccess"
                          )}
                        >
                          <BankReceiveVoucher
                            pagePermission={allPagesData.find(
                              (o) => o.pageURL === "BankReceiveAccess"
                            )}
                          />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="CashPaymentAccess"
                      element={
                        <PrivateRoute
                          pagePermission={allPagesData.find(
                            (o) => o.pageURL === "CashPaymentAccess"
                          )}
                        >
                          <CashPaymentVoucher
                            pagePermission={allPagesData.find(
                              (o) => o.pageURL === "CashPaymentAccess"
                            )}
                          />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="CashReceiveAccess"
                      element={
                        <PrivateRoute
                          pagePermission={allPagesData.find(
                            (o) => o.pageURL === "CashReceiveAccess"
                          )}
                        >
                          <CashReceiveVoucher
                            pagePermission={allPagesData.find(
                              (o) => o.pageURL === "CashReceiveAccess"
                            )}
                          />
                        </PrivateRoute>
                      }
                    />


                    <Route
                      path="JournalVoucherAccess"
                      element={
                        <PrivateRoute
                          pagePermission={allPagesData.find(
                            (o) => o.pageURL === "JournalVoucherAccess"
                          )}
                        >
                          <JournalVoucher
                            pagePermission={allPagesData.find(
                              (o) => o.pageURL === "JournalVoucherAccess"
                            )}
                          />
                        </PrivateRoute>
                      }
                    />
















                    <Route
                      path="PermissionAccess"
                      element={
                        <PrivateRoute
                          pagePermission={allPagesData.find(
                            (o) => o.pageURL === "PermissionAccess"
                          )}
                        >
                          <RolePermission
                            pagePermission={allPagesData.find(
                              (o) => o.pageURL === "PermissionAccess"
                            )}
                          />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="PagesAccess"
                      element={
                        <PrivateRoute
                          pagePermission={allPagesData.find(
                            (o) => o.pageURL === "PagesAccess"
                          )}
                        >
                          <AddPages
                            pagePermission={allPagesData.find(
                              (o) => o.pageURL === "PagesAccess"
                            )}
                          />
                        </PrivateRoute>
                      }
                    />

                    <Route path="DataTable" element={<DataTable />} />

                    <Route path="/" element={<Dashboard />} />

                    <Route
                      path="CompanyInfo"
                      element={
                        <PrivateRoute
                          pagePermission={allPagesData.find(
                            (o) => o.pageURL === "CompanyInfo"
                          )}
                        >
                          <CompanyInfo pagePermission={allPagesData.find(
                            (o) => o.pageURL === "CompanyInfo"
                          )} />
                        </PrivateRoute>
                      }
                    />



                    <Route
                      path="Banknames"
                      element={
                        <PrivateRoute
                          pagePermission={allPagesData.find(
                            (o) => o.pageURL === "Banknames"
                          )}
                        >
                          <Banknames pagePermission={allPagesData.find(
                            (o) => o.pageURL === "Banknames"
                          )} />
                        </PrivateRoute>
                      }
                    />




                    {/* <Route path="CompanyInfo" element={<CompanyInfo />} /> */}

                    {/* <Route path="Banknames" element={<Banknames />} /> */}





                    <Route
                      path="Designation"
                      element={
                        <PrivateRoute
                          pagePermission={allPagesData.find(
                            (o) => o.pageURL === "Designation"
                          )}
                        >
                          <EmployeeDesignations pagePermission={allPagesData.find(
                            (o) => o.pageURL === "Designation"
                          )} />
                        </PrivateRoute>
                      }
                    />




                    <Route
                      path="CurrencyUnits"
                      element={
                        <PrivateRoute
                          pagePermission={allPagesData.find(
                            (o) => o.pageURL === "CurrencyUnits"
                          )}
                        >
                          <CurrencyUnits pagePermission={allPagesData.find(
                            (o) => o.pageURL === "CurrencyUnits"
                          )} />
                        </PrivateRoute>
                      }
                    />




                    <Route
                      path="Machines"
                      element={
                        <PrivateRoute
                          pagePermission={allPagesData.find(
                            (o) => o.pageURL === "Machines"
                          )}
                        >
                          <AddMachines pagePermission={allPagesData.find(
                            (o) => o.pageURL === "Machines"
                          )} />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="AddBranchesAccess"
                      element={
                        <PrivateRoute
                          pagePermission={allPagesData.find(
                            (o) => o.pageURL === "AddBranchesAccess"
                          )}
                        >
                          <AddBranches pagePermission={allPagesData.find(
                            (o) => o.pageURL === "AddBranchesAccess"
                          )} />
                        </PrivateRoute>
                      }
                    />


                    <Route
                      path="Shifts"
                      element={
                        <PrivateRoute
                          pagePermission={allPagesData.find(
                            (o) => o.pageURL === "Shifts"
                          )}
                        >
                          <AddShifts pagePermission={allPagesData.find(
                            (o) => o.pageURL === "Shifts"
                          )} />
                        </PrivateRoute>
                      }
                    />





                    <Route
                      path="CityNames"
                      element={
                        <PrivateRoute
                          pagePermission={allPagesData.find(
                            (o) => o.pageURL === "CityNames"
                          )}
                        >
                          <CityNames pagePermission={allPagesData.find(
                            (o) => o.pageURL === "CityNames"
                          )} />
                        </PrivateRoute>
                      }
                    />



                    <Route
                      path="StockUnits"
                      element={
                        <PrivateRoute
                          pagePermission={allPagesData.find(
                            (o) => o.pageURL === "StockUnits"
                          )}
                        >
                          <StockUnits pagePermission={allPagesData.find(
                            (o) => o.pageURL === "StockUnits"
                          )} />
                        </PrivateRoute>
                      }
                    />


                    <Route
                      path="Categories"
                      element={
                        <PrivateRoute
                          pagePermission={allPagesData.find(
                            (o) => o.pageURL === "Categories"
                          )}
                        >
                          <Categories pagePermission={allPagesData.find(
                            (o) => o.pageURL === "Categories"
                          )} />
                        </PrivateRoute>
                      }
                    />
                    {/* <Route path="Machines" element={<AddMachines />} /> */}

                    {/* <Route path="Categories" element={<Categories />} /> */}
                  </Routes>
                  <Footer />
                </div>
              </div>
            </>
          )}{" "}
        </>
      )}
    </>
  );
}

export default App;

// {isLogin===true && showMainLoader===false ? (
//
// ) : (

//     <>
//     {isLogin===false &&  showMainLoader===false &&

//     }
//     {
//       showMainLoader===true && isLogin===true && <>Loader </>
//     }

//     </>

// )}
