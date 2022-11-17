const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
// const NewsModel = require("./models/NewsModel");
dotenv.config();

// express json parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: "*",
    // origin: [
    //   "http://localhost:3000",
    //   "http://192.168.1.8:3000",
    // ],
    // origin: "http://10.13.1.63:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE", "PATCH"],
    credentials: true,
  })
);



// main endpoint
// bruh 0 accessed in the very beginning when total amount is necessary in the client
// bruh is accessed in each load more request


//! IMPORT ROUTER
const generalRoute = require("./routes/general.js");
const xlsx = require("./routes/xls.js");
// const userAPI = require("./routes/UserAPI.js");
// const cetak = require("./routes/cetak");
// const downloadXls = require("./routes/xlsx");
// const masterfile = require("./routes/masterfile.js");
//USE ROUTER
app.use("/", generalRoute);
app.use("/xlsx", xlsx);

mongoose
  .connect("mongodb://127.0.0.1:27017/PelayananDB", {
    serverSelectionTimeoutMS: 3000,
  })
  .then(() => console.log("connected to pelayananDB!"))
  .catch((err) => {
    console.log("DB failed to connect!", err);
    err.message = {
      title: "database error",
      desc: "contact the server administrator!",
    };
  });



const PORT = 2000;
app.listen(PORT, () =>
  console.log(`connected to port http://localhost:${PORT}`)
);
