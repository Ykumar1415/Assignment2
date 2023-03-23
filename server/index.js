// Import required packages
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");


// Create Express app
const app = express();
app.use(cors());
app.use(morgan("dev"));
// Connect to MongoDB
mongoose
  .connect("mongodb+srv://Yk:123@cluster0.zelqca0.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });

// Define schema for data
const schema = new mongoose.Schema({
    
    name: {type : String, required : true},
    phone: {type : String, required : true},
    email:{type : String, required : true},
    hobbies: {type : String, required : true},
});

// Define model for data
const Data = mongoose.model("Data", schema);

// Parse incoming requests with body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes for API


app.post("/create", (req, res) => {
  // Create new data entry and save to database
console.log(req.body)
  const newData = new Data({
    name: req.body.name,
     phone: req.body. phone,
    email: req.body.email,
    hobbies: req.body.hobbies,
  });

  newData
    .save()
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("Error creating data:", error);
      res.sendStatus(500);
    });
});
app.get("/data", (req, res) => {
  // Retrieve all data from database
  Data.find()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log("Error retrieving data:", error);
      res.sendStatus(500);
    });
});
app.put("/data/:id", (req, res) => {
  // Update data entry in database
  const id = req.params.id;
  const updatedData = {
    name: req.body.name,
     phone: req.body. phone,
    email: req.body.email,
    hobbies: req.body.hobbies,
  };

  Data.findByIdAndUpdate(id, updatedData)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("Error updating data:", error);
      res.sendStatus(500);
    });
});

app.delete("/data/:id", (req, res) => {
  // Delete data entry from database
  const id = req.params.id;

  Data.findByIdAndDelete(id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("Error deleting data:", error);
      res.sendStatus(500);
    });
});
const nodemailer = require("nodemailer");

// Define email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your_email@gmail.com",
    pass: "your_email_password",
  },
});

// Define route to send email
app.post("/send-email", (req, res) => {
  // Retrieve selected row/rows data from database
  const selectedDataIds = req.body.selectedDataIds;
  Data.find({ _id: { $in: selectedDataIds } })
    .then((data) => {
      // Construct email message with data
      const message = {
        from: "your_email@gmail.com",
        to: "info@redpositive.in",
        subject: "Selected data",
        text: JSON.stringify(data),
      };

      // Send email
      transporter.sendMail(message, (error, info) => {
        if (error) {
          console.log("Error sending email:", error);
          res.sendStatus(500);
        } else {
          console.log("Email sent:", info.response);
          res.sendStatus(200);
        }
      });
    })
    .catch((error) => {
      console.log("Error retrieving data:", error);
      res.sendStatus(500);
    });
});

// Start server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
