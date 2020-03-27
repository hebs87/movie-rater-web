import React, {Component} from "react";

class MovieForm extends Component {
    // This function calls the cancelForm() function from the
    // App component that was passed in as a prop
    cancelClicked = () => {
        this.props.cancelForm();
    };

    // This function is called whenever the form input field
    // value changes
    inputChanged = () => {
        console.log('Changed');
    };

    render() {
        const {movie} = this.props;
        return (
            <React.Fragment>
                <span>Title</span>
                <br/>
                <input type="text" value={movie.title} onChange={this.inputChanged}/>
                <br/>
                <span>Description</span>
                <br/>
                <textarea value={movie.description} onChange={this.inputChanged}/>
                <br/>
                <button>Save</button>
                <button onClick={this.cancelClicked}>Cancel</button>
            </React.Fragment>
        )
    }
}

export default MovieForm;
