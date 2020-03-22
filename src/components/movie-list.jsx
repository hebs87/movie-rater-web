import React from "react";

let FontAwesome = require('react-fontawesome');

const MovieList = props => {
    // A double arrow function that first gets the movie, then the event,
    // which is the onClick in the h3 element. It the gets the movieClicked
    // prop from the App component and passes in the movie
    const movieClicked = movie => evt => {
        props.movieClicked(movie);
    };

    // A double arrow function that first gets the movie, then the event,
    // which is the onClick in the trash icon element. It deletes the movie
    // from the API database, then gets the movieDeleted prop from the App
    // component and passes in the movie. This allows the App component to
    // run the movieDeleted function, which updates the movie list with the
    // new details, re-renders the MovieList component and passes in the new
    // movie list
    const removeClicked = movie => evt => {
        fetch(`${process.env.REACT_APP_API_URL}/api/movies/${movie.id}`, {
            method: 'DELETE',
            headers: {
                // Whenever we do a POST or PUT, we need to set a Content-Type (JSON in this instance)
                'Content-Type': 'application/json',
                // We pass this in statically for now
                'Authorization': 'Token 2235df53cb3910ac39bce23b5a17a29280afa4ae'
            },
        }).then(res => props.movieDeleted(movie))
            .catch(error => console.log(error))
    };

    return (
        <div>
            {props.movies.map(movie => (
                <div key={movie.id}>
                    <h3 onClick={movieClicked(movie)}>
                        {movie.title}
                    </h3>
                    <FontAwesome
                        name="edit"
                    />
                    <FontAwesome
                        name="trash"
                        onClick={removeClicked(movie)}
                    />
                </div>
            ))}
        </div>
    )
};

export default MovieList;
