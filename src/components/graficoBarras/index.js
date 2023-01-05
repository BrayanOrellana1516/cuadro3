import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { Chart } from 'primereact/chart';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { useEffect, useState } from 'react';

export default function GraficoBarras({ dataHistorial, dataMapa }) {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [carteraZonas, setCarteraZonas] = useState([]);
  let ordenar;
  const [zonas, setZonas] = useState([]);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    let contadorRiesgoBajo = 0;
    let contadorRiesgoMedio = 0;
    let contadorRiesgoAlto = 0;
    let _carteraZonas = [];
    let _zonas = [];

    if (dataMapa !== '') {
      dataMapa.map((features) => {
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
    setChartData({
      labels: _zonas,
      datasets: [
        {
          label: 'Cartera Vencida por Zonas',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          pointBackgroundColor: 'rgba(255,99,132,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(255,99,132,1)',
          data: ordenar,
        },
      ],
    });
  }, [dataHistorial]);

  const [lightOptions] = useState({
    plugins: {
      legend: {
        labels: {
          color: '#495057',
        },
      },
    },
    scales: {
      r: {
        pointLabels: {
          color: '#495057',
        },
        grid: {
          color: '#ebedef',
        },
        angleLines: {
          color: '#ebedef',
        },
      },
    },
  });
  return (
    <div className="card flex justify-content-center">
      <Chart type="radar" data={chartData} options={lightOptions} style={{ width: '50%' }} />
    </div>
  );
}
