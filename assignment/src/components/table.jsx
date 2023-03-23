import React, { useState } from 'react';
import './table.css';
import TableRow from './tablerows';
import axios from 'axios';
import { useEffect } from 'react';
const Table = ({list, setlist}) => {
  const [rows, setRows] = useState(list);

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
    <div className="table-container" style = {{overflow : "scroll"}}>
     { rows.length >0 && <table>
        <thead style = {{width : "100%", display : "flex",  }}>
          <tr className = "master">
            <th><input type="checkbox" onChange={handleSelectAll} style = {{height : "25px", width : "25px"}}/></th>
            <th style = {{width : "214px"}}>ID</th>
            <th style = {{width : "214px"}}>Name</th>
            <th style = {{width : "214px"}}>Phone Number</th>
            <th style = {{width : "214px"}}>Email</th>
            <th style = {{width : "214px"}}>Hobbies</th>
            <th style = {{width : "214px"}}>Update/Delete</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <TableRow key={row.id} row={row} handleDelete={handleDelete} handleUpdate={handleUpdate} Array = {Array} setArray = {setArray} />
          ))}
        </tbody>
      </table>}
        <button
            onClick={() =>
             { axios
                .post(`http://localhost:3001//send-email`, {
                selectedDataIds : Array,
                })
                .then(() => {
                  alert("success");
                })
            }}
          >
           Send
          </button>
    </div>
  );
};

export default Table;