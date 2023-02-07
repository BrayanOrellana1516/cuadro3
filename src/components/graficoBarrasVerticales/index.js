import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { Chart } from 'primereact/chart';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { useEffect, useState } from 'react';

export default function graficoBarrasVerticales({ dataHistorial, dataMapa, filtroZona }) {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [carteraZonas, setCarteraZonas] = useState([]);
  let ordenar;
  const [zonas, setZonas] = useState([]);
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  useEffect(() => {
    let _carteraZonas = [];
    let _zonas = [];
    let _saldos = [];
    let dataZonaLetras = [];
    let letrasZona = [];
    let z = [];
    let letrasFilter;
    let cantidadFilter;
    // console.log('dataHistorial', dataHistorial);
    if (dataHistorial !== '') {
      //recorrer el arreglo de dataHistorial y agrupar los objetos por zona
      let _dataHistorial = dataHistorial.reduce((acc, obj) => {
        let key = obj.zona;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
      }, {});
      console.log('_dataHistorial', _dataHistorial);
      //recorrer el objeto _dataHistorial y verificar si en el arreglo de objeto el atributo letra posee el caracter "-" o "/"
      let _dataHistorial1 = Object.keys(_dataHistorial).map((key) => {
        //  console.log('_dataHistorial[key]', _dataHistorial[key]);
        let _dataHistorial2 = _dataHistorial[key].map((obj) => {
          if (obj.letra.includes('-')) {
            // si obj.letra comienza con "0", eliminar el primer caracter
            if (obj.letra.startsWith('0')) {
              obj.letra = obj.letra.substring(1);
            }
            //   en obj.letra despues del caracter "-", remplazar "ene" por 1, "feb" por 2, "mar" por 3, "abr" por 4, "may" por 5, "jun" por 6, "jul" por 7, "ago" por 8, "sep" por 9, "oct" por 10, "nov" por 11, "dic" por 12
            obj.letra = obj.letra.replace('ene', '1');
            obj.letra = obj.letra.replace('feb', '2');
            obj.letra = obj.letra.replace('mar', '3');
            obj.letra = obj.letra.replace('abr', '4');
            obj.letra = obj.letra.replace('may', '5');
            obj.letra = obj.letra.replace('jun', '6');
            obj.letra = obj.letra.replace('jul', '7');
            obj.letra = obj.letra.replace('ago', '8');
            obj.letra = obj.letra.replace('sep', '9');
            obj.letra = obj.letra.replace('oct', '10');
            obj.letra = obj.letra.replace('nov', '11');
            obj.letra = obj.letra.replace('dic', '12');
            // remplazar el caracter "-" por "/"
            obj.letra = obj.letra.replace('-', '/');
          }
          if (obj.letra.includes('/')) {
            // si obj.letra despes del caracter "/", el tamaño de la cadena es mayor a 3, añadir un 0 al inicio de la cadena entonces excluye el objeto
            if (obj.letra.length > 7) {
              return;
            }
          }
          return obj;
        });
      });

      //recorrer el objeto _dataHistorial y añadir en un nuevo arreglo con indice la zona y como valor un arreglo de objetos que cuentre los distintos valores de el atributo letra
      let _dataHistorial2 = Object.keys(_dataHistorial).map((key) => {
        let _dataHistorial3 = _dataHistorial[key].reduce((acc, obj) => {
          let key = obj.letra;
          if (!acc[key]) {
            acc[key] = 0;
          }
          acc[key]++;
          return acc;
        }, {});
        return { [key]: _dataHistorial3 };
      });
      console.log('_dataHistorial2', _dataHistorial2);

      _dataHistorial2.forEach((obj) => {
        const zona = Object.keys(obj)[0];
        const combinations = obj[zona];
        const letra = {};

        for (const key in combinations) {
          if (
            key === 'ENTRADA' ||
            key === 'N/Debito SE SUMA $30 PORQUE EL ING HIZO MAL Y LE A' ||
            key === 'Debito POR DEVOLUCION DE CHEQUE' ||
            key === '"Debito "'
          ) {
            continue;
          }

          const [a, b] = key.split('/');
          const count = combinations[key];

          if (letra[b]) {
            letra[b] += count;
          } else {
            letra[b] = count;
          }
        }

        dataZonaLetras.push({
          zona,
          letra,
        });
      });

      console.log('dataZonaLetras', dataZonaLetras);

      // filtrar dataZonaLetras segun filtroZona sea igual a zona
      dataZonaLetras = dataZonaLetras.filter((obj) => obj.zona === filtroZona);
      console.log('dataZonaLetrasf', dataZonaLetras);
      //etraer de dataZonaLaetras en letra el indice y la catidad en los arreflos de letrasFilter y cantidadFilter
      letrasFilter = dataZonaLetras.map((obj) => {
        return Object.keys(obj.letra);
      })[0];
      console.log('letrasFilter', letrasFilter);
      // añadir a cada elemento del arreglo letrasFilter la cadena " Letra/as"
      letrasFilter = letrasFilter?.map((obj) => {
        return obj + ' Letra/as';
      });

      cantidadFilter = dataZonaLetras.map((obj) => {
        return Object.values(obj.letra);
      })[0];
      console.log('cantidadFilter', cantidadFilter);

      // filtrar letrasZona segun filtroZona sea igual a zona
      letrasZona = letrasZona.filter((obj) => obj.zona === filtroZona);
    }

    setChartData({
      //visualizar mas de un arreglo de datos en labels y datasets
      labels: letrasFilter,
      datasets: [
        {
          label: 'Clientes que deben el N° de letra',
          backgroundColor: 'rgba(237, 0, 0 )',
          borderColor: 'rgba(255,99,132,1)',
          data: cantidadFilter,
          maxBarThickness: 50,
          barThickness: 10,
          onClick: (e) => {
            console.log('e', e);
          },
        },
      ],
    });

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    const options = {
      indexAxis: 'x',
      maintainAspectRatio: false,
      aspectRatio: 1,
      plugins: {
        legend: {
          labels: {
            fontColor: textColor,
          },
        },
        title: {
          display: true,
          text: 'Número de letras vencidas en ' + filtroZona,
          font: {
            size: 20,
            weight: 600,
            color: textColor,
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
  }, [filtroZona]);

  useEffect(() => {
    console.log('filtroZona', filtroZona);
  }, [filtroZona]);

  return (
    <div className=" w-12 flex justify-content-center surface-200 border-round-lg border-double border-blue-900">
      {filtroZona !== null && filtroZona !== undefined ? (
        <Chart type="bar" data={chartData} options={chartOptions} style={{ width: '100%' }} />
      ) : (
        <div className="flex justify-content-center items-center w-full h-full">
          <h1 className="text-2xl text-center text-gray-500">Seleccione "Ver detalle" de una zona</h1>
        </div>
      )}
    </div>
  );
}
