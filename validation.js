const Joi = require("joi");

const createMovieSchema = Joi.object({
  title: Joi.string().trim().required().min(1),
  genre: Joi.string().trim().required().min(1),
  year: Joi.number().required(),
  language: Joi.string().trim().min(1).required(),
  imgURL: Joi.string().trim().min(1).required(),
  t720File: Joi.string().min(1).trim(),
  t1080File: Joi.string().min(1).trim(),
  t4KFile: Joi.string().min(1).trim(),
});

module.exports = createMovieSchema;

//   title: { type: String, required: true },
//   genre: { type: String, required: true },
//   year: { type: String, required: true },
//   language: { type: String, required: true },
//   imgURL: { type: String, required: true },
//   t720File: { type: String },
//   t1080File: { type: String },
//   t4KFile: { type: String },
