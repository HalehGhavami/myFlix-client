import React from 'react';
import './movie-view.scss';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  addFav(e, movie) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    axios({
      method: 'post',
      url: `https://api-myflix.herokuapp.com/users/${username}/favorites/${movie._id}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        alert(`${movie.Title} was added to your Favorites`);
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  render() {
    const { movie } = this.props;
    if (!movie) return null;

    // if the state is null returns this
    return (
      <div className="movie-view">
        <div className="movie-poster cent ">
          <img className="poster shadow-lg rounded" src={movie.ImagePath} />
        </div>
        <div className="movie-title cent my-5">
          <h2>{movie.Title}</h2>
        </div>
        <div className="movie-description  my-2">
          <span className="label font-weight-bold">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-genre my-2">
          <span className="label font-weight-bold">
            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button variant=" info" className="my-3 font-weight-bold">
                Genre:{' '}
              </Button>
            </Link>
          </span>
          <span className="value">{movie.Genre.Name}</span>
        </div>

        <div className="movie-director my-2">
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant=" info" className="my-3 font-weight-bold">
              Director:
            </Button>
          </Link>

          <span className="value">{movie.Director.Name}</span>
        </div>

        <Link to={'/'}>
          <Button variant="info" className="my-3">
            Back to Movie list
          </Button>
        </Link>
        <Button
          variant="dark"
          className="fav-button"
          value={movie._id}
          onClick={(e) => this.addFav(e, movie)}
        >
          Add to Favorites
        </Button>
      </div>
    );
  }
}

// static propTypes properties for MovieView
MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
    }),
  }),
};
