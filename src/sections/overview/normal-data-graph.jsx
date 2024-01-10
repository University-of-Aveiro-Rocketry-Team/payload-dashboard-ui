import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import Chart, { useChart } from 'src/components/chart';

import { fetchNEO7MData, fetchBME680Data, fetchMPU6500Data } from '../common/api';


export default function NormalDataGraph({ title, subheader, dataFilters, color, ...other }) {
  const [allData, setAllData] = React.useState([]);
  const [bme680Data, setBme680Data] = React.useState(null);
  const [gpsData, setGpsData] = React.useState(null);

  // Fetch API Data
  React.useEffect(() => {
    const intervalId = setInterval(() => {

      // Speed Graph
      if (dataFilters.includes('speed')) {
        fetchNEO7MData()
          .then((data) => {
            setAllData(data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
      
      // Altitude Graph
      if (dataFilters.includes('altitude') && dataFilters.includes('pressure')) {        
        fetchNEO7MData()
        .then((data) => {
          setGpsData(data);
        })
        .catch((error) => {
          console.error(error);
        });
        
        fetchBME680Data()
        .then((data) => {
          setBme680Data(data);
        })
        .catch((error) => {
          console.error(error);
        });
        
        if (gpsData && bme680Data) {
          const mergedData = gpsData.map((item, index) => ({
            timestamp: item.timestamp,
            data: {
              altitude: item.data.altitude,
              pressure: bme680Data[index].data.pressure,
            },
          }));

          setAllData(mergedData);
        }
      }
      
      // Acceleration Graph
      if (dataFilters.includes('acceleration_x') || dataFilters.includes('acceleration_y') || dataFilters.includes('acceleration_z')) {
        fetchMPU6500Data()
          .then((data) => {
            setAllData(data);
          })
          .catch((error) => {
            console.error(error);
          });
      }

      // Vibrations Graph
      if (dataFilters.includes('vibrations')) {
        // TO DO
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [bme680Data, gpsData, dataFilters]);

  const formatChartData = (data, filters) => {
    try {
      // Slice the data array to keep only the last 10 elements
      const latestData = data.slice(-10);

      const labels = latestData.map((item) => new Date(item.timestamp).toISOString());
      const series = filters.map((filter) => {
        const seriesData = latestData.map((item) => item.data[filter]);
        let customName = filter.charAt(0).toUpperCase() + filter.slice(1);

        // Custom name
        if (filter === 'Altitude') customName = 'GPS-Altitude';
        if (filter.indexOf('acceleration') !== -1)
          customName = filter.substring(filter.length - 1).toUpperCase();

        return {
          name: customName,
          type: 'line',
          fill: 'solid',
          data: seriesData,
        };
      });

      return {
        labels,
        colors: color,
        series,
      };
    } catch (error) {
      return {
        labels: [],
        colors: [],
        series: [],
      };
    }
  };
  const { labels, colors, series, options } = formatChartData(allData, dataFilters);

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
    yaxis: {
      labels: {
        formatter: (value) => value.toFixed(2),
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      x: {
        formatter: function formatTime(value) {
          return new Date(value).toISOString().split('T')[1].split('.')[0];
        },
      },
      y: {
        formatter: (value, { seriesIndex, w }) => {
          const seriesName = w.config.series[seriesIndex].name;

          if (typeof value !== 'undefined') {
            if (seriesName === 'Temperature') {
              return `${value.toFixed(2)} ºC`;
            }

            if (seriesName === 'Humidity') {
              return `${value.toFixed(2)} %`;
            }

            if (seriesName === 'Altitude' || seriesName === 'Pressure') {
              return `${value.toFixed(2)} m`;
            }

            if (seriesName === 'Speed') {
              return `${value.toFixed(2)} km/h`;
            }

            if (seriesName === 'X' || seriesName === 'Y' || seriesName === 'Z') {
              return `${value.toFixed(4)} g`;
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

NormalDataGraph.propTypes = {
  color: PropTypes.array,
  dataFilters: PropTypes.array,
  subheader: PropTypes.string,
  title: PropTypes.string,
};
