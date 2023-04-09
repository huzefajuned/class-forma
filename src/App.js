import "./App.css";
import Workflows from "./components/Workflows";
import { Route, Routes } from "react-router-dom";
import FlowHeader from "./components/FlowHeader";
import DesignWorkflow from "./Pages/DesignWorkflow";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Workflows />} />
        <Route path="/DesignWorkflow/:id" element={<DesignWorkflow />} />
      </Routes>
    </>
  );
}

export default App;
