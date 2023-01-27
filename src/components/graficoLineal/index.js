import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { Calendar } from 'primereact/calendar';
import { Chart } from 'primereact/chart';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { useEffect, useState } from 'react';

export default function GraficoLineal({ dataHistorial, dataMapa, dataHistorialATiempo }) {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [carteraZonas, setCarteraZonas] = useState([]);
  let ordenar;
  const [zonas, setZonas] = useState([]);
  const [lineStylesData, setLineStylesData] = useState({});
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [fechaMinima, setFechaMinima] = useState(new Date());
  const [fechaMaxima, setFechaMaxima] = useState(new Date());
  const [fechasValores, setFechasValores] = useState([]);
  const [fechasValoresATiempo, setFechasValoresATiempo] = useState([]);
  const plantillaMeses = [
    { label: 'Enero', value: 1 },
    { label: 'Febrero', value: 2 },
    { label: 'Marzo', value: 3 },
    { label: 'Abril', value: 4 },
    { label: 'Mayo', value: 5 },
    { label: 'Junio', value: 6 },
    { label: 'Julio', value: 7 },
    { label: 'Agosto', value: 8 },
    { label: 'Septiembre', value: 9 },
    { label: 'Octubre', value: 10 },
    { label: 'Noviembre', value: 11 },
    { label: 'Diciembre', value: 12 },
  ];

  useEffect(() => {
    let contadorRiesgoBajo = 0;
    let contadorRiesgoMedio = 0;
    let contadorRiesgoAlto = 0;
    let _carteraZonas = [];
    let _zonas = [];
    let fechaValorLetra = [];
    let fechaValorLetraATiempo = [];

    dataHistorial.map((data) => {
      //si la data.fecha.getFullYear() se encuentra en el arreglo fechaValorLetra, entonces sumar data.valorLetra a la posicion del arreglo donde se encuentra la data.fecha.getFullYear()
      let fecha = new Date(data.fecha);
      if (data.fecha === 'NULL') {
        fecha = new Date(
          dataHistorial.filter((dataf) => data.cedula === dataf.cedula)[0].plazoLetra.split('/')[1] +
            '/' +
            dataHistorial.filter((dataf) => data.cedula === dataf.cedula)[0].plazoLetra.split('/')[0] +
            '/' +
            dataHistorial.filter((dataf) => data.cedula === dataf.cedula)[0].plazoLetra.split('/')[2],
        );
      }

      //   // console.log('fecha', fecha);
      let fechaAnioEncontrada = fechaValorLetra.find(
        (fechaAnioBusqueda) => fechaAnioBusqueda.anio === fecha.getFullYear(),
      );
      //obtener el indice de la fecha encontrada

      if (fechaAnioEncontrada === undefined) {
        //arregrar a nuevo fechaValorLetra con indice fecha y valor data.valorLetra
        fechaValorLetra.push({
          anio: fecha.getFullYear(),
          data: [{ mes: fecha.getMonth() + 1, valor: parseFloat(data.valorLetra.toString().replace(',', '.')) }],
        });
      } else {
        let fechaMesEncontrada = fechaValorLetra[fechaValorLetra.indexOf(fechaAnioEncontrada)].data.find(
          (fechaMesBusqueda) => fechaMesBusqueda.mes === fecha.getMonth() + 1,
        );
        if (fechaMesEncontrada === undefined) {
          fechaValorLetra[fechaValorLetra.indexOf(fechaAnioEncontrada)].data.push({
            mes: fecha.getMonth() + 1,
            valor: parseFloat(data.valorLetra.toString().replace(',', '.')),
          });
        } else {
          fechaValorLetra[fechaValorLetra.indexOf(fechaAnioEncontrada)].data[
            fechaValorLetra[fechaValorLetra.indexOf(fechaAnioEncontrada)].data.indexOf(fechaMesEncontrada)
          ].valor =
            fechaValorLetra[fechaValorLetra.indexOf(fechaAnioEncontrada)].data[
              fechaValorLetra[fechaValorLetra.indexOf(fechaAnioEncontrada)].data.indexOf(fechaMesEncontrada)
            ]?.valor + parseFloat(data.valorLetra.toString().replace(',', '.'));
        }
      }
    });

    /////////////////////////////////////////////////////
    dataHistorialATiempo.map((data) => {
      //si la data.fecha.getFullYear() se encuentra en el arreglo fechaValorLetra, entonces sumar data.valorLetra a la posicion del arreglo donde se encuentra la data.fecha.getFullYear()
      let fecha = new Date(data.fecha);
      if (data.fecha === 'NULL') {
        fecha = new Date(
          dataHistorialATiempo.filter((dataf) => data.cedula === dataf.cedula)[0].plazoLetra.split('/')[1] +
            '/' +
            dataHistorialATiempo.filter((dataf) => data.cedula === dataf.cedula)[0].plazoLetra.split('/')[0] +
            '/' +
            dataHistorialATiempo.filter((dataf) => data.cedula === dataf.cedula)[0].plazoLetra.split('/')[2],
        );
      }

      //   // console.log('fecha', fecha);
      let fechaAnioEncontrada = fechaValorLetraATiempo.find(
        (fechaAnioBusqueda) => fechaAnioBusqueda.anio === fecha.getFullYear(),
      );

      //obtener el indice de la fecha encontrada

      if (fechaAnioEncontrada === undefined) {
        //arregrar a nuevo fechaValorLetra con indice fecha y valor data.valorLetra
        fechaValorLetraATiempo.push({
          anio: fecha.getFullYear(),
          data: [{ mes: fecha.getMonth() + 1, valor: parseFloat(data.valorLetra.toString().replace(',', '.')) }],
        });
      } else {
        let fechaMesEncontrada = fechaValorLetraATiempo[fechaValorLetraATiempo.indexOf(fechaAnioEncontrada)].data.find(
          (fechaMesBusqueda) => fechaMesBusqueda.mes === fecha.getMonth() + 1,
        );
        if (fechaMesEncontrada === undefined) {
          fechaValorLetraATiempo[fechaValorLetraATiempo.indexOf(fechaAnioEncontrada)].data.push({
            mes: fecha.getMonth() + 1,
            valor: parseFloat(data.valorLetra.toString().replace(',', '.')),
          });
        } else {
          fechaValorLetraATiempo[fechaValorLetraATiempo.indexOf(fechaAnioEncontrada)].data[
            fechaValorLetraATiempo[fechaValorLetraATiempo.indexOf(fechaAnioEncontrada)].data.indexOf(fechaMesEncontrada)
          ].valor =
            fechaValorLetraATiempo[fechaValorLetraATiempo.indexOf(fechaAnioEncontrada)].data[
              fechaValorLetraATiempo[fechaValorLetraATiempo.indexOf(fechaAnioEncontrada)].data.indexOf(
                fechaMesEncontrada,
              )
            ]?.valor + parseFloat(data.valorLetra.toString().replace(',', '.'));
        }
      }
    });

    // ordenar de fechaValorLetra.anio el año menor y mayor
    fechaValorLetra.sort((a, b) => a.anio - b.anio);
    //obtener el valor de fechaValorLetra[0].anio
    // console.log('fechaValorLetra[0].anio', fechaValorLetra[0]?.anio);

    setFechaMinima(new Date(fechaValorLetra[0]?.anio, 0, 1));
    setFechaMaxima(new Date(fechaValorLetra[fechaValorLetra.length - 1]?.anio, 11, 31));
    setFechaSeleccionada(new Date(fechaValorLetra[0]?.anio, 0, 1));
    // ordenar de fechaValorLetra.anio el año menor y mayor
    fechaValorLetraATiempo.sort((a, b) => a.anio - b.anio);
    setFechasValoresATiempo(fechaValorLetraATiempo);
    // console.log('fechaValorLetra', fechaValorLetra);
    setFechasValores(fechaValorLetra);
  }, [dataHistorial, dataHistorialATiempo]);

  useEffect(() => {
    //segun la fecha seleccionada se debe filtrar del arreglo plantillaMeses cuyo value coincida con la fecha seleccionada
    // y se debe obtener el valor de la propiedad label
    // console.log('fechaSeleccionada', fechaSeleccionada.getFullYear());

    // setFechasValoresATiempo(
    //   fechasValoresATiempo.map((data) => {
    //     data.data.sort((a, b) => a.mes - b.mes);
    //     return data;
    //   }),
    // );
    // console.log(
    //   'fechasValoresATiempo',
    //   fechasValoresATiempo.map((data) => {
    //     console.log('data', data);
    //     data.data.sort((a, b) => a.mes - b.mes);
    //     return data;
    //   }),
    // );

    let encontrarAnio = fechasValores.find((data) => data.anio === fechaSeleccionada.getFullYear());
    let encontrarAnioATiempo = fechasValoresATiempo.find((data) => data.anio === fechaSeleccionada.getFullYear());

    // console.log('encontrarAnio', encontrarAnio);
    if (encontrarAnio !== undefined) {
      let _mesSeleccionado = [];
      let _valores = [];
      let _meses = [];
      let _valoresATiempo = [];
      let _mesesATiempo = [];

      let dataFechaValor = encontrarAnio.data.sort((a, b) => a.mes - b.mes);
      // console.log('dataFechaValor', dataFechaValor);
      dataFechaValor.map((data) => {
        let e = plantillaMeses.find((mes) => mes.value === data.mes);
        _mesSeleccionado.push(e);
        _valores.push(data.valor);
        _meses.push(e.label);
      });

      encontrarAnioATiempo?.data.map((data) => {
        let e = plantillaMeses.find((mes) => mes.value === data.mes);
        _valoresATiempo.push(data.valor);
        _mesesATiempo.push(e.label);
      });

      // console.log('_valores', _valores);
      // console.log('_meses', _meses);
      // console.log('_valoresATiempo', _valoresATiempo);
      // console.log('_mesesATiempo', _mesesATiempo);

      setLineStylesData({
        labels: _meses,
        datasets: [
          {
            label: 'Crecimiento de Cartera del año ' + fechaSeleccionada.getFullYear(),
            data: _valores,
            fill: true,
            borderColor: '#FF856B',
            tension: 0.6,
            backgroundColor: 'rgba(255,167,38,0.2)',
          },
          {
            label: 'Recuperación de Cartera del año ' + fechaSeleccionada.getFullYear(),
            data: _valoresATiempo,
            fill: true,
            borderColor: '#66FF3D',
            tension: 0.6,
            backgroundColor: 'rgba(173, 255, 150)',
          },
        ],
      });

      // console.log('_mesSeleccionado', _mesSeleccionado);
    }
  }, [fechaSeleccionada]);

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
        title: {
          display: true,
          text: 'Avance Histórico de la cartera por año',
          font: {
            size: 20,
            weight: 600,
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
      <div className="flex-row w-full">
        <div className="flex flex-row alig">
          <div className="font-italic font-semibold flex align-items-center align-content-center pr-3">
            Selección de año a visualizar:
          </div>
          <Calendar
            id="icon"
            view="year"
            dateFormat="yy"
            minDate={fechaMinima}
            maxDate={fechaMaxima}
            value={fechaSeleccionada}
            onChange={(e) => setFechaSeleccionada(e.value)}
            showIcon
            className="w-2"
          />
        </div>

        <Chart type="line" className="w-full " data={lineStylesData} options={basicOptions} />
      </div>
    </div>
  );
}
