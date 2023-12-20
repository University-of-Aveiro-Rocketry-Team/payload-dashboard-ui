import PropTypes from 'prop-types';
// import { faker } from '@faker-js/faker';
import React, { useCallback } from 'react';  

import Card from '@mui/material/Card';
import Timeline from '@mui/lab/Timeline';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';

import { fDateTime } from 'src/utils/format-time';

import { fetchNEO7MData, fetchBME680Data, fetchMPU6500Data } from '../common/api';

export default function DataTimeline({ title, subheader, ...other }) {
  const [allData, setAllData] = React.useState([]);

  const fetchData = async () => {
    try {
      const [mpu6500, bme680, neo7m] = await Promise.all([
        fetchMPU6500Data(),
        fetchBME680Data(),
        fetchNEO7MData(),
      ]);

      // Ensure each data point has a timestamp
      // Example: { timestamp: ..., data: ... }
      return {
        mpu6500: mpu6500.map((d) => ({ timestamp: new Date(d.timestamp), data: d })),
        bme680: bme680.map((d) => ({ timestamp: new Date(d.timestamp), data: d })),
        neo7m: neo7m.map((d) => ({ timestamp: new Date(d.timestamp), data: d })),
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      return { mpu6500: [], bme680: [], neo7m: [] };
    }
  };

  const findClosestTimestamp = (targetTimestamp, dataPoints) => {
    if (!dataPoints.length) return null;

    return dataPoints.reduce((prev, curr) =>
      Math.abs(curr.timestamp - targetTimestamp) < Math.abs(prev.timestamp - targetTimestamp)
        ? curr
        : prev
    );
  };

  const mergeData = useCallback(
    (bme680, mpu6500, neo7m) =>
      bme680.map((bmeDataPoint, index) => {
        const mpuMatch = findClosestTimestamp(bmeDataPoint.timestamp, mpu6500);
        const neoMatch = findClosestTimestamp(bmeDataPoint.timestamp, neo7m);

        return {
          packetNumber: index + 1,
          time: bmeDataPoint.timestamp,
          bme680: bmeDataPoint.data,
          mpu6500: mpuMatch ? mpuMatch.data : null,
          neo7m: neoMatch ? neoMatch.data : null,
        };
      }),
    []
  );

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData().then(({ bme680, mpu6500, neo7m }) => {
        const mergedData = mergeData(bme680, mpu6500, neo7m);
        // Sorting the merged data in descending order of time
        mergedData.sort((a, b) => b.time - a.time);
        setAllData(mergedData);
        console.log(mergedData);
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [mergeData]);

  /*
  const list = Array.from({ length: 5 }).map((_, index) => ({
    id: faker.string.uuid(),
    title: [
      '1983, orders, $4220',
      '12 Invoices have been paid',
      'Order #37745 from September',
      'New order placed #XF-2356',
      'New order placed #XF-2346',
    ][index],
    type: `order${index + 1}`,
    time: faker.date.past(),
  }));
  */

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Timeline
        sx={{
          m: 0,
          p: 3,
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        {allData.map((item, index) => (
          <OrderItem key={item.packetNumber} item={item} lastTimeline={index === allData.length - 1} />
        ))}
      </Timeline>
    </Card>
  );
}

DataTimeline.propTypes = {
  subheader: PropTypes.string,
  title: PropTypes.string,
};

function OrderItem({ item, lastTimeline }) {
  const { packetNumber, time, bme680, mpu6500, neo7m } = item;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          color={
            // (type === 'order1' && 'primary') ||
            // (type === 'order2' && 'success') ||
            // (type === 'order3' && 'info') ||
            // (type === 'order4' && 'warning') ||
            'primary'
          }
        />
        {lastTimeline ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        <Typography variant="subtitle2">Packet {packetNumber}</Typography>

        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
          {fDateTime(time)}
        </Typography>

        <Typography variant="body2">BME680 Data: {JSON.stringify(bme680)}</Typography>
        <Typography variant="body2">MPU6500 Data: {JSON.stringify(mpu6500)}</Typography>
        <Typography variant="body2">NEO7M Data: {JSON.stringify(neo7m)}</Typography>
      </TimelineContent>
    </TimelineItem>
  );
}

OrderItem.propTypes = {
  item: PropTypes.object,
  lastTimeline: PropTypes.bool,
};
