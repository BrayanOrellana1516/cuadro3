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
import { PanelMenu } from 'primereact/panelmenu';
import { Toast } from 'primereact/toast';
import { useContext, useRef } from 'react';

import { FormCreacionContext } from '@hooks/formCreacionContext';

/** @function
 *@name SnpSidebar
 *
 */
export default function SnpSidebar() {
  const router = useRouter();
  let { rolId, usuarioId, solicitud } = useContext(FormCreacionContext);
  const toast = useRef(null);

  const items = [
    {
      label: 'Inversión',
      icon: 'pi pi-fw pi-table',
      items: [
        {
          label: 'Visualización y formulación de proyectos',
          icon: 'pi pi-fw pi-database',
          command: () => {
            router.push(
              {
                pathname: '/inversion/busqueda',
                query: { ruc: rolId, ci: rolId, password: rolId },
              },
              '/inversion/busqueda',
            );
          },
        },
        {
          label: 'Solicitudes',
          icon: 'pi pi-fw pi-database',
          command: () => {
            router.push(
              {
                pathname: '/inversion/aprobacionSolicitud',
                query: { ruc: rolId, ci: rolId, password: rolId },
              },
              '/inversion/aprobacionSolicitud',
            );
          },
        },
        {
          label: 'Postulación PAI',
          icon: 'pi pi-fw pi-database',
          items: [
            {
              label: 'Preparación proforma PAI',
              icon: 'pi pi-fw pi-database',
              command: () => {
                router.push(
                  {
                    pathname: '/inversion/pai',
                    query: { ruc: rolId, ci: rolId, password: rolId },
                  },
                  '/inversion/pai',
                );
              },
            },
            {
              label: 'Postulación',
              icon: 'pi pi-fw pi-database',
              command: () => {
                router.push(
                  {
                    pathname: '/inversion/pai',
                    query: { ruc: rolId, ci: rolId, password: rolId },
                  },
                  '/inversion/pai',
                );
              },
            },
          ],
        },
        {
          label: 'Jerarquización y escenarios',
          icon: 'pi pi-fw pi-database',
          items: [
            {
              label: 'Jerarquización de proyectos',
              icon: 'pi pi-fw pi-database',
              command: () => {
                router.push(
                  {
                    pathname: '/inversion/Jerarquizacion',
                    query: { ruc: rolId, ci: rolId, password: rolId },
                  },
                  '/inversion/Jerarquizacion',
                );
              },
            },
            {
              label: 'Gneración de escenarios',
              icon: 'pi pi-fw pi-database',
              command: () => {
                router.push(
                  {
                    pathname: '/inversion/Jerarquizacion',
                    query: { ruc: rolId, ci: rolId, password: rolId },
                  },
                  '/inversion/Jerarquizacion',
                );
              },
            },
          ],
        },
        {
          label: 'Modificaciones presupuestarias y certificaciones plurianuales',
          icon: 'pi pi-fw pi-database',
          command: () => {
            router.push(
              {
                pathname: '/inversion/modificacionesPresupuestarias',
                query: { ruc: rolId, ci: rolId, password: rolId },
              },
              '/inversion/modificacionesPresupuestarias',
            );
          },
        },
      ],
    },
    {
      label: 'Gestión de contratos - Arrastre',
      icon: 'pi pi-fw pi-user',
      items: [
        {
          label: 'Registro de datos',
          icon: 'pi pi-fw pi-folder',
          items: [
            {
              label: 'Proyectos',
              icon: 'pi pi-fw pi-user-plus',
              command: () => {
                router.push(
                  {
                    pathname: '/inversion/proyectos',
                    query: { ruc: rolId, ci: rolId, password: rolId },
                  },
                  '/inversion/proyectos',
                );
              },
            },
            {
              label: 'Obras',
              icon: 'pi pi-fw pi-user-plus',
              command: () => {
                router.push(
                  {
                    pathname: '/inversion/obras',
                    query: { ruc: rolId, ci: rolId, password: rolId },
                  },
                  '/inversion/obras',
                );
              },
            },
            {
              label: 'Contratos',
              icon: 'pi pi-fw pi-user-plus',
              command: () => {
                router.push(
                  {
                    pathname: '/inversion/busquedaContratos',
                    query: { ruc: rolId, ci: rolId, password: rolId },
                  },
                  '/inversion/busquedaContratos',
                );
              },
            },
            {
              label: 'CUR',
              icon: 'pi pi-fw pi-folder',
              command: () => {
                router.push(
                  {
                    pathname: '/inversion/cur',
                    query: { ruc: rolId, ci: rolId, password: rolId },
                  },
                  '/inversion/cur',
                );
              },
            },
            {
              label: 'Aprobaciones',
              icon: 'pi pi-fw pi-folder',
              command: () => {
                router.push(
                  {
                    pathname: '/inversion/aprobaciones',
                    query: { ruc: rolId, ci: rolId, password: rolId },
                  },
                  '/inversion/aprobaciones',
                );
              },
            },
          ],
        },
        {
          label: 'Consultas',
          icon: 'pi pi-fw pi-folder',
          items: [
            {
              label: 'Consulta general',
              icon: 'pi pi-fw pi-user-plus',
              command: () => {
                router.push(
                  {
                    pathname: '/inversion/consultas/consultaGeneral',
                    query: { ruc: rolId, ci: rolId, password: rolId },
                  },
                  '/inversion/consultas/consultaGeneral',
                );
              },
            },
            {
              label: 'Consulta global',
              icon: 'pi pi-fw pi-user-plus',
              command: () => {
                router.push(
                  {
                    pathname: '/inversion/consultas/consultaGlobal',
                    query: { ruc: rolId, ci: rolId, password: rolId },
                  },
                  '/inversion/consultas/consultaGlobal',
                );
              },
            },
            {
              label: 'Listado de obras',
              icon: 'pi pi-fw pi-user-plus',
              command: () => {
                router.push(
                  {
                    pathname: '/inversion/obras',
                    query: { ruc: rolId, ci: rolId, password: rolId },
                  },
                  '/inversion/obras',
                );
              },
            },
            {
              label: 'Listado de proyectos',
              icon: 'pi pi-fw pi-user-plus',
              command: () => {
                router.push(
                  {
                    pathname: '/inversion/proyectos',
                    query: { ruc: rolId, ci: rolId, password: rolId },
                  },
                  '/inversion/proyectos',
                );
              },
            },
          ],
        },
      ],
    },
    {
      label: 'Planificación',
      icon: 'pi pi-fw pi-book',
      items: [
        {
          label: 'Plan sectorial',
          icon: 'pi pi-file',
        },
        {
          label: 'Plan institucional',
          icon: 'pi pi-file',
        }
      ],
    },
    {
      label: 'Seguridad',
      icon: 'pi pi-id-card',
      items: [     
            {
              label: 'Administrador de Usuario',
              icon: 'pi pi-fw pi-user-plus',
              command: () => {
                router.push(
                  {
                    pathname:'/inversion/administradorPorUsuario',// '/inversion/proyectos',
                    query: { ruc: rolId, ci: rolId, password: rolId },
                  },
                  '/inversion/administradorPorUsuario',//'/inversion/proyectos',
                );
              },
            },
            {
              label: 'Creación de Usuario',
              icon: 'pi pi-fw pi-user-plus',
              command: () => {
                router.push(
                  {
                    pathname: '/inversion/creacionUsuario',
                    query: { ruc: rolId, ci: rolId, password: rolId },
                  },
                  '/inversion/creacionUsuario',
                );
              },
            },
            {
              label: 'Mi perfil',
              icon: 'pi pi-fw pi-user-plus',
              command: () => {
                router.push(
                  {
                    pathname: '/inversion/miPerfil',
                    query: { ruc: rolId, ci: rolId, password: rolId },
                  },
                  '/inversion/miPerfil',
                );
              },
            },
            {
              label: 'Rol',
              icon: 'pi pi-fw pi-user-plus',
              command: () => {
                router.push(
                  {
                    pathname: '/inversion/roles',
                    query: { ruc: rolId, ci: rolId, password: rolId },
                  },
                  '/inversion/roles',
                );
              },
            },
            {
              label: 'Asignar Rol Permisos por Entidad',
              icon: 'pi pi-fw pi-folder',
              command: () => {
                router.push(
                  {
                    pathname: '/inversion/cur',
                    query: { ruc: rolId, ci: rolId, password: rolId },
                  },
                  '/inversion/cur',
                );
              },
            },
            {
              label: 'Formulario de Acuerdo',
              icon: 'pi pi-fw pi-user-plus',
              command: () => {
                router.push(
                  {
                    pathname: '/inversion/formulacionAcuerdo',
                    query: { ruc: rolId, ci: rolId, password: rolId },
                  },
                  '/inversion/formulacionAcuerdo',
                );
              },
            },
            {
              label: 'Permisos',
              icon: 'pi pi-fw pi-folder',
              command: () => {
                router.push(
                  {
                    pathname: '/inversion/permisos',
                    query: { ruc: rolId, ci: rolId, password: rolId },
                  },
                  '/inversion/permisos',
                );
              },
            },
      ],
    },
    {
      label: 'Seguimiento',
      icon: 'pi pi-fw pi-calendar',
      command: () => {
        toast.current.show({
          severity: 'info',
          summary: 'Información',
          detail: 'Módulo en construcción',
        });
      },
    },
    {
      label: 'Evaluación',
      icon: 'pi pi-fw pi-user',
      command: () => {
        toast.current.show({
          severity: 'info',
          summary: 'Información',
          detail: 'Módulo en construcción',
        });
      },
    },
  ];

  return (
    <div>
      <Toast ref={toast} />
      <PanelMenu model={items} style={{ width: '19.4rem' }} />
    </div>
  );
}
