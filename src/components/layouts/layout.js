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
import Footer from '@components/layouts/Footer';
import Navbar from '@components/layouts/Navbar';
import SnpSidebar from '@components/layouts/sidebar';

/** @function
 *@name Layout
 * @param {object} children - Propiedades que heredan
 *
 */

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="flex flex-row">
        <SnpSidebar />
        <main className="flex-grow-1">{children}</main>
      </div>
      <Footer />
    </>
  );
}
