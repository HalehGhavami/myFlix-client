import React from 'react';
import PropTypes from 'prop-types';
//Components & Styling
import Button from 'react-bootstrap/Button';
import './movie-card.scss';
export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;
    return (
      <div className="movie-card bg-white m-2 p-2 rounded d-flex flex-column justify-content-between align-items-center">
        <div className="d-flex flex-column align-items-center">
          <img
            src={movie.ImagePath}
            className="movie-card-img rounded mb-2 shadow-lg"
          />
          <p className="h6 text-center text-dark font-weight-semi-bold">
            {movie.Title}
          </p>
        </div>
        <p className="movie-card-description text-muted">
          {movie.Description.slice(0, 90)}...
        </p>
        <Button
          className="m-1"
          variant="info"
          onClick={() => onMovieClick(movie)}
        >
          View More
        </Button>
      </div>
    );
  }
}

// PropTypes
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string,
    }),
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired,
  }).isRequired,
};

export default MovieCard;
