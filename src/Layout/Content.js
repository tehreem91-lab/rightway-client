import React from "react";

const Content = ({ showNavMenu }) => {
  return (
    <>
      <div
        role="main"
        className={`top_nav   ${
          showNavMenu == false ? "right_col-margin-remove" : " "
        }  `}
      >
        <div className="page-title ">
          <div className="title_left">
            <h1>Main Heading LOREMDFDFSD</h1>
          </div>
          <div className="clearfix" />
        </div>
        <p>Page Contents Area...</p>
      </div>
    </>
  );
};

export default Content;
