import React from "react";

const MovieList = ({movies}) => (
    <React.Fragment>
        {movies.map(movie => (
            <h3 key={movie}>{movie}</h3>
        ))}
    </React.Fragment>
);

export default MovieList;
