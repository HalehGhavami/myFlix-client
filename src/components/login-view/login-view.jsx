import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import './login-view.scss';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //The extra (e) in the code, as well as the e.preventDefault(); method, prevents the default refresh/change of the page from the handleSubmit() method.
  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a request to the server for authentication
    axios
      .post('https://api-myflix.herokuapp.com/login', {
        Username: username,
        Password: password,
      })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch((e) => {
        console.log('no such user');
      });
  };

  return (
    <Container className="login-view center" fluid="true">
      <h1 className="title">myFlix</h1>
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label></Form.Label>
          <Form.Control
            type="text"
            value={username}
            placeholder="Enter Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label></Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <div className="middle">
          <Button
            className="m-3"
            variant="info"
            type="submit"
            onClick={handleSubmit}
          >
            Login
          </Button>
          <Form.Group
            className="registration-group"
            controlId="formRegistration"
          >
            <Form.Text className="text-light">Don't have an account?</Form.Text>
            <Link to={`/register`}>
              <Button className="register-link" variant="dark">
                Register here
              </Button>
            </Link>
          </Form.Group>
        </div>
      </Form>
    </Container>
  );
}
