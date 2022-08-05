import {  toast } from "react-toastify";
import React, { useState } from "react";
import { endPoint } from "../config/Config";

import { useDispatch, } from "react-redux";
import { doGetNavigation } from "../store/actions/Navigation";


const Login = ({ setisLogin , setShowMainLoader  }) => {
  const [disableLoginButton, setdisableLoginButton] = useState(false);
  const [credientials, setCredientials] = useState(false);
  const [logInAuth, setlogInAuth] = useState({
    username: "",
    password: "",
    grant_type: "password",
  });
  const dispatch = useDispatch();
  const onLogin = () => {
    localStorage.setItem("authUser", endPoint);
  };
  const notify = () => toast("Login SuccessFully!");


  return (
    <div>
      <div>
        <div className="login_wrapper ">
          <div className="animate form login_form">
            <section className="login_content">
              <form>
                <h1>Login Form</h1>
                <div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    required
                    value={logInAuth.username}
                    onChange={(e) => {
                      setCredientials(false)
                      setlogInAuth({ ...logInAuth, username: e.target.value })
                    }
                    }
                  />
                </div>
                <div>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    required
                    value={logInAuth.password}
                    onChange={(e) => {
                      setCredientials(false)
                      setlogInAuth({ ...logInAuth, password: e.target.value })
                    }
                    }
                  />
                </div>
                <div>
                  {
                    credientials ? <code>Wrong credientials</code> : ""
                  }

                </div>
                <div className="text-right">
                  <button
                    className="btn btn-default submit btn-official px-3 btn-sm text-light"
                    type="submit"
                    disabled={disableLoginButton}
                    onClick={(e) => {
                      e.preventDefault();
                      setdisableLoginButton(true)
                      var urlencoded = new URLSearchParams();
                      urlencoded.append("username", logInAuth.username);
                      urlencoded.append("password", logInAuth.password);
                      urlencoded.append("grant_type", "password");

                      var urlencoded = new URLSearchParams();
                      urlencoded.append("username", logInAuth.username);
                      urlencoded.append("password", logInAuth.password);
                      urlencoded.append("grant_type", "password");

                      fetch(endPoint + "token", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/x-www-form-urlencoded",
                        },
                        body: urlencoded,
                      })
                        .then((result) => {
                          result.json().then((response) => {
                            if (result.status === 200) {
                              // localStorage.setItem(  
                              localStorage.setItem(
                                "access_token",
                                JSON.stringify(response)
                              );
                              localStorage.setItem(
                                "user_id",
                                JSON.stringify(response.userName)
                              );


                              console.log(response , "___");

                              setisLogin(true)
                              // fetchNavigation(response.access_token);

                              dispatch(doGetNavigation(setShowMainLoader , setisLogin ))
                              notify();
                            } else {

                              setCredientials(true)
                              setdisableLoginButton(false)
                            }
                          });
                        })
                        .catch((error) => console.log("error", error));

                      // notify();
                      onLogin();
                    }}
                  >
                    Log in
                  </button>
                </div>
                <div className="clearfix" />
                <div className="separator">
                  <p className="change_link">
                    Any Problem?
                    <a href="#signup" className="to_register">
                      {" "}
                      Need Help{" "}
                    </a>
                  </p>
                  <div className="clearfix" />
                  <br />
                  <div>
                    {/* <img src="images/logo.svg" alt className="md-logo" />
                     */}

                    <h1>
                      <img
                        src="images/logo_icon.svg"
                        alt
                        className="sm-logo-in-Login"
                      />{" "}
                      Genial365
                    </h1>
                    <p>
                      ©2022 All Rights Reserved. Product of Technupur. Privacy
                      and Terms
                    </p>
                  </div>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
