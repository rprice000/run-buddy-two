// Signup.js code
import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { Button, Form, Grid } from 'semantic-ui-react'

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <Grid columns="three">
        <Grid.Row>
          <Grid.Column></Grid.Column>
          <Grid.Column>
            <h2>Sign Up</h2>
            <Form onSubmit={handleFormSubmit}>
              <Form.Field>
              <label htmlFor="username">Username:</label>
                <input
                  placeholder="Your username"
                  name="username"
                  // type="username"
                  id="username"
                  value={formState.username}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
              <label htmlFor="email">Email address:</label>
                <input
                  placeholder="Your email"
                  name="email"
                  type="email"
                  id="email"
                  value={formState.email}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
              <label htmlFor="pwd">Password:</label>
                <input
                  placeholder="******"
                  name="password"
                  type="password"
                  id="password"
                  value={formState.password}
                  onChange={handleChange}
                />
              </Form.Field>
              <Button type="submit">Submit</Button>
            </Form>
          </Grid.Column>
          <Grid.Column></Grid.Column>
        </Grid.Row>
      </Grid>
      {error && <div>Signup failed</div>}
    </div>
  );
};

export default Signup;
