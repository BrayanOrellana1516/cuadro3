import Head from 'next/head';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { useEffect, useState } from 'react';

import historialCrediticio from '@components/common/historial_crediticio2.json';
import GraficoBarras from '@components/graficoBarras';
import GraficoLineal from '@components/graficoLineal';
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
  const [dataHistorial, setDataHistorial] = useState([]);
  const [dataMapa, setDataMapa] = useState([]);
  const csvFilePath = '../components/common/historial_crediticio2.csv';
  const csv = require('csvtojson');
  const handleDataScopeChange = (event) => {
    console.log(event);
  };
  const getColor = (sizePortfolio) => {
    let renderColor = { color: '#f6081b', value: 5100 };

    purpleOptions.forEach((element) => {
      if (sizePortfolio > element.value) {
        renderColor = element;
        return;
      }
    });
    return renderColor;
  };
  const purpleOptions = [
    { color: '#fffddd', value: 1000 },
    { color: '#faf3c8', value: 1300 },
    { color: '#f6e8b3', value: 1600 },
    { color: '#f4dd9f', value: 1900 },
    { color: '#f3d18b', value: 2100 },
    { color: '#f2c578', value: 2400 },
    { color: '#f2b866', value: 2700 },
    { color: '#f2ab55', value: 3000 },
    { color: '#f39d46', value: 3300 },
    { color: '#f38e38', value: 3600 },
    { color: '#f47d2c', value: 3900 },
    { color: '#f56b23', value: 4200 },
    { color: '#f6571d', value: 4500 },
    { color: '#f63c1a', value: 4800 },
    { color: '#f6081b', value: 5100 },
  ];
  useEffect(() => {
    setDataMapa(
      Ubicaciones.features.map((item) => {
        return {
          ...item,
          properties: {
            ...item.properties,
            gdp_md_est: Math.floor(Math.random() * 3492) + 1000,
          },
        };
      }),
    );
  }, []);

  useEffect(() => {
    let filtroHistorialCrediticio = historialCrediticio.filter((registro) => {
      return registro.estado === 'ATRASO';
    });
    setDataHistorial(filtroHistorialCrediticio);
  }, []);
  const getSelecction = () => {
    console.log('press');
  };

  return (
    <>
      <Head>
        <title>Cuadro de Mandos</title>
      </Head>
      <div className="flex flex-column w-full">
        <div className=" flex-row w-full">
          <Splitter>
            <SplitterPanel className="flex align-items-center justify-content-center" size={100} minSize={10}>
              <Map className={styles.homeMap} center={DEFAULT_CENTER} zoom={16} onClick={(e) => getSelecction()}>
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
                    {dataMapa !== ''
                      ? dataMapa.map((features) =>
                          features.geometry.type === 'Polygon'
                            ? features.geometry.coordinates.map((coordinates) => (
                                //   console.log('coordinates', features.properties.gdp_md_est),
                                <Polygon
                                  key={features.properties.name}
                                  positions={coordinates}
                                  pathOptions={getColor(features.properties.gdp_md_est)}
                                  onClick={(e) => console.log('ddddd')}
                                  onMouseEnter={(e) => console.log('ddddd')}
                                  onMouseLeave={(e) => console.log('ddddd')}
                                  //LLamar a funcion getSelecction y enviar feactures

                                  onMouseut={(e) => console.log(e)}

                                  // style={getColor}
                                >
                                  <Popup>
                                    <h3>{features.properties.name}</h3>
                                    <p>
                                      Cartera Vencida: $ {features.properties.gdp_md_est}
                                      <br />
                                    </p>
                                  </Popup>
                                </Polygon>
                              ))
                            : null,
                        )
                      : null}
                  </>
                )}
              </Map>
            </SplitterPanel>
            <SplitterPanel className="flex align-items-center justify-content-center" size={60}>
              <Splitter layout="vertical">
                <SplitterPanel>
                  <VentanaDetalles className="flex" dataHistorial={dataHistorial} />
                </SplitterPanel>
                <SplitterPanel>
                  <GraficoBarras dataHistorial={dataHistorial} dataMapa={dataMapa} />
                </SplitterPanel>
              </Splitter>
            </SplitterPanel>
          </Splitter>
        </div>
        <div className="flex flex-row w-full">
          <GraficoLineal className=" flex w-full" dataHistorial={dataHistorial} dataMapa={dataMapa} />
        </div>
      </div>
    </>
  );
}
