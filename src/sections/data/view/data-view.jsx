import Container from '@mui/material/Container';

import DataTimeline from '../data-timeline';


export default function DataView() {
  return (
    <Container maxWidth="xl">
      <DataTimeline
        title="Logs"
      />
    </Container>
  );
}
