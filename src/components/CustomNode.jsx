import React, { memo } from "react";
import { Handle, Position } from "reactflow";

const CustomNode = ({ data }) => {
  return (
    <>
      <Handle
        type="target"
        position={Position.top}
        style={{
          top: 7,
          background: "#555",
          border: "2px solid black",

        }}
      />
      <div className=" flex flex-row  justify-between  w-full bg-white m-auto  rounded-lg	border-dotted border-2 border-gray-600	 text-center items-center  my-2 cursor-pointer ">
        <span className=" border-r-2 border-gray-400 p-3 text-md ">
          {data.source}
        </span>
        <span className="   text-xs">
          {" "}
          {data.label}
        </span>
        <span className=" border-l-2 border-gray-400 p-3  text-md">
          {data.target}
        </span>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={{
          top: 55,
          background: "#555",
          border: "2px solid green",
        //   fontSize: "4px",
        }}
      />
    </>
  );
};

export default memo(CustomNode);
