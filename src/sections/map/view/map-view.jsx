import React from 'react';

import Container from '@mui/material/Container';

import { fetchNEO7MData } from '../../common/api';

export default function MapView() {
  const [allData, setAllData] = React.useState([]);

  const fetchData = async () => {
    try {
      const neo7m = await Promise.all([fetchNEO7MData()]);
      return neo7m;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData().then((neo7m) => {
        setAllData(neo7m);
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [allData]);

  return (
    <Container>
      Map
      {allData.length > 0 && (
        <div>
          <p>Latitude: {allData[allData.length - 1][allData[0].length - 1].data.latitude}</p>
          <p>Longitude: {allData[allData.length - 1][allData[0].length - 1].data.longitude}</p>
          <p>Speed: {allData[allData.length - 1][allData[0].length - 1].data.speed}</p>
          <p>Time: {allData[allData.length - 1][allData[0].length - 1].data.time}</p>
          <p>Date: {allData[allData.length - 1][allData[0].length - 1].data.date}</p>
        </div>
      )}
    </Container>
  );
}
