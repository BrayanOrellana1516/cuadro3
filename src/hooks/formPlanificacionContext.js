/**
 * Secretaria Nacional de Planificación y Desarrollo - SNP
 *
 * Producto: formPlanificacionContext.js
 * Creado: 18/11/2022
 * Hora: 15:01
 *
 * Todos los derechos reservados
 *
 * El sostenido de este archivo está protegido por los Derechos de Autor
 * de la Secretaria Nacional de Planificación y Desarrollo.
 * No se permite su reproducción o distribución sin
 * una autorización previa de la Institución, y será penado
 * por la ley según se infrinja este estandar.
 *
 */
import { createContext, useState } from 'react';

const FormPlanificacionContext = createContext();
function FormPlanificacionProvider(props) {
  //PLAN NACIONAL
  const [estado, setEstado] = useState(null);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState(null);
  const [eje, setEje] = useState(null);
  const [ejeSeleccionado, setEjeSeleccionado] = useState(null);
  const [objetivo, setObjetivo] = useState(null);
  const [objetivoSeleccionado, setObjetivoSeleccionado] = useState(null);
  const [politica, setPolitica] = useState(null);
  const [politicaSeleccionado, setPoliticaSeleccionado] = useState(null);
  const [responsable, setResponsable] = useState(null);
  const [metaOds, setMetaOds] = useState(null);
  const [metaOdsSeleccionado, setMetaOdsSeleccionado] = useState(null);
  const [meta, setMeta] = useState(null);
  const [metaSeleccionado, setMetaSeleccionado] = useState(null);
  const [comportamiento, setComportamiento] = useState(null);
  const [comportamientoSeleccionado, setComportamientoSeleccionado] = useState(null);
  const [indentificador1, setIndentificador1] = useState(null);
  const [nombreEje, setNombreEje] = useState(null);
  const [fechaInicioEje, setFechaInicioEje] = useState(null);
  const [fechaFinEje, setFechaFinEje] = useState(null);
  const [identificadorObjetivo, setIdentificadorObjetivo] = useState(null);
  const [nombreObjetivo, setNombreObjetivo] = useState(null);
  const [fechaInicioObjetivo, setFechaInicioObjetivo] = useState(null);
  const [fechaFinObjetivo, setFechaFinObjetivo] = useState(null);
  const [identificadorPolitica, setIdentificadorPolitica] = useState(null);
  const [nombrePolitica, setNombrePolitica] = useState(null);
  const [fechaInicioPolitica, setFechaInicioPolitica] = useState(null);
  const [fechaFinPolitica, setFechaFinPolitica] = useState(null);
  const [indentificadorMeta, setIndentificadorMeta] = useState(null);
  const [nombreMeta, setNombreMeta] = useState(null);
  const [fechaInicioMeta, setFechaInicioMeta] = useState(null);
  const [fechaFinMeta, setFechaFinMeta] = useState(null);
  const [indicador2, setIndicador2] = useState(null);
  const [nombreIndicador, setNombreIndicador2] = useState(null);
  const [fechaFinIndicador, setFechaFinIndicador] = useState(null);
  const [fechaInicioIndicador, setFechaInicioIndicador] = useState(null);
  const [lineaBase, setLineaBase] = useState(null);
  const [tablaPolitica, setTablaPolitica] = useState(null);
  const [ejeTabla, setEjeTabla] = useState([]);
  const [objetivoTabla, setObjetivoTabla] = useState([]);
  const [num, setNum] = useState(1);
  const [numOb, setNumOb] = useState(1);
  const [numPolitica, setNumPolitica] = useState(1);
  const [numIndicador, setNumIndicador] = useState(1);
  const [numMeta, setNumMeta] = useState(1);
  const [politicaTabla, setPoliticaTabla] = useState([]);
  const [indicadorTabla, setIndicadorTabla] = useState([]);
  const [metaTabla, setMetaTabla] = useState([]);
  const [indicadorTablaAnio, setIndicadorTablaAnio] = useState([])

  
  /*
  const [] = useState(null)
  const [] = useState(null)
  const [] = useState(null)
  const [] = useState(null)
   const [] = useState(null)
    
     
    const [] = useState(null);*/

  /**OBJETIVO SECTORIALES**/
  const [mostrarFichaSectorial, setMostrarFichaSectorial] = useState(false);
  const [mostrarFichaMetasSectoriales, setMostrarFichasMetasSectoriales] = useState(false);
  const [mostrarDescripcion, setMostrarDescripcion] = useState(false);
  const [descripcion, setDescripcion] = useState('');
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [anio, setAnio] = useState(null);
  const [bitacoraCambios, setBitacoraCambios] = useState([
    {
      fecha: new Date().toLocaleDateString(),
      id: new Date().getMilliseconds(),
      actualizadoPor: '',
      estado: '',
      comentario: '',
    },
  ]);
  const [objetivos, setObjetivos] = useState([]);

  /**FICHA SECTORIAL**/
  const [sector, setSector] = useState(null);
  const [entidadRectora, setEntidadRectora] = useState(null);
  const [fechaInicioFichaSectorial, setFechaInicioFichaSectorial] = useState(null);
  const [fechaFinFichaSectorial, setFechaFinFichaSectorial] = useState(null);

  /**ALINEACIÓN PLANIFICACIÓN */
  const [ods, setOds] = useState(null);
  const [metaODS, setMetaODS] = useState(null);
  const [ejePND, setEjePND] = useState(null);
  const [objetivosPND, setObjetivosPND] = useState(null);
  const [politicasPND, setPoliticasPND] = useState(null);
  const [metasPND, setMetasPND] = useState(null);
  const [lineamientoETN, setLineamientoETN] = useState(null);

  /**MODELO GESTIÓN */
  const [identificacionResponsables, setIdentificacionResponsables] = useState(null);
  const [corriente, setCorriente] = useState(null);
  const [inversion, setInversion] = useState(null);

  /**PLANIFICACIÓN DE SERVICIOS */
  const [serviciosPublicos, setServiciosPublicos] = useState(null);
  const [descripcionServicio, setDescripcionServicio] = useState(null);
  const [entidad, setEntidad] = useState(null);
  const [datosPlanificacionServicios, setDatosPlanificacionServicios] = useState([]);
  const [registro, setRegistro] = useState([
    {
      fechaUltimaModificacion: '',
      modificadoPor: '',
    },
  ]);

  /**PROPUESTO */
  const [objetivoSectorial, setObjetivoSectorial] = useState('');
  const [indicadorSectorial, setIndicadorSectorial] = useState('');
  const [metaSectorial2025, setMetaSectorial2025] = useState('');

  /**ALINEACIÓN */
  const [objetivoSectorialSeleccionado, setObjetivoSectorialSeleccionado] = useState(null);
  const [metaSectorial2025Alineacion, setMetaSectorial2025Alineacion] = useState(null);

  /**INDICADOR */
  const [nombreIndicadorMetaSectorial, setNombreIndicadorMetaSectorial] = useState(null);
  const [definicionIndicador, setDefinicionIndicador] = useState(null);
  const [formulaCalculo, setFormulaCalculo] = useState(null);
  const [definicionVariables, setDefinicionVariables] = useState(null);
  const [metodologiaCalculo, setMetodologiaCalculo] = useState(null);
  const [fuenteDatos, setFuenteDatos] = useState(null);
  const [periodicidad, setPeriodicidad] = useState(null);
  const [fechaTransferencia, setFechaTransferencia] = useState(null);
  const [tipoIndicador, setTipoIndicador] = useState(null);
  const [responsableIndicador, setResponsableIndicador] = useState(null);
  const [lineaBaseIndicador, setLineaBaseIndicador] = useState(null);
  const [naturalezaMeta, setNaturalezaMeta] = useState(null);
  const [fechaInicioIndicadorMetaSectorial, setFechaInicioIndicadorMetaSectorial] = useState(null);
  const [fechaFinIndicadorMetaSectorial, setFechaFinIndicadorMetaSectorial] = useState(null);
  const [registroIndicador, setRegistroIndicador] = useState([
    {
      id: 0,
      fechaUltimaModificacion: '',
      modificadoPor: '',
    },
  ]);

  return (
    <div>
      <FormPlanificacionContext.Provider
        value={{
          indicadorTabla, setIndicadorTabla,
          indicadorTablaAnio, setIndicadorTablaAnio,
          metaTabla, setMetaTabla,
          politicaTabla, setPoliticaTabla,
          numPolitica,
          setNumPolitica,
          numIndicador,
          setNumIndicador,
          numMeta,
          setNumMeta,
          num,
          setNum,
          numOb,
          setNumOb,
          objetivoTabla,
          setObjetivoTabla,
          ejeTabla,
          setEjeTabla,
          estado,
          setEstado,
          estadoSeleccionado,
          setEstadoSeleccionado,
          eje,
          setEje,
          ejeSeleccionado,
          setEjeSeleccionado,
          objetivo,
          setObjetivo,
          objetivoSeleccionado,
          setObjetivoSeleccionado,
          politica,
          setPolitica,
          politicaSeleccionado,
          setPoliticaSeleccionado,
          responsable,
          setResponsable,
          metaOds,
          setMetaOds,
          metaOdsSeleccionado,
          setMetaOdsSeleccionado,
          meta,
          setMeta,
          metaSeleccionado,
          setMetaSeleccionado,
          comportamiento,
          setComportamiento,
          comportamientoSeleccionado,
          setComportamientoSeleccionado,
          indentificador1,
          setIndentificador1,
          nombreEje,
          setNombreEje,
          fechaInicioEje,
          setFechaInicioEje,
          fechaFinEje,
          setFechaFinEje,
          identificadorObjetivo,
          setIdentificadorObjetivo,
          nombreObjetivo,
          setNombreObjetivo,
          fechaInicioObjetivo,
          setFechaInicioObjetivo,
          fechaFinObjetivo,
          setFechaFinObjetivo,
          identificadorPolitica,
          setIdentificadorPolitica,
          nombrePolitica,
          setNombrePolitica,
          fechaInicioPolitica,
          setFechaInicioPolitica,
          fechaFinPolitica,
          setFechaFinPolitica,
          indentificadorMeta,
          setIndentificadorMeta,
          nombreMeta,
          setNombreMeta,
          fechaInicioMeta,
          setFechaInicioMeta,
          fechaFinMeta,
          setFechaFinMeta,
          indicador2,
          setIndicador2,
          nombreIndicador,
          setNombreIndicador2,
          fechaFinIndicador,
          setFechaFinIndicador,
          fechaInicioIndicador,
          setFechaInicioIndicador,
          lineaBase,
          setLineaBase,
          tablaPolitica,
          setTablaPolitica,
          /**OBJETIVO SECTORIALES**/
          mostrarFichaSectorial,
          setMostrarFichaSectorial,
          mostrarFichaMetasSectoriales,
          setMostrarFichasMetasSectoriales,
          mostrarDescripcion,
          setMostrarDescripcion,
          setDescripcion,
          descripcion,
          fechaInicio,
          setFechaInicio,
          setFechaFin,
          fechaFin,
          anio,
          bitacoraCambios,
          setBitacoraCambios,
          objetivos,
          setObjetivos,

          setAnio,
          /**FICHA SECTORIAL**/
          sector,
          setSector,
          entidadRectora,
          fechaInicioFichaSectorial,
          setEntidadRectora,
          setFechaInicioFichaSectorial,

          fechaFinFichaSectorial,
          setFechaFinFichaSectorial,
          ods,
          /**ALINEACIÓN PLANIFICACIÓN */
          setOds,
          setMetaODS,
          objetivosPND,
          metaODS,
          ejePND,
          setEjePND,
          setObjetivosPND,
          politicasPND,
          metasPND,

          lineamientoETN,
          setLineamientoETN,
          setMetasPND,
          setPoliticasPND,
          /**MODELO GESTIÓN */
          setIdentificacionResponsables,
          identificacionResponsables,
          inversion,
          corriente,
          setCorriente,

          serviciosPublicos,
          setInversion,
          /**PLANIFICACIÓN DE SERVICIOS */
          setDescripcionServicio,
          descripcionServicio,
          setServiciosPublicos,
          datosPlanificacionServicios,
          entidad,
          setEntidad,
          registro,
          setDatosPlanificacionServicios,
          setRegistro,
          /**PROPUESTO */

          setObjetivoSectorial,
          objetivoSectorial,
          setIndicadorSectorial,
          indicadorSectorial,
          setMetaSectorial2025,

          metaSectorial2025,
          /**ALINEACIÓN */
          metaSectorial2025Alineacion,
          /**INDICADOR */
          definicionIndicador,
          setNombreIndicadorMetaSectorial,
          nombreIndicadorMetaSectorial,

          setMetaSectorial2025Alineacion,
          setObjetivoSectorialSeleccionado,
          objetivoSectorialSeleccionado,
          formulaCalculo,
          setDefinicionIndicador,
          setFormulaCalculo,
          setMetodologiaCalculo,
          fechaTransferencia,
          fuenteDatos,
          setPeriodicidad,
          periodicidad,
          setFuenteDatos,
          metodologiaCalculo,
          setDefinicionVariables,
          definicionVariables,
          setFechaTransferencia,
          setTipoIndicador,
          setResponsableIndicador,
          responsableIndicador,
          tipoIndicador,
          setFechaInicioIndicadorMetaSectorial,
          fechaInicioIndicadorMetaSectorial,
          naturalezaMeta,
          setLineaBaseIndicador,
          lineaBaseIndicador,
          setNaturalezaMeta,
          setRegistroIndicador,
          registroIndicador,
          setFechaFinIndicadorMetaSectorial,
          fechaFinIndicadorMetaSectorial,
        }}
      >
        {props.children}
      </FormPlanificacionContext.Provider>
    </div>
  );
}
export { FormPlanificacionContext, FormPlanificacionProvider };
