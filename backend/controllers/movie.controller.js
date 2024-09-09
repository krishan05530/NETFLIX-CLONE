import { fetchFromTMDB } from "../services/tmdb.service.js";

// we can use movie controller to do work of tv contoller ,  by getting type as argument
                                     //(type,req,res), type can be tv or movie, ${type}  , use in url
export async function getTrendingMovie(req,res)
{
    try{
  const data=await fetchFromTMDB('https://api.themoviedb.org/3/trending/movie/day?language=en-US');
 const randomMovie= data.results[Math.floor(Math.random()*data.results?.length)];

  res.json({  success:true,  content:randomMovie});
    }
    catch(error)
    {
        console.log("error in getTrendingMovie ", error.message);
      res.status(500).json({
        success:false,
        message:"Internal server Error in movie.controller.js",
        
      })
    }
}


export async function getMovieTrailers(req,res){
  const {id}=req.params;
  try{
const data =await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`)

res.json({
  success:true,trailers:data.results
})
}
catch(error)
{
  if(error.message.include("404")){     // if we dont find anything return null
    return res.status(404).send(null);
  }

  res.status(500).json({success:false,message:"internal server error"})
}
}

export async function getMovieDetails(req,res) {
   
  const {id}=req.params;  // id is givien in the route params

  try{
    const data =await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`)
    res.status(200).json({
     success:true, content:data
    })

  }
  catch(error)
  {
    if(error.message.include("404")){     // if we dont find anything return null
      return res.status(404).send(null);
    }

    res.status(500).json({success:false,message:"internal server error"})
  
  }
}

export async function getSimilarMovies(req,res) {
   
  const {id}=req.params;  // id is givien in the route params

  try{
    const data =await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`)
    res.status(200).json({
      success:true, content:data
     })

  }
  catch(error)
  {
 
   res.status(500).json({success:false,message:"internal server error"})
  
  }
}


//  

export async function getMovieByCategory(req,res) {
   
  const {category}=req.params;  // id is givien in the route params

  try{
    const data =await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`)
    res.status(200).json({
      success:true, content:data
     })

  }
  catch(error)
  {
   res.status(500).json({success:false,message:"internal server error"})
  
  }
}