import React from 'react';
import { useSubscription } from '@apollo/client';
import { ON_BOOK_ADD } from '../queries/queries';

export default function LatestBooks() {
  const { data, loading } = useSubscription(ON_BOOK_ADD);
  console.log(data);
  return <h4>New Book: {!loading && data.bookAdded.name}</h4>;
}
