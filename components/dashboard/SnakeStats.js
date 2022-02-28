import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { formatDate } from '../../utils/helpers';
import DropDown from './SnakeDropDown';

export default function SnakeStats(props) {
  const { setDeleteSnake, setOpenEditSnake, eventsData } = props;

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
    .filter((event) => event.type === 'Defecation')
    .map((event) => {
      return formatDate(event.date.toDate());
    });

  return (
    <>
      <div className="drop-delete">
        <DropDown {...props} />
      </div>
      <Typography color="text.secondary" sx={{ flex: 1, minWidth: '20ch' }}>
        Current Weight: {weight[0] || 'N/A'}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1, minWidth: '20ch' }}>
        Last Shed: {shedDate[0] || 'N/A'}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1, minWidth: '20ch' }}>
        Last Fed: {fedDate[0] || 'N/A'}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1, minWidth: '20ch' }}>
        Last Defecation: {poopDate[0] || 'N/A'}
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          color="error"
          onClick={(e) => {
            setDeleteSnake(true);
          }}
        >
          DELETE
        </Button>
        <Button
          color="info"
          onClick={(e) => {
            setOpenEditSnake(true);
          }}
        >
          Edit
        </Button>
      </div>
    </>
  );
}
