import express from "express"
import { getTrendingMovie } from "../controllers/movie.controller.js";
import { getMovieTrailers } from "../controllers/movie.controller.js";
import { getMovieDetails } from "../controllers/movie.controller.js";
import { getSimilarMovies } from "../controllers/movie.controller.js";
import { getMovieByCategory } from "../controllers/movie.controller.js";
const router =express.Router();



router.get("/trending",getTrendingMovie)
// as we are sending id in parameter thats why we are getting id  from req.params
router.get("/:id/trailers",getMovieTrailers);  // on the basied on id iwill get the speific trailer video
router.get("/:id/details",getMovieDetails);  // on the basied on id iwill get the speific trailer video
router.get("/:id/similar",getSimilarMovies);  // on the basied on id iwill get the speific trailer video
router.get("/:category",getMovieByCategory);  // on the basied on id iwill get the speific trailer video

export default router;
// /api/v1/movie/:id/similar