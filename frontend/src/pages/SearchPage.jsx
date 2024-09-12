// import { React, useState } from 'react'
// import { useContentStore } from '../store/content';
// import Navbar from '../components/Navbar';
// import { Search } from 'lucide-react';
// import toast from 'react-hot-toast';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { ORIGINAL_IMG_BASE_URL } from '../utils/constants';

// export default function SearchPage() {
//     const [activeTab, setActiveTab] = useState("movie");
//     const [searchTerm, setSearchTerm] = useState("");
//     const [results, setResults] = useState([]);
//     const { setContentType } = useContentStore();


//     // as we dont want to have click for person
//     const handleTableClick = (tab) => {
//         setActiveTab(tab);
//         tab === "movie" ? setContentType("movie") : setContentType("tv")
//         setResults([]);  // setresult as empty so after every click we get empty array to fill
//     }


//     // it will give us the data
//      const handleSearch=async(e)=>{
// e.preventDefault();
// try{
// const res=await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`);
// setResults(res.data.content);
// }
// catch(error)
// {
//     if(error.response.status===404)
//     {
//         toast.error("Nothing found make sure you are searching under the right category")
//     }
//     else{
// toast.error("An error occure , please try again latter");
//     }

// }

// console.log("result",results);
//     }

//     return (<div className='bg-black min-h-screen text-white'>
//         <Navbar />
//         <div className='container mx-auto  px-4 py-8 '>
//             <div className='flex justify-center gap-3 mb-4'>
//                 <button
//                     className={`py-2 px-4 rounded ${activeTab === "movie" ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700`}
//                     onClick={() => handleTableClick("movie")}>
//                     Movies
//                 </button>

//                 <button
//                     className={`py-2 px-4 rounded ${activeTab === "tv" ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700`}
//                     onClick={() => handleTableClick("tv")}>
//                     Tv Shows
//                 </button>

//                 <button
//                     className={`py-2 px-4 rounded ${activeTab === "person" ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700`}
//                     onClick={() => handleTableClick("person")}>
//                     Person
//                 </button>
//             </div>

//             <form className='flex gap-2 items-stretch mb-8 max-w-2xl mx-auto' 
//              onSubmit={handleSearch} >

//                 <input
//                     type='text'
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     placeholder={"search for a " + activeTab}
//                     className='w-full p-2 rounded bg-gray-800 text-white'
//                 />

//                 <button className='bg-red-600 hover:bg-red-700 text-white p-2 rounded'>
//                     <Search className='size-6'/>
//                 </button>

//             </form>

//   <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
//     {
//         results.map((result)=>{
//             if(!result.poster_path && !result.profile_path)return null;


//             return (
//                 <div key={result.id} className='bg-gray-800 p-4 rounded'>
// {activeTab=="person" ? (
//     <Link to={"/actor/"+result.name} className="flex flex-col items-center">
//         <img 
//        src={ORIGINAL_IMG_BASE_URL + result.profile_path}
//          alt={result.name}
//          className='max-h-96 rounded mx-auto'
//         />
//         <h2 className='mt-2 text-xl font-bold'>{result.name}</h2>
//     </Link>

// ):(
//     <Link
//     to={"/watch/" + result.id}
//     onClick={() => {
//         setContentType(activeTab);
//     }}
// >
//     <img
//         src={ORIGINAL_IMG_BASE_URL + result.poster_path}
//         alt={result.title || result.name}
//         className='w-full h-auto rounded'
//     />
//     <h2 className='mt-2 text-xl font-bold'>{result.title || result.name}</h2>
// </Link>
// )}

//                 </div>
//             )

            
//         })
//     }
//   </div>


//         </div>
//     </div>
//     )
// }



import { useState } from "react";
import { useContentStore } from "../store/content";
import Navbar from "../components/Navbar";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const SearchPage = () => {
	const [activeTab, setActiveTab] = useState("movie");
	const [searchTerm, setSearchTerm] = useState("");

	const [results, setResults] = useState([]);
	const { setContentType } = useContentStore();

	const handleTabClick = (tab) => {
		setActiveTab(tab);
		tab === "movie" ? setContentType("movie") : setContentType("tv");
		setResults([]);
	};

	const handleSearch = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`);
			setResults(res.data.content);
		} catch (error) {
			if (error.response.status === 404) {
				toast.error("Nothing found, make sure you are searching under the right category");
			} else {
				toast.error("An error occurred, please try again later");
			}
		}
	};

	return (
		<div className='bg-black min-h-screen text-white'>
			<Navbar />
			<div className='container mx-auto px-4 py-8'>
				<div className='flex justify-center gap-3 mb-4'>
					<button
						className={`py-2 px-4 rounded ${
							activeTab === "movie" ? "bg-red-600" : "bg-gray-800"
						} hover:bg-red-700`}
						onClick={() => handleTabClick("movie")}
					>
						Movies
					</button>
					<button
						className={`py-2 px-4 rounded ${
							activeTab === "tv" ? "bg-red-600" : "bg-gray-800"
						} hover:bg-red-700`}
						onClick={() => handleTabClick("tv")}
					>
						TV Shows
					</button>
					<button
						className={`py-2 px-4 rounded ${
							activeTab === "person" ? "bg-red-600" : "bg-gray-800"
						} hover:bg-red-700`}
						onClick={() => handleTabClick("person")}
					>
						Person
					</button>
				</div>

				<form className='flex gap-2 items-stretch mb-8 max-w-2xl mx-auto' onSubmit={handleSearch}>
					<input
						type='text'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						placeholder={"Search for a " + activeTab}
						className='w-full p-2 rounded bg-gray-800 text-white'
					/>
					<button className='bg-red-600 hover:bg-red-700 text-white p-2 rounded'>
						<Search className='size-6' />
					</button>
				</form>

				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
					{results.map((result) => {

                        // return null if they short of anything
						if (!result.poster_path && !result.profile_path) return null;

						return (
							<div key={result.id} className='bg-gray-800 p-4 rounded'>
								{activeTab === "person" ? (
									<div className='flex flex-col items-center'>
										<img
											src={ORIGINAL_IMG_BASE_URL + result.profile_path}
											alt={result.name}
											className='max-h-96 rounded mx-auto'
										/>
										<h2 className='mt-2 text-xl font-bold'>{result.name}</h2>
									</div>
								) : (
									<Link
										to={"/watch/" + result.id}
										onClick={() => {
											setContentType(activeTab);
										}}
									>
										<img
											src={ORIGINAL_IMG_BASE_URL + result.poster_path}
											alt={result.title || result.name}
											className='w-full h-auto rounded'
										/>
										<h2 className='mt-2 text-xl font-bold'>{result.title || result.name}</h2>
									</Link>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};
export default SearchPage;