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
import Image from 'next/image';
import { Divider } from 'primereact/divider';
import { Toolbar } from 'primereact/toolbar';
import { Fragment } from 'react';

/** Pie de página. */
/** @function
 *@name Footer
 * @param {object}props - Propiedades del componente
 *
 */
export default function Footer(props) {
  const leftContents = (
    <Fragment>
      <Image alt="Logo_senplades" src="/logoSIPeIP.svg" width={250} height={85} className="mb-1" priority />
    </Fragment>
  );

  const rightContents = (
    <Fragment>
      <div className="flex flex-column text-right font-medium">
        <div>Av. Patria y Av.12 deOctubre, Edificio Secretaría Nacial de Planificación</div>
        <div>Código Postal: 170525 / Quito - Ecuador</div>
        <div>Teléfono: (593) 2 397-8900</div>
      </div>
    </Fragment>
  );

  return (
    <div className="surface-100">
      <Divider type="dashed" className="bg-blue-600" />
      <Toolbar left={leftContents} right={rightContents} className="surface-0 p-2 border-round-bottom" />
    </div>
  );
}
