import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';


export default function NormalDataCard({ title,  ...other }) {
  return (
    <Card {...other} style={{ height: '500px' }}>
      <CardHeader title={title} sx={{ mb: 5 }} />
    </Card>
  );
}

NormalDataCard.propTypes = {
  title: PropTypes.string,
};
