import {CatalogTemplate, ITemplate, ITemplateProvider} from "@eusoft/webapp-core";
import {TableRow} from "./tableRow";
import './table.scss';
import {Content, Foreach, If, Template} from "@eusoft/webapp-jsx";
import * as _ from "lodash";

const Templates = {
    Default: (
        <Template name={'Table'}>
            <table className="table">
                <thead>
                <tr>
                    <Foreach src={(m: Table) => m.columns}>
                        <td >
                            <div>
                                <span>{(m: ITableHeaderColumn) => m.label}</span>
                                <span
                                    className="table__sort-icon material-symbols-outlined"
                                    on-click={(m: ITableHeaderColumn, e: Event) => m.onSort(e, m)}
                                >
                                    {
                                        (m: ITableHeaderColumn) =>
                                            m.currentSort && m.currentSort === 'none'
                                                ? "sort"
                                                : m.currentSort === 'asc'
                                                    ? 'arrow_upward'
                                                    : 'arrow_downward'
                                    }
                                </span>
                            </div>

                        </td>
                    </Foreach>
                </tr>
                </thead>
                <tbody>
                <Foreach src={(m: Table) => m.rows}>
                    <Content src={(m: { value: TableRow }) => m.value}/>
                </Foreach>
                </tbody>
            </table>
        </Template>
    ) as ITemplate<Table>
}

export interface ITableHeaderColumn {
    label: string;
    key: string;
    onSort?: (e: Event, column: ITableHeaderColumn) => void;
    currentSort: 'asc' | 'desc' | 'none';
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
    rows: { value: TableRow }[];
    template: CatalogTemplate<this>;
    tableRowTemplate: 'Default';
    onRowClick: (e: Event, id: string) => void;
    public activeSorts: {key: string, sort: 'asc' | 'desc'}[] = [];

    public innerOnSort(
        e: Event,
        column: ITableHeaderColumn,
        onSort?: (e: Event, column: ITableHeaderColumn) => void
    ) {
        const currentColumn = this.columns.find(x => x.key === column.key);
        currentColumn.currentSort = !currentColumn.currentSort || currentColumn.currentSort === 'none'
            ? 'asc'
            : currentColumn.currentSort === 'asc'
                ? 'desc'
                : 'none';

        const index = _.findIndex(this.activeSorts, x => x.key === column.key);

        if(index === -1 && currentColumn.currentSort !== 'none')
            this.activeSorts.push({key: column.key, sort: currentColumn.currentSort});

        if(index !== -1 && currentColumn.currentSort === 'none')
            this.activeSorts.splice(index, 1);

        if(index !== -1 && currentColumn.currentSort !== 'none')
            this.activeSorts = [
                ...this.activeSorts.slice(0, index),
                {key: column.key, sort: currentColumn.currentSort},
                ...this.activeSorts.slice(index + 1)
            ];

        if(onSort)
            onSort(e, column);
    }

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
        this.columns = props.columns.map((column) => ({
            ...column,
            onSort: (e: Event, c: ITableHeaderColumn) => this.innerOnSort(e, c, column.onSort),
        }) as ITableHeaderColumn);
        this.template = Templates[props.template || 'Default'];
        this.tableRowTemplate = props.tableRowTemplate;
        this.onRowClick = props.onRowClick;

        this.updateTableRows(props.rowsData);
    }

}