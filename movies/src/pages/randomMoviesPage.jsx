import React, { useState } from "react";
import { getMovie } from "../api/tmdb-api";
import { Link } from "react-router";
import { Button } from "@mui/material";

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
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "10px", backgroundColor: "#d4e5ff", padding: "20px", borderColor: "#a0c4ff", borderStyle: "solid", borderWidth: "2px"   }} >
      <h1>Random Generator</h1>

      <Button onClick={handleClick} variant="contained">
        Generate Random Movie
      </Button>

      {movie && (
        <div style={{ allignItems: "center", marginTop: "20px", backgroundColor: "#c8dcfb", padding: "20px", borderStyle: "solid", borderWidth: "2px", borderColor: "#a0c4ff" }}>
          <h2 allignItems="center">{movie.title}</h2>
          <p>{movie.overview}</p>

          <Link to={`/movies/${randomId}`}>
            <Button color="inherit" variant="outlined">
              Go To Movie Details
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default RandomMoviePage;