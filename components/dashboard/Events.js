import { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import useFirestore from '../../hooks/useFirestore';

function preventDefault(event) {
  event.preventDefault();
}

function formatDate(date) {
  return new Intl.DateTimeFormat([]).format(date);
}

export default function Orders(props) {
  const [eventsData, setEventsData] = useState([]);
  const { snake } = props;

  const { fetchEvents } = useFirestore();

  useEffect(() => {
    async function getAllEvents() {
      if (snake.id) {
        const results = await fetchEvents(snake.id);
        setEventsData(results);
      }
    }

    getAllEvents();
  }, [snake]);

  return (
    <>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Notes</TableCell>
            <TableCell align="right">Weight (grams)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {eventsData.map((event) => (
            <TableRow key={event.id}>
              <TableCell>{formatDate(event.date.toDate())}</TableCell>
              <TableCell>{event.type}</TableCell>
              <TableCell>{event.notes}</TableCell>
              <TableCell align="right">{event.weight ? `${event.weight}g` : ''}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </>
  );
}