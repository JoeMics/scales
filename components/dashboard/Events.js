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
import { Button } from '@mui/material';
import EditEvent from './EditEvent';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders(props) {
  const { snake, eventsData, setEventsData, setSort, sort } = props;
  const { loading } = useFirestore();
  const [openEventDetails, setOpenEventDetails] = useState(false);
  const [eventDetails, setEventDetails] = useState({});
  const [openEditEvent, setOpenEditEvent] = useState(false);

  const handleSort = () => {
    sort === 'descending' ? setSort('ascending') : setSort('descending');
  };

  return (
    <>
      <Loading loading={loading} />
      <div>
        <Title>{snake.name}&apos;s History</Title>
        <Button onClick={handleSort}>
          {sort === 'ascending' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />} Sort
        </Button>
      </div>
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
          {sort === 'descending' &&
            eventsData
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
          {sort === 'ascending' &&
            eventsData
              .sort((a, b) => a.date - b.date)
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
          setOpenEditEvent={setOpenEditEvent}
          snake={snake}
        />
      )}
      {openEditEvent && (
        <EditEvent
          eventDetails={eventDetails}
          setEventsData={setEventsData}
          setOpenEditEvent={setOpenEditEvent}
          openEditEvent={openEditEvent}
          setOpenEventDetails={setOpenEventDetails}
          snake={snake}
        />
      )}
    </>
  );
}
