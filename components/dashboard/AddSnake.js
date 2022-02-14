import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import useFirestore from '../../hooks/useFirestore';

export default function AddSnake(props) {
  const { openAddSnake, setOpenAddSnake } = props;
  const { addNewSnake } = useFirestore();

  const [name, setName] = useState('');

  const handleClose = () => {
    setOpenAddSnake(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addNewSnake(name, 'josephmicla@gmail.com');
  };

  return (
    <div>
      <Dialog open={openAddSnake} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>ADD SNEK</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send
              updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
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
