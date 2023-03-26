import React from "react";
import "./table.css";
import { useState } from "react";
import axios from "axios";
import {
  BarLoader,
  DoubleBubble,
  SlidingPebbles,DoubleOrbit,HalfMalf
} from "react-spinner-animated";
function tablerow1s({ row, sendarray, setsendarray  }) {
  const [update, setupdate] = useState(true);
  const [row1, setrow1] = useState(row);
  const [loading, setLoading] = useState(false);
 
 console.log(row1)
  return (
    <div key={row1._id}>
      {loading ? (
        <div style = {{   diaplay : "flex", justifyContent : "center", alignItems:"center",   marginLeft:"40%"}}>
        <HalfMalf
          text={"Loading..."}
          bgColor={"white"}
          color={"white"}
          center={false}
          width={"150px"}
          height={"150px"}
        /></div>
      ) : (
      <tr >
        <td>
          <input
            type="checkbox"
            className="checkbox"
            onChange={() => {
              console.log(sendarray)
              setsendarray([...sendarray, row1._id]); 
              console.log(row1)
            }}
          />
        </td>
        <td>{}</td>
        <td>
          <input
            type="text"
            value={row1.id}
            disabled={true}
            onChange={(event) =>
              setrow1({...row1, id : event.target.value})
              
            }
          />
        </td>
        <td>
          <input
            type="text"
            value={row1.name}
            onChange={(event) =>
              setrow1({...row1 , name: event.target.value})
            }
            disabled={update}
          />
        </td>
        <td>
          <input
            type="text"
            value={row1.phone}
            onChange={(event) =>
              setrow1({...row1 , phone : event.target.value})
            }
            disabled={update}
          />
        </td>
        <td>
          <input
            type="text"
            value={row1.email}
            onChange={(event) =>
               setrow1({...row1 ,  email : event.target.value})
            }
            disabled={update}
          />
        </td>

        <td>
          <input
            type="text"
            value={row1.hobbies}
            onChange={(event) =>
              setrow1({row1 ,  hobbies : event.target.value})
            }
            disabled={update}
          />
        </td>
        <td>
          <button
            onClick={async () => {
              await setupdate(!update);
              
              if (!update) {
                if (
                  row1.name === "" ||
                  row1.phone === "" ||
                  row1.email === "" ||
                  row1.hobbies === ""
                ) {
                  alert("Please fill all the fields");
                } else {
                console.log(row1)
                setLoading(true)
                await   axios
                    .put(`http://localhost:3000/data/${row1._id}`, {
                      id: row1._id,
                      name: row1.name,
                      phone: row1.phone,
                      email: row1.email,
                      hobbies: row1.hobbies,
                    })
                    .then(() => {
                      alert("success");
                      setLoading(false)
                       window.location.reload();
                    });
                }
              }
            }}
          >
            {!update ? "Update" : "Edit"}
          </button>
          <button
            onClick={() => {
              setLoading(true)
              axios
                .delete(`http://localhost:3000/data/delete/${row1._id}`, {
                  
                  name: row1.name,
                  phone: row1.phone,
                  email: row1.email,
                  hobbies: row1.hobbies,
                })
                .then(() => {
                  alert("success");
                  setLoading(false)
                  window.location.reload();
                });
            }}
          >
            Delete
          </button>
        </td>
      </tr> 
      )}
    </div>
  );
}

export default tablerow1s;
