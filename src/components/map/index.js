import dynamic from 'next/dynamic';

const Maps = dynamic(() => import('./mapa'), {
  ssr: false,
});

export default Maps;
