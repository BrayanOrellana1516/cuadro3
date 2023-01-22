/**
 * Secretaria Nacional de Planificación y Desarrollo - SNP
 *
 * Producto: index.js
 * Creado: 29-09-2022
 * Hora: 09:30
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
import fileDownload from 'js-file-download';
import { useRouter } from 'next/router';
import { FilterMatchMode } from 'primereact/api';
import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Toolbar } from 'primereact/toolbar';
import { Fragment, useContext, useRef, useState } from 'react';

import { FormCreacionContext } from '@hooks/formCreacionContext';
import Axios from '@lib/axios';

/** @function
 *@name Navbar
 * @param {Object} props - Propiedades del componente
 *
 */
export default function Navbar(props) {
  const op = useRef(null);
  const user = useRef(null);
  const [tipoSolicitudes, setTipoSolicitudes] = useState([]);
  const [seleccionTipoSolicitud, setSeleccionTipoSolicitud] = useState('');
  const router = useRouter();
  const [rol, setRol] = useState();

  const [data, setData] = useState([]);

  let { rolId, setRolId, usuarioId } = useContext(FormCreacionContext);

  const tipoBodyTemplate = (rowData) => {
    return <span>{rowData.descEstadoSituacionActual}</span>;
    /*if (rowData.codigoEstadoSituacionActual === 1) {
      return <span>Actualización</span>;
    } else if (rowData.codigoEstadoSituacionActual === 2) {
      return <span>Arrastre </span>;
    } else if (rowData.codigoEstadoSituacionActual === 3) {
      return <span> Deshabilitado</span>;
    } else if (rowData.codigoEstadoSituacionActual === 1286) {
      return <span>Formulación</span>;
    }*/
  };
  const estadoBodyTemplate = (rowData) => {
    if (rowData.estado === 'solicitud aprobado') {
      return <span className="green-background">APROBADO</span>;
    } else if (rowData.estado === 'solicitud negada') {
      return <span className="red-background"> NEGADO</span>;
    } else return <span className="yellow-background">OBSERVACION</span>;
  };

  const leftContents = (
    <Fragment>
      <i className="p-toolbar-separator" />

      <i className="p-toolbar-separator" />
      <div className="flex flex-column estiloSNP">
        <div className="font-medium text-50">Sistema Integrado de Planificación e Inversión Pública</div>
      </div>
    </Fragment>
  );

  /**
   *@function
   * Se obtienen las solicitudes de proyectos
   * @returns {Array} Las solicitudes de proyectos
   */
  const obtenerSolicitudesProyectos = async () => {
    const { data } = await Axios.get('/api/catalogo/tipo/TIPO_SOLICITUD');
    return data;
  };
  const obtenerNotificaciones = async (codigousuario) => {
    const { data } = await Axios.get('api/solicitudproyecto/notificacion?codigoUsuario=' + 1);
    return data;
  };

  const consultaNotificacionesAnalisis = async (codigoRol) => {
    if (isNaN(codigoRol)) {
      codigoRol = 0;
    }
    const { data } = await Axios.get('/api/solicitudproyecto/consultaSolicitudProyecto?codigoRol=' + codigoRol);
    return data;
  };

  const getCodigo = async (RowData) => {
    const { data } = await Axios.get('/api/proyecto/descargarTodos?codProyecto=' + RowData.idPproyecto);

    getCodigo2(data);
  };
  const getCodigo2 = async (RowData) => {
    const { data } = await Axios.get('/api/archivo/consultar/estado-descarga-todos?uuidArchivo=' + RowData.entry.id);

    if (data.entry.status === 'DONE') {
      getCodigo3(data.entry.id);
    } else {
      getCodigo2(RowData);
    }
  };
  const getCodigo3 = async (id) => {
    const url = '/api/archivo/descargar?uuidArchivo=' + id;
    Axios.get(url, {
      responseType: 'blob',
    }).then((res) => {
      fileDownload(res.data, 'Documentos.zip');
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (rolId === 0) {
      router.push(
        {
          pathname: '/inversion/notificaciones',
          query: {
            ruc: rolId,
            ci: rolId,
            password: rolId,
          },
        },
        '/inversion/notificaciones',
      );
    } else {
      router.push(
        {
          pathname: '/inversion/aprobacionSolicitud',
          query: {
            ruc: rolId,
            ci: rolId,
            password: rolId,
          },
        },
        '/inversion/aprobacionSolicitud',
      );
    }
  };

  const consulta = (RowData) => {
    return (
      <Button
        className="justify-content-center p-button-rounded p-button-primary h-2rem mx-2"
        onClick={() => getCodigo(RowData)}
      >
        <i className="pi pi-file" />
        Descargar
      </Button>
    );
  };

  /** @function
   * @name cambioFiltroTipo
   * @param {Object} value - Evento del componente Dropdown
   * @description Cambia el valor del filtro de tipo de solicitud
   */
  const cambioFiltroTipo = (value) => {
    let _filtroBusqueda = { ...filtroBusqueda };
    _filtroBusqueda['codigoEstadoSituacionActual'].value = value;
    setFiltroBusqueda(_filtroBusqueda);
  };

  const [filtroBusqueda, setFiltroBusqueda] = useState({
    nemonicoProyecto: { value: null, matchMode: FilterMatchMode.CONTAINS },
    codigoEstadoSituacionActual: {
      value: '',
      matchMode: FilterMatchMode.CONTAINS,
    },
    nombreProyecto: { value: null, matchMode: FilterMatchMode.CONTAINS },
    razonSocial: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  /** @function
   * @name cambioSeleccionSolicitud
   * @description Funcion que detecta cambios en el dropdown
   * @param {object} e Evento
   */
  const cambioSeleccionSolicitud = (e) => {
    setSeleccionTipoSolicitud(e.value);
    let id;
    switch (e.value.valor1) {
      case 'ACT':
        id = 1;
        break;
      case 'ARR':
        id = 0;
        break;
      case 'DSH':
        id = 3;
        break;
      default:
        id = 1;
        break;
    }

    cambioFiltroTipo(id);
  };

  const rightContents = (
    <Fragment>
      <div className="flex flex-column justify-content-center">
        <div className="p-fluid flex align-items-end">
          <Button
            className="estiloSNP"
            onClick={(e) => op.current.toggle(e)}
            aria-haspopup
            aria-controls="overlay_panel"
          ></Button>
          <Button
            className="estiloSNP"
            onClick={(e) => user.current.toggle(e)}
            aria-haspopup
            aria-controls="overlay_panel"
          >
            {' '}
            <i className="pi pi-fw pi-user p-overlay-badge" style={{ fontSize: '1.5rem' }}></i>
          </Button>
        </div>

        <OverlayPanel
          ref={op}
          breakpoints={{ '1000px': '75vw', '640px': '100vw' }}
          showCloseIcon
          id="overlay_panel"
          style={{ width: '450px' }}
          className="overlaypanel-demo"
        >
          <h3>Notificaciones &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</h3>
          <div className="flex flex-row justify-content-between">
            <Button label="Mostrar todo" className="p-button-sm" icon="pi pi-external-link" onClick={handleSubmit} />
            {rolId !== 0 ? (
              <div className="flex w-7">
                <Dropdown
                  id="tipoSolicitud"
                  value={seleccionTipoSolicitud}
                  options={tipoSolicitudes}
                  onChange={cambioSeleccionSolicitud}
                  optionLabel="valor2"
                  placeholder="Seleccione el tipo de solicitud"
                  className="w-full h-2rem"
                />
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <DataTable
            value={data}
            dataKey="id"
            responsiveLayout="scroll"
            paginator
            rows={5}
            filters={filtroBusqueda}
            globalFilterFields={['codigoEstadoSituacionActual']}
            emptyMessage="No se han encontrado resultados"
          >
            <Column field="nemonicoProyecto" header="CUP" />
            <Column field="nombreProyecto" header=" Nombre del proyecto"></Column>
            <Column field="codigoEstadoSituacionActual" header="Tipo de Solicitud" body={tipoBodyTemplate}></Column>
            <Column field="estado" header="Estado" body={estadoBodyTemplate}></Column>
            <Column field="observacion" header="Observaciones"></Column>
            <Column header="Consultas" body={consulta}></Column>
          </DataTable>
        </OverlayPanel>
        <OverlayPanel
          ref={user}
          breakpoints={{ '1000px': '75vw', '640px': '100vw' }}
          showCloseIcon
          id="overlay_panel"
          style={{ width: '450px' }}
          className="overlaypanel-demo"
        >
          <h2>Mi perfil &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</h2>
          <Card className=" card  justify-align-center">
            <div className="p-fluid grid formgrid col-12 justify-content-center  ">
              <h4 className="col-1">Nombre:&nbsp;&nbsp;</h4>
              <div className="col 2"></div>
              <div>
                <AutoComplete />
              </div>
            </div>
            <br />
            <div className="p-fluid grid formgrid col-12 justify-content-center ">
              <h4 className="col-1">Apellido:&nbsp;&nbsp;</h4>
              <div className="col 2"></div>
              <div>
                <AutoComplete />
              </div>
            </div>
            <br />
            <div className="p-fluid grid formgrid col-12 justify-content-center ">
              <h4 className="col-1">Cargo:&nbsp;&nbsp;</h4>
              <div className="col 2"></div>
              <div>
                <AutoComplete />
              </div>
            </div>
            <br />
            <div className="p-fluid grid formgrid col-12 justify-content-center ">
              <h4 className="col-1">Institucion&nbsp;&nbsp;</h4>
              <div className="col 2"></div>
              <div>
                <AutoComplete />
              </div>
            </div>
          </Card>
        </OverlayPanel>
      </div>
    </Fragment>
  );

  return (
    <div>
      <Toolbar left={leftContents} right={rightContents} className=" p-2 border-round-bottom toolbarSNP" />
    </div>
  );
}
