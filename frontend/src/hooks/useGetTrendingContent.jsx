
// creating the custome hook

// import Reac from 'react'
import { useEffect,useState } from 'react';
import { useContentStore } from '../store/content';
import axios from 'axios';

export default function useGetTrendingContent() {
   const[trendingContent, setTrendingContent] =useState(null);
   const {contentType}=useContentStore();

   useEffect(()=>{
    const getTrendingContent=async ()=>{
     const res =  await axios.get(`/api/v1/${contentType}/trending`)
     setTrendingContent(res.data.content);
    }
    getTrendingContent();
   },[contentType])  // so whenever the content type chnage this useEffect will render

   return {trendingContent};
}
