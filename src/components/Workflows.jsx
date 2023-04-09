import React, { useEffect, useState } from "react";
import axios from "axios";
import loading from "../Assets/loading.gif";
import SingleWorkflow from "./SingleWorkflow";
import FlowHeader from "./FlowHeader";

const baseUrl = "https://64307b10d4518cfb0e50e555.mockapi.io/workflow";

const Workflows = () => {
  // storing api data in a state variable
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`${baseUrl}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <FlowHeader />
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full   text-center text-sm font-light">
                <tbody>
                  {data.length === 0 ? (
                    <div className="my-20 mx-10  w-full h-full p-4 flex flex-row justify-center text-center items-center">
                      <img src={loading} alt="loading" />
                    </div>
                  ) : (
                    <>
                      <SingleWorkflow data={data} setDat={setData} />
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Workflows;
