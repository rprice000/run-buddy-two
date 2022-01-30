// login.js
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
// import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";
import { Button, Form, Grid } from "semantic-ui-react";

function Login(props) {
  const [formState, setFormState] = useState({ username: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { username: formState.username, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      console.log(mutationResponse);
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };



  return (
    <div>
      <Grid columns="three">
        <Grid.Row>
          <Grid.Column></Grid.Column>
          <Grid.Column>
            <h2>Login</h2>
            <Form onSubmit={handleFormSubmit}>
              <Form.Field>
                <label htmlFor="username">Username:</label>
                <input
                  placeholder="username"
                  name="username"
                  // type="username"
                  id="username"
                  value={formState.username}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label htmlFor="pwd">Password:</label>
                <input
                  placeholder="******"
                  name="password"
                  type="password"
                  id="pwd"
                  onChange={handleChange}
                />
              </Form.Field>
              {error ? (
                <div>
                  <p>The provided credentials are incorrect</p>
                </div>
              ) : null}
              <div>
                <Button type="submit">Submit</Button>
              </div>
            </Form>
          </Grid.Column>
          <Grid.Column></Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Login;