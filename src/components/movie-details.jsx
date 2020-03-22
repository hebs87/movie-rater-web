import React, {Component} from "react";

let FontAwesome = require('react-fontawesome');

class MovieDetails extends Component {
    render() {
        const {movie} = this.props;

        return (
            <React.Fragment>
                {
                    // If the movie prop value isn't null, we display the details
                    movie ? (
                        <div>
                            <h3>{movie.title}</h3>
                            <p>
                                <FontAwesome
                                    name="star"
                                    className={movie.avg_rating > 0 ? 'orange' : ''}
                                />
                                <FontAwesome
                                    name="star"
                                    className={movie.avg_rating > 1 ? 'orange' : ''}
                                />
                                <FontAwesome
                                    name="star"
                                    className={movie.avg_rating > 2 ? 'orange' : ''}
                                />
                                <FontAwesome
                                    name="star"
                                    className={movie.avg_rating > 3 ? 'orange' : ''}
                                />
                                <FontAwesome
                                    name="star"
                                    className={movie.avg_rating > 4 ? 'orange' : ''}
                                />
                                <span> ({movie.no_of_ratings})</span>
                            </p>
                            <p>{movie.description}</p>
                        </div>
                    ) : null
                }
            </React.Fragment>
        )
    }
}

export default MovieDetails;
