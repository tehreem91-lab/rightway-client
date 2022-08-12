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
import { useDispatch, useSelector } from "react-redux";
import { doGetNavigation } from "./store/actions/Navigation";
import PrivateRoute from "./Layout/PrivateRoute";
import { endPoint } from "./config/Config";
import ROUTES from "./config/ROUTES";
function App() {  const [isLogin, setisLogin] = useState(null);
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
        <div className="lds-dual-ring-ForMain-Page "></div>
      ) : !isLogin ? (<Login
        setisLogin={setisLogin}
        isLogin={isLogin}
        setShowMainLoader={setShowMainLoader}
      />
      ) : (
        <>
          {showMainLoader ? (
            <div className="lds-dual-ring-ForMain-Page "></div>
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
                    {
                      Object.entries(ROUTES).map(route => {
                        const [key, value] = route;
                        const TopLevelComponent = value.element;
                        return (<Route
                          path={value.path}
                          key={key}
                          element={
                            <PrivateRoute
                              pagePermission={allPagesData.find((o) => o.pageURL === `${value.path}`)}>
                              <TopLevelComponent pagePermission={allPagesData.find((o)=>o.pageURL===`${value.path}`)} />
                            </PrivateRoute>
                          }   />)       })}
                  </Routes>
                  <Footer />
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default App;

