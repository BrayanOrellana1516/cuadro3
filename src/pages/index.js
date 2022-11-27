import Head from 'next/head';
import { useEffect, useState } from 'react';

import Map from '@components/map';
import VentanaDetalles from '@components/ventanaDetalles';

import Ubicaciones from '../parroquias/ubicaciones.json';
import styles from '../styles/Home.module.css';

const DEFAULT_CENTER = [-2.002265, -79.485339];
/** @function
 * @name Home
 * @description Pagina que contiene el componente de login de la aplicacion
 **/
export default function Home() {
  const [ruc, setRUC] = useState('');
  const [ci, setCI] = useState('');
  const [password, setPassword] = useState('');
  let data = '';
  const purpleOptions = { color: 'purple' };
  useEffect(() => {
    data = Ubicaciones.features.map((item) => {
      return {
        ...item,
        properties: {
          ...item.properties,
          gdp_md_est: Math.floor(Math.random() * 1056) + 1000,
        },
      };
    });
  }, [data]);

  return (
    <>
      <Head>
        <title>SNP :: Sistema Integrado de Planificación e Inversión Pública</title>
      </Head>
      <Map className={styles.homeMap} center={DEFAULT_CENTER} zoom={15}>
        {({ TileLayer, Marker, Popup, Polygon }) => (
          <>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={DEFAULT_CENTER}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
            {data !== ''
              ? data.map((features) =>
                  features.geometry.type === 'Polygon'
                    ? features.geometry.coordinates.map(
                        (coordinates) => (
                          console.log('coordinates', coordinates),
                          (
                            <Polygon key={features.properties.name} positions={coordinates} pathOptions={purpleOptions}>
                              <Popup>
                                <span>{features.properties.gdp_md_est}</span>
                              </Popup>
                            </Polygon>
                          )
                        ),
                      )
                    : null,
                )
              : null}
          </>
        )}
      </Map>
      <VentanaDetalles />
    </>
  );
}
