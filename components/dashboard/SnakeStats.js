import Typography from '@mui/material/Typography';
import DropDown from './SnakeDropDown';

export default function SnakeStats(props) {
  return (
    <>
      <DropDown {...props} />
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
