import { Helmet } from 'react-helmet-async';

import { DataView } from 'src/sections/data/view';


export default function DataPage() {
  return (
    <>
      <Helmet>
        <title>Data</title>
      </Helmet>

      <DataView />
    </>
  );
}
