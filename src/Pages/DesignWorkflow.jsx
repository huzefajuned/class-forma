import React, { useEffect, useState, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ModuleList from "../components/ModuleList";
import Canvas from "../components/Canvas";

const baseUrl = "https://64307b10d4518cfb0e50e555.mockapi.io/workflow/";
const DesignWorkflow = () => {
  const navigate = useNavigate();
  const [flowdata, setFlowdata] = useState([]);
  const location = useLocation();
  const id = location.state;

  useEffect(() => {
    axios
      .get(`${baseUrl}${id}`)
      .then((res) => {
        setFlowdata(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <>
      <div className="flex bg-gradient-to-r from-blue-200 to-cyan-200 border-2 p-1 ">
        <div className="bg-white text-black h-screen w-1/4 rounded shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]">
          <span
            className="max-w-full  p-1 m-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            ← Go Back
          </span>
          <h1 className="font-serif  text-xl mx-4 my-10 ">
            WorkFlow Name:-
            <span className=" font-xl font-bold underline">
              {flowdata?.data?.name}
            </span>
          </h1>
          <span className=" text-center text-xl p-2 mx-5 ">Modules</span>
          <ModuleList />
        </div>
        {/* #Canvas for Drag and Drop.. */}
        <Canvas />
      </div>
    </>
  );
};

export default DesignWorkflow;
