import fileDownload from 'js-file-download';
import { useEffect, useState } from 'react';

import axios from '@lib/axios';
import axiosArrastre from '@lib/axiosArrastre';

//INVERSIÓN
const useObtenerCatalogoPadre = (idCatalogoPadre) => {
  const [catalogoPadre, setCatalogoPadre] = useState([]);
  useEffect(() => {
    axios.get('/api/catalogo/catalogo_padre/' + idCatalogoPadre).then((response) => {
      setCatalogoPadre(response.data);
    });
  }, []);
  return catalogoPadre;
};

const useObtenerCreditoAutocomplete = (proyecto) => {
  const [catalogoJerarquia, setCatalogoJerarquia] = useState([]);

  useEffect(() => {
    axios.get(`/api/proyectoFuente/consultarFuentesDeInfoCreditos/` + proyecto).then((response) => {
      setCatalogoJerarquia(response.data);
    });
  }, []);

  return catalogoJerarquia;
};

//ARRASTRE
const enviarDatosFormularioObras = (param) => {
  //se usa axios porque esta en el de modulo de inversion
  axios({
    method: 'post',
    url: `api/obra`,
    data: param,
  });
};

/* DATOS GENERALES */
const useObtenerCatalogoTipoContrato = () => {
  const [catalogoTipoContrato, setCatalogoTipoContrato] = useState([]);

  useEffect(() => {
    axios.get(`/api/catalogo/tipo/TIPO_CONTRATO`).then((response) => {
      setCatalogoTipoContrato(response.data);
    });
  }, []);

  return catalogoTipoContrato;
};

const useObtenerCatalogoCategoriaContrato = () => {
  const [catalogoCategoriaContrato, setCatalogoCategoriaContrato] = useState([]);

  useEffect(() => {
    axios.get(`/api/catalogo/tipo/CATEGORIA_CONTRATO`).then((response) => {
      setCatalogoCategoriaContrato(response.data);
    });
  }, []);

  return catalogoCategoriaContrato;
};
const enviarDatosFormularioProyectoCur = (param) => {
  axiosArrastre({
    method: 'post',
    url: `/api/cur/creaCur`,
    data: param,
  });
};

const useObtenerArrastreProyectoFormularioTipoCatalogo = (param) => {
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    axios.get('/api/catalogo/tipo/' + param).then((response) => {
      setProyectos(response.data);
    });
  }, []);

  return proyectos;
};

const getCatalogo = (param) => {
  let proyectos = [];
  return axios.get('/api/catalogo/tipo/' + param);
};

const useObtenerArrastreProyectoFormularioItemPresupuestario = (param) => {
  //const [itemPresupuestario, setItemPresupuestario] = useState([]);
  let itemPresupuestario = [];
  useEffect(() => {
    axios.get('/api/catalogo/catalogo_padre/' + param).then((response) => {
      //setItemPresupuestario(response.data);
      itemPresupuestario = response.data;
    });
  }, []);
  return itemPresupuestario;
};
const useObtenerArrastreProyectos = () => {
  const [listadoContratos, setListadoContratos] = useState([]);

  useEffect(() => {
    axiosArrastre.get(`/api/proyecto/consultaProyecto`).then((response) => {
      setListadoContratos(response.data);
    });
  }, []);
  return listadoContratos;
};

const obtenerArrastreProyectos = async () => {
  let listadoObras = [];

  await axiosArrastre.get(`/api/proyecto/consultaProyecto`).then((response) => {
    listadoObras = response.data;
  });
  return listadoObras;
};
const obtenerFinanCredito = async (proyecto) => {
  let listadoObras = [];

  await axios.get(`api/proyectoFuente/consultarInfoCreditos/` + proyecto).then((response) => {
    listadoObras = response.data;
  });
  return listadoObras;
};

const obtenerArrastreObrasCup = async (param) => {
  let listadoObras = [];
  if (!param) return listadoObras;
  await axiosArrastre.get(`api/obra/consultarObras/${param}`).then((response) => {
    listadoObras = response.data;
  });
  return listadoObras;
};
const obtenerConsultarFichas = async (param) => {
  let listadoObras = [];
  if (!param) return listadoObras;
  await axios.get(`/api/proyecto-estudio/consultarFichas/${param}`).then((response) => {
    listadoObras = response.data;
  });
  return listadoObras;
};

const obtenerArrastreContratoObras = async (param) => {
  let listadoObras = [];
  if (!param) return listadoObras;
  await axiosArrastre.get(`api/contrato/consultarContratoObra?codigoObra=${param}`).then((response) => {
    listadoObras = response.data;
  });
  return listadoObras;
};

const useObtenerArrastreListadoCur = () => {
  const [listadoCur, setListadoCur] = useState([]);

  useEffect(() => {
    axiosArrastre.get(`/api/cur/consultaCur`).then((response) => {
      setListadoCur(response.data);
    });
  }, []);
  return listadoCur;
};

