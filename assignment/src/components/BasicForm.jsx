import React, { useState } from "react";
import axios from "axios";
import "./Form.css";

const Form = ({ change, setchange}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    console.log("hello");
    e.preventDefault();
    axios
      .post("http://localhost:3000/create", {
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
        alert("error occured ");
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
