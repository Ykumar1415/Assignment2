import React, { useState } from 'react';
import './table.css';
import TableRow from './tablerows';
import axios from 'axios';
import { useEffect } from 'react';
const Table = ({list, setlist}) => {
  const [rows, setRows] = useState(list);
  const [sendarray, setsendarray] = useState([]);
  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };
  const [Array, setArray] = useState([]);
 
  const handleUpdate = (id, field, value) => {
    setRows(rows.map((row) => {
      if (row.id === id) {
        return { ...row, [field]: value };
      }
      return row;
    }));
  };
  useEffect(() => {
    const fetchData = async () => {
   const x = await axios.get('http://localhost:3000/data')
    setRows(x.data)
    }
    fetchData()

  }, [])
  

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      document.querySelectorAll('.checkbox').forEach((checkbox) => {
        checkbox.checked = true;
      });
    } else {
      document.querySelectorAll('.checkbox').forEach((checkbox) => {
        checkbox.checked = false;
      });
    }
  };

  return (
    <div className="table-container" style = {{overflow : "visible"}}>
    <div>{ rows.length >0 && <table>
        <thead style = {{width : "100%", display : "flex",  }}>
          <tr className = "master">
            <th><input type="checkbox" onChange={handleSelectAll} disabled style = {{height : "25px", width : "25px", bgcolor : "blue"}}/></th>
            <th style = {{width : "180px"}}>ID</th>
            <th style = {{width : "180px"}}>Name</th>
            <th style = {{width : "180px"}}>Phone Number</th>
            <th style = {{width : "180px"}}>Email</th>
            <th style = {{width : "200px"}}>Hobbies</th>
            <th style = {{width : "180px"}}>Update/Delete</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => 
            
            (
            <TableRow key={row.id} row={row}   sendarray = {sendarray} setsendarray = {setsendarray} handleDelete={handleDelete} handleUpdate={handleUpdate} Array = {Array} setArray = {setArray} />
          
         

         ))}
        </tbody>
      </table>}
      </div> 
      <div>
     {  (rows.length <=0) ? <h1>No data found</h1> :(<></>)}
        <button
        style = {{backgroundColor :"whitesmoke", color : "black", border : "1px solid black", borderRadius : "5px", height : "30px", width : "100px", marginLeft : "10px", marginTop : "10px",display :(rows.length >0) ? "block" : "none"}}
            onClick={async () =>
             { 
              if(sendarray.length == 0)
              {
                alert("Please select atleast one row")
              }
              else
              {
              axios
                .post(`http://localhost:3000/send-email`, {
                  sendarray : sendarray,
                })
                .then(() => {
                  alert("success");
                })
             }}}
          >
           Send
          </button>
          </div>
    </div>
  );
};

export default Table;