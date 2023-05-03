import {CatalogTemplate, IViewComponent} from "@eusoft/webapp-core";
import TableTemplate from "./table.html";
import {TableRow} from "./tableRow";
import './table.scss';

const Templates = {
    Default: TableTemplate
}

export interface ITableHeaderColumn {
    label: string;
    key: string;
}

export interface ITableRowData {
    [key: string]: any;
}

export interface ITableProps {
    columns: ITableHeaderColumn[];
    rowsData: ITableRowData[];
    tableRowTemplate: 'Default';
    template?: keyof typeof Templates;
}

export class Table implements IViewComponent {
    columns: ITableHeaderColumn[];
    rows: {value: TableRow}[];
    template: CatalogTemplate<this>;
    tableRowTemplate: 'Default';

    public updateTableRows(data: ITableRowData[]) {
        console.log(data)
        this.rows = data.map((row) => ({
            value: new TableRow({
                columns: this.columns.map((column) => ({
                    value: row[column.key]
                })),
                template: this.tableRowTemplate
            })
        }))

        console.log("Table Rows inner: " + this.rows.length)
    }

    constructor(props: ITableProps) {
        this.columns = props.columns;
        this.template = Templates[props.template || 'Default'];
        this.tableRowTemplate = props.tableRowTemplate

        this.updateTableRows(props.rowsData);
    }

}