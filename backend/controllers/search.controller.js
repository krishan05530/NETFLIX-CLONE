import { fetchFromTMDB } from "../services/tmdb.service.js";
import User from "../models/user.model.js";



export async function searchPerson(req, res) {
    // https://api.themoviedb.org/3/search/person?query=chris&include_adult=false&language=en-US&page=1
    const { query } = req.params; // name of the person
    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`)
        if (response.results.length === 0) {
            console.log("NOT FOUND");
            return res.status(404).send(null);  // 404 not found
        }
        // store in the history
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].profile_path,
                    title: response.results[0].name,
                    searchType: "person",
                    createdAt: new Date(),
                },
            },
        });

        res.status(200).json({
            success: true,
            content: response.results,
        })

    }
    catch (error) {
        console.log("error in serchPerson controller:", error.message);
        res.status(500).json({ success: false, message: "ineternal server error" });

    }
}











export async function searchMovie(req, res) {
    const { query } = req.params;
    try {

        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`)

     

        // mine
        if (response.results.length === 0) {
            return res.status(404).send(null);  // 404 not found
        }


        // store in the history
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].poster_path,
                    title: response.results[0].title,
                    searchType: "movie",
                    createdAt: new Date(),
                },
            },

        });


    

        res.status(200).json({
            success: true,
            content: response.results,
        })

    }
    catch (error) {
        console.log("error in serchMovie controller:", error.message);
        res.status(500).json({ success: false, message: "ineternal server error" });

    }


}








export async function searchTv(req, res) {
    const { query } = req.params;
  

    try {              
        const response = await fetchFromTMDB(` https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`)
        if (response.results.length === 0) {
            return res.status(404).send(null);  // 404 not found
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].poster_path,
                    title: response.results[0].name,
                    searchType: "tv",
                    createdAt: new Date(),
                },
            },
        });

        res.status(200).json({
            success: true,
            content: response.results,
        })

    }
    catch (error) {
        console.log("error in serchTV controller:", error.message);
        res.status(500).json({ success: false, message: "ineternal server error" });
    }

}



export async function getSearchHistory(req, res) {
    try {
        res.status(200).json({
            success: true,
            content: req.user.searchHistory    // as we aleardy have user in req, so we dont need to fetch it from the database
        })
    }
    catch (error) {
        res.status(500).json({ success: false, message: "internal server error" })

    }
}



export async function removeItemFromSearchHistory(req,res) {
    let { id } = req.params;
    // this id is in string , we need to convert into intger

    id=parseInt(id);  // now convert into int

    try {
  await User.findByIdAndUpdate(req.user._id,{
    $pull:{searchHistory:{id:id}}
  });
  res.status(200).json({
    success:true, message:"item removed from search history"
  });
    }
    catch (error) {
 res.status(500).json({ success: false, message: "internal server error" })
    }

}