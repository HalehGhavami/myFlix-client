import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './registration-view.scss';

export function RegistrationView(props) {
  //call the useState() method (imported from React) with an empty string This method returns an array that you destructure (break down into variables)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    console.log(username, password, email, birthday);
    props.onRegister(username);
  };

  return (
    <div className="center">
      <h1 className="title">myFlix</h1>
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            placeholder="Enter Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Enter your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBirthday">
          <Form.Label>Date of Birth:</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            placeholder="Enter your Birthday"
            onChange={(e) => setBirthday(e.target.value)}
          />
        </Form.Group>
        <div className="middle">
          <Button type="submit" variant="dark" onClick={handleRegister}>
            Register
          </Button>
        </div>
      </Form>
    </div>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.instanceOf(Date).isRequired,
  }),
  onRegister: PropTypes.func,
};
