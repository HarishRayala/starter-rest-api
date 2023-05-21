const express = require("express");
const { MoviesController } = require("../Controller/Movies.controller");
const moviesRouter = express.Router();
moviesRouter.use(express.json());

moviesRouter.get("/", MoviesController.getMovie);

moviesRouter.get("/updateRating", MoviesController.updateRating);

moviesRouter.get("/search", MoviesController.searchMovie);

moviesRouter.get("/deepSearch", MoviesController.deepSearchMovie);

moviesRouter.post("/create", MoviesController.postMovie);

moviesRouter.put("/:id", MoviesController.putMovie);

moviesRouter.delete("/:id", MoviesController.deleteMovie);

module.exports = { moviesRouter };
