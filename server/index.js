// Import required packages
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");


// Create Express app
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
require('dotenv').config();
// Connect to MongoDB
mongoose
  .connect(process.env.mongouri, {
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
const autoIncrement = require('mongoose-sequence')(mongoose);
const autopopulate = require('mongoose-autopopulate');
const schema = new mongoose.Schema({
  // sequenceNumber: {
  //   type: Number,
  //   unique: true
  // },
    id : {type : String },
    name: {type : String, required : true},
    phone: {type : String, required : true},
    email:{type : String, required : true},
    hobbies: {type : String, required : true},
});
// schema.plugin(autoIncrement, {
//   id: 'sequenceNumber',
//   inc_field: 'sequenceNumber',
//   start_seq: 1
// });
// schema.plugin(autopopulate);
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
    id: req.body.id,
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
    console.log(data)
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
    id: req.body.id,
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

app.delete("/data/delete/:id", (req, res) => {
  // Delete data entry from database
  const id = req.params.id;
console.log(id)
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
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "your_email@gmail.com",
//     pass: "your_email_password",
//   },
// });

// Define route to send email
app.post("/send-email", async (req, res) => {
  console.log(req.body.sendarray)
  // Retrieve selected row/rows data from database
  // const selectedDataIds = req.body.selectedDataIds;
 const data = await  Data.find({ _id: { $in: req.body.sendarray } })
    // .then((data) => {
      // Construct email message with data
      // const message = {
      //   from: "your_email@gmail.com",
      //   to: "info@redpositive.in",
      //   subject: "Selected data",
      //   text: JSON.stringify(data),
      // };

      // Send email
    //   transporter.sendMail(message, (error, info) => {
    //     if (error) {
    //       console.log("Error sending email:", error);
    //       res.sendStatus(500);
    //     } else {
    //       console.log("Email sent:", info.response);
    //       res.sendStatus(200);
    //     }
    //   });
    // })
    // .catch((error) => {
    //   console.log("Error retrieving data:", error);
    //   res.sendStatus(500);
    // });
    var transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: "YORG153@outlook.com",
        pass: "987654321aA@",
      },
    });
    var mailOptions = {
      from: '"Yogesh Saini" <YORG153@outlook.com>', // sender address
      to: "email", // list of receivers
      subject: "Data",
      template: "You are successfully Got data", // the name of the template file i.e email.handlebars
      // text:  `Name: ${data[0].name} Phone: ${data[0].phone} Email: ${data[0].email} Hobbies: ${data[0].hobbies}`,
      html:`<div>${data} </div>`,
      context: {
        name: "Yogesh", // replace {{name}} with Adebola
        company: "MyComp", // replace {{company}} with My Company
      },
    };

    // trigger the sending of the E-mail
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: " + info.response);
      res.status(200).json("success");
    });
   

});

// Start server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
