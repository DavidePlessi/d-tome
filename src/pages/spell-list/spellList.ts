import {CatalogTemplate, IViewComponent} from "@eusoft/webapp-core";
import SpellListTable from "./spellListTable.html";
import ISpell from "../../entities/ISpell";
import ISpellFilter from "../../entities/ISpellFilter";
import spellStore from "../../stores/spellStore";
import {ITableHeaderColumn, ITableProps, ITableRowData, Table} from "../../components/table/table";
import './spellList.scss';
import {ITextInputProps, TextInput} from "../../components/input/textInput/textInput";
import {Button, IButtonProps} from "../../components/button/button";


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

    public queryInput: TextInput;
    public levelInput: TextInput;
    public classesInput: TextInput;

    public filterButton: Button;


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

        this.queryInput = new TextInput({
            id: 'query',
            name: 'query',
            label: 'Nome',
            value: this.filter.query,
            onChange: this.onFilterValueChange.bind(this)
        } as ITextInputProps);

        this.levelInput = new TextInput({
            id: 'level',
            name: 'level',
            label: 'Livello',
            value: this.filter.query,
            onChange: this.onFilterValueChange.bind(this)
        } as ITextInputProps);

        this.classesInput = new TextInput({
            id: 'classes',
            name: 'classes',
            label: 'Classi',
            value: this.filter.query,
            onChange: this.onFilterValueChange.bind(this)
        } as ITextInputProps);

        this.filterButton = new Button({
            text: 'Filtra',
            onClick: this.applyFilter.bind(this)
        } as IButtonProps)

        this.applyFilter();

        this.template = Templates[props.template || 'Default'] as any;
    }
}