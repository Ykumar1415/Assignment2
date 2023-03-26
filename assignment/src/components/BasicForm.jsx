import React, { useState } from "react";
import axios from "axios";
import "./Form.css";

const Form = ({ change, setchange,rows }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [error, setError] = useState("");
// console.log(rows.length)
  const handleSubmit = async (e) => {
    // console.log("hello");
    e.preventDefault();
    // length of array in js 
    if(phone.length > 10){
      alert("phone number should be less than 10 digits");
      return ; 
    }
    if(phone.length < 10){
      alert("phone number should be greater than 10 digits");
      return ; 
    }
   for(let i = 0; i < phone.length; i++){
      if(phone[i] < 0 || phone[i] > 9){
        alert("phone number should contain only digits");
        return ; 
      }
    }
   
    axios
      .post("http://localhost:3000/create", {
        id:  rows.length >0 ? rows.length + 1 : 1,
        name: name,
        phone: phone,
        email: email,
        hobbies: hobbies,
      })
      .then(() => {
        
        alert("success");
        window.location.reload();
      }).catch((err) => {
        console.log(err);
        // alert(err);
      });
    // Authenticate with Firebase here
    // firebase
    //   .auth()
    //   .signInWithEmailAndPassword(email, password)
    //   .then((userCredential) => {
    //     // Clear form fields
    //     setName("");
    //     setPhone("");
    //     setEmail("");
    //     setHobbies("");
    //     setError("");
    //     console.log("Authenticated successfully!");
    //   })
    //   .catch((error) => {
    //     setError(error.message);
    //   });
  };

  return (
    <div className="form-container">
      <h1>My Form</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="phone">Phone Number:</label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="hobbies">Hobbies:</label>
        <textarea
          id="hobbies"
          value={hobbies}
          onChange={(e) => setHobbies(e.target.value)}
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Form;
