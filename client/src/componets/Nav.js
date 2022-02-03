import React from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import { Grid, Menu, Container } from 'semantic-ui-react'

function Nav() {
  
    function showNavigation() {
        if (Auth.loggedIn()) {
          return (
            <Menu secondary>
              <Menu.Item >
                <Link to="/">
                 <div class="navItem">Home</div>
                </Link>
              </Menu.Item>
              <Menu.Item >
                <Link to="/profile">
                <div class="navItem">Profile</div>
                </Link>
              </Menu.Item>
              <Menu.Item >
                <Link to="/eventForm">
                <div class="navItem">Create Event</div>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/donations">
                <div class="navItem">Donations</div>
                </Link>
              </Menu.Item>
              <Menu.Item >
                {/* this is not using the Link component to logout or user and then refresh the application to the start */}
                <a href="/" onClick={() => Auth.logout()}>
                <div class="navItem">Logout</div>
                </a>
              </Menu.Item>
            </Menu>
          );
        } else {
          return (
            <Menu secondary>
              <Menu.Item >
                <Link to="/signup">
                <div class="navItem">Signup</div>
                </Link>
              </Menu.Item>
              <Menu.Item >
                <Link to="/login">
                <div class="navItem">Login</div>
                </Link>
              </Menu.Item>
            </Menu>
          );
        }
      }
    

return (
  <div id="navBar">
  <Container>
  <Grid>
    <Grid.Column mobile={16} tablet={12} computer={10}>
        <Link to="/"><h1 id="siteTitle">Running-On-Empty</h1></Link>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={4} computer={6}>
        <nav>{showNavigation()}</nav>
        </Grid.Column>
  </Grid>
  </Container>
  </div>
);

}

  export default Nav;