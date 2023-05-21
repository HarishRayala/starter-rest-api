const movie = require("../Models/movie");
const validationSchema = require("../validation");

const getMovie = async (req, res) => {
  const page = req.query.page || 1;
  const size = req.query.size || 6;
  const movieData = await movie
    .find({ season: { $eq: null } })
    .sort({ createdAt: -1 })
    .skip((page - 1) * size)
    .limit(size)
    .lean()
    .exec();
  const totalpages = Math.ceil(
    (await movie.find({ season: { $eq: null } }).countDocuments()) / size
  );
  return res.status(201).send({ movieData, totalpages });
};

const updateRating = async (req, res) => {
  const movieData = await movie.find().lean().exec();
  try {
    for (const eachMovie of movieData) {
      if (eachMovie.rating) continue;
      let url = `https://omdbapi.com/?t=${eachMovie.title}&apikey=8d18db36`;
      let res = await fetch(url);
      let data = await res.json();

      if (data.imdbRating) {
        await movie.updateOne(
          { _id: eachMovie._id },
          { rating: data.imdbRating }
        );
      }
    }
    return res.status(201).send({ status: "success" });
  } catch (err) {
    console.log(err);
    return res.status(501).send({ status: "failed" });
  }
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

const deepSearchMovie = async (req, res) => {
  const { s: searchTerm } = req.query;
  console.log("searchTerm:", searchTerm);
  if (searchTerm && searchTerm.trim() !== "") {
    const searchRequest = await fetch(
      `https://yts.mx/api/v2/list_movies.json?limit=50&sort_by=year&query_term=${searchTerm.trim()}`
    );
    const json = await searchRequest.json();
    return res.status(201).send(json);
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
  deepSearchMovie,
  updateRating,
};

module.exports = { MoviesController };
