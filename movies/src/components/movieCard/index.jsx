import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import { Link } from "react-router";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png'
import Avatar from '@mui/material/Avatar';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import allignItems from "@mui/material/Grid";

export default function MovieCard({ movie, action}) {
    const { favorites, addToFavorites, mustWatch, addToMustWatchIcon } = useContext(MoviesContext);
  if ( favorites.find((id) => id === movie.id)) {
    movie.favorite = true;
  } else {
    movie.favorite = false
  }

  if ( mustWatch.find((id) => id === movie.id)) {
    movie.mustWatch = true;
  } else {
    movie.mustWatch = false
  }


  const handleAddToFavorite = (e) => {
    e.preventDefault();
    addToFavorites(movie);
  };

  const handleAddToMustWatch = (e) => {
    e.preventDefault();
    addToMustWatchIcon(movie);
  };

  return (

    
    <Card sx={{ maxWidth: 345, height: 600, backgroundColor: "#e6eefa", color: "black" }}>
             <CardMedia
        sx={{ height: 300 }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
            
            <CardHeader
        avatar={
          movie.favorite ? (
            <Avatar sx={{ backgroundColor: 'red' }}>
              <FavoriteIcon />
            </Avatar>
          ) : movie.mustWatch ? (
            <Avatar sx={{ backgroundColor: 'purple' }}>
              <PlaylistAddIcon />
            </Avatar>
          ) : null
          
        }


        
        title={
          <Typography sx={{borderTop: 2, borderBottom: 2, borderColor: 'darkgray', height: 60, textDecorationStyle: "bold", fontSize: "1.25rem" }} >
            {movie.title.length > 30
            ? movie.title.slice(0, 30) + "..."
            : movie.title}
          </Typography>
        }
      />

    
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {" "}{movie.release_date}{"    "}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              | {"  "}
              <StarRateIcon fontSize="small" />
              {"  "} {movie.vote_average}{" "} |
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>

        {action(movie)}
        
        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
        
      </CardActions>

    </Card>
  );
}
