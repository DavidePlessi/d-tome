import {CatalogTemplate, ITemplate, ITemplateProvider} from "@eusoft/webapp-core";
import {TableRow} from "./tableRow";
import './table.scss';
import {Content, Foreach, Template} from "@eusoft/webapp-jsx";

const Templates = {
    Default: (
        <Template name={'Table'}>
            <table className="table">
                <thead>
                <tr>
                    <Foreach src={(m: Table) => m.columns}>
                        <td>{(m: ITableHeaderColumn) => m.label}</td>
                    </Foreach>
                </tr>
                </thead>
                <tbody>
                <Foreach src={(m: Table) => m.rows}>
                    <Content src={(m: {value: TableRow}) => m.value} />
                </Foreach>
                </tbody>
            </table>
        </Template>
    ) as ITemplate<Table>
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