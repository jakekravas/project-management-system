import Header from './components/Header';
import Clients from './components/Clients';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import AddClientModal from './components/AddClientModal';

// prevents warning from displaying in console when using cache to get clients
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming ) {
            return incoming;
          }
        },
        projects: {
          merge(existing, incoming ) {
            return incoming;
          }
        }
      }
    }
  }
});

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header/>
        <div className='container'>
          <AddClientModal/>
          <Clients/>
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
