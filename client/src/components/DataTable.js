// import React, { Component } from 'react';
// import { gql } from 'apollo-boost';
// import { graphql } from 'react-apollo';

// const getBooksQuery = gql`
//   {
//     books {
//       name
//       id
//       genre
//     }
//   }
// `;

// class BookList extends Component {
//   displayBooks() {
//     var data = this.props.data;
//     if (data.loading) {
//       return <div>Loading books...</div>;
//     } else {
//       return data.books.map((book) => {
//         return <li key={book.id}>{book.name}</li>;
//       });
//     }
//   }
//   render() {
//     console.log(this.props);
//     return (
//       <div>
//         <ul id="book-list">{this.displayBooks()}</ul>
//       </div>
//     );
//   }
// }

// export default graphql(getBooksQuery)(BookList);

import React from 'react';
import { useQuery, NetworkStatus } from '@apollo/client';
import { GET_BOOKS } from '../queries/queries';

function DataTable() {
  const { loading, error, data, refetch, networkStatus } = useQuery(GET_BOOKS, {
    // pollInterval: 500,
  });
  console.log(data);
  if (networkStatus === NetworkStatus.refetch) return 'Refetching!';
  if (loading) return <p>Loading ...</p>;
  if (error) return <p>error</p>;

  return (
    <>
      <button onClick={() => refetch()}>Refresh</button>
      <table
        style={{
          margin: '10px auto',
          border: '2px solid black',
          width: '50%',
          textAlign: 'center',
        }}
      >
        <thead>
          <tr>
            <th></th>
            <th>Book_Name</th>
            <th>Genre</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {data.books.map((book, index) => {
            return (
              <tr key={book.id}>
                <td>{index + 1}</td>
                <td>{book.name}</td>
                <td>{book.genre}</td>
                <td>{book.authorName}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default DataTable;