const obtenerArrastreContratos = async () => {
  let listadoObras = [];

  await axiosArrastre.get(`/api/contrato/consultarContratos?idEntidad=0`).then((response) => {
    listadoObras = response.data;
  });
  return listadoObras;
};

const useObtenerArrastreContratos = () => {
  const [listadoContratos, setListadoContratos] = useState([]);

  useEffect(() => {
    axiosArrastre.get(`/api/contrato/consultarContratos?idEntidad=0`).then((response) => {
      setListadoContratos(response.data);
    });
  }, []);
  return listadoContratos;
};

const useObtenerArrastreObrasListado = () => {
  const [listadoObras, setListadoObras] = useState([]);

  useEffect(() => {
    axiosArrastre
      .get(`/api/obra/consultarObras?idEntidad=0`) //idEntidad esta quemado porque aun no se implementa el modulo de autenticacion
      .then((response) => {
        setListadoObras(response.data);
      });
  }, []);
  return listadoObras;
};

const obtenerArrastreObrasFormulario = async (param) => {
  let listadoObras = [];
  if (!param) return listadoObras;
  await axiosArrastre.get(`/api/obra/consultarObra?codigoObra=` + param).then((response) => {
    listadoObras = response.data;
  });
  return listadoObras;
};

/*const cargarEstudioTecnico = async (param) => {
  let listadoObras = [];
  if (!param) return listadoObras;
  await axios
    .get(`api/proyecto-estudio/consultar?codigoProyecto=` + param)
    .then((response) => {
      listadoObras = response.data;
    })
    .catch((error) => {
      
    });
  return listadoObras;
};*/

/* DATOS GENERALES */
const useObtenerLineamientosInversion = (idEntidad) => {
  const [lineamientosInversion, setLineamientosInversion] = useState([]);

  useEffect(() => {
    axios
      .get('/api/catalogo/lineamiento-inversion/' + idEntidad) //${params}
      .then((response) => {
        setLineamientosInversion(response.data);
      });
  }, []);
  return lineamientosInversion;
};

const obtenerEstudiosTecnicosTipo1 = (idProyecto) => {
  const promise = axios.get('/api/catalogo/consultar-estudios-tecnicos');

  // using .then, create a new promise which extracts the data
  const dataPromise = promise.then((response) => response.data);

  return dataPromise;
};

/* Servicio que devuelve proyectos existentes en base*/
const useObtenerTodosProyectos = () => {
  const promise = axios.get('/api/proyecto');

  // using .then, create a new promise which extracts the data
  const dataPromise = promise.then((response) => response.data);
  return dataPromise;
};

/* Servicio que devuelve "codigosFiltrados" en base a nomnicoProyecto(CUP) y codigoUnidadEjecutora
Nota: Utiliza arreglo de Proyectos existentes */
const useObtenerNombresUnidadesEjecutoras = (proyectos) => {
  let url1 = '/api/proyecto/consultarProyecto?nemonico_proyecto=';
  let url2 = '&codigo_unidad_ejecutora=';
  let _codigosFiltrados = [];
  if (!Array.isArray(proyectos)) return _codigosFiltrados;
  let dataPromise = proyectos.forEach((element) => {
    let _dir = url1 + element.nemonicoProyecto + url2 + element.codigoUnidadEjecutora;
    const promise = axios.get(_dir);

    // using .then, create a new promise which extracts the data
    dataPromise = promise.then((response) => response.data);
    _codigosFiltrados.push(dataPromise);
  });
  return _codigosFiltrados;
};

const useInsertarCoordenada = (data) => {
  axios({
    method: 'post',
    url: `/api/proyecto-coordenada/crear`,
    data: {
      codigoProyecto: data.codigoProyecto,
      coordenadaX: data.coordenadaX,
      coordenadaY: data.coordenadaY,
      observacion: data.observacion,
    },
  });
};
/* LLama a la API para obtener los datos guardados MARCO LOGICO de un proyecto */
const useObtenerMarcoLogico = (idProyecto) => {
  const promise = axios.get('/api/proyecto-marco-logico/' + idProyecto);

  // using .then, create a new promise which extracts the data
  const dataPromise = promise.then((response) => response.data);

  return dataPromise;
};

const useObtenerCatalogoGAP = () => {
  const [catalogo, setCatalogo] = useState([]);

  useEffect(() => {
    axios.get(`/api/catalogo/tipo/TIPO_GAP`).then((response) => {
      setCatalogo(response.data);
    });
  }, []);

  return catalogo;
};

const useObtenerModelosGestion = () => {
  const [modelosGestion, setModelosGestion] = useState([]);

  useEffect(() => {
    axios.get(`/api/catalogo/tipo/MODELO_GESTION`).then((response) => {
      setModelosGestion(response.data);
    });
  }, []);
  return modelosGestion;
};

