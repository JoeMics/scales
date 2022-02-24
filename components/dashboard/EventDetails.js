import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useFirestore from '../../hooks/useFirestore';
import Loading from './Loading';
import { Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function EventDetails(props) {
  const { openEventDetails, setOpenEventDetails, eventDetails, setEventsData, snake } = props;
  const { deleteEvent, loading } = useFirestore();

  const [error, setError] = useState();

  const handleClose = () => {
    setOpenEventDetails(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleDelete = async () => {
    try {
      await deleteEvent(snake.id, eventDetails.id);

      handleClose();
      setEventsData((prev) => prev.filter((event) => event.id !== eventDetails.id));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <Dialog open={openEventDetails} onClose={handleClose}>
        <DialogActions>
          <IconButton sx={{ mb: '-1rem' }} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogActions>
        <Loading loading={loading} />
        <form onSubmit={handleSubmit}>
          <DialogTitle>{eventDetails.date.toDate().toDateString()}</DialogTitle>
          <DialogContent>
            <DialogContentText>Event: {eventDetails.type}</DialogContentText>
            {eventDetails.notes && (
              <DialogContentText>Notes: {eventDetails.notes}</DialogContentText>
            )}
            {eventDetails.weight && (
              <DialogContentText>Weight: {eventDetails.weight}</DialogContentText>
            )}
          </DialogContent>
          {error && <Alert severity="error">{error}</Alert>}
          <DialogActions>
            <Button onClick={() => console.log('To be continued 😊')}>Edit</Button>
            <Button onClick={handleDelete} color="error">
              Delete
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
