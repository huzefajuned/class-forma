import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";

const ModuleList = () => {
  const totalWrokflow = 100;
  const pagePerLimit = 5;
  const totalPageCount = Math.ceil(totalWrokflow / pagePerLimit);
  const allPages = Array.from(
    { length: totalPageCount },
    (_, index) => index + 1
  );
  // console.log(allPages);
  const [pageNo, setPageNo] = useState(1);
  const baseUrl = `https://64307b10d4518cfb0e50e555.mockapi.io/modules?page=${pageNo}&limit=${pagePerLimit}`;
  // storing api data in a state variable
  const [data, setData] = useState([]);
  // console.log(data);
  useEffect(() => {
    axios
      .get(`${baseUrl}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pageNo]);

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
    console.log("dragged")
    console.log(nodeType)
  };
  return (
    <div className="flexflex-col justify-between">
      <div className=" w-full h-full my-2">
        {data.map((item) => {
          const { input_type, name, output_type } = item;
          return (
            <>
              <div
                className=" w-5/6 m-auto  rounded-lg	border-dotted border-2 border-gray-900	 text-center items-center  p-2 my-2 cursor-pointer flex flex-row  justify-between"
                onDragStart={(event) => onDragStart(event, JSON.stringify(item))}
                draggable
              >
                <span className=" ">{input_type}</span> <span> {name}</span>
                <span className=" p-2">{output_type}</span>
              </div>
            </>
          );
        })}
      </div>
      <Pagination allPages={allPages} pageNo={pageNo} setPageNo={setPageNo} />
    </div>
  );
};

export default ModuleList;
