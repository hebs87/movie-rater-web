import React, {Component} from "react";

class MovieForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // We need to create a new object so that we don't save
            // over the existing movie before we hit save on the form
            editedMovie: this.props.movie
        }
    }

    // This function calls the cancelForm() function from the
    // App component that was passed in as a prop
    cancelClicked = () => {
        this.props.cancelForm();
    };

    // This function is called whenever the form input field
    // value changes and it sets the state of the editedMovie
    // prop to the existing value of the form field
    inputChanged = event => {
        const editedMovie = this.state.editedMovie;
        // Refers to the name attribute on the event target,
        // so the data in the form input fields
        editedMovie[event.target.name] = event.target.value;
        this.setState({editedMovie});
    };

    // This function is called whenever the form is saved
    // This is for new movies
    saveClicked = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/movies/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // We dynamically pass in the token from the cookie
                'Authorization': `Token ${this.props.token}`
            },
            body: JSON.stringify(this.state.editedMovie)
        }).then(res => res.json())
            // We call the addMovie function from the props and pass the
            // res in, so it is passed into the App component, where it is
            // then saved to the movies array in the addMovie function
            .then(res => this.props.addMovie(res))
            .catch(error => console.log(error))
    };

    // This function is called whenever the form is updated
    // This is for existing movies
    updateClicked = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/movies/${this.props.movie.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // We dynamically pass in the token from the cookie
                'Authorization': `Token ${this.props.token}`
            },
            body: JSON.stringify(this.state.editedMovie)
        }).then(res => res.json())
            // We call the editedMovie function from the props and pass the
            // res in, so it is passed into the App component, where it is
            // then edited in the movies list
            .then(res => this.props.editedMovie(res))
            .catch(error => console.log(error))
    };

    render() {
        const {movie} = this.props;
        const {editedMovie} = this.state;

        // This variable will be passed into the Save button for validation
        // so it makes the button disabled if the title or description fields
        // have no values
        const isDisabled = editedMovie.title.length === 0 ||
            editedMovie.description.length === 0;

        return (
            <React.Fragment>
                <span>Title</span>
                <br/>
                <input
                    type="text"
                    name="title"
                    value={movie.title}
                    onChange={this.inputChanged}
                />
                <br/>
                <span>Description</span>
                <br/>
                <textarea
                    name="description"
                    value={movie.description}
                    onChange={this.inputChanged}
                />
                <br/>
                {
                    // If the movie id exists, it means it is an existing movie
                    // in which case we will render a Save button that uddates
                    // the existing movie. Else, we render a button that saves
                    // a new movie record to the DB
                    movie.id ? (
                        <button disabled={isDisabled} onClick={this.updateClicked}>Save</button>
                    ) : (
                        <button disabled={isDisabled} onClick={this.saveClicked}>Save</button>
                    )
                }
                <button onClick={this.cancelClicked}>Cancel</button>
            </React.Fragment>
        )
    }
}

export default MovieForm;
