import {CatalogTemplate, ITemplateProvider, TemplateMap } from "@eusoft/webapp-core";
import {TableRow} from "./tableRow";
import './table.scss';
import {Foreach, Template, forModel, getParent} from "@eusoft/webapp-jsx";
import * as _ from "lodash";
import ISpell from "../../entities/ISpell";



const Templates : TemplateMap<Table<any>> = {
    Default: forModel(m => <Template name={'Table'}>
            <table className="table">
                <thead>
                <tr>
                    <Foreach src={m.columns}>
                        {i => <td>
                            <div>
                                <span>{i.label}</span>
                                <span
                                    className="table__sort-icon material-symbols-outlined"
                                    on-click={(m: ITableHeaderColumn<any>, e: Event) => getParent<Table<ISpell>>(m).onSort(e, m)} //TODO fix parent double import
                                >
                                    {
                                        i.currentSort && i.currentSort === 'none'
                                        ? "sort"
                                        : i.currentSort === 'asc'
                                            ? 'arrow_upward'
                                            : 'arrow_downward' 
                                    }
                                </span>
                            </div>
                        </td>
                        }
                    </Foreach>
                </tr>
                </thead>
                <tbody>
                <Foreach src={m.rows}>
                    {i => i.value}
                </Foreach>
                </tbody>
            </table>
        </Template>
    ) 
}

export interface ITableHeaderColumn<TModel> {
    label: string;
    key: string;
    sortValue?: (m: TModel) => string|number,
    //onSort?: (e: Event, column: this) => void;
    currentSort: 'asc' | 'desc' | 'none';
}

export interface ITableRowData {
    id: string;

    [key: string]: any;
}

export interface ITableProps<TModel extends ITableRowData> {
    columns: ITableHeaderColumn<TModel>[];
    rowsData: TModel[];
    tableRowTemplate: 'Default';
    template?: keyof typeof Templates;
    onRowClick?: (e: Event, id: string) => void;
}

export class Table<TModel extends ITableRowData> implements ITemplateProvider {
    columns: ITableHeaderColumn<TModel>[];
    rows: { value: TableRow<TModel> }[];
    template: CatalogTemplate<this>;
    tableRowTemplate: 'Default';
    onRowClick: (e: Event, id: string) => void;
    public activeSorts: {key: string, sort: 'asc' | 'desc'}[] = [];

    public onSort(
        e: Event,
        column: ITableHeaderColumn<TModel>
    ) {
       this.sort(column);
    }

    public sort(column: ITableHeaderColumn<TModel>) {

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

        this.applySort(); 
    }

    protected applySort() {
        this.rows.sort((a, b) =>{

            for (const sort of this.activeSorts) {
                const col = this.columns.find(a=> a.key == sort.key);
                
                let va = col.sortValue ? col.sortValue(a.value.data) : a.value.data[sort.key];
                let vb = col.sortValue ? col.sortValue(b.value.data) : b.value.data[sort.key];
                
                if (sort.sort === "desc") {
                    const temp = va;
                    va = vb;
                    vb = temp;
                }

                if (va !== vb){
                    if (typeof va === "string" && typeof vb === "string")
                        return va.localeCompare(vb);
                    return va - vb;
                }
        
            }
            return 0;
        })
    }

    public updateTableRows(data: ITableRowData[]) {
        this.rows = data.map((row) => ({
            value: new TableRow<TModel>({
                data: row as any, //TODO check this
                columns: this.columns.map((column) => ({
                    value: row[column.key]
                })),
                template: this.tableRowTemplate,
                onRowClick: this.onRowClick
            })
        }))

        this.applySort();
    }

    constructor(props: ITableProps<TModel>) {
        this.columns = props.columns.map((column) => ({
            ...column,
        }) as ITableHeaderColumn<TModel>);
        this.template = Templates[props.template || 'Default'];
        this.tableRowTemplate = props.tableRowTemplate;
        this.onRowClick = props.onRowClick;

        this.updateTableRows(props.rowsData);
    }

}