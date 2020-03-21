import React, {Component} from "react";

class MovieDetails extends Component {

    render() {
        return(
            <React.Fragment>
                {
                    // If the movie prop value isn't null, we display the details
                    this.props.movie ? (
                        <div>
                            <h3>{this.props.movie.title}</h3>
                        </div>
                    ) : null
                }
            </React.Fragment>
        )
    }
}

export default MovieDetails;
