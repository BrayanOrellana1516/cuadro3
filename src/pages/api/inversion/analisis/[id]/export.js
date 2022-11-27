import { utils, write } from 'xlsx';

import axios from '@lib/axios';

const handler = async (req, res) => {
  const { id } = req.query;
  const year = new Set();
  const cronogramaValoradoHeader = [
    'codigoComponente',
    'actividad',
    'fuenteFinanciamiento',
    'grupoGasto',
    'itemPresupuestario',
    'cantidad',
    'costoUnitario',
  ];

  const cronogramaValorado = [];
  const response = await axios.get(`/api/proyectoFuente/consultaCronogramaValorado?codigoProyecto=${id}`);
  response.data.map((c) => {
    let o = {};
    c?.actividades?.map((actividad) => {
      o.codigoComponente = c?.componente;
      o.actividad = actividad.actividad;
      o.fuenteFinanciamiento = actividad.fuenteFinanciamiento;
      o.grupoGasto = actividad.grupoGasto;
      o.itemPresupuestario = actividad.itemPresupuestario;
      o.cantidad = actividad.cantidad;
      o.costoUnitario = actividad.costoUnitario;
      for (const value of actividad.anios) {
        year.add(value.anio);
        o[value.anio] = value.monto;
      }
      cronogramaValorado.push(o);
    });
  });

  const ws = utils.json_to_sheet(cronogramaValorado, { header: [...cronogramaValoradoHeader, ...year] });
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, 'Data');
  const buf = write(wb, { type: 'buffer', bookType: 'xlsx' });

  res.send(buf);
};

export default handler;
