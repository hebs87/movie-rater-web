import React, {Component} from "react";

let FontAwesome = require('react-fontawesome');

class MovieDetails extends Component {

    // We set the initial highlighted state to -1, which ensures that the
    // stars start of blank - this is to create the colour change on hover
    constructor(props) {
        super(props);

        this.state = {
            'highlighted': -1
        }
    }

    // Here, we create a function that gets the highlighted value (i if the
    // star is hovered over, -1 if not), then it gets the event and then sets
    // the state of highlighted to the highlighted value
    highlightRate = highlighted => evt => {
        this.setState({highlighted});
    };

    rateClicked = stars => evt => {
        /* We want to POST the i value of the star into our rate_movie function in the Django API, so that
        * we can rate the movie
        * 1) We specify the URL endpoint and dynamically pass in the movie ID
        * 2) In the object we specify the method (POST), headers (in which we pass
        * in the Content-Type of JSON and the Token), and the body (the keys and
        * values we want to pass in, which correspond to the Model fields - user and
        * movie IDs are already set so we don't need to pass these in)
        * 3) When we get the success response back, we then call the getDetails function
        * which gets the movie's detials again and refreshes the page with the new details */
        fetch(`${process.env.REACT_APP_API_URL}/api/movies/${this.props.movie.id}/rate_movie/`, {
            method: 'POST',
            headers: {
                // Whenever we do a POST or PUT, we need to set a Content-Type (JSON in this instance)
                'Content-Type': 'application/json',
                // We pass this in statically for now
                'Authorization': 'Token 2235df53cb3910ac39bce23b5a17a29280afa4ae'
            },
            body: JSON.stringify({
                stars
            })
        }).then(res => res.json())
            .then(res => this.getDetails())
            .catch(error => console.log(error))
    };

    getDetails = () => {
        /* Once we've rated the movie, we want to refresh the page with the new
        details. To do that, we need to get the movie details for the specific
        movie and then pass the function into the rateClicked function
        * When we get the response back, we want to call the updateMovie prop,
        * which is in the App component that gets the movie details from the MovieList
        * component - so basically, we pass the movie data out of this component to
        * then trigger it to re-render with the new details */
        fetch(`${process.env.REACT_APP_API_URL}/api/movies/${this.props.movie.id}/`, {
            method: 'GET',
            headers: {
                // Whenever we do a POST or PUT, we need to set a Content-Type (JSON in this instance)
                'Content-Type': 'application/json',
                // We pass this in statically for now
                'Authorization': 'Token 2235df53cb3910ac39bce23b5a17a29280afa4ae'
            }
        }).then(res => res.json())
            .then(res => this.props.updateMovie(res))
            .catch(error => console.log(error))
    };

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

                            <div className="rate-container">
                                <h2>Rate it!</h2>
                                {
                                    /* Here, we programmatically set the functionality for the user to rate the movie
                                    * 1) We create an array with 5 elements and map over it with the element (e) and
                                    * the index (i) of that element
                                    * 2) We return the star FA icon - this renders 5 icons; 1 per array element
                                    * 3) Conditionally render the purple class if the highlighted state is greater
                                    * than i - 1 (the highlighted state will be the i value of the star that is being
                                    * hovered over at the time
                                    * 4) Call the highlightRate function and pass in i, which will set the highlighted
                                    * state to the value of that star's i value
                                    * 5) When no longer hovered, reset the highlighted state value to -1
                                    * 6) When clicked, we pass the star's i value into the rateClicked function,
                                    * which passes that as an int value into the database - we need to add 1 to the
                                    * i value, as the i value runs from 0-4, but we want the rating from 1-5 */
                                    [...Array(5)].map((e, i) => {
                                        return(
                                            <FontAwesome
                                                key={i}
                                                name="star"
                                                className={this.state.highlighted > i - 1 ? 'purple' : ''}
                                                onMouseEnter={this.highlightRate(i)}
                                                onMouseLeave={this.highlightRate(-1)}
                                                onClick={this.rateClicked(i + 1)}
                                            />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    ) : null
                }
            </React.Fragment>
        )
    }
}

export default MovieDetails;
