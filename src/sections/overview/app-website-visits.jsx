import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import Chart, { useChart } from 'src/components/chart';


export default function AppWebsiteVisits({ title, subheader, sensorData, filter, color, ...other }) {
  const formatChartData = (data) => {
    const labels = data.map((item) => new Date(item.timestamp).toISOString());
    const seriesData = data.map((item) => item.data[filter]);
    
    return {
      labels,
      colors: color,
      series: [
        {
          name: title,
          type: 'line',
          fill: 'solid',
          data: seriesData,
        }
      ],
    };
  };
  const { labels, colors, series, options } = formatChartData(sensorData);
  
  const chartOptions = useChart({
    colors,
    plotOptions: {
      bar: {
        columnWidth: '16%',
      },
    },
    fill: {
      type: series.map((i) => i.fill),
    },
    labels,
    xaxis: {
      type: 'datetime',
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value, {seriesIndex, w}) => {
            const seriesName = w.config.series[seriesIndex].name;

          if (typeof value !== 'undefined') {
            if (seriesName === 'Temperature') {
              return `${value.toFixed(2)} ºC`;
            }
            
            if (seriesName === 'Humidity') {
              return `${value.toFixed(2)} %`;
            }
            
            if (seriesName === 'Pressure') {
              return `${value.toFixed(0)} hPa`;
            }

            return value.toFixed(0);
          }
          return value;
        },
      },
    },
    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }}>
        <Chart
          dir="ltr"
          type="line"
          series={series}
          options={chartOptions}
          width="100%"
          height={364}
        />
      </Box>
    </Card>
  );
}

AppWebsiteVisits.propTypes = {
  color: PropTypes.array,
  filter: PropTypes.string,
  sensorData: PropTypes.array,
  subheader: PropTypes.string,
  title: PropTypes.string,
};
