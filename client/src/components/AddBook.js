import React from 'react';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { GET_BOOKS, ADD_BOOK } from '../queries/queries';

function AddBookList() {
  const [bookName, setBookName] = useState();
  const [genre, setGenre] = useState();
  const [authorName, setAuthorName] = useState();
  const [AddBook, { loading, error }] = useMutation(ADD_BOOK, {
    refetchQueries: [GET_BOOKS],
  });
  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  function SubmitButton() {
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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        AddBook({
          variables: { name: bookName, Genre: genre, AuthorName: authorName },
        });
        setBookName(null);
        setAuthorName(null);
        setGenre(null);
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
          onChange={(e) => {
            setBookName(e.target.value);
          }}
        />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          onChange={(e) => {
            setGenre(e.target.value);
          }}
        />
      </div>
      <div className="field">
        <label>Author Name:</label>
        <input
          type="text"
          onChange={(e) => {
            setAuthorName(e.target.value);
          }}
        />
      </div>
      <SubmitButton />
    </form>
  );
}

export default AddBookList;
