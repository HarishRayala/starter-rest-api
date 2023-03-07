const movie = require("../Models/movie");
const validationSchema = require("../validation");

const getMovie = async (req, res) => {
  const page = req.query.page || 1;
  const size = req.query.size || 6;
  const movieData = await movie
    .find({season:{$eq:null}})
    .sort({ createdAt: -1 })
    .skip((page - 1) * size)
    .limit(size)
    .lean()
    .exec();
  const totalpages = Math.ceil((await movie.find({season:{$eq: null}}).countDocuments()) / size);
  return res.status(201).send({ movieData, totalpages });
};

const getMovieByTitle = async (req, res) => {
  // console.log(req.params.title);
  const movieData = await movie.find({ title: req.params.title });
  res.send(movieData);
};

const postMovie = async (req, res) => {
  const payload = req.body;
  const { value, error } = validationSchema.createMovieSchema.validate(payload);
  if (error) {
    return res.status(406).send({ status: false, message: error.message });
  } else {
    const movies = await movie.create(payload);
    return res.status(201).send({ status: true, movies });
  }
};

const putMovie = async (req, res) => {
  const { id } = req.params;
  const data = await movie.updateOne({ _id: id }, req.body);
  res.send(data);
};

const deleteMovie = async (req, res) => {
  const { id } = req.params;
  await movie.deleteOne({ _id: id }, req.body);
  res.send("Deleted Successfully");
};

const searchMovie = async (req, res) => {
  const { s: searchTerm } = req.query;
  if (searchTerm && searchTerm.trim() !== "") {
    const page = req.query.page || 1;
    const size = req.query.size || 6;
    const movieData = await movie
      .find({ $text: { $search: searchTerm } })
      .skip((page - 1) * size)
      .lean()
      .exec();
    const totalpages = Math.ceil((await movie.find().countDocuments()) / size);
    return res.status(201).send({ movieData, totalpages });
  }
  return res.status(403).send({ status: false, message: "No title Entered" });
};

const MoviesController = {
  getMovie,
  getMovieByTitle,
  postMovie,
  putMovie,
  deleteMovie,
  searchMovie,
};

module.exports = { MoviesController };
