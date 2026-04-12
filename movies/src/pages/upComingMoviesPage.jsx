import React from "react";
import {getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';


const UpcomingMoviesPage = (props) => {

  const { data, error, isPending, isError  } = useQuery({
    queryKey: ['upcoming'], //for array to work, must have queryKey and queryFn
    queryFn: getUpcomingMovies,
  })
  
  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  
  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const mustWatch = movies.filter(m => m.mustWatch)
    localStorage.setItem('mustWatch', JSON.stringify(mustWatch))   

       return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <AddToMustWatchIcon movie={movie} />
          </>
        );
      }}
    />
  );
};

export default UpcomingMoviesPage;
