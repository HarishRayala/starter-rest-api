require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const connect = require("./config/db");
var cors = require("cors");
const { moviesRouter } = require("./Routes/Movies.route");

app.use(cors());

app.use("/movies", moviesRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  try {
    await connect();
    console.log(`Server is running on ${PORT}`);
  } catch (err) {
    console.log(err);
  }
});
