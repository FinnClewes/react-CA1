import React from "react";
import { getTrendingThisMonthMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";

const TrendingThisMonthPage = () => {

    const { data, error, isPending, isError  } = useQuery({
        queryKey: ['trending'],
        queryFn: getTrendingThisMonthMovies,    
    })

    if (isPending) {
        return <Spinner />
    }
    
    if (isError) {
        return <h1>{error.message}</h1>
    }  

    const movies = data.results;

    return (
        <PageTemplate
            title="Trending This Month"
            movies={movies}
            action={(movie) => {
            //return <AddToWatchlistIcon movie={movie} />
            }}
        />
    );
};

export default TrendingThisMonthPage;
