import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { createContext, useRef, useState } from 'react';

import axios from '@lib/axios';
import {
  UseEnviarDatosIndicadores,
  enviarDatosFormularioObras,
  enviarDatosFormularioProyectoCur,
  useObtenerNotificaciones,
} from '@services/proyectos';

const FormCreacionContext = createContext({
  rolId: 0,
});
/** Proveedor de formulario de Creación */
function FormCreacionProvider(props) {
  const router = useRouter();
  /*VARIABLES LOGIN*/
  const [datosDocumentosDescarga, setDatosDocumentosDescarga] = useState(null);
  const [ci, setCi] = useState('');
  const [ruc, setRuc] = useState('');
  const [password, setPassword] = useState('');
  const [rolId, setRolId] = useState(0); //0 Usuario Externo, 1. Analista de Inversión','2. Director de Planificación e Inversión' ,'3. Subsecretario de Planificación' ,'4. Subsecretario General','5. Secretario General'
  const [usuarioId, setUsuarioId] = useState(rolId); //0 Usuario Externo 1 Analista,
  const [entidadLogeada, setEntidadLogeada] = useState('Nombre de la entidad que inicia session');
  const [codigoEntidadEntreRector, setCodigoEntidadEntreRector] = useState(3093);
  const [editarObras, setEditarObras] = useState(false);
  const [unidadesEjecutoras, setUnidadesEjecutoras] = useState([]);
  const [banderaDatosGenerales, setBanderaDatosGenerales] = useState(false);
  const [editable, setEditable] = useState(true);
  const [editableCur1, setEditableCur1] = useState(true);
  const [editableCur2, setEditableCur2] = useState(true);
  const [editablePlanificacion2, setEditablePlanificacion2] = useState(true);
  const [sumTotal, setSumTotal] = useState(null);
  const [codigoGabinete, setCodigoGabinete] = useState(null);
  const [presupuestoComponente, setPresupuestoComponente] = useState(0);
  const [datosTablaAval, setDatosTablaAval] = useState();
  const [sectorSeleccionado1, setSectorSeleccionado1] = useState(null);
  const [codigoSector, setCodigoSector] = useState(null);
  const [valueSector, setValueSector] = useState(null);
  const [valueCanton, setValueCanton] = useState(null);
  const [cantonSeleccionado1, setCantonSeleccionado1] = useState(null);
  const [codigoCanton, setCodigoCanton] = useState(null);

  const [valueParroquia, setValueParroquia] = useState(null);
  const [parroquiaSeleccionado1, setParroquiaSeleccionado1] = useState(null);
  const [codigoParroquia, setCodigoParroquia] = useState(null);

  const [valueProvincia, setValueProvincia] = useState(null);
  const [provinciaSeleccionado1, setProvinciaSeleccionado1] = useState(null);
  const [codigoProvincia, setCodigoProvincia] = useState(null);
  //ESTUDIOS TECNICOS TIPO
  const [tablaFinan, setTablaFinan] = useState([]);
  const [tablaNueva, setTablaNueva] = useState([]);
  const [creditoTabla, setCreditoTabla] = useState([]);
  const [creditoTablaNombre, setCreditoTablaNombre] = useState(null);

  const [fuentes, setFuentes] = useState(null);
  const [fuentesSeleccionado, setFuentesSeleccionado] = useState(null);
  const [codigoFuente, setCodigoFuente] = useState(null);

  const [correlativo, setCorrelativo] = useState(null);
  const [correlativoSeleccionado, setCorrelativoSeleccionado] = useState(null);
  const [codigoCorrelativo, setCodigoCorrelativo] = useState(null);
  const [sumaCredito1, setSumaCredito1] = useState(null);

  /* DATOS GENERALES */
  const [codigoProyecto, setCodigoProyecto] = useState(''); //382882
  const [habilitarMarcoLogico, setHabilitarMarcoLogico] = useState(false);
  const [habilitarUbicacionGeografica, setHabilitarUbicacionGeografica] = useState(false);
  const [habilitarIndicadores, setHabilitarIndicadores] = useState(false);
  const [habilitarAlineacionPND, setHabilitarAlineacionPND] = useState(false);
  const [habilitarEstudiosTecnicos, setHabilitarEstudiosTecnicos] = useState(false);
  const [habilitarFinanciamiento, setHabilitarFinanciamiento] = useState(false);
  const [proyectoCreado, setProyectoCreado] = useState('');
  const [arregloAval, setArregloAval] = useState([]);
  /* Antecedentes de proyecto */
  const [fechaInicio, setFechaInicio] = useState(new Date()); // Fecha de registro inicial
  const [fechaUltmodificacion, setFechaUltmodificacion] = useState(new Date()); // Fecha de registro final
  const [codigoUsuarioUltimaMod, setCodigoUsuarioUltimaMod] = useState(
    'Funcionalidad con dependencia al módulo de Inicio de Sesión',
  );
  const [responsable, setResponsable] = useState('');
  const [cargoResponsable, setCargoResponsable] = useState('');
  const [emailResponsable, setEmailResponsable] = useState('');
  const [emailAdicionalResponsable, setEmailAdicionalResponsable] = useState('');
  const [telefonoResponsable, setTelefonoResponsable] = useState('');
  const [telefonoExtension, setTelefonoExtension] = useState(''); // Telefono de extension
  const [avalSeleccionado, setAvalSeleccionado] = useState(null);

  /* Datos iniciales de proyecto */

  const [codigoUnidadEjecutora, setCodigoUnidadEjecutora] = useState(null);
  const [montoTotalEntidades, setMontoTotalEntidades] = useState(0);
  const [codigoCatModeloGestion, setcodigoCatModeloGestion] = useState(0); // Modelo de Gestión
  const [modelosGestionSeleccionado, setModelosGestionSeleccionado] = useState(null);

  const [codigoCobertura, setCodigoCobertura] = useState(0); //Cobertura
  const [codigoCoberturaSeleccionado, setCodigoCoberturaSeleccionado] = useState(null);

  const [codigoEntidad, setCodigoEntidad] = useState(0);
  const [mostrarUnidadEjecutoraDatosIniciales, setMostrarUnidadEjecutoraDatosIniciales] = useState(true);

  const [tipoInversion, setTipoInversion] = useState(0); // Tipo de Inversión
  const [tipoInversionSeleccionado, setTipoInversionSeleccionado] = useState(null);

  const [sector, setSector] = useState(0); // Sector
  const [sectorSeleccionado, setSectorSeleccionado] = useState(null);

  const [objetivoInversion, setObjetivoInversion] = useState(0); // Lienamiento Inversión
  const [objetivoInversionSeleccionado, setObjetivoInversionSeleccionado] = useState(null);

  const [subSector, setSubSector] = useState(0); // SubSector
  const [subSectorSeleccionado, setSubSectorSeleccionado] = useState(null);
  const [entidadesSeleccionado, setEntidadesSeleccionado] = useState(null);

  const [proyectoAvalinp, setProyectoAvalinp] = useState(false);
  const [proyectoAvalsenacyt, setProyectoAvalsenacyt] = useState(false);
  const [proyectoCooperacionbi, setProyectoCooperacionbi] = useState(false);
  const [proyectoEmblematico, setProyectoEmblematico] = useState(false);
  const [reqFichaAmbiental, setReqFichaAmbiental] = useState(false);
  const [infraestructura, setinfraestructura] = useState(false);
  const [proyectoEntidadParticipanteDtos, setProyectoEntidadParticipanteDtos] = useState([]);

  const [codigoTabla, setCodigoTabla] = useState([]);

  /* Estado de proyecto */
  const [codigoEstadoSituacionActual, setCodigoEstadoSituacionActual] = useState(
    'REGISTRO - Funcionalidad con dependencia al módulo de Actualización',
  );
  const [codigoCatEtapa, setCodigoCatEtapa] = useState(
    'INVERSION - Funcionalidad con dependencia al módulo de Actualización',
  );
  const [codigoCatFase, setCodigoCatFase] = useState('PENDIENTE SNP - Funcionalidad');
  const [nemonicoProyecto, setNemonicoProyecto] = useState(
    'CODIGO - Funcionalidad con dependencia al módulo de Inicio de Sesión',
  );

  /* Adquisicion de proyecto */
  const [codigoCatConsumo, setCodigoCatConsumo] = useState(0);
  const [consumonacional, setConsumoNacional] = useState(0);
  const [consumoDetalleNacional, setConsumoDetalleNacional] = useState('');
  const [transferenciaTecnologica, setTransferenciaTecnologica] = useState('');
  const [consumoimportado, setConsumoImportado] = useState(0);
  const [consumoDetalleImportado, setConsumoDetalleImportado] = useState('');
  const [entidades, setEntidades] = useState([]);
  const [aquisicionesSeleccionado, setAquisicionesSeleccionado] = useState(null);

  /* Entregables de proyecto */
  const [codigoCatProducto, setCodigoCatProducto] = useState(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  /* Obras de proyecto */
  const [obraActivo, setObraActivo] = useState(null);
  const [obraCanton, setObraCanton] = useState(null);
  const [obraCodigoReferencialInstitucional, setObraCodigoReferencialInstitucional] = useState(null);
  const [obraEntidadCoejecutora, setObraEntidadCoejecutora] = useState(null);
  const [obraEstadoActualObra, setObraEstadoActualObra] = useState(null);
  const [obraFechaInicio, setObraFechaInicio] = useState(null);
  const [obraFechaFin, setObraFechaFin] = useState(null);
  const [obraMontoEjecutar, setObraMontoEjecutar] = useState(null);
  const [obraNombreObra, setObraNombreObra] = useState(null);
  const [obraParroquia, setObraParroquia] = useState(null);
  const [obraProvincia, setObraProvincia] = useState(null);
  const [obraTipoObra, setObraTipoObra] = useState(null);
  const [obraTotalDevengado, setObraTotalDevengado] = useState(0);
  const [obraTotalPorDevengar, setObraTotalPorDevengar] = useState(0);
  const [obraeditableDevengar, setObraeditableDevengar] = useState(false);
  const [obraMontoTotal, setObraMontoTotal] = useState(0);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);
  const [totalDevengado, setTotalDevengado] = useState(0);
  const [totalPorDevengar, setTotalPorDevengar] = useState(0);
  const [montoTotal, setMontoTotal] = useState(0);
  const [idObra, setIdObra] = useState(null);
  const [param2, setParam2] = useState(0);

  /*Formulario Obras*/
  let obrasFormulario = {};

  const formularioObras = useFormik({
    initialValues: {
      obraTotalDevengado: obraTotalDevengado,
      obraTotalPorDevengar: obraTotalPorDevengar,
      obraMontoTotal: obraMontoTotal,
    },
    validate: (data) => {
      let errors = {};
      // Antecedentes de proyecto
      //if (!data.obraTotalDevengado) {
      //errors.obraTotalDevengado = '* Campo obligatorio';
      //}

      //if (!data.obraTotalPorDevengar) {
      //errors.obraTotalPorDevengar = '* Campo obligatorio';
      //}
      //if (!data.obraMontoTotal) {
      //  errors.obraMontoTotal = '* Campo obligatorio';
      // }

      return errors;
    },
    onSubmit: (data) => {
      obrasFormulario = {
        activo: true,
        codigoReferenciaInstitucional: param2.codigoReferenciaInstitucional,
        fechaFin: param2.fechaFin,
        fechaInicio: param2.fechaInicio,
        id: param2.id,
        idCanton: param2.idCanton,
        idEntidadCoejecutora: param2.idEntidadCoejecutora,
        idEstadoActualObra: param2.idEstadoActualObra,
        ' idParroquia': param2.idParroquia,
        idProvincia: param2.idProvincia,
        idProyecto: param2.idProyecto,
        idTipoObra: param2.idTipoObra,
        montoEjecutar: param2.montoEjecutar,
        montoTotal: data.obraMontoTotal,
        nombreObra: param2.nombreObra,
        totalDevengado: data.obraTotalDevengado ?? 0,
        totalPorDevengar: data.obraTotalPorDevengar ?? 0,
      };

      enviarDatosFormularioObras(obrasFormulario);
      toast.current.show({
        severity: 'success',
        summary: 'Pestaña Guardada!',
        detail: 'La información se guardó exitosamente!',
      });
    },
    onReset: (data) => {
      setObraTotalPorDevengar(0);
      setObraeditableDevengar(0);
      setObraMontoTotal(0);
    },
  });
  const obtenerMensajeErrorObras = (campo) => {
    return validadorCampoObras(campo) && <small className="p-error">{formularioObras.errors[campo]}</small>;
  };
  const validadorCampoObras = (validacion) =>
    !!(formularioObras.touched[validacion] && formularioObras.errors[validacion]);

  const [entidadParticipante, setEntidadParticipante] = useState(false);
  const [gerenteGerencia, setGerenteGerencia] = useState(false);

  /* Formulario Datos Generales */
  let datosGeneralesFormulario = {};

  const formularioDatosGenerales = useFormik({
    initialValues: {
      /* Antecedentes de proyecto */
      fechaInicio: fechaInicio.toISOString(),
      fechaUltmodificacion: fechaUltmodificacion.toISOString(),
      codigoUsuarioUltimaMod: codigoUsuarioUltimaMod, //Funcionalidad con dependencia al módulo de Actualización e Inicio de Sesión
      cargoResponsable: cargoResponsable,
      responsable: responsable,
      emailResponsable: emailResponsable,
      emailAdicionalResponsable: emailAdicionalResponsable,
      telefonoResponsable: telefonoResponsable,
      telefonoExtension: telefonoExtension,
      esNombreUnico: false,
      /* Datos iniciales de proyecto */
      nombreProyecto: '',
      tipoEstudio: '',
      codigoUnidadEjecutora: codigoUnidadEjecutora, //Funcionalidad con dependencia modulo de inicio de sesion
      codigoCatModeloGestion: codigoCatModeloGestion,
      codigoCatCobertura: codigoCobertura,
      codigoEntidad: 1, //Funcionalidad con dependencia modulo de inicio de sesion
      codigoCatTipoInversion: tipoInversion,
      codigoCatSector: sector,
      montoTotal: presupuestoComponente, // Monto Total de inversión
      codigoCatLineamientoInversion: objetivoInversion, // Lienamiento Inversión
      codigoCatSubsector: subSector,
      proyectoAvalinp: proyectoAvalinp,
      proyectoAvalsenacyt: proyectoAvalsenacyt,
      proyectoCooperacionbi: proyectoCooperacionbi,
      proyectoEmblematico: proyectoEmblematico,
      reqFichaAmbiental: reqFichaAmbiental,
      obra: infraestructura,
      proyectoEntidadParticipanteDtos: proyectoEntidadParticipanteDtos,
      codigoEntidadEntreRector: 3093, //modulo de autenticacion
      entidadParticipante: entidadParticipante,
      gerenteGerencia: gerenteGerencia,
      proyectoCooperacionBinacional: proyectoCooperacionbi,
      tipoFaseInversion: 'Estudio',
      /* Estado de proyecto */
      // CUP EL BACK DEVUELVE EL CODIGO
      codigoCatEstadoSituacionActual: 1, // REGISTRO - Funcionalidad con dependencia al módulo de Actualización
      codigoCatEtapa: 0, //INVERSION - Funcionalidad con dependencia al módulo de Actualización
      codigoCatFase: 0, //PENDIENTE SNP - Funcionalidad

      /* Adquisicion de proyecto */
      codigoCatConsumo: codigoCatConsumo, // Adquisición de proyecto
      consumoNacional: consumonacional,
      consumoDetalleNacional: '',
      consumoImportado: consumoimportado,
      consumoDetalleImportado: consumoDetalleImportado,
      transferenciaTecnologica: transferenciaTecnologica,

      // Entregables de proyecto
      codigoCatProducto: codigoCatProducto, // Producto
      productoDetalle: '',
    },
    validate: (data) => {
      let errors = {};
      // Antecedentes de proyecto
      if (!data.responsable) {
        errors.responsable = '* Campo obligatorio';
      }
      // if (!data.esNombreUnico) {
      //   errors.esNombreUnico = `El nombre del proyecto ${data.nombreProyecto} ya existe`;
      // }
      if (!data.cargoResponsable) {
        errors.cargoResponsable = '* Campo obligatorio';
      } else if (data.cargoResponsable.length > 255) {
        errors.cargoResponsable = 'No se permite más de 255 caracteres!';
      }
      if (!data.emailResponsable) {
        errors.emailResponsable = '* Campo obligatorio';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.emailResponsable)) {
        errors.emailResponsable = 'Correo electrónico inválido Ej.: ejemplo@email.com';
      }

      if (!data.telefonoResponsable) {
        errors.telefonoResponsable = '* Campo obligatorio Ej. 091 234 5678';
      }

      // Datos iniciales de proyecto
      if (!data.nombreProyecto) {
        errors.nombreProyecto = '* Campo obligatorio';
      }
      if (!data.tipoEstudio) {
        errors.tipoEstudio = '* Campo obligatorio';
      }

      // Adquisicion de proyecto
      if (consumonacional !== 0) {
        if (!data.consumoDetalleNacional) {
          errors.consumoDetalleNacional = '* Campo obligatorio';
        }
      }

      if (!data.transferenciaTecnologica) {
        errors.transferenciaTecnologica = '* Campo obligatorio';
      }
      if (consumoimportado !== 0) {
        if (!data.consumoDetalleImportado) {
          errors.consumoDetalleImportado = '* Campo obligatorio';
        }
      }

      // Entregables de proyecto
      if (!data.productoDetalle) {
        errors.productoDetalle = '* Campo obligatorio';
      }

      if (aquisicionesSeleccionado === null) {
        errors.codigoCatConsumo = '* Campo obligatorio';
      }
      if (!codigoGabinete) {
        errors.codigoGabinete = '* Campo obligatorio';
      }

      if (!codigoCatModeloGestion) {
        errors.codigoCatModeloGestion = '* Campo obligatorio';
      }
      if (!codigoCobertura) {
        errors.codigoCobertura = '* Campo obligatorio';
      }

      if (!tipoInversion) {
        errors.tipoInversion = '* Campo obligatorio';
      }

      if (!sector) {
        errors.sector = '* Campo obligatorio';
      }
      if (!subSector) {
        errors.subSector = '* Campo obligatorio';
      }
      if (!objetivoInversion) {
        errors.objetivoInversion = '* Campo obligatorio';
      }

      return errors;
    },
    onSubmit: (data) => {
      /*
      toast.current.show({
        severity: 'info',
        summary: 'Pestaña Guardada!',
        detail: 'La información ya se guardo!',
      });

      console.log("onsubmit formcreacion context");
      */

      if (codigoProyecto === '') {
        datosGeneralesFormulario = {
          proyecto: {
            cargoResponsable: data.cargoResponsable,
            codigoCatConsumo: codigoCatConsumo,
            codigoCatEtapa: 0, //INVERSION - Funcionalidad con dependencia al módulo de Actualización
            codigoCatFase: 0, //PENDIENTE SNP - Funcionalidad
            codigoCatModeloGestion: codigoCatModeloGestion,
            codigoCatProducto: codigoCatProducto,
            codigoCatCobertura: codigoCobertura,
            codigoEntidad: codigoUnidadEjecutora.codigoEntidad, //Funcionalidad con dependencia modulo de inicio de sesion
            codigoCatEstadoSituacionActual: 1, // REGISTRO - Funcionalidad con dependencia al módulo de Actualización
            codigoUnidadEjecutora: codigoUnidadEjecutora.codigoEntidad, //Funcionalidad con dependencia modulo de inicio de sesion
            codigoUsuarioUltimaMod: 0, //Funcionalidad con dependencia al módulo de Actualización e Inicio de Sesión
            consumoDetalleImportado: data.consumoDetalleImportado,
            consumoDetalleNacional: data.consumoDetalleNacional,
            consumoImportado: consumoimportado,
            consumoNacional: consumonacional,
            emailResponsable: data.emailResponsable,
            emailAdicionalResponsable: data.emailAdicionalResponsable,
            fechaInicio: data.fechaInicio,
            fechaUltmodificacion: data.fechaUltmodificacion,
            obra: infraestructura,
            montoTotal: data.montoTotal,
            nombreProyecto: data.nombreProyecto,
            codigoCatLineamientoInversion: objetivoInversion,
            productoDetalle: data.productoDetalle,
            proyectoAvalinp: proyectoAvalinp,
            proyectoAvalsenacyt: proyectoAvalsenacyt,
            proyectoCooperacionbi: proyectoCooperacionbi,
            proyectoEmblematico: proyectoEmblematico,
            reqFichaAmbiental: reqFichaAmbiental,
            responsable: data.responsable,
            codigoCatSector: sector,
            codigoCatSubsector: subSector,
            telefonoExtension: data.telefonoExtension,
            telefonoResponsable: data.telefonoResponsable,
            tipoEstudio: data.tipoEstudio,
            codigoCatTipoInversion: tipoInversion,
            transferenciaTecnologica: data.transferenciaTecnologica,
            codigoCatGabinete: codigoGabinete?.idCatalogo,
            codigoEntidadEntreRector: 3093, //quemado por el modulo de autenticacion va con entidad
            entidadParticipante: entidadParticipante, //
            gerenteGerencia: gerenteGerencia, //
            proyectoCooperacionBinacional: proyectoCooperacionbi,
            tipoFaseInversion: data.tipoEstudio,
          },

          proyectoAvalDtos: arregloAval === undefined ? [] : arregloAval,
          proyectoEntidadParticipanteDtos: proyectoEntidadParticipanteDtos,
        };

        console.log('onsubmit formcreacion context', datosGeneralesFormulario);

        enviarProyecto(datosGeneralesFormulario);
        /*.then((response) => {
          if (response.data.status === 200 || response.data.status === 201) {
            toast.current.show({
              severity: 'success',
              summary: 'Pestaña Guardada!',
              detail: 'La información se guardó exitosamente!',
              life: 3000,
            });
          } else {
            toast.current.show({
              severity: 'error',
              summary: 'Error!',
              detail: 'Error al guardar la información!',
              life: 3000,
            });
          }
          
        });*/
      } else {
        toast.current.show({
          severity: 'info',
          summary: 'Pestaña Guardada!',
          detail: 'La información ya se guardo!',
        });
      }
    },
    onReset: (data) => {
      setFechaInicio(new Date());
      setFechaUltmodificacion(new Date());
      setModelosGestionSeleccionado(null);
      setCodigoCoberturaSeleccionado(null);
      setTipoInversionSeleccionado(null);
      setSectorSeleccionado(null);
      setObjetivoInversionSeleccionado(null);
      setSubSectorSeleccionado(null);
      setProyectoAvalinp(false);
      setProyectoAvalsenacyt(false);
      setProyectoCooperacionbi(false);
      setProyectoEmblematico(false);
      setReqFichaAmbiental(false);
      setinfraestructura(false);
      setGerenteGerencia(false);
      setEntidadParticipante(false);
      setProyectoEntidadParticipanteDtos([]);
      setAquisicionesSeleccionado(null);
      setProductoSeleccionado(null);
    },
  });
  const obtenerMensajeErrorFormulario = (campo) => {
    return (
      validadorCampoFormulario(campo) && <small className="p-error">{formularioDatosGenerales.errors[campo]}</small>
    );
  };
  const validadorCampoFormulario = (validacion) =>
    !!(formularioDatosGenerales.touched[validacion] && formularioDatosGenerales.errors[validacion]);

  const enviarProyecto = (proyecto) => {
    axios.post(`/api/proyecto`, proyecto).then((response) => {
      let respuesta = response.data;
      if (respuesta !== undefined) {
        setProyectoCreado(response.data);
        setCodigoProyecto(respuesta.id);
        setBanderaDatosGenerales(true);
        setCup(respuesta.nemonicoProyecto);
      }
      console.log('response', response, response.data.status);
      if (response.status === 200 || response.status === 201) {
        toast.current.show({
          severity: 'success',
          summary: 'Pestaña Guardada!',
          detail: 'La información se guardó exitosamente!',
          life: 3000,
        });
      } else {
        toast.current.show({
          severity: 'error',
          summary: 'Error!',
          detail: 'Error al guardar la información!',
          life: 3000,
        });
      }

      return response;
    });
  };

  /* ALINEACION PLAN DESARROLLO CONSUMONACIONAL */

  const [listaRedProyectos, setListaRedProyectos] = useState([]);
  const [listaRed, setListaRed] = useState([]);
  const [tipoProyectoSeleccionado, setTipoProyectoSeleccionado] = useState(null);
  const [tipoProyecto, setTipoProyecto] = useState([]);

  const dt = useRef(null);
  /* FINANCIAMIENTO */
  //Fuentes Financiamiento Campos
  const [columna, setColumna] = useState([]);

  //Fuentes Financiamiento Datos y Totales por fila
  const [recursos, setRecursos] = useState([]);

  //Totales por campos de Fuentes de Financiamiento
  const [totalFuentesFinanciamiento, setTotalFuentesFinanciamiento] = useState([]);

  const [totalFuentesFinanciamientoPorFila, setTotalFuentesFinanciamientoPorFila] = useState([]);

  const botonAgregar = (data) => {
    return (
      <Button
        disabled={!editable}
        className="justify-content-center p-button-rounded p-button-success h-2rem mx-2"
        onClick={() => opcionAgregar(data)}
      >
        <i className="pi pi-plus" />
      </Button>
    );
  };

  const opcionAgregar = (data) => {
    if (tipoProyecto.length === 0) {
      toast.current.show({
        severity: 'info',
        summary: 'Atención!',
        detail: 'Seleccione un tipo de proyecto!',
        life: 3000,
      });
    } else {
      const nuevosRegistros = [...listaRed];
      let cont = 0;
      for (var i = 0; i < listaRed.length; i++) {
        if (listaRed[i].data.nombreProyecto === data.nombreProyecto) {
          cont++;
        }
      }
      if (cont === 0) {
        nuevosRegistros.push({
          completed: false,
          data,
          tipoProyecto,
        });
        setListaRed(nuevosRegistros);
      } else if (cont !== 0) {
        toast.current.show({
          severity: 'info',
          summary: 'Atención!',
          detail: 'No se puede agregar un proyecto más de una vez',
          life: 3000,
        });
      }
    }
  };

  const botonEliminar = (data) => {
    return (
      <Button
        disabled={!editable}
        className="justify-content-center p-button-rounded p-button-danger h-2rem mx-2"
        onClick={() => opcionEliminar(data)}
      >
        <i className="pi pi-trash" />
      </Button>
    );
  };

  const opcionEliminar = (data) => {
    const nuevosRegistros = [...listaRed];
    nuevosRegistros.splice(nuevosRegistros.indexOf(data), 1);
    setListaRed(nuevosRegistros);
  };

  /* MARCO LÓGICO */

  const [index, setIndex] = useState(0);
  const [fuentesFinanciamientoArray, setFuentesFinanciamientoArray] = useState([]);
  const [unidadMedida, setUnidadMedida] = useState([]);
  const [codigoCatalogoPadre, setCodigoCatalogoPadre] = useState(null);
  const [fuenteFinanciamientoSeleccionado, setFuenteFinanciamientoSeleccionado] = useState(null);
  const [itemPresupuestarioSeleccionado, setItemPresupuestarioSeleccionado] = useState('');
  const [gruposGasto, setGruposGasto] = useState([]);
  const [itemPresupuestario, setItemPresupuestario] = useState([]);
  const [fuentesFinanciamiento, setFuentesFinanciamiento] = useState([]);
  const [proyecto, setProyecto] = useState();
  const [archivoArbolProblema, setArbolProblema] = useState();
  const [archivoProyecto, setArchivoProyecto] = useState();
  const [anioInicial, setAnioInicial] = useState();
  const [finIndicadoresArray, setFinIndicadoresArray] = useState([]);
  const [finMediosVerificacionArray, setFinMediosVerificacionArray] = useState([]);
  const [finSupuestosArray, setFinSupuestosArray] = useState([]);
  const [visible, setVisible] = useState(false);

  const [propositoIndicadoresArray, setPropositoIndicadoresArray] = useState(null);
  const [propositoMediosVerificacionArray, setPropositoMediosVerificacionArray] = useState('');
  const [propositoSupuestosArray, setPropositoSupuestosArray] = useState('');

  const [componenteMediosVerificacionArray, setComponenteMediosVerificacionArray] = useState([]);
  const [componenteSupuestosArray, setComponenteSupuestosArray] = useState('');
  const [actividades, setActividades] = useState([]);
  const [actividadesMediosVerificacionArray, setActividadesMediosVerificacionArray] = useState([]);
  const [actividadesSupuestosArray, setActividadesSupuestosArray] = useState([]);

  const [indicadorSeleccionado, setIndicadorSeleccionado] = useState(null);
  const [componenteIndicadores, setComponenteIndicadores] = useState('');
  const [componenteMediosVerificacion, setComponenteMediosVerificacion] = useState('');
  const [componenteSupuestos, setComponenteSupuestos] = useState('');

  const [actividadIndicadores, setActividadIndicadores] = useState([]);
  const [actividadMediosVerificacion, setActividadMediosVerificacion] = useState('');
  const [actividadSupuestos, setActividadSupuestos] = useState('');

  const [componenteSeleccionado, setComponenteSeleccionado] = useState(null);

  const [actividadSeleccionada, setActividadSeleccionada] = useState(null);
  const [presupuestoActividad, setPresupuestoActividad] = useState(null);
  const [detalleActividad, setDetalleActividad] = useState('');
  const [componentes, setComponentes] = useState([]);
  const [fuenteFinanciamientoExterno, setFuenteFinanciamientoExterno] = useState([]);
  const [fuenteFinanciamientoExternoSeleccionado, setFuenteFinanciamientoExternoSeleccionado] = useState(null);
  const [marcoLogico, setMarcoLogico] = useState({});

  const [parametros, setParametros] = useState({
    causas: [
      {
        causa: '',
        efectos: [
          {
            efecto: '',
          },
        ],
      },
    ],
    componentes: [
      {
        actividades: [
          {
            actividad: '',
            actividadDetalle: '',
            actividadMedio: [],
            actividadSupuesto: [],
            fuenteFinanciamiento: {
              detalle: [],
            },
          },
        ],
        componente: '',
        componenteDetalle: '',
        componenteMedio: [],
        componenteSupuesto: [],
      },
    ],
    fin: '',
    finDetalle: '',
    finIndicador: [],
    finMedio: [],
    finSupuesto: [],
    objetivoGeneral: '',
    objetivos: [
      {
        objetivo: '',
      },
    ],
    problemaCentral: '',
    proposito: '',
    propositoDetalle: '',
    propositoIndicador: [],
    propositoMedio: [],
    propositoSupuesto: [],
  });

  const [detalleProposito, setDetalleProposito] = useState('');

  /* Objetivos */
  const [objEspecifico, setObjEspecifico] = useState('');

  /* Matriz */
  //Variables Fila FIN
  const [finIndicadores, setFinIndicadores] = useState('');
  const [finMediosVerificacion, setFinMediosVerificacion] = useState('');
  const [finSupuestos, setFinSupuestos] = useState('');

  //Variables Fila PROPOSITO
  const [propositoResumen, setPropositoResumen] = useState('');
  const [propositoIndicadores, setPropositoIndicadores] = useState('');
  const [propositoMediosVerificacion, setPropositoMediosVerificacion] = useState('');
  const [propositoSupuestos, setPropositoSupuestos] = useState('');

  //Variables COMPONENTES
  const [actividadesMediosVerificacion, setActividadesMediosVerificacion] = useState(null);
  const [columnas, setColumnas] = useState([]);

  /* INDICADORES */

  let indicadoresFormulario = {};
  const [gruposPrioritarios, setGruposPrioritarios] = useState([]);
  const [grupo, setGrupo] = useState(null);
  const [tasaDescuentoFin, setTasaDescuentoFin] = useState(0.12);
  const [valorActualNetoFin, setValorActualNetoFin] = useState(null);
  const [tasaInternaRetornoFin, setTasaInternaRetornoFin] = useState(null);
  const [tasaDescuentoEco, setTasaDescuentoEco] = useState(0.12);
  const [valorActualNetoEco, setValorActualNetoEco] = useState(null);
  const [tasaInternaRetornoEco, setTasaInternaRetornoEco] = useState(null);
  const [relacionBeneficiarioCosto, setRelacion] = useState(null);
  const [pregunta1, setPregunta1] = useState('');
  const [pregunta2, setPregunta2] = useState('');
  const [pregunta3, setPregunta3] = useState('');
  const [benMasculino, setBenMasculino] = useState(null);
  const [benFemenino, setBenFemenino] = useState(null);
  const [benDirectos, setBenDirectos] = useState(null);
  const [benIndirectos, setBenIndirectos] = useState(null);
  const [listaAtencionPrioritaria, setListaAtencionPrioritaria] = useState([]);
  const [priorMasculino, setPriorMasculino] = useState(null);
  const [priorFemenino, setPriorFemenino] = useState(null);
  const [errores, setErrores] = useState(null);
  const [gruposFiltrados, setGruposFiltrados] = useState(null);
  const [tasaCrecimientoInteres, setTasaCrecimientoInteres] = useState(null);
  const [tasaCrecimientoPoblacion, setTasaCrecimientoPoblacion] = useState(null);

  //Jerarquizar
  const [datosProyectosJerarquizar, setDatosProyectosJerarquizar] = useState([]);
  const [proyectosJerarquizarFiltrados, setProyectosJerarquizarFiltrados] = useState('');
  const [proyectoJerarquizar, setProyectoJerarquizar] = useState('');

  //catalogo Jerarquizacion
  const [catalogoJerarquizar, setCatalogoJerarquizar] = useState('');
  const [datosCatalogoJerarquizar, setDatosCatalogoJerarquizar] = useState([]);
  const [catalogosJerarquizarFiltrados, setcatalogosJerarquizarFiltrados] = useState('');

  //SIN FORMIK
  const [ingresoSeleccionado, setIngresoSeleccionado] = useState([]);
  const [ingresos, setIngresos] = useState([]);
  const [gastoCapitalFinancieroSeleccionado, setGastoCapitalFinancieroSeleccionado] = useState([]);
  const [gastosCapitalFinanciero, setGastosCapitalFinanciero] = useState([]);
  const [gastoOperativoFinancieroSeleccionado, setGastoOperativoFinancieroSeleccionado] = useState([]);
  const [gastosOperativosFinanciero, setGastosOperativosFinanciero] = useState([]);
  const [gastoMantenimientoFinancieroSeleccionado, setGastoMantenimientoFinancieroSeleccionado] = useState([]);
  const [gastosMantenimientoFinanciero, setGastosMantenimientoFinanciero] = useState([]);
  const [gastoAdministrativoFinanciero, setGastoAdministrativoFinanciero] = useState([]);
  const [gastoAdministrativoFinancieroSeleccionado, setGastoAdministrativoFinancieroSeleccionado] = useState([]);

  const [beneficios, setBeneficios] = useState([]);
  const [beneficioSeleccionado, setBeneficioSeleccionado] = useState(null);
  const [gastoCapitalEconomicoSeleccionado, setGastoCapitalEconomicoSeleccionado] = useState([]);
  const [gastosCapitalEconomico, setGastosCapitalEconomico] = useState([]);
  const [gastoOperativoEconomicoSeleccionado, setGastoOperativoEconomicoSeleccionado] = useState([]);
  const [gastosOperativosEconomico, setGastosOperativosEconomico] = useState([]);
  const [gastoMantenimientoEconomicoSeleccionado, setGastoMantenimientoEconomicoSeleccionado] = useState([]);
  const [gastosMantenimientoEconomico, setGastosMantenimientoEconomico] = useState([]);
  const [gastoAdministrativoEconomico, setGastoAdministrativoEconomico] = useState([]);
  const [gastoAdministrativoEconomicoSeleccionado, setGastoAdministrativoEconomicoSeleccionado] = useState(null);

  const [flujo, setFlujo] = useState([]);

  const formularioIndicadores = useFormik({
    initialValues: {
      tasaCrecimientoInteres: tasaCrecimientoInteres,
      tasaCrecimientoPoblacion: tasaCrecimientoPoblacion,
      tasaDescuentoEco: tasaDescuentoEco,
      valorActualNetoEco: valorActualNetoEco,
      tasaInternaRetornoEco: tasaInternaRetornoEco,
      pregunta1: pregunta1,
      pregunta2: pregunta2,
      benIndirectos: benIndirectos,
      benMasculino: benMasculino,
      benFemenino: benFemenino,
    },
    validate: (data) => {
      let errors = {};

      if (!data.tasaCrecimientoInteres) {
        errors.tasaCrecimientoInteres = '* Campo obligatorio';
      }

      if (!data.tasaCrecimientoPoblacion) {
        errors.tasaCrecimientoPoblacion = '* Campo obligatorio';
      }

      if (!data.tasaDescuentoEco) {
        errors.tasaDescuentoEco = '* Campo obligatorio';
      }

      if (!data.pregunta1) {
        errors.pregunta1 = '* Campo obligatorio';
      }

      if (!data.pregunta2) {
        errors.pregunta2 = '* Campo obligatorio';
      }

      if (!data.benMasculino) {
        errors.benMasculino = '* Campo obligatorio';
      }

      if (!data.benFemenino) {
        errors.benFemenino = '* Campo obligatorio';
      }

      return errors;
    },
    onSubmit: (data) => {
      indicadoresFormulario = {
        activo: true,
        beneficiarioDirecto: benDirectos,
        beneficiarioHombre: data.benMasculino,
        beneficiarioIndirecto: data.benIndirectos,
        beneficiarioMujere: data.benFemenino,
        beneficioCosto: relacionBeneficiarioCosto,
        coEconomico: 0,
        coFinanciero: 0,
        creadoPor: 'HUGO ESPINOSA MARTÍNEZ',
        fechaCreacion: '2022-08-18T20:29:21.569Z',
        fechaUltimaModificacion: new Date(),
        flujoEconomicoFinancieroList: flujo,
        idProyecto: codigoProyecto,
        metodologia: pregunta3,
        modificadoPor: 'HUGO ESPINOSA MARTÍNEZ',
        perdidaPais: data.pregunta1,
        proyectoGapList: listaAtencionPrioritaria,
        retorno: data.pregunta2,
        tasaInteres: data.tasaCrecimientoInteres,
        tasaPoblacion: data.tasaCrecimientoPoblacion,
        tdEconomico: data.tasaDescuentoEco,
        tdFinanciero: tasaDescuentoFin,
        tirEconomico: data.tasaInternaRetornoEco,
        tirFinanciero: tasaInternaRetornoFin,
        vanEconomico: data.valorActualNetoEco,
        vanFinanciero: valorActualNetoFin,
      };

      UseEnviarDatosIndicadores(indicadoresFormulario);
      toast.current.show({
        severity: 'success',
        summary: 'Guardado',
        detail: 'Se ha guardado correctamente la información',
        life: 3000,
      });
    },
  });

  const getIndicadoresFormError = (campo) => {
    return (
      validadorCampoFormularioIndicadores(campo) && (
        <small className="p-error">{formularioIndicadores.errors[campo]}</small>
      )
    );
  };
  const validadorCampoFormularioIndicadores = (validacion) =>
    !!(formularioIndicadores.touched[validacion] && formularioIndicadores.errors[validacion]);

  /**BUSQUEDA DE PROYECTOS */

  const [consejoSectorialSeleccionado, setConsejoSectorialSeleccionado] = useState(null);
  const [programaSeleccionado, setProgramaSeleccionado] = useState(null);
  const [proyectoCurSeleccionado, setProyectoCurSeleccionado] = useState(null);
  const [obraSeleccionado, setObraSeleccionado] = useState(null);
  const [contratoSeleccionado, setContratoSeleccionado] = useState(null);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState(null);
  const [grupoGastoSeleccionado, setGrupoGastoSeleccionado] = useState(null);
  const [organismoSeleccionado, setOrganismoSeleccionado] = useState(null);
  const [identificacionSeleccionado, setIdentificacionSeleccionado] = useState(null);

  const [contratoListado, setContratoListado] = useState(null);
  const [listadoCur, setListadoCur] = useState(null);
  const [listadoObras, setListadoObras] = useState(null);

  let proyectoCur = {};
  const [proyectoCurNombre, setProyectoCurNombre] = useState(null);
  const [obra, setObra] = useState(null);
  const [contrato, setContrato] = useState(null);
  const [estado, setEstado] = useState(null);
  const [fechaGeneracion, setFechaGeneracion] = useState(null);
  const [grupoGasto, setGrupoGasto] = useState(null);
  const [organismo, setOrganismo] = useState(null);
  const [montoCur, setMontoCur] = useState(0);
  const [tipoIdentificacion, setTipoIdentificacion] = useState(null);
  const [razonSocial, setRazonSocial] = useState(0);
  const [identificacionProveedor, setIdentificacionProveedor] = useState(0);
  const [recursosFiscales, setRecursosFiscales] = useState(0);
  const [asistenciaTecnica, setAsistenciaTecnica] = useState(0);
  const [totalCur, setTotalCur] = useState(0);
  const [anticipos, setAnticipos] = useState(0);
  const [tipoContratoCur, setTipoContratoCur] = useState('');
  const [numeroContratoCur, setNumeroContratoCur] = useState(0);
  const [numeroUnicoContratoCur, setNumeroUnicoContratoCur] = useState(0);
  const [numeroCur, setNumeroCur] = useState(0);
  const [credito, setCredito] = useState(0);
  const [codigoOrganismo, setCodigoOrganismo] = useState(0);
  const [codigoGrupoGasto, setCodigoGrupoGasto] = useState(0);
  const [codigoContrato, setCodigoContrato] = useState(0);
  const [codigoTipoIdentificacion, setCodigoTipoIdentificacion] = useState(0);
  const [codigoEstadoCur, setCodigoEstadoCur] = useState(0);

  const formularioCur = useFormik({
    initialValues: {
      proyectoCurNombre: proyectoCurNombre,
      obra: obra,
      contrato: codigoContrato,
      estado: codigoEstadoCur,
      fechaGeneracion: fechaGeneracion,
      grupoGasto: codigoGrupoGasto,
      organismo: codigoOrganismo,
      montoCur: montoCur,
      tipoIdentificacion: codigoTipoIdentificacion,
      razonSocial: razonSocial,
      identificacionProveedor: identificacionProveedor,
      recursosFiscales: recursosFiscales,
      asistenciaTecnica: asistenciaTecnica,
      totalCur: totalCur,
      anticipos: anticipos,
      numeroCur: numeroCur,
      credito: credito,
    },
    validate: (data) => {
      let errors = {};

      if (!data.montoCur) {
        errors.montoCur = '* Campo obligatorio';
      }

      if (!data.razonSocial) {
        errors.razonSocial = '* Campo obligatorio';
      }
      if (!data.identificacionProveedor) {
        errors.identificacionProveedor = '* Campo obligatorio';
      }

      if (!data.numeroCur) {
        errors.numeroCur = '* Campo obligatorio';
      }

      return errors;
    },
    onSubmit: (data) => {
      if (formularioCur.values.totalCur !== formularioCur.values.montoCur) {
        toast.current.show({
          severity: 'warn',
          summary: 'Atención!',
          detail: 'La sumatoria del Monto Cur debe ser igual a la del Total de Cur',
          life: 3000,
        });
      } else {
        proyectoCur = {
          activo: true,
          anticipos998: data.anticipos,
          asistenciaTecnica: data.asistenciaTecnica,
          codigoContrato: codigoContrato,
          codigoEstadoCur: codigoEstadoCur,
          codigoGrupoGasto: codigoGrupoGasto,
          codigoOrganismo: codigoOrganismo,
          codigoTipoIdentificacion: codigoTipoIdentificacion,
          credito: data.credito,
          fechaGeneracion: fechaGeneracion,
          monto: data.montoCur,
          numero: data.numeroCur,
          numeroIdentificacion: data.identificacionProveedor,
          razonSocial: data.razonSocial,
          recursosFiscales: data.recursosFiscales,
          total: data.totalCur,
        };

        enviarDatosFormularioProyectoCur(proyectoCur);
        toast.current.show({
          severity: 'success',
          summary: 'Guardado',
          detail: 'Se ha guardado correctamente la información',
          life: 3000,
        });
      }
    },
    onReset: (data) => {
      setProyectoCurNombre(null);
      setObra(null);
      setContrato(null);
      setEstado(null);
      setFechaGeneracion(null);
      setGrupoGasto(null);
      setOrganismo(null);
      setMontoCur(0);
      setTipoIdentificacion(null);
      setRazonSocial(0);
      setIdentificacionProveedor(null);
      setRecursosFiscales(0);
      setAsistenciaTecnica(0);
      setTotalCur(0);
      setAnticipos(0);
      setTipoContratoCur(null);
      setNumeroContratoCur(0);
      setNumeroUnicoContratoCur(0);
      setNumeroCur(0);
      setCredito(0);
    },
  });

  const getCurFormError = (campo) => {
    return validadorCampoFormularioCur(campo) && <small className="p-error">{formularioCur.errors[campo]}</small>;
  };
  const validadorCampoFormularioCur = (validacion) =>
    !!(formularioCur.touched[validacion] && formularioCur.errors[validacion]);

  //ProyectoFormulario
  const [entidad, setEntidad] = useState(3093);
  const [consejoSectorial, setConsejoSectorial] = useState(null);
  const [cup, setCup] = useState('');
  const [nombreProyecto, setNombreProyecto] = useState('');
  const [programa, setPrograma] = useState(null);
  const [montoPlanificado, setMontoPlanificado] = useState(0);
  const [montoEjecutado, setMontoPEjecutado] = useState(0);
  const [codigoConsejoSectorial, setCodigoConsejoSectorial] = useState(0);
  const [codigoPrograma, setCodigoPrograma] = useState(0);

  let proyectoFormulario = {};

  const formularioProyecto = useFormik({
    initialValues: {
      codigoConsejoSectorial: 0,
      codigoEntidad: 0,
      codigoPrograma: 0,
      cup: '',
      montoEjecutado: 0,
      montoPlanificado: 0,
      nombre: '',
    },
    validate: (data) => {
      let errors = {};
      if (!data.cup) errors.cup = '* Campo obligatorio';
      if (!data.nombre) errors.nombre = '* Campo obligatorio';
      if (!data.montoPlanificado) errors.montoPlanificado = '* Campo obligatorio';
      if (!data.montoEjecutado) errors.montoEjecutado = '* Campo obligatorio';
      return errors;
    },
    onSubmit: enviarDatosFormularioProyectos,
  });

  const getProyectoFormError = (campo) => {
    return (
      validadorCampoFormularioProyecto(campo) && <small className="p-error">{formularioProyecto.errors[campo]}</small>
    );
  };
  const validadorCampoFormularioProyecto = (validacion) =>
    !!(formularioProyecto.touched[validacion] && formularioProyecto.errors[validacion]);

  /*UBICACION DATOS GEOGRAFICOS*/
  /*Pestaña Ubicacion Geografica Seleccionadas*/
  //Datos de tabla final utilizada para el Post
  const [selectCantonGeneral, setSelectCantonGeneral] = useState('');

  const [selectParroquiaGeneral, setSelectParroquiaGeneral] = useState('');

  const [zonaProvinciaSeleccionUbicacion, setZonaProvinciaSeleccionUbicacion] = useState([]);
  const [zonaCantonSeleccionUbicacion, setZonaCantonSeleccionUbicacion] = useState([]);
  const [proyectoUbicacionFinal, setProyectoUbicacionFinal] = useState([]);
  const [mostrarGuardarUbicacion, setMostrarGuardarUbicacion] = useState(true);
  const [mostrarMapa, setMostrarMapa] = useState(false);
  const [zonaSeleccionadaUbicacionesGeograficas, setZonaSeleccionadaUbicacionesGeograficas] = useState('');
  /* Pestaña de Coordenadas Geograficas */
  //Datos de tabla final utilizada para el Post
  const [datosCoordenadas, setDatosCoordenadas] = useState([]);

  /*SOLICITUD DE PROYECTO*/
  const [idEstadoSolicitud, setIdEstadoSolicitud] = useState();

  /*VISUALIZACION DE PROYECTO*/
  const [datosGeneralesAnalista, setDatosGeneralesAnalista] = useState();

  //NOTIFICACIONES
  const solicitud = useObtenerNotificaciones(rolId);

  //MODULO INVERSIÓN ARRASTRE
  /*DATOS GENERALES */
  const [datosProyecto, setDatosProyecto] = useState('');
  const [proyectosFiltrados, setProyectosFiltrados] = useState('');
  const [obraBienServicio, setObraBienServicio] = useState('');
  const [obrasFiltradas, setObrasFiltradas] = useState('');
  const [datosObraBienServicio, setDatosObraBienServicio] = useState();
  const [esArrastre, setEsArrastre] = useState();
  const [opcionesArrastre, setOpcionesArrastre] = useState([
    { label: 'Nuevo', key: 1 },
    { label: 'Arrastre', key: 2 },
  ]);
  const [tipoContrato, setTipoContrato] = useState('');
  const [datosContratos, setDatosContratos] = useState();
  const [contratosFiltrados, setContratosFiltrados] = useState('');
  const [contratoPrincipal, setContratoPrincipal] = useState('');
  const [contratoPrincipalFiltrados, setContratoPrincipalFiltrados] = useState();
  const [nombreContrato, setNombreContrato] = useState('');
  const [esDecretoEmergencia, setEsDecretoEmergencia] = useState('');
  const [opcionesDecretoEmergencia, setOpcionesDecretoEmergencia] = useState([
    { label: 'SI', key: 0 },
    { label: 'NO', key: 1 },
  ]);
  const toast = useRef(null);

  /* POSTULACION PAI Y PRIORIZACION*/
  /* Proforma */
  const [fuentesFinanciamientoPai, setFuentesFinanciamientoPai] = useState('');
  const [aniosMarcoLogico, setAniosMarcoLogico] = useState([]);
  const [anioSeleccionadoPai, setAnioSeleccionadoPai] = useState('');
  const [componentesAniosPai, setComponentesAniosPai] = useState([
    {
      label: '',
      value: '',
      monto: '',
    },
  ]);
  const [fechaCreacionPai, setFechaCreacionPai] = useState('');
  const [dataubicacionGeograficaProformaPai, setDataubicacionGeograficaProformaPai] = useState([]);
  const [dataFuentesFinanciamientoPropuestaPai, setDataFuentesFinanciamientoPropuestaPai] = useState([]);
  const [dataGrupoGastoPostularPai, setDataGrupoGastoPostularPai] = useState([]);

  const [totalPAI, setTotalPai] = useState(0);

  const [dataGruposGastosProformaPai, setDataGruposGastosProformaPai] = useState([]);
  const [dataFuentesFinanciamiento, setDataFuentesFinanciamiento] = useState([]);

  /* Postulacion PAI */
  const [anioSeleccionadoPostulacion, setAnioSeleccionadoPostulacion] = useState('');
  const [totalFuentesFinanciamientoProformaPai, setTotalFuentesFinanciamientoProformaPai] = useState(0);
  const [totalGruposGastosProformaPai, setTotalGruposGastosProformaPai] = useState(0);
  const [montoTotalRequerimientoPai, setMontoTotalRequerimientoPai] = useState(0);

  /*MODIFICACIONES PRESUPUESTARIAS*/
  /*Información Solicitada*/
  const [entidadSolicitanteModificaciones, setEntidadSolicitanteModificaciones] = useState('');
  const [numeroSolicitudModificaciones, setNumeroSolicitudModificaciones] = useState('');
  const [nombreEstudioProyectoProgramaModificaciones, setNombreEstudioProyectoProgramaModificaciones] = useState('');
  const [cupModificaciones, setCupModificaciones] = useState('');
  const [proyectoModificacionesPresupuestarias, setProyectoModificacionesPresupuestarias] = useState('');
  const [montoTotalSolicitado, setMontoTotalSolicitado] = useState(0);
  const [seleccionUnidadCoEjecutoraModificaciones, setSeleccionUnidadCoEjecutoraModificaciones] = useState('');
  const [componentesInformacionModificaciones, setComponentesInformacionModificaciones] = useState([
    {
      codigoTipoOficio: '',
      nombre: '',
      monto: 0,
      fechaInicio: '',
      fechaFin: '',
      periodo: '',
      nombreOficio: '',
    },
  ]);
  const [componentesFechasModificaciones, setComponentesFechasModificaciones] = useState([
    {
      fechaInicio: '',
      fechaFin: '',
    },
  ]);
  const [componentesAnalisisModificaciones, setComponentesAnalisisModificaciones] = useState([
    {
      activo: true,
      cumplimiento: '',
      idModificacionPresupuestaria: 0,
      nombreArchivo: '',
      requisito: 0,
      uuidArchivo: '',
    },
  ]);
  const [mostarObservacionesAnalistaModificacion, setMostarObservacionesAnalistaModificacion] = useState(false);
  const [mostrarInclusionIncremento, setMostrarInclusionIncremento] = useState(false);
  const [mostrarInclusionTransferenciaIntra, setMostrarInclusionTransferenciaIntra] = useState(false);
  const [mostrarInclusionTransferenciaInter, setMostrarInclusionTransferenciaInter] = useState(false);
  const [mostrarCertificacionPlurianual, setMostrarCertificacionPlurianual] = useState(false);
  const [mostrarRegistroCertificacionPlurianual, setMostrarRegistroCertificacionPlurianual] = useState(false);
  const [mostrarDetalleFinanciamiento, setMostrarDetalleFinanciamiento] = useState(false);
  const [seleccionUnidadEjecutoraModificaciones, setSeleccionUnidadEjecutoraModificaciones] = useState('');
  const [seleccionUnidadAdscritaModificaciones, setSeleccionUnidadAdscritaModificaciones] = useState('');
  const [seleccionTipoModificacionPresupuestaria, setSeleccionTipoModificacionPresupuestaria] = useState('');
  const [idSolicitudProyectoModificaciones, setIdSolicitudProyectoModificaciones] = useState('');
  const [conslusionesRecomendacionesModificaciones, setConslusionesRecomendacionesModificaciones] = useState('');
  const [guardadoInformacionSolicitada, setGuardadoInformacionSolicitada] = useState(false);

  /*Datos Tablas Modificacion Presupuestaria*/
  const [datosInclusionIncremento, setDatosInclusionIncremento] = useState('');
  const [datosInclusionTransferenciaInter, setDatosInclusionTransferenciaInter] = useState('');
  const [datosInclusionTransferenciaIntra, setDatosInclusionTransferenciaIntra] = useState('');
  const [datosDetalleFinanciamiento, setDatosDetalleFinanciamiento] = useState('');
  const [datosMontosPriorizados, setDatosMontosPriorizados] = useState('');
  const [datosDetalleCoEjecucionModificaciones, setDatosDetalleCoEjecucionModificaciones] = useState('');
  const [datosCertificacionPresupuestariaPlurianual, setDatosCertificacionPresupuestariaPlurianual] = useState('');
  const [datosRegistroCertificadoPlurianual, setDatosRegistroCertificadoPlurianual] = useState('');
  const [cuentaConCertificacion, setCuentaConCertificacion] = useState(false);
  const [datosProgramacionEjecucion, setDatosProgramacionEjecucion] = useState('');
  const [puntosRelevantesRequerimientos, setPuntosRelevantesRequerimientos] = useState('');
  const [editableAcordeon, setEditableAcordeon] = useState(false);
  const [observacionesTranferenciaIntra, setObservacionesTranferenciaIntra] = useState('');
  const [observacionesTransferencia, setObservacionesTransferencia] = useState('');
  const [observacionesInclusionIncremento, setObservacionesInclusionIncremento] = useState('');
  const [observacionesCertificadoPlurianual, setObservacionesCertificadoPlurianual] = useState('');
  const [observacionesProgramacionEjecucion, setObservacionesProgramacionEjecucion] = useState('');
  const [observacionesAnalisisModificaciones, setObservacionesAnalisisModificaciones] = useState('');
  const [observacionesMontosPriorizados, setObservacionesMontosPriorizados] = useState('');
  const [observacionesDetallesCoEjecucion, setObservacionesDetallesCoEjecucion] = useState('');
  const [codigoModificacionPresupuestaria, setCodigoModificacionPresupuestaria] = useState('');
  const [aniosProyectoModificaciones, setAniosProyectoModificaciones] = useState([]);
  const [datosAnalisisModificaciones, setDatosAnalisisModificaciones] = useState([]);
  const [componentesModificaciones, setComponentesModificaciones] = useState([]);
  const [datosObtenidosRolAnalista, setDatosObtenidosRolAnalista] = useState('');
  return (
    <div>
      <Toast ref={toast} />
      <FormCreacionContext.Provider
        value={{
          /*VARIABLES LOGIN*/
          ci,
          setCi,
          ruc,
          setRuc,
          password,
          setPassword,
          editable,
          setEditable,
          rolId,
          setRolId,
          usuarioId,
          setUsuarioId,
          entidadLogeada,
          setEntidadLogeada,
          codigoEntidadEntreRector,
          setCodigoEntidadEntreRector,
          /* DATOS GENERALES */
          codigoProyecto,
          setCodigoProyecto,
          habilitarMarcoLogico,
          setHabilitarMarcoLogico,
          habilitarUbicacionGeografica,
          setHabilitarUbicacionGeografica,
          habilitarIndicadores,
          setHabilitarIndicadores,
          habilitarAlineacionPND,
          setHabilitarAlineacionPND,
          habilitarEstudiosTecnicos,
          setHabilitarEstudiosTecnicos,
          habilitarFinanciamiento,
          setHabilitarFinanciamiento,

          proyectoCreado,
          setProyectoCreado,
          /* Antecedentes de proyecto */
          fechaInicio,
          setFechaInicio,
          fechaUltmodificacion,
          setFechaUltmodificacion,
          codigoUsuarioUltimaMod,
          setCodigoUsuarioUltimaMod,
          responsable,
          setResponsable,
          cargoResponsable,
          setCargoResponsable,
          emailResponsable,
          setEmailResponsable,
          emailAdicionalResponsable,
          setEmailAdicionalResponsable,
          telefonoResponsable,
          setTelefonoResponsable,
          telefonoExtension,
          setTelefonoExtension,
          entidades,
          setEntidades,

          /*BUSQUEDA DE PROYECTO */
          /*FORMULARIO CUR */
          getCurFormError,
          validadorCampoFormularioCur,
          formularioCur,
          proyectoCurNombre,
          setProyectoCurNombre,
          obra,
          setObra,
          contrato,
          setContrato,
          estado,
          setEstado,
          fechaGeneracion,
          setFechaGeneracion,
          grupoGasto,
          setGrupoGasto,
          organismo,
          setOrganismo,
          montoCur,
          setMontoCur,
          tipoIdentificacion,
          setTipoIdentificacion,
          razonSocial,
          setRazonSocial,
          identificacionProveedor,
          setIdentificacionProveedor,
          recursosFiscales,
          setRecursosFiscales,
          asistenciaTecnica,
          setAsistenciaTecnica,
          totalCur,
          setTotalCur,
          anticipos,
          setAnticipos,
          tipoContratoCur,
          setTipoContratoCur,
          numeroContratoCur,
          setNumeroContratoCur,
          numeroUnicoContratoCur,
          setNumeroUnicoContratoCur,
          numeroCur,
          setNumeroCur,
          credito,
          setCredito,
          codigoOrganismo,
          setCodigoOrganismo,
          codigoGrupoGasto,
          setCodigoGrupoGasto,
          codigoContrato,
          setCodigoContrato,
          codigoTipoIdentificacion,
          setCodigoTipoIdentificacion,
          codigoEstadoCur,
          setCodigoEstadoCur,

          /*FORMULARIO  PROYECTO*/
          formularioProyecto,
          getProyectoFormError,
          validadorCampoFormularioProyecto,
          consejoSectorialSeleccionado,
          setConsejoSectorialSeleccionado,
          programaSeleccionado,
          setProgramaSeleccionado,
          proyectoCurSeleccionado,
          setProyectoCurSeleccionado,
          obraSeleccionado,
          setObraSeleccionado,
          contratoSeleccionado,
          setContratoSeleccionado,
          estadoSeleccionado,
          setEstadoSeleccionado,
          organismoSeleccionado,
          setOrganismoSeleccionado,
          identificacionSeleccionado,
          setIdentificacionSeleccionado,

          entidad,
          setEntidad,
          cup,
          setCup,
          consejoSectorial,
          setConsejoSectorial,
          nombreProyecto,
          setNombreProyecto,
          programa,
          setPrograma,
          montoPlanificado,
          setMontoPlanificado,
          montoEjecutado,
          setMontoPEjecutado,
          avalSeleccionado,
          setAvalSeleccionado,

          /*FORMULARIO OBRAS*/
          formularioObras,
          obtenerMensajeErrorObras,
          validadorCampoObras,

          /* Datos iniciales de proyecto */
          codigoUnidadEjecutora,
          setCodigoUnidadEjecutora,
          codigoCatModeloGestion,
          setcodigoCatModeloGestion,
          modelosGestionSeleccionado,
          setModelosGestionSeleccionado,
          codigoCobertura,
          setCodigoCobertura,
          codigoCoberturaSeleccionado,
          setCodigoCoberturaSeleccionado,
          codigoEntidad,
          setCodigoEntidad,
          mostrarUnidadEjecutoraDatosIniciales,
          setMostrarUnidadEjecutoraDatosIniciales,
          tipoInversion,
          setTipoInversion,
          tipoInversionSeleccionado,
          setTipoInversionSeleccionado,
          sector,
          setSector,
          sectorSeleccionado,
          setSectorSeleccionado,
          objetivoInversion,
          setObjetivoInversion,
          objetivoInversionSeleccionado,
          setObjetivoInversionSeleccionado,
          subSector,
          setSubSector,
          subSectorSeleccionado,
          setSubSectorSeleccionado,
          proyectoAvalinp,
          setProyectoAvalinp,
          proyectoAvalsenacyt,
          setProyectoAvalsenacyt,
          proyectoCooperacionbi,
          setProyectoCooperacionbi,
          datosTablaAval,
          setDatosTablaAval,
          proyectoEmblematico,
          setProyectoEmblematico,
          reqFichaAmbiental,
          setReqFichaAmbiental,
          infraestructura,
          setinfraestructura,
          proyectoEntidadParticipanteDtos,
          setProyectoEntidadParticipanteDtos,
          montoTotalEntidades,
          setMontoTotalEntidades,

          /* Estado de proyecto */
          codigoEstadoSituacionActual,
          codigoCatEtapa,
          setCodigoEstadoSituacionActual,
          setCodigoCatEtapa,
          codigoCatFase,
          setCodigoCatFase,
          nemonicoProyecto,
          setNemonicoProyecto,
          entidadesSeleccionado,
          setEntidadesSeleccionado,
          /* Adquisicion de proyecto */
          codigoCatConsumo,
          setCodigoCatConsumo,
          consumonacional,
          setConsumoNacional,
          consumoDetalleNacional,
          setConsumoDetalleNacional,
          transferenciaTecnologica,
          setTransferenciaTecnologica,
          consumoimportado,
          setConsumoImportado,
          consumoDetalleImportado,
          setConsumoDetalleImportado,
          aquisicionesSeleccionado,
          setAquisicionesSeleccionado,

          /* Entregables de proyecto */
          productoSeleccionado,
          setProductoSeleccionado,

          /* Entregables de proyecto */
          codigoCatProducto,
          setCodigoCatProducto,

          /* Fomulario para Datos Generales */
          formularioDatosGenerales,
          obtenerMensajeErrorFormulario,
          validadorCampoFormulario,

          /* Obras */
          obraActivo,
          setObraActivo,
          obraCanton,
          setObraCanton,
          obraCodigoReferencialInstitucional,
          setObraCodigoReferencialInstitucional,
          obraEntidadCoejecutora,
          setObraEntidadCoejecutora,
          obraEstadoActualObra,
          setObraEstadoActualObra,
          obraFechaInicio,
          setObraFechaInicio,
          obraFechaFin,
          setObraFechaFin,
          obraMontoEjecutar,
          setObraMontoEjecutar,
          obraNombreObra,
          setObraNombreObra,
          obraParroquia,
          setObraParroquia,
          obraProvincia,
          setObraProvincia,
          obraTipoObra,
          setObraTipoObra,
          obraTotalDevengado,
          setObraTotalDevengado,
          obraTotalPorDevengar,
          setObraTotalPorDevengar,
          obraeditableDevengar,
          setObraeditableDevengar,
          obraMontoTotal,
          setObraMontoTotal,
          proyectoSeleccionado,
          setProyectoSeleccionado,

          /* ALINEACION PLAN DESARROLLO NACIONAL */
          /* Busqueda y red de Proyectos */

          listaRedProyectos,
          setListaRedProyectos,
          botonAgregar,
          opcionAgregar,
          botonEliminar,
          opcionEliminar,
          /* FINANCIAMIENTO - CAMPOS */
          columna,
          setColumna,
          recursos,
          setRecursos,
          totalFuentesFinanciamiento,
          setTotalFuentesFinanciamiento,
          totalFuentesFinanciamientoPorFila,
          setTotalFuentesFinanciamientoPorFila,

          /* MARCO LÓGICO */
          /* Archivos */
          index,
          setIndex,
          visible,
          setVisible,
          componentes,
          setComponentes,

          actividades,
          setActividades,
          marcoLogico,
          setMarcoLogico,
          presupuestoComponente,
          setPresupuestoComponente,
          fuentesFinanciamientoArray,
          setFuentesFinanciamientoArray,
          componenteMediosVerificacionArray,
          setComponenteMediosVerificacionArray,
          componenteSupuestosArray,
          setComponenteSupuestosArray,
          actividadesMediosVerificacionArray,
          setActividadesMediosVerificacionArray,
          actividadesSupuestosArray,
          setActividadesSupuestosArray,
          fuenteFinanciamientoExterno,
          setFuenteFinanciamientoExterno,
          fuenteFinanciamientoExternoSeleccionado,
          setFuenteFinanciamientoExternoSeleccionado,
          unidadMedida,
          setUnidadMedida,
          codigoCatalogoPadre,
          setCodigoCatalogoPadre,
          fuenteFinanciamientoSeleccionado,
          setFuenteFinanciamientoSeleccionado,
          grupoGastoSeleccionado,
          setGrupoGastoSeleccionado,
          itemPresupuestarioSeleccionado,
          setItemPresupuestarioSeleccionado,
          itemPresupuestario,
          setItemPresupuestario,
          fuentesFinanciamiento,
          setFuentesFinanciamiento,
          gruposGasto,
          setGruposGasto,
          proyecto,
          setProyecto,
          archivoArbolProblema,
          setArbolProblema,
          archivoProyecto,
          setArchivoProyecto,
          columnas,
          setColumnas,

          /* Objetivos */

          objEspecifico,
          setObjEspecifico,
          componenteSeleccionado,
          setComponenteSeleccionado,

          /* Matriz */
          //Variables Fila FIN
          finIndicadores,
          setFinIndicadores,
          finMediosVerificacion,
          setFinMediosVerificacion,
          finSupuestos,
          setFinSupuestos,
          detalleProposito,
          setDetalleProposito,

          //Variables Fila PROPOSITO
          propositoResumen,
          setPropositoResumen,
          propositoIndicadores,
          setPropositoIndicadores,
          propositoMediosVerificacion,
          setPropositoMediosVerificacion,
          propositoSupuestos,
          setPropositoSupuestos,

          finIndicadoresArray,
          setFinIndicadoresArray,
          finMediosVerificacionArray,
          setFinMediosVerificacionArray,
          indicadorSeleccionado,
          setIndicadorSeleccionado,
          finSupuestosArray,
          setFinSupuestosArray,

          propositoIndicadoresArray,
          setPropositoIndicadoresArray,
          propositoMediosVerificacionArray,
          setPropositoMediosVerificacionArray,
          propositoSupuestosArray,
          setPropositoSupuestosArray,

          actividadesMediosVerificacion,
          setActividadesMediosVerificacion,

          actividadSeleccionada,
          setActividadSeleccionada,
          presupuestoActividad,
          setPresupuestoActividad,
          detalleActividad,
          setDetalleActividad,

          //Banderas para los archivos
          anioInicial,
          setAnioInicial,

          //Arbol problema
          componenteIndicadores,
          setComponenteIndicadores,
          componenteMediosVerificacion,
          setComponenteMediosVerificacion,
          componenteSupuestos,
          setComponenteSupuestos,

          actividadIndicadores,
          setActividadIndicadores,
          actividadMediosVerificacion,
          setActividadMediosVerificacion,
          actividadSupuestos,
          setActividadSupuestos,

          //ALINEACION AL PND
          tipoProyectoSeleccionado,
          setTipoProyectoSeleccionado,
          listaRed,
          setListaRed,
          tipoProyecto,
          setTipoProyecto,

          //NOTIFICACIONES DE APROBACION, NEGACION Y OBSERVACIONES
          solicitud,

          /*UBICACION DATOS GEOGRAFICOS*/
          /*Pestaña Ubicacion Geografica Seleccionadas*/
          selectCantonGeneral,
          setSelectCantonGeneral,
          selectParroquiaGeneral,
          setSelectParroquiaGeneral,
          zonaProvinciaSeleccionUbicacion,
          setZonaProvinciaSeleccionUbicacion,
          zonaCantonSeleccionUbicacion,
          setZonaCantonSeleccionUbicacion,
          proyectoUbicacionFinal,
          setProyectoUbicacionFinal,
          mostrarGuardarUbicacion,
          setMostrarGuardarUbicacion,
          mostrarMapa,
          setMostrarMapa,
          zonaSeleccionadaUbicacionesGeograficas,
          setZonaSeleccionadaUbicacionesGeograficas,
          /* Pestaña de Coordenadas Geograficas */
          datosCoordenadas,
          setDatosCoordenadas,

          /* INDICADORES */

          gruposPrioritarios,
          setGruposPrioritarios,
          grupo,
          setGrupo,
          tasaDescuentoFin,
          setTasaDescuentoFin,
          valorActualNetoFin,
          setValorActualNetoFin,
          tasaInternaRetornoFin,
          setTasaInternaRetornoFin,
          tasaDescuentoEco,
          setTasaDescuentoEco,
          valorActualNetoEco,
          setValorActualNetoEco,
          tasaInternaRetornoEco,
          setTasaInternaRetornoEco,
          relacionBeneficiarioCosto,
          setRelacion,
          pregunta1,
          setPregunta1,
          pregunta2,
          setPregunta2,
          pregunta3,
          setPregunta3,
          benMasculino,
          setBenMasculino,
          benFemenino,
          setBenFemenino,
          benDirectos,
          setBenDirectos,
          benIndirectos,
          setBenIndirectos,
          listaAtencionPrioritaria,
          setListaAtencionPrioritaria,
          priorMasculino,
          setPriorMasculino,
          priorFemenino,
          setPriorFemenino,
          errores,
          setErrores,
          gruposFiltrados,
          setGruposFiltrados,
          tasaCrecimientoInteres,
          setTasaCrecimientoInteres,
          tasaCrecimientoPoblacion,
          setTasaCrecimientoPoblacion,
          ingresoSeleccionado,
          setIngresoSeleccionado,
          ingresos,
          setIngresos,
          gastoCapitalFinancieroSeleccionado,
          setGastoCapitalFinancieroSeleccionado,
          gastosCapitalFinanciero,
          setGastosCapitalFinanciero,
          gastoOperativoFinancieroSeleccionado,
          setGastoOperativoFinancieroSeleccionado,
          gastosOperativosFinanciero,
          setGastosOperativosFinanciero,
          gastoMantenimientoFinancieroSeleccionado,
          setGastoMantenimientoFinancieroSeleccionado,
          gastosMantenimientoFinanciero,
          setGastosMantenimientoFinanciero,
          gastoAdministrativoFinancieroSeleccionado,
          setGastoAdministrativoFinancieroSeleccionado,
          gastoAdministrativoFinanciero,
          setGastoAdministrativoFinanciero,
          beneficios,
          setBeneficios,
          setBeneficioSeleccionado,
          beneficioSeleccionado,
          gastoCapitalEconomicoSeleccionado,
          setGastoCapitalEconomicoSeleccionado,
          gastosCapitalEconomico,
          setGastosCapitalEconomico,
          gastoOperativoEconomicoSeleccionado,
          setGastoOperativoEconomicoSeleccionado,
          gastosOperativosEconomico,
          setGastosOperativosEconomico,
          gastoMantenimientoEconomicoSeleccionado,
          setGastoMantenimientoEconomicoSeleccionado,
          gastosMantenimientoEconomico,
          setGastosMantenimientoEconomico,
          gastoAdministrativoEconomico,
          setGastoAdministrativoEconomico,
          gastoAdministrativoEconomicoSeleccionado,
          setGastoAdministrativoEconomicoSeleccionado,
          flujo,
          setFlujo,

          /* Formulario para indicadores */
          formularioIndicadores,
          getIndicadoresFormError,
          validadorCampoFormularioIndicadores,

          /*SOLICITUD DE PROYECTO*/
          idEstadoSolicitud,
          setIdEstadoSolicitud,

          /*VISUALIZACION DE PROYECTO*/
          datosGeneralesAnalista,
          setDatosGeneralesAnalista,

          //MÓDULO DE INVERSIÓN DE ARRASTRE
          //INGRESO DE DATOS GENERALES
          datosProyecto,
          setDatosProyecto,
          obraBienServicio,
          setObraBienServicio,
          obrasFiltradas,
          setObrasFiltradas,
          datosObraBienServicio,
          setDatosObraBienServicio,
          esArrastre,
          setEsArrastre,
          tipoContrato,
          setTipoContrato,
          contratosFiltrados,
          setContratosFiltrados,
          datosContratos,
          setDatosContratos,
          contratoPrincipal,
          setContratoPrincipal,
          contratoPrincipalFiltrados,
          setContratoPrincipalFiltrados,
          proyectosFiltrados,
          setProyectosFiltrados,
          opcionesArrastre,
          setOpcionesArrastre,
          nombreContrato,
          setNombreContrato,
          esDecretoEmergencia,
          setEsDecretoEmergencia,
          opcionesDecretoEmergencia,
          setOpcionesDecretoEmergencia,
          codigoConsejoSectorial,
          setCodigoConsejoSectorial,
          codigoPrograma,
          setCodigoPrograma,
          contratoListado,
          setContratoListado,
          listadoCur,
          setListadoCur,
          listadoObras,
          setListadoObras,
          param: param2,
          idObra,
          setIdObra,
          param2,
          setParam2,
          editableCur1,
          setEditableCur1,
          editableCur2,
          setEditableCur2,
          editablePlanificacion2,
          setEditablePlanificacion2,
          editarObras,
          setEditarObras,
          banderaDatosGenerales,
          setBanderaDatosGenerales,
          datosDocumentosDescarga,
          setDatosDocumentosDescarga,
          sectorSeleccionado1,
          setSectorSeleccionado1,
          codigoSector,
          setCodigoSector,
          valueSector,
          setValueSector,
          valueCanton,
          setValueCanton,
          cantonSeleccionado1,
          setCantonSeleccionado1,
          codigoCanton,
          setCodigoCanton,

          valueParroquia,
          setValueParroquia,
          parroquiaSeleccionado1,
          setParroquiaSeleccionado1,
          codigoParroquia,
          setCodigoParroquia,

          valueProvincia,
          setValueProvincia,
          provinciaSeleccionado1,
          setProvinciaSeleccionado1,
          codigoProvincia,
          setCodigoProvincia,
          codigoTabla,
          setCodigoTabla,
          tablaFinan,
          setTablaFinan,
          creditoTabla,
          setCreditoTabla,
          setFuentes,
          fuentes,
          fuentesSeleccionado,
          setFuentesSeleccionado,
          codigoFuente,
          setCodigoFuente,
          correlativo,
          setCorrelativo,
          correlativoSeleccionado,
          setCorrelativoSeleccionado,
          codigoCorrelativo,
          setCodigoCorrelativo,
          creditoTablaNombre,
          setCreditoTablaNombre,
          tablaNueva,
          setTablaNueva,

          /* POSTULACION PAI Y PRIORIZACION*/
          /* Proforma */
          fuentesFinanciamientoPai,
          setFuentesFinanciamientoPai,
          aniosMarcoLogico,
          setAniosMarcoLogico,
          anioSeleccionadoPai,
          setAnioSeleccionadoPai,
          componentesAniosPai,
          setComponentesAniosPai,
          fechaCreacionPai,
          setFechaCreacionPai,
          dataubicacionGeograficaProformaPai,
          setDataubicacionGeograficaProformaPai,
          dataGruposGastosProformaPai,
          setDataGruposGastosProformaPai,
          dataFuentesFinanciamiento,
          setDataFuentesFinanciamiento,
          dataFuentesFinanciamientoPropuestaPai,
          setDataFuentesFinanciamientoPropuestaPai,
          dataGrupoGastoPostularPai,
          setDataGrupoGastoPostularPai,
          totalPAI,
          setTotalPai,

          /* Postulacion PAI */
          totalFuentesFinanciamientoProformaPai,
          setTotalFuentesFinanciamientoProformaPai,
          anioSeleccionadoPostulacion,
          setAnioSeleccionadoPostulacion,
          totalGruposGastosProformaPai,
          setTotalGruposGastosProformaPai,
          montoTotalRequerimientoPai,
          setMontoTotalRequerimientoPai,

          //jerarquizar
          datosProyectosJerarquizar,
          setDatosProyectosJerarquizar,
          proyectosJerarquizarFiltrados,
          setProyectosJerarquizarFiltrados,
          proyectoJerarquizar,
          setProyectoJerarquizar,
          catalogoJerarquizar,
          setCatalogoJerarquizar,
          datosCatalogoJerarquizar,
          setDatosCatalogoJerarquizar,
          catalogosJerarquizarFiltrados,
          setcatalogosJerarquizarFiltrados,
          sumTotal,
          setSumTotal,
          codigoGabinete,
          setCodigoGabinete,
          unidadesEjecutoras,
          setUnidadesEjecutoras,
          entidadParticipante,
          setEntidadParticipante,
          gerenteGerencia,
          setGerenteGerencia,
          /*MODIFICACIONES PRESUPUESTARIAS*/
          /*Información Solicitada*/
          entidadSolicitanteModificaciones,
          setEntidadSolicitanteModificaciones,
          numeroSolicitudModificaciones,
          setNumeroSolicitudModificaciones,
          nombreEstudioProyectoProgramaModificaciones,
          setNombreEstudioProyectoProgramaModificaciones,
          cupModificaciones,
          setCupModificaciones,
          proyectoModificacionesPresupuestarias,
          setProyectoModificacionesPresupuestarias,
          montoTotalSolicitado,
          setMontoTotalSolicitado,
          seleccionUnidadCoEjecutoraModificaciones,
          setSeleccionUnidadCoEjecutoraModificaciones,
          componentesInformacionModificaciones,
          setComponentesInformacionModificaciones,
          componentesFechasModificaciones,
          setComponentesFechasModificaciones,
          componentesAnalisisModificaciones,
          setComponentesAnalisisModificaciones,

          mostarObservacionesAnalistaModificacion,
          setMostarObservacionesAnalistaModificacion,
          mostrarInclusionIncremento,
          setMostrarInclusionIncremento,
          mostrarInclusionTransferenciaIntra,
          setMostrarInclusionTransferenciaIntra,
          mostrarInclusionTransferenciaInter,
          setMostrarInclusionTransferenciaInter,
          mostrarCertificacionPlurianual,
          setMostrarCertificacionPlurianual,
          mostrarRegistroCertificacionPlurianual,
          setMostrarRegistroCertificacionPlurianual,
          mostrarDetalleFinanciamiento,
          setMostrarDetalleFinanciamiento,
          seleccionUnidadEjecutoraModificaciones,
          setSeleccionUnidadEjecutoraModificaciones,
          seleccionUnidadAdscritaModificaciones,
          setSeleccionUnidadAdscritaModificaciones,
          seleccionTipoModificacionPresupuestaria,
          setSeleccionTipoModificacionPresupuestaria,
          idSolicitudProyectoModificaciones,
          setIdSolicitudProyectoModificaciones,
          conslusionesRecomendacionesModificaciones,
          setConslusionesRecomendacionesModificaciones,
          guardadoInformacionSolicitada,
          setGuardadoInformacionSolicitada,
          /*Datos Tablas Modificacion Presupuestaria*/
          datosInclusionIncremento,
          setDatosInclusionIncremento,
          datosInclusionTransferenciaInter,
          setDatosInclusionTransferenciaInter,
          datosInclusionTransferenciaIntra,
          setDatosInclusionTransferenciaIntra,
          datosDetalleFinanciamiento,
          setDatosDetalleFinanciamiento,
          datosMontosPriorizados,
          setDatosMontosPriorizados,
          datosDetalleCoEjecucionModificaciones,
          setDatosDetalleCoEjecucionModificaciones,
          datosCertificacionPresupuestariaPlurianual,
          setDatosCertificacionPresupuestariaPlurianual,
          datosRegistroCertificadoPlurianual,
          setDatosRegistroCertificadoPlurianual,
          cuentaConCertificacion,
          setCuentaConCertificacion,
          datosProgramacionEjecucion,
          setDatosProgramacionEjecucion,
          puntosRelevantesRequerimientos,
          setPuntosRelevantesRequerimientos,
          editableAcordeon,
          setEditableAcordeon,
          observacionesTranferenciaIntra,
          setObservacionesTranferenciaIntra,
          observacionesTransferencia,
          setObservacionesTransferencia,
          observacionesInclusionIncremento,
          setObservacionesInclusionIncremento,
          observacionesCertificadoPlurianual,
          setObservacionesCertificadoPlurianual,
          observacionesProgramacionEjecucion,
          setObservacionesProgramacionEjecucion,
          observacionesAnalisisModificaciones,
          setObservacionesAnalisisModificaciones,
          observacionesMontosPriorizados,
          setObservacionesMontosPriorizados,
          observacionesDetallesCoEjecucion,
          setObservacionesDetallesCoEjecucion,
          codigoModificacionPresupuestaria,
          setCodigoModificacionPresupuestaria,
          aniosProyectoModificaciones,
          setAniosProyectoModificaciones,
          datosAnalisisModificaciones,
          setDatosAnalisisModificaciones,
          componentesModificaciones,
          setComponentesModificaciones,
          datosObtenidosRolAnalista,
          setDatosObtenidosRolAnalista,
          arregloAval,
          setArregloAval,
          sumaCredito1,
          setSumaCredito1,
        }}
      >
        {props.children}
      </FormCreacionContext.Provider>
    </div>
  );
}

export { FormCreacionContext, FormCreacionProvider };
