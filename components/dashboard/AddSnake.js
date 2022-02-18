import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useFirestore from '../../hooks/useFirestore';
import { useAuth } from '../../providers/AuthUserContext';
import Loading from './Loading';
import { Alert } from '@mui/material';

export default function AddSnake(props) {
  const { openAddSnake, setOpenAddSnake } = props;
  const { addNewSnake, loading } = useFirestore();
  const { authUser } = useAuth();

  const [name, setName] = useState('');
  const [error, setError] = useState();

  const handleClose = () => {
    setOpenAddSnake(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addNewSnake(name, authUser.uid);
      handleClose();
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <Dialog open={openAddSnake} onClose={handleClose}>
        <Loading loading={loading} />
        <form onSubmit={handleSubmit}>
          <DialogTitle>New Snake</DialogTitle>
          <DialogContent>
            <DialogContentText>Add a new snake to your dashboard.</DialogContentText>
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
          {error && <Alert severity="error">{error}</Alert>}
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Create</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
