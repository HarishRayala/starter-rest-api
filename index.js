require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const connect = require("./config/db");
var cors = require("cors");
const { moviesRouter } = require("./Routes/Movies.route");
const { userRouter } = require("./Routes/User.route");

app.use(cors());

app.use("/movies", moviesRouter);

app.use("/login",userRouter)

const PORT = process.env.PORT || 3000
// console.log(PORT)
app.listen(PORT, async () => {
  try {
    await connect();
    console.log(`Server is running on ${PORT}`);
  } catch (err) {
    console.log(err);
  }
});
