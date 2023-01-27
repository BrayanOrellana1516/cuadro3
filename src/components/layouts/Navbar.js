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
import { useRouter } from 'next/router';
import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Toolbar } from 'primereact/toolbar';
import { Fragment, useEffect, useRef, useState } from 'react';

/** @function
 *@name Navbar
 * @param {Object} props - Propiedades del componente
 *
 */
export default function Navbar(props) {
  const user = useRef(null);

  const router = useRouter();
  const [credenciales, setCredenciales] = useState({});

  useEffect(() => {
    //verificar si existe dato en localstorage
    if (localStorage.getItem('user')) {
      setCredenciales(JSON.parse(localStorage.getItem('user')));
    } else {
      router.push('/login');
    }
  }, []);

  const leftContents = (
    <Fragment>
      <i className="p-toolbar-separator" />

      <i className="p-toolbar-separator" />
      <div className="flex flex-column estiloSNP">
        <div className="font-medium text-50">CUADRO DE MANDO DEL ALMACEN UNICOMERCIO</div>
      </div>
    </Fragment>
  );
  const header = (
    <>
      <h1>&nbsp;</h1>
      <i className="pi pi-fw pi-user p-overlay-badge" style={{ fontSize: '2rem', color: 'white' }}></i>
      <h1>&nbsp;</h1> <div className=" text-2xl text-50 mt-1 mb-2">Mi Perfil</div>
    </>
  );

  const rightContents = (
    <Fragment>
      <div className="flex flex-column justify-content-center">
        <div className="p-fluid flex align-items-end">
          <Button
            className="estiloSNP"
            onClick={(e) => user.current.toggle(e)}
            aria-haspopup
            aria-controls="overlay_panel"
          >
            <i className="pi pi-fw pi-user p-overlay-badge" style={{ fontSize: '1.5rem' }}></i>
          </Button>
        </div>

        <OverlayPanel
          ref={user}
          breakpoints={{ '1000px': '75vw', '640px': '100vw' }}
          showCloseIcon
          id="overlay_panel"
          style={{ width: '450px' }}
          className="overlaypanel-demo"
        >
          <Toolbar left={header} className=" p-2 border-round-bottom toolbarSNP" />
          <div className="p-fluid grid formgrid col-12 justify-content-center justify-align-center card">
            <h4 className="col-1">Usuario:&nbsp;&nbsp; </h4>
            <div className="col 2"></div>
            <div>
              <AutoComplete value={credenciales.user} disabled />
            </div>
          </div>
          <div className="p-invalid flex align-items-center justify-content-center h-2rem ">
            <div className="button-demo">
              <div className="template">
                <Button
                  onClick={() => {
                    localStorage.removeItem('user');
                    router.push('/login');
                  }}
                  className="snp p-0"
                  aria-label="SNP"
                >
                  <i className="pi pi-sign-out px-2"></i>
                  <span className="px-3">Cerrar Sesión</span>
                </Button>
              </div>
            </div>
          </div>
          <br />
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
