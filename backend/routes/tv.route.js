import express from 'express';

import { getTrendingTv } from '../controllers/tv.controller.js';
import { getTvTrailers } from '../controllers/tv.controller.js';
import { getTvDetails } from '../controllers/tv.controller.js';
import { getSimilarTvs } from '../controllers/tv.controller.js';
import { getTvsByCategory } from '../controllers/tv.controller.js';

const router =express.Router();

router.get("/trending",getTrendingTv)
router.get("/:id/trailers",getTvTrailers);  // on the basied on id iwill get the speific trailer video
router.get("/:id/details",getTvDetails);  // on the basied on id iwill get the speific trailer video
router.get("/:id/similar",getSimilarTvs);  // on the basied on id iwill get the speific trailer video
router.get("/:category",getTvsByCategory);  // on the basied on id iwill get the speific trailer video


export default router;