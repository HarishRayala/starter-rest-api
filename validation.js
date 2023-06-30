const Joi = require("joi");

const createMovieSchema = Joi.object({
  title: Joi.string().trim().required().min(1),
  genre: Joi.string().trim().required().min(1),
  year: Joi.number().required(),
  rating: Joi.number().required(),
  language: Joi.string().trim().min(1).required(),
  imgURL: Joi.string().trim().min(1).required(),
  t720File: Joi.string().min(1).trim(),
  t1080File: Joi.string().min(1).trim(),
  t4KFile: Joi.string().min(1).trim(),
  youtube: Joi.string().min(1).trim(),
});

const createTvShowSchema = Joi.object({
  title: Joi.string().trim().required().min(1),
  season: Joi.string().trim().required().min(1),
  genre: Joi.string().trim().required().min(1),
  year: Joi.number().required(),
  language: Joi.string().trim().min(1).required(),
  imgURL: Joi.string().trim().min(1).required(),
  episodes: Joi.array().items(Joi.string().trim().min(1)).required(),
});

module.exports = { createMovieSchema, createTvShowSchema };
