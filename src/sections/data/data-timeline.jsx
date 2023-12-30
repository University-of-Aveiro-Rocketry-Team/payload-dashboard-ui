import React from 'react';
import PropTypes from 'prop-types';
import { faker } from '@faker-js/faker';

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

import { fetchLogs } from '../common/api';

export default function DataTimeline({ title, subheader, ...other }) {
  const [latestData, setLatestData] = React.useState(null);

  // Fetch API Data
  React.useEffect(() => {
    fetchLogs()
      .then((data) => {
        console.log(data);
        setLatestData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // LINE EXAMPLES:
  // "INFO 2023-12-29 23:29:26,198 /home/tiago/Desktop/UART_Dashboard_API/rest_api/bme680/views.py changed, reloading.\n",

  // "WARNING 2023-12-29 23:31:07,171 Method Not Allowed: /bme680/history/0\n",
  
  // "ERROR 2023-12-29 23:31:18,968 Internal Server Error: /bme680/\n",
  // "Traceback (most recent call last):\n",
  // "  File \"/home/tiago/Desktop/UART_Dashboard_API/rest_api/env/lib/python3.10/site-packages/django/core/handlers/exception.py\", line 55, in inner\n",
  // "    response = get_response(request)\n",

  // For every line, ignore the ones that do not start with INFO, WARNING or ERROR
  // After get the first word, its the type
  // Then get the date and time, its the second and third word
  // Ignore the ",198" from the time and the "\n" from the end of the line
  // The rest is the title
  // add also an index to keep the order of the lines

  const list_tmp = latestData?.filter((line) => line.startsWith("INFO") || line.startsWith("WARNING") || line.startsWith("ERROR"))
    .map((line, index) => {
      const type_tmp = line.split(" ")[0];
      const date_tmp = line.split(" ")[1];
      const time_tmp = line.split(" ")[2].slice(0, -4);
      const title_tmp = line.split(" ").slice(3).join(" ").split("\n")[0];
      return {
        id: faker.string.uuid(),
        title: title_tmp,
        type: type_tmp,
        time: `${date_tmp} ${time_tmp}`,
        index: index+1,
      }
    });

    console.log(list_tmp);


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
        {list_tmp?.map((item, index) => (
          <OrderItem key={item.id} item={item} lastTimeline={index === list_tmp.length - 1} />
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
  const { type, title, time} = item;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          color={
            (type === 'INFO' && 'success') ||
            (type === 'WARNING' && 'warning') ||
            (type === 'ERROR' && 'error') ||
            (type === 'DEBUG' && 'info') ||
            'error'
          }
        />
        {lastTimeline ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        <Typography variant="subtitle2">{title}</Typography>

        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
          {fDateTime(time)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}

OrderItem.propTypes = {
  item: PropTypes.object,
  lastTimeline: PropTypes.bool,
};
