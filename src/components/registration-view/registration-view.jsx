import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './registration-view.scss';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

import './registration-view.scss';

export function RegistrationView(props) {
  // hooks update function state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    if (username.length < 5) {
      alert('Username must be longer than 5 characters.');
    } else if (!email.includes('@') || !email.includes('.')) {
      alert('Please use a valid email address.');
    } else if (password.length < 5) {
      alert('Please enter password with at least 5 characters.');
    } else {
      axios
        .post('https://api-myflix.herokuapp.com/users', {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
        })
        .catch((e) => {
          console.log('error registering the user: ' + e);
          alert('Something went wrong.');
        });
    }
  };

  return (
    <Container className="registration-view center mt-5" fluid="true">
      <h1 className="myflix-title">Welcome to myFlix Registration</h1>
      <Form>
        <Form.Group controlId="formBasicText">
          <Form.Label>username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicBirthday">
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            type="date"
            required
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </Form.Group>
        <Button
          className="submit-button"
          variant="info"
          type="submit"
          onClick={handleRegister}
        >
          Register
        </Button>

        <Form.Group className="login-group" controlId="formLogin">
          <Form.Text className="text-light">Already have an account?</Form.Text>
          <Link to={`/`}>
            <Button className="login-link" variant="dark">
              Login here
            </Button>
          </Link>
        </Form.Group>
      </Form>
    </Container>
  );
}

RegistrationView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthdate: PropTypes.string,
  }),
};
