import { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import useFirestore from '../../hooks/useFirestore';
import Loading from './Loading';
import EventDetails from './EventDetails';
import { formatDate } from '../../utils/helpers';

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders(props) {
  const { snake, eventsData, setEventsData } = props;
  const { loading } = useFirestore();
  const [openEventDetails, setOpenEventDetails] = useState(false);
  const [eventDetails, setEventDetails] = useState({});

  return (
    <>
      <Loading loading={loading} />
      <Title>{snake.name}&apos;s History</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Event</TableCell>
            <TableCell>Notes</TableCell>
            <TableCell align="right">Weight (grams)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {eventsData
            .sort((a, b) => b.date - a.date)
            .map((event) => (
              <TableRow
                key={event.id}
                onClick={() => {
                  setEventDetails(event);
                  setOpenEventDetails(true);
                }}
              >
                <TableCell>{formatDate(event.date.toDate())}</TableCell>
                <TableCell>{event.type}</TableCell>
                <TableCell>{event.notes}</TableCell>
                <TableCell align="right">{event.weight ? `${event.weight}g` : ''}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        see more
      </Link>
      {openEventDetails && (
        <EventDetails
          openEventDetails={openEventDetails}
          setOpenEventDetails={setOpenEventDetails}
          eventDetails={eventDetails}
          setEventsData={setEventsData}
          snake={snake}
        />
      )}
    </>
  );
}
