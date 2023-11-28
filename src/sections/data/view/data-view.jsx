import Container from '@mui/material/Container';

import DataLoggingCard from '../data-logging-card';


export default function DataView() {
  return (
    <Container maxWidth="xl">
      <DataLoggingCard
        title="Data Logging"
      />
    </Container>
  );
}
