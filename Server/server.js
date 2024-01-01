const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongodb Connection success!");
});

const pharmacistRouter = require("./routes/pharmacists.js");
const invoiceRouter= require("./routes/invoices.js");
const medicineRouter= require("./routes/medicines.js");


app.use("/pharmacist", pharmacistRouter);
app.use("/invoice", invoiceRouter);
app.use("/medicine", medicineRouter);


app.listen(PORT, () => {
  console.log(`Server is up and running on port number: ${PORT}`);
});
