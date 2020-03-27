import React, {Component} from 'react';
import './App.css';
import MovieList from "./components/movie-list";
import MovieDetails from "./components/movie-details";
import MovieForm from "./components/movie-form";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            selectedMovie: null,
            editedMovie: null
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
            .then(res => this.setState({movies: res}))
            .catch(error => console.log(error))
    }

    // This function gets the movie from the MovieList component and
    // sets the state of the selectedMovie prop to the movie. It also
    // sets the state of the editedMovie to null to enable us to toggle
    // between the movie details and the edit form
    movieClicked = movie => {
        this.setState({
            selectedMovie: movie,
            editedMovie: null
        });
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

    // This function gets the edited movie from the MovieList component,
    // and sets the state of the editedMovie prop to the movie
    editClicked = selMovie => {
        this.setState({editedMovie: selMovie});
    };

    // This function sets the MovieForm fields to blank by setting the
    // state of the editedMovie prop to those details. It enables us to get
    // a blank form when clicking the Add Movie button in the MovieList
    newMovie = () => {
        this.setState({editedMovie: {
            'title': '', 'description': ''
        }})
    };

    // This function is passed into the MovieForm component
    // in which it is called in another function that is called
    // by the Cancel button's onClick attribute
    cancelForm = () => {
        this.setState({editedMovie: null})
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
                        editClicked={this.editClicked}
                        newMovie={this.newMovie}
                    />
                    <div>
                        {!this.state.editedMovie ?
                            <MovieDetails
                                movie={this.state.selectedMovie}
                                updateMovie={this.movieClicked}
                            />
                            :
                            < MovieForm
                                movie={this.state.editedMovie}
                                cancelForm={this.cancelForm}
                            />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
