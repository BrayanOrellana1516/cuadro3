import Head from 'next/head';
import { Splitter, SplitterPanel } from 'primereact/splitter';
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
  const handleDataScopeChange = (event) => {
    setDataScope(dataScopes.find((element) => element.key === event.target.value));
  };
  const purpleOptions = [
    '#fffddd',
    '#faf3c8',
    '#f6e8b3',
    '#f4dd9f',
    '#f3d18b',
    '#f2c578',
    '#f2b866',
    '#f2ab55',
    '#f39d46',
    '#f38e38',
    '#f47d2c',
    '#f56b23',
    '#f6571d',
    '#f63c1a',
    '#f6081b',
  ];
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
      <Splitter>
        <SplitterPanel className="flex align-items-center justify-content-center" size={60} minSize={10}>
          <Map className={styles.homeMap} center={DEFAULT_CENTER} zoom={16}>
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
                                <Polygon
                                  key={features.properties.name}
                                  positions={coordinates}
                                  pathOptions={purpleOptions}
                                >
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
        </SplitterPanel>
        <SplitterPanel size={80}>
          <Splitter layout="vertical">
            <SplitterPanel className="flex align-items-center justify-content-center" size={15}>
              <VentanaDetalles />
            </SplitterPanel>
            <SplitterPanel size={85}>
              <Splitter>
                <SplitterPanel className="flex align-items-center justify-content-center" size={20}>
                  Panel 3
                </SplitterPanel>
                <SplitterPanel className="flex align-items-center justify-content-center" size={80}>
                  Panel 4
                </SplitterPanel>
              </Splitter>
            </SplitterPanel>
          </Splitter>
        </SplitterPanel>
      </Splitter>
    </>
  );
}
