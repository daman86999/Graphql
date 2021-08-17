import * as React from 'react';
import { useSubscription } from '@apollo/client';
import { ON_BOOK_ADD } from '../queries/queries';
import { useState, useEffect } from 'react';

const Message: React.FC = () => {
  const { data } = useSubscription(ON_BOOK_ADD);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 3000);
  }, [data]);

  return (
    <>
      {show && data !== undefined && (
        <div
          style={{
            background: 'green',
            color: 'white',
            padding: '10px',
            position: 'absolute',
            top: '50px',
            right: '150px',
          }}
        >
          {data.bookAdded.name} added
        </div>
      )}
    </>
  );
};

export default Message;
