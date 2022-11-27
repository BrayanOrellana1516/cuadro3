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
import { Sidebar } from 'primereact/sidebar';
import { Fragment, useState } from 'react';

import Footer from '@components/layouts/Footer';

import SnpNavbar from './Navbar';
import Panel from './sidebar';

/** @function
 *@name Layout
 * @param {object} children - Propiedades que heredan
 *
 */

export default function Layout({ children }) {
  const [visibleLeft, setVisibleLeft] = useState(false);

  const onToggleMenuClick = (event) => {
    event.preventDefault();
    setVisibleLeft((prevState) => !prevState);
  };

  return (
    <Fragment>
      <SnpNavbar onToggleMenuClick={onToggleMenuClick} />
      <div className="flex flex-row">
        <Sidebar visible={visibleLeft} onHide={() => setVisibleLeft(false)}>
          <Panel />
        </Sidebar>
        <main className="md:px-2 py-2 lg:px-4 py-4 w-full min-h-screen surface-100">{children}</main>
      </div>
      <Footer />
    </Fragment>
  );
}
