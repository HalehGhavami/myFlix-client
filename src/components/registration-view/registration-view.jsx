import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './registration-view.scss';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './registration-view.scss';

export function RegistrationView() {
  //call the useState() method (imported from React) with an empty string This method returns an array that you destructure (break down into variables)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
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
        console.log('error registering the user');
      });

    // console.log(username, password, email, birthday);
    // props.onRegister();
  };

  return (
    <Container className="registration-view" fluid="true">
      <h1 className="myflix-title">myFlix Registration</h1>
      <Form>
        <Form.Group controlId="formText">
          <Form.Label>username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
          />
        </Form.Group>
        <Form.Group controlId="formBirthday">
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            placeholder="Enter Birthday"
          />
        </Form.Group>
        <Button
          className="submit-button"
          variant="info"
          type="submit"
          onClick={handleRegister}
        >
          Submit
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
