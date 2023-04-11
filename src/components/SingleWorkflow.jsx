import React, { useEffect, useState } from "react";
import format from "date-fns/format";
import { useNavigate } from "react-router-dom";

const SingleWorkflow = ({ data, setData }) => {
  //Dynamic Routing to `/DesignWorkflow/${id}`
  const navigate = useNavigate();
  const openMe = (id) => {
    navigate(`/DesignWorkflow/${id}`, { state: id });
  };
  return (
    <>
      {data.map((item) => {
        const { name, input_type, createdAt, id } = item;
        // Date Formatting
        const formattedDate = format(new Date(createdAt), "dd MMMM yyyy");

        return (
          <>
            <tr
              key={id}
              className=" w-11/12 m-auto text-blue-900 text-lg border-b dark:border-neutral-900 flex flex-row justify-between "
            >
              <td
                onClick={() => openMe(id)}
                className=" w-4/12   px-6 py-4 font-medium text-left  hover:text-blue-900 hover:rounded-full  hover:bg-green-200 hover:cursor-pointer  cursor-pointer"
              >
                {name}
              </td>
              <td className=" w-2/12  px-6 py-4 font-medium text-left ">
                {input_type}
              </td>
              <td className=" w-2/12   px-6 py-4 font-medium text-left ">
                {formattedDate}
              </td>
            </tr>
          </>
        );
      })}
    </>
  );
};

export default SingleWorkflow;
