const user = require("../Models/user");
const Joi = require("joi");
const UserValidSchema = Joi.object({
  email: Joi.string().trim().required().min(1),
  password: Joi.string().trim().required().min(1),
});

const postUser = async (req, res) => {
  const payload = req.body;
  const { value, error } = UserValidSchema.validate(payload);
  if (error) {
    return res.status(406).send({ status: false, message: error.message });
  } else {
    const users = await user.find();
    if(value.email===users[0].email && value.password===users[0].password)  return res.status(201).send({ status: true });
    else  return res.status(401).send({ status: false ,message: 'Wrong Credentials' });
  }
};

const Usercontroller = {
  postUser,
};

module.exports = { Usercontroller };
