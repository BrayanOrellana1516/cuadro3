import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Fragment, useEffect, useState } from 'react';

export default function VentanaDetalles({ dataHistorial }) {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [fileData, setFileData] = useState();
  const [filters2, setFilters2] = useState({
    nombre: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  useEffect(() => {
    //  readFile(dir);
    // setDataHistorial(
    //   csv.parse(csvData, {
    //     columns: false, // Indica que la primera fila del CSV contiene los nombres de las columnas
    //     skip_empty_lines: true, // Salta las líneas vacías
    //   }),
    // );
    // const titles = historialCrediticion.slice(0, data.indexOf('\n')).split(';');
    // console.log(csvData);
    // setDataHistorial(
    //   historialCrediticion
    //     .slice(historialCrediticion.indexOf('\n') + 1)
    //     .split('\n')
    //     .map((v) => {
    //       const values = v.split(';');
    //       return titles.reduce((obj, title, index) => ((obj[title] = values[index]), obj), {});
    //     }),
    // );
  }, []);

  const header = (
    <div className="table-header">
      <h3 className="p-m-0">Cartera vencida de la parroquia</h3>
    </div>
  );

  const statusBodyTemplate = (rowData) => {
    if (rowData.puntuacion <= -50) {
      return <span className={`product-badge status-alto`}>{rowData.puntuacion}</span>;
    } else {
      // crear un if donde la variable rowData.puntuacion este entre 10 y 30

      if (rowData.puntuacion > -50 && rowData.puntuacion <= 30) {
        return <span className={`product-badge status-medio`}>{rowData.puntuacion}</span>;
      } else {
        if (rowData.puntuacion > 30) {
          return <span className={`product-badge status-bajo`}>{rowData.puntuacion}</span>;
        }
      }
    }
  };

  const formatCurrency = (rowData) => {
    return parseFloat(rowData.valorLetra.toString().replace(',', '.')).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
  };

  const nombreBody = (rowData) => {
    return (
      <Fragment>
        <span>{rowData.nombre}</span>
      </Fragment>
    );
  };
  return (
    <div className="datatable-templating-demo ">
      <div className="card py-4 surface-100 border-round-lg border-double border-blue-500">
        <DataTable
          value={dataHistorial}
          header={header}
          responsiveLayout="scroll"
          emptyMessage="No hay clientes con cartera vencida en esta parroquia"
          paginator
          rows={5}
          sortMode="single"
          removableSort
          scrollable
          scrollDirection="both"
          // rowGroupMode="rowspan"
          // groupRowsBy="nombre"
          // sortField="nombre"
          sortOrder={1}
          dataKey="cedula"
          metaKeySelection={false}
          scrollHeight="flex"
          size="small"
          filterDisplay="row"
          filters={filters2}
          globalFilterFields={['nombre']}
        >
          <Column field="cedula" header="Cédula"></Column>
          <Column
            field="nombre"
            header="Cliente"
            body={nombreBody}
            filter
            filterPlaceholder="Nombre"
            showFilterMatchModes={false}
          ></Column>
          <Column field="tipoDocumento" header="Tipo de Documento"></Column>
          <Column field="numeroDocumento" header="Número de Documento"></Column>
          {/* <Column field="porfolioVencido" header="Deuda Inicial" body={formatCurrency}></Column> */}
          <Column field="letra" header="Letra Deuda"></Column>
          <Column field="valorLetra" header="Valor Letra" body={formatCurrency}></Column>
          <Column field="plazoLetra" header="Vencimiento de Letra"></Column>
          <Column field="interes_letra" header="Interes Letra"></Column>
          <Column field="estado" header="estatus"></Column>
          <Column field="puntuacion" header="Score" body={statusBodyTemplate}></Column>
        </DataTable>
      </div>
    </div>
  );
}
