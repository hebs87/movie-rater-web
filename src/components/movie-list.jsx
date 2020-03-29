import React from "react";

let FontAwesome = require('react-fontawesome');

const MovieList = props => {
    // A double arrow function that first gets the movie, then the event,
    // which is the onClick in the h3 element. It gets the movieClicked
    // prop from the App component and passes in the movie
    const movieClicked = movie => evt => {
        props.movieClicked(movie);
    };

    // This functions the gets the editClicked prop from the App component
    // and passes in the movie
    const editClicked = movie => evt => {
        props.editClicked(movie);
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
                // We dynamically pass in the token from the cookie
                'Authorization': `Token ${props.token}`
            },
        }).then(res => props.movieDeleted(movie))
            .catch(error => console.log(error))
    };

    // A function that calls the newMovie() function from the App.js file,
    // which then sets the editedMovie state to the title and description
    // values of the form, enabling the creation of a new movie in the DB
    const newMovie = () => {
        props.newMovie();
    };

    return (
        <div>
            {props.movies.map(movie => (
                <div key={movie.id} className="movie-item">
                    <h3 onClick={movieClicked(movie)}>
                        {movie.title}
                    </h3>
                    <FontAwesome
                        name="edit"
                        onClick={editClicked(movie)}
                    />
                    <FontAwesome
                        name="trash"
                        onClick={removeClicked(movie)}
                    />
                </div>
            ))}
            <button onClick={newMovie}>Add Movie</button>
        </div>
    )
};

export default MovieList;
