import * as React from 'react';
import { useQuery, NetworkStatus } from '@apollo/client';
import { GET_BOOKS } from '../queries/queries';

interface Book {
  id: number | string;
  name: string;
  genre: string;
  authorName: string;
}

interface BookData {
  books: Book[];
}

function DataTable(): JSX.Element {
  const { loading, error, data, refetch, networkStatus } = useQuery<BookData>(
    GET_BOOKS,
    {
      // pollInterval: 500,
      fetchPolicy: 'cache-and-network',
    }
  );
  console.log(data);
  if (networkStatus === NetworkStatus.refetch) return <p>Refetching!</p>;
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
          {data &&
            data.books.map((book, index: number) => {
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
