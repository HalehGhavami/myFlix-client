import React from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './director-view.scss';

export class DirectorView extends React.Component {
  render() {
    const { director, movies } = this.props;
    return (
      <Container fluid className="DirectorView">
        <div className="director-view">
          <div className="director-name">
            <span className="label font-weight-bold">Director: </span>
            <span className="value">{director.Name}</span>
          </div>
          <div className="director-bio">
            <span className="label font-weight-bold">Bio: </span>
            <span className="value">{director.Bio}</span>
          </div>
          <div className="director-birth">
            <span className="label font-weight-bold">Born: </span>
            <span className="value">{director.Birth}</span>
          </div>
          <div className="director-death">
            <span className="label font-weight-bold">Death: </span>
            <span className="value">{director.Death}</span>
          </div>
          <Row>
            <div className="director-movies">
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
        </div>
      </Container>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
    Death: PropTypes.string,
  }).isRequired,
};
