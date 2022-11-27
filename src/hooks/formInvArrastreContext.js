import { createContext, useState } from 'react';

const FormInvArrastreContext = createContext();
/** Proveedor de formulario de inversión de arrastre. */
function FormInvArrastreProvider(props) {
  /*DATOS GENERALES ARRASTRE */
  const [mostrarContratos, setMostrarContratos] = useState(false);
  const [editable, setEditable] = useState(true);
  const [proyecto, setProyecto] = useState('');
  const [datosProyecto, setDatosProyecto] = useState([]);
  const [proyectosFiltrados, setProyectosFiltrados] = useState('');
  const [obraBienServicio, setObraBienServicio] = useState(null);
  const [datosObraBienServicio, setDatosObraBienServicio] = useState([]);
  const [obrasFiltradas, setObrasFiltradas] = useState('');
  const [esArrastre, setEsArrastre] = useState(false);
  const [opcionesArrastre, setOpcionesArrastre] = useState([
    { label: 'Nuevo', key: true },
    { label: 'Arrastre', key: false },
  ]);
  const [tipoContrato, setTipoContrato] = useState('');
  const [datosContratos, setDatosContratos] = useState([]);
  const [contratosFiltrados, setContratosFiltrados] = useState('');
  const [contratoPrincipal, setContratoPrincipal] = useState('');
  const [contratoPrincipalFiltrados, setContratoPrincipalFiltrados] = useState();
  const [nombreContrato, setNombreContrato] = useState('');
  const [esDecretoEmergencia, setEsDecretoEmergencia] = useState('');
  const [opcionesDecretoEmergencia, setOpcionesDecretoEmergencia] = useState([
    { label: 'SI', key: true },
    { label: 'NO', key: false },
  ]);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [categoria, setCategoria] = useState('');
  const [montoContratoFiltrado, setMontoContratoFiltrado] = useState('');
  const [montoContrato, setMontoContrato] = useState('');
  const [categoriasFiltradas, setCategoriasFiltradas] = useState([]);
  const [numContratoInstitucion, setNumContratoInstitucion] = useState('');
  const [grupoGasto, setGrupoGasto] = useState('');
  const [grupoGastosFiltrados, setGrupoGastosFiltrados] = useState([]);
  const [datosGrupoGasto, setDatosGrupoGasto] = useState([]);
  const [datosMontoContrato, setDatosMontoContrato] = useState([]);
  const [datosCategorias, setDatosCategorias] = useState([]);
  const [datosContratosPrincipales, setDatosContratosPrincipal] = useState([]);
  const [objeto, setObjeto] = useState('');
  const [numContratoSIGEF, setNumContratoSIGEF] = useState('');
  const [numContratoSIGEFPrincipal, setNumContratoSIGEFPrincipal] = useState('');
  const [datosContratosSIGEPPrincipal, setDatosContratosSIGEPPrincipal] = useState([]);
  const [numContratoSIGEFPrincipalFiltrados, setNumContratoSIGEFPrincipalFiltrados] = useState([]);
  const [totalContrato, setTotalContrato] = useState(0);
  const [IVAContrato, setIVAContrato] = useState(0);
  const [totalContratoIVA, setTotalContratoIVA] = useState(0);
  const [estaEnPAI, setEstaEnPAI] = useState(false);
  const [estaPresupuestado, setEstaPresupuestado] = useState(false);
  const [presupuestoPAI, setPresupuestoPAI] = useState(0);
  const [observaciones, setObservaciones] = useState('');
  const [noSePagara, setNoSePagara] = useState(0);
  const [montoFinal, setMontoFinal] = useState(0);
  const [devengadoAgosto2016, setDevengadoAgosto2016] = useState(0);
  const [tarifaIva, setTarifaIva] = useState(null);

  /*DATOS GENERALES DEL ARRASTRE*/
  const [codigoArrastre, setCodigoArrastre] = useState('');
  const [codigoArrastreAux, setCodigoArrastreAux] = useState('');

  /*PRESUPUESTO DEVENGADO */
  const [fechaPresupuestoDevengado, setFechaPresupuestoDevengado] = useState('');
  const [curPagado, setCurPagado] = useState(null);
  const [curImpago, setCurImpago] = useState(null);
  const [totalRecursosFiscales, setTotalRecursosFiscales] = useState(null);
  const [curPagadoAsistenciaTecnica, setCurPagadoAsistenciaTecnica] = useState(null);
  const [curImpagoAsistenciaTecnica, setCurImpagoAsistenciaTecnica] = useState(null);
  const [totalAsistenciaTecnica, setTotalAsistenciaTecnica] = useState(null);
  const [curPagadoCredito, setCurPagadoCredito] = useState(null);
  const [curImpagoCredito, setCurImpagoCredito] = useState(null);
  const [totalCredito, setTotalCredito] = useState(null);
  const [curPagadoDevengado, setCurPagadoDevengado] = useState(null);
  const [curImpagoDevengado, setCurImpagoDevengado] = useState(null);
  const [totalDevengado, setTotalDevengado] = useState(0);
  const [totalPorDevengar, setTotalPorDevengar] = useState(null);

  /*PRESUPUESTO POR DEVENGAR */
  const [dataFuentesFinanciamiento, setDataFuentesFinanciamiento] = useState([]);
  const [correlativoDatoPorDegengar, setCorrelativoDatoPorDegengar] = useState('');
  const [organismoDatoPorDegengar, setOrganismoDatoPorDegengar] = useState('');
  const [fuenteFinanciamientoPorDevengar, setFuenteFinanciamientoPorDevengar] = useState('');

  //INGRESO DATOS CUR
  const [datosCur, setDatosCur] = useState([]);
  const [datosCurFiltrados, setDatosCurFiltrados] = useState('');
  const [infoProyecto, setInfoProyecto] = useState([]);

  //PLANIFICACIÓN
  const [fuentesFinanciamiento, setFuentesFinanciamiento] = useState(null);
  const [fuenteFinanciamientosFiltrados, setFuenteFinanciamientosFiltrados] = useState('');
  const [fuenteFinanciamiento, setFuenteFinanciamiento] = useState('');
  const [organismos, setOrganismos] = useState(null);
  const [organismosFiltrados, setOrganismosFiltrados] = useState('');
  const [organismo, setOrganismo] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(null);
  const [selectedCountry2, setSelectedCountry2] = useState(null);
  const [totalMonto, setTotalMonto] = useState(null);
  const [correlativos, setCorrelativos] = useState(null);
  const [correlativosFiltrados, setCorrelativosFiltrados] = useState('');
  const [correlativo, setCorrelativo] = useState('');

  // const[proyectoSeleccionado,setProyectoSeleccionado]=useState("")

  //SELECCIÓN DE ARRASTRES
  const [contratosSeleccionados, setContratosSeleccionados] = useState(null);
  const [contratosArray, setContratosArray] = useState([]);

  return (
    <div>
      <FormInvArrastreContext.Provider
        value={{
          /*DATOS GENERALES ARRASTRE */
          proyecto,
          setProyecto,
          datosProyecto,
          setDatosProyecto,
          obraBienServicio,
          setObraBienServicio,
          datosObraBienServicio,
          setDatosObraBienServicio,
          obrasFiltradas,
          setObrasFiltradas,
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
          tarifaIva,
          setTarifaIva,

          /*PRESUPUESTO DEVENGADO */
          fechaPresupuestoDevengado,
          setFechaPresupuestoDevengado,
          curPagado,
          setCurPagado,
          curImpago,
          totalRecursosFiscales,
          setCurImpago,
          setTotalRecursosFiscales,
          curPagadoAsistenciaTecnica,
          setCurPagadoAsistenciaTecnica,
          curImpagoAsistenciaTecnica,
          setCurImpagoAsistenciaTecnica,
          totalAsistenciaTecnica,
          setTotalAsistenciaTecnica,
          curPagadoCredito,
          setCurPagadoCredito,
          curImpagoCredito,
          totalCredito,
          setCurImpagoCredito,
          setTotalCredito,
          curPagadoDevengado,
          setCurPagadoDevengado,
          curImpagoDevengado,
          setCurImpagoDevengado,
          totalDevengado,
          setTotalDevengado,
          totalPorDevengar,
          setTotalPorDevengar,

          /*DATOS GENERALES DEL ARRASTRE*/
          codigoArrastre,
          setCodigoArrastre,
          codigoArrastreAux,
          setCodigoArrastreAux,

          editable,
          setEditable,
          mostrarContratos,
          setMostrarContratos,

          fechaInicio,
          setFechaInicio,
          fechaFin,
          setFechaFin,
          montoContrato,
          setMontoContrato,
          montoContratoFiltrado,
          setMontoContratoFiltrado,
          categoria,
          setCategoria,
          categoriasFiltradas,
          setCategoriasFiltradas,
          grupoGastosFiltrados,
          setGrupoGastosFiltrados,
          datosCategorias,
          setDatosCategorias,
          objeto,
          setObjeto,
          datosContratosPrincipales,
          setDatosContratosPrincipal,
          datosGrupoGasto,
          setDatosGrupoGasto,
          datosMontoContrato,
          setDatosMontoContrato,
          grupoGasto,
          setGrupoGasto,
          numContratoInstitucion,
          setNumContratoInstitucion,
          numContratoSIGEF,
          setNumContratoSIGEF,
          numContratoSIGEFPrincipal,
          setNumContratoSIGEFPrincipal,
          datosContratosSIGEPPrincipal,
          setDatosContratosSIGEPPrincipal,
          numContratoSIGEFPrincipalFiltrados,
          setNumContratoSIGEFPrincipalFiltrados,
          totalContrato,
          setTotalContrato,
          IVAContrato,
          setIVAContrato,
          totalContratoIVA,
          setTotalContratoIVA,
          estaPresupuestado,
          setEstaPresupuestado,
          estaEnPAI,
          setEstaEnPAI,
          presupuestoPAI,
          setPresupuestoPAI,
          noSePagara,
          setNoSePagara,
          observaciones,
          setObservaciones,
          montoFinal,
          setMontoFinal,
          devengadoAgosto2016,
          setDevengadoAgosto2016,

          /*PRESUPUESTO POR DEVENGAR */
          dataFuentesFinanciamiento,
          setDataFuentesFinanciamiento,
          organismoDatoPorDegengar,
          setOrganismoDatoPorDegengar,
          setFuenteFinanciamientoPorDevengar,
          fuenteFinanciamientoPorDevengar,
          correlativoDatoPorDegengar,
          setCorrelativoDatoPorDegengar,
          //Datos CUR
          datosCur,
          setDatosCur,
          datosCurFiltrados,
          setDatosCurFiltrados,
          infoProyecto,
          setInfoProyecto,

          //PLANIFICACIÓN
          fuentesFinanciamiento,
          setFuentesFinanciamiento,
          fuenteFinanciamientosFiltrados,
          setFuenteFinanciamientosFiltrados,
          fuenteFinanciamiento,
          setFuenteFinanciamiento,
          organismos,
          setOrganismos,
          organismosFiltrados,
          setOrganismosFiltrados,
          organismo,
          setOrganismo,
          filteredCountries,
          setFilteredCountries,
          selectedCountry2,
          setSelectedCountry2,
          totalMonto,
          setTotalMonto,
          correlativos,
          setCorrelativos,
          correlativosFiltrados,
          setCorrelativosFiltrados,
          correlativo,
          setCorrelativo,

          //proyectoSeleccionado,setProyectoSeleccionado,

          //SELECCIÓN DE ARRASTRES
          contratosSeleccionados,
          setContratosSeleccionados,
          contratosArray,
          setContratosArray,
        }}
      >
        {props.children}
      </FormInvArrastreContext.Provider>
    </div>
  );
}
export { FormInvArrastreContext, FormInvArrastreProvider };
