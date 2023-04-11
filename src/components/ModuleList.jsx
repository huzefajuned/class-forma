import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import loading from "../Assets/loading.gif";

const ModuleList = () => {

  // Storing API Data In A State Variable
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const totalWrokflow = 100;
  const pagePerLimit = 5;

  // Base Url For Module List Data
  const baseUrl = `https://64307b10d4518cfb0e50e555.mockapi.io/modules?page=${pageNo}&limit=${pagePerLimit}`;

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
  };

  return (
    <>
      {data.length === 0 ? (
        <>
          <span className="w-full h-full block  justify-center text-center items-center">
            <img src={loading} alt="loading" /> <br />
            <button onClick={() => window.location.reload()}>
              Load Page.?
            </button>
          </span>
        </>
      ) : (
        <div className="flexflex-col justify-between">
          <div className=" w-full h-full my-2">
            {data.map((item, index) => {
              const { input_type, name, output_type, id } = item;
              return (
                <>
                  <div
                    key={id}
                    className=" flex flex-row  justify-between  w-5/6 m-auto  rounded-lg	border-dotted border-2 border-blue-600	 text-center items-center  my-2 cursor-pointer "
                    onDragStart={(event) =>
                      onDragStart(event, JSON.stringify(item))
                    }
                    draggable
                  >
                    <span className="rounded-lg	border-dotted border-2 border-blue-500 p-5 text-xl ">
                      {input_type}
                    </span>
                    <span className="">{name}</span>
                    <span className=" rounded-lg	border-dotted border-2 border-blue-500 p-5  text-xl">
                      {output_type}
                    </span>
                  </div>
                </>
              );
            })}
          </div>
          {/* Pagination Side */}
          <Pagination
            pageNo={pageNo}
            setPageNo={setPageNo}
          />
        </div>
      )}
    </>
  );
};

export default ModuleList;
