import { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import { formatDate } from '../../utils/helpers';
import SnakeStats from './SnakeStats';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

export default function Chart({ eventsData, snake }) {
  const theme = useTheme();

  const getData = () => {
    const data = eventsData
      .sort((a, b) => a.date - b.date)
      .filter((event) => event.type === 'Weight')
      .map((event) => {
        const date = formatDate(event.date.toDate());
        return createData(date, event.weight);
      });

    const lastData = data.length - 1;
    const maxGrams = Number(data[lastData].amount) + 200;
    
    return (
      <LineChart
        data={data}
        margin={{
          top: 16,
          right: 16,
          bottom: 0,
          left: 24,
        }}
      >
        <XAxis
          dataKey="time"
          stroke={theme.palette.text.secondary}
          style={theme.typography.body2}
        />
        <YAxis type='number' domain={[0, maxGrams]} stroke={theme.palette.text.secondary} style={theme.typography.body2}>
          <Label
            angle={270}
            position="left"
            style={{
              textAnchor: 'middle',
              fill: theme.palette.text.primary,
              ...theme.typography.body1,
            }}
          >
            Weight (grams)
          </Label>
        </YAxis>
        <Line
          isAnimationActive={false}
          type="monotone"
          dataKey="amount"
          stroke={theme.palette.primary.main}
          dot={false}
        />
      </LineChart>
    );
  };

  useEffect(() => {
    getData();
  }, [eventsData]);

  return (
    <>
      <Title>{snake.name && `${snake.name}'s`} Weight</Title>
      <ResponsiveContainer>{getData()}</ResponsiveContainer>
    </>
  );
}
