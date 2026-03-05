import React, { useEffect, useState } from "react";
import "./RowPost.css";
import { imageUrl,API_KEY } from "../../constants/constants";
import Axios from "../../axios";

import YouTube from "react-youtube";

function RowPost(props) {
  const [movies, setMovies] = useState([]);
  const [urlId, setUrlId] = useState('');
  useEffect(() => {
    Axios.get(props.url)
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      }, []);
  });

  const handleMovieTrailers = (id) => {
    console.log("====================================");
    console.log(id);
    console.log("====================================");
    Axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response) => {
      if (response.data.results.length !== 0) {
        console.log('====================================');
        console.log(response.data.results[0]);
        console.log('====================================');
       setUrlId(response.data.results[0]);
       }
      else {
        console.log("Trailer not available");}
      })
  };
  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="posters">
        {movies.map((obj) => (
          <img
            onClick={() => handleMovieTrailers(obj.id)}
            className={props.isSmall ? "smallPoster" : "poster"}
            src={`${imageUrl + obj.backdrop_path}`}
            alt="poster"
          />
        ))}
      </div>
    { urlId && <YouTube
        videoId={urlId.key}
        opts={{ height: "390", width: "100%", playerVars: { autoplay: 0 } }}
      />}
    </div>)
}
export default RowPost;
