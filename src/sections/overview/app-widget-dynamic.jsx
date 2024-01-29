import React from 'react';
import PropTypes from 'prop-types';

import AppWidgetSummary from './app-widget-summary';
import { fetchMQ9Latest, fetchBME680Latest, fetchSEN0159Latest } from '../common/api';


export default function DynamicAppWidget({ title, color, icon, who, ...other }) {
    const [latestData, setLatestData] = React.useState(null);
    
    // Fetch API Data
    React.useEffect(() => {
        const intervalId = setInterval(() => {
            if (who === 'co') {
                fetchMQ9Latest()
                    .then((data) => {
                        setLatestData(data.co);
                    })
                    .catch((error) => {
                        console.error("CO", error);
                    });
            }
            else if (who === 'co2') {
                fetchSEN0159Latest()
                    .then((data) => {
                        setLatestData(data.co2);
                    })
                    .catch((error) => {
                        console.error("CO2", error);
                    });
            }
            else if (who === 'humidity' ) {
                fetchBME680Latest()
                    .then((data) => {
                        setLatestData(data.humidity);
                    })
                    .catch((error) => {
                        console.error("HUMIDITY", error);
                    });
            }
            else if (who === 'temperature') {
                fetchBME680Latest()
                    .then((data) => {
                        setLatestData(data.temperature);
                    })
                    .catch((error) => {
                        console.error("TEMPERATURE", error);
                    });
            }
            else if (who === 'gas') {
                fetchBME680Latest()
                    .then((data) => {
                        setLatestData(data.gas);
                    })
                    .catch((error) => {
                        console.error("GAS", error);
                    });
            }
            else if (who === 'pressure') {
                fetchBME680Latest()
                    .then((data) => {
                        setLatestData(data.pressure);
                    })
                    .catch((error) => {
                        console.error("PRESSURE", error);
                    });
            }
        }, 1000);


        return () => clearInterval(intervalId);
    }, [latestData, who]);

    return (
        <AppWidgetSummary
            title={title}
            total={latestData}
            color={color}
            icon={icon}
        />
    );
}

DynamicAppWidget.propTypes = {
    title: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    who: PropTypes.string.isRequired,
  };