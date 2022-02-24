import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import DropDown from './SnakeDropDown';

export default function SnakeStats(props) {
  const { setDeleteSnake } = props;

  return (
    <>
      <div>
        <DropDown {...props} />
        <Button
          sx={{ mb: '1rem' }}
          color="error"
          onClick={(e) => {
            setDeleteSnake(true);
          }}
        >
          DELETE
        </Button>
      </div>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Last shed: 15 March, 2019
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Last fed: on 15 March, 2019
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Current Weight: 2000g
      </Typography>
    </>
  );
}
