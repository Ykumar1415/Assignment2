import BasicForm from "./components/BasicForm";
import Table from "./components/table";
import { useEffect, useState } from "react";
import react from "react";
function App() {
  const [add, setadd] = useState(false);
  const [list , setlist] = useState([])
  let [change, setchange] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
   const x = await axios.get('http://localhost:3000/data')
    setRows(x.data)
    }
    fetchData()
 
  
     
  }, [])
  
  return (
    <div
      style={{
         display:"flex",
         flexDirection:"column",
      }}
    >
      <div className="app">
        {add == true? (
          <BasicForm list = {list} setlist = {setlist} change ={change} setchange = {setchange}/>
        ) : (
          <button style = {{justifySelf:"center", marginLeft:"45%"}}onClick={() => setadd(!add)}>Add</button>
        )}
      </div>{" "}
      <Table list = {list} setlist = {setlist} />
    </div>
  );
}

export default App;
