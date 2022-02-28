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
import EventDropDown from './EventDropDown';
import SnakeDropDown from './SnakeDropDown';

// Output:
// Today's date formatted as YYYY-MM-DD
const getTodayString = () => {
  const today = new Date().toLocaleDateString('en-US').split('/');
  const month = today[0] < 10 ? `0${today[0]}` : today[0];
  const day = today[1] < 10 ? `0${today[1]}` : today[1];
  return [today[2], month, day].join('-');
};

export default function AddEvent(props) {
  const { openAddEvent, setOpenAddEvent, snake, setSnake, allSnakes, setEventsData } = props;
  const [type, setType] = useState('Eat');
  const [date, setDate] = useState(getTodayString());
  const [notes, setNotes] = useState('');
  const [weight, setWeight] = useState('');
  const events = ['Eat', 'Shed', 'Weight', 'Defecation'];

  const { createEvent, fetchEvents, loading } = useFirestore();

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const handleClose = () => {
    setOpenAddEvent(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      date,
      type,
      // notes: type === 'Weight' ? parseInt(notes) : notes,
      weight: weight ? weight : null,
      notes,
    };

    await createEvent(snake.id, data);

    const updatedEvents = await fetchEvents(snake.id);
    setEventsData(updatedEvents);

    handleClose();
  };

  return (
    <div>
      <Loading loading={loading} />
      <Dialog open={openAddEvent} onClose={handleClose} fullWidth maxWidth="md">
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add Event</DialogTitle>
          <DialogContent>
            <DialogContentText>Make a note about your snake.</DialogContentText>
            <SnakeDropDown snake={snake} allSnakes={allSnakes} setSnake={setSnake} />
            <EventDropDown
              events={events}
              handleChange={handleChange}
              type={type}
              setType={setType}
            />
            <TextField
              autoFocus
              margin="dense"
              id="date"
              type="date"
              maxwidth="sm"
              variant="standard"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
            {type === 'Weight' && (
              <TextField
                autoFocus
                margin="dense"
                id="notes"
                label="Weight in grams"
                type="number"
                placeholder="ex. 200"
                fullWidth
                required
                variant="standard"
                value={weight}
                onChange={(event) => setWeight(event.target.value)}
              />
            )}
            <TextField
              autoFocus
              margin="dense"
              id="notes"
              label="Notes"
              type="text"
              multiline
              minRows={5}
              fullWidth
              variant="standard"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            {snake ? (
              <Button type="submit" disabled>
                Submit
              </Button>
            ) : (
              <Button type="submit">Submit</Button>
            )}
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
