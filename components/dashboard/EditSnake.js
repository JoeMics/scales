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

export default function EditSnake(props) {
  const { openEditSnake, setOpenEditSnake, setAllSnakes, setSnake, snake } = props;
  const { editSnake, loading } = useFirestore();
  const { authUser } = useAuth();

  const [name, setName] = useState(snake.name || '');
  const [error, setError] = useState();

  const handleClose = () => {
    setOpenEditSnake(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const snakeDoc = await editSnake(name, snake.id);
      setAllSnakes((prev) => [...prev, snakeDoc]);
      setSnake(() => snakeDoc);
      handleClose();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <Dialog open={openEditSnake} onClose={handleClose}>
        <Loading loading={loading} />
        <form onSubmit={handleSubmit}>
          <DialogTitle>Rename {snake.name}</DialogTitle>
          <DialogContent>
            <DialogContentText>Change your snake&apos;s name</DialogContentText>
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
              required
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
