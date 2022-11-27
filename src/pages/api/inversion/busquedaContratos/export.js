import { utils, write } from 'xlsx';

import axios from '@lib/axiosArrastre';

const handler = async (req, res) => {
  const contratosHeader = [
    'estado',
    'emergencia',
    'numeroUnico',
    'nombre',
    'contratoInstitucion',
    'proyecto',
    'cup',
    'entidad',
    'nombreObra',
    'tipoContrato',
    'objeto',
    'aumentaDisminuye',
    'categoria',
    'grupoGasto',
    'montoSinIva',
    'montoIva',
    'totalIva',
    'noPagado',
    'montoFinal',
    'totalDevengado',
    'totalPorDevengar',
    'arrastre',
    'fechaInicio',
    'fechaFin',
    'pai',
    'presupuestadoPai',
    'montoPai',
    'observaciones',
  ];

  const response = await axios.get(`/api/contrato/consultarContratos?idEntidad=0`);
  const contratos = response.data ? response.data : [];

  const ws = utils.json_to_sheet(contratos, { header: contratosHeader });
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, 'Data');
  const buf = write(wb, { type: 'buffer', bookType: 'xlsx' });

  res.send(buf);
};

export default handler;
