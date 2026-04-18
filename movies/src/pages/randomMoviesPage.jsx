import React, { useState } from "react";
import { getMovie } from "../api/tmdb-api";
import { Link } from "react-router";

const RandomMoviePage = () => {
  const [movie, setMovie] = useState(null);
  const [randomId, setRandomId] = useState(null); // store ID

  const handleClick = async () => {
    const id = Math.floor(Math.random() * 500) + 1;
    setRandomId(id); // save it

    try {
      const data = await getMovie({
        queryKey: ['movie', { id }]
      });
      setMovie(data);
    } catch (err) {
      console.log("Movie not found, try again");
    }
  };

  return (
    <div>
      <h1>Random Generator</h1>

      <button onClick={handleClick}>
        Generate Random Movie
      </button>

      {movie && (
        <div>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>

          <Link to={`/movies/${randomId}`}>
            <button>Go To Movie Details</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default RandomMoviePage;