const useObtenerSectores = () => {
  const [sectores, setSectores] = useState([]);

  useEffect(() => {
    axios.get(`/api/catalogo/tipo/SECTOR`).then((response) => {
      setSectores(response.data);
    });
  }, []);
  return sectores;
};

const useObtenerSubSectores = (params, sectores) => {
  const [subSectores, setSubSectores] = useState([]);

  if (params !== null && params !== undefined) {
    if (sectores.length > 0) {
      if (sectores.find((sector) => sector === params)) {
        axios.get(`/api/catalogo/sector/${params}/subsector`).then((response) => {
          setSubSectores(response.data);
        });
      }
      return subSectores;
    }
  }
};

const useObtenerCoberturas = () => {
  const [modeloGestion, setModelosGestion] = useState([]);

  useEffect(() => {
    axios.get(`/api/catalogo/tipo/COBERTURA`).then((response) => {
      setModelosGestion(response.data);
    });
  }, []);
  return modeloGestion;
};

const useObtenerTiposInversion = () => {
  const [tipoInversiones, setTiposInversion] = useState([]);

  useEffect(() => {
    axios.get(`/api/catalogo/tipo/TIPO_INVERSION`).then((response) => {
      setTiposInversion(response.data);
    });
  }, []);
  return tipoInversiones;
};

const useObtenerAdquisiciones = () => {
  const [adquisiciones, setAdquisiciones] = useState([]);

  useEffect(() => {
    axios.get(`/api/catalogo/tipo/ADQUISICION`).then((response) => {
      setAdquisiciones(response.data);
    });
  }, []);
  return adquisiciones;
};

const useObtenerProductos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios.get(`/api/catalogo/tipo/PRODUCTO`).then((response) => {
      setProductos(response.data);
    });
  }, []);
  return productos;
};

const useObtenerAval = () => {
  const [aval, setAval] = useState([]);

  useEffect(() => {
    axios.get(`/api/catalogo/tipo/AVAL`).then((response) => {
      setAval(response.data);
    });
  }, []);
  return aval;
};

/* ALINEACION PND */
const useObtenerTiposProyecto = () => {
  const [tiposProyecto, setTiposProyecto] = useState([]);

  useEffect(() => {
    axios.get(`/api/catalogo/tipo/TIPO_PROYECTO`).then((response) => {
      setTiposProyecto(response.data);
    });
  }, []);
  return tiposProyecto;
};
const useObtenerTodoProyectos = () => {
  const [tiposProyecto, setTiposProyecto] = useState([]);

  useEffect(() => {
    axios.get(`/api/proyecto`).then((response) => {
      setTiposProyecto(response.data);
    });
  }, []);
  return tiposProyecto;
};

const useEnviarDatosDeBusqueda = (param) => {
  axios({
    method: 'post',
    url: `api/proyecto-alineacion-pnd`,
    data: param,
  });
};
const useEnviarDatosDeTipoProyecto = (param) => {
  axios({
    method: 'post',
    url: `api/proyecto-alineacion-pnd/relacion`,
    data: param,
  });
};
//NOTIFICACIONES DE APROBACION, NEGACION Y OBSERVACIONES
const useObtenerNotificaciones = (idUsuario) => {
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    axios.get(`/api/solicitudproyecto/notificacion?codigoUsuario=1`).then((response) => {
      setNotificaciones(response.data);
    });
  }, []);
  return notificaciones;
};

const useObtenerFinanciamientoCampos = (nombre) => {
  const [catalogo, setCatalogo] = useState([]);

  useEffect(() => {
    axios.get(`/api/catalogo/tipo/${nombre}`).then((response) => {
      setCatalogo(response.data);
    });
  }, []);
  return catalogo;
};

