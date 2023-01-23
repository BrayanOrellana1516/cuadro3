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
    let fechaValorLetra = [];

    if (dataMapa !== '') {
      dataMapa.map((features) => {
        console.log('features', features);
        _carteraZonas.push(features.properties.gdp_md_est);
        _zonas.push(features.properties.name);
      });
    }
    console.log('dataHistorial', dataHistorial);
    dataHistorial.map((data) => {
      //si la data.fecha.getFullYear() se encuentra en el arreglo fechaValorLetra, entonces sumar data.valorLetra a la posicion del arreglo donde se encuentra la data.fecha.getFullYear()
      let fecha = new Date(data.fecha).getFullYear();
      if (isNaN(fecha)) {
        //  console.log('fechaNAN', data.fecha);
      }
      if (data.fecha === 'NULL') {
        fecha = new Date(dataHistorial.filter((dataf) => data.cedula === dataf.cedula)[0].plazoLetra).getFullYear();
        if (isNaN(fecha))
          fecha = parseInt(dataHistorial.filter((dataf) => data.cedula === dataf.cedula)[0].plazoLetra.split('/')[2]);
      }

      //   console.log('fecha', fecha);
      let fechaEncontrada = fechaValorLetra.find((fechaBusqueda, index) => fechaBusqueda.fecha === fecha);
      //obtener el indice de la fecha encontrada

      if (fechaEncontrada === undefined) {
        //arregrar a nuevo fechaValorLetra con indice fecha y valor data.valorLetra
        fechaValorLetra.push({ fecha: fecha, valor: parseFloat(data.valorLetra.toString().replace(',', '.')) });
        //   fechaValorLetra[fecha] = parseFloat(data.valorLetra.toString().replace(',', '.'));
      } else {
        //sumar data.valorLetra a la posicion del arreglo donde se encuentra la fecha
        fechaValorLetra[fechaValorLetra.indexOf(fechaEncontrada)].valor =
          fechaValorLetra[fechaValorLetra.indexOf(fechaEncontrada)]?.valor +
          parseFloat(data.valorLetra.toString().replace(',', '.'));
        //  fechaValorLetra[fecha] = fechaValorLetra[fecha] + parseFloat(data.valorLetra.toString().replace(',', '.'));
      }

      // if (fechaValorLetra.includes(fecha)) {
      //   fechaValorLetra[fecha] = fechaValorLetra[fecha] + parseFloat(data.valorLetra.toString().replace(',', '.'));
      // } else {
      //   fechaValorLetra.push(fecha);
      //   fechaValorLetra[fecha] = parseFloat(data.valorLetra.toString().replace(',', '.'));
      // }
    });
    console.log('fechaValorLetra', fechaValorLetra);

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
    let años = [];
    let valores = [];
    let valorAcumulado = 0;
    //ordenar arreglo de fechaValorLetra por fecha
    fechaValorLetra.sort((a, b) => a.fecha - b.fecha);

    fechaValorLetra.map((data) => {
      años.push(data.fecha);
      // añadir a arreglo valores el valor de la data.valor en adicion a los valores que ya estan en el arreglo valores
      // valores = [...valores, data.valor];
      //sumar todos los valores dentro del arreglo valores
      valores.map((valor) => {
        valorAcumulado = valorAcumulado + valor;
      });
      valores.push(valorAcumulado + data.valor);

      // valores.push(...valores, data.valor);
    });
    console.log('años', años);
    console.log('valores', valores);

    setLineStylesData({
      labels: años,
      datasets: [
        {
          label: 'Third Dataset',
          data: valores,
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
    <div className="flex w-full justify-content-center p-4 surface-100 border-round-lg border-double border-blue-500">
      <Chart type="line" className="w-full " data={lineStylesData} options={basicOptions} />
    </div>
  );
}
