const express = require("express");
const { TvShowController } = require("../Controller/TvShow.controller");
const TvShowRouter = express.Router();
TvShowRouter.use(express.json());

TvShowRouter.get("/", TvShowController.getTvShow);

// TvShowRouter.get("/search", TvShowController.searchTvShow);

TvShowRouter.post("/create", TvShowController.postTvShow);

TvShowRouter.put("/:id", TvShowController.putTvShow);

TvShowRouter.delete("/:id", TvShowController.deleteTvShow);

module.exports = { TvShowRouter };
