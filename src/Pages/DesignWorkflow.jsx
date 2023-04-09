import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const baseUrl = "https://64307b10d4518cfb0e50e555.mockapi.io/workflow/";

const DesignWorkflow = () => {
  const [flowdata, setFlowdata] = useState([]);
  console.log(flowdata);
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
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam libero amet
      dolorem quae blanditiis dolor! Animi corporis ut excepturi nesciunt eius
      dolor facilis cum voluptates iste quos? Eligendi, tempora optio?
    </div>
  );
};

export default DesignWorkflow;
