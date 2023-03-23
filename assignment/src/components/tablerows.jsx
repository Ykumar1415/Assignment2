import React from "react";
import "./table.css";
import { useState } from "react";
import axios from "axios";
function tablerows({ row, Array, setArray, handleDelete, handleUpdate  }) {
  const [update, setupdate] = useState(true);

  return (
    <div>
      <tr key={row.id}>
        <td>
          <input type="checkbox" className="checkbox" onChange = {()=>{
            if(document.querySelector('.checkbox').checked){
              setArray([...Array, row])
              
            }else{
              setArray(Array.filter((item) => item.id !== row.id))

            }
          }}/>
        </td>
        <td>{row.id}</td>
        <td>
          <input
            type="text"
            value={row.name}
            disabled={update}
            onChange={(event) =>
              handleUpdate(row.id, "name", event.target.value)
            }
          />
        </td>
        <td>
          <input
            type="text"
            value={row.phone}
            onChange={(event) =>
              handleUpdate(row.id, "phone", event.target.value)
            }
            disabled={update}
          />
        </td>
        <td>
          <input
            type="text"
            value={row.email}
            onChange={(event) =>
              handleUpdate(row.id, "email", event.target.value)
            }
            disabled={update}
          />
        </td>
        <td>
          <input
            type="text"
            value={row.email}
            onChange={(event) =>
              handleUpdate(row.id, "email", event.target.value)
            }
            disabled={update}
          />
        </td>

        <td>
          <input
            type="text"
            value={row.hobbies}
            onChange={(event) =>
              handleUpdate(row.id, "hobbies", event.target.value)
            }
            disabled={update}
          />
        </td>
        <td>
          <button
            onClick={() => {
              setupdate(!update);
              if (update) {
                if (
                  row.name === "" ||
                  row.phone === "" ||
                  row.email === "" ||
                  row.hobbies === ""
                ) {
                  alert("Please fill all the fields");
                } else {
                  axios
                    .post(`http://localhost:3001/data/:${row._id}`, {
                      id: row.id,
                      name: row.name,
                      phone: row.phone,
                      email: row.email,
                      hobbies: row.hobbies,
                    })
                    .then(() => {
                      alert("success");
                    });
                }
              }
            }}
          >
            {!update ? "Update" : "Edit"}
          </button>
          <button
            onClick={() =>
             { axios
                .post(`http://localhost:3000/data/:${row._id}`, {
                  id: row.id,
                  name: row.name,
                  phone: row.phone,
                  email: row.email,
                  hobbies: row.hobbies,
                })
                .then(() => {
                  alert("success");
                })
            }}
          >
            Delete
          </button>
        </td>
      </tr>{" "}
    </div>
  );
}

export default tablerows;
