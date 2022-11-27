import { utils, write } from 'xlsx';

import axios from '@lib/axiosArrastre';

const handler = async (req, res) => {
  const proyectoHeader = [
    'proyectoNombre',
    'cup',
    'montoPlanificado',
    'montoTotal',
    'consejoSectorial',
    'entidad',
    'programa',
  ];

  const response = await axios.get(`/api/proyecto/consultaProyecto`);
  const proyecto = response.data ? response.data : [];

  const ws = utils.json_to_sheet(proyecto, { header: proyectoHeader });
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, 'Data');
  const buf = write(wb, { type: 'buffer', bookType: 'xlsx' });

  res.send(buf);
};

export default handler;
