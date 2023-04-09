import React from "react";

const FlowHeader = () => {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full   text-center text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500 bg-red-400">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Input Type
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Created At
                  </th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowHeader;
