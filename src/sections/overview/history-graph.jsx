import React from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from "@mui/material/CardHeader";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import Chart, { useChart } from "src/components/chart";

import { fetchMQ9Data, fetchBME680Data, fetchSEN0159Data } from "../common/api";

export default function HistoryGraph({ title, subheader, dataFilters, color, ...other }) {
    // For graph
    const [info, setData] = React.useState(null);
    const [allData, setAllData] = React.useState(null);

    // For toggle button
    const [history, setHistory] = React.useState('10');

    const handleChange = (event, newAlignment) => {
      setHistory(newAlignment);
    };

    // Fetch from API
    React.useEffect(() => {
        const intervalId = setInterval(() => {

            // co graph (mq9)
            if (dataFilters.includes('co')) {
                fetchMQ9Data(Number(history))
                    .then((data) => {
                        setData(data);
                        console.log(data);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }

            // co2 graph (sen0159)
            if (dataFilters.includes('co2')) {
                fetchSEN0159Data(Number(history))
                    .then((data) => {
                        setData(data);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }

            // temp, humidity, pressure graph (bme680)
            if (dataFilters.includes('temperature') || dataFilters.includes('humidity') || dataFilters.includes('gas') || dataFilters.includes('pressure')) {
                fetchBME680Data(Number(history))
                    .then((data) => {
                        setData(data);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }

            if (info) {
                if (dataFilters.includes('temperature')) {
                    const tmp = info.map((item) => ({
                        timestamp: item.time,
                        data: {
                            temperature: item.temperature,
                        },
                    }));
                    setAllData(tmp);
                }
                if (dataFilters.includes('humidity')) {
                    const tmp = info.map((item) => ({
                        timestamp: item.time,
                        data: {
                            humidity: item.humidity,
                        },
                    }));
                    setAllData(tmp);

                }
                if (dataFilters.includes('gas')) {
                    const tmp = info.map((item) => ({
                        timestamp: item.time,
                        data: {
                            gas: item.gas,
                        },
                    }));
                    setAllData(tmp);
                }
                if (dataFilters.includes('pressure')) {
                    const tmp = info.map((item) => ({
                        timestamp: item.time,
                        data: {
                            pressure: item.pressure,
                        },
                    }));
                    setAllData(tmp);
                }
                if (dataFilters.includes('co')) {
                    const tmp = info.map((item) => ({
                        timestamp: item.time,
                        data: {
                            co: item.co,
                        },
                    }));
                    setAllData(tmp);
                }
                if (dataFilters.includes('co2')) {
                    const tmp = info.map((item) => ({
                        timestamp: item.time,
                        data: {
                            co2: item.co2,
                        },
                    }));
                    setAllData(tmp);
                }
                if (dataFilters.includes('o2')) {
                    const tmp = info.map((item) => ({
                        timestamp: item.time,
                        data: {
                            o2: item.o2,
                        },
                    }));
                    setAllData(tmp);
                }
                console.log("DATA", allData)
            }


        }, 1000);


        return () => clearInterval(intervalId);
    }, [info, allData, dataFilters, history]);

  
    const formatChartData = (data, filters) => {
        try {
            const labels = data.map((item) => new Date(item.timestamp).toISOString());
            const series = filters.map((filter) => {
              const seriesData = data.map((item) => item.data[filter]);
              let customName

            if(filter.includes('temperature')) {
            customName = 'Temperature';
            }
            else if(filter.includes('humidity')) {
                customName = 'Humidity';
            }
            else if(filter.includes('gas')) {
                customName = 'Gas';
            }
            else if(filter.includes('co')) {
                customName = 'CO';
            }
            else if(filter.includes('co2')) {
                customName = 'CO2';
            }
            else if(filter.includes('o2')) {
                customName = 'O2';
            }
      
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
    
                if (seriesName === 'Pressure') {
                    return `${value.toFixed(2)} hPa`;
                }

                if (seriesName === 'CO') {
                    return `${value.toFixed(2)} ppm`;
                }

                if (seriesName === 'CO2') {
                    return `${value.toFixed(2)} ppm`;
                }

                if (seriesName === 'O2') {
                    return `${value.toFixed(2)} ppm`;
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
        <Grid container alignItems="center">
        <Grid item xs={12} md={8}>
          {/* Title and subheader in the left */}
          <CardHeader
            title={title}
            subheader={subheader}
            sx={{ textAlign: 'left' }} // Align to the left
          />
        </Grid>
          <Grid item xs={4} style={{ textAlign: 'right' }}>
            <ToggleButtonGroup
              color="primary"
              value={history}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
              sx={{ margin: '25px 100px 0 0' }} // Adjust margin here
            >
              <ToggleButton value="10">10</ToggleButton>
              <ToggleButton value="30">30</ToggleButton>
              <ToggleButton value="0">ALL</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
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

HistoryGraph.propTypes = {
    color: PropTypes.array,
    dataFilters: PropTypes.array,
    subheader: PropTypes.string,
    title: PropTypes.string,
};