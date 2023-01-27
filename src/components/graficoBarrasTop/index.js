import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { Chart } from 'primereact/chart';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { useEffect, useState } from 'react';

export default function graficoBarrasTop({ dataHistorial, dataMapa }) {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [carteraZonas, setCarteraZonas] = useState([]);
  let ordenar;
  const [zonas, setZonas] = useState([]);
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  useEffect(() => {
    let contadorRiesgoBajo = 0;
    let contadorRiesgoMedio = 0;
    let contadorRiesgoAlto = 0;
    let _carteraZonas = [];
    let _zonas = [];
    let _saldos = [];

    if (dataMapa !== '') {
      dataMapa.map((features) => {
        _carteraZonas.push({ name: features.properties.name, gdp_md_est: features.properties.gdp_md_est });

        // _carteraZonas.push(features.properties.gdp_md_est);
        // _zonas.push(features.properties.name);
      });
      // capturar las 3 cartera por zonas mas altas y sus nombres
      _carteraZonas.sort(function (a, b) {
        return b.gdp_md_est - a.gdp_md_est;
      });
      _carteraZonas = _carteraZonas.slice(0, 4);
      // separar los nombres de las carteras de las zonas
      _carteraZonas.map((cartera) => {
        _zonas.push(cartera.name);
        _saldos.push(cartera.gdp_md_est);
      });
      setZonas(_zonas);

      // console.log('cartera', _carteraZonas);
    }

    // console.log('zonas', _zonas);

    //ordenar arreglo de carteraZonas
    // ordenar = _carteraZonas;
    // console.log('cartera', ordenar);
    setCarteraZonas(ordenar);

    // dataHistorial.map((data) => {
    //   if (data.puntuacion <= -50) contadorRiesgoAlto++;
    //   else if (data.puntuacion > -50 && data.puntuacion <= 30) contadorRiesgoMedio++;
    //   else if (data.puntuacion > 30) contadorRiesgoBajo++;
    // });
    //  console.log(contadorRiesgoAlto, contadorRiesgoMedio, contadorRiesgoBajo);
    setChartData({
      labels: _zonas,
      datasets: [
        {
          label: 'Top de Zonas con mayor endeudamiento',
          backgroundColor: 'rgba(0, 135, 255)',
          borderColor: 'rgba(255,99,132,1)',
          data: _saldos,
        },
      ],
    });

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    const options = {
      indexAxis: 'y',
      maintainAspectRatio: false,
      aspectRatio: 0.9,
      plugins: {
        legend: {
          labels: {
            fontColor: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 400,
            },
          },
          grid: {
            display: false,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };

    setChartOptions(options);
  }, [dataHistorial]);

  return (
    <div className="card w-full flex justify-content-center surface-200 border-round-lg border-double border-blue-500">
      <Chart type="bar" data={chartData} options={chartOptions} style={{ width: '100%' }} />
    </div>
  );
}
