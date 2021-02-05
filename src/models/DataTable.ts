import { IDataTableColumn } from 'react-data-table-component';
import { ReactText, ReactNode } from 'react';

export type DataTableColumn = {
    name:string,
    selector?:string,
    sortable?: boolean,
    center?: boolean,
    cell?:((row: never, rowIndex: number, column: IDataTableColumn<any>, id: ReactText) => ReactNode) | undefined,
}
