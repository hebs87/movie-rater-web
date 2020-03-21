import React from "react";

const MovieList = props => {
    // A double arrow function that first gets the movie, then the event,
    // which is the onClick in the h3 element. It the gets the movieClicked
    // prop from the App component and passes in the movie
    const movieClicked = movie => evt => {
        props.movieClicked(movie);
    };

    return (
        <div>
            {props.movies.map(movie => (
                <h3
                    key={movie.id}
                    onClick={movieClicked(movie)}
                >
                    {movie.title}
                </h3>
            ))}
        </div>
    )
};

export default MovieList;
