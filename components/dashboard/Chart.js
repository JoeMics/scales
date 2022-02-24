import { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import { formatDate } from '../../utils/helpers';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

export default function Chart({ eventsData }) {
  const theme = useTheme();

  const getData = () => {
    const data = eventsData
      .sort((a, b) => a.date - b.date)
      .map((event) => {
        const date = formatDate(event.date.toDate());
        return createData(date, event.weight);
      });

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
        <YAxis stroke={theme.palette.text.secondary} style={theme.typography.body2}>
          <Label
            angle={270}
            position="left"
            style={{
              textAnchor: 'middle',
              fill: theme.palette.text.primary,
              ...theme.typography.body1,
            }}
          >
            Sales ($)
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
      <Title>Today</Title>
      <ResponsiveContainer>{getData()}</ResponsiveContainer>
    </>
  );
}
