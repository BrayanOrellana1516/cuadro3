import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { Chart } from 'primereact/chart';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { useEffect, useState } from 'react';

export default function graficoBarrasTop({ dataHistorial, dataMapa }) {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  useEffect(() => {
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
      let _saldos2 = [];
      _saldos.forEach((element) => {
        //si element es array retorna el primer elemento del array convirtiendo a element en un string
        if (Array.isArray(element)) {
          _saldos2.push(element[0].toFixed(2));
        }
      });
      if (_saldos2.length > 0) {
        _saldos = _saldos2;
      }
    }

    // // console.log('zonas', _zonas);

    //ordenar arreglo de carteraZonas
    // ordenar = _carteraZonas;
    // // console.log('cartera', ordenar);

    // dataHistorial.map((data) => {
    //   if (data.puntuacion <= -50) contadorRiesgoAlto++;
    //   else if (data.puntuacion > -50 && data.puntuacion <= 30) contadorRiesgoMedio++;
    //   else if (data.puntuacion > 30) contadorRiesgoBajo++;
    // });
    //  // console.log(contadorRiesgoAlto, contadorRiesgoMedio, contadorRiesgoBajo);
    // Chart.defaults.font = 12;
    setChartData({
      labels: _zonas,
      datasets: [
        {
          label: 'Valor de cartera vencida',
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
      aspectRatio: 1,
      barThickness: 20,
      maxBarThickness: 80,
      //distancia entre barras

      plugins: {
        legend: {
          labels: {
            fontColor: textColor,
          },
        },
        title: {
          display: true,
          text: 'Zonas con mayor endeudamiento',
          font: {
            size: 15,
            weight: 700,
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            //separacion de los numeros en el eje x
            stepSize: 150000,
            font: {
              weight: 600,
            },
          },
          grid: {
            display: true,
            drawBorder: true,
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
  }, [dataMapa]);

  return (
    <div className="flex justify-content-center surface-200 border-round-lg border-double border-blue-900">
      <Chart type="bar" data={chartData} options={chartOptions} style={{ width: '100%' }} />
    </div>
  );
}
