import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";
// ?custom nodes
import Custom_Node from "./CustomNode";

const defaultNodeStyle = {
  width: "200px",
  border: "2px solid green",
};
const initialNodes = [
  {
    id: "1",
    type: "input",
    position: { x: 250, y: 10 },
    data: { label: "Top Node", source: "aa", target: "A" },
    style: { width: "200px" },
  },
];

const Canvas = () => {
  const nodeTypes = useMemo(() => ({ custom: Custom_Node }), []);

  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const reactFlowWrapper = useRef(null);
  let id = 0;
  const getId = () => `dndnode_${id++}`;

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Trigger This Function For Connecting To Another Node.
  const onConnect = useCallback(
    (params) => {
      const targetNode = nodes.filter((elem) => {
        return params.target === elem.id;
      });
      console.log(targetNode);
      targetNode[0].style = { width: "200px", border: "1px solid #87CEEB", borderRadius:"100px" };
      return setEdges((eds) => addEdge(params, eds));
    },
    [nodes]
  );
  // Trigger This Function For DragOver A Node.
  const onDragOver = useCallback((event) => {
    
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Trigger This Function For onDrop A Node.
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      const parsedType = JSON.parse(type);
      console.log("parsedType ", parsedType);

      // check if the dropped element is invalid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type: "custom",
        position,
        style: { width: "200px", border: "1px solid tomato", borderRadius:"100px" },

        data: {
          label: `${parsedType.name}`,
          source: `${parsedType.input_type}`,
          target: `${parsedType.output_type}`,
        },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [reactFlowInstance]
  );

  return (
    <>
      <div className=" bg-black m-auto p-5 h-screen w-5/6 mx-2 rounded shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]">
        <div className="flex w-full  h-full ">
          <div className="dndflow">
            <ReactFlowProvider>
              <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                <ReactFlow
                  nodeTypes={nodeTypes}
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
                  <Background variant="dots" gap={12} size={2} />

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

export default Canvas;
