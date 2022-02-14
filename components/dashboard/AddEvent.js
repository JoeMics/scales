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
import Box from '@mui/material/Box';

export default function AddEvent(props) {
  const { openAddEvent, setOpenAddEvent } = props;
  const [type, setType] = useState('Eat');

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const handleClose = () => {
    setOpenAddEvent(false);
  };

  return (
    <div>
      <Dialog open={openAddEvent} onClose={handleClose}>
        <DialogTitle>ADD EVENT</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField autoFocus margin="dense" id="date" type="date" fullWidth variant="standard" />
          <InputLabel id="type">Type</InputLabel>
          <Select labelId="type" id="select-type" value={type} onChange={handleChange}>
            <MenuItem value={'Eat'}>Eat</MenuItem>
            <MenuItem value={'Shed'}>Shed</MenuItem>
            <MenuItem value={'Weight'}>Weight</MenuItem>
            <MenuItem value={'Poop'}>Poop</MenuItem>
          </Select>
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
