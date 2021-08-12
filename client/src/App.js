import React, { Component } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import DataTable from './components/DataTable';
import AddBookList from './components/AddBook';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  onError: (e) => {
    console.log(e);
  },
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1 style={{ textAlign: 'center', padding: '25px' }}>Reading List</h1>
          <DataTable />
          <AddBookList />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
