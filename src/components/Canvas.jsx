import React, { useEffect, useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";

const Canvas = () => {
  const initialNodes = [
    {
      id: "1",
      type: "input",
      data: { label: "Input" },
      position: { x: 250, y: 10 },
      style: {},
    },
  ];
  let id = 0;
  const getId = () => `dndnode_${id++}`;
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  // console.log(nodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  //console.log("edges",edges)
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const onConnect = useCallback(
    (params) => {
      const targetNode = nodes.filter((elem) => {
        return params.target === elem.id;
      });
      console.log(targetNode);
      targetNode[0].style = { border: "2px solid blue" };
      return setEdges((eds) => addEdge(params, eds));
    },
    [nodes]
  );
  console.log(edges);
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      const parsedType = JSON.parse(type);

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
        animated: true,
        data: { label: parsedType.name },
        style: { border: "1px solid red" },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [reactFlowInstance]
  );
  const [variant, setVariant] = useState("dots");

  return (
    <div className="m-auto bg-white p-5 h-screen w-5/6 mx-2 rounded shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]">
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
              <Background color="#000000" variant={variant} />

              <Controls />
            </ReactFlow>
          </div>
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default Canvas;
