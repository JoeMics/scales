import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

// Output:
// Today's date formatted as YYYY-MM-DD
const getTodayString = () => {
  const today = new Date().toLocaleDateString('en-US').split('/');
  const month = today[0] < 10 ? `0${today[0]}` : today[0];
  const day = today[1] < 10 ? `0${today[1]}` : today[1];
  return [today[2], month, day].join('-');
};

export default function AddEvent(props) {
  const { openAddEvent, setOpenAddEvent } = props;
  const [type, setType] = useState('Eat');
  const [date, setDate] = useState(getTodayString());
  const [notes, setNotes] = useState('');

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const handleClose = () => {
    setOpenAddEvent(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log({
      date,
      type,
      notes,
    });
  };

  return (
    <div>
      <Dialog open={openAddEvent} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>ADD EVENT</DialogTitle>
          <DialogContent>
            <DialogContentText>Make a note about your snake.</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="date"
              type="date"
              fullWidth
              variant="standard"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
            <InputLabel id="type">Type</InputLabel>
            <Select labelId="type" id="select-type" value={type} onChange={handleChange}>
              <MenuItem value={'Eat'}>Eat</MenuItem>
              <MenuItem value={'Shed'}>Shed</MenuItem>
              <MenuItem value={'Weight'}>Weight</MenuItem>
              <MenuItem value={'Poop'}>Poop</MenuItem>
            </Select>
            {type !== 'Weight' && (
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
            )}
            {type === 'Weight' && (
              <TextField
                autoFocus
                margin="dense"
                id="notes"
                label="Weight in grams"
                type="number"
                placeholder="ex. 200"
                fullWidth
                variant="standard"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Subscribe</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
