// const express=require('express');  // commonJS
import express from 'express'; //  to use this we types  "type": "module" in pacage.json file

// now we dont need to use this line const express=require('express');
import authRoutes from "./routes/auth.route.js"
import movieRoutes from "./routes/movie.route.js"
import searchRoutes from "./routes/search.route.js"

import tvRoutes from "./routes/tv.route.js"
import {protectRoute} from './middleware/protectRoute.js';
import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';
import cookieParser from 'cookie-parser';



// creating app
const app = express();
const PORT = ENV_VARS.PORT

app.use(express.json()); // will allow parse to req.body
app.use(cookieParser());  // so that we can parse/fetch the cookie , used in protectRoute middleware

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie",protectRoute, movieRoutes);
app.use("/api/v1/tv",protectRoute ,tvRoutes);
app.use("/api/v1/search",protectRoute ,searchRoutes);





app.listen(PORT, () => {
  console.log("server started at" + PORT);
  connectDB();
})


// 200:-> success
// 500 internal server error  as response for api call
// 400 :-> bad request , server will not process the request ue to something that is client error
 // 404 not found






// updated the package .json
// 1 :->    "main": "backend/server.js",  , chnaged the name of file form main.js to server.js
// 2:-> "dev":"node backend/server.j" added this in Script of packag.json
// 3 // chnaged the type to "module" int packgae.json
// now we can run this file form this sript
// install npm install nodemon -D  , -D fro devDependency
// node mon is used so we dont need to refresh again again

// add nodemon in the
// to start use npm run dev




// learning in tmdb server
// bearer <toke>  there shold be space after Bearer oterwise it will give error




// frontend 
// npm create vite@latest .  
// this . denote that , to download into curent folder
// npm i , to install all the node module
// react hot toast
// lucide icon
// react player , to allow to play video from youtube to play
// react router-dom to have router in our react APP
// zustand
// start use npm run dev


