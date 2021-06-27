import React from 'react';
import PropTypes from 'prop-types';

import { Button, Card, CardDeck, Form, Row, Col } from 'react-bootstrap';
import './profile-view.scss';

import { Link } from 'react-router-dom';

import axios from 'axios';

// redux
import { connect } from 'react-redux';
import { setUser } from '../../actions/actions';

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    (this.Username = null),
      (this.Password = null),
      (this.Email = null),
      (this.Birthday = null);

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
      movies: [],
      validated: null,
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  // get user method
  getUser(token) {
    const username = localStorage.getItem('user');
    axios
      .get(`https://api-myflix.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // remove favorite method
  handleRemoveFavorite(e, movie) {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    e.preventDefault();
    axios
      .delete(
        `https://api-myflix.herokuapp.com/users/${username}/favorites/${movie}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        alert('Movie removed from favorites.');
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // update user info method
  handleUpdate(e, newUsername, newPassword, newEmail, newBirthday) {
    this.setState({
      validated: null,
    });

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        validated: true,
      });
      return;
    }
    e.preventDefault();

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios({
      method: 'put',
      url: `https://api-myflix.herokuapp.com/users/${username}`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        Username: newUsername ? newUsername : this.state.Username,
        Password: newPassword ? newPassword : this.state.Password,
        Email: newEmail ? newEmail : this.state.Email,
        Birthday: newBirthday ? newBirthday : this.state.Birthday,
      },
    })
      .then((response) => {
        alert('Saved Changes');
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });
        localStorage.setItem('user', this.state.Username);
        window.open(`/users/${username}`, '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setUsername(input) {
    this.Username = input;
  }

  setPassword(input) {
    this.Password = input;
  }

  setEmail(input) {
    this.Email = input;
  }

  setBirthday(input) {
    this.Birthday = input;
  }

  // delete user method
  handleDeregister(e) {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios
      .delete(`https://api-myflix.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        alert('Your account has been deleted.');
        window.open(`/`, '_self');
      })
      .catch(function (e) {
        console.log(e);
        this.componentDidMount();
      });
  }

  render() {
    const { FavoriteMovies, validated } = this.state;
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const { movies } = this.props;

    return (
      <Row className="profile-view">
        <Col md={8}>
          <div className="profile-card bg-white m-2 p-2 rounded d-flex flex-column justify-content-between align-items-center">
            <h1 className="title">{username}'s Favorite Movies</h1>
            <Card.Body>
              {FavoriteMovies.length === 0 && (
                <div className="d-flex flex-column align-items-center">
                  You have no favorite movies.
                </div>
              )}
              <div className="favorites-container h6 text-center d-flex flex-column align-items-center">
                {FavoriteMovies.length > 0 &&
                  movies.map((movie) => {
                    if (
                      movie._id ===
                      FavoriteMovies.find((favMovie) => favMovie === movie._id)
                    ) {
                      return (
                        <div key={movie._id}>
                          <CardDeck className="movie-card-deck">
                            <Card
                              className="favorites-item card-content"
                              style={{ width: '16rem', flex: 1 }}
                              key={movie._id}
                            >
                              <Card.Img variant="top" src={movie.ImagePath} />
                              <Card.Body className="movie-card-body">
                                <Link
                                  className="text-muted"
                                  to={`/movies/${movie._id}`}
                                >
                                  <Card.Title className="movie-card-title">
                                    {movie.Title}
                                  </Card.Title>
                                </Link>
                                <Button
                                  size="sm"
                                  variant="outline-danger"
                                  block
                                  className="profile-button remove-favorite"
                                  onClick={(e) =>
                                    this.handleRemoveFavorite(e, movie._id)
                                  }
                                >
                                  Remove
                                </Button>
                              </Card.Body>
                            </Card>
                          </CardDeck>
                        </div>
                      );
                    }
                  })}
              </div>
            </Card.Body>
            <h1 className="text-center section title">Update Profile</h1>
            <Card.Body>
              <Form
                noValidate
                validated={validated}
                className="update-form"
                onSubmit={(e) =>
                  this.handleUpdate(
                    e,
                    this.Username,
                    this.Password,
                    this.Email,
                    this.Birthday
                  )
                }
              >
                <Form.Group controlId="formBasicUsername">
                  <Form.Label className="form-label">Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Change Username"
                    onChange={(e) => this.setUsername(e.target.value)}
                    // pattern="[a-zA-Z0-9]{6,}"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid username with at least 5 alphanumeric
                    characters.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label className="form-label">
                    Password<span className="required">*</span>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Current or New Password"
                    onChange={(e) => this.setPassword(e.target.value)}
                    // pattern=".{6,}"
                    // required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid password with at least 5 characters.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="form-label">Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Change Email"
                    onChange={(e) => this.setEmail(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid email address.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicBirthday">
                  <Form.Label className="form-label">Birthday</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Change Birthday"
                    onChange={(e) => this.setBirthday(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid birthday.
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  variant="info"
                  type="submit"
                  block
                  onClick={(e) => this.handleUpdate(e)}
                >
                  Update
                </Button>

                <h1 className="text-center section">Delete Your Profile</h1>
                <Card.Body>
                  <Button
                    variant="outline-danger"
                    block
                    onClick={(e) => this.handleDeregister(e)}
                  >
                    Delete Account
                  </Button>
                </Card.Body>
              </Form>
            </Card.Body>
          </div>
        </Col>
      </Row>
    );
  }
}

ProfileView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.instanceOf(Date).isRequired,
    FavoriteMovies: PropTypes.array,
  }),
};
