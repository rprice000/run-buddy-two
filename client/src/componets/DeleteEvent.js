import React from 'react';
import { useMutation } from '@apollo/client';
import { REMOVE_EVENT } from '../utils/mutations';
import { Button } from 'semantic-ui-react'




const DeleteButton = ({ eventId }) => {
  console.log('eventId', eventId)
    
    const [removeEvent] = useMutation(REMOVE_EVENT);


    const remove = async() => {
      // if (deleting) return;
      await removeEvent({
        variables: { eventId: eventId }
      });
    };

    return (
        <Button
        onClick={remove}>delete</Button>
    
    );

  }

  export default DeleteButton;