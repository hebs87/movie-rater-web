import React from "react";

const MovieList = ({movies}) => (
    <div>
        {movies.map(movie => (
            <h3 key={movie.id}>{movie.title}</h3>
        ))}
    </div>
);

export default MovieList;
