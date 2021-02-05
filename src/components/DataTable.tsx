import React from 'react';
import DataTable, {IDataTableColumn} from 'react-data-table-component';
import { DataTableColumn } from 'models';
import { Alert } from 'react-bootstrap';

interface Props {
    title?:string,
    columns:Array<DataTableColumn | IDataTableColumn>,
    data: any[] | any,
    className?: string,
    paginationTotalRows:number,
    onChangePerPage:(currentRowsPerPage: number, currentPage: number) => void,
    onChangePage:(page:number, totalRows:number) => void
}

const optionsTable = {
  rowsPerPageText: 'Registros por página:',
  rangeSeparatorText: 'de',
  noRowsPerPage: false,
  selectAllRowsItem: false,
  selectAllRowsItemText: 'All'
};

const _DataTable:React.FC<Props> = (props:Props) => {

    const customStyles = {
        headCells: {
          style: {
            backgroundColor: 'rgb(18 128 228)',
            border: '1px solid rgba(0,0,0,.12)',
            fontSize: '14px',
            fontWeight: '700',
            margin: '0 auto'
          },
        },
        cells: {
          style: {
            border: '1px solid rgba(0,0,0,.12)',
          },
        },
      };


    return (
        <DataTable
            noHeader={true}
            title={props.title}
            columns={props.columns}
            data={props.data}
            className={`table-bordered ${props.className}`}
            responsive={true}
            striped={true}
            customStyles={customStyles}
            noDataComponent={
              <Alert
                variant="info"
                className="mt-2 ml-2 mr-2 w-100 pt-5 pb-5 text-center"
              >
                  No se han encontrado registros
              </Alert>
            }
            pagination={true}
            paginationRowsPerPageOptions={[10,15,20,50,75,100,300,500]}
            onChangeRowsPerPage={props.onChangePerPage}
            onChangePage={props.onChangePage}
            paginationTotalRows={props.paginationTotalRows}
            paginationComponentOptions={optionsTable}
            paginationServer={true}
        />
    );
};

export default _DataTable;
