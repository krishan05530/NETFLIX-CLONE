import express from "express";
const router = express.Router();
import { getSearchHistory } from "../controllers/search.controller.js";
import { removeItemFromSearchHistory } from "../controllers/search.controller.js";
import { searchPerson,searchMovie,searchTv } from "../controllers/search.controller.js";
// aaran paul
router.get("/person/:query",searchPerson);
router.get("/movie/:query",searchMovie);
router.get("/tv/:query",searchTv);

router.get("/history",getSearchHistory);
router.delete("/history/:id", removeItemFromSearchHistory);

export default router;

