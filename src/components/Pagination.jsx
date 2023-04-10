import React from "react";

const Pagination = ({ allPages, setPageNo }) => {
  const onPageClick = (index) => {
    setPageNo(index + 1);
  };
  return (
    <div className="scrollbar-hide p-2 w-1/2 m-auto my-5 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]">
      <ul className="flex  whitespace-nowrap scrollbar-hide overflow-auto items-center">
        {allPages.map((num, index) => {
          return (
            <>
              <li key={num + index} className=" px-1 py-1 justify-center  text-center items-center ">
                <a 
                  className=" px-2 py-2 hover:bg-slate-700  hover:text-white cursor-pointer   "
                  onClick={() => onPageClick(index)}
                >
                  {num}
                </a>
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default Pagination;
