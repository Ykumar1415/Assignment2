import BasicForm from "./components/BasicForm";
import Table from "./components/table";
import { useEffect, useState } from "react";
import react from "react";
import axios from "axios";
import {
  BarLoader,
  DoubleBubble,
  SlidingPebbles,DoubleOrbit,HalfMalf
} from "react-spinner-animated";

import "react-spinner-animated/dist/index.css";
function App() {
  const [add, setadd] = useState(false);
  const [list, setlist] = useState([]);
  let [change, setchange] = useState(false);
  // loading set to true for 3 sec
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);

  // setTimeout(() => {
  //   setLoading(false);
  // }, [5000]);
  useEffect(() => {
    const fetchData = async () => {
      const x = await axios.get("http://localhost:3000/data");
      setRows(x.data);
        setLoading(false);
        console.log(x.data)
    };
    fetchData();
  }, []);
  

  return (
    <>
      {loading ? (
        <div style = {{height : "80vh", width : "80%", diaplay : "flex", justifyContent : "center", alignItems:"center", marginTop:"20%", marginLeft:"40%"}}>
        <HalfMalf
          text={"Loading..."}
          bgColor={"transparent"}
          color={"white"}
          center={false}
          width={"150px"}
          height={"150px"}
        /></div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            overflow:"hidden"
          }}
        >
          <div className="app">
            {add == true ? (
              <BasicForm
                list={list}
                setlist={setlist}
                change={change}
                setchange={setchange}
                rows = {rows}
              />
            ) : (
              <button
                style={{ justifySelf: "center", marginLeft: "45%" }}
                onClick={() => setadd(!add)}
              >
                Add
              </button>
            )}
          </div>{" "}
          <Table list={list}   setlist={setlist} />
        </div>
      )}
    </>
  );
}

export default App;
