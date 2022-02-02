import React from 'react';
import { useMutation } from '@apollo/client';
import { REMOVE_EVENT } from '../utils/mutations';
// import { QUERY_EVENT } from '../utils/queries';
import { Button } from 'semantic-ui-react'




const DeleteButton = ({ eventId }) => {
    
    const [removeEvent, { loading: deleting }] = useMutation(REMOVE_EVENT);

    // if (event) return null;

    // const updateCache = (event) => {
    //   const data = event.readQuery({
    //     query: QUERY_EVENT,
    //     variables: {
    //        event: event._id
    //     }
    //   });

    //   console.log
    //   const newData = {
    //     events: data.events.filter((event) => event.id !== event.id)
    //   }
    //   event.writeQuery({
    //     query: QUERY_EVENT,
    //     variables: { event: event._id
    //     },
    //     data: newData
    //   });
    // }

    const remove = () => {
      if (deleting) return;
      removeEvent({
        variables: { eventId }
      });
    };

    return (
        <Button
        onClick={remove}>delete</Button>
    //   <View style={styles.deleteButton}>
    //     <Icon
    //       name="delete"
    //       size={26}
    //       onPress={remove}
    //       disabled={deleting}
    //       color={"#BC0000"}
    //     />
    //   </View>
    );

  }

  export default DeleteButton;