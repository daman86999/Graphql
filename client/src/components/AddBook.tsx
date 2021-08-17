import * as React from 'react';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { GET_BOOKS, ADD_BOOK } from '../queries/queries';

function AddBookList(): JSX.Element {
  const [bookName, setBookName] = useState<string | undefined>();
  const [genre, setGenre] = useState<string | undefined>();
  const [authorName, setAuthorName] = useState<string | undefined>();
  const [AddBook, { loading, error }] = useMutation(ADD_BOOK, {
    refetchQueries: [GET_BOOKS],
  });
  if (loading) return <p>Submitting...</p>;
  if (error) return <p>{`Submission error! ${error.message}`}</p>;

  function SubmitButton(): JSX.Element {
    if (bookName && genre && authorName) {
      return <button type="submit">Add Book</button>;
    } else {
      return (
        <button type="submit" disabled>
          Add Book
        </button>
      );
    }
  }

  return (
    <>
      {
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            AddBook({
              variables: {
                name: bookName,
                Genre: genre,
                AuthorName: authorName,
              },
            });
            setBookName(undefined);
            setAuthorName(undefined);
            setGenre(undefined);
          }}
          style={{
            margin: '50px auto',
            display: 'flex',
            width: '50%',
            textAlign: 'center',
          }}
        >
          <div className="field">
            <label>Book name:</label>
            <input
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setBookName(e.target.value);
              }}
            />
          </div>
          <div className="field">
            <label>Genre:</label>
            <input
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setGenre(e.target.value);
              }}
            />
          </div>
          <div className="field">
            <label>Author Name:</label>
            <input
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setAuthorName(e.target.value);
              }}
            />
          </div>
          <SubmitButton />
        </form>
      }
    </>
  );
}

export default AddBookList;
