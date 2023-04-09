import React, { useEffect, useState } from "react";
import format from "date-fns/format";
import { useNavigate } from "react-router-dom";

const SingleWorkflow = ({ data, setData }) => {
    //Dynamic Routing to `/DesignWorkflow/${id}`
  const navigate = useNavigate();

  const openMe = (id) => {
    // alert(`i am opened and my id Is ${id}`);
    navigate(`/DesignWorkflow/${id}`, { state: id });
  };
  return (
    <>
      {data.map((item) => {
        const { name, input_type, createdAt, id } = item;
        //FORMATTING DATE IN [DD-MM-YYYY]
        const formattedDate = format(new Date(createdAt), "dd MMMM yyyy");
        return (
          <>
            <tr key={id} className="border-b dark:border-neutral-500">
              <td
                onClick={() => openMe(id)}
                className="whitespace-nowrap px-6 py-4 font-medium hover:text-cyan-200 cursor-pointer"
              >
                {name}
              </td>
              <td className="whitespace-nowrap px-6 py-4 font-medium">
                {input_type}
              </td>
              <td className="whitespace-nowrap px-6 py-4 font-medium">
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
