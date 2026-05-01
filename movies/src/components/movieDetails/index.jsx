import React, {useState} from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews"
import Button from "@mui/material/Button";



const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => {  // Don't miss this!
const [drawerOpen, setDrawerOpen] = useState(false);

  const whereToWatchSearch = (movieId) => {
        const url = `https://67movies.net/watch/movie/${movie.id}`; //for assg1 it brings you to a site that you can watch for free
        window.open(url, '_blank');
    };

  const wikiLinkDetails = (movieId) => {
    const url = `https://en.wikipedia.org/wiki/${movie.title}`; //assg1
    window.open(url, '_blank');
  }

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Genres" sx={{...chip}} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={{...root}}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count})`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>
      <Paper component="ul" sx={{...root}}>
        <Chip label = "Production Countries" sx={{...chip}} color= "primary" />
        {movie.production_countries.map((c) => (
          <li key={c.name}>
            <Chip label={c.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>

      <Typography variant="h5" component="h3">
        More Details on the movie:
      </Typography>
      <Paper component="ul" sx={{...root}}>
        <Button variant="contained" color="primary" onClick={(wikiLinkDetails)}>
          Go To Wiki
        </Button>
      </Paper>

       <Typography variant="h6" component="p">
          Where to Watch? 
        </Typography>
        <Typography variant="h8" component="p">
          You can watch this movie for free on 67movies.net, click below to go directly to the movie to watch now.
        </Typography>
      <Paper component="ul" sx={{...root}}>
        <Button variant="contained" color="primary" onClick={(whereToWatchSearch)}>
          Watch Now
          </Button>
      </Paper>

            <Fab
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '1em'
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>

      </>
  );
};
export default MovieDetails ;
