import Typography from '@mui/material/Typography';
import Title from './Title';
import useFirestore from '../../hooks/useFirestore';
import { useEffect, useState } from 'react';

export default function SnakeStats(props) {
  const [snake, setSnake] = useState({});
  const { fetchSnakeById } = useFirestore();

  useEffect(() => {
    const getSnake = async () => {
      const snakeId = 'RGJLV1PyZVybyHRjMZYb';

      const data = await fetchSnakeById(snakeId);
      console.log(data);
      setSnake(data);
    };

    getSnake();
  }, []);

  return (
    <>
      <Title>Stats</Title>
      <Typography component="p" variant="h4">
        {snake.name}
      </Typography>
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
