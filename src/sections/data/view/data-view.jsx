import Container from '@mui/material/Container';

import DataLoggingCard from '../data-logging-card';
import DataTimeline from '../data-timeline';


export default function DataView() {
  return (
    <Container maxWidth="xl">
      <DataTimeline
        title="Data Timeline"
      />
    </Container>
  );
}
