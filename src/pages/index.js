import Head from 'next/head';
import { Calendar } from 'primereact/calendar';
import { useEffect, useState } from 'react';

import historialCrediticio from '@components/common/csvjson.json';
import GraficoBarras from '@components/graficoBarras';
import GraficoLineal from '@components/graficoLineal';
import GraficoPolar from '@components/graficoPolar';
import Navbar from '@components/layouts/Navbar';
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
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
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
    { color: '#fffddd', value: 5000 },
    { color: '#faf3c8', value: 13000 },
    { color: '#f6e8b3', value: 26000 },
    { color: '#f4dd9f', value: 39000 },
    { color: '#f3d18b', value: 41000 },
    { color: '#f2c578', value: 44000 },
    { color: '#f2b866', value: 57000 },
    { color: '#f2ab55', value: 63000 },
    { color: '#f39d46', value: 6900 },
    { color: '#f38e38', value: 70000 },
    { color: '#f47d2c', value: 80000 },
    { color: '#f56b23', value: 82000 },
    { color: '#f6571d', value: 95000 },
    { color: '#f63c1a', value: 108000 },
    { color: '#f6081b', value: 110000 },
  ];
  useEffect(() => {}, []);

  useEffect(() => {
    let filtroHistorialCrediticio = historialCrediticio.filter((registro) => {
      return (
        registro.estado === 'ATRASO' &&
        !isNaN(registro.cedula) &&
        registro.nombre !== 'BURGOS BARRES CHISTER' &&
        registro.nombre !== 'CAICEDO BAYAS MARIA CRISTINA'
      );
    });

    const parroquias = [
      ['Centro', 0],
      ['LAS MALVINAS', 0],
      ['EL MANGO', 0],
      ['MIRAFLORES', 0],
      ['EL PARAISO', 0],
      ['MIRAFLORES 2', 0],
      ['EL CAUJER', 0],
      ['PRIMAVERA 2', 0],
      ['DOCE DE OCTUBRE', 0],
      ['BELLAVISTA', 0],
      ['MANUELITA SAENZ', 0],
      ['LAURELES 2', 0],
      ['SAN PEDRO DE VENECIA', 0],
      ['SAN MIGUEL ARCANGEL', 0],
      ['LAURELES 1', 0],
      ['TRES DE SEPTIEMBRE', 0],
      ['LAS PALMAS', 0],
      ['SAN JACINTO', 0],
    ];

    // recorrer filtroHistorialCrediticio ,sumar interes_letra y valorLetra que coincidan con zona
    filtroHistorialCrediticio = filtroHistorialCrediticio.map((item) => {
      // si item.zona se encuentra en parroquias entonces sumar interes_letra y valorLetra y asignar a parroquias
      parroquias.forEach((parroquia) => {
        if (item.zona === parroquia[0]) {
          parroquia[1] =
            parroquia[1] +
            parseFloat(item.interes_letra.toString().replace(',', '.')) +
            parseFloat(item.valorLetra.toString().replace(',', '.'));
        }
      });
      return item;
    });
    console.log('parroquias', parroquias);

    // console.log('filtroHistorialCrediticio', filtroHistorialCrediticio);

    setDataHistorial(filtroHistorialCrediticio);
    console.log('Ubicaciones', Ubicaciones.features);
    setDataMapa(
      Ubicaciones.features.map((item) => {
        //si item.properties.name se encuentra en parroquias entonces insertar en item.properties.gdp_md_est el segundo valor de parroquias
        parroquias.forEach((parroquia) => {
          if (item.properties.name === parroquia[0]) {
            item.properties.gdp_md_est = parroquia[1].toFixed(2);
          }
        });
        return item;
      }),
    );
  }, []);

  const getSelecction = () => {
    console.log('press');
  };

  return (
    <>
      <Head>
        <title>Cuadro de Mandos</title>
      </Head>
      <div className="flex flex-column w-full bg-yellow-50 border-blue-100">
        <div className=" flex-row w-full">
          <Navbar />
        </div>
        <div className="px-3 flex-row border-blue-100">
          <div className="flex flex-row w-full justify-content-center py-3 ">
            {/* div con negrita y cursiva */}

            <div className="font-italic font-semibold flex align-content-center pr-3">Predicción por año</div>
            <Calendar
              id="icon"
              view="year"
              dateFormat="yy"
              minDate={new Date(2023, 0, 1)}
              maxDate={new Date(2025, 11, 31)}
              value={fechaSeleccionada}
              onChange={(e) => setFechaSeleccionada(e.value)}
              showIcon
            />
          </div>
          <div className="flex flex-colum w-full">
            <div className=" w-6 p-1 p-4 surface-100 border-round-lg border-double border-blue-500">
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
            </div>
            <div className="w-6 p-1">
              <div className="flex flex-column w-full border-cyan-800">
                <VentanaDetalles dataHistorial={dataHistorial} />
                <div className="flex flex-row h-full pt-5">
                  <div className=" w-6 h-5rem pr-1 border-blue-300">
                    <GraficoBarras
                      className="flex w-full h-5rem border-cyan-800"
                      dataHistorial={dataHistorial}
                      dataMapa={dataMapa}
                    />
                  </div>
                  <div className="w-6">
                    <GraficoPolar className="w-full h-full" dataHistorial={dataHistorial} dataMapa={dataMapa} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full">
          <GraficoLineal className=" flex w-full" dataHistorial={dataHistorial} dataMapa={dataMapa} />
        </div>
      </div>
    </>
  );
}
