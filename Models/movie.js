const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    genre: { type: String, required: true },
    year: { type: String, required: true },
    language: { type: String, required: true },
    imgURL: { type: String, required: true },
    t720File: { type: String },
    t1080File: { type: String },
    t4KFile: { type: String },
    season: { type: String },
    episodes: [String],
    tvShow: Boolean,
    youtube:{type:String},
    rating: { type: String },
  },
  { timestamps: true }
);

const movie = mongoose.model("Movie", MovieSchema);

module.exports = movie;
