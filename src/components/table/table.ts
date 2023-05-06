import {CatalogTemplate, ITemplateProvider} from "@eusoft/webapp-core";
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
    id: string;
    [key: string]: any;
}

export interface ITableProps {
    columns: ITableHeaderColumn[];
    rowsData: ITableRowData[];
    tableRowTemplate: 'Default';
    template?: keyof typeof Templates;
    onRowClick?: (e: Event, id: string) => void;
}

export class Table implements ITemplateProvider {
    columns: ITableHeaderColumn[];
    rows: {value: TableRow}[];
    template: CatalogTemplate<this>;
    tableRowTemplate: 'Default';
    onRowClick: (e: Event, id: string) => void;

    public updateTableRows(data: ITableRowData[]) {
        this.rows = data.map((row) => ({
            value: new TableRow({
                id: row.id,
                columns: this.columns.map((column) => ({
                    value: row[column.key]
                })),
                template: this.tableRowTemplate,
                onRowClick: this.onRowClick
            })
        }))
    }

    constructor(props: ITableProps) {
        this.columns = props.columns;
        this.template = Templates[props.template || 'Default'];
        this.tableRowTemplate = props.tableRowTemplate;
        this.onRowClick = props.onRowClick;

        this.updateTableRows(props.rowsData);
    }

}