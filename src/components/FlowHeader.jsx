import React from "react";

const FlowHeader = () => {
  return (
    <div className="flex flex-col sticky top-0   bg-gray-700 text-white  m-auto w-11/12">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 rounded">
        <div className="overflow-hidden">
          <table className="min-w-full text-center  	 font-light">
            <thead className="border-b font-medium">
              <tr>
                <th scope="col" className="w-3/12 bg-blue-800 px-6 py-4 text-2xl">
                  Name
                </th>
                <th scope="col" className=" w-3/12 bg-blue-700 px-6 py-4 text-2xl">
                  Input Type
                </th>
                <th scope="col" className=" w-3/12 bg-blue-800 px-6 py-4 text-2xl">
                  Created At
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FlowHeader;
