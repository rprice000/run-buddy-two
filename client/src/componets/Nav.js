import React from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import { Grid, Menu } from 'semantic-ui-react'

function Nav() {
  
    function showNavigation() {
        if (Auth.loggedIn()) {
          return (
            <Menu secondary>
              <Menu.Item as='a'>
                <Link to="/profile">
                  Profile
                </Link>
              </Menu.Item>
              <Menu.Item as='a'>
                <Link>
                 Calendar
                </Link>
              </Menu.Item>
              <Menu.Item as='a'>
                <Link>
                 Donations
                </Link>
              </Menu.Item>
              <Menu.Item as='a'>
                {/* this is not using the Link component to logout or user and then refresh the application to the start */}
                <a href="/" onClick={() => Auth.logout()}>
                  Logout
                </a>
              </Menu.Item>
            </Menu>
          );
        } else {
          return (
            <Menu secondary>
              <Menu.Item as='a'>
                <Link to="/signup">
                  Signup
                </Link>
              </Menu.Item>
              <Menu.Item as='a'>
                <Link to="/login">
                  Login
                </Link>
              </Menu.Item>
            </Menu>
          );
        }
      }
    

return (
  <Grid>
    
    <Grid.Column mobile={16} tablet={12} computer={10}>
        <h1><Link to="/">Running-On-Empty</Link></h1>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={4} computer={6}>
        <nav>{showNavigation()}</nav>
        </Grid.Column>
    
  </Grid>
);

}

  export default Nav;