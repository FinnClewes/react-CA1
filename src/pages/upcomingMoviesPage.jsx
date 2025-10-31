import React from "react";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToWatchlistIcon from "../components/cardIcons/addToWatchlist";

const UpcomingMoviesPage = () => {

    const { data, error, isPending, isError  } = useQuery({
        queryKey: ['upcoming'],
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
    const watchlist = movies.filter(m => m.watchlist)
    localStorage.setItem('watchlst', JSON.stringify(watchlist))
    const addToWatchlist = (movieId) => true

    return (
        <PageTemplate
            title="Upcoming Movies"
            movies={movies}
            action={(movie) => {
            return <AddToWatchlistIcon movie={movie} />
            }}
        />
    );
}

export default UpcomingMoviesPage;