import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { formatDate } from '../../utils/helpers';
import DropDown from './SnakeDropDown';

export default function SnakeStats(props) {
  const { setDeleteSnake, eventsData } = props;

  const weight = eventsData
    .sort((a, b) => b.date - a.date)
    .filter((event) => event.type === 'Weight')
    .map((event) => {
      return event.weight;
    });

  const shedDate = eventsData
    .sort((a, b) => b.date - a.date)
    .filter((event) => event.type === 'Shed')
    .map((event) => {
      return formatDate(event.date.toDate());
    });

  const fedDate = eventsData
    .sort((a, b) => b.date - a.date)
    .filter((event) => event.type === 'Eat')
    .map((event) => {
      return formatDate(event.date.toDate());
    });

  const poopDate = eventsData
    .sort((a, b) => b.date - a.date)
    .filter((event) => event.type === 'Poop')
    .map((event) => {
      return formatDate(event.date.toDate());
    });

  return (
    <>
      <div className="drop-delete">
        <DropDown {...props} />
        <Button
          sx={{ ml: '2rem', mb: '.5rem' }}
          color="error"
          onClick={(e) => {
            setDeleteSnake(true);
          }}
        >
          DELETE
        </Button>
      </div>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Current Weight: {weight[0]}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Last shed: {shedDate[0]}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Last fed: {fedDate[0]}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Last poop: {poopDate[0]}
      </Typography>
    </>
  );
}