const useObtenerTotalFuentesFinanciamientoPorCampo = (idProyecto, id_catalogo) => {
  const [catalogo, setCatalogo] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/proyectoFuente/consultarTotalPorFuente?idProyecto=${idProyecto}&id_catalogo=${id_catalogo}`)
      .then((response) => {
        setCatalogo(response.data);
      });
  }, []);

  return catalogo;
};

const obtenerFinanciamientoDatos = (idProyecto) => {
  const promise = axios.get('/api/proyectoFuente/consultarFuenteFinanciam/' + idProyecto);

  // using .then, create a new promise which extracts the data
  const dataPromise = promise.then((response) => response.data);

  return dataPromise;
};
const useGuardarUbicacionesGeograficasSeleccionadas = (data) => {
  if (data.codigoParroquia === undefined) {
    data.codigoParroquia = '';
  }

  axios({
    method: 'post',
    url: `/api/proyecto-ubicacion/crear`,
    data: {
      beneficiarios: data.beneficiarios,
      codigoCanton: data.codigoCanton,
      codigoParroquia: data.codigoParroquia,
      codigoProvincia: data.codigoProvincia,
      codigoProyecto: data.codigoProyectoNuevo,
      codigoRegion: data.codigoRegion,
      monto: data.monto,
    },
  });
};

const useObtenerFinanciamientoTotalPorFila = (idProyecto, anio) => {
  let [recursos, setRecursos] = useState([]);

  useEffect(() => {
    axios.get(`/api/proyectoFuente/consultarTotalPorAnio?idProyecto=${idProyecto}&anio=${anio}`).then((response) => {
      setRecursos(response.data);
    });
  }, []);
  return recursos;
};

const useObtenerEntidades = () => {
  const [entidades, setEntidades] = useState([]);
  useEffect(() => {
    axios.get(`/api/entidad`).then((response) => {
      setEntidades(response.data);
    });
  }, []);
  return entidades;
};

const useEnviarUsuario = (param) => {
  axios({
    method: 'post',
    url: `api/proyecto`,
    data: param,
  });
};

const editarDatosFinanciamiento = (param) => {
  let promise = axios.post(`api/proyectoFuente`, param);
  const dataPromise = promise.then((response) => response.data);
  return dataPromise;
};

const useObtenerFinanCreditoNombres = (proyecto) => {
  const [entidades, setEntidades] = useState([]);
  useEffect(() => {
    axios.get(`/api/proyectoFuente/consultarMarcoLogicoPeriodos/` + proyecto).then((response) => {
      setEntidades(response.data);
    });
  }, []);
  return entidades;
};
/*
const obtenerFinanCreditoNombres = async (proyecto) => {
  let listadoObras = [];

  await axios
    .get(`api/proyectoFuente/consultarMarcoLogicoPeriodos/` + proyecto)
    .then((response) => {
      listadoObras = response.data;
    })
    .catch((error) => {
      
    });
  return listadoObras;
};*/

const useConsultaProvinciasCodigoProyecto = (codigoProyecto) => {
  const promise = axios.get('/api/proyecto-ubicacion/' + codigoProyecto + '/provincias');

  // using .then, create a new promise which extracts the data
  const dataPromise = promise.then((response) => response.data);

  return dataPromise;
};

const consultarProyectoUbicacion = (codigoProyecto) => {
  const promise = axios.get('/api/proyecto-ubicacion/consultar/' + codigoProyecto);

  // using .then, create a new promise which extracts the data
  const dataPromise = promise.then((response) => response.data);

  return dataPromise;
};

const useIngresarSolicitud = (solicitud) => {
  let promise = axios.post(`/api/solicitudproyecto`, {
    idSolicitudProyecto: solicitud.idSolicitudProyecto,
    idProyecto: solicitud.idProyecto,
    idTipoSolicitud: solicitud.idTipoSolicitud,
    idEstadoSolicitud: solicitud.idEstadoSolicitud,
    creadoPor: solicitud.creadoPor,
    fechaCreacion: solicitud.fechaCreacion,
    modificadoPor: solicitud.modificadoPor,
    fechaUltimaModificacion: solicitud.fechaUltimaModificacion,
    activo: true,
  });
  const dataPromise = promise.then((response) => response.data);
  return dataPromise;
};

const useBorrarCoordenadaProyecto = (data) => {
  axios({
    method: 'delete',
    url: `/api/proyecto-coordenada/eliminar/${data}`,
  });
};

const useActualizarCoordenada = (data) => {
  axios({
    method: 'put',
    url: `/api/proyecto-coordenada/actualizar`,
    data: {
      codigo: data.codigo,
      codigoProyecto: data.codigoProyecto,
      coordenadaX: data.coordenadaX,
      coordenadaY: data.coordenadaY,
      observacion: data.observacion,
    },
  });
};

//Caso COPIA

const consultarFuenteFinanciamiento = (codigoProyecto) => {
  const promise = axios.get(
    '/api/FuenteFinanDetalle/consultaFuenteFinanDetalle/{idProyecto}?idProyecto=' + codigoProyecto,
  );

  // using .then, create a new promise which extracts the data
  const dataPromise = promise.then((response) => response.data);

  return dataPromise;
};

const consultarGrupoGasto = (codigoProyecto) => {
  const promise = axios.get(
    '/api/FuenteFinanDetalle/consultaFuenteFinanDetalle/{idProyecto}?idProyecto=' + codigoProyecto,
  );

  // using .then, create a new promise which extracts the data
  const dataPromise = promise.then((response) => response.data);

  return dataPromise;
};

/*CASO DE USO MARCO LÓGICO*/
const useEnviarDatosMarcoLogico = (param) => {
  axios({
    method: 'post',
    url: '/api/proyecto-marco-logico',
    data: param,
  });
};

const useObtenerCatalogoGrupoGasto = () => {
  const [grupoGasto, setGrupoGasto] = useState([]);

  useEffect(() => {
    axios.get(`/api/catalogo/tipo/GRUPO_GASTO`).then((response) => {
      setGrupoGasto(response.data);
    });
  }, []);

  return grupoGasto;
};

//INDICADORES
const UseEnviarDatosIndicadores = (param) => {
  axios({
    method: 'post',
    url: `api/proyecto/indicador`,
    data: param,
  });
};

const useObtenerProyectoVisualizacion = () => {
  const [proyectosVisualizacion, setProyectosVisualizacion] = useState([]);

  useEffect(() => {
    axios.get('api/solicitudproyecto/notificacion?codigoUsuario=1').then((response) => {
      setProyectosVisualizacion(response.data);
    });
  }, []);
  return proyectosVisualizacion;
};

const useObtenerTipoSolicitud = () => {
  const promise = axios.get('/api/catalogo/tipo/TIPO_SOLICITUD');

  // using .then, create a new promise which extracts the data
  const dataPromise = promise.then((response) => response.data);

  return dataPromise;
};

const enviarProyecto = (proyecto) => {
  axios.post(`/api/proyecto`, proyecto);
};

const useCargarIndicadoresProyecto = (idProyecto) => {
  const promise = axios.get('/api/proyecto/indicador/' + idProyecto);

  // using .then, create a new promise which extracts the data
  const dataPromise = promise.then((response) => response.data);

  return dataPromise;
};

const useCargarEstudioTecnico = (idProyecto) => {
  const promise = axios.get('api/proyecto-estudio/consultar?codigoProyecto=' + idProyecto);

  // using .then, create a new promise which extracts the data
  const dataPromise = promise.then((response) => response.data);

  return dataPromise;
};

const obtenerProyectoPorId = (idProyecto) => {
  const promise = axios.get('/api/proyecto/consultarProyectoId/' + idProyecto);

  // using .then, create a new promise which extracts the data
  const dataPromise = promise.then((response) => response.data);

  return dataPromise;
};

const cargarDatosGenerales = (idProyecto) => {
  const promise = axios.get('/api/proyecto/consultarProyectoId/' + idProyecto);

  // using .then, create a new promise which extracts the data
  const dataPromise = promise.then((response) => response.data);

  return dataPromise;
};

const useConsultaSolicitudProyecto = (codigoRol) => {
  const promise = axios.get('/api/solicitudproyecto/consultaSolicitudProyecto?codigoRol=' + codigoRol);

  // using .then, create a new promise which extracts the data
  const dataPromise = promise.then((response) => response.data);

  return dataPromise;
};
/* Obtener bandeja notificaciones de analistas */
const useConsultaNotificacionesAnalisis = (codigoRol) => {
  const promise = axios.get('/api/solicitudproyecto/consultaSolicitudProyecto?codigoRol=' + codigoRol);

  // using .then, create a new promise which extracts the data
  const dataPromise = promise.then((response) => response.data);

  return dataPromise;
};
const useDescargaArchivo = (uuid, filename) => {
  let url = '/api/archivo/descargar?uuidArchivo=' + uuid;
  axios
    .get(url, {
      responseType: 'blob',
    })
    .then((res) => {
      fileDownload(res.data, filename);
    });
};

/* Obtener Unidad Ejecutora por idEntidad */
const obtenerUnidadEjecutoraIdProyecto = (idEntidad) => {
  const promise = axios.get('/api/proyecto/unidad-ejecutora/' + idEntidad);

  // using .then, create a new promise which extracts the data
  const dataPromise = promise.then((response) => response.data);

  return dataPromise;
};

const descargaArchivoDeshabilitante = (uuid) => {
  axios
    .get('/api/archivo/descargar?uuidArchivo=' + uuid, {
      responseType: 'blob',
    })
    .then((res) => {
      fileDownload(res.data, 'archivo.pdf');
    });
};

const descargaInformesDictamen = (codigoSolicitud) => {
  axios.get('/api/proyecto/descargarArchivosDictamen?idSolicitud=' + codigoSolicitud).then((response) => {
    console.log('id SOlicitud', response.data.entry.id);
    let estado = response.data.entry;
    console.log('Toda Info', estado);
    obtenerID(estado);
  });
};

const obtenerID = (codigo) => {
  console.log('data', codigo);
  if (codigo.status === 'DONE') {
    console.log('Siguiente Paso');
    //axios.get("/api/archivo/descargar?uuidArchivo="+codigo.id).then((response2)=>{ console.log("info",response2);

    axios
      .get('/api/archivo/descargar?uuidArchivo=' + codigo.id, {
        responseType: 'blob',
      })
      .then((res) => {
        fileDownload(res.data, 'Documentos.zip');
      });
  } else {
    axios.get('/api/archivo/consultar/estado-descarga-todos?uuidArchivo=' + codigo.id).then((response2) => {
      obtenerID(response2.data.entry);
      console.log('En proceso');
    });
  }
};

const descargaArchivosHabilitantes = (codigoSolicitud) => {
  console.log('codigoSol', codigoSolicitud);
  axios.get('/api/proyecto/descargaArchivosHabilitantes?idSolicitud=' + codigoSolicitud).then((response) => {
    console.log('id SOlicitud', response.data.entry.id);
    let estado = response.data.entry;
    console.log('Toda Info', estado);
    obtenerID(estado);
  });
};

//Consulta Proyectos InvArrCU11.01
const useObtenerProyectoJerarquizar = () => {
  const [proyectosJerarquizar, setProyectosJerarquizar] = useState([]);

  useEffect(() => {
    axios.get('api/proyecto').then((response) => {
      setProyectosJerarquizar(response.data);
    });
  }, []);
  return proyectosJerarquizar;
};

//Consulta Catalogo CRITERIO_JERARQUIZACION

const useObtenerCatalogoJerarquia = () => {
  const [catalogoJerarquia, setCatalogoJerarquia] = useState([]);

  useEffect(() => {
    axios.get(`/api/catalogo/tipo/JERARQUIA_PROYECTO`).then((response) => {
      setCatalogoJerarquia(response.data);
    });
  }, []);

  return catalogoJerarquia;
};
/*api/proyectoFuente/consultarInfoCreditos/18606971 */
/*
const useObtenerCreditoAutocomplete = (proyecto) => {
  const [catalogoJerarquia, setCatalogoJerarquia] = useState([]);

  useEffect(() => {
    axios.get(`/api/proyectoFuente/consultarFuentesDeInfoCreditos/` + proyecto).then((response) => {
      setCatalogoJerarquia(response.data);
    });
  }, []);

  return catalogoJerarquia;
};
*/
/* Obtener INFORMACIÓN SOLICITADA */
const obtenerModificacionesPresupuestariasPorId = (codigoSolicitud) => {
  const promise = axios.get('/api/modificacionPresupuestaria/solicitud?codigo=' + codigoSolicitud);
  const dataPromise = promise.then((response) => response);

  return dataPromise;
};

/* Obtener Modificaciones Presupuestarias por idModificacionPresupuestaria */
const obtenerRegistroCertificacionPlurianual = (idModificaciones) => {
  const promise = axios.get(
    '/api/modificacionPresupuestaria/certificacionPlurianualVigente?codigoModificacionPresupuestaria=' +
      idModificaciones,
  );

  // using .then, create a new promise which extracts the data
  const dataPromise = promise.then((response) => response);

  return dataPromise;
};

/* Post Registro Certificacion Plurianual*/
const enviarRegistroCertificacionPlurianual = async (param) => {
  await axios({
    method: 'post',
    url: `/api/modificacionPresupuestaria/certificacionPlurianualVigente`,
    data: param,
  }).then((response) => {
    return response;
  });
};

/* Borrar Registro Certificacion Plurianual*/
const borrarRegistroCertificadoPlrurianual = (data) => {
  axios({
    method: 'delete',
    url: `/api/modificacionPresupuestaria/certificacionPlurianualVigente?codigo=${data}`,
  }).then((response) => {
    return response;
  });
};

/* Obtener DETALLE DE CONVENIO O NOTA REVERSAL PARA LA CO-EJECUCIÓN DE PROYECTOS */
const obtenerRegistroDetalleCoejecucion = (idModificaciones) => {
  const promise = axios.get(
    '/api/modificacionPresupuestaria/consultarModPresupuestariaDetConvenio/' + idModificaciones,
  );

  // using .then, create a new promise which extracts the data
  const dataPromise = promise.then((response) => response);

  return dataPromise;
};

/* Obtener DETALLE DE CONVENIO O NOTA REVERSAL PARA LA CO-EJECUCIÓN DE PROYECTOS */
const obtenerCertificacionPlurianual = (idModificaciones) => {
  const promise = axios.get(
    '/api/modificacionPresupuestaria/certificacionPresupuestariaPlurianual?idModificacionPresupuestaria=' +
      idModificaciones,
  );
  const dataPromise = promise.then((response) => response);
  return dataPromise;
};

/* Obtener PROGRAMACION DE LA EJECUCION */
const obtenerProgramacionEjecucion = (idModificaciones) => {
  const promise = axios.get(
    '/api/modificacionPresupuestaria/programacion?codigoModificacionPresupuestaria=' + idModificaciones,
  );
  const dataPromise = promise.then((response) => response);
  return dataPromise;
};

/* Obtener MONTOS PRIORIZADOS EN RELACION A MONTOS EJECUTADOS */
const obtenerMontosPriorizados = (idModificaciones) => {
  const promise = axios.get('/api/modificacionPresupuestaria/consultarModPresupuestariaMonto/' + idModificaciones);
  const dataPromise = promise.then((response) => response);
  return dataPromise;
};

/* Obtener DETALLE DE FINANCIAMIENTO */
const obtenerDetalleFinanciamiento = (idModificaciones) => {
  const promise = axios.get(
    '/api/modificacionPresupuestaria/consultarModPresupuestariaFinanciamiento/' + idModificaciones,
  );
  const dataPromise = promise.then((response) => response);
  return dataPromise;
};

/* Obtener DETALLE MODIFICACION PRESUPUESTARIA (INCLUSION (INCREMENTO,TRANSFERENCIA INTER,TRANSFERENCIA INTRA)) */
const obtenerDetalleModificacionPresupuestaria = (idModificaciones) => {
  const promise = axios.get(
    '/api/modificacionPresupuestaria/detalle?codigoModificacionPresupuestaria=' + idModificaciones,
  );
  const dataPromise = promise.then((response) => response);
  return dataPromise;
};

/* Obtener tipo de Solicitud por NumeroTipo */
const obtenerSolicitudProyectoTipo = (tipoSolicitud) => {
  const promise = axios.get('/api/solicitudproyecto/tipo/' + tipoSolicitud);
  const dataPromise = promise.then((response) => response);
  return dataPromise;
};

/* Obtener Años de Proyecto por IDProyecto*/
const obtenerAniosProyecto = (idProyecto) => {
  const promise = axios.get('/api/proyectoFuente/consultarAniosProyecto?codigoProyecto=' + idProyecto);
  const dataPromise = promise.then((response) => response);
  return dataPromise;
};

/* Obtener Años de Proyecto por IDProyecto*/
const obtnerAnalisisModificaciones = (tipoSolicitud) => {
  const promise = axios.get(
    '/api/modificacionPresupuestaria/analisis?codigoModificacionPresupuestaria=' + tipoSolicitud,
  );
  const dataPromise = promise.then((response) => response);
  return dataPromise;
};

/* Obtener ComponentesMarcoLogico por IDProyecto*/
const obtnerComponentesProyecto = (idProyecto) => {
  const promise = axios.get('/api/proyecto/' + idProyecto + '/marco-logico/Componentes');
  const dataPromise = promise.then((response) => response);
  return dataPromise;
};

/* Obtener DETALLE DE FINANCIAMIENTO */
const obtenerMarcoLogico = (idProyecto) => {
  const promise = axios.get('/api/proyecto/' + idProyecto + '/marco-logico');
  const dataPromise = promise.then((response) => response);
  return dataPromise;
};

/* Obtener INFORMACIÓN SOLICITADA */
const obtenerAlineacionPndPorId = (idProyecto) => {
  const promise = axios.get('/api/proyecto-alineacion-pnd/' + codigoSolicitud);
  const dataPromise = promise.then((response) => response);

  return dataPromise;
};

/* Obtener parametro del tamaño por el tipo de nombre */
const obtenerTamanioPornombre = (nombre) => {
  const promise = axios.get('/api/parametros/consultaTamanio/' + nombre);
  const dataPromise = promise.then((response) => response);

  return dataPromise;
};

const editarDatosFinanciamientoCredito = (param) => {
  let promise = axios.post(`/api/proyectoFuente/crearInfoCredito`, param);
  const dataPromise = promise.then((response) => response.data);
  return dataPromise;
};
/* Obtener parametro del tipo de objeto */
const obtenerTipoParametrosPornombre = (nombre) => {
  const promise = axios.get('/api/parametros/consultaTipos/' + nombre);
  const dataPromise = promise.then((response) => response);

  return dataPromise;
};

/* Obtener años y montos de proyecto */
const obtenerAnioMontoProyectoId = (codigoProyecto) => {
  const promise = axios.get('/api/proformapai/consultarAniosProyecto/' + codigoProyecto);
  const dataPromise = promise.then((response) => response);

  return dataPromise;
};

/* Obtener Fuentes de financiamietno de proyecto */
const obtenerFuentesFinanciamientoPai = (codigoProyecto, anio) => {
  const promise = axios.get(
    '/api/proformapai/consultarFuenteFinanciamientoPai?codigoProyecto=' + codigoProyecto + '&anio=' + anio,
  );
  const dataPromise = promise.then((response) => response);

  return dataPromise;
};

/* Obtener Fuentes de financiamietno de proyecto */
const obtenerGrupoGastoPai = (codigoProyecto, anio) => {
  const promise = axios.get(
    '/api/proformapai/consultarGrupoGastoPai?codigoProyecto=' + codigoProyecto + '&anio=' + anio,
  );
  const dataPromise = promise.then((response) => response);

  return dataPromise;
};

/* envia peticion POST de manera parametrizada */
const enviarPostUniversal = (direccion, param) => {
  console.log('direccion', direccion);
  console.log('param', param);
  axios({
    method: 'post',
    url: direccion,
    data: param,
  }).then((response) => {
    return response;
  });
};

/* Obtener Fuentes de financiamietno de proyecto */
const obtenerProformasPai = (periodo) => {
  let promise = '';
  console.log('periodo', periodo);
  if (periodo === undefined) {
    promise = axios.get('/api/proformapai/consultarProformaPai');
  } else {
    promise = axios.get('/api/proformapai/consultarProformaPai?periodo=' + periodo);
  }
  const dataPromise = promise.then((response) => response);

  return dataPromise;
};

//Formulario Inversion Arrastre
export {
  enviarDatosFormularioObras,
  enviarDatosFormularioProyectoCur,
  useObtenerArrastreProyectoFormularioTipoCatalogo,
  obtenerArrastreProyectos,
  obtenerArrastreContratos,
  useObtenerArrastreContratos,
  useObtenerArrastreObrasListado,
  obtenerArrastreObrasFormulario,
  useObtenerArrastreListadoCur,
  useObtenerArrastreProyectos,
  obtenerArrastreObrasCup,
  obtenerArrastreContratoObras,
  obtenerUnidadEjecutoraIdProyecto,
};
/* Cargas de datos segun id Proyecto */
export {
  useCargarIndicadoresProyecto,
  useCargarEstudioTecnico,
  obtenerProyectoPorId,
  cargarDatosGenerales,
  obtenerMarcoLogico,
  obtenerAlineacionPndPorId,
  obtenerAnioMontoProyectoId,
  obtenerFuentesFinanciamientoPai,
  obtenerGrupoGastoPai,
  obtenerProformasPai,
};
/*Visualizacion de Proyectos*/
export { useConsultaSolicitudProyecto, useConsultaNotificacionesAnalisis, useDescargaArchivo };
export {
  editarDatosFinanciamiento,
  useObtenerFinanciamientoCampos,
  obtenerFinanciamientoDatos,
  useObtenerFinanciamientoTotalPorFila,
  useObtenerTotalFuentesFinanciamientoPorCampo,
  useActualizarCoordenada,
  useBorrarCoordenadaProyecto,
  useObtenerLineamientosInversion,
  useObtenerTiposInversion,
  useObtenerSectores,
  useObtenerSubSectores,
  useObtenerModelosGestion,
  useObtenerCoberturas,
  useObtenerAdquisiciones,
  useObtenerTodoProyectos,
  useObtenerProductos,
  useObtenerTiposProyecto,
  useEnviarDatosDeTipoProyecto,
  descargaInformesDictamen,
  useObtenerNotificaciones,
  useIngresarSolicitud,
  useObtenerTipoSolicitud,
  useObtenerCatalogoJerarquia,
  useObtenerCatalogoPadre,
  useObtenerArrastreProyectoFormularioItemPresupuestario,
};
export {
  useConsultaProvinciasCodigoProyecto,
  consultarProyectoUbicacion,
  useEnviarDatosDeBusqueda,
  UseEnviarDatosIndicadores,
  useEnviarDatosMarcoLogico,
  useObtenerCatalogoGrupoGasto,
  useEnviarUsuario,
  useGuardarUbicacionesGeograficasSeleccionadas,
  useInsertarCoordenada,
  useObtenerCatalogoGAP,
  useObtenerEntidades,
  useObtenerMarcoLogico,
  useObtenerNombresUnidadesEjecutoras,
  useObtenerProyectoVisualizacion,
  useObtenerTodosProyectos,
  enviarProyecto,
  useObtenerProyectoJerarquizar,
  descargaArchivoDeshabilitante,
  obtenerConsultarFichas,
  obtenerFinanCredito,
  useObtenerFinanCreditoNombres,
  consultarFuenteFinanciamiento,
  consultarGrupoGasto,
  useObtenerCatalogoTipoContrato,
  useObtenerCatalogoCategoriaContrato,
  obtenerSolicitudProyectoTipo,
  obtnerComponentesProyecto,
  obtenerAniosProyecto,
  obtenerDetalleModificacionPresupuestaria,
  obtenerModificacionesPresupuestariasPorId,
  obtenerMontosPriorizados,
  obtenerProgramacionEjecucion,
  obtenerRegistroCertificacionPlurianual,
  obtnerAnalisisModificaciones,
  obtenerCertificacionPlurianual,
  obtenerDetalleFinanciamiento,
  obtenerRegistroDetalleCoejecucion,
  descargaArchivosHabilitantes,
  useObtenerCreditoAutocomplete,
  useObtenerAval,
  getCatalogo,
};
//parametros
export { obtenerTamanioPornombre, obtenerTipoParametrosPornombre, enviarPostUniversal };
