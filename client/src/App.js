// You will need to import components here
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import { StoreProvider } from "./utils/globalState";
import { setContext } from '@apollo/client/link/context';

import Home from './pages/Home';
import NoMatch from './pages/NoMatch';
import Nav from './componets/Nav';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import EventForm from './componets/eventForm';
import SingleEvent from './pages/SingleEvent';

//connection to the back-end server's /graphql
const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          {/* <StoreProvider> */}
            <Nav />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/profile/:username?" component={Profile} />
              <Route exact path="/eventForm" component={EventForm} />
              <Route exact path="/event/:id" component={SingleEvent} />
              <Route component={NoMatch} />

            </Switch>
          {/* </StoreProvider> */}
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
