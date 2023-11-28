import React from 'react';
import PropTypes from 'prop-types';

// import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';


export default function VisualizerCard({ title, ...other }) {
  
  return (
    <Card {...other} style={{ height: '500px' }}>
      <CardHeader title={title} />
    </Card>
  );
}

VisualizerCard.propTypes = {
  title: PropTypes.string,
};
