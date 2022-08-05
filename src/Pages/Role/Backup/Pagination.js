import React, { useState } from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const [activeClass, setactiveClass] = useState(true);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
   
  return (
    <div>
      <nav aria-label="Page navigation example  bg-danger">
        <ul className="pagination border-radius-none">
          {pageNumbers.map((number, index) => ( 
            <li
              key={number}
              className={`page-item paginate_button border-radius-none`}
            >
              <a
                className={`page-link height-page-link  border-radius-none  ${
                  activeClass === true && index === 0 ? "active-pagination" : " "
                }`}
        
                onClick={() => {
                  if (index === 0) {
                    setactiveClass(true);
                  } else {
                    setactiveClass(false);
                  }
                  paginate(number);
                }}
              >
                {number}
              </a>
            </li>
          ))}
          {/* <li className="page-item paginate_button previous border-radius-none">
                        <a className="page-link border-radius-none height-page-link"  >
                          Previous
                        </a>
                      </li> */}

          {/* <li className="page-item paginate_button ">
                        <a className="page-link height-page-link" href="#">
                          2
                        </a>
                      </li>
                      <li className="page-item paginate_button ">
                        <a className="page-link height-page-link" href="#">
                          3
                        </a>
                      </li>
                      <li className="page-item paginate_button next  ">
                        <a className="page-link border-radius-none height-page-link" href="#">
                          Next
                        </a>
                      </li> */}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
