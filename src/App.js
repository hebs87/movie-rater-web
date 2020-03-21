import React, {Component} from 'react';
import './App.css';
import MovieList from "./components/movie-list";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'movies': ['Titanic', 'Avatar']
        }
    }

    componentDidMount() {
        // Fetch movie data from the API
    }

    render() {
        return (
            <div className="App">
                <h1>Movie Rater</h1>
                <MovieList movies={this.state.movies} />
            </div>
        );
    }
}

export default App;
