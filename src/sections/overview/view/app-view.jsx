import React from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';

import ClickAway from '../click-away';

const Item = styled(Paper)(({ theme }) => ({
  padding: 0, // Remove padding
  textAlign: 'center',
  border: 'none', // Remove border
  outline: 'none', // Remove outline
  boxShadow: 'none', // Remove box shadow
  height: '100%', // Set the height to 100%
}));

const clickAwayStyle = {
  width: '100%', // Set the width to 100%
  height: '100%', // Set the height to 100%
};

export default function AppView() {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Item>
          <ClickAway
            title="Carbon Monoxide Levels (CO)"
            subtitle="Parts per million (PPM)"
            color="primary"
            icon={<img alt="icon" src="/assets/icons/glass/pressure.png" />}
            who="co"
            sx={clickAwayStyle}
          />
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
        <Item>
          <ClickAway
            title="Oxygen Levels (O2)" 
            subtitle="Parts per million (PPM)"
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/o2.png" />}
            who="o2"
            sx={clickAwayStyle}
          />
        </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
        <Item>
          <ClickAway
            title="Carbon Dioxide Levels (CO2)"
            subtitle="Parts per million (PPM)"
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/co2.png" />}
            who="co2"
          />
        </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Item>
          <ClickAway
            title="Temperature Levels"
            subtitle="Degrees Celsius (°C)"
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/temp.png" />}
            who="temperature"
          />
        </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
        <Item>
          <ClickAway
            title="Humidity Levels"
            subtitle="Percentage (%)"
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/humidity.png" />}
            who="humidity"
          />
        </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
        <Item>
          <ClickAway
            title="Gases Levels"
            subtitle="Parts per million (PPM)"
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/gases.png" />}
            who="gas"
          />
        </Item>
        </Grid>
      </Grid>
    </Container>
  );
}
