import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { Chart } from 'primereact/chart';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { useEffect, useState } from 'react';

export default function GraficoLineal({ dataHistorial, dataMapa }) {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [carteraZonas, setCarteraZonas] = useState([]);
  let ordenar;
  const [zonas, setZonas] = useState([]);
  const [lineStylesData, setLineStylesData] = useState({});

  useEffect(() => {
    let contadorRiesgoBajo = 0;
    let contadorRiesgoMedio = 0;
    let contadorRiesgoAlto = 0;
    let _carteraZonas = [];
    let _zonas = [];

    if (dataMapa !== '') {
      dataMapa.map((features) => {
        console.log('features', features);
        _carteraZonas.push(features.properties.gdp_md_est);
        _zonas.push(features.properties.name);
      });
    }

    setZonas(_zonas);
    console.log('zonas', _zonas);

    //ordenar arreglo de carteraZonas
    ordenar = _carteraZonas.sort((a, b) => a - b);
    console.log('cartera', ordenar);
    setCarteraZonas(ordenar);

    // dataHistorial.map((data) => {
    //   if (data.puntuacion <= -50) contadorRiesgoAlto++;
    //   else if (data.puntuacion > -50 && data.puntuacion <= 30) contadorRiesgoMedio++;
    //   else if (data.puntuacion > 30) contadorRiesgoBajo++;
    // });
    console.log(contadorRiesgoAlto, contadorRiesgoMedio, contadorRiesgoBajo);

    setLineStylesData({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'gato'],
      datasets: [
        {
          label: 'Third Dataset',
          data: ordenar,
          fill: true,
          borderColor: '#FFA726',
          tension: 0.6,
          backgroundColor: 'rgba(255,167,38,0.2)',
        },
      ],
    });
  }, [dataHistorial]);

  const getLightTheme = () => {
    let basicOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: '#495057',
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
        y: {
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
      },
    };

    return {
      basicOptions,
    };
  };

  const { basicOptions } = getLightTheme();

  return (
    <div className="flex w-full justify-content-center">
      <Chart type="line" className="w-full " data={lineStylesData} options={basicOptions} />
    </div>
  );
}
