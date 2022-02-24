import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useFirestore from '../../hooks/useFirestore';
import Loading from './Loading';
import { Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function DeleteSnake(props) {
  const { deleteSnake, setDeleteSnake, snake, userID, setSnake, setAllSnakes } = props;
  const [error, setError] = useState();
  const { deleteCurrentSnake, loading, fetchAllSnakes } = useFirestore();

  const handleClose = () => {
    setDeleteSnake(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const getSnakes = async () => {
    const res = await fetchAllSnakes(userID);
    setSnake(res[0] || {});
    setAllSnakes(res || []);
  };

  const handleDelete = async () => {
    try {
      await deleteCurrentSnake(snake.id);
      getSnakes();
      handleClose();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <Dialog open={deleteSnake} onClose={handleClose}>
        <DialogActions>
          <IconButton sx={{ mb: '-1rem' }} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogActions>
        <Loading loading={loading} />
        <form onSubmit={handleSubmit}>
          <DialogTitle>Are you sure you want to delete {snake.name}?</DialogTitle>
          <DialogContent>
            <DialogContentText>This CANNOT be undone.</DialogContentText>
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
