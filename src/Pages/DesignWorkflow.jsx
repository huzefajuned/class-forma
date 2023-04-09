import React, { useEffect, useState, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ModuleList from "../components/ModuleList";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";
const baseUrl = "https://64307b10d4518cfb0e50e555.mockapi.io/workflow/";

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { input_type: "", name: "Input", output_type: "" },
    position: { x: 250, y: 5 },
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;


const DesignWorkflow = () => {
  const navigate = useNavigate();
  const [flowdata, setFlowdata] = useState([]);
  // console.log(flowdata);
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

  //
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  console.log("all nodes", nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data:{type}
        // data: { name: `${type}SS` },
        // data: { label: `${type}` },
      };

      setNodes((nds) => nds.concat(newNode)); 
    },
    [reactFlowInstance]
  );

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

        <div className="m-auto bg-gray-700 p-5 h-screen w-5/6 mx-2 rounded shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]">
          <div className="dndflow">
            <ReactFlowProvider>
              <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  onConnect={onConnect}
                  onInit={setReactFlowInstance}
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                  fitView
                >
                  <Controls />
                </ReactFlow>
              </div>
            </ReactFlowProvider>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesignWorkflow;
