require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

app.get("/", (req, res) => {
  res.send(
    "<h1>Welcome to Simple REST API </h1> <br>Please go to the /data endpoint for further communication"
  );
});

const firstRouter = require("./routes/data");
app.use("/data", firstRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server Started at http://localhost:${process.env.PORT}`);
});
