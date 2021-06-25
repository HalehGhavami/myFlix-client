import React from 'react';
import { Button, Card, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './genre-view.scss';

export class GenreView extends React.Component {
  // constructor() {
  //   super();

  //   this.state = {};
  // }
  render() {
    const { movies, genre } = this.props;
    // if (!genre) return null;
    return (
      <Container className="genre-view">
        <div className="genre-name">
          <span className="label font-weight-bold">Genre: </span>
          <span className="value">{genre.Name}</span>
        </div>

        <Card.Text>
          <span className="label font-weight-bold">Description: </span>
          <span className="value">{genre.Description}</span>
        </Card.Text>
        <Row>
          <div className="genre-list">
            <span className="label font-weight-bold">Movies: </span>
            {movies.map((m) => (
              <div className="movie" key={m._id}>
                {m.Title}
              </div>
            ))}
          </div>
        </Row>
        <Link to={'/'}>
          <Button variant="info">Back</Button>
        </Link>
      </Container>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }),
};
