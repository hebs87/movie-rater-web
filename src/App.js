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
        fetch('http://127.0.0.1:8000/api/movies/', {
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

    render() {
        return (
            <div className="App">
                <h1>Movie Rater</h1>
                <div className="layout">
                    <MovieList movies={this.state.movies} movieClicked={this.movieClicked}/>
                    <MovieDetails movie={this.state.selectedMovie} updateMovie={this.movieClicked} />
                </div>
            </div>
        );
    }
}

export default App;
