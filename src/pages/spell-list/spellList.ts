import {CatalogTemplate, IViewComponent} from "@eusoft/webapp-core";
import SpellListTable from "./spellListTable.html";
import ISpell from "../../entities/ISpell";
import ISpellFilter from "../../entities/ISpellFilter";
import spellStore from "../../stores/spellStore";
import {ITableHeaderColumn, ITableProps, ITableRowData, Table} from "../../components/table/table";
import './spellList.scss';


export const Templates = {
    Default: SpellListTable
}

export interface ISpellListProps {
    template?: keyof typeof Templates;
}

export class SpellList implements IViewComponent {
    public filter: ISpellFilter;
    public template: CatalogTemplate<this>;
    public table: Table;

    public applyFilter() {
        console.log(this.filter);
        const result = spellStore.filterSpells(spellStore.spells, this.filter);
        console.log("Filter Result: " + result.length);
        this.table.updateTableRows(result);
        console.log("Applied Result: " + this.table.rows.length);
    }

    public onFilterValueChange(e: Event) {
        const target = e.target as HTMLInputElement;
        this.filter[target.name as keyof ISpellFilter] = target.value;
    }

    constructor(props: ISpellListProps) {

        this.table = new Table({
            columns: [
                {label: 'Nome', key: 'name'},
                {label: 'Livello', key: 'level'},
                {label: 'Classi', key: 'classes'}
            ] as ITableHeaderColumn[],
            rowsData: spellStore.spells,
            tableRowTemplate: 'Default',
            template: 'Default'
        } as ITableProps);

        this.filter = {
            query: '',
            level: '',
            classes: ''
        } as ISpellFilter;

        this.applyFilter();

        this.template = Templates[props.template || 'Default'] as any;
    }
}