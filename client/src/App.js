// You will need to import components here
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';


//connection to the back-end server's /graphql
const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <div >
        Hello World
      </div>
    </ApolloProvider>
  );
}

export default App;
