import React, {Component} from 'react';
import './App.css';
import MovieList from "./components/movie-list";
import MovieDetails from "./components/movie-details";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'movies': [],
            'selectedMovie': null
        }
    }

    componentDidMount() {
        /* To get the data, we use the fetch method - the first argument is the API
        * endpoint URL; the second argument is an object in which we specify the method
        * and the headers, which is an object containing the authorisation token number
        * that we assigned to the user in the Django API when the user was created */
        fetch(`${process.env.REACT_APP_API_URL}/api/movies/`, {
            method: 'GET',
            headers: {
                // We pass this in statically for now
                'Authorization': 'Token 2235df53cb3910ac39bce23b5a17a29280afa4ae'
            }
        }).then(res => res.json())
            .then(res => this.setState({'movies': res}))
            .catch(error => console.log(error))
    }

    // This function gets the movie from the MovieList component and
    // sets the state of the selectedMovie prop to the movie
    movieClicked = movie => {
        this.setState({'selectedMovie': movie})
    };

    // This function gets the deleted movie from the MovieList component,
    // filters the movie list and removes the delete movie from it, then
    // sets the state of the selectedMovie prop to null so it is removed
    // and also the value of the movies prop to the new list
    movieDeleted = selMovie => {
        // New list of movies
        const movies = this.state.movies.filter(
            // If the movie is not equal to the selected movie ID, then
            // we will leave it (returns True); if it is equal (returns
            // False) then it will be removed from the list
            movie => movie.id !== selMovie.id
        );
        this.setState({movies, selectedMovie: null})
    };

    render() {
        return (
            <div className="App">
                <h1>Movie Rater</h1>
                <div className="layout">
                    <MovieList
                        movies={this.state.movies}
                        movieClicked={this.movieClicked}
                        movieDeleted={this.movieDeleted}
                    />
                    <MovieDetails
                        movie={this.state.selectedMovie}
                        updateMovie={this.movieClicked}
                    />
                </div>
            </div>
        );
    }
}

export default App;
