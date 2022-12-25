const express = require("express");
const { Usercontroller } = require("../Controller/User.controller");

const userRouter = express.Router();
userRouter.use(express.json());

userRouter.post("/", Usercontroller.postUser);

module.exports = { userRouter };