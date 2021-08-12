import { gql } from '@apollo/client';

export const GET_BOOKS = gql`
  query GetBooks {
    books {
      name
      id
      genre
      authorName
    }
  }
`;

export const ADD_BOOK = gql`
  mutation AddBook($name: String!, $Genre: String!, $AuthorName: String!) {
    addBook(name: $name, genre: $Genre, authorName: $AuthorName) {
      name
      genre
      authorName
    }
  }
`;